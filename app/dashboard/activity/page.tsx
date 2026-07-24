"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/dashboard/common/section-header";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { useFeedStore } from "@/stores/dashboard/feed-store";
import { useAgentsStore } from "@/stores/dashboard/agents-store";
import type { ActivityEvent } from "@/lib/dashboard/types";
import { formatRelative, formatDateInTimezone, formatDateLabelInTimezone } from "@/lib/dashboard/format";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const KIND_COLOR: Record<ActivityEvent["kind"], string> = {
  started: "bg-[#a78bfa]",
  reasoning: "bg-white/40",
  tool: "bg-cyan-300",
  completed: "bg-emerald-400",
  waiting: "bg-amber-300",
  failed: "bg-rose-400",
};

const KIND_LABEL: Record<ActivityEvent["kind"], string> = {
  started: "Started",
  reasoning: "Reasoning",
  tool: "Tool Call",
  completed: "Completed",
  waiting: "Waiting",
  failed: "Failed",
};

export default function ActivityPage() {
  const { events, fetchActivity, loading } = useFeedStore();
  const { agents, fetchAgents } = useAgentsStore();
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [kindFilter, setKindFilter] = useState<ActivityEvent["kind"] | "all">("all");

  useEffect(() => {
    fetchActivity();
    fetchAgents();
  }, [fetchActivity, fetchAgents]);

  const filtered = useMemo(() => {
    return events
      .filter((e) => (agentFilter === "all" ? true : e.agentId === agentFilter))
      .filter((e) => (kindFilter === "all" ? true : e.kind === kindFilter))
      .slice()
      .reverse();
  }, [events, agentFilter, kindFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, ActivityEvent[]>();
    for (const e of filtered) {
      const k = formatDateInTimezone(e.ts);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(e);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const kinds: Array<ActivityEvent["kind"] | "all"> = [
    "all", "started", "reasoning", "tool", "completed", "waiting", "failed",
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <SectionHeader
        eyebrow="Activity"
        title="Everything, everywhere, always"
        description="A single timeline across every agent in this workspace. Streaming live."
      />

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-widest text-white/40 mr-1">Agent</span>
          <button
            onClick={() => setAgentFilter("all")}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
              agentFilter === "all"
                ? "border-[rgba(167,139,250,0.35)] bg-[rgba(139,92,246,0.10)] text-white"
                : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80"
            )}
          >
            All
          </button>
          {agents.map((a) => (
            <button
              key={a.id}
              onClick={() => setAgentFilter(a.id)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                agentFilter === a.id
                  ? "border-[rgba(167,139,250,0.35)] bg-[rgba(139,92,246,0.10)] text-white"
                  : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80"
              )}
            >
              {a.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-widest text-white/40 mr-1">Kind</span>
          {kinds.map((k) => (
            <button
              key={k}
              onClick={() => setKindFilter(k)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors capitalize",
                kindFilter === k
                  ? "border-[rgba(167,139,250,0.35)] bg-[rgba(139,92,246,0.10)] text-white"
                  : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80"
              )}
            >
              {k === "all" ? "All" : KIND_LABEL[k]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-6 animate-spin text-purple-400" />
          </div>
        ) : grouped.map(([k, items]) => (
          <div key={k} className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
              <span>{formatDateLabelInTimezone(items[0].ts)}</span>
              <span className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-white/40">{items.length}</span>
            </div>
            <GlowCard className="overflow-hidden">
              <ul className="divide-y divide-white/[0.05]">
                {items.map((e, i) => (
                  <motion.li
                    key={e.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.01 * Math.min(i, 15) }}
                    className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", KIND_COLOR[e.kind])} />
                    <span className="w-24 shrink-0 text-[12px] font-medium text-white/80">
                      {e.agentName}
                    </span>
                    <span className="w-20 shrink-0 text-[11px] uppercase tracking-widest text-white/40">
                      {KIND_LABEL[e.kind]}
                    </span>
                    <span className="flex-1 truncate text-[13px] text-white/60">
                      {e.message}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-white/35">
                      {formatRelative(e.ts)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>
          </div>
        ))}
      </div>
    </div>
  );
}
