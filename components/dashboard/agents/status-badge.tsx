import { cn } from "@/lib/utils";
import { PulseDot } from "@/components/dashboard/common/pulse-dot";
import type { AgentStatus } from "@/lib/dashboard/types";

const LABEL: Record<AgentStatus, string> = {
  running: "Running",
  idle: "Idle",
  waiting: "Waiting",
  completed: "Completed",
  failed: "Failed",
};

const RING: Record<AgentStatus, string> = {
  running: "text-[#c4b5fd] border-[rgba(167,139,250,0.28)] bg-[rgba(139,92,246,0.10)]",
  waiting: "text-amber-200 border-amber-300/25 bg-amber-500/[0.08]",
  idle: "text-white/55 border-white/10 bg-white/[0.03]",
  completed: "text-emerald-200 border-emerald-400/25 bg-emerald-500/[0.06]",
  failed: "text-rose-200 border-rose-400/30 bg-rose-500/[0.08]",
};

export function StatusBadge({
  status,
  className,
}: {
  status: AgentStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
        RING[status],
        className
      )}
    >
      <PulseDot status={status} size={6} />
      {LABEL[status]}
    </span>
  );
}
