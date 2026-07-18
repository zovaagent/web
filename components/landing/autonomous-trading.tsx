"use client";

import { motion } from "motion/react";
import { Radar, Gauge, ShieldCheck, ArrowDownRight, TrendingUp } from "lucide-react";
import { SectionShell } from "./shared/section-shell";
import { SectionHeader } from "./shared/section-header";
import { IconTile } from "./shared/icon-tile";

const ease = [0.25, 0.1, 0.25, 1] as const;

const stages = [
  { Icon: Radar,          key: "Detect",  body: "Watch new launches surface in real time from the mempool feed."      },
  { Icon: Gauge,          key: "Score",   body: "Fuse liquidity, holders, and momentum signals into a conviction score." },
  { Icon: ShieldCheck,    key: "Guard",   body: "Run risk checks against your policy — caps, slippage, blacklists."   },
  { Icon: TrendingUp,     key: "Enter",   body: "Sign the swap, land the fill, log the position on-chain."             },
  { Icon: ArrowDownRight, key: "Exit",    body: "Trailing stops or take-profit close the trade automatically."         },
];

export function AutonomousTrading() {
  return (
    <SectionShell id="trading" tone="darker">
      <SectionHeader
        number="06"
        label="Autonomous Trading"
        dark
        title="Agents that don't just talk. They act."
        subtitle="Attach a trading policy to any ZOVA agent. It watches, scores, guards risk, and executes — while your visitors chat with the same character."
      />

      <div className="grid grid-cols-1 md:grid-cols-5 border-t border-white/[0.07]">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease, delay: i * 0.06 }}
            className={
              "py-10 flex flex-col gap-4 " +
              (i > 0 ? "border-t border-white/[0.07] md:border-t-0 md:border-l md:pl-6 md:border-white/[0.07]" : "md:pr-6")
            }
          >
            <div className="flex items-center gap-3">
              <IconTile Icon={stage.Icon} />
              <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-white/25 uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.16em] text-[#a78bfa] uppercase">
                {stage.key}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-[220px]">
              {stage.body}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-white/25 mb-1">
            Policy-first
          </p>
          <p className="text-sm text-white/50 max-w-md leading-relaxed">
            Every decision is bounded by rules you set. No open-ended prompts, no rug bait — the agent can only act inside your policy.
          </p>
        </div>
        <a
          href="#docs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#a78bfa] hover:text-white transition-colors shrink-0"
        >
          Read the policy guide
        </a>
      </div>
    </SectionShell>
  );
}
