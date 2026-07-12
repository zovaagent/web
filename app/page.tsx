import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustBar } from "@/components/landing/trust-bar";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { FeaturePlatform } from "@/components/feature-platform";
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
        <div id="problem"><ProblemSolution /></div>
        <div id="platform"><FeaturePlatform /></div>
        <div id="stats"><BoldStats /></div>
        <div id="how"><HowItWorks /></div>
        <div id="faq"><FaqInteractivePreview /></div>
      </main>
      <Footer10
        bannerTagline="Trusted by Builders"
        bannerHeading="Interested in working together, trying out the platform or simply learning more?"
        bannerCtaLabel={<>Enter <ZovaWordmark height={12} className="inline-block align-[-0.1em] ml-1" /></>}
        bannerCtaHref="#"
        contactLabel="Reach out :"
        contactEmail="hello@zova.ai"
        contactEmailHref="mailto:hello@zova.ai"
        description={<><ZovaWordmark height={12} className="inline-block align-[-0.1em] mr-1" /> turns raw blockchain data into structured context that AI agents can reason over. REST API, webhooks, SDK — production-ready from day one.</>}
        brandName={<ZovaWordmark height={12} className="text-white/70" />}
        copyright={<span className="inline-flex items-center gap-1.5">© 2026 <ZovaWordmark height={10} /> Inc. Intelligence Infrastructure · Blockchain × AI</span>}
        linkColumns={[
          {
            title: "Product",
            links: [
              { label: "Wallet Intelligence", href: "/docs/wallet-intelligence" },
              { label: "Token Intelligence", href: "/docs/token-intelligence" },
              { label: "Contract Context", href: "/docs/contract-intelligence" },
              { label: "Risk Signals", href: "/docs/risk-signals" },
            ],
          },
          {
            title: "Developers",
            links: [
              { label: "Documentation", href: "/docs" },
              { label: "API Reference", href: "/docs/api-reference" },
              { label: "SDK Guide", href: "/docs/sdk" },
            ],
          },
          {
            title: "Solutions",
            links: [
              { label: "AI Agents", href: "#" },
              { label: "DeFi Protocols", href: "#" },
              { label: "Enterprise", href: "#" },
              { label: "Builders", href: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "#" },
              { label: "Whitepaper", href: "#" },
              { label: "Roadmap", href: "#" },
              { label: "Blog", href: "#" },
            ],
          },
        ]}
      />
    </>
  );
}
