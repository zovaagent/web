"use client";

import { useEffect, useState } from "react";

/**
 * Reveals `text` progressively at ~35 chars/sec.
 * Respects prefers-reduced-motion — reveals instantly.
 */
export function useTypewriter(text: string, charsPerSecond = 35): string {
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced) {
      setRendered(text);
      return;
    }

    setRendered("");
    let i = 0;
    const stepMs = 1000 / charsPerSecond;
    const id = setInterval(() => {
      i++;
      setRendered(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, stepMs);
    return () => clearInterval(id);
  }, [text, charsPerSecond]);

  return rendered;
}
