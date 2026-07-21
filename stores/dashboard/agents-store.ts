"use client";

import { create } from "zustand";
import type { Agent } from "@/lib/dashboard/types";
import { SEED_AGENTS } from "@/lib/dashboard/mock-data";
import { generateLogLine, nextStatus } from "@/lib/dashboard/mock-generators";

type AgentsState = {
  agents: Agent[];
  hydrated: boolean;
  hydrate: () => void;
  tick: () => void;
  getById: (id: string) => Agent | undefined;
};

// Normalize seed offsets to real timestamps on first hydrate.
function normalizeSeed(): Agent[] {
  const now = Date.now();
  return SEED_AGENTS.map((a) => ({
    ...a,
    lastUpdate: now + a.lastUpdate,
    memory: a.memory.map((m) => ({ ...m, updatedAt: now + m.updatedAt })),
    executions: a.executions.map((e) => ({ ...e, ts: now + e.ts })),
    logs: a.logs.map((l) => ({ ...l, ts: now + l.ts })),
  }));
}

export const useAgentsStore = create<AgentsState>((set, get) => ({
  agents: SEED_AGENTS, // used before hydrate; offsets act as placeholder
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    set({ agents: normalizeSeed(), hydrated: true });
  },
  tick: () => {
    const now = Date.now();
    set((state) => {
      const running = state.agents.filter((a) => a.status === "running");
      if (running.length === 0) return state;

      // Pick 1–2 running agents to advance
      const picks = new Set<string>();
      const count = Math.min(running.length, 1 + Math.floor(Math.random() * 2));
      while (picks.size < count) {
        picks.add(running[Math.floor(Math.random() * running.length)].id);
      }

      const nextAgents = state.agents.map((a) => {
        if (!picks.has(a.id)) return a;
        const log = generateLogLine(a);
        const newLogs = [...a.logs.slice(-49), log];
        const progress = Math.min(100, (a.progress ?? 0) + 3 + Math.floor(Math.random() * 6));
        return { ...a, logs: newLogs, progress, lastUpdate: now };
      });

      // Every ~6th tick, transition one agent's status
      if (Math.random() < 0.16) {
        const target = nextAgents[Math.floor(Math.random() * nextAgents.length)];
        const ns = nextStatus(target.status);
        const idx = nextAgents.indexOf(target);
        nextAgents[idx] = {
          ...target,
          status: ns,
          progress: ns === "running" ? 0 : ns === "completed" ? 100 : target.progress,
          lastUpdate: now,
        };
      }

      return { agents: nextAgents };
    });
  },
  getById: (id) => get().agents.find((a) => a.id === id),
}));
