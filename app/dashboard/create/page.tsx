"use client";

import { motion } from "framer-motion";
import { Bot, MessageSquare, Search, ShoppingCart, TrendingUp, Wrench } from "lucide-react";
import { QuickActionBar } from "@/components/dashboard/mission-control/quick-action-bar";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { SectionHeader } from "@/components/dashboard/common/section-header";

const TEMPLATES = [
  { id: "research", name: "Research Analyst", icon: Search, description: "Continuously monitor a topic, deliver weekly synthesis.", gradient: "from-[#a78bfa] to-[#7c3aed]" },
  { id: "seo", name: "SEO Writer", icon: TrendingUp, description: "Produce editorial-grade long-form on target keywords.", gradient: "from-[#c084fc] to-[#9333ea]" },
  { id: "sdr", name: "SDR Sourcer", icon: ShoppingCart, description: "Find ICP-matched accounts, draft first-touch outreach.", gradient: "from-[#8b5cf6] to-[#6d28d9]" },
  { id: "support", name: "Support Triage", icon: MessageSquare, description: "Categorize tickets, draft responses, escalate cleanly.", gradient: "from-[#a855f7] to-[#7e22ce]" },
  { id: "ops", name: "Ops Watcher", icon: Wrench, description: "Watch metrics + cost, page a human only on real signal.", gradient: "from-[#a78bfa] to-[#5b21b6]" },
  { id: "custom", name: "Blank Agent", icon: Bot, description: "Start from an objective. We'll wire the rest.", gradient: "from-[#c4b5fd] to-[#7c3aed]" },
];

export default function CreateAgentPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 md:px-8 md:py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#a78bfa]"
        >
          New Agent
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl font-light tracking-tight text-white sm:text-5xl"
        >
          What should it do?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="max-w-md text-[14px] text-white/50"
        >
          Describe the objective in plain language. ZOVA picks the tools, the memory shape, and the eval rubric.
        </motion.p>
      </div>

      <QuickActionBar />

      <div className="mt-6 flex flex-col gap-4">
        <SectionHeader eyebrow="Or start from" title="Templates" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <GlowCard interactive key={t.id} className="cursor-pointer p-5">
              <div className="flex items-start gap-3">
                <span className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]`}>
                  <t.icon className="size-4" />
                </span>
                <div className="min-w-0 space-y-1">
                  <div className="text-[14px] font-medium text-white">{t.name}</div>
                  <p className="text-[12.5px] leading-relaxed text-white/50">{t.description}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
}
