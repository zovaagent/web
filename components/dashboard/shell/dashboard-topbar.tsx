"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/dashboard/ui-store";
import { useAgentsStore } from "@/stores/dashboard/agents-store";
import { NotificationsPopover } from "./notifications-popover";

const ROUTE_CRUMB: Array<[RegExp, string]> = [
  [/^\/dashboard\/agents\/[^/]+$/, "Agent Detail"],
  [/^\/dashboard\/agents$/, "My Agents"],
  [/^\/dashboard\/create$/, "Create Agent"],
  [/^\/dashboard\/marketplace$/, "Marketplace"],
  [/^\/dashboard\/activity$/, "Activity"],
  [/^\/dashboard\/knowledge$/, "Knowledge"],
  [/^\/dashboard\/settings$/, "Settings"],
  [/^\/dashboard$/, "Mission Control"],
];

function useCrumb() {
  const pathname = usePathname();
  const agents = useAgentsStore((s) => s.agents);
  return useMemo(() => {
    const match = pathname.match(/^\/dashboard\/agents\/([^/]+)$/);
    if (match) {
      const agent = agents.find((a) => a.id === match[1]);
      return { section: "My Agents", detail: agent?.name ?? "Agent" };
    }
    for (const [re, label] of ROUTE_CRUMB) {
      if (re.test(pathname)) return { section: label };
    }
    return { section: "Mission Control" };
  }, [pathname, agents]);
}

export function DashboardTopbar() {
  const setCommandOpen = useUiStore((s) => s.setCommandOpen);
  const crumb = useCrumb();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.06] bg-[#050505]/70 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="text-white/60 hover:text-white lg:hidden" />

      <div className="flex min-w-0 items-center gap-2 text-[13px]">
        <span className="text-white/40">ZOVA</span>
        <span className="text-white/20">/</span>
        <span className={cn("font-medium", crumb.detail ? "text-white/60" : "text-white")}>
          {crumb.section}
        </span>
        {crumb.detail && (
          <>
            <span className="text-white/20">/</span>
            <span className="truncate font-medium text-white">{crumb.detail}</span>
          </>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className={cn(
            "hidden h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-[13px] text-white/50",
            "transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white/80 md:flex md:min-w-[240px]"
          )}
        >
          <Search className="size-3.5" />
          <span className="flex-1 text-left">Search agents, actions…</span>
          <kbd className="ml-2 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/50">
            ⌘K
          </kbd>
        </button>

        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 hover:text-white md:hidden"
        >
          <Search className="size-4" />
        </button>

        <NotificationsPopover />

        <Avatar className="hidden size-9 rounded-lg sm:flex">
          <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#6d28d9] text-[11px] font-semibold text-white">
            OR
          </AvatarFallback>
        </Avatar>

        <Button
          render={<Link href="/dashboard/create" />}
          nativeButton={false}
          className="h-9 gap-1.5 bg-gradient-to-b from-[#8b5cf6] to-[#6d28d9] px-3.5 text-[13px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_10px_30px_-10px_rgba(139,92,246,0.65)] hover:from-[#a78bfa] hover:to-[#7c3aed]"
        >
          <Plus className="size-3.5" />
          <span className="hidden sm:inline">Create Agent</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>
    </header>
  );
}
