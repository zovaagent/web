"use client";

import { create } from "zustand";

export type Notification = {
  id: string;
  agent: string;
  title: string;
  message: string;
  ts: number;
  kind: "success" | "waiting" | "failed" | "info";
  read: boolean;
};

const now = Date.now();

const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    agent: "SDR Sourcer",
    title: "12 new prospects",
    message: "Matched your ICP for fintech seed-stage in APAC.",
    ts: now - 1000 * 60 * 4,
    kind: "success",
    read: false,
  },
  {
    id: "n2",
    agent: "Ops Watcher",
    title: "Waiting on your approval",
    message: "Draft launch checklist ready for sign-off.",
    ts: now - 1000 * 60 * 22,
    kind: "waiting",
    read: false,
  },
  {
    id: "n3",
    agent: "Research Analyst",
    title: "Weekly synthesis published",
    message: "Q3 competitive brief · 6 sources, 2 net-new insights.",
    ts: now - 1000 * 60 * 90,
    kind: "info",
    read: false,
  },
  {
    id: "n4",
    agent: "SEO Writer",
    title: "Tool call failed",
    message: "Retried 2× — search provider timeout. Auto-resumed.",
    ts: now - 1000 * 60 * 60 * 5,
    kind: "failed",
    read: true,
  },
];

type UiState = {
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  notifications: Notification[];
  notificationUnread: number;
  markAllRead: () => void;
  markRead: (id?: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  commandOpen: false,
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
  notifications: SEED_NOTIFICATIONS,
  notificationUnread: SEED_NOTIFICATIONS.filter((n) => !n.read).length,
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      notificationUnread: 0,
    })),
  markRead: (id) =>
    set((s) => {
      const notifications = s.notifications.map((n) =>
        id ? (n.id === id ? { ...n, read: true } : n) : { ...n, read: true }
      );
      return {
        notifications,
        notificationUnread: notifications.filter((n) => !n.read).length,
      };
    }),
}));
