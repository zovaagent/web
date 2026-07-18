"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Users,
  ArrowUpRight,
  FileText,
  ShieldAlert,
  MessageSquare,
  LineChart,
  Contact,
  ScrollText,
  BookOpen,
  ListChecks,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/landing/section-label";

interface MarketplaceAgent {
  index: string;
  name: string;
  creator: string;
  category: string;
  purpose: string;
  metricLabel: string;
  metricValue: string;
  tag: string;
  icon: LucideIcon;
  prompt: string;
}

const FEATURED: MarketplaceAgent[] = [
  {
    index: "01",
    name: "DocuSense-Pro",
    creator: "@zova-labs",
    category: "Operations",
    icon: FileText,
    purpose:
      "Autonomously ingests incoming contracts, extracts semantic obligations, matches them against legal baselines, and alerts teams of exceptions.",
    metricLabel: "Contracts Scanned",
    metricValue: "42,000+",
    tag: "99.2% Autonomy",
    prompt:
      "I want an agent called DocuSense-Pro to audit legal PDFs or docx files, extract deliverables and milestones, and sync them with our internal operations spreadsheet.",
  },
  {
    index: "02",
    name: "HackerAlert-Sentinel",
    creator: "@zova-labs",
    category: "Security",
    icon: ShieldAlert,
    purpose:
      "Monitors global vulnerability databases, aggregates public CVE reports, and schedules immediate non-disruptive patches for container architectures.",
    metricLabel: "Attacks Isolated",
    metricValue: "18,400+",
    tag: "Verified Enterprise",
    prompt:
      "Create HackerAlert-Sentinel to monitor public GitHub repositories for zero-day issues, evaluate if they affect our production container registry, and send high-priority notifications.",
  },
];

const TRENDING: MarketplaceAgent[] = [
  {
    index: "01",
    name: "SocialPulse-X",
    creator: "@marketing_labs",
    category: "Community",
    icon: MessageSquare,
    purpose:
      "Tracks product mentions on Twitter and Reddit, synthesizes organic sentiment, filters spam, and flags emerging user issues for developers.",
    metricLabel: "Mentions Analyzed",
    metricValue: "1.2M / mo",
    tag: "Trending #1",
    prompt:
      "Build SocialPulse-X to monitor brand mentions across Twitter and Reddit, separate customer complaints from spam, and route product bug reports directly to Linear.",
  },
  {
    index: "02",
    name: "FinSentry",
    creator: "@capital_quant",
    category: "Finance",
    icon: LineChart,
    purpose:
      "High-frequency volatility tracker that evaluates risk metrics, liquidity depths, and alerts treasury desks on rapid market swings.",
    metricLabel: "Assets Tracked",
    metricValue: "140+ pairs",
    tag: "High Yield Tool",
    prompt:
      "Design a FinSentry agent to track high-frequency price fluctuations, evaluate liquidity levels on decentralized indexes, and alert us if deviation slips.",
  },
];

const VERIFIED: MarketplaceAgent[] = [
  {
    index: "01",
    name: "CRM-Orchestrator",
    creator: "@salesforce_partner",
    category: "Operations",
    icon: Contact,
    purpose:
      "Syncs sales email sequences, qualifies inbound leads based on corporate profiles, and auto-generates personalized follow-ups in drafts.",
    metricLabel: "Leads Qualified",
    metricValue: "88,000+",
    tag: "SOC2 Audited",
    prompt:
      "Assemble CRM-Orchestrator to automatically cross-reference new lead signups against company registries, assign priority scores, and pre-draft tailored outreach emails.",
  },
  {
    index: "02",
    name: "LogWatchdog",
    creator: "@sysops_certified",
    category: "Security",
    icon: ScrollText,
    purpose:
      "Continuous operational server logger that detects latency spikes, aggregates trace-level stack errors, and generates immediate triage summaries.",
    metricLabel: "Logs Processed",
    metricValue: "1.5B / day",
    tag: "99.99% Standby",
    prompt:
      "Setup LogWatchdog to poll system logs, aggregate error traces by frequency, and use AI to create a concise markdown post-mortem summary inside our Slack dev channel.",
  },
];

