"use client";

import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { AmbientBackground } from "./ambient-background";
import { CommandPalette } from "./command-palette";
import { useAgentSimulator } from "@/hooks/dashboard/use-agent-simulator";
import { useRealtimeNotifications } from "@/hooks/dashboard/use-realtime-notifications";

export function DashboardShell({ children }: { children: ReactNode }) {
  useAgentSimulator();
  useRealtimeNotifications();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15.5rem",
          "--sidebar-width-icon": "3.5rem",
        } as React.CSSProperties
      }
      className="dark min-h-svh bg-background text-foreground"
    >
      <AmbientBackground />
      <DashboardSidebar />
      <SidebarInset className="bg-transparent">
        <DashboardTopbar />
        <div className="relative flex-1">{children}</div>
      </SidebarInset>
      <CommandPalette />
    </SidebarProvider>
  );
}
