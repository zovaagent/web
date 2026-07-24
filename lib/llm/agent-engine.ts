import { llm, getModelForAgent } from "./client";
import { db } from "@/lib/db";
import {
  agents,
  executions,
  activityEvents,
  agentLogs,
  agentMemory,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  emitAgentUpdate,
  emitAgentLog,
  emitActivityEvent,
} from "@/lib/socket/server";

export interface AgentRunContext {
  agentId: string;
  userId: string;
  prompt?: string;
}

export interface AgentRunResult {
  executionId: string;
  status: "completed" | "failed";
  output: string;
  tokensUsed: number;
  durationMs: number;
}

function buildSystemPrompt(agent: {
  name: string;
  role: string;
  objective: string;
  reasoning: string | null;
}): string {
  return `You are ${agent.name}, a ${agent.role}.

Your objective: ${agent.objective}

You are an autonomous AI agent. Think step by about how to accomplish your objective.
Break down complex tasks into smaller actionable steps.
When you need to use a tool, describe what tool you would use and why.

Current reasoning: ${agent.reasoning || "Starting fresh."}

Always respond in a clear, professional manner. Be concise but thorough.`;
}

function buildUserPrompt(context: AgentRunContext, agentMemoryEntries: { key: string; value: string }[]): string {
  const memoryContext = agentMemoryEntries
    .map((m) => `${m.key}: ${m.value}`)
    .join("\n");

  let prompt = context.prompt || "Execute your current objective and report progress.";

  if (memoryContext) {
    prompt = `Context from memory:\n${memoryContext}\n\nTask: ${prompt}`;
  }

  return prompt;
}

export async function runAgent(context: AgentRunContext): Promise<AgentRunResult> {
  const startTime = Date.now();

  // Get agent data
  const agent = await db.query.agents.findFirst({
    where: eq(agents.id, context.agentId),
  });

  if (!agent) {
    throw new Error(`Agent not found: ${context.agentId}`);
  }

  // Update agent status to running
  await db
    .update(agents)
    .set({ status: "running", updatedAt: new Date() })
    .where(eq(agents.id, context.agentId));

  // Emit real-time update
  emitAgentUpdate(context.userId, context.agentId, { status: "running", progress: 0 });

  // Create execution record
  const [execution] = await db
    .insert(executions)
    .values({
      agentId: context.agentId,
      title: context.prompt || "Agent execution",
      status: "running",
      startedAt: new Date(),
    })
    .returning({ id: executions.id });

  // Log: started
  await db.insert(activityEvents).values({
    agentId: context.agentId,
    userId: context.userId,
    kind: "started",
    message: `Started execution: ${context.prompt || "Agent run"}`,
  });

  await db.insert(agentLogs).values({
    agentId: context.agentId,
    level: "info",
    message: `Execution started: ${execution.id}`,
  });

  try {
    // Get agent memory
    const memoryEntries = await db.query.agentMemory.findMany({
      where: eq(agentMemory.agentId, context.agentId),
    });

    // Get model for this agent
    const model = getModelForAgent(agent.role);

    // Build prompts
    const systemPrompt = buildSystemPrompt({
      name: agent.name,
      role: agent.role,
      objective: agent.objective,
      reasoning: agent.reasoning,
    });

    const userPrompt = buildUserPrompt(context, memoryEntries.map((m) => ({ key: m.key, value: m.value })));

    // Log: reasoning
    await db.insert(agentLogs).values({
      agentId: context.agentId,
      level: "info",
      message: `Calling LLM: ${model}`,
    });

    // Call LLM (Groq/OpenAI/Ollama compatible)
    const response = await llm.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const output = response.choices[0]?.message?.content || "";
    const tokensUsed = response.usage?.total_tokens || 0;
    const durationMs = Date.now() - startTime;

    // Update execution
    await db
      .update(executions)
      .set({
        status: "completed",
        durationMs,
        tokens: tokensUsed,
        result: { output },
        completedAt: new Date(),
      })
      .where(eq(executions.id, execution.id));

    // Update agent
    await db
      .update(agents)
      .set({
        status: "completed",
        progress: 100,
        reasoning: output.slice(0, 500),
        updatedAt: new Date(),
      })
      .where(eq(agents.id, context.agentId));

    // Emit real-time updates
    emitAgentUpdate(context.userId, context.agentId, {
      status: "completed",
      progress: 100,
      reasoning: output.slice(0, 500),
    });

    emitActivityEvent(context.userId, {
      agentId: context.agentId,
      kind: "completed",
      message: `Execution completed in ${(durationMs / 1000).toFixed(1)}s`,
    });

    // Log: completed
    await db.insert(activityEvents).values({
      agentId: context.agentId,
      userId: context.userId,
      kind: "completed",
      message: `Execution completed in ${(durationMs / 1000).toFixed(1)}s`,
    });

    await db.insert(agentLogs).values({
      agentId: context.agentId,
      level: "info",
      message: `Execution completed: ${tokensUsed} tokens, ${(durationMs / 1000).toFixed(1)}s`,
    });

    return {
      executionId: execution.id,
      status: "completed",
      output,
      tokensUsed,
      durationMs,
    };
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Update execution
    await db
      .update(executions)
      .set({
        status: "failed",
        durationMs,
        error: errorMessage,
        completedAt: new Date(),
      })
      .where(eq(executions.id, execution.id));

    // Update agent
    await db
      .update(agents)
      .set({
        status: "failed",
        updatedAt: new Date(),
      })
      .where(eq(agents.id, context.agentId));

    // Emit real-time updates
    emitAgentUpdate(context.userId, context.agentId, { status: "failed" });

    emitActivityEvent(context.userId, {
      agentId: context.agentId,
      kind: "failed",
      message: `Execution failed: ${errorMessage}`,
    });

    // Log: failed
    await db.insert(activityEvents).values({
      agentId: context.agentId,
      userId: context.userId,
      kind: "failed",
      message: `Execution failed: ${errorMessage}`,
    });

    await db.insert(agentLogs).values({
      agentId: context.agentId,
      level: "error",
      message: `Execution failed: ${errorMessage}`,
    });

    return {
      executionId: execution.id,
      status: "failed",
      output: errorMessage,
      tokensUsed: 0,
      durationMs,
    };
  }
}

