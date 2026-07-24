"use client";

import { useEffect } from "react";
import { useAgentsStore } from "@/stores/dashboard/agents-store";
import { useFeedStore } from "@/stores/dashboard/feed-store";

/**
 * Periodically refresh data from the API.
 * Mounted once from app/dashboard/layout.tsx.
 */
export function useAgentSimulator() {
  const fetchAgents = useAgentsStore((s) => s.fetchAgents);
  const fetchActivity = useFeedStore((s) => s.fetchActivity);

  // Initial fetch
  useEffect(() => {
    fetchAgents();
    fetchActivity();
  }, [fetchAgents, fetchActivity]);

  // Periodic refresh every 10 seconds
  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      fetchAgents();
      fetchActivity();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchAgents, fetchActivity]);
}
