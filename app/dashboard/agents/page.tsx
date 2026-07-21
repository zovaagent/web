"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/common/section-header";
import { AgentCard } from "@/components/dashboard/agents/agent-card";
import { useAgentsStore } from "@/stores/dashboard/agents-store";
import type { AgentStatus } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

const FILTERS: Array<{ label: string; value: AgentStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Running", value: "running" },
  { label: "Waiting", value: "waiting" },
  { label: "Idle", value: "idle" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" },
];

export default function AgentsPage() {
  const agents = useAgentsStore((s) => s.agents);
  const [filter, setFilter] = useState<AgentStatus | "all">("all");

  const visible = filter === "all" ? agents : agents.filter((a) => a.status === filter);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <SectionHeader
        eyebrow="Workspace"
        title="My Agents"
        description="Every agent you've deployed. Their memory, tools, and reasoning stay yours."
      />

      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((f) => {
          const count = f.value === "all" ? agents.length : agents.filter((a) => a.status === f.value).length;
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                active
                  ? "border-[rgba(167,139,250,0.35)] bg-[rgba(139,92,246,0.10)] text-white"
                  : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white/80"
              )}
            >
              {f.label}
              <span className={cn("font-mono text-[11px]", active ? "text-[#c4b5fd]" : "text-white/35")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((a, i) => (
          <AgentCard key={a.id} agent={a} index={i} />
        ))}
      </div>
    </div>
  );
}
