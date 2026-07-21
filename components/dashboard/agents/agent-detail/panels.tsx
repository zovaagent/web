"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  BookOpen,
  Cog,
  History,
  Radio,
  Sparkles,
  Terminal,
} from "lucide-react";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { StatusBadge } from "@/components/dashboard/agents/status-badge";
import { useTypewriter } from "@/hooks/dashboard/use-typewriter";
import { formatDuration, formatNumber, formatRelative } from "@/lib/dashboard/format";
import type { Agent, LogLevel } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

function PanelHeader({
  id,
  icon: Icon,
  label,
  eyebrow,
}: {
  id: string;
  icon: typeof Bot;
  label: string;
  eyebrow?: string;
}) {
  return (
    <div id={id} className="mb-4 flex items-center gap-2.5">
      <div className="flex size-7 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.03] text-[#a78bfa]">
        <Icon className="size-3.5" />
      </div>
      <div className="flex flex-col leading-tight">
        {eyebrow && (
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
            {eyebrow}
          </span>
        )}
        <span className="text-[15px] font-medium text-white">{label}</span>
      </div>
    </div>
  );
}

export function ObjectivePanel({ agent }: { agent: Agent }) {
  return (
    <section className="scroll-mt-20">
      <PanelHeader id="objective" icon={Sparkles} eyebrow="01" label="Objective" />
      <GlowCard className="p-6">
        <p className="text-[15px] leading-relaxed text-white/75">{agent.objective}</p>
      </GlowCard>
    </section>
  );
}

export function StatusPanel({ agent }: { agent: Agent }) {
  return (
    <section className="scroll-mt-20">
      <PanelHeader id="status" icon={Radio} eyebrow="02" label="Status" />
      <GlowCard className="p-6">
        <div className="flex flex-wrap items-center gap-6">
          <StatusBadge status={agent.status} />
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/40">Current Task</span>
            <span className="mt-1 text-[13.5px] text-white/80">
              {agent.currentTask ?? "—"}
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/40">Updated</span>
            <span className="mt-1 text-[13.5px] text-white/80">
              {formatRelative(agent.lastUpdate)}
            </span>
          </div>
          {typeof agent.progress === "number" && agent.status === "running" && (
            <div className="flex min-w-[200px] flex-1 flex-col leading-tight">
              <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.16em] text-white/40">
                <span>Progress</span>
                <span className="font-mono text-white/60">{agent.progress}%</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#7c3aed]"
                  animate={{ width: `${agent.progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </div>
      </GlowCard>
    </section>
  );
}

export function ReasoningPanel({ agent }: { agent: Agent }) {
  const typed = useTypewriter(agent.reasoning, 55);
  return (
    <section className="scroll-mt-20">
      <PanelHeader id="reasoning" icon={Brain} eyebrow="03" label="Reasoning" />
      <GlowCard className="p-6">
        <p className="font-mono text-[13px] leading-[1.75] text-white/70">
          <span className="text-[#a78bfa]">›</span> {typed}
          <span className="ml-0.5 inline-block h-[14px] w-[6px] translate-y-[2px] animate-pulse bg-[#a78bfa]/60" />
        </p>
      </GlowCard>
    </section>
  );
}

export function ToolsPanel({ agent }: { agent: Agent }) {
  return (
    <section className="scroll-mt-20">
      <PanelHeader id="tools" icon={Cog} eyebrow="04" label="Connected Tools" />
      <GlowCard className="p-6">
        <div className="flex flex-wrap gap-2">
          {agent.tools.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[12.5px] text-white/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              {t}
            </span>
          ))}
        </div>
      </GlowCard>
    </section>
  );
}

export function KnowledgePanel({ agent }: { agent: Agent }) {
  return (
    <section className="scroll-mt-20">
      <PanelHeader id="knowledge" icon={BookOpen} eyebrow="05" label="Knowledge" />
      <GlowCard className="p-6">
        <ul className="divide-y divide-white/[0.05]">
          {agent.knowledgeSources.map((k) => (
            <li key={k} className="flex items-center gap-3 py-3 text-[13px] text-white/70">
              <BookOpen className="size-3.5 text-white/40" />
              {k}
            </li>
          ))}
        </ul>
      </GlowCard>
    </section>
  );
}

export function MemoryPanel({ agent }: { agent: Agent }) {
  return (
    <section className="scroll-mt-20">
      <PanelHeader id="memory" icon={Brain} eyebrow="06" label="Memory" />
      <GlowCard className="p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {agent.memory.map((m) => (
            <div
              key={m.id}
              className="rounded-lg border border-white/[0.05] bg-black/25 p-3"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]/80">
                  {m.key}
                </span>
                <span className="text-[10px] text-white/35">
                  {formatRelative(m.updatedAt)}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/70">{m.value}</p>
            </div>
          ))}
        </div>
      </GlowCard>
    </section>
  );
}

export function ExecutionHistoryPanel({ agent }: { agent: Agent }) {
  return (
    <section className="scroll-mt-20">
      <PanelHeader id="executions" icon={History} eyebrow="07" label="Execution History" />
      <GlowCard className="overflow-hidden">
        <ul className="divide-y divide-white/[0.05]">
          {agent.executions.map((e) => (
            <li
              key={e.id}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  e.status === "completed" && "bg-emerald-400",
                  e.status === "failed" && "bg-rose-400",
                  e.status === "running" && "bg-[#a78bfa]"
                )}
              />
              <span className="flex-1 truncate text-[13.5px] text-white/75">{e.title}</span>
              <span className="hidden font-mono text-[11px] text-white/40 sm:inline">
                {formatDuration(e.durationMs)}
              </span>
              <span className="hidden font-mono text-[11px] text-white/40 md:inline">
                {formatNumber(e.tokens)} tok
              </span>
              <span className="font-mono text-[11px] text-white/40">
                {formatRelative(e.ts)}
              </span>
            </li>
          ))}
        </ul>
      </GlowCard>
    </section>
  );
}

const LOG_LEVEL_STYLES: Record<LogLevel, string> = {
  info: "text-white/65",
  debug: "text-white/35",
  success: "text-emerald-300/90",
  warn: "text-amber-200/90",
  error: "text-rose-300/90",
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function LogsPanel({ agent }: { agent: Agent }) {
  const lines = useMemo(() => agent.logs.slice(-30), [agent.logs]);
  return (
    <section className="scroll-mt-20">
      <PanelHeader id="logs" icon={Terminal} eyebrow="08" label="Logs" />
      <GlowCard className="overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-2.5 text-[11px] text-white/40">
          <span className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </span>
          <span className="ml-2 font-mono">{agent.name.toLowerCase()}.log · streaming</span>
        </div>
        <div className="max-h-[420px] overflow-y-auto px-5 py-3 font-mono text-[12.5px] leading-relaxed">
          {lines.map((l) => {
            const d = new Date(l.ts);
            const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
            return (
              <div key={l.id} className="flex gap-3 py-0.5">
                <span className="shrink-0 text-white/25">[{time}]</span>
                <span
                  className={cn(
                    "shrink-0 font-medium uppercase",
                    l.level === "error" && "text-rose-300",
                    l.level === "warn" && "text-amber-200",
                    l.level === "success" && "text-emerald-300",
                    l.level === "info" && "text-[#a78bfa]",
                    l.level === "debug" && "text-white/30"
                  )}
                >
                  {l.level}
                </span>
                <span className={LOG_LEVEL_STYLES[l.level]}>{l.message}</span>
              </div>
            );
          })}
        </div>
      </GlowCard>
    </section>
  );
}
