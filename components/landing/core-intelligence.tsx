import { Wallet, Database, Code2, ShieldAlert } from "lucide-react";
import { HoverEffect } from "@/components/ui/aceternity/card-hover-effect";
import { SectionLabel } from "./section-label";
import { FadeUp } from "./animation";

const intelligenceItems = [
  {
    icon: <Wallet className="h-5 w-5" />,
    title: "Wallet Intelligence",
    description:
      "Understand behavior, relationships, and historical patterns of any wallet or entity. Behavioral scoring, activity timelines, and entity classification.",
    link: "/docs/wallet-intelligence",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Token Intelligence",
    description:
      "Analyze token activity, holder behavior, liquidity, and distribution dynamics. Reason about assets beyond simple price movements.",
    link: "/docs/token-intelligence",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Contract Context",
    description:
      "Decode smart contracts, interactions, permissions, and operational logic. Structured metadata for machine understanding.",
    link: "/docs/contract-intelligence",
  },
  {
    icon: <ShieldAlert className="h-5 w-5" />,
    title: "Risk Signals",
    description:
      "Detect anomalies, suspicious patterns, and potential threats in real-time. Context-aware risk evaluation for autonomous systems.",
    link: "/docs/risk-signals",
  },
];

export function CoreIntelligence() {
  return (
    <section className="py-24 bg-[#05050a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-12 flex flex-col gap-4">
          <SectionLabel number="03" label="Core Intelligence" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white max-w-xl leading-tight">
            Four layers of structured intelligence
          </h2>
          <p className="text-white/50 max-w-lg leading-relaxed">
            Each intelligence module transforms raw on-chain data into structured context
            that autonomous AI systems can immediately understand and act on.
          </p>
        </FadeUp>

        <HoverEffect items={intelligenceItems} />
      </div>
    </section>
  );
}
