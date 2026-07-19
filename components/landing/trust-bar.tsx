"use client";

import type { ComponentType, SVGProps } from "react";
import {
  SiAnthropic,
  SiCoinbase,
  SiGooglecloud,
  SiAlibabacloud,
  SiSolana,
  SiCoinmarketcap,
  SiHackernoon,
} from "react-icons/si";

/* Inline marks for brands not covered by react-icons 5.x */

function IbmMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 52" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <g fill="currentColor">
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i}>
            <rect x={i * 22}      y="6"  width="16" height="4" />
            <rect x={i * 22}      y="14" width="16" height="4" />
            <rect x={i * 22}      y="22" width="16" height="4" />
            <rect x={i * 22}      y="30" width="16" height="4" />
            <rect x={i * 22}      y="38" width="16" height="4" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function AwsMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 90 54" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <g fill="currentColor">
        <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" letterSpacing="-1">
          aws
        </text>
        <path
          d="M4 44 C 22 52, 66 52, 84 44"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M78 40 L86 44 L82 50 Z" />
      </g>
    </svg>
  );
}

function CoinGeckoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <g fill="currentColor">
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="14" cy="17" r="3.2" />
        <circle cx="14" cy="17" r="1" fill="#0a0a12" />
        <path d="M11 28 C 14 30, 26 30, 29 28" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M20 8 L23 4 L26 9 Z" />
      </g>
    </svg>
  );
}

type Partner = {
  label: string;
  Icon:  ComponentType<SVGProps<SVGSVGElement>>;
};

const partners: Partner[] = [
  { label: "Anthropic",     Icon: SiAnthropic     },
  { label: "Coinbase",      Icon: SiCoinbase      },
  { label: "IBM",           Icon: IbmMark         },
  { label: "AWS",           Icon: AwsMark         },
  { label: "Google Cloud",  Icon: SiGooglecloud   },
  { label: "Alibaba Cloud", Icon: SiAlibabacloud  },
  { label: "Solana",        Icon: SiSolana        },
  { label: "CoinMarketCap", Icon: SiCoinmarketcap },
  { label: "CoinGecko",     Icon: CoinGeckoMark   },
  { label: "HackerNoon",    Icon: SiHackernoon    },
];

const ticker = [
  "Text to 3D generation",
  "110+ animation clips",
  "1-line embed",
  "Voice and memory built-in",
  "On-chain identity",
  "Multiplayer Walk mode",
  "Apache-2.0 SDK",
  "SNS subdomains",
];

export function TrustBar() {
  return (
    <section className="bg-[#07070f] border-y border-white/[0.06] overflow-hidden">
      {/* Feature ticker */}
      <div className="border-b border-white/[0.06] py-3 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
          <TickerList />
          <TickerList />
        </div>
      </div>

      {/* Partner logos */}
      <div className="py-10">
        <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/25">
          Partnered with &amp; featured in
        </p>
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-4">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
            style={{ background: "linear-gradient(to right, #07070f 0%, transparent 100%)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
            style={{ background: "linear-gradient(to left, #07070f 0%, transparent 100%)" }}
          />
          <div
            className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]"
            style={{ animationDirection: "reverse" }}
          >
            <PartnerList />
            <PartnerList />
          </div>
        </div>
      </div>
    </section>
  );
}

function TickerList() {
  return (
    <>
      {ticker.map((item) => (
        <span
          key={item}
          className="shrink-0 flex items-center gap-3 text-[11px] font-medium text-white/30"
        >
          <span className="w-1 h-1 rounded-full bg-[#6d4dff]" />
          {item}
        </span>
      ))}
    </>
  );
}

function PartnerList() {
  return (
    <>
      {partners.map(({ label, Icon }) => (
        <span
          key={label}
          title={label}
          className="shrink-0 flex items-center gap-2.5 text-white/35 transition-colors duration-200 hover:text-white/70 cursor-default select-none"
        >
          <Icon aria-label={label} className="h-6 w-auto" />
          <span className="text-[13px] font-semibold tracking-tight">{label}</span>
        </span>
      ))}
    </>
  );
}
