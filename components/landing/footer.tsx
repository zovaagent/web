import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ZovaLogo } from "./zova-logo";

const footerLinks = {
  Product: [
    { label: "Wallet Intelligence", href: "/docs/wallet-intelligence" },
    { label: "Token Intelligence", href: "/docs/token-intelligence" },
    { label: "Contract Context", href: "/docs/contract-intelligence" },
    { label: "Risk Signals", href: "/docs/risk-signals" },
    { label: "Dashboard", href: "#" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api-reference" },
    { label: "SDK Guide", href: "/docs/sdk" },
    { label: "Changelog", href: "#" },
  ],
  Solutions: [
    { label: "AI Agents", href: "#" },
    { label: "DeFi Protocols", href: "#" },
    { label: "Enterprise", href: "#" },
    { label: "Builders", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Whitepaper", href: "#" },
    { label: "Roadmap", href: "#" },
    { label: "Community", href: "#" },
    { label: "Blog", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#05050a] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <ZovaLogo size={22} idPrefix="footer" />
              <span className="text-white font-azonix text-base">ZOVA</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed">
              Intelligence infrastructure for autonomous AI systems.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Link href="https://x.com/zovaagent" aria-label="Twitter / X" className="text-white/30 hover:text-white/70 transition-colors">
                <XIcon />
              </Link>
              <Link href="#" aria-label="Discord" className="text-white/30 hover:text-white/70 transition-colors">
                <DiscordIcon />
              </Link>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-3">
              <h4 className="text-white/80 text-xs font-semibold tracking-[0.12em] uppercase">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/5" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>© 2025 <span className="font-azonix">ZOVA</span>. Building the intelligence infrastructure for autonomous AI.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.081.115 18.104.133 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

