"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { PulseDot } from "@/components/dashboard/common/pulse-dot";
import { AgentAvatar } from "@/components/dashboard/common/agent-avatar";
import { useAgentsStore } from "@/stores/dashboard/agents-store";

export function AgentPulseGrid() {
  const agents = useAgentsStore((s) => s.agents);
  return (
    <GlowCard className="flex h-[520px] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <div className="flex flex-col leading-tight">
          <span className="text-[13px] font-medium text-white">Agent Pulse</span>
          <span className="text-[11px] text-white/40">All {agents.length} agents at a glance</span>
        </div>
        <Link
          href="/dashboard/agents"
          className="text-[11px] font-medium text-[#a78bfa] hover:text-[#c4b5fd]"
        >
          View all →
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {agents.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.03 * i }}
          >
            <Link
              href={`/dashboard/agents/${a.id}`}
              className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/[0.03]"
            >
              <AgentAvatar seed={a.name} role={a.role} gradient={a.gradient} size={32} rounded="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-medium text-white">
                    {a.name}
                  </span>
                  <PulseDot status={a.status} size={6} />
                </div>
                <div className="truncate text-[11px] text-white/40">
                  {a.currentTask ?? a.role}
                </div>
                {a.status === "running" && typeof a.progress === "number" && (
                  <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#7c3aed]"
                      animate={{ width: `${a.progress}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}
