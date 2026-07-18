"use client";

import { motion } from "motion/react";
import { Sparkles, Code2, Coins, ChevronRight } from "lucide-react";
import { SectionLabel } from "./section-label";

const ease = [0.25, 0.1, 0.25, 1] as const;
const viewport = { once: true, margin: "-80px" } as const;

const cards = [
  {
    number: "01",
    label: "Create",
    Icon: Sparkles,
    title: "Prompt to agent in 60 seconds.",
    body: "Type a description, snap a selfie, or upload a GLB. Add a personality prompt, pick a voice, wire up your AI. Publish to the marketplace or keep it private.",
    details: ["Text-to-3D", "Voice lab", "Personality prompt", "Marketplace publish"],
  },
  {
    number: "02",
    label: "Embed",
    Icon: Code2,
    title: "Two lines. Any page.",
    body: "Drop <zova-agent /> into any page. React, Vue, Svelte, plain HTML. Voice, memory, animation, and payments built in. Lazy-loaded by default.",
    details: ["Web component", "Zero install", "Framework-agnostic", "CDN global"],
  },
  {
    number: "03",
    label: "Earn",
    Icon: Coins,
    title: "Charge per chat. Keep everything.",
    body: "Gate skills behind pay-per-call USDC micropayments via x402. Keep 100% during open beta. Watch earnings flow in real time from your dashboard.",
    details: ["x402 protocol", "USDC settlement", "0% fee", "Real-time dashboard"],
  },
];

export function ProblemSolution() {
  return (
    <section className="bg-[#07070f] py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-4">
          <SectionLabel number="02" label="The Platform" dark />
          <h2 className="text-3xl font-semibold tracking-tight text-white max-w-lg leading-tight">
            Build, embed, and earn.
          </h2>
          <p className="text-sm text-white/40 max-w-md leading-relaxed">
            A full-stack platform for 3D AI agents: from selfie to published agent, from embed to earning.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-white/[0.07] md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              className={[
                "py-10 flex flex-col gap-5",
                i > 0
                  ? "border-t border-white/[0.07] md:border-t-0 md:border-l md:border-white/[0.07] md:pl-10"
                  : "md:pr-10",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-7 items-center justify-center border border-white/10 bg-[#6d4dff]/10">
                  <card.Icon className="h-3.5 w-3.5 text-[#a78bfa]" />
                </span>
                <span className="text-[10px] font-semibold tracking-[0.22em] text-white/25 uppercase font-mono">
                  {card.number}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.16em] text-[#a78bfa] uppercase">
                  {card.label}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white leading-snug max-w-xs">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/40 max-w-xs">
                {card.body}
              </p>
              <ul className="mt-auto flex flex-col gap-1.5 pt-4 border-t border-white/[0.06]">
                {card.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-[11px] text-white/40">
                    <ChevronRight className="h-3 w-3 text-[#6d4dff]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
