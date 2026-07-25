"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Star, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/common/section-header";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { AgentAvatar } from "@/components/dashboard/common/agent-avatar";
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

// Marketplace agents - will be replaced with API later
const MARKETPLACE_AGENTS = [
  { id: "m-1", name: "Lena Park", category: "Research" as AgentCategory, tagline: "Deep-research any topic with cited sources.", installs: 12800, gradient: ["#a78bfa", "#7c3aed"] as [string, string], featured: true },
  { id: "m-2", name: "Julian Cruz", category: "Marketing" as AgentCategory, tagline: "Turns product changes into launch copy.", installs: 9410, gradient: ["#c084fc", "#9333ea"] as [string, string] },
  { id: "m-3", name: "Zara Malik", category: "Sales" as AgentCategory, tagline: "Personalized outbound at 40 accounts/day.", installs: 7620, gradient: ["#8b5cf6", "#6d28d9"] as [string, string] },
  { id: "m-4", name: "Theo Rasmussen", category: "Development" as AgentCategory, tagline: "Reads PRs and writes changelogs you'd ship.", installs: 15230, gradient: ["#b794f6", "#6b21a8"] as [string, string], featured: true },
  { id: "m-5", name: "Isla Fernández", category: "Support" as AgentCategory, tagline: "Zero-touch triage for Intercom & Zendesk.", installs: 6120, gradient: ["#a855f7", "#7e22ce"] as [string, string] },
  { id: "m-6", name: "Kwame Boateng", category: "Operations" as AgentCategory, tagline: "Watches cloud spend, pings before it hurts.", installs: 4310, gradient: ["#a78bfa", "#5b21b6"] as [string, string] },
];

export default function MarketplacePage() {
  const [cat, setCat] = useState<AgentCategory | "All">("All");
  const visible = cat === "All" ? MARKETPLACE_AGENTS : MARKETPLACE_AGENTS.filter((m) => m.category === cat);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <SectionHeader
        eyebrow="Marketplace"
        title="Agent Marketplace"
        description="Discover and install pre-built agents for your workspace."
      />

      <div className="flex flex-wrap items-center gap-1.5">
        {CATEGORIES.map((c) => {
          const count = c === "All" ? MARKETPLACE_AGENTS.length : MARKETPLACE_AGENTS.filter((m) => m.category === c).length;
          const active = cat === c;
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
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.02 * i }}
          >
            <GlowCard interactive className="flex flex-col gap-4 p-5">
              <div className="flex items-start gap-3">
                <AgentAvatar
                  seed={m.name}
                  gradient={m.gradient}
                  size={48}
                  rounded="xl"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[14px] font-medium text-white">{m.name}</span>
                    {m.featured && (
                      <Star className="size-3 shrink-0 fill-amber-400 text-amber-400" />
                    )}
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-white/40">{m.category}</span>
                </div>
              </div>
              <p className="text-[12.5px] leading-relaxed text-white/55">{m.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/40">{formatNumber(m.installs)} installs</span>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11.5px] font-medium text-white/80 transition-colors hover:border-[rgba(167,139,250,0.35)] hover:text-white">
                  <Download className="size-3" />
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
