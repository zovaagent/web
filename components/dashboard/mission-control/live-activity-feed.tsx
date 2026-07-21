"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { PulseDot } from "@/components/dashboard/common/pulse-dot";
import { useFeedStore } from "@/stores/dashboard/feed-store";
import type { ActivityEvent } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

const KIND_COLOR: Record<ActivityEvent["kind"], string> = {
  started: "text-[#a78bfa]",
  reasoning: "text-white/70",
  tool: "text-cyan-200/80",
  completed: "text-emerald-300",
  waiting: "text-amber-200",
  failed: "text-rose-300",
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}
function formatTime(ts: number) {
  const d = new Date(ts);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function LiveActivityFeed() {
  const events = useFeedStore((s) => s.events);
  const hydrated = useFeedStore((s) => s.hydrated);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!pinned || !scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollTop = el.scrollHeight;
  }, [events, pinned]);

  const visible = events.slice(-40);

  return (
    <GlowCard className="flex h-[520px] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <PulseDot status="running" size={7} />
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-medium text-white">Live Activity</span>
            <span className="text-[11px] text-white/40">
              Streaming from {events.length} events
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPinned((p) => !p)}
          className={cn(
            "flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors",
            pinned
              ? "border-[rgba(167,139,250,0.3)] bg-[rgba(139,92,246,0.08)] text-[#c4b5fd]"
              : "border-white/10 bg-white/[0.02] text-white/45 hover:text-white/70"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              pinned ? "bg-[#a78bfa]" : "bg-white/25"
            )}
          />
          {pinned ? "Tail" : "Paused"}
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
          if (!atBottom && pinned) setPinned(false);
        }}
        className="flex-1 overflow-y-auto px-5 py-3 font-mono text-[12.5px] leading-relaxed"
      >
        {!hydrated || !mounted ? (
          <div className="text-white/30">connecting…</div>
        ) : (
          <AnimatePresence initial={false}>
            {visible.map((e) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex gap-3 py-0.5"
              >
                <span className="shrink-0 text-white/30">[{formatTime(e.ts)}]</span>
                <span className="shrink-0 font-medium text-white/75">
                  {e.agentName}
                </span>
                <span className={cn("truncate", KIND_COLOR[e.kind])}>
                  {e.kind === "tool" && "→ "}
                  {e.kind === "reasoning" && "· "}
                  {e.kind === "started" && "▸ "}
                  {e.kind === "completed" && "✓ "}
                  {e.kind === "waiting" && "⏸ "}
                  {e.kind === "failed" && "✕ "}
                  {e.message}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </GlowCard>
  );
}
