"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AgentStatus } from "@/lib/dashboard/types";

const STATUS_COLOR: Record<AgentStatus, string> = {
  running: "bg-[#a78bfa] shadow-[0_0_12px_2px_rgba(167,139,250,0.55)]",
  waiting: "bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.45)]",
  idle: "bg-white/25",
  completed: "bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.35)]",
  failed: "bg-rose-400 shadow-[0_0_10px_2px_rgba(251,113,133,0.45)]",
};

export function PulseDot({
  status,
  size = 8,
  className,
}: {
  status: AgentStatus;
  size?: number;
  className?: string;
}) {
  const shouldPulse = status === "running" || status === "waiting";
  return (
    <span
      className={cn("relative inline-block rounded-full", STATUS_COLOR[status], className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {shouldPulse && (
        <motion.span
          className="absolute inset-0 rounded-full bg-current opacity-40"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </span>
  );
}
