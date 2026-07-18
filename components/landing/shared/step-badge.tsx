import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { IconTile } from "./icon-tile";

interface StepBadgeProps {
  number:  string;
  label:   string;
  Icon?:   ComponentType<SVGProps<SVGSVGElement>>;
  dark?:   boolean;
  className?: string;
}

export function StepBadge({ number, label, Icon, dark = true, className }: StepBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {Icon && <IconTile Icon={Icon} size="md" />}
      <span
        className={cn(
          "text-[10px] font-semibold tracking-[0.22em] uppercase font-mono",
          dark ? "text-white/25" : "text-zinc-300",
        )}
      >
        {number}
      </span>
      <span className="text-[10px] font-semibold tracking-[0.16em] text-[#a78bfa] uppercase">
        {label}
      </span>
    </div>
  );
}
