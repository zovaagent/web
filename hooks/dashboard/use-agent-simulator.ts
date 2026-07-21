"use client";

import { useEffect } from "react";
import { useAgentsStore } from "@/stores/dashboard/agents-store";
import { useFeedStore } from "@/stores/dashboard/feed-store";
import { generateActivityEvent } from "@/lib/dashboard/mock-generators";

/**
 * Single global heartbeat for the mocked "living system".
 * Mounted once from app/dashboard/layout.tsx.
 */
export function useAgentSimulator() {
  const hydrateAgents = useAgentsStore((s) => s.hydrate);
  const hydrateFeed = useFeedStore((s) => s.hydrate);
  const tick = useAgentsStore((s) => s.tick);
  const push = useFeedStore((s) => s.push);

  useEffect(() => {
    hydrateAgents();
    hydrateFeed();
  }, [hydrateAgents, hydrateFeed]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Push a new activity event every 1.8s (or 6s if reduced motion).
    const interval = setInterval(
      () => {
        const { agents } = useAgentsStore.getState();
        const running = agents.filter((a) => a.status === "running");
        if (running.length === 0) return;
        const agent = running[Math.floor(Math.random() * running.length)];
        push(generateActivityEvent(agent));
        tick();
      },
      prefersReduced ? 6000 : 1800
    );

    return () => clearInterval(interval);
  }, [tick, push]);
}
