"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { PulseDot } from "@/components/dashboard/common/pulse-dot";
import type { AgentStatus } from "@/lib/dashboard/types";

export function MetricTile({
  label,
  value,
  delta,
  hint,
  pulseAs,
  index = 0,
}: {
  label: string;
  value: number | string;
  delta?: string;
  hint?: string;
  pulseAs?: AgentStatus;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 + index * 0.05 }}
      className="flex-1"
    >
      <GlowCard interactive className="flex h-full flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
            {label}
          </span>
          {pulseAs && <PulseDot status={pulseAs} size={7} />}
        </div>
        <div className="flex items-baseline gap-3">
          <motion.span
            key={String(value)}
            initial={{ opacity: 0.4, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-light tracking-tight text-white"
          >
            {value}
          </motion.span>
          {delta && (
            <span className={cn("text-[12px] font-medium text-[#a78bfa]")}>{delta}</span>
          )}
        </div>
        {hint && <span className="text-[12px] text-white/40">{hint}</span>}
      </GlowCard>
    </motion.div>
  );
}
