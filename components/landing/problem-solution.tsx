"use client";

import { motion } from "motion/react";
import { SectionLabel } from "./section-label";

const ease = [0.25, 0.1, 0.25, 1] as const;
const viewport = { once: true, margin: "-80px" } as const;

const items = [
  {
    number: "01",
    label: "The Problem",
    title: "A blockchain records events. It does not explain them.",
    body: "Every transaction is public, every wallet observable, every contract accessible — yet transparency alone does not produce understanding. Machines can see. They cannot necessarily understand why an action occurred, who initiated it, or whether it represents normal behavior.",
  },
  {
    number: "02",
    label: "The Solution",
    title: "Context is the missing layer. ZOVA is building it.",
    body: "Rather than another analytics platform, ZOVA is intelligence infrastructure. We transform fragmented on-chain activity into structured, contextual intelligence — enabling autonomous AI to reason with confidence rather than merely observe.",
  },
];

export function ProblemSolution() {
  return (
    <section className="bg-white py-28 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-zinc-100">
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              className={[
                "py-16 flex flex-col gap-6",
                i === 1
                  ? "md:border-l md:border-zinc-100 md:pl-16 border-t border-zinc-100 md:border-t-0"
                  : "md:pr-16",
              ].join(" ")}
            >
              <SectionLabel number={item.number} label={item.label} />
              <h2 className="text-2xl font-semibold leading-snug text-zinc-900 lg:text-3xl max-w-sm">
                {item.title}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
