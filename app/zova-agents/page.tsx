"use client";

import { useState } from "react";
import { Hero } from "@/components/zova/hero";
import { GeneratorSection } from "@/components/zova/generator-section";
import { AgentEcosystem } from "@/components/zova/agent-ecosystem";
import { AgentWorkflow } from "@/components/zova/agent-workflow";
import { AgentMarketplace } from "@/components/zova/agent-marketplace";
import { BuildersSection } from "@/components/zova/builders-section";
import { FinalCta } from "@/components/zova/final-cta";
import { Navbar } from "@/components/landing/navbar";
import { Footer10 } from "@/components/ui/footer-10";
import { ZovaWordmark } from "@/components/landing/zova-wordmark";

function Separator() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="h-px bg-white/10" />
    </div>
  );
}

export default function ZovaAgentsPage() {
  const [sharedPrompt, setSharedPrompt] = useState<string>("");

  return (
    <div className="min-h-screen bg-[#05050a] text-white selection:bg-[#6d4dff]/40">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[25%] w-[450px] h-[450px] bg-[#6d4dff]/[0.05] blur-[140px]" />
        <div className="absolute top-[60%] right-[15%] w-[550px] h-[550px] bg-[#3ed8ff]/[0.05] blur-[160px]" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero onSubmitPrompt={setSharedPrompt} />
        <Separator />
        <GeneratorSection prefilledPrompt={sharedPrompt} />
        <Separator />
        <AgentEcosystem onSelectPrompt={setSharedPrompt} />
        <Separator />
        <AgentWorkflow />
        <Separator />
        <AgentMarketplace onSelectPrompt={setSharedPrompt} />
        <Separator />
        <BuildersSection />
        <FinalCta />
      </main>
      <Footer10
        bannerTagline="Open beta · Free to start"
        bannerHeading="Your AI deserves a body. ZOVA handles the mesh, voice, memory, and payments."
        bannerCtaLabel="Build your agent"
        bannerCtaHref="#interactive-agent-generator"
        brandName={<ZovaWordmark height={12} className="text-white/70" />}
        copyright={
          <span className="inline-flex items-center gap-1.5">
            © 2026 <ZovaWordmark height={10} /> · Apache-2.0 · Built on Solana
          </span>
        }
        linkColumns={[
          {
            title: "Platform",
            links: [
              { label: "Agents", href: "#agent-ecosystem" },
              { label: "Marketplace", href: "#agent-marketplace" },
              { label: "Architecture", href: "#agent-workflow" },
              { label: "Compiler", href: "#interactive-agent-generator" },
            ],
          },
          {
            title: "Developers",
            links: [
              { label: "SDK & Core", href: "#builders-section" },
              { label: "Declarative Schemas", href: "#builders-section" },
              { label: "API Reference", href: "#builders-section" },
              { label: "MCP", href: "#mcp" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Security", href: "#" },
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "About", href: "#about" },
            ],
          },
          {
            title: "Social",
            links: [
              { label: "GitHub", href: "https://github.com/zova-ai" },
              { label: "X / Twitter", href: "https://x.com/zovaAI" },
              { label: "Blog", href: "#blog" },
              { label: "Docs", href: "#builders-section" },
            ],
          },
        ]}
      />
    </div>
  );
}
