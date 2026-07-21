"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { AgentAvatar } from "@/components/dashboard/common/agent-avatar";
import {
  ACCESSORIES,
  CLOTHES_COLORS,
  CLOTHING,
  EYEBROWS,
  EYES,
  FACIAL_HAIR,
  HAIR_COLORS,
  MOUTHS,
  SKIN_COLORS,
  TOPS,
  defaultLook,
  randomLook,
  type AvatarLook,
} from "@/lib/dashboard/avatar";
import { cn } from "@/lib/utils";

type Props = {
  seed: string;
  gradient?: [string, string];
  value?: AvatarLook;
  onChange?: (look: AvatarLook) => void;
};

// One editable dimension of the avatar.
type Field<K extends keyof AvatarLook> = {
  key: K;
  label: string;
  kind: "cycle" | "swatch";
  options: readonly AvatarLook[K][];
  swatches?: readonly string[]; // for swatch pickers, hex without '#'
};

const FIELDS: readonly Field<keyof AvatarLook>[] = [
  { key: "top", label: "Hair", kind: "cycle", options: TOPS },
  { key: "hairColor", label: "Hair color", kind: "swatch", options: HAIR_COLORS, swatches: HAIR_COLORS },
  { key: "skinColor", label: "Skin", kind: "swatch", options: SKIN_COLORS, swatches: SKIN_COLORS },
  { key: "eyes", label: "Eyes", kind: "cycle", options: EYES },
  { key: "eyebrows", label: "Brows", kind: "cycle", options: EYEBROWS },
  { key: "mouth", label: "Mouth", kind: "cycle", options: MOUTHS },
  { key: "accessories", label: "Glasses", kind: "cycle", options: ACCESSORIES },
  { key: "facialHair", label: "Facial hair", kind: "cycle", options: FACIAL_HAIR },
  { key: "clothing", label: "Outfit", kind: "cycle", options: CLOTHING },
  { key: "clothesColor", label: "Outfit color", kind: "swatch", options: CLOTHES_COLORS, swatches: CLOTHES_COLORS },
];

function nextIn<T>(arr: readonly T[], current: T, dir: 1 | -1): T {
  const i = arr.indexOf(current);
  const n = arr.length;
  return arr[((i === -1 ? 0 : i) + dir + n) % n];
}

export function AvatarCustomizer({ seed, gradient, value, onChange }: Props) {
  const [internal, setInternal] = useState<AvatarLook>(() => value ?? defaultLook(seed));
  const look = value ?? internal;

  const update = (next: AvatarLook) => {
    if (!value) setInternal(next);
    onChange?.(next);
  };

  const cycle = <K extends keyof AvatarLook>(key: K, dir: 1 | -1) => {
    const field = FIELDS.find((f) => f.key === key)!;
    update({ ...look, [key]: nextIn(field.options, look[key], dir) as AvatarLook[K] });
  };

  const setValue = <K extends keyof AvatarLook>(key: K, v: AvatarLook[K]) => {
    update({ ...look, [key]: v });
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-2 rounded-3xl bg-[radial-gradient(closest-side,rgba(139,92,246,0.35),transparent)] blur-xl" />
          <AgentAvatar
            seed={seed}
            gradient={gradient}
            look={look}
            size={200}
            rounded="2xl"
            className="relative"
          />
        </div>
        <button
          type="button"
          onClick={() => update(randomLook())}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-white/70 transition-colors hover:border-[rgba(167,139,250,0.35)] hover:text-white"
        >
          <Shuffle className="size-3.5" />
          Randomize
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {FIELDS.map((f) => (
          <div
            key={String(f.key)}
            className="flex items-center justify-between gap-3 border-b border-white/[0.04] py-2 last:border-b-0"
          >
            <span className="w-24 shrink-0 text-[11.5px] uppercase tracking-widest text-white/40">
              {f.label}
            </span>
            {f.kind === "cycle" ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => cycle(f.key, -1)}
                  className="flex size-7 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-white/60 transition-colors hover:border-white/20 hover:text-white"
                >
                  <ChevronLeft className="size-3.5" />
                </button>
                <span className="min-w-[110px] text-center font-mono text-[11.5px] text-white/70">
                  {String(look[f.key] ?? "none")}
                </span>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => cycle(f.key, 1)}
                  className="flex size-7 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-white/60 transition-colors hover:border-white/20 hover:text-white"
                >
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-end gap-1.5">
                {f.swatches!.map((hex) => {
                  const active = look[f.key] === hex;
                  return (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setValue(f.key, hex as AvatarLook[typeof f.key])}
                      aria-label={`#${hex}`}
                      className={cn(
                        "size-5 rounded-full border transition-transform hover:scale-110",
                        active
                          ? "border-white shadow-[0_0_0_2px_rgba(167,139,250,0.55)]"
                          : "border-white/10"
                      )}
                      style={{ backgroundColor: `#${hex}` }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
