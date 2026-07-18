import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/landing/section-label";

interface SectionHeaderProps {
  number: string;
  label:  string;
  title:  ReactNode;
  subtitle?: ReactNode;
  dark?:  boolean;
  className?: string;
}

export function SectionHeader({ number, label, title, subtitle, dark, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-16 flex flex-col gap-4", className)}>
      <SectionLabel number={number} label={label} dark={dark} />
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight leading-tight max-w-xl lg:text-4xl",
          dark ? "text-white" : "text-zinc-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-sm leading-relaxed max-w-md",
            dark ? "text-white/40" : "text-zinc-500",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
