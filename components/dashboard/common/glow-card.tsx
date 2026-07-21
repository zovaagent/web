import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlowCard({
  className,
  interactive,
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      {...props}
      className={cn(
        "relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm",
        "transition-all duration-300",
        interactive &&
          "hover:border-[rgba(139,92,246,0.35)] hover:bg-white/[0.03] hover:shadow-[0_0_0_1px_rgba(139,92,246,0.25),0_20px_60px_-30px_rgba(139,92,246,0.55)]",
        className
      )}
    />
  );
}
