"use client";

import { motion } from "motion/react";
import { SectionLabel } from "./section-label";

const steps = [
  {
    number: "01",
    label: "CREATE",
    title: "Make an agent",
    description:
      "Selfie → 3D avatar in about a minute. Or upload your own GLB. Add a personality prompt, pick a voice from ElevenLabs or LiveKit, and wire up your AI model.",
  },
  {
    number: "02",
    label: "EMBED",
    title: "Drop the tag",
    description:
      "Two lines of HTML. No SDK install, no iframe wrapper, no build step. Works in React, Vue, Svelte, and plain HTML. Lazy-loaded by default.",
  },
  {
    number: "03",
    label: "SHIP",
    title: "Your site is alive",
    description:
      "Visitors talk to your agent with text or voice. It remembers across sessions. Charge per chat with pay-per-call micropayments via x402.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-zinc-50 py-28 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col gap-4">
          <SectionLabel number="06" label="How It Works" />
          <h2 className="max-w-lg text-3xl font-semibold leading-tight text-zinc-900 lg:text-4xl">
            Three steps. One living character.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">
            From idea to embedded, talking, earning agent — in the time it takes to brew a coffee.
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
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold tracking-[0.22em] text-zinc-300 uppercase">
                  {step.number}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.16em] text-[#6d4dff] uppercase">
                  {step.label}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
          <span className="shrink-0">Forge Studio</span>
          <span className="flex-1 h-px bg-zinc-200" />
          <span className="shrink-0 font-mono normal-case tracking-normal text-zinc-500">&lt;zova-agent /&gt;</span>
          <span className="flex-1 h-px bg-zinc-200" />
          <span className="shrink-0">Earn USDC</span>
        </div>
      </div>
    </section>
  );
}
