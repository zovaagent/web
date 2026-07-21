import type {
  Agent,
  ActivityEvent,
  MarketplaceAgent,
  KnowledgeSource,
  Execution,
  LogLine,
  MemoryEntry,
} from "./types";

// Deterministic seed so SSR & first client render match.
// All times are offsets from a fixed anchor; converted to real times inside `useEffect`.
export const SEED_ANCHOR = 0; // ms — replaced client-side

const g = (a: string, b: string): [string, string] => [a, b];

const now = () => 0; // placeholder — see stores/agents-store where we normalize to Date.now()

function logs(seed: string, lines: [string, LogLine["level"]][]): LogLine[] {
  return lines.map(([message, level], i) => ({
    id: `${seed}-log-${i}`,
    ts: -1000 * (lines.length - i),
    level,
    message,
  }));
}

function execs(seed: string, items: [string, Execution["status"], number, number][]): Execution[] {
  return items.map(([title, status, durationMs, tokens], i) => ({
    id: `${seed}-exec-${i}`,
    ts: -3600_000 * (i + 1),
    title,
    status,
    durationMs,
    tokens,
  }));
}

function mem(seed: string, entries: [string, string][]): MemoryEntry[] {
  return entries.map(([key, value], i) => ({
    id: `${seed}-mem-${i}`,
    key,
    value,
    updatedAt: -86400_000 * (i + 1),
  }));
}

