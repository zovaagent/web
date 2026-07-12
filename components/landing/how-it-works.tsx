"use client";

import { motion } from "motion/react";
import { SectionLabel } from "./section-label";

const steps = [
  {
    number: "01",
    title: "Data Collection & Indexing",
    description:
      "Raw blockchain events are collected across networks, then normalized and indexed into a unified structure — the foundation for every intelligence layer above it.",
  },
  {
    number: "02",
    title: "Context Processing Engine",
    description:
      "Entity recognition, behavioral analysis, and context enrichment transform blockchain events into meaningful knowledge — the core of ZOVA's intelligence layer.",
  },
  {
    number: "03",
    title: "Structured Intelligence",
    description:
      "Enriched context and risk-evaluated signals are delivered via REST API, SDK, and webhooks — immediately consumable by autonomous AI applications.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-zinc-50 py-28 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col gap-4">
          <SectionLabel number="04" label="How It Works" />
          <h2 className="max-w-lg text-3xl font-semibold leading-tight text-zinc-900 lg:text-4xl">
            From raw data to structured intelligence
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">
            Each stage of the intelligence pipeline increases the informational value
            available to autonomous systems — transforming events into understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-zinc-200 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className={[
                "py-12 flex flex-col gap-4",
                i > 0
                  ? "border-t border-zinc-200 md:border-t-0 md:border-l md:border-zinc-200 md:pl-10"
                  : "md:pr-10",
              ].join(" ")}
            >
              <span className="text-[10px] font-semibold tracking-[0.22em] text-zinc-300 uppercase">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
          <span className="shrink-0">Blockchain Networks</span>
          <span className="flex-1 h-px bg-zinc-200" />
          <span className="shrink-0">Intelligence Layer</span>
          <span className="flex-1 h-px bg-zinc-200" />
          <span className="shrink-0">AI Applications</span>
        </div>
      </div>
    </section>
  );
}
