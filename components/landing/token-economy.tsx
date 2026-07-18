"use client";

import { motion } from "motion/react";
import { Coins, LineChart, MessagesSquare, BarChart3 } from "lucide-react";
import { SectionShell } from "./shared/section-shell";
import { SectionHeader } from "./shared/section-header";
import { IconTile } from "./shared/icon-tile";

const ease = [0.25, 0.1, 0.25, 1] as const;

const items = [
  {
    Icon: Coins,
    title: "One-click launch",
    body:  "Pick a name, ticker, artwork, and supply. The agent handles mint, metadata, and initial liquidity on Solana.",
    meta:  ["SPL token", "Metaplex metadata", "LP bootstrap"],
  },
  {
    Icon: LineChart,
    title: "Live price feed",
    body:  "Embed the same live price widget the agent uses. Chart, market cap, and 24h volume, refreshed by the block.",
    meta:  ["Pump.fun oracle", "Realtime chart", "Widget-ready"],
  },
  {
    Icon: MessagesSquare,
    title: "Trade from chat",
    body:  "Visitors buy, sell, or tip directly inside the agent conversation. Slippage guards and confirmations included.",
    meta:  ["In-chat swap", "USDC / SOL", "Confirm-to-execute"],
  },
  {
    Icon: BarChart3,
    title: "Trending dashboard",
    body:  "Track holders, top wallets, and leaderboard rank in one view. Alert rules run inside your agent skills.",
    meta:  ["Leaderboard", "Holder analytics", "Alerts via skill"],
  },
];

export function TokenEconomy() {
  return (
    <SectionShell id="token" tone="dark">
      <SectionHeader
        number="07"
        label="Token Economy"
        dark
        title="Give your agent a token, and a community forms."
        subtitle="ZOVA agents can mint, price, and trade their own SPL token. Character becomes ticker, audience becomes holders."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/[0.07]">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease, delay: (i % 2) * 0.08 }}
            className={
              "py-10 flex flex-col gap-4 " +
              (i % 2 === 1 ? "md:border-l md:border-white/[0.07] md:pl-10" : "md:pr-10") + " " +
              (i >= 2 ? "border-t border-white/[0.07]" : "")
            }
          >
            <div className="flex items-center gap-3">
              <IconTile Icon={it.Icon} />
              <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-white/25 uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white leading-snug">
              {it.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/40 max-w-md">
              {it.body}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {it.meta.map((m) => (
                <li
                  key={m}
                  className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 border border-white/10 px-2.5 py-1"
                >
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