export const SEED_AGENTS: Agent[] = [
  {
    id: "research-01",
    name: "Aria Chen",
    role: "Research Analyst",
    category: "Research",
    gradient: g("#a78bfa", "#7c3aed"),
    status: "running",
    currentTask: "Compiling Q3 competitive landscape",
    progress: 68,
    lastUpdate: -12_000,
    objective:
      "Continuously monitor competitor releases, pricing, and positioning across the AI infrastructure space and synthesize a weekly digest.",
    tools: ["Web Search", "Firecrawl", "Notion", "Slack"],
    knowledgeSources: ["Competitor OKRs", "Analyst Reports 2026", "Product Brief"],
    memory: mem("research-01", [
      ["primary_competitors", "Vercel AI, Modal, Replicate, Baseten"],
      ["digest_cadence", "Every Friday 09:00 UTC"],
      ["tone", "Concise, analytical, no adjectives"],
    ]),
    executions: execs("research-01", [
      ["Weekly competitive digest", "completed", 184_000, 4210],
      ["Vercel Ship recap", "completed", 96_000, 2130],
      ["Modal pricing scrape", "failed", 12_000, 340],
    ]),
    reasoning:
      "Cross-referencing today's Firecrawl pull against last week's positioning matrix. Modal shifted messaging from 'serverless GPU' to 'agent compute' — worth surfacing. Two of four competitors quietly removed their free tier. Drafting a three-bullet summary before pinging Slack #intel.",
    logs: logs("research-01", [
      ["Firecrawl → modal.com/pricing (200 OK, 42kb)", "info"],
      ["Extracted 14 pricing rows", "success"],
      ["Diff vs 2026-07-14 snapshot: 3 changes", "info"],
      ["Anthropic Claude tokens used: 4,210", "debug"],
      ["Digest draft ready — awaiting review", "info"],
    ]),
  },
  {
    id: "seo-01",
    name: "Marcus Silva",
    role: "SEO Content Agent",
    category: "Marketing",
    gradient: g("#c084fc", "#9333ea"),
    status: "running",
    currentTask: "Generating 'AI agent orchestration' cluster",
    progress: 42,
    lastUpdate: -3_000,
    objective:
      "Produce technically accurate, editorial-grade long-form content targeting mid-funnel keywords in AI agent tooling.",
    tools: ["Web Search", "Ahrefs", "Sanity", "Grammarly"],
    knowledgeSources: ["Voice & Tone Guide", "Keyword Map v4", "Case Studies"],
    memory: mem("seo-01", [
      ["voice", "Confident, no hype, evidence-first"],
      ["word_count_target", "1,600–2,200"],
      ["banned_phrases", "unlock, unleash, revolutionize, leverage"],
    ]),
    executions: execs("seo-01", [
      ["Article: agent memory patterns", "completed", 421_000, 8940],
      ["Article: tool use in LLMs", "completed", 388_000, 8210],
      ["Article: eval-driven agents", "completed", 402_000, 8700],
    ]),
    reasoning:
      "Draft opens with a concrete example rather than a definition — matches the voice guide. Checked keyword density on 'orchestration' (1.4%), within target. Adding a diagram callout in section 3 to break up the wall of prose.",
    logs: logs("seo-01", [
      ["Outline approved by rubric v2", "success"],
      ["Draft section 1/6 complete (312 words)", "info"],
      ["Draft section 2/6 complete (401 words)", "info"],
      ["Fact-check: cited claim on Anthropic MCP OK", "success"],
    ]),
  },
  {
    id: "sdr-01",
    name: "Priya Kapoor",
    role: "SDR Prospecting Agent",
    category: "Sales",
    gradient: g("#8b5cf6", "#6d28d9"),
    status: "waiting",
    currentTask: "Awaiting CRM sync",
    progress: 82,
    lastUpdate: -45_000,
    objective:
      "Identify and enrich 40 qualified accounts per week matching our design-partner ICP, hand off to AE with a one-paragraph rationale.",
    tools: ["LinkedIn", "Apollo", "HubSpot", "Clearbit"],
    knowledgeSources: ["ICP v3", "Design Partner Playbook", "Won Deal Patterns"],
    memory: mem("sdr-01", [
      ["icp_signals", "Series B/C, 50-500 eng, ML/AI on roadmap"],
      ["exclude", "Big Four consultancies, agencies, sub-20 headcount"],
      ["preferred_persona", "Head of Platform, Staff PM"],
    ]),
    executions: execs("sdr-01", [
      ["Weekly enrichment batch", "completed", 612_000, 15400],
      ["Signal: hiring for ML infra", "completed", 74_000, 1820],
    ]),
    reasoning:
      "38 of 40 accounts enriched. Blocked on HubSpot rate limit — will retry in 90s. In the meantime, drafted personalized first-touch for the top 5 based on their public engineering blog activity.",
    logs: logs("sdr-01", [
      ["Apollo pull: 512 candidates", "info"],
      ["ICP filter passed: 47", "success"],
      ["Enrichment: 38/40 complete", "info"],
      ["HubSpot: 429 Too Many Requests — backoff 90s", "warn"],
    ]),
  },
  {
    id: "support-01",
    name: "Elena Rossi",
    role: "Support Triage",
    category: "Support",
    gradient: g("#a855f7", "#7e22ce"),
    status: "idle",
    lastUpdate: -300_000,
    objective:
      "Read every incoming support ticket within 30 seconds, categorize, draft a first response, and escalate anything touching billing or trust & safety.",
    tools: ["Intercom", "Linear", "Slack", "Notion"],
    knowledgeSources: ["Runbook", "Historical Tickets", "SLA Matrix"],
    memory: mem("support-01", [
      ["never_answer", "Anything involving refunds, security disclosures"],
      ["escalate_to", "@rachel for billing, @jax for security"],
    ]),
    executions: execs("support-01", [
      ["Triaged 42 tickets", "completed", 1800_000, 12800],
      ["Escalated billing dispute", "completed", 8_000, 210],
    ]),
    reasoning: "Queue empty. Watching Intercom for the next event.",
    logs: logs("support-01", [
      ["No new tickets in 5m — sleeping", "debug"],
    ]),
  },
  {
    id: "ops-01",
    name: "Kenji Watanabe",
    role: "Ops Watcher",
    category: "Operations",
    gradient: g("#a78bfa", "#5b21b6"),
    status: "running",
    currentTask: "Monitoring uptime + cost anomalies",
    progress: 91,
    lastUpdate: -2_000,
    objective:
      "Continuously watch production metrics, cloud spend, and error rates. Page a human only when signal exceeds the configured thresholds.",
    tools: ["Datadog", "AWS Cost Explorer", "PagerDuty", "Slack"],
    knowledgeSources: ["Incident Runbooks", "Cost Budget 2026", "SLO Definitions"],
    memory: mem("ops-01", [
      ["p99_slo_ms", "400"],
      ["monthly_budget_usd", "48000"],
      ["quiet_hours", "22:00–06:00 PT"],
    ]),
    executions: execs("ops-01", [
      ["Anomaly: GPU spend +18%", "completed", 22_000, 490],
      ["Incident #2841 acknowledged", "completed", 12_000, 210],
    ]),
    reasoning:
      "Cost curve within band. p99 latency for the /generate endpoint drifted from 312ms → 358ms over the last hour — not yet actionable, but noting for the 12h report.",
    logs: logs("ops-01", [
      ["Datadog: p99=358ms (Δ +14%)", "warn"],
      ["Cost: $1,842 today (budget: $1,600/day)", "warn"],
      ["No incidents active", "success"],
    ]),
  },
  {
    id: "codegen-01",
    name: "Amara Okafor",
    role: "Codegen Assistant",
    category: "Development",
    gradient: g("#b794f6", "#6b21a8"),
    status: "completed",
    lastUpdate: -60_000,
    objective:
      "Take engineering intents from the roadmap and produce PR-ready branches with tests. Never touches migrations or infra.",
    tools: ["GitHub", "Codex", "Vitest", "Linear"],
    knowledgeSources: ["Codebase Map", "Architecture Decisions", "Style Guide"],
    memory: mem("codegen-01", [
      ["never_touch", "prisma/migrations, terraform/, .github/workflows"],
      ["test_style", "Vitest, colocated *.test.ts"],
    ]),
    executions: execs("codegen-01", [
      ["PR #2314: parse retry with jitter", "completed", 720_000, 21400],
      ["PR #2312: fix off-by-one in cursor", "completed", 240_000, 6800],
    ]),
    reasoning: "PR merged. Waiting on next Linear ticket.",
    logs: logs("codegen-01", [
      ["Vitest: 214 pass, 0 fail", "success"],
      ["PR #2314 merged into main", "success"],
    ]),
  },
  {
    id: "analyst-01",
    name: "Diego Herrera",
    role: "Data Analyst",
    category: "Operations",
    gradient: g("#c4b5fd", "#7c3aed"),
    status: "failed",
    currentTask: "Weekly cohort refresh",
    progress: 22,
    lastUpdate: -600_000,
    objective:
      "Refresh cohort dashboards, surface any activation-rate regressions to the growth channel with a one-line narrative.",
    tools: ["Snowflake", "dbt", "Metabase", "Slack"],
    knowledgeSources: ["Metric Definitions", "Dashboard Registry"],
    memory: mem("analyst-01", [
      ["primary_north_star", "WAU_7d / installs_28d"],
    ]),
    executions: execs("analyst-01", [
      ["Cohort refresh 2026-07-14", "completed", 340_000, 3210],
    ]),
    reasoning:
      "Snowflake query failed with a permissions error on `analytics.raw.stripe_events`. Cannot self-heal — flagging for @maya.",
    logs: logs("analyst-01", [
      ["dbt run: starting cohort_v2", "info"],
      ["Snowflake: permission denied on stripe_events", "error"],
      ["Retry 1/3 failed", "error"],
      ["Aborted — escalating to owner", "error"],
    ]),
  },
  {
    id: "recruiter-01",
    name: "Noor Al-Amin",
    role: "Recruiting Sourcer",
    category: "Operations",
    gradient: g("#d8b4fe", "#a855f7")
    ,
    status: "idle",
    lastUpdate: -1800_000,
    objective:
      "Source 20 credible candidates per open role weekly. Draft outreach in the hiring manager's voice.",
    tools: ["LinkedIn", "Gem", "Ashby", "Notion"],
    knowledgeSources: ["Open Roles", "Interview Rubric", "Employer Brand Guide"],
    memory: mem("recruiter-01", [
      ["outreach_voice", "Personal, specific, no template feel"],
    ]),
    executions: execs("recruiter-01", [
      ["Sourced 18 for Staff Frontend", "completed", 1200_000, 4820],
    ]),
    reasoning: "Weekly sourcing complete. Idle until Monday.",
    logs: logs("recruiter-01", [["No active roles opened this cycle", "debug"]]),
  },
];

