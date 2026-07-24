import OpenAI from "openai";

export type LLMProvider = "groq" | "ollama" | "openai";

const provider = (process.env.LLM_PROVIDER || "groq") as LLMProvider;

function createClient(): OpenAI {
  switch (provider) {
    case "groq":
      return new OpenAI({
        apiKey: process.env.GROQ_API_KEY || "gsk_placeholder",
        baseURL: "https://api.groq.com/openai/v1",
      });
    case "openai":
      return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || "",
      });
    case "ollama":
    default:
      return new OpenAI({
        apiKey: "ollama",
        baseURL: process.env.OLLAMA_HOST || "http://localhost:11434/v1",
      });
  }
}

export const llm = createClient();

export const LLM_MODELS: Record<LLMProvider, Record<string, string>> = {
  groq: {
    fast: "llama-3.2-3b-preview",
    balanced: "llama-3.1-8b-instant",
    powerful: "llama-3.3-70b-versatile",
    code: "codellama-34b-instruct",
  },
  ollama: {
    fast: "llama3.2:3b",
    balanced: "llama3.1:8b",
    powerful: "llama3.1:70b",
    code: "codellama:13b",
  },
  openai: {
    fast: "gpt-4o-mini",
    balanced: "gpt-4o",
    powerful: "gpt-4-turbo",
    code: "gpt-4o",
  },
};

export function getModelForAgent(agentRole: string): string {
  const models = LLM_MODELS[provider];
  const role = agentRole.toLowerCase();

  if (role.includes("code") || role.includes("dev")) {
    return models.code;
  }
  if (role.includes("research") || role.includes("analyst")) {
    return models.powerful;
  }
  return models.balanced;
}

export function getProvider(): LLMProvider {
  return provider;
}
