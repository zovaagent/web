"use client";

import { useSocket, useSocketEvent } from "@/lib/socket/client";
import { useUserStore } from "@/stores/dashboard/user-store";
import { useUiStore } from "@/stores/dashboard/ui-store";
import { useFeedStore } from "@/stores/dashboard/feed-store";
import { useAgentsStore } from "@/stores/dashboard/agents-store";
import type { ActivityEvent } from "@/lib/dashboard/types";

interface ActivityNewEvent {
  agentId: string;
  kind: string;
  message: string;
  timestamp: number;
}

interface AgentUpdateEvent {
  agentId: string;
  status: string;
  progress?: number;
  currentTask?: string;
  reasoning?: string;
  timestamp: number;
}

const ACTIVITY_KIND_TO_NOTIFICATION_KIND: Record<
  string,
  "success" | "waiting" | "failed" | "info"
> = {
  completed: "success",
  failed: "failed",
  waiting: "waiting",
  started: "info",
  reasoning: "info",
  tool: "info",
};

function getAgentName(agentId: string): string {
  const agent = useAgentsStore.getState().getById(agentId);
  return agent?.name ?? "Agent";
}

export function useRealtimeNotifications() {
  const userId = useUserStore((s) => s.user?.id);
  const { emitAgentStatus, emitAgentLog, emitActivity } = useSocket(userId);

  useSocketEvent<ActivityNewEvent>("activity:new", (data) => {
    const notifKind = ACTIVITY_KIND_TO_NOTIFICATION_KIND[data.kind] ?? "info";

    useUiStore.getState().addNotification({
      agent: getAgentName(data.agentId),
      title: data.kind.charAt(0).toUpperCase() + data.kind.slice(1),
      message: data.message,
      kind: notifKind,
    });

    const event: ActivityEvent = {
      id: `evt-${data.timestamp}-${data.agentId}`,
      ts: data.timestamp,
      agentId: data.agentId,
      agentName: getAgentName(data.agentId),
      kind: data.kind as ActivityEvent["kind"],
      message: data.message,
    };
    useFeedStore.getState().push(event);
  });

  useSocketEvent<AgentUpdateEvent>("agent:update", (data) => {
    useAgentsStore.getState().updateAgent(data.agentId, {
      status: data.status as "idle" | "running" | "waiting" | "failed" | "completed",
      progress: data.progress,
      currentTask: data.currentTask,
    });
  });

  return { emitAgentStatus, emitAgentLog, emitActivity };
}
