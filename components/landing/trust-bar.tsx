"use client";

import {
  NetworkSolana,
  NetworkSui,
  NetworkBase,
  NetworkArbitrumOne,
  NetworkEthereum,
} from "@web3icons/react";

const chains = [
  { label: "Solana", Icon: NetworkSolana },
  { label: "Sui", Icon: NetworkSui },
  { label: "Base", Icon: NetworkBase },
  { label: "Arbitrum", Icon: NetworkArbitrumOne },
  { label: "Ethereum", Icon: NetworkEthereum },
];

export function TrustBar() {
  return (
    <section className="overflow-hidden py-10 bg-white border-b border-zinc-100">
      <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-300">
        Trusted by builders on
      </p>
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-4">
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.92) 20%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.25) 70%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40"
          style={{
            background:
              "linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0.92) 20%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.25) 70%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div className="group flex w-max animate-marquee gap-20 hover:[animation-play-state:paused]">
          <ChainList />
          <ChainList />
        </div>
      </div>
    </section>
  );
}

function ChainList() {
  return (
    <>
      {chains.map(({ label, Icon }) => (
        <span
          key={label}
          className="shrink-0 cursor-default transition-transform duration-300 ease-out hover:scale-150"
          title={label}
        >
          <Icon size={44} variant="branded" />
        </span>
      ))}
    </>
  );
}
