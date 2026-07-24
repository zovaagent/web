import { db } from "./index";
import {
  user,
  profiles,
  agents,
  agentTools,
  agentMemory,
  knowledge,
  agentKnowledge,
  executions,
  activityEvents,
  agentLogs,
} from "./schema";

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";

async function seed() {
  console.log("Seeding database...");

  // Create demo user
  await db
    .insert(user)
    .values({
      id: DEMO_USER_ID,
      name: "Ory D.",
      email: "ory@zova.dev",
      emailVerified: true,
    })
    .onConflictDoNothing();

  // Create profile
  await db
    .insert(profiles)
    .values({
      id: DEMO_USER_ID,
      email: "ory@zova.dev",
      name: "Ory D.",
      plan: "pro",
    })
    .onConflictDoNothing();

  // Create agents
  const agentData = [
    {
      name: "Aria Chen",
      role: "Research Analyst",
      objective:
        "Continuously monitor competitor releases, pricing, and positioning across the AI infrastructure space and synthesize a weekly digest.",
      status: "running",
      progress: 68,
      currentTask: "Compiling Q3 competitive landscape",
      category: "Research",
      gradient: ["#a78bfa", "#7c3aed"],
      reasoning:
        "Cross-referencing today's Firecrawl pull against last week's positioning matrix. Modal shifted messaging from 'serverless GPU' to 'agent compute' — worth surfacing.",
    },
    {
      name: "Marcus Silva",
      role: "SEO Content Agent",
      objective:
        "Produce technically accurate, editorial-grade long-form content targeting mid-funnel keywords in AI agent tooling.",
      status: "running",
      progress: 42,
      currentTask: "Generating 'AI agent orchestration' cluster",
      category: "Marketing",
      gradient: ["#c084fc", "#9333ea"],
      reasoning:
        "Draft opens with a concrete example rather than a definition — matches the voice guide.",
    },
    {
      name: "Priya Kapoor",
      role: "SDR Prospecting Agent",
      objective:
        "Identify and enrich 40 qualified accounts per week matching our design-partner ICP, hand off to AE with a one-paragraph rationale.",
      status: "waiting",
      progress: 82,
      currentTask: "Awaiting CRM sync",
      category: "Sales",
      gradient: ["#8b5cf6", "#6d28d9"],
      reasoning:
        "38 of 40 accounts enriched. Blocked on HubSpot rate limit — will retry in 90s.",
    },
    {
      name: "Elena Rossi",
      role: "Support Triage",
      objective:
        "Read every incoming support ticket within 30 seconds, categorize, draft a first response, and escalate anything touching billing or trust & safety.",
      status: "idle",
      category: "Support",
      gradient: ["#a855f7", "#7e22ce"],
      reasoning: "Queue empty. Watching Intercom for the next event.",
    },
    {
      name: "Kenji Watanabe",
      role: "Ops Watcher",
      objective:
        "Continuously watch production metrics, cloud spend, and error rates. Page a human only when signal exceeds the configured thresholds.",
      status: "running",
      progress: 91,
      currentTask: "Monitoring uptime + cost anomalies",
      category: "Operations",
      gradient: ["#a78bfa", "#5b21b6"],
      reasoning:
        "Cost curve within band. p99 latency for the /generate endpoint drifted from 312ms → 358ms.",
    },
    {
      name: "Amara Okafor",
      role: "Codegen Assistant",
      objective:
        "Take engineering intents from the roadmap and produce PR-ready branches with tests. Never touches migrations or infra.",
      status: "completed",
      category: "Development",
      gradient: ["#b794f6", "#6b21a8"],
      reasoning: "PR merged. Waiting on next Linear ticket.",
    },
    {
      name: "Diego Herrera",
      role: "Data Analyst",
      objective:
        "Refresh cohort dashboards, surface any activation-rate regressions to the growth channel with a one-line narrative.",
      status: "failed",
      progress: 22,
      currentTask: "Weekly cohort refresh",
      category: "Operations",
      gradient: ["#c4b5fd", "#7c3aed"],
      reasoning:
        "Snowflake query failed with a permissions error on analytics.raw.stripe_events.",
    },
    {
      name: "Noor Al-Amin",
      role: "Recruiting Sourcer",
      objective:
        "Source 20 credible candidates per open role weekly. Draft outreach in the hiring manager's voice.",
      status: "idle",
      category: "Operations",
      gradient: ["#d8b4fe", "#a855f7"],
      reasoning: "Weekly sourcing complete. Idle until Monday.",
    },
  ];

  const insertedAgents = await db
    .insert(agents)
    .values(
      agentData.map((a) => ({
        userId: DEMO_USER_ID,
        ...a,
      }))
    )
    .returning({ id: agents.id, name: agents.name });

  console.log(`Inserted ${insertedAgents.length} agents`);

  // Create tools for each agent
  const toolSets: Record<string, string[]> = {};
  for (const a of insertedAgents) {
    switch (a.name) {
      case "Aria Chen":
        toolSets[a.id] = ["Web Search", "Firecrawl", "Notion", "Slack"];
        break;
      case "Marcus Silva":
        toolSets[a.id] = ["Web Search", "Ahrefs", "Sanity", "Grammarly"];
        break;
      case "Priya Kapoor":
        toolSets[a.id] = ["LinkedIn", "Apollo", "HubSpot", "Clearbit"];
        break;
      case "Elena Rossi":
        toolSets[a.id] = ["Intercom", "Linear", "Slack", "Notion"];
        break;
      case "Kenji Watanabe":
        toolSets[a.id] = ["Datadog", "AWS Cost Explorer", "PagerDuty", "Slack"];
        break;
      case "Amara Okafor":
        toolSets[a.id] = ["GitHub", "Codex", "Vitest", "Linear"];
        break;
      case "Diego Herrera":
        toolSets[a.id] = ["Snowflake", "dbt", "Metabase", "Slack"];
        break;
      case "Noor Al-Amin":
        toolSets[a.id] = ["LinkedIn", "Gem", "Ashby", "Notion"];
        break;
    }
  }

  for (const [agentId, tools] of Object.entries(toolSets)) {
    await db.insert(agentTools).values(
      tools.map((toolName) => ({
        agentId,
        toolName,
      }))
    );
  }

  // Create memory entries
  const memoryData: Record<string, [string, string][]> = {
    "Aria Chen": [
      ["primary_competitors", "Vercel AI, Modal, Replicate, Baseten"],
      ["digest_cadence", "Every Friday 09:00 UTC"],
      ["tone", "Concise, analytical, no adjectives"],
    ],
    "Marcus Silva": [
      ["voice", "Confident, no hype, evidence-first"],
      ["word_count_target", "1,600–2,200"],
      [
        "banned_phrases",
        "unlock, unleash, revolutionize, leverage",
      ],
    ],
    "Priya Kapoor": [
      ["icp_signals", "Series B/C, 50-500 eng, ML/AI on roadmap"],
      ["exclude", "Big Four consultancies, agencies, sub-20 headcount"],
      ["preferred_persona", "Head of Platform, Staff PM"],
    ],
    "Elena Rossi": [
      ["never_answer", "Anything involving refunds, security disclosures"],
      ["escalate_to", "@rachel for billing, @jax for security"],
    ],
    "Kenji Watanabe": [
      ["p99_slo_ms", "400"],
      ["monthly_budget_usd", "48000"],
      ["quiet_hours", "22:00–06:00 PT"],
    ],
    "Amara Okafor": [
      ["never_touch", "prisma/migrations, terraform/, .github/workflows"],
      ["test_style", "Vitest, colocated *.test.ts"],
    ],
    "Diego Herrera": [["primary_north_star", "WAU_7d / installs_28d"]],
    "Noor Al-Amin": [
      ["outreach_voice", "Personal, specific, no template feel"],
    ],
  };

  for (const agent of insertedAgents) {
    const entries = memoryData[agent.name];
    if (entries) {
      await db.insert(agentMemory).values(
        entries.map(([key, value]) => ({
          agentId: agent.id,
          key,
          value,
        }))
      );
    }
  }

  // Create knowledge sources
  const knowledgeData = [
    { title: "Voice & Tone Guide v4", type: "document", meta: "PDF · 2.4 MB", category: "Brand" },
    { title: "Product Brief — Q3", type: "document", meta: "DOCX · 812 KB", category: "Product" },
    { title: "Anthropic MCP Specification", type: "url", meta: "modelcontextprotocol.io/spec", category: "Reference" },
    { title: "Design partner interview — Ramp", type: "note", meta: "1,240 words", category: "Research" },
    { title: "Architecture Decision Records", type: "document", meta: "MD · 48 files", category: "Engineering" },
    { title: "OpenAI Assistants Deprecation Notice", type: "url", meta: "openai.com/blog/…", category: "Reference" },
    { title: "Objection library — pricing", type: "note", meta: "620 words", category: "Sales" },
    { title: "Incident post-mortem #2841", type: "document", meta: "MD · 14 KB", category: "Engineering" },
  ];

  const insertedKnowledge = await db
    .insert(knowledge)
    .values(
      knowledgeData.map((k) => ({
        userId: DEMO_USER_ID,
        ...k,
      }))
    )
    .returning({ id: knowledge.id, title: knowledge.title });

  // Link knowledge to agents
  const knowledgeLinks: Record<string, string[]> = {
    "Aria Chen": ["Competitor OKRs", "Analyst Reports 2026", "Product Brief"],
    "Marcus Silva": ["Voice & Tone Guide v4", "Keyword Map v4", "Case Studies"],
    "Priya Kapoor": ["ICP v3", "Design Partner Playbook", "Won Deal Patterns"],
    "Elena Rossi": ["Runbook", "Historical Tickets", "SLA Matrix"],
    "Kenji Watanabe": ["Incident Runbooks", "Cost Budget 2026", "SLO Definitions"],
    "Amara Okafor": ["Codebase Map", "Architecture Decisions", "Style Guide"],
    "Diego Herrera": ["Metric Definitions", "Dashboard Registry"],
    "Noor Al-Amin": ["Open Roles", "Interview Rubric", "Employer Brand Guide"],
  };

  for (const agent of insertedAgents) {
    const linkedTitles = knowledgeLinks[agent.name] || [];
    for (const title of linkedTitles) {
      const found = insertedKnowledge.find((k) => k.title.includes(title) || title.includes(k.title));
      if (found) {
        await db.insert(agentKnowledge).values({
          agentId: agent.id,
          knowledgeId: found.id,
        });
      }
    }
  }

  // Create executions
  const executionData: Record<string, { title: string; status: string; durationMs: number; tokens: number }[]> = {
    "Aria Chen": [
      { title: "Weekly competitive digest", status: "completed", durationMs: 184000, tokens: 4210 },
      { title: "Vercel Ship recap", status: "completed", durationMs: 96000, tokens: 2130 },
      { title: "Modal pricing scrape", status: "failed", durationMs: 12000, tokens: 340 },
    ],
    "Marcus Silva": [
      { title: "Article: agent memory patterns", status: "completed", durationMs: 421000, tokens: 8940 },
      { title: "Article: tool use in LLMs", status: "completed", durationMs: 388000, tokens: 8210 },
    ],
    "Priya Kapoor": [
      { title: "Weekly enrichment batch", status: "completed", durationMs: 612000, tokens: 15400 },
    ],
    "Elena Rossi": [
      { title: "Triaged 42 tickets", status: "completed", durationMs: 1800000, tokens: 12800 },
    ],
    "Kenji Watanabe": [
      { title: "Anomaly: GPU spend +18%", status: "completed", durationMs: 22000, tokens: 490 },
    ],
    "Amara Okafor": [
      { title: "PR #2314: parse retry with jitter", status: "completed", durationMs: 720000, tokens: 21400 },
    ],
  };

  for (const agent of insertedAgents) {
    const execs = executionData[agent.name];
    if (execs) {
      await db.insert(executions).values(
        execs.map((e) => ({
          agentId: agent.id,
          ...e,
        }))
      );
    }
  }

  // Create activity events
  const activityData = [
    { agentName: "Aria Chen", kind: "reasoning", message: "Cross-referencing today's competitive pull" },
    { agentName: "Marcus Silva", kind: "started", message: "Started outline for 'agent orchestration' cluster" },
    { agentName: "Priya Kapoor", kind: "waiting", message: "Awaiting HubSpot rate-limit backoff" },
    { agentName: "Amara Okafor", kind: "completed", message: "Merged PR #2314 into main" },
    { agentName: "Kenji Watanabe", kind: "tool", message: "Queried Datadog: p99=358ms" },
    { agentName: "Diego Herrera", kind: "failed", message: "Snowflake permission error — escalated" },
    { agentName: "Elena Rossi", kind: "completed", message: "Triaged 8 incoming tickets" },
    { agentName: "Noor Al-Amin", kind: "completed", message: "Sourced 18 candidates for Staff Frontend" },
  ];

  for (const event of activityData) {
    const agent = insertedAgents.find((a) => a.name === event.agentName);
    if (agent) {
      await db.insert(activityEvents).values({
        agentId: agent.id,
        userId: DEMO_USER_ID,
        kind: event.kind,
        message: event.message,
      });
    }
  }

  // Create agent logs
  const logData: Record<string, { level: string; message: string }[]> = {
    "Aria Chen": [
      { level: "info", message: "Firecrawl → modal.com/pricing (200 OK, 42kb)" },
      { level: "info", message: "Extracted 14 pricing rows" },
      { level: "info", message: "Diff vs 2026-07-14 snapshot: 3 changes" },
    ],
    "Marcus Silva": [
      { level: "info", message: "Outline approved by rubric v2" },
      { level: "info", message: "Draft section 1/6 complete (312 words)" },
    ],
    "Priya Kapoor": [
      { level: "info", message: "Apollo pull: 512 candidates" },
      { level: "info", message: "ICP filter passed: 47" },
      { level: "warn", message: "HubSpot: 429 Too Many Requests — backoff 90s" },
    ],
    "Elena Rossi": [
      { level: "info", message: "No new tickets in 5m — sleeping" },
    ],
    "Kenji Watanabe": [
      { level: "warn", message: "Datadog: p99=358ms (Δ +14%)" },
      { level: "warn", message: "Cost: $1,842 today (budget: $1,600/day)" },
      { level: "info", message: "No incidents active" },
    ],
    "Diego Herrera": [
      { level: "info", message: "dbt run: starting cohort_v2" },
      { level: "error", message: "Snowflake: permission denied on stripe_events" },
      { level: "error", message: "Aborted — escalating to owner" },
    ],
  };

  for (const agent of insertedAgents) {
    const logs = logData[agent.name];
    if (logs) {
      await db.insert(agentLogs).values(
        logs.map((l) => ({
          agentId: agent.id,
          ...l,
        }))
      );
    }
  }

  console.log("Seed completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
