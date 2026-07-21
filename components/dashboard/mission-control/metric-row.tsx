"use client";

import { useMemo } from "react";
import { MetricTile } from "./metric-tile";
import { useAgentsStore } from "@/stores/dashboard/agents-store";

export function MetricRow() {
  const agents = useAgentsStore((s) => s.agents);

  const { active, executing, completedToday } = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    return {
      active: agents.filter((a) => a.status !== "idle").length,
      executing: agents.filter((a) => a.status === "running").length,
      completedToday: agents.reduce(
        (n, a) =>
          n +
          a.executions.filter(
            (e) => e.status === "completed" && now - e.ts < dayMs
          ).length,
        0
      ),
    };
  }, [agents]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <MetricTile
        index={0}
        label="Active Agents"
        value={active}
        hint={`${agents.length} total in workspace`}
      />
      <MetricTile
        index={1}
        label="Currently Executing"
        value={executing}
        pulseAs="running"
        hint="Live tasks in flight"
      />
      <MetricTile
        index={2}
        label="Completed Today"
        value={completedToday}
        delta="+3"
        hint="Successful runs, last 24h"
      />
    </div>
  );
}
