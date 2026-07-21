"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  Sparkles,
  Store,
  Activity,
  BookOpen,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ZovaLogo } from "@/components/landing/zova-logo";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  matcher?: (path: string) => boolean;
};

const NAV_PRIMARY: NavItem[] = [
  { label: "Mission Control", href: "/dashboard", icon: LayoutDashboard, matcher: (p) => p === "/dashboard" },
  { label: "My Agents", href: "/dashboard/agents", icon: Bot, matcher: (p) => p.startsWith("/dashboard/agents") },
  { label: "Create Agent", href: "/dashboard/create", icon: Sparkles, matcher: (p) => p.startsWith("/dashboard/create") },
];

const NAV_SECONDARY: NavItem[] = [
  { label: "Marketplace", href: "/dashboard/marketplace", icon: Store, matcher: (p) => p.startsWith("/dashboard/marketplace") },
  { label: "Activity", href: "/dashboard/activity", icon: Activity, matcher: (p) => p.startsWith("/dashboard/activity") },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen, matcher: (p) => p.startsWith("/dashboard/knowledge") },
];

const NAV_UTILITY: NavItem[] = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings, matcher: (p) => p.startsWith("/dashboard/settings") },
];

function ZovaMark() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center rounded-lg">
      <ZovaLogo variant="dark" size={28} />
    </span>
  );
}

function NavGroup({ label, items, pathname }: { label?: string; items: NavItem[]; pathname: string }) {
  return (
    <SidebarGroup className="p-0">
      {label && (
        <SidebarGroupLabel className="h-7 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {items.map((item) => {
            const active = item.matcher ? item.matcher(pathname) : pathname === item.href;
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  tooltip={item.label}
                  isActive={active}
                  render={<Link href={item.href} />}
                  className={cn(
                    "group/nav h-9 gap-3 rounded-lg px-2.5 text-[13px] font-medium transition-all",
                    active
                      ? "bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_rgba(167,139,250,0.25)]"
                      : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 transition-colors",
                      active ? "text-[#a78bfa]" : "text-white/50 group-hover/nav:text-white/80"
                    )}
                  />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/[0.06] bg-[#07070c]/80 backdrop-blur-xl"
    >
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/dashboard" />}
              className="h-11 gap-3 rounded-xl px-2 hover:bg-white/[0.04]"
            >
              <ZovaMark />
              <span className="flex flex-col overflow-hidden text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium tracking-tight text-white">ZOVA</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Mission Control
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-5 p-3">
        <NavGroup items={NAV_PRIMARY} pathname={pathname} />
        <NavGroup label="Workspace" items={NAV_SECONDARY} pathname={pathname} />
        <NavGroup label="Account" items={NAV_UTILITY} pathname={pathname} />
      </SidebarContent>

      <SidebarFooter className="border-t border-white/[0.05] p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Account"
              className="h-11 gap-3 rounded-xl px-2 hover:bg-white/[0.04]"
            >
              <Avatar className="size-8 shrink-0 rounded-lg">
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#6d28d9] text-[11px] font-semibold text-white">
                  OR
                </AvatarFallback>
              </Avatar>
              <span className="flex min-w-0 flex-col text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-[13px] font-medium text-white">Ory D.</span>
                <span className="truncate text-[11px] text-white/40">Owner · Workspace</span>
              </span>
              <ChevronsUpDown className="ml-auto size-3.5 text-white/40 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
