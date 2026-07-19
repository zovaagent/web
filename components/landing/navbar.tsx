"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ZovaLogo } from "@/components/landing/zova-logo";
import { ZovaWordmark } from "@/components/landing/zova-wordmark";
import { Announcement3 } from "@/components/ui/announcement-3";

const navLinks = [
  { label: "Agents",       href: "#agent-ecosystem"             },
  { label: "Marketplace",  href: "#agent-marketplace"           },
  { label: "Build",        href: "#builders-section"            },
  { label: "Architecture", href: "#agent-workflow"              },
  { label: "Docs",         href: "#builders-section"            },
];

const socials = [
  { label: "GitHub", href: "https://github.com/zova-ai", Icon: FaGithub  },
  { label: "X",      href: "https://x.com/zovaagent",       Icon: FaXTwitter },
];

const linkText = "text-[11px] font-medium uppercase tracking-[0.16em]";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50 w-screen font-sans">
      <Announcement3
        message="Create · Deploy · Scale intelligent agents"
        ctaLabel="Try Compiler"
        ctaHref="#interactive-agent-generator"
      />

      <header className="border-b border-white/10 bg-[#05050a]">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <ZovaLogo size={22} />
              <ZovaWordmark height={13} className="text-white" />
            </Link>

            <span aria-hidden="true" className="hidden text-white/20 lg:inline">/</span>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className={`${linkText} rounded-none px-3 py-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex items-center gap-1">
              {socials.map(({ label, href, Icon }) => (
                <Link key={label} href={href} aria-label={label}
                  className="inline-flex size-8 items-center justify-center text-white/40 transition-colors hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            <Link href="#interactive-agent-generator"
              className={`${linkText} border border-transparent bg-[#6d4dff]/15 px-4 py-2 text-[#a78bfa] transition-colors hover:bg-[#6d4dff]/25 hover:text-white inline-flex items-center gap-1.5`}
            >
              Create Agent
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-9 items-center justify-center text-white/70 transition-colors hover:text-white lg:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-white/10 bg-[#05050a] p-0 font-sans">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                  <div className="flex items-center gap-2">
                    <ZovaLogo size={20} />
                    <ZovaWordmark height={12} className="text-white" />
                  </div>
                  <button onClick={() => setOpen(false)} className="text-white/50 transition-colors hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 space-y-1 p-4">
                  {navLinks.map((link) => (
                    <a key={link.label} href={link.href} onClick={() => setOpen(false)}
                      className={`${linkText} block rounded-none px-3 py-2.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="border-t border-white/10 p-4">
                  <Link href="#interactive-agent-generator" onClick={() => setOpen(false)}
                    className={`${linkText} inline-flex w-full items-center justify-center gap-1.5 rounded-none bg-[#6d4dff]/15 px-4 py-2.5 text-center text-[#a78bfa] hover:bg-[#6d4dff]/25 hover:text-white`}
                  >
                    Create Agent
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                  <div className="flex items-center justify-center gap-3 pt-4">
                    {socials.map(({ label, href, Icon }) => (
                      <Link key={label} href={href} onClick={() => setOpen(false)} aria-label={label}
                        className="inline-flex size-9 items-center justify-center text-white/50 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </div>
  );
}
