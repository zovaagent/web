import { Ollama } from "ollama";

const ollama = new Ollama({
  host: process.env.OLLAMA_HOST || "http://localhost:11434",
});

export default ollama;

export const OLLAMA_MODELS = {
  fast: "llama3.2:3b",
  balanced: "llama3.1:8b",
  powerful: "llama3.1:70b",
  code: "codellama:13b",
} as const;

export type ModelTier = keyof typeof OLLAMA_MODELS;

export function getModelForAgent(agentRole: string): string {
  const role = agentRole.toLowerCase();

  if (role.includes("code") || role.includes("dev")) {
    return OLLAMA_MODELS.code;
  }
  if (role.includes("research") || role.includes("analyst")) {
    return OLLAMA_MODELS.powerful;
  }
  return OLLAMA_MODELS.balanced;
}
