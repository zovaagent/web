import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/shell/dashboard-shell";

export const metadata: Metadata = {
  title: "ZOVA · Mission Control",
  description: "Your autonomous agents, running normally.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
