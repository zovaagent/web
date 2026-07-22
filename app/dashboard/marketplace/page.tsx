"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Star } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/common/section-header";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { AgentAvatar } from "@/components/dashboard/common/agent-avatar";
import { SEED_MARKETPLACE } from "@/lib/dashboard/mock-data";
import { formatNumber } from "@/lib/dashboard/format";
import type { AgentCategory } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

const CATEGORIES: Array<AgentCategory | "All"> = [
  "All",
  "Research",
  "Marketing",
  "Sales",
  "Development",
  "Support",
  "Operations",
];

export default function MarketplacePage() {
  const [cat, setCat] = useState<AgentCategory | "All">("All");
  const visible = cat === "All" ? SEED_MARKETPLACE : SEED_MARKETPLACE.filter((m) => m.category === cat);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <SectionHeader
        eyebrow="Marketplace"
        title="Install a ready-made agent"
        description="Curated agents from the ZOVA community. Fork the objective, connect your tools, deploy in one click."
      />

      <div className="flex flex-wrap items-center gap-1.5">
        {CATEGORIES.map((c) => {
          const active = cat === c;
          const count = c === "All" ? SEED_MARKETPLACE.length : SEED_MARKETPLACE.filter((m) => m.category === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                active
                  ? "border-[rgba(167,139,250,0.35)] bg-[rgba(139,92,246,0.10)] text-white"
                  : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white/80"
              )}
            >
              {c}
              <span className={cn("font-mono text-[11px]", active ? "text-[#c4b5fd]" : "text-white/35")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.03 * i }}
          >
            <GlowCard interactive className="group relative flex h-full flex-col gap-4 p-5">
              {m.featured && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[rgba(167,139,250,0.28)] bg-[rgba(139,92,246,0.10)] px-2 py-0.5 text-[10px] font-medium text-[#c4b5fd]">
                  <Star className="size-2.5 fill-current" />
                  Featured
                </span>
              )}
              <div className="flex items-center gap-3">
                <AgentAvatar seed={m.name} role={m.category} gradient={m.gradient} size={44} rounded="xl" />
                <div>
                  <div className="text-[15px] font-medium text-white">{m.name}</div>
                  <div className="text-[11px] uppercase tracking-widest text-white/40">{m.category}</div>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-white/60">{m.tagline}</p>
              <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-4">
                <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <Download className="size-3" />
                  {formatNumber(m.installs)} installs
                </span>
                <button
                  type="button"
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-white/80 transition-colors hover:border-[rgba(167,139,250,0.35)] hover:text-white"
                >
                  Install
                </button>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
