"use client";

import { create } from "zustand";
import type { ActivityEvent } from "@/lib/dashboard/types";

const CAP = 200;

type FeedState = {
  events: ActivityEvent[];
  loading: boolean;
  error: string | null;
  hydrated: boolean;
  fetchActivity: () => Promise<void>;
  push: (e: ActivityEvent) => void;
};

function mapApiEvent(apiEvent: Record<string, unknown>): ActivityEvent {
  return {
    id: apiEvent.id as string,
    ts: new Date(apiEvent.createdAt as string).getTime(),
    agentId: apiEvent.agentId as string,
    agentName: "Agent",
    kind: (apiEvent.kind as ActivityEvent["kind"]) || "started",
    message: apiEvent.message as string,
  };
}

export const useFeedStore = create<FeedState>((set, get) => ({
  events: [],
  loading: false,
  error: null,
  hydrated: false,

  fetchActivity: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/activity");
      if (!res.ok) throw new Error("Failed to fetch activity");
      const data = await res.json();
      const events = data.activity.map(mapApiEvent);
      set({ events, hydrated: true, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },

  push: (e) =>
    set((s) => {
      const next = [...s.events, e];
      if (next.length > CAP) next.splice(0, next.length - CAP);
      return { events: next };
    }),
}));
