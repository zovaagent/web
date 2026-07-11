"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useScroll({ target: ref, offset: ["start start", "end end"] }).scrollYProgress,
    { stiffness: 500, damping: 90 }
  );

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
  });

  return (
    <motion.div ref={ref} className={cn("relative mx-auto max-w-4xl", className)}>
      <div className="absolute -left-4 top-3 hidden md:block">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{ boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.3)" }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-purple-500/30 shadow-sm"
        >
          <div className="h-2 w-2 rounded-full bg-purple-500" />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#27272a"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
            style={{
              pathLength: springProgress,
              pathOffset: 0,
            }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={springProgress}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#8b5cf6" />
              <stop offset="0.325" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
