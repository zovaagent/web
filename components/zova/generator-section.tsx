"use client";

import { InteractiveAgentGenerator } from "./interactive-agent-generator";

interface Props {
  prefilledPrompt?: string;
}

export function GeneratorSection({ prefilledPrompt }: Props) {
  return (
    <section className="py-20 md:py-28 bg-[#05050a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-10 space-y-4">
        <span className="text-[11px] font-mono font-semibold tracking-[0.22em] text-[#a78bfa] uppercase">
          AI Compilation
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-[-0.02em]">
          Compile your custom digital agent.
        </h2>
        <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
          Input any objective in plain English. Our compiler automatically
          resolves toolchains, memory states, and deploys it immediately.
        </p>
      </div>
      <InteractiveAgentGenerator prefilledPrompt={prefilledPrompt} />
    </section>
  );
}
