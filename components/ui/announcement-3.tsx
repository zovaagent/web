"use client";

import Link from "next/link";
import { X, ArrowRight, Terminal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Announcement3Props {
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
  dismissible?: boolean;
}

export function Announcement3({
  message = "Text → 3D generation is live — build a 3D agent in about a minute",
  ctaLabel = "Try Forge",
  ctaHref = "#forge",
  dismissible = true,
}: Announcement3Props) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="relative flex w-full items-center justify-center px-4 py-2 font-mono tracking-tight border-b"
        style={{
          background: "linear-gradient(to right, rgba(109,77,255,0.95), rgba(109,77,255,0.85))",
          borderColor: "rgba(109,77,255,0.4)",
        }}
      >
        <div className="flex-col items-center space-y-1 text-[11px] sm:flex sm:flex-row sm:gap-3 sm:space-y-0">
          <div className="text-white flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 shrink-0" />
            <span className="font-medium">{message}</span>
          </div>
          <div className="group flex items-center gap-3">
            <span className="hidden size-1 rounded-full bg-white/60 sm:block" />
            <Button
              nativeButton={false}
              render={<Link href={ctaHref} />}
              className="h-7 rounded-none bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3a1fa8] hover:bg-white/95 dark:bg-white dark:hover:bg-white/95 gap-1.5"
            >
              {ctaLabel}
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

        {dismissible && (
          <button
            aria-label="Dismiss"
            onClick={() => setVisible(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-6 items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Announcement3;
