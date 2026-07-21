"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Globe, Search, StickyNote, Upload } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/common/section-header";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { SEED_KNOWLEDGE } from "@/lib/dashboard/mock-data";
import { formatRelative } from "@/lib/dashboard/format";
import type { KnowledgeSource } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

const KIND_ICON = {
  document: FileText,
  url: Globe,
  note: StickyNote,
} as const;

const TABS: Array<{ label: string; value: KnowledgeSource["kind"] | "all" }> = [
  { label: "All", value: "all" },
  { label: "Documents", value: "document" },
  { label: "URLs", value: "url" },
  { label: "Notes", value: "note" },
];

export default function KnowledgePage() {
  const [tab, setTab] = useState<KnowledgeSource["kind"] | "all">("all");
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    return SEED_KNOWLEDGE
      .filter((k) => (tab === "all" ? true : k.kind === tab))
      .filter((k) => k.title.toLowerCase().includes(q.toLowerCase()));
  }, [tab, q]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <SectionHeader
        eyebrow="Knowledge"
        title="What your agents know"
        description="Every document, URL, and note your agents can retrieve from. Version-tracked and scoped per agent."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-[#8b5cf6] to-[#6d28d9] px-3.5 py-2 text-[13px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)]">
            <Upload className="size-3.5" />
            Upload
          </button>
        }
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search knowledge…"
            className="h-10 w-full rounded-lg border border-white/[0.06] bg-white/[0.02] pl-10 pr-3 text-[13px] text-white placeholder:text-white/35 focus:border-[rgba(167,139,250,0.35)] focus:outline-none focus:shadow-[0_0_0_1px_rgba(167,139,250,0.25)]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {TABS.map((t) => {
            const active = tab === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                  active
                    ? "border-[rgba(167,139,250,0.35)] bg-[rgba(139,92,246,0.10)] text-white"
                    : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80"
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        className="rounded-2xl border-2 border-dashed border-white/[0.08] bg-white/[0.015] p-8 text-center"
      >
        <div className="mx-auto flex size-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-[#a78bfa]">
          <Upload className="size-4" />
        </div>
        <p className="mt-3 text-[13px] text-white/70">Drag PDFs, MDs, or paste URLs here.</p>
        <p className="text-[11px] text-white/40">Or use the Upload button. Files stay in your workspace.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {visible.map((k, i) => {
          const Icon = KIND_ICON[k.kind];
          return (
            <motion.div
              key={k.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.02 * i }}
            >
              <GlowCard interactive className="flex items-center gap-4 p-4">
                <span className="flex size-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-[#a78bfa]">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-medium text-white">{k.title}</div>
                  <div className="truncate text-[11.5px] text-white/45">{k.meta}</div>
                </div>
                {k.category && (
                  <span className="hidden shrink-0 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/50 sm:inline">
                    {k.category}
                  </span>
                )}
                <span className="hidden shrink-0 text-[11px] text-white/35 sm:inline">
                  {formatRelative(Date.now() + k.updatedAt)}
                </span>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
