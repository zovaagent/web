"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAgentsStore } from "@/stores/dashboard/agents-store";
import { StatusBadge } from "@/components/dashboard/agents/status-badge";
import { AgentAvatar } from "@/components/dashboard/common/agent-avatar";
import {
  ObjectivePanel,
  StatusPanel,
  ReasoningPanel,
  ToolsPanel,
  KnowledgePanel,
  MemoryPanel,
  ExecutionHistoryPanel,
  LogsPanel,
} from "@/components/dashboard/agents/agent-detail/panels";
import type { Agent } from "@/lib/dashboard/types";

const RAIL = [
  { id: "objective", label: "Objective" },
  { id: "status", label: "Status" },
  { id: "reasoning", label: "Reasoning" },
  { id: "tools", label: "Tools" },
  { id: "knowledge", label: "Knowledge" },
  { id: "memory", label: "Memory" },
  { id: "executions", label: "Executions" },
  { id: "logs", label: "Logs" },
];

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { fetchAgentById } = useAgentsStore();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgent = async () => {
      setLoading(true);
      const data = await fetchAgentById(id);
      setAgent(data);
      setLoading(false);
    };
    loadAgent();
  }, [id, fetchAgentById]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-white/50">Agent not found</p>
        <Link
          href="/dashboard/agents"
          className="text-sm text-purple-400 hover:text-purple-300"
        >
          Back to agents
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-6">
        <Link
          href="/dashboard/agents"
          className="inline-flex w-fit items-center gap-1.5 text-[12px] text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3.5" />
          All agents
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <AgentAvatar seed={agent.name} role={agent.role} gradient={agent.gradient} size={64} rounded="2xl" />
            <div className="space-y-1.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#a78bfa]">
                {agent.category}
              </p>
              <h1 className="text-3xl font-light tracking-tight text-white">
                {agent.name}
              </h1>
              <p className="text-[14px] text-white/55">{agent.role}</p>
            </div>
          </div>
          <StatusBadge status={agent.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[180px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-20 flex flex-col gap-1">
            {RAIL.map((r, i) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                className="group flex items-center gap-3 rounded-md px-2 py-1.5 text-[12px] text-white/45 transition-colors hover:bg-white/[0.03] hover:text-white"
              >
                <span className="font-mono text-[10px] text-white/25 group-hover:text-[#a78bfa]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {r.label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="flex flex-col gap-10 min-w-0">
          <ObjectivePanel agent={agent} />
          <StatusPanel agent={agent} />
          <ReasoningPanel agent={agent} />
          <ToolsPanel agent={agent} />
          <KnowledgePanel agent={agent} />
          <MemoryPanel agent={agent} />
          <ExecutionHistoryPanel agent={agent} />
          <LogsPanel agent={agent} />
        </div>
      </div>
    </div>
  );
}
