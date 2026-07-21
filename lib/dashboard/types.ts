export type AgentStatus =
  | "idle"
  | "running"
  | "waiting"
  | "failed"
  | "completed";

export type AgentCategory =
  | "Research"
  | "Marketing"
  | "Sales"
  | "Development"
  | "Support"
  | "Operations";

export type LogLevel = "info" | "success" | "warn" | "error" | "debug";

export type LogLine = {
  id: string;
  ts: number; // epoch ms
  level: LogLevel;
  message: string;
};

export type Execution = {
  id: string;
  ts: number;
  title: string;
  status: "completed" | "failed" | "running";
  durationMs: number;
  tokens: number;
};

export type MemoryEntry = {
  id: string;
  key: string;
  value: string;
  updatedAt: number;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  category: AgentCategory;
  gradient: [string, string]; // avatar gradient stops
  status: AgentStatus;
  currentTask?: string;
  progress?: number; // 0..100
  lastUpdate: number;
  objective: string;
  tools: string[];
  knowledgeSources: string[];
  memory: MemoryEntry[];
  executions: Execution[];
  reasoning: string; // full chain-of-thought stream (streamed via typewriter)
  logs: LogLine[];
};

export type ActivityEvent = {
  id: string;
  ts: number;
  agentId: string;
  agentName: string;
  kind: "started" | "completed" | "failed" | "waiting" | "reasoning" | "tool";
  message: string;
};

export type MarketplaceAgent = {
  id: string;
  name: string;
  category: AgentCategory;
  tagline: string;
  installs: number;
  gradient: [string, string];
  featured?: boolean;
};

export type KnowledgeSource = {
  id: string;
  kind: "document" | "url" | "note";
  title: string;
  meta: string; // e.g. "PDF · 2.4 MB" or "https://..."
  updatedAt: number;
  category?: string;
};
