"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { AgentAvatar } from "@/components/dashboard/common/agent-avatar";
import { StatusBadge } from "./status-badge";
import type { Agent } from "@/lib/dashboard/types";
import { formatRelative } from "@/lib/dashboard/format";

export function AgentCard({ agent, index = 0 }: { agent: Agent; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.03 * index }}
    >
      <GlowCard interactive className="group relative flex h-full flex-col gap-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <AgentAvatar seed={agent.name} gradient={agent.gradient} size={44} rounded="xl" />
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-medium text-white">{agent.name}</span>
              <span className="text-[12px] text-white/45">{agent.role}</span>
            </div>
          </div>
          <StatusBadge status={agent.status} />
        </div>

        <div className="min-h-[52px] rounded-lg border border-white/[0.05] bg-black/25 p-3">
          <p className="line-clamp-2 text-[12.5px] leading-relaxed text-white/60">
            {agent.currentTask ?? agent.objective}
          </p>
        </div>

        {agent.status === "running" && typeof agent.progress === "number" && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-white/40">
              <span>Progress</span>
              <span className="font-mono text-white/70">{agent.progress}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#7c3aed]"
                animate={{ width: `${agent.progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-4 text-[11px] text-white/40">
          <span>Updated {formatRelative(agent.lastUpdate)}</span>
          <Link
            href={`/dashboard/agents/${agent.id}`}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#a78bfa] transition-colors group-hover:text-[#c4b5fd]"
          >
            Open
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </GlowCard>
    </motion.div>
  );
}
