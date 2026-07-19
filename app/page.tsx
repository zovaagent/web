import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustBar } from "@/components/landing/trust-bar";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { FeaturePlatform } from "@/components/feature-platform";
import { TerminalWorkflow } from "@/components/landing/terminal-workflow";
import { AutonomousTrading } from "@/components/landing/autonomous-trading";
import { TokenEconomy } from "@/components/landing/token-economy";
import { DeveloperPlatform } from "@/components/landing/developer-platform";
import { BoldStats } from "@/components/stats-bold";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FaqInteractivePreview } from "@/components/faq-interactive-preview";
import { Footer10 } from "@/components/ui/footer-10";
import { ZovaWordmark } from "@/components/landing/zova-wordmark";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <div id="home"><HeroSection /></div>
        <TrustBar />
        <ProblemSolution />
        <div id="features"><FeaturePlatform /></div>
        <TerminalWorkflow />
        <AutonomousTrading />
        <TokenEconomy />
        <div id="capabilities"><BoldStats /></div>
        <DeveloperPlatform />
        <div id="how"><HowItWorks /></div>
        <div id="stack"><FaqInteractivePreview /></div>
      </main>
      <Footer10
        bannerTagline="Open beta · Free to start"
        bannerHeading="Your AI deserves a body. ZOVA handles the mesh, voice, memory, and payments."
        bannerCtaLabel="Build your agent"
        bannerCtaHref="#forge"
        brandName={<ZovaWordmark height={12} className="text-white/70" />}
        copyright={<span className="inline-flex items-center gap-1.5">© 2026 <ZovaWordmark height={10} /> · Apache-2.0 · Built on Solana</span>}
        linkColumns={[
          {
            title: "Product",
            links: [
              { label: "Forge Studio",  href: "#forge"       },
              { label: "Avatars",       href: "#avatars"     },
              { label: "Agents",        href: "#agents"      },
              { label: "Library",       href: "#library"     },
            ],
          },
          {
            title: "Platform",
            links: [
              { label: "Embed",         href: "#embed"       },
              { label: "Trading",       href: "#trading"     },
              { label: "Token Economy", href: "#token"       },
              { label: "Marketplace",   href: "#marketplace" },
            ],
          },
          {
            title: "Developers",
            links: [
              { label: "Docs",          href: "#docs"        },
              { label: "API Reference", href: "#api"         },
              { label: "SDK",           href: "#sdk"         },
              { label: "MCP",           href: "#mcp"         },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About",         href: "#about"       },
              { label: "Blog",          href: "#blog"        },
              { label: "GitHub",        href: "https://github.com/zova-ai" },
              { label: "X / Twitter",   href: "https://x.com/zovaAI"       },
            ],
          },
        ]}
      />
    </>
  );
}
