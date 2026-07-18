import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustBar } from "@/components/landing/trust-bar";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { FeaturePlatform } from "@/components/feature-platform";
import { TerminalWorkflow } from "@/components/landing/terminal-workflow";
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
        <div id="platform"><ProblemSolution /></div>
        <div id="features"><FeaturePlatform /></div>
        <TerminalWorkflow />
        <div id="capabilities"><BoldStats /></div>
        <div id="how"><HowItWorks /></div>
        <div id="stack"><FaqInteractivePreview /></div>
      </main>
      <Footer10
        bannerTagline="Open beta · Free to start"
        bannerHeading="Your AI deserves a body. ZOVA handles the mesh, voice, memory, and payments."
        bannerCtaLabel="Build your agent"
        bannerCtaHref="#forge"
        contactLabel="Developer Hub :"
        contactEmail="docs.zova.ai"
        contactEmailHref="#docs"
        description="ZOVA is the 3D agent layer of the internet — from selfie to published agent, from embed to earning USDC per chat."
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
              { label: "Walk",          href: "#walk"        },
              { label: "Marketplace",   href: "#marketplace" },
              { label: "Widgets",       href: "#widgets"     },
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
