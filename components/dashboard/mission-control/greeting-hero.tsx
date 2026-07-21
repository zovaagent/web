"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PulseDot } from "@/components/dashboard/common/pulse-dot";
import { useAgentsStore } from "@/stores/dashboard/agents-store";

function greetingFor(hour: number) {
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 22) return "Good evening";
  return "Good night";
}

export function GreetingHero() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const running = useAgentsStore((s) =>
    s.agents.filter((a) => a.status === "running").length
  );
  const failed = useAgentsStore((s) =>
    s.agents.filter((a) => a.status === "failed").length
  );

  useEffect(() => {
    setGreeting(greetingFor(new Date().getHours()));
  }, []);

  const status =
    failed > 0
      ? `${failed} agent${failed > 1 ? "s" : ""} need${failed > 1 ? "" : "s"} attention.`
      : "Your autonomous agents are running normally.";

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/40"
      >
        <PulseDot status={failed > 0 ? "failed" : "running"} size={6} />
        <span>Live · {running} executing now</span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-4xl font-light tracking-tight text-white sm:text-5xl"
      >
        {greeting ?? "Welcome back"}
        <span className="text-white/40">.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-xl text-[15px] leading-relaxed text-white/55"
      >
        {status}
      </motion.p>
    </div>
  );
}
