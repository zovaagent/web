"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { InteractiveHeroCreator } from "./interactive-hero-creator";

interface HeroProps {
  onSubmitPrompt: (prompt: string) => void;
}

export function Hero({ onSubmitPrompt }: HeroProps) {
  const [prompt, setPrompt] = useState("");

  const scrollToGenerator = () => {
    const el = document.getElementById("interactive-agent-generator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMarketplace = () => {
    const el = document.getElementById("agent-marketplace");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="zova-hero"
      className="relative overflow-hidden bg-[#050505] min-h-screen flex items-center pt-24 md:pt-28 pb-16 md:pb-20"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[25%] w-[450px] h-[450px] bg-violet-600/8 rounded-full blur-[140px]" />
        <div className="absolute top-[60%] right-[15%] w-[550px] h-[550px] bg-cyan-600/6 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 bg-violet-950/40 border border-violet-500/25 text-violet-300 text-[10px] md:text-xs px-4 py-1.5 rounded-sm font-mono tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            CREATE. DEPLOY. SCALE. INTELLIGENT AGENTS.
          </div>

          <div className="space-y-5">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.04em] text-white leading-[0.95]">
              Build intelligent <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300">
                agents.
              </span>
            </h1>

            <p className="text-base md:text-xl text-white/50 leading-relaxed font-light max-w-xl">
              ZOVA enables anyone to create digital agents that understand objectives, use tools,
              and operate autonomously.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToGenerator}
              className="group relative px-8 py-4 bg-gradient-to-br from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-violet-500/40 rounded-sm transition-all duration-300 cursor-pointer text-sm hover:-translate-y-0.5"
            >
              Create an Agent
            </button>
            <button
              onClick={scrollToMarketplace}
              className="px-8 py-4 bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-violet-500/40 text-white font-medium rounded-sm transition-all duration-300 cursor-pointer text-sm hover:-translate-y-0.5"
            >
              Explore Marketplace
            </button>
          </div>

          {/* Prompt input */}
          <div className="pt-8 border-t border-white/10 max-w-xl">
            <p className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
              Ready to deploy?
            </p>
            <div className="relative flex items-center">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your agent's objective..."
                className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && prompt.trim()) {
                    onSubmitPrompt(prompt);
                    scrollToGenerator();
                  }
                }}
              />
              <button
                onClick={() => {
                  if (prompt.trim()) onSubmitPrompt(prompt);
                  scrollToGenerator();
                }}
                className="absolute right-3 px-4 py-1.5 bg-white text-black text-xs font-bold rounded-sm hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Start
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-white/10 pt-8 grid grid-cols-3 gap-6">
            <div>
              <span className="text-xl md:text-2xl font-mono font-bold text-white block">99.8%</span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mt-1 block">
                Decision Accuracy
              </span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-mono font-bold text-white block">
                &lt; 500ms
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mt-1 block">
                Execution Latency
              </span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-mono font-bold text-white block">2.1M+</span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mt-1 block">
                Active Deployments
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Live Preview */}
        <div className="lg:col-span-5">
          <InteractiveHeroCreator />
        </div>
      </div>
    </section>
  );
}
