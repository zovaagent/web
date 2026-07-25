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

const MAX_NOTIFICATIONS = 50;

type UiState = {
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  notifications: Notification[];
  notificationUnread: number;
  addNotification: (n: Omit<Notification, "id" | "ts" | "read">) => void;
  markAllRead: () => void;
  markRead: (id?: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  commandOpen: false,
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
  notifications: [],
  notificationUnread: 0,
  addNotification: (n) =>
    set((s) => {
      const notification: Notification = {
        ...n,
        id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        ts: Date.now(),
        read: false,
      };
      const notifications = [notification, ...s.notifications].slice(0, MAX_NOTIFICATIONS);
      return {
        notifications,
        notificationUnread: notifications.filter((x) => !x.read).length,
      };
    }),
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
