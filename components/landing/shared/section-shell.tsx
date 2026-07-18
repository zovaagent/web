import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "darker" | "light" | "muted";

const toneBg: Record<Tone, string> = {
  dark:   "bg-[#07070f]",
  darker: "bg-[#05050a]",
  light:  "bg-white",
  muted:  "bg-zinc-50",
};

const toneBorder: Record<Tone, string> = {
  dark:   "border-white/[0.06]",
  darker: "border-white/[0.06]",
  light:  "border-zinc-100",
  muted:  "border-zinc-100",
};

interface SectionShellProps {
  id?:       string;
  tone?:     Tone;
  divider?:  "top" | "none";
  children:  ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  tone = "dark",
  divider = "top",
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-28 relative",
        toneBg[tone],
        divider === "top" && `border-t ${toneBorder[tone]}`,
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-6 relative">{children}</div>
    </section>
  );
}
