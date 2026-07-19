"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/zova/hero";
import { GeneratorSection } from "@/components/zova/generator-section";
import { AgentEcosystem } from "@/components/zova/agent-ecosystem";
import { AgentWorkflow } from "@/components/zova/agent-workflow";
import { AgentMarketplace } from "@/components/zova/agent-marketplace";
import { BuildersSection } from "@/components/zova/builders-section";
import { FinalCta } from "@/components/zova/final-cta";

export default function HomePage() {
  const [sharedPrompt, setSharedPrompt] = useState<string>("");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero onSubmitPrompt={setSharedPrompt} />
        <GeneratorSection prefilledPrompt={sharedPrompt} />
        <AgentEcosystem onSelectPrompt={setSharedPrompt} />
        <AgentWorkflow />
        <AgentMarketplace onSelectPrompt={setSharedPrompt} />
        <BuildersSection />
        <FinalCta />
      </main>

      <footer className="bg-[#050505] border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3 select-none">
              <span className="text-xl font-bold tracking-tight uppercase text-white">ZOVA</span>
              <span className="text-[9px] uppercase tracking-widest text-white/40 border-l border-white/20 pl-3 leading-none font-mono">
                Zone of<br />Virtual Autonomy
              </span>
            </div>

            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              Zone of Virtual Autonomy. The global registry and runtime engine for autonomous, context-aware digital agents.
            </p>

            <span className="text-[10px] font-mono text-neutral-600 block pt-2">
              © 2026 ZOVA Technologies, Inc. All rights reserved.
            </span>
          </div>

          <div className="hidden md:col-span-2 md:block" />

          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Platform</h4>
              <ul className="space-y-2.5 text-xs text-neutral-500">
                <li><button onClick={() => scrollTo("agent-ecosystem")} className="hover:text-neutral-300 transition-colors bg-transparent border-0 p-0 text-left cursor-pointer">Agents</button></li>
                <li><button onClick={() => scrollTo("agent-marketplace")} className="hover:text-neutral-300 transition-colors bg-transparent border-0 p-0 text-left cursor-pointer">Marketplace</button></li>
                <li><button onClick={() => scrollTo("agent-workflow")} className="hover:text-neutral-300 transition-colors bg-transparent border-0 p-0 text-left cursor-pointer">Architecture</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Developers</h4>
              <ul className="space-y-2.5 text-xs text-neutral-500">
                <li><button onClick={() => scrollTo("builders-section")} className="hover:text-neutral-300 transition-colors bg-transparent border-0 p-0 text-left cursor-pointer">SDK & Core</button></li>
                <li><button onClick={() => scrollTo("builders-section")} className="hover:text-neutral-300 transition-colors bg-transparent border-0 p-0 text-left cursor-pointer">Declarative Schemas</button></li>
                <li><button onClick={() => scrollTo("builders-section")} className="hover:text-neutral-300 transition-colors bg-transparent border-0 p-0 text-left cursor-pointer">API Reference</button></li>
              </ul>
            </div>

            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Company</h4>
              <ul className="space-y-2.5 text-xs text-neutral-500">
                <li><a href="#" className="hover:text-neutral-300 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
