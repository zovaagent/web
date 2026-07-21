"use client";

import { create } from "zustand";
import type { ActivityEvent } from "@/lib/dashboard/types";
import { SEED_ACTIVITY } from "@/lib/dashboard/mock-data";

const CAP = 200;

type FeedState = {
  events: ActivityEvent[];
  hydrated: boolean;
  hydrate: () => void;
  push: (e: ActivityEvent) => void;
};

function normalizeSeed(): ActivityEvent[] {
  const now = Date.now();
  return SEED_ACTIVITY.map((e) => ({ ...e, ts: now + e.ts }));
}

export const useFeedStore = create<FeedState>((set, get) => ({
  events: SEED_ACTIVITY,
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    set({ events: normalizeSeed(), hydrated: true });
  },
  push: (e) =>
    set((s) => {
      const next = [...s.events, e];
      if (next.length > CAP) next.splice(0, next.length - CAP);
      return { events: next };
    }),
}));
