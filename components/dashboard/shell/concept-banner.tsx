"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles, X } from "lucide-react";

const STORAGE_KEY = "zova.dashboard.concept-banner.dismissed";
const CSS_VAR = "--concept-banner-h";

// SSR-safe useLayoutEffect.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function setBannerHeight(px: number) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(CSS_VAR, `${px}px`);
}

export function ConceptBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Read localStorage after mount (avoid hydration mismatch).
  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  // Publish current banner height as a CSS var so layouts can offset content.
  useIsoLayoutEffect(() => {
    if (!visible) {
      setBannerHeight(0);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const publish = () => setBannerHeight(el.getBoundingClientRect().height);
    publish();

    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      setBannerHeight(0);
    };
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-0 top-0 z-[70] border-b border-[rgba(139,92,246,0.18)] bg-[#05050a]/85 backdrop-blur-xl"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_0%_50%,rgba(139,92,246,0.22)_0%,rgba(139,92,246,0.06)_45%,rgba(5,5,10,0)_100%)]"
          />
          <div className="relative flex items-center gap-4 px-4 py-2.5 md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c4b5fd]">
                <Sparkles className="size-3.5 text-[#a78bfa]" />
                Concept Interface
              </span>
              <span className="hidden h-3 w-px bg-white/[0.1] md:inline-block" />
              <p className="truncate text-[12.5px] text-white/60">
                This interface represents our current product direction as we continue building ZOVA.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href="/docs"
                className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11.5px] font-medium text-white/80 transition-colors hover:border-[rgba(167,139,250,0.35)] hover:text-white"
              >
                Learn more
                <ArrowUpRight className="size-3" />
              </Link>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
