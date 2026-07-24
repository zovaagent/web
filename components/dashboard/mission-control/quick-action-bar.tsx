"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { useAgentsStore } from "@/stores/dashboard/agents-store";
import { useRouter } from "next/navigation";

const SUGGESTIONS = [
  "Research our top 3 competitors this week",
  "Draft outreach to 20 accounts matching our ICP",
  "Summarize incoming support tickets since Monday",
  "Watch AWS spend, alert if we're over budget",
];

interface QuickActionBarProps {
  mode?: "create" | "run";
  agentId?: string;
  onCreated?: (agentId: string) => void;
}

export function QuickActionBar({
  mode = "create",
  agentId,
  onCreated,
}: QuickActionBarProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { createAgent, runAgent } = useAgentsStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || loading) return;

    setLoading(true);

    try {
      if (mode === "run" && agentId) {
        // Run existing agent
        await runAgent(agentId, value);
        setValue("");
      } else {
        // Create new agent
        const agent = await createAgent(value);
        if (agent) {
          setValue("");
          if (onCreated) {
            onCreated(agent.id);
          } else {
            router.push(`/dashboard/agents/${agent.id}`);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlowCard interactive className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/40 p-3 focus-within:border-[rgba(167,139,250,0.35)] focus-within:shadow-[0_0_0_1px_rgba(167,139,250,0.25)]">
          <Sparkles className="ml-1 size-4 shrink-0 text-[#a78bfa]" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              mode === "run"
                ? "What should the agent do next?"
                : "What should your agent do?"
            }
            className="flex-1 bg-transparent text-[15px] font-light text-white placeholder:text-white/35 focus:outline-none"
            disabled={loading}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            disabled={loading || !value.trim()}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-b from-[#8b5cf6] to-[#6d28d9] px-3.5 text-[13px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_10px_30px_-10px_rgba(139,92,246,0.65)] transition-colors hover:from-[#a78bfa] hover:to-[#7c3aed] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <>
                {mode === "run" ? "Run" : "Create"}
                <ArrowRight className="size-3.5" />
              </>
            )}
          </motion.button>
        </div>
        {mode === "create" && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setValue(s)}
                className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/50 transition-colors hover:border-white/15 hover:text-white/80"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </form>
    </GlowCard>
  );
}
