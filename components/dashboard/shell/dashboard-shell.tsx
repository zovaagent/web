"use client";

import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { AmbientBackground } from "./ambient-background";
import { CommandPalette } from "./command-palette";
import { useAgentSimulator } from "@/hooks/dashboard/use-agent-simulator";

export function DashboardShell({ children }: { children: ReactNode }) {
  useAgentSimulator();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15.5rem",
          "--sidebar-width-icon": "3.5rem",
        } as React.CSSProperties
      }
      className="dark min-h-svh bg-[#050505] text-white"
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