// Marketplace — installable agents (superset, mostly unique from user's own)
export const SEED_MARKETPLACE: MarketplaceAgent[] = [
  { id: "m-1", name: "Lena Park", category: "Research", tagline: "Deep-research any topic with cited sources.", installs: 12800, gradient: g("#a78bfa", "#7c3aed"), featured: true },
  { id: "m-2", name: "Julian Cruz", category: "Marketing", tagline: "Turns product changes into launch copy.", installs: 9410, gradient: g("#c084fc", "#9333ea") },
  { id: "m-3", name: "Zara Malik", category: "Sales", tagline: "Personalized outbound at 40 accounts/day.", installs: 7620, gradient: g("#8b5cf6", "#6d28d9") },
  { id: "m-4", name: "Theo Rasmussen", category: "Development", tagline: "Reads PRs and writes changelogs you'd ship.", installs: 15230, gradient: g("#b794f6", "#6b21a8"), featured: true },
  { id: "m-5", name: "Isla Fernández", category: "Support", tagline: "Zero-touch triage for Intercom & Zendesk.", installs: 6120, gradient: g("#a855f7", "#7e22ce") },
  { id: "m-6", name: "Kwame Boateng", category: "Operations", tagline: "Watches cloud spend, pings before it hurts.", installs: 4310, gradient: g("#a78bfa", "#5b21b6") },
  { id: "m-7", name: "Sana Yoshida", category: "Marketing", tagline: "Repackages one post into ten channels.", installs: 8940, gradient: g("#d8b4fe", "#a855f7") },
  { id: "m-8", name: "Mateo Bianchi", category: "Development", tagline: "Refactors legacy modules with tests attached.", installs: 5620, gradient: g("#c4b5fd", "#7c3aed") },
  { id: "m-9", name: "Freya Lindberg", category: "Operations", tagline: "SLO watcher with narrative alerting.", installs: 3810, gradient: g("#a78bfa", "#5b21b6") },
  { id: "m-10", name: "Rohan Desai", category: "Marketing", tagline: "Writes changelog emails your users read.", installs: 7120, gradient: g("#c084fc", "#9333ea") },
  { id: "m-11", name: "Camille Dupont", category: "Research", tagline: "Reads earnings calls, hands you the delta.", installs: 4210, gradient: g("#a78bfa", "#7c3aed") },
  { id: "m-12", name: "Yusuf Kaya", category: "Support", tagline: "Escalates only what a human needs to see.", installs: 3320, gradient: g("#a855f7", "#7e22ce") },
];

