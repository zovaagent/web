export interface Agent {
  name: string;
  tagline: string;
  description: string;
  category: "Finance" | "Security" | "Research" | "Operations" | "Community" | "Custom" | string;
  autonomyLevel: number;
  tools: string[];
  knowledge: string[];
  workflow: string[];
  simulatedLogs: string[];
}
