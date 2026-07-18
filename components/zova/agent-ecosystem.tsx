"use client";

import { motion, type Variants } from "motion/react";
import {
  Shield,
  Cpu,
  Wallet,
  Globe,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/landing/section-label";

interface EcosystemPreset {
  index: string;
  name: string;
  category: string;
  icon: LucideIcon;
  description: string;
  metrics: string;
  prompt: string;
}

const PRESETS: EcosystemPreset[] = [
  {
    index: "01",
    name: "Wallet Agent",
    category: "Finance",
    icon: Wallet,
    description:
      "Continuously monitors blockchain ledger logs and wallet activity to safely report significant transactions and portfolio anomalies.",
    metrics: "2.4M logs/day · 99.8% precision",
    prompt:
      "Create an autonomous Wallet Agent that monitors my team's multisig wallets and alerts us via Slack/Discord if any single transaction exceeds 5% of total capital.",
  },
  {
    index: "02",
    name: "Research Agent",
    category: "Research",
    icon: Globe,
    description:
      "Crawls globally indexed academic repositories, patent vaults, and technology feeds to synthesize high-quality qualitative dossiers daily.",
    metrics: "12K sources · Real-time synthesis",
    prompt:
      "Design a qualitative Research Agent that crawls daily arXiv publications on large language models, identifies breakthroughs in parameter-efficient tuning, and compiles markdown notes.",
  },
  {
    index: "03",
    name: "Security Agent",
    category: "Security",
    icon: Shield,
    description:
      "Evaluates staging servers, active systems, and authentication event streams for malicious behavior signatures and access anomalies.",
    metrics: "99.99% threat interception · 0.01% FPS",
    prompt:
      "Configure an Aegis Security Agent that monitors authentication trails on our AWS infrastructure, detects cross-regional brute force attempts, and quarantines credentials automatically.",
  },
  {
    index: "04",
    name: "Operations Agent",
    category: "Operations",
    icon: Cpu,
    description:
      "Connects separate business APIs (GitHub, Linear, Slack, HubSpot) to parse triggers, route payloads, and automate multi-step administrative loops.",
    metrics: "140+ active tool handshakes · <500ms latency",
    prompt:
      "Assemble an Operations Agent that ingests incoming tickets from Intercom, queries our internal PostgreSQL database for customer status, and drafts tailored responses based on their tier.",
  },
  {
    index: "05",
    name: "Treasury Agent",
    category: "Finance",
    icon: TrendingUp,
    description:
      "Automates repetitive treasury tasks, compiling daily balance sheets and analyzing liquidity risks based on live cash-flow parameters.",
    metrics: "99.4% balancing precision · Auditable history",
    prompt:
      "Build an automated Treasury Agent that aggregates daily payouts across Stripe, matches receipts with our invoice database, and notifies the CFO of anomalies.",
  },
  {
    index: "06",
    name: "Social Agent",
    category: "Community",
    icon: MessageSquare,
    description:
      "Fosters digital communities by tracking social channels, summarizing discussion threads, and responding with custom developer-focused context.",
    metrics: "8 channels monitored · NLP automated sorting",
    prompt:
      "Create a Community Support Agent that tracks our Discord help channels, summarizes repeating FAQs, and posts helpful links from our documentation.",
  },
];

const row: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

interface Props {
  onSelectPrompt: (prompt: string) => void;
}

export function AgentEcosystem({ onSelectPrompt }: Props) {
  const handleConfigure = (prompt: string) => {
    onSelectPrompt(prompt);
    document
      .getElementById("interactive-agent-generator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="agent-ecosystem"
      className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32"
    >
      <div className="mb-16 flex flex-col gap-4">
        <SectionLabel number="03" label="Ecosystem Suite" dark />
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-white max-w-xl leading-tight">
          What will your agent do?
        </h2>
        <p className="text-sm leading-relaxed text-white/40 max-w-md">
          Production-grade autonomous agent blueprints, optimized to perform
          specific industrial workflows.
        </p>
      </div>

      <div className="border-t border-white/10">
        {PRESETS.map((preset, i) => {
          const Icon = preset.icon;
          return (
            <motion.button
              key={preset.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={row}
              onClick={() => handleConfigure(preset.prompt)}
              className="group grid w-full grid-cols-[40px_56px_1fr_auto] items-start gap-6 md:gap-10 border-b border-white/10 py-7 text-left transition-colors duration-200 hover:bg-white/[0.03] cursor-pointer"
            >
              <span className="text-[11px] font-semibold tabular-nums tracking-[0.18em] text-white/25 mt-2 select-none">
                {preset.index}
              </span>

              <span className="inline-flex size-10 items-center justify-center border border-white/10 bg-white/[0.02] text-white/70 group-hover:text-[#a78bfa] group-hover:border-[#6d4dff]/40 transition-colors">
                <Icon className="h-4 w-4" />
              </span>

              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base font-semibold text-white group-hover:text-[#a78bfa] transition-colors">
                    {preset.name}
                  </h3>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 border border-white/10 px-2 py-0.5">
                    {preset.category}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/50 max-w-2xl">
                  {preset.description}
                </p>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 mt-1">
                  {preset.metrics}
                </span>
              </div>

              <span className="hidden md:inline-flex size-9 items-center justify-center border border-white/10 text-white/40 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/[0.04] transition-all mt-1">
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
        <span className="shrink-0">Blueprint</span>
        <span className="flex-1 h-px bg-white/10" />
        <span className="shrink-0 font-mono normal-case tracking-normal text-white/50">
          zova://ecosystem/*
        </span>
        <span className="flex-1 h-px bg-white/10" />
        <span className="shrink-0">Deploy</span>
      </div>
    </section>
  );
}