export const SEED_KNOWLEDGE: KnowledgeSource[] = [
  { id: "k-1", kind: "document", title: "Voice & Tone Guide v4", meta: "PDF · 2.4 MB", updatedAt: -86400_000 * 3, category: "Brand" },
  { id: "k-2", kind: "document", title: "Product Brief — Q3", meta: "DOCX · 812 KB", updatedAt: -86400_000 * 5, category: "Product" },
  { id: "k-3", kind: "url", title: "Anthropic MCP Specification", meta: "modelcontextprotocol.io/spec", updatedAt: -86400_000 * 12, category: "Reference" },
  { id: "k-4", kind: "note", title: "Design partner interview — Ramp", meta: "1,240 words", updatedAt: -86400_000 * 1, category: "Research" },
  { id: "k-5", kind: "document", title: "Architecture Decision Records", meta: "MD · 48 files", updatedAt: -86400_000 * 8, category: "Engineering" },
  { id: "k-6", kind: "url", title: "OpenAI Assistants Deprecation Notice", meta: "openai.com/blog/…", updatedAt: -86400_000 * 20, category: "Reference" },
  { id: "k-7", kind: "note", title: "Objection library — pricing", meta: "620 words", updatedAt: -86400_000 * 4, category: "Sales" },
  { id: "k-8", kind: "document", title: "Incident post-mortem #2841", meta: "MD · 14 KB", updatedAt: -86400_000 * 2, category: "Engineering" },
];

// Initial activity feed (loaded once; live simulator appends more)
export const SEED_ACTIVITY: ActivityEvent[] = [
  { id: "a-1", ts: -12_000, agentId: "research-01", agentName: "Aria Chen", kind: "reasoning", message: "Cross-referencing today's competitive pull" },
  { id: "a-2", ts: -28_000, agentId: "seo-01", agentName: "Marcus Silva", kind: "started", message: "Started outline for 'agent orchestration' cluster" },
  { id: "a-3", ts: -45_000, agentId: "sdr-01", agentName: "Priya Kapoor", kind: "waiting", message: "Awaiting HubSpot rate-limit backoff" },
  { id: "a-4", ts: -60_000, agentId: "codegen-01", agentName: "Amara Okafor", kind: "completed", message: "Merged PR #2314 into main" },
  { id: "a-5", ts: -180_000, agentId: "ops-01", agentName: "Kenji Watanabe", kind: "tool", message: "Queried Datadog: p99=358ms" },
  { id: "a-6", ts: -240_000, agentId: "analyst-01", agentName: "Diego Herrera", kind: "failed", message: "Snowflake permission error — escalated" },
  { id: "a-7", ts: -600_000, agentId: "support-01", agentName: "Elena Rossi", kind: "completed", message: "Triaged 8 incoming tickets" },
  { id: "a-8", ts: -1800_000, agentId: "recruiter-01", agentName: "Noor Al-Amin", kind: "completed", message: "Sourced 18 candidates for Staff Frontend" },
];
