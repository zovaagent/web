"use client";

import { create } from "zustand";
import type { Agent } from "@/lib/dashboard/types";

type AgentsState = {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  hydrated: boolean;
  fetchAgents: () => Promise<void>;
  fetchAgentById: (id: string) => Promise<Agent | null>;
  createAgent: (prompt: string, name?: string) => Promise<Agent | null>;
  runAgent: (agentId: string, prompt?: string) => Promise<void>;
  getById: (id: string) => Agent | undefined;
  updateAgent: (id: string, update: Partial<Agent>) => void;
};

function mapApiAgentToAgent(apiAgent: Record<string, unknown>): Agent {
  return {
    id: apiAgent.id as string,
    name: apiAgent.name as string,
    role: apiAgent.role as string,
    category: (apiAgent.category as Agent["category"]) || "Operations",
    gradient: (apiAgent.gradient as [string, string]) || ["#a78bfa", "#7c3aed"],
    status: (apiAgent.status as Agent["status"]) || "idle",
    currentTask: (apiAgent.currentTask as string) || undefined,
    progress: (apiAgent.progress as number) || 0,
    lastUpdate: new Date(apiAgent.updatedAt as string).getTime(),
    objective: apiAgent.objective as string,
    tools: (apiAgent.tools as string[]) || [],
    knowledgeSources: (apiAgent.knowledgeSources as string[]) || [],
    memory: ((apiAgent.memory as { key: string; value: string }[]) || []).map(
      (m, i) => ({
        id: `mem-${i}`,
        key: m.key,
        value: m.value,
        updatedAt: Date.now(),
      })
    ),
    executions: ((apiAgent.executions as Record<string, unknown>[]) || []).map(
      (e) => ({
        id: e.id as string,
        ts: new Date((e.startedAt as string) || Date.now()).getTime(),
        title: (e.title as string) || "Execution",
        status: (e.status as "completed" | "failed" | "running") || "completed",
        durationMs: (e.durationMs as number) || 0,
        tokens: (e.tokens as number) || 0,
      })
    ),
    reasoning: (apiAgent.reasoning as string) || "",
    logs: ((apiAgent.logs as { level: string; message: string }[]) || []).map(
      (l, i) => ({
        id: `log-${i}`,
        ts: Date.now() - i * 1000,
        level: l.level as Agent["logs"][0]["level"],
        message: l.message,
      })
    ),
  };
}

export const useAgentsStore = create<AgentsState>((set, get) => ({
  agents: [],
  loading: false,
  error: null,
  hydrated: false,

  fetchAgents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/agents");
      if (!res.ok) throw new Error("Failed to fetch agents");
      const data = await res.json();
      const agents = data.agents.map(mapApiAgentToAgent);
      set({ agents, hydrated: true, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },

  fetchAgentById: async (id: string) => {
    try {
      const res = await fetch(`/api/agents/${id}`);
      if (!res.ok) return null;
      const data = await res.json();
      return mapApiAgentToAgent(data.agent);
    } catch {
      return null;
    }
  },

  createAgent: async (prompt: string, name?: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/create-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, name }),
      });
      if (!res.ok) throw new Error("Failed to create agent");
      const data = await res.json();
      const agent = mapApiAgentToAgent(data.agent);

      // Add to local state
      set((state) => ({
        agents: [agent, ...state.agents],
        loading: false,
      }));

      return agent;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
      return null;
    }
  },

  runAgent: async (agentId: string, prompt?: string) => {
    try {
      // Update local state immediately
      set((state) => ({
        agents: state.agents.map((a) =>
          a.id === agentId
            ? { ...a, status: "running" as const, progress: 0 }
            : a
        ),
      }));

      const res = await fetch("/api/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, prompt }),
      });

      if (!res.ok) throw new Error("Failed to run agent");
      const data = await res.json();

      // Update with final status
      set((state) => ({
        agents: state.agents.map((a) =>
          a.id === agentId
            ? {
                ...a,
                status: data.result.status,
                progress: data.result.status === "completed" ? 100 : 0,
              }
            : a
        ),
      }));
    } catch (err) {
      // Mark as failed on error
      set((state) => ({
        agents: state.agents.map((a) =>
          a.id === agentId ? { ...a, status: "failed" as const } : a
        ),
      }));
    }
  },

  getById: (id) => get().agents.find((a) => a.id === id),

  updateAgent: (id, update) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === id ? { ...a, ...update } : a)),
    })),
}));
