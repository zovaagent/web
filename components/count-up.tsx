"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

interface CountUpProps {
  /** Value string like "50M+", "<100ms", "99.9%", "10+". Prefix/suffix are preserved; only the numeric part animates. */
  value: string;
  /** Duration in seconds. Defaults to 1.8. */
  duration?: number;
  /** Fire once. Defaults to true. */
  once?: boolean;
  className?: string;
}

const NUMBER_RE = /-?\d+(?:\.\d+)?/;

export function CountUp({ value, duration = 1.8, once = true, className }: CountUpProps) {
  const match = value.match(NUMBER_RE);
  if (!match) return <span className={className}>{value}</span>;

  const target = parseFloat(match[0]);
  const prefix = value.slice(0, match.index);
  const suffix = value.slice((match.index ?? 0) + match[0].length);
  const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
