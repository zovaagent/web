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
      <GlowCard interactive className="group relative flex h-full overflow-hidden">
        <div className="relative w-[38%] shrink-0 overflow-hidden">
          <AgentAvatar
            seed={agent.name}
            role={agent.role}
            gradient={agent.gradient}
            size={320}
            rounded="md"
            className="!h-full !w-full !rounded-none"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#0d0d14]" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[16px] font-semibold text-white">{agent.name}</span>
              <span className="truncate text-[12px] text-white/45">{agent.role}</span>
            </div>
            <StatusBadge status={agent.status} />
          </div>

          <p className="line-clamp-3 text-[12.5px] leading-relaxed text-white/60">
            {agent.currentTask ?? agent.objective}
          </p>

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

          <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-3 text-[11px] text-white/40">
            <span>Updated {formatRelative(agent.lastUpdate)}</span>
            <Link
              href={`/dashboard/agents/${agent.id}`}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#a78bfa] transition-colors group-hover:text-[#c4b5fd]"
            >
              Open
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
