"use client";

import { Bell, Check, CheckCircle2, ChevronRight, Clock, Info, XCircle } from "lucide-react";
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
  info: "text-primary",
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
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-accent/30 text-muted-foreground transition-colors hover:border-border/60 hover:text-foreground"
      >
        <Bell className="size-4" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_1px_rgba(167,139,250,0.7)]" />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[360px] overflow-hidden border-border bg-popover/95 p-0 text-foreground shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(167,139,250,0.08)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-foreground">Notifications</span>
            {unread > 0 && (
              <span className="rounded-full border border-primary/30 bg-primary/12 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                {unread} new
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <Check className="size-3" />
            Mark all read
          </button>
        </div>

        <ul className="max-h-[420px] overflow-y-auto">
          {notifications.length === 0 && (
            <li className="px-4 py-10 text-center text-[12px] text-muted-foreground">
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
                    "flex w-full items-start gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-accent/30",
                    !n.read && "bg-primary/4"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-accent/30",
                      KIND_TONE[n.kind]
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[12.5px] font-medium text-foreground">
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_6px_1px_rgba(167,139,250,0.7)]" />
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                      {n.message}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[10.5px] uppercase tracking-widest text-muted-foreground/60">
                      <span>{n.agent}</span>
                      <span className="text-foreground/20">·</span>
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

        <div className="border-t border-border px-4 py-2.5 text-center">
          <a
            href="/dashboard/activity"
            className="text-[11.5px] text-muted-foreground transition-colors hover:text-foreground"
          >
            View all activity <ChevronRight className="ml-0.5 inline size-3" />
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
