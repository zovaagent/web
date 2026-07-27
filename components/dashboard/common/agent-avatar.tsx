"use client";

import { useMemo, useState } from "react";
import { createAvatar } from "@dicebear/core";
import * as avataaars from "@dicebear/avataaars";
import { defaultLook, lookToOptions, type AvatarLook } from "@/lib/dashboard/avatar";
import { localPortraitPath, pollinationsUrl } from "@/lib/dashboard/agent-portrait";
import { cn } from "@/lib/utils";

type AgentAvatarProps = {
  seed: string;
  /** @deprecated Ignored — avatars render without a background. Kept for existing call sites. */
  gradient?: [string, string];
  /** Optional explicit look. When omitted, a deterministic look is derived from `seed`. */
  look?: AvatarLook;
  /** When truthy, renders the AI-generated cyberpunk portrait for this agent. */
  role?: string;
  /** Explicit image override — wins over `role`-derived portrait. */
  imageUrl?: string;
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
  role,
  imageUrl,
  size = 40,
  className,
  rounded = "xl",
}: AgentAvatarProps) {
  const [phase, setPhase] = useState<"online" | "local" | "dicebear">("online");

  const onlineSrc = useMemo(() => {
    if (imageUrl) return imageUrl;
    if (role) return pollinationsUrl(seed, role);
    return "";
  }, [seed, role, imageUrl]);

  const localSrc = useMemo(() => {
    if (role) return localPortraitPath(seed);
    return "";
  }, [seed, role]);

  const dicebearSrc = useMemo(() => {
    const resolved = look ?? defaultLook(seed);
    const avatar = createAvatar(avataaars, {
      seed,
      size: 96,
      randomizeIds: true,
      ...lookToOptions(resolved),
    });
    return avatar.toDataUri();
  }, [seed, look]);

  const usePortrait = Boolean(imageUrl || role);
  const src =
    !usePortrait || phase === "dicebear"
      ? dicebearSrc
      : phase === "local"
        ? localSrc
        : onlineSrc;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
        ROUND[rounded],
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        draggable={false}
        loading="eager"
        decoding="async"
        onError={() => {
          if (phase === "online" && usePortrait) setPhase("local");
          else if (phase === "local") setPhase("dicebear");
        }}
        className={cn(
          "h-full w-full select-none",
          usePortrait && phase !== "dicebear" ? "object-cover" : "object-contain"
        )}
      />
    </span>
  );
}
