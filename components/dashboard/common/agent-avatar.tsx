"use client";

import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import * as avataaars from "@dicebear/avataaars";
import { defaultLook, lookToOptions, type AvatarLook } from "@/lib/dashboard/avatar";
import { cn } from "@/lib/utils";

type AgentAvatarProps = {
  seed: string;
  /** @deprecated Ignored — avatars render without a background. Kept for existing call sites. */
  gradient?: [string, string];
  /** Optional explicit look. When omitted, a deterministic look is derived from `seed`. */
  look?: AvatarLook;
  size?: number;
  className?: string;
  rounded?: "md" | "lg" | "xl" | "2xl" | "full";
};

const ROUND: Record<NonNullable<AgentAvatarProps["rounded"]>, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export function AgentAvatar({
  seed,
  look,
  size = 40,
  className,
  rounded = "xl",
}: AgentAvatarProps) {
  const svgDataUri = useMemo(() => {
    const resolved = look ?? defaultLook(seed);
    const avatar = createAvatar(avataaars, {
      seed,
      size: 96,
      randomizeIds: true,
      ...lookToOptions(resolved),
    });
    return avatar.toDataUri();
  }, [seed, look]);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        ROUND[rounded],
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={svgDataUri}
        alt=""
        draggable={false}
        className="h-full w-full select-none object-contain"
      />
    </span>
  );
}
