"use client";

import { motion } from "motion/react";
import { Sparkles, Code2, Coins, ChevronRight } from "lucide-react";
import { SectionShell } from "./shared/section-shell";
import { SectionHeader } from "./shared/section-header";
import { IconTile } from "./shared/icon-tile";

const ease = [0.25, 0.1, 0.25, 1] as const;
const viewport = { once: true, margin: "-80px" } as const;

const cards = [
  {
    number: "01",
    label:  "Create",
    Icon:   Sparkles,
    title:  "Prompt to agent in about a minute.",
    body:   "Describe a character, snap a selfie, or bring your own GLB. Add a personality prompt, pick a voice, wire up a model — then publish or keep it private.",
    details: ["Text-to-3D", "Voice lab", "Personality prompt", "Marketplace publish"],
  },
  {
    number: "02",
    label:  "Embed",
    Icon:   Code2,
    title:  "Two lines. Any page.",
    body:   "Drop the ZOVA web component anywhere — HTML, React, Vue, Svelte. Voice, memory, animation, and payments are already inside.",
    details: ["Web component", "Zero install", "Framework-agnostic", "CDN global"],
  },
  {
    number: "03",
    label:  "Earn",
    Icon:   Coins,
    title:  "Charge per chat. Keep everything.",
    body:   "Gate any skill behind pay-per-call USDC via x402. 0% platform cut during open beta — earnings settle to your wallet the same block.",
    details: ["x402 protocol", "USDC settlement", "0% fee", "Real-time dashboard"],
  },
];

export function ProblemSolution() {
  return (
    <SectionShell id="platform" tone="dark">
      <SectionHeader
        number="02"
        label="The Platform"
        dark
        title="Build, embed, and earn."
        subtitle="A full-stack layer for 3D AI agents — from selfie to published character, from embed to on-chain earning."
      />

      <div className="grid grid-cols-1 border-t border-white/[0.07] md:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease, delay: i * 0.1 }}
            className={
              "py-10 flex flex-col gap-5 " +
              (i > 0
                ? "border-t border-white/[0.07] md:border-t-0 md:border-l md:border-white/[0.07] md:pl-10"
                : "md:pr-10")
            }
          >
            <div className="flex items-center gap-3">
              <IconTile Icon={card.Icon} />
              <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-white/25 uppercase">
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
    </SectionShell>
  );
}