const COMMUNITY: MarketplaceAgent[] = [
  {
    index: "01",
    name: "Arxiv-Summarizer",
    creator: "@academic_coder",
    category: "Research",
    icon: BookOpen,
    purpose:
      "Queries Cornell's arXiv daily feed for specific technology keywords, summarizes abstracts, and formats research briefs in Markdown.",
    metricLabel: "Papers Synthesized",
    metricValue: "3,400+",
    tag: "Open Source",
    prompt:
      "Create an Arxiv-Summarizer that queries Cornell Arxiv for new papers mentioning 'Generative Agents' daily, summarizes their methodologies, and posts the summary to our Notion workspace.",
  },
  {
    index: "02",
    name: "LinearTask-Auto",
    creator: "@agile_dev",
    category: "Operations",
    icon: ListChecks,
    purpose:
      "Ingests daily customer support feedback, identifies feature requests vs bugs, and formats structured draft tasks inside Linear backlogs.",
    metricLabel: "Tasks Processed",
    metricValue: "14,500+",
    tag: "Community Favorite",
    prompt:
      "Build LinearTask-Auto to ingest email feedback, categorize them as feature requests or bugs, and compile them as fully detailed tasks in our development board.",
  },
];

type TabId = "featured" | "trending" | "verified" | "community";

const row: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

interface Props {
  onSelectPrompt: (prompt: string) => void;
}

export function AgentMarketplace({ onSelectPrompt }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("featured");
  const agents = { featured: FEATURED, trending: TRENDING, verified: VERIFIED, community: COMMUNITY }[activeTab];

  const handleDeploy = (prompt: string) => {
    onSelectPrompt(prompt);
    document
      .getElementById("interactive-agent-generator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
    { id: "featured", label: "Featured", icon: Sparkles },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "verified", label: "Verified", icon: CheckCircle2 },
    { id: "community", label: "Community", icon: Users },
  ];

  return (
    <section
      id="agent-marketplace"
      className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32"
    >
      <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex flex-col gap-4">
          <SectionLabel number="05" label="Agent Repository" dark />
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-white max-w-xl leading-tight">
            Discover pre-built templates.
          </h2>
          <p className="text-sm leading-relaxed text-white/40 max-w-md">
            Ready-to-deploy digital agents built by ZOVA Labs and verified
            enterprise contributors.
          </p>
        </div>

        <div className="inline-flex border border-white/10 divide-x divide-white/10">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === id
                  ? "bg-white/[0.06] text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.02]"
              }`}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {agents.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <motion.button
                  key={agent.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={row}
                  onClick={() => handleDeploy(agent.prompt)}
                  className="group grid w-full grid-cols-[40px_56px_1fr_auto] items-start gap-6 md:gap-10 border-b border-white/10 py-8 text-left transition-colors duration-200 hover:bg-white/[0.03] cursor-pointer"
                >
                  <span className="text-[11px] font-semibold tabular-nums tracking-[0.18em] text-white/25 mt-2 select-none">
                    {agent.index}
                  </span>

                  <span className="inline-flex size-10 items-center justify-center border border-white/10 bg-white/[0.02] text-white/70 group-hover:text-[#a78bfa] group-hover:border-[#6d4dff]/40 transition-colors">
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-base font-semibold text-white group-hover:text-[#a78bfa] transition-colors">
                        {agent.name}
                      </h3>
                      <span className="text-[10px] font-mono text-white/40">
                        {agent.creator}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 border border-white/10 px-2 py-0.5">
                        {agent.category}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#a78bfa] border border-[#6d4dff]/30 bg-[#6d4dff]/10 px-2 py-0.5">
                        {agent.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/50 max-w-2xl">
                      {agent.purpose}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">
                        {agent.metricLabel}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-white/70">
                        {agent.metricValue}
                      </span>
                    </div>
                  </div>

                  <span className="hidden md:inline-flex size-9 items-center justify-center border border-white/10 text-white/40 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/[0.04] transition-all mt-1">
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
        <span className="shrink-0">Marketplace</span>
        <span className="flex-1 h-px bg-white/10" />
        <span className="shrink-0 font-mono normal-case tracking-normal text-white/50">
          zova://blueprints
        </span>
        <span className="flex-1 h-px bg-white/10" />
        <span className="shrink-0">Deploy</span>
      </div>
    </section>
  );
}
