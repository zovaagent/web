import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PanelCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  action,
  className,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between px-4 h-12 border-b border-border shrink-0", className)}>
      <span className="text-sm font-semibold">{title}</span>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
