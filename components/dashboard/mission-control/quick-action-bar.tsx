"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlowCard } from "@/components/dashboard/common/glow-card";

const SUGGESTIONS = [
  "Research our top 3 competitors this week",
  "Draft outreach to 20 accounts matching our ICP",
  "Summarize incoming support tickets since Monday",
  "Watch AWS spend, alert if we're over budget",
];

export function QuickActionBar() {
  const [value, setValue] = useState("");

  return (
    <GlowCard interactive className="p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!value.trim()) return;
          // In a real backend this would dispatch a job; here we just reset.
          setValue("");
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/40 p-3 focus-within:border-[rgba(167,139,250,0.35)] focus-within:shadow-[0_0_0_1px_rgba(167,139,250,0.25)]">
          <Sparkles className="ml-1 size-4 shrink-0 text-[#a78bfa]" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What should your agent do?"
            className="flex-1 bg-transparent text-[15px] font-light text-white placeholder:text-white/35 focus:outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-b from-[#8b5cf6] to-[#6d28d9] px-3.5 text-[13px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_10px_30px_-10px_rgba(139,92,246,0.65)] transition-colors hover:from-[#a78bfa] hover:to-[#7c3aed]"
          >
            Run
            <ArrowRight className="size-3.5" />
          </motion.button>
        </div>
        <div className="flex flex-wrap gap-1.5 pl-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue(s)}
              className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/50 transition-colors hover:border-white/15 hover:text-white/80"
            >
              {s}
            </button>
          ))}
        </div>
      </form>
    </GlowCard>
  );
}
