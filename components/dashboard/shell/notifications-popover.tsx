"use client";

import { Bell, Check, CheckCircle2, Clock, Info, XCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUiStore, type Notification } from "@/stores/dashboard/ui-store";
import { formatRelative } from "@/lib/dashboard/format";
import { cn } from "@/lib/utils";

const KIND_ICON = {
  success: CheckCircle2,
  waiting: Clock,
  failed: XCircle,
  info: Info,
} as const;

const KIND_TONE: Record<Notification["kind"], string> = {
  success: "text-emerald-300",
  waiting: "text-amber-300",
  failed: "text-rose-300",
  info: "text-[#a78bfa]",
};

export function NotificationsPopover() {
  const notifications = useUiStore((s) => s.notifications);
  const unread = useUiStore((s) => s.notificationUnread);
  const markAllRead = useUiStore((s) => s.markAllRead);
  const markRead = useUiStore((s) => s.markRead);

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:border-white/20 hover:text-white"
      >
        <Bell className="size-4" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-1.5 w-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_1px_rgba(167,139,250,0.7)]" />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[360px] overflow-hidden border-white/[0.08] bg-[#0d0d14]/95 p-0 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(167,139,250,0.08)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-white">Notifications</span>
            {unread > 0 && (
              <span className="rounded-full border border-[rgba(167,139,250,0.3)] bg-[rgba(139,92,246,0.12)] px-1.5 py-0.5 font-mono text-[10px] text-[#c4b5fd]">
                {unread} new
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center gap-1 text-[11px] text-white/45 transition-colors hover:text-white"
          >
            <Check className="size-3" />
            Mark all read
          </button>
        </div>

        <ul className="max-h-[420px] overflow-y-auto">
          {notifications.length === 0 && (
            <li className="px-4 py-10 text-center text-[12px] text-white/40">
              You&rsquo;re all caught up.
            </li>
          )}
          {notifications.map((n) => {
            const Icon = KIND_ICON[n.kind];
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => markRead(n.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-white/[0.04] px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-white/[0.03]",
                    !n.read && "bg-[rgba(139,92,246,0.04)]"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]",
                      KIND_TONE[n.kind]
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[12.5px] font-medium text-white">
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="size-1.5 shrink-0 rounded-full bg-[#a78bfa] shadow-[0_0_6px_1px_rgba(167,139,250,0.7)]" />
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-white/55">
                      {n.message}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[10.5px] uppercase tracking-widest text-white/35">
                      <span>{n.agent}</span>
                      <span className="text-white/20">·</span>
                      <span className="font-mono normal-case tracking-normal">
                        {formatRelative(n.ts)}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-white/[0.06] px-4 py-2.5 text-center">
          <a
            href="/dashboard/activity"
            className="text-[11.5px] text-white/50 transition-colors hover:text-white"
          >
            View all activity →
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
