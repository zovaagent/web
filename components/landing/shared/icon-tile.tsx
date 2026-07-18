import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { box: string; icon: string }> = {
  sm: { box: "size-6",  icon: "h-3 w-3"     },
  md: { box: "size-7",  icon: "h-3.5 w-3.5" },
  lg: { box: "size-10", icon: "h-4.5 w-4.5" },
};

interface IconTileProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: Size;
  className?: string;
}

export function IconTile({ Icon, size = "md", className }: IconTileProps) {
  const s = sizes[size];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border border-white/10 bg-[#6d4dff]/10",
        s.box,
        className,
      )}
    >
      <Icon className={cn("text-[#a78bfa]", s.icon)} />
    </span>
  );
}
