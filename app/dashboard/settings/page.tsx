"use client";

import { useState } from "react";
import { Building2, Cpu, CreditCard, Users } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/common/section-header";
import { GlowCard } from "@/components/dashboard/common/glow-card";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "models", label: "Models", icon: Cpu },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Users },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/[0.05] py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-md">
        <div className="text-[13.5px] font-medium text-white">{label}</div>
        {hint && <p className="text-[12px] text-white/45">{hint}</p>}
      </div>
      <div className="sm:min-w-[220px]">{children}</div>
    </div>
  );
}

function Input({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) {
  return (
    <input
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="h-9 w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 text-[13px] text-white placeholder:text-white/35 focus:border-[rgba(167,139,250,0.35)] focus:outline-none"
    />
  );
}

function WorkspaceTab() {
  return (
    <GlowCard className="p-6">
      <Row label="Workspace name" hint="Displayed at the top-left, and in agent transcripts."><Input defaultValue="ZOVA · Product" /></Row>
      <Row label="Workspace URL" hint="Used for shareable links."><Input defaultValue="zova.ai/w/product" /></Row>
      <Row label="Timezone" hint="All timestamps rendered in this timezone."><Input defaultValue="Asia/Jakarta" /></Row>
    </GlowCard>
  );
}

function ModelsTab() {
  return (
    <GlowCard className="p-6">
      <Row label="Default model" hint="What new agents ship with."><Input defaultValue="claude-opus-4-8" /></Row>
      <Row label="Fallback model" hint="On rate limit or timeout."><Input defaultValue="claude-sonnet-5" /></Row>
      <Row label="Reasoning budget" hint="Max tokens per reasoning step."><Input defaultValue="4096" /></Row>
      <Row label="Cache TTL" hint="How long prompt-cache blocks stay warm."><Input defaultValue="1h" /></Row>
    </GlowCard>
  );
}

function BillingTab() {
  return (
    <GlowCard className="p-6">
      <Row label="Plan" hint="Includes unlimited agents, 4M tokens/month."><span className="text-[13px] text-white/80">Team · $99/mo</span></Row>
      <Row label="Usage this cycle" hint="Resets Aug 1."><span className="font-mono text-[13px] text-white/80">2.1M / 4M tokens</span></Row>
      <Row label="Payment method" hint="Charged monthly."><span className="text-[13px] text-white/80">•••• 4242 · Visa</span></Row>
    </GlowCard>
  );
}

function TeamTab() {
  const members = [
    { name: "Ory D.", email: "orydhl@gmail.com", role: "Owner", initials: "OR" },
    { name: "Maya L.", email: "maya@zova.ai", role: "Admin", initials: "ML" },
    { name: "Rachel Q.", email: "rachel@zova.ai", role: "Member", initials: "RQ" },
    { name: "Jax S.", email: "jax@zova.ai", role: "Member", initials: "JS" },
  ];
  return (
    <GlowCard className="overflow-hidden">
      <ul className="divide-y divide-white/[0.05]">
        {members.map((m) => (
          <li key={m.email} className="flex items-center gap-4 px-6 py-4">
            <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#6d28d9] text-[11px] font-semibold text-white">
              {m.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-medium text-white">{m.name}</div>
              <div className="truncate text-[12px] text-white/45">{m.email}</div>
            </div>
            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-white/60">
              {m.role}
            </span>
          </li>
        ))}
      </ul>
    </GlowCard>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<TabId>("workspace");
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <SectionHeader eyebrow="Settings" title="Workspace" description="Configure how ZOVA behaves for you and your team." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors",
                  active
                    ? "border-[rgba(167,139,250,0.28)] bg-[rgba(139,92,246,0.10)] text-white"
                    : "border-transparent text-white/50 hover:bg-white/[0.03] hover:text-white/80"
                )}
              >
                <t.icon className="size-4" />
                {t.label}
              </button>
            );
          })}
        </aside>
        <div>
          {tab === "workspace" && <WorkspaceTab />}
          {tab === "models" && <ModelsTab />}
          {tab === "billing" && <BillingTab />}
          {tab === "team" && <TeamTab />}
        </div>
      </div>
    </div>
  );
}
