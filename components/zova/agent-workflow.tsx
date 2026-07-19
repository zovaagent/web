"use client";

import { motion } from "motion/react";
import { Target, Database, Layers, Wrench, Brain, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/landing/section-label";

interface WorkflowStep {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: WorkflowStep[] = [
  {
    number: "01",
    label: "Objective",
    title: "Goal formulation",
    description:
      "The core natural language directive parsed into structured parameters and guardrails.",
    icon: Target,
  },
  {
    number: "02",
    label: "Knowledge",
    title: "RAG & API hydration",
    description:
      "Dynamic access to target vector stores, documents, spreadsheets, and global API caches.",
    icon: Database,
  },
  {
    number: "03",
    label: "Memory",
    title: "Contextual state",
    description:
      "Multi-layered short-term execution storage and long-term historic audit states.",
    icon: Layers,
  },
  {
    number: "04",
    label: "Tools",
    title: "Secure sandbox APIs",
    description:
      "Registered browser, network terminal, coding sandboxes, or integration pipelines.",
    icon: Wrench,
  },
  {
    number: "05",
    label: "Reasoning",
    title: "Gemini-powered loop",
    description:
      "The autonomous core that assesses state, generates steps, and monitors success criteria.",
    icon: Brain,
  },
  {
    number: "06",
    label: "Execution",
    title: "Deterministic action",
    description:
      "Spawning worker jobs to call tools, publish reports, or trigger firewalls.",
    icon: Play,
  },
];

export function AgentWorkflow() {
  return (
    <section id="agent-workflow" className="w-full bg-[#050505]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <div className="mb-20 flex flex-col gap-4">
        <SectionLabel number="" label="Agent Lifecycle" dark />
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-white max-w-xl leading-tight">
          The Autonomy Pipeline.
        </h2>
        <p className="text-sm leading-relaxed text-white/40 max-w-md">
          How ZOVA builds, contextualizes, and runs autonomous virtual agents
          inside secure, sandboxed runtimes.
        </p>
      </div>

      <div className="grid grid-cols-1 border-t border-white/10 md:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLg = "lg:border-l lg:border-white/10";
          const noLgLeft = i % 3 === 0 ? "lg:border-l-0" : "";
          const isMd = "md:border-l md:border-white/10";
          const noMdLeft = i % 2 === 0 ? "md:border-l-0" : "";
          const border = i > 0 ? "border-t border-white/10 md:border-t-0" : "";
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`group relative flex flex-col gap-4 p-8 lg:p-10 transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-500/[0.06] hover:to-transparent cursor-default ${border} ${isMd} ${noMdLeft} ${isLg} ${noLgLeft}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold tabular-nums tracking-[0.22em] text-white/25 uppercase">
                  {step.number}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#a78bfa] uppercase">
                  {step.label}
                </span>
              </div>

              <span className="inline-flex size-10 items-center justify-center rounded-sm border border-white/10 bg-white/[0.02] text-white/70 group-hover:text-[#a78bfa] group-hover:border-[#6d4dff]/40 group-hover:bg-violet-500/10 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.25)] transition-all duration-300">
                <Icon className="h-4 w-4" />
              </span>

              <h3 className="text-lg font-semibold text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