export async function streamAgentRun(
  context: AgentRunContext,
  onChunk: (chunk: string) => void
): Promise<AgentRunResult> {
  const startTime = Date.now();

  const agent = await db.query.agents.findFirst({
    where: eq(agents.id, context.agentId),
  });

  if (!agent) {
    throw new Error(`Agent not found: ${context.agentId}`);
  }

  await db
    .update(agents)
    .set({ status: "running", updatedAt: new Date() })
    .where(eq(agents.id, context.agentId));

  const [execution] = await db
    .insert(executions)
    .values({
      agentId: context.agentId,
      title: context.prompt || "Agent streaming execution",
      status: "running",
      startedAt: new Date(),
    })
    .returning({ id: executions.id });

  try {
    const memoryEntries = await db.query.agentMemory.findMany({
      where: eq(agentMemory.agentId, context.agentId),
    });

    const model = getModelForAgent(agent.role);

    const systemPrompt = buildSystemPrompt({
      name: agent.name,
      role: agent.role,
      objective: agent.objective,
      reasoning: agent.reasoning,
    });

    const userPrompt = buildUserPrompt(context, memoryEntries.map((m) => ({ key: m.key, value: m.value })));

    // Streaming LLM call (Groq/OpenAI/Ollama compatible)
    const stream = await llm.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      stream: true,
    });

    let fullOutput = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        fullOutput += content;
        onChunk(content);
      }
    }

    const durationMs = Date.now() - startTime;

    await db
      .update(executions)
      .set({
        status: "completed",
        durationMs,
        tokens: fullOutput.split(" ").length, // rough estimate
        result: { output: fullOutput },
        completedAt: new Date(),
      })
      .where(eq(executions.id, execution.id));

    await db
      .update(agents)
      .set({
        status: "completed",
        progress: 100,
        reasoning: fullOutput.slice(0, 500),
        updatedAt: new Date(),
      })
      .where(eq(agents.id, context.agentId));

    return {
      executionId: execution.id,
      status: "completed",
      output: fullOutput,
      tokensUsed: fullOutput.split(" ").length,
      durationMs,
    };
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    await db
      .update(executions)
      .set({
        status: "failed",
        durationMs,
        error: errorMessage,
        completedAt: new Date(),
      })
      .where(eq(executions.id, execution.id));

    await db
      .update(agents)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(agents.id, context.agentId));

    return {
      executionId: execution.id,
      status: "failed",
      output: errorMessage,
      tokensUsed: 0,
      durationMs,
    };
  }
}
