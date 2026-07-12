"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ZovaLogo } from "./zova-logo";
import { ZovaWordmark } from "./zova-wordmark";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Stats", href: "#stats" },
  { label: "How", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

const utilityLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Litepaper", href: "#litepaper" },
];

const socials = [
  { label: "X", href: "https://x.com/zovaagent", Icon: FaXTwitter },
  { label: "Telegram", href: "#", Icon: FaTelegram },
];

const linkText = "text-[11px] font-medium uppercase tracking-[0.16em]";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-screen border-b border-white/10 bg-[#05050a] font-sans">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <ZovaLogo idPrefix="nav-main" size={30} />
            <ZovaWordmark height={20} className="text-white" />
          </Link>

          <span aria-hidden="true" className="hidden text-white/20 lg:inline">/</span>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`${linkText} rounded-none px-3 py-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-1">
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${linkText} rounded-none border border-white/10 px-3 py-2 text-white/70 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mx-1 flex items-center gap-1">
            {socials.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex size-8 items-center justify-center rounded-none text-white/50 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>

          <Link
            href="#signin"
            className={`${linkText} rounded-none border border-transparent bg-[var(--zova-purple)]/15 px-4 py-2 text-[var(--zova-purple-light)] transition-colors hover:bg-[var(--zova-purple)]/25 hover:text-white`}
          >
            Sign in
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-9 items-center justify-center rounded-none text-white/70 transition-colors hover:text-white lg:hidden">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-white/10 bg-[#05050a] p-0 font-sans">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <ZovaLogo idPrefix="nav-mobile" size={30} />
                  <ZovaWordmark height={20} className="text-white" />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/50 transition-colors hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-1 p-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`${linkText} block rounded-none px-3 py-2.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-4 border-t border-white/10 pt-4">
                  {utilityLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`${linkText} block rounded-none px-3 py-2.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="space-y-2 border-t border-white/10 p-4">
                <Link
                  href="#signin"
                  onClick={() => setOpen(false)}
                  className={`${linkText} block rounded-none bg-[var(--zova-purple)]/15 px-4 py-2.5 text-center text-[var(--zova-purple-light)] transition-colors hover:bg-[var(--zova-purple)]/25 hover:text-white`}
                >
                  Sign in
                </Link>
                <div className="flex items-center justify-center gap-3 pt-2">
                  {socials.map(({ label, href, Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-label={label}
                      className="inline-flex size-9 items-center justify-center rounded-none text-white/50 transition-colors hover:bg-white/5 hover:text-white"
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
  );
}
