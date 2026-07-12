"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ZovaWordmark } from "@/components/landing/zova-wordmark";
import { FaArrowRight, FaXTwitter, FaTelegram } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export interface Footer10NavLink {
  label: string;
  href: string;
}

export interface Footer10LinkColumn {
  title: string;
  links: Footer10NavLink[];
}

export interface Footer10Social {
  label: string;
  href: string;
  Icon: IconType;
}

const defaultSocials: Footer10Social[] = [
  { label: "X", href: "https://x.com/zovaagent", Icon: FaXTwitter },
  { label: "Telegram", href: "#", Icon: FaTelegram },
];

export interface Footer10Props {
  bannerTagline?: string;
  bannerHeading?: string;
  bannerCtaLabel?: React.ReactNode;
  bannerCtaHref?: string;
  contactLabel?: string;
  contactEmail?: string;
  contactEmailHref?: string;
  description?: React.ReactNode;
  newsletterPlaceholder?: string;
  onSubscribe?: (email: string) => void;
  linkColumns?: Footer10LinkColumn[];
  socials?: Footer10Social[];
  brandName?: React.ReactNode;
  copyright?: React.ReactNode;
}

export function Footer10({
  bannerTagline = "Trusted by Builders",
  bannerHeading = "Interested in working together, trying out the platform or simply learning more?",
  bannerCtaLabel = (
    <>
      Enter <ZovaWordmark height={12} className="inline-block align-[-0.1em] ml-1" />
    </>
  ),
  bannerCtaHref = "#",
  contactLabel = "Reach out :",
  contactEmail = "hello@zova.ai",
  contactEmailHref = "mailto:hello@zova.ai",
  description = (
    <>Intelligence infrastructure for autonomous AI systems. REST API, webhooks, SDK — production-ready from day one.</>
  ),
  newsletterPlaceholder = "Email address",
  onSubscribe,
  linkColumns = [],
  socials = defaultSocials,
  brandName = <ZovaWordmark height={12} className="text-white/70" />,
  copyright = (
    <span className="inline-flex items-center gap-1.5">
      © 2026 <ZovaWordmark height={10} /> Inc. All rights reserved.
    </span>
  ),
}: Footer10Props) {
  const [email, setEmail] = React.useState("");

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubscribe && email.trim()) {
      onSubscribe(email.trim());
      setEmail("");
    }
  };

  return (
    <footer
      className="w-full font-sans text-white"
      style={{ background: "#07070f" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        {/* Top banner — ShaderGradient background (same shader as hero) */}
        <div className="relative overflow-hidden rounded-none border border-white/10 px-6 py-12 sm:px-12 sm:py-16 md:px-16 lg:py-20">
          <div className="absolute inset-0 z-0" style={{ background: "#07070f" }}>
            <ShaderGradientCanvas
              style={{ width: "100%", height: "100%" }}
              pointerEvents="none"
              pixelDensity={1}
            >
              <ShaderGradient
                animate="on"
                type="sphere"
                wireframe={false}
                shader="defaults"
                uTime={0}
                uSpeed={0.15}
                uStrength={0.5}
                uDensity={1.0}
                uFrequency={5.5}
                uAmplitude={3.0}
                positionX={0.6}
                positionY={0.1}
                positionZ={0}
                rotationX={0}
                rotationY={130}
                rotationZ={50}
                color1="#6d4dff"
                color2="#07070f"
                color3="#1a0838"
                reflection={0.25}
                cAzimuthAngle={270}
                cPolarAngle={180}
                cDistance={0.5}
                cameraZoom={13}
                lightType="env"
                brightness={0.8}
                envPreset="city"
                grain="on"
                toggleAxis={false}
                zoomOut={false}
                hoverState=""
                enableTransition={false}
              />
            </ShaderGradientCanvas>
          </div>
          {/* Left-side readability veil so text stays legible */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(90deg, rgba(7,7,15,0.85) 0%, rgba(7,7,15,0.55) 45%, rgba(7,7,15,0) 100%)",
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="inline-flex items-center gap-2 self-start">
              <span className="size-2 rounded-full bg-[#a78bfa] shadow-[0_0_12px_#a78bfa]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                {bannerTagline}
              </span>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <h2 className="max-w-2xl text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {bannerHeading}
              </h2>

              <div className="shrink-0">
                <a
                  href={bannerCtaHref}
                  className="group inline-flex items-center gap-2.5 rounded-none border border-white/15 bg-[#6d4dff]/25 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-white/30 hover:bg-[#6d4dff]/40 focus:outline-none focus:ring-2 focus:ring-[#6d4dff]/40"
                >
                  <span>{bannerCtaLabel}</span>
                  <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle grid — sits on dark footer bg */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
                {contactLabel}
              </p>

              <a
                href={contactEmailHref}
                className="group mt-3 inline-flex items-baseline gap-2.5 rounded-none text-2xl font-light tracking-tight text-white transition-colors duration-200 hover:text-[#a78bfa] focus:outline-none focus:ring-2 focus:ring-[#6d4dff]/40 sm:text-3xl"
              >
                <span>{contactEmail}</span>
                <FaArrowRight className="size-5 transition-transform duration-200 ease-in-out group-hover:translate-x-2" />
              </a>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/50">
              {description}
            </p>

            {socials.length > 0 && (
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-none border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-12 lg:col-span-7">
            <form onSubmit={handleSubscribeSubmit} className="w-full max-w-md self-end">
              <div className="flex items-center justify-between border-b border-white/15 pb-1 transition-colors duration-200 focus-within:border-[#a78bfa]">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={newsletterPlaceholder}
                  required
                  className="h-10 w-full rounded-none border-0 bg-transparent px-0 text-base text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-label="Subscribe to our newsletter"
                />
                <button
                  type="submit"
                  className="group rounded-none p-2 text-white/60 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6d4dff]/40"
                  aria-label="Submit newsletter subscription"
                >
                  <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>

            {linkColumns.length > 0 && (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
                {linkColumns.map((column) => (
                  <div key={column.title} className="flex flex-col">
                    <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/90">
                      {column.title}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="rounded-none text-sm text-white/50 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6d4dff]/40"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>{brandName}</span>
          <span>{copyright}</span>
        </div>
      </div>
    </footer>
  );
}
