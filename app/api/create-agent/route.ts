import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { agents, agentTools, agentMemory } from "@/lib/db/schema";
import { llm, getModelForAgent } from "@/lib/llm/client";

export const runtime = "nodejs";

interface CreateAgentRequest {
  prompt: string;
  name?: string;
  role?: string;
  category?: string;
  tools?: string[];
}

async function compileAgentWithLLM(prompt: string) {
  const model = getModelForAgent("research");

  const systemPrompt = `You are an AI agent architect. Given a user's objective, create a detailed agent configuration.

Return ONLY a valid JSON object with these fields:
{
  "name": "Agent Name (human-like, 2 words)",
  "role": "Agent Role (e.g., Research Analyst, SEO Writer)",
  "category": "One of: Research, Marketing, Sales, Development, Support, Operations",
  "objective": "Detailed objective statement (1-2 sentences)",
  "tools": ["tool1", "tool2", "tool3"],
  "knowledge": ["knowledge1", "knowledge2"],
  "memory": [["key", "value"], ["key2", "value2"]],
  "reasoning": "Initial reasoning about how to approach the objective"
}

Be creative but practical. The agent should be capable of autonomous operation.`;

  try {
    const response = await llm.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Create an agent for: ${prompt}` },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const content = response.choices[0]?.message?.content || "";
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("LLM compilation failed, using fallback:", error);
  }

  return null;
}

function compileFallbackAgent(prompt: string) {
  const normalized = prompt.toLowerCase();

  let name = "Z-Agent";
  let role = "General Assistant";
  let category = "Operations";
  let objective = "Autonomous general task workflow optimizer.";
  let tools = ["Web Search", "Notifications", "API Compiler"];
  let knowledge = ["General Knowledge Base"];
  let memory: [string, string][] = [["task_type", "general"]];

  if (/(wallet|portfolio|market|finance)/.test(normalized)) {
    name = "AssetWatch Alpha";
    role = "Financial Analyst";
    category = "Research";
    objective = "Monitor portfolios and analyze market volatility.";
    tools = ["Market Data API", "Portfolio Tracker", "Alert System"];
    knowledge = ["Financial Markets", "Portfolio Strategy"];
    memory = [["focus", "portfolio monitoring"], ["alert_threshold", "5%"]];
  } else if (/(research|analyze|news|feed)/.test(normalized)) {
    name = "Nexus Research";
    role = "Research Analyst";
    category = "Research";
    objective = "Gather and synthesize information from multiple sources.";
    tools = ["Web Search", "Document Parser", "Summary Generator"];
    knowledge = ["Research Methods", "Data Analysis"];
    memory = [["output_format", "structured reports"]];
  } else if (/(security|risk|protect|threat)/.test(normalized)) {
    name = "Aegis Sentinel";
    role = "Security Analyst";
    category = "Support";
    objective = "Monitor for security threats and vulnerabilities.";
    tools = ["Security Scanner", "Log Analyzer", "Threat Database"];
    knowledge = ["Security Protocols", "Threat Intelligence"];
    memory = [["scan_frequency", "hourly"]];
  } else if (/(operations|automate|workflow|slack)/.test(normalized)) {
    name = "Opus Core";
    role = "Operations Manager";
    category = "Operations";
    objective = "Automate and optimize business workflows.";
    tools = ["Workflow Engine", "Integration Hub", "Task Scheduler"];
    knowledge = ["Business Processes", "Automation Patterns"];
    memory = [["workflow_count", "0"]];
  } else if (/(seo|content|blog|write|marketing)/.test(normalized)) {
    name = "Content Forge";
    role = "Content Strategist";
    category = "Marketing";
    objective = "Create and optimize content for search engines.";
    tools = ["SEO Analyzer", "Content Editor", "Keyword Research"];
    knowledge = ["SEO Best Practices", "Content Marketing"];
    memory = [["target_keywords", "[]"]];
  } else if (/(sales|lead|prospect|outbound)/.test(normalized)) {
    name = "Pipeline Pro";
    role = "Sales Development Rep";
    category = "Sales";
    objective = "Identify and qualify sales prospects.";
    tools = ["CRM Integration", "Email Outreach", "Lead Scoring"];
    knowledge = ["Sales Playbook", "ICP Definition"];
    memory = [["weekly_target", "40 accounts"]];
  } else if (/(code|dev|programming|bug|fix)/.test(normalized)) {
    name = "CodeCraft";
    role = "Software Engineer";
    category = "Development";
    objective = "Write, review, and debug code.";
    tools = ["Code Editor", "Git", "Testing Framework"];
    knowledge = ["Coding Standards", "Architecture Patterns"];
    memory = [["languages", "typescript,python"]];
  } else if (/(support|help|ticket|customer)/.test(normalized)) {
    name = "Support Hub";
    role = "Customer Support Agent";
    category = "Support";
    objective = "Handle customer inquiries and resolve issues.";
    tools = ["Ticketing System", "Knowledge Base", "Chat Interface"];
    knowledge = ["Support Playbook", "Product Documentation"];
    memory = [["escalation_threshold", "3 attempts"]];
  }

  return {
    name,
    role,
    category,
    objective,
    tools,
    knowledge,
    memory,
    reasoning: `Agent designed for: ${prompt.substring(0, 100)}`,
  };
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CreateAgentRequest = await req.json();
    const { prompt, name, role, category, tools } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    // Try LLM compilation first, fallback to deterministic
    let agentConfig = await compileAgentWithLLM(prompt);
    if (!agentConfig) {
      agentConfig = compileFallbackAgent(prompt);
    }

    // Override with explicit values
    if (name) agentConfig.name = name;
    if (role) agentConfig.role = role;
    if (category) agentConfig.category = category;
    if (tools) agentConfig.tools = tools;

    // Save to database
    const [newAgent] = await db
      .insert(agents)
      .values({
        userId: session.user.id,
        name: agentConfig.name,
        role: agentConfig.role,
        objective: agentConfig.objective,
        category: agentConfig.category,
        status: "idle",
        reasoning: agentConfig.reasoning,
        gradient: getGradientForCategory(agentConfig.category),
      })
      .returning({ id: agents.id });

    // Add tools
    if (agentConfig.tools && Array.isArray(agentConfig.tools)) {
      await db.insert(agentTools).values(
        agentConfig.tools.map((tool: string) => ({
          agentId: newAgent.id,
          toolName: tool,
        }))
      );
    }

    // Add memory
    if (agentConfig.memory && Array.isArray(agentConfig.memory)) {
      await db.insert(agentMemory).values(
        agentConfig.memory.map(([key, value]: [string, string]) => ({
          agentId: newAgent.id,
          key,
          value,
        }))
      );
    }

    return NextResponse.json({
      agent: {
        id: newAgent.id,
        ...agentConfig,
      },
      source: "database",
    });
  } catch (error) {
    console.error("Agent creation failed:", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

function getGradientForCategory(category: string): [string, string] {
  const gradients: Record<string, [string, string]> = {
    Research: ["#a78bfa", "#7c3aed"],
    Marketing: ["#c084fc", "#9333ea"],
    Sales: ["#8b5cf6", "#6d28d9"],
    Development: ["#b794f6", "#6b21a8"],
    Support: ["#a855f7", "#7e22ce"],
    Operations: ["#a78bfa", "#5b21b6"],
    Security: ["#c4b5fd", "#7c3aed"],
    Finance: ["#d8b4fe", "#a855f7"],
  };
  return gradients[category] || ["#a78bfa", "#7c3aed"];
}
