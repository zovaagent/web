import type { ActivityEvent, LogLine, Agent, AgentStatus } from "./types";

let counter = 0;
const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${(counter++).toString(36)}`;

const LOG_TEMPLATES: Record<string, [string, LogLine["level"]][]> = {
  "research-01": [
    ["Firecrawl → competitor.ai (200 OK)", "info"],
    ["Extracted 3 new pricing rows", "success"],
    ["Diff vs last snapshot: 1 change", "info"],
    ["Sonnet tokens used: {n}", "debug"],
  ],
  "seo-01": [
    ["Drafted next 240 words — voice check passed", "success"],
    ["Keyword density on 'orchestration' 1.6% — in band", "info"],
    ["Cited claim verified against source", "success"],
    ["Sonnet tokens used: {n}", "debug"],
  ],
  "sdr-01": [
    ["Enriched account: {co}", "success"],
    ["ICP score {n}/10 — queuing", "info"],
    ["HubSpot: 200 OK, upserted contact", "success"],
  ],
  "support-01": [
    ["New ticket #{n} — categorized as 'billing'", "info"],
    ["Auto-escalated to @rachel", "warn"],
    ["Draft response ready — pending review", "info"],
  ],
  "ops-01": [
    ["Datadog: p99={n}ms", "info"],
    ["Cost today: ${n}", "warn"],
    ["All SLOs green", "success"],
  ],
  "codegen-01": [
    ["Vitest: {n} pass, 0 fail", "success"],
    ["Committed to branch feat/{co}", "info"],
    ["Opened PR #{n}", "success"],
  ],
  "analyst-01": [
    ["Retrying Snowflake query ({n}/3)", "warn"],
    ["Query timeout after 30s", "error"],
  ],
  "recruiter-01": [
    ["Reviewed 12 LinkedIn profiles", "info"],
    ["3 candidates match 'Staff' bar", "success"],
  ],
};

const COMPANIES = ["ramp", "linear", "vercel", "figma", "notion", "supabase", "mercury", "arc", "raycast", "modal"];

function fill(template: string): string {
  return template
    .replace(/\{n\}/g, () => String(50 + Math.floor(Math.random() * 950)))
    .replace(/\{co\}/g, () => COMPANIES[Math.floor(Math.random() * COMPANIES.length)]);
}

export function generateLogLine(agent: Agent): LogLine {
  const templates = LOG_TEMPLATES[agent.id] ?? [["Working…", "info" as const]];
  const [tpl, level] = templates[Math.floor(Math.random() * templates.length)];
  return {
    id: uid(`log-${agent.id}`),
    ts: Date.now(),
    level,
    message: fill(tpl),
  };
}

const EVENT_KINDS: ActivityEvent["kind"][] = ["reasoning", "tool", "reasoning", "reasoning"];
const REASONING_SNIPPETS: Record<string, string[]> = {
  "research-01": [
    "Weighting recency higher than authority for this cluster",
    "Filed today's diff under 'positioning shifts'",
    "Ignoring paid ads — signal-to-noise too low",
  ],
  "seo-01": [
    "Cutting the intro — reader wants the answer",
    "Swapping stat from 2024 to 2026 source",
    "Adding diagram callout in section 3",
  ],
  "sdr-01": [
    "Rewriting first-touch — was too template",
    "Skipping this ICP miss — 12 headcount",
    "Batching next 20 accounts for enrichment",
  ],
  "ops-01": [
    "Latency drift not yet actionable — noting",
    "Cost curve within budget band",
    "Muted repeat alerts for the next 30m",
  ],
  "codegen-01": [
    "Adding a test for the retry path",
    "Split the diff into two commits for review",
  ],
  "support-01": ["Watching Intercom for the next event"],
  "analyst-01": ["Escalation is the only path — logging and pausing"],
  "recruiter-01": ["Waiting on Monday for next role batch"],
};
const TOOL_SNIPPETS: Record<string, string[]> = {
  "research-01": ["Firecrawl pull on competitor.ai", "Web Search: 'agent runtime pricing'"],
  "seo-01": ["Ahrefs: keyword volume check", "Sanity: draft synced"],
  "sdr-01": ["Apollo: filter passed", "HubSpot: contact upserted"],
  "ops-01": ["Datadog: latency query", "AWS: cost anomaly check"],
  "codegen-01": ["GitHub: opened PR", "Vitest: full suite"],
  "support-01": ["Intercom: read queue"],
  "analyst-01": ["Snowflake: retry"],
  "recruiter-01": ["LinkedIn: profile scan"],
};

export function generateActivityEvent(agent: Agent): ActivityEvent {
  const kind = EVENT_KINDS[Math.floor(Math.random() * EVENT_KINDS.length)];
  const bank = kind === "tool" ? TOOL_SNIPPETS[agent.id] : REASONING_SNIPPETS[agent.id];
  const pool = bank ?? ["Working…"];
  return {
    id: uid(`ev-${agent.id}`),
    ts: Date.now(),
    agentId: agent.id,
    agentName: agent.name,
    kind,
    message: pool[Math.floor(Math.random() * pool.length)],
  };
}

// Status transitions for the simulator
const STATUS_TRANSITIONS: Record<AgentStatus, AgentStatus[]> = {
  idle: ["running", "running", "idle"],
  running: ["running", "running", "running", "waiting", "completed"],
  waiting: ["running", "waiting", "completed"],
  completed: ["idle", "running"],
  failed: ["idle", "running"],
};

export function nextStatus(current: AgentStatus): AgentStatus {
  const options = STATUS_TRANSITIONS[current];
  return options[Math.floor(Math.random() * options.length)];
}
