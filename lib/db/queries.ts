import { db } from "@/lib/db";
import {
  agents,
  agentTools,
  agentMemory,
  knowledge,
  agentKnowledge,
  executions,
  activityEvents,
  agentLogs,
  profiles,
} from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";

export type AgentWithRelations = {
  id: string;
  name: string;
  role: string;
  objective: string;
  status: string;
  progress: number | null;
  currentTask: string | null;
  category: string | null;
  gradient: [string, string] | null;
  reasoning: string | null;
  tools: string[];
  knowledgeSources: string[];
  memory: { key: string; value: string }[];
  executions: {
    id: string;
    title: string | null;
    status: string;
    durationMs: number | null;
    tokens: number | null;
  }[];
  logs: { level: string; message: string }[];
};

export async function getAgentsByUser(userId: string) {
  const userAgents = await db.query.agents.findMany({
    where: eq(agents.userId, userId),
    orderBy: [desc(agents.createdAt)],
  });

  const result: AgentWithRelations[] = [];

  for (const agent of userAgents) {
    const tools = await db.query.agentTools.findMany({
      where: eq(agentTools.agentId, agent.id),
    });

    const memory = await db.query.agentMemory.findMany({
      where: eq(agentMemory.agentId, agent.id),
    });

    const agentExecutions = await db.query.executions.findMany({
      where: eq(executions.agentId, agent.id),
      orderBy: [desc(executions.startedAt)],
    });

    const agentLogsList = await db.query.agentLogs.findMany({
      where: eq(agentLogs.agentId, agent.id),
      orderBy: [desc(agentLogs.createdAt)],
      limit: 30,
    });

    const knowledgeLinks = await db.query.agentKnowledge.findMany({
      where: eq(agentKnowledge.agentId, agent.id),
    });

    const knowledgeTitles: string[] = [];
    for (const link of knowledgeLinks) {
      const k = await db.query.knowledge.findFirst({
        where: eq(knowledge.id, link.knowledgeId),
      });
      if (k) knowledgeTitles.push(k.title);
    }

    result.push({
      id: agent.id,
      name: agent.name,
      role: agent.role,
      objective: agent.objective,
      status: agent.status || "idle",
      progress: agent.progress,
      currentTask: agent.currentTask,
      category: agent.category,
      gradient: agent.gradient as [string, string] | null,
      reasoning: agent.reasoning,
      tools: tools.map((t) => t.toolName),
      knowledgeSources: knowledgeTitles,
      memory: memory.map((m) => ({ key: m.key, value: m.value })),
      executions: agentExecutions.map((e) => ({
        id: e.id,
        title: e.title,
        status: e.status,
        durationMs: e.durationMs,
        tokens: e.tokens,
      })),
      logs: agentLogsList.map((l) => ({ level: l.level, message: l.message })),
    });
  }

  return result;
}

export async function getAgentById(userId: string, agentId: string) {
  const agent = await db.query.agents.findFirst({
    where: and(eq(agents.id, agentId), eq(agents.userId, userId)),
  });

  if (!agent) return null;

  const tools = await db.query.agentTools.findMany({
    where: eq(agentTools.agentId, agent.id),
  });

  const memory = await db.query.agentMemory.findMany({
    where: eq(agentMemory.agentId, agent.id),
  });

  const agentExecutions = await db.query.executions.findMany({
    where: eq(executions.agentId, agent.id),
    orderBy: [desc(executions.startedAt)],
  });

  const agentLogsList = await db.query.agentLogs.findMany({
    where: eq(agentLogs.agentId, agent.id),
    orderBy: [desc(agentLogs.createdAt)],
    limit: 30,
  });

  const knowledgeLinks = await db.query.agentKnowledge.findMany({
    where: eq(agentKnowledge.agentId, agent.id),
  });

  const knowledgeTitles: string[] = [];
  for (const link of knowledgeLinks) {
    const k = await db.query.knowledge.findFirst({
      where: eq(knowledge.id, link.knowledgeId),
    });
    if (k) knowledgeTitles.push(k.title);
  }

  return {
    id: agent.id,
    name: agent.name,
    role: agent.role,
    objective: agent.objective,
    status: agent.status || "idle",
    progress: agent.progress,
    currentTask: agent.currentTask,
    category: agent.category,
    gradient: agent.gradient as [string, string] | null,
    reasoning: agent.reasoning,
    tools: tools.map((t) => t.toolName),
    knowledgeSources: knowledgeTitles,
    memory: memory.map((m) => ({ key: m.key, value: m.value })),
    executions: agentExecutions.map((e) => ({
      id: e.id,
      title: e.title,
      status: e.status,
      durationMs: e.durationMs,
      tokens: e.tokens,
    })),
    logs: agentLogsList.map((l) => ({ level: l.level, message: l.message })),
  };
}

export async function getKnowledgeByUser(userId: string) {
  return db.query.knowledge.findMany({
    where: eq(knowledge.userId, userId),
    orderBy: [desc(knowledge.createdAt)],
  });
}

export async function getActivityByUser(userId: string, limit = 40) {
  return db.query.activityEvents.findMany({
    where: eq(activityEvents.userId, userId),
    orderBy: [desc(activityEvents.createdAt)],
    limit,
  });
}

export async function getProfileByUserId(userId: string) {
  return db.query.profiles.findFirst({
    where: eq(profiles.id, userId),
  });
}
