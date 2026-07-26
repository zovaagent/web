"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  Sparkles,
  Store,
  Activity,
  BookOpen,
  Settings,
  ChevronsUpDown,
  LogOut,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ZovaLogo } from "@/components/landing/zova-logo";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/dashboard/user-store";
import { signOut } from "@/lib/auth-client";

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
        <SidebarGroupLabel className="h-7 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-sidebar-foreground/35">
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
                      ? "bg-sidebar-accent text-sidebar-foreground shadow-[inset_0_0_0_1px_rgba(167,139,250,0.25)]"
                      : "text-sidebar-foreground/55 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 transition-colors",
                      active ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover/nav:text-sidebar-foreground/80"
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

function UserInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl"
    >
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/dashboard" />}
                    className="h-11 gap-3 rounded-xl px-2 hover:bg-sidebar-accent/50"
            >
              <ZovaMark />
              <span className="flex flex-col overflow-hidden text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium tracking-tight text-sidebar-foreground">ZOVA</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/40">
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

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    tooltip="Account"
              className="h-11 gap-3 rounded-xl px-2 hover:bg-sidebar-accent/50"
                  />
                }
              >
                <Avatar className="size-8 shrink-0 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#6d28d9] text-[11px] font-semibold text-sidebar-primary-foreground">
                    {user ? UserInitials(user.name) : "..."}
                  </AvatarFallback>
                </Avatar>
                <span className="flex min-w-0 flex-col text-left leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate text-[13px] font-medium text-sidebar-foreground">
                    {user?.name || "Loading..."}
                  </span>
                  <span className="truncate text-[11px] text-sidebar-foreground/40">
                    {user?.email || ""}
                  </span>
                </span>
                <ChevronsUpDown className="ml-auto size-3.5 text-sidebar-foreground/40 group-data-[collapsible=icon]:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" className="w-[--anchor-width]">
                <DropdownMenuItem onClick={async () => {
  await signOut();
  router.push("/auth/login");
}}>
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
