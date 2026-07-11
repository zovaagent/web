"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const beams = [
    { x1: "50%", y1: "0", x2: "100%", y2: "100%", opacity: 0.15 },
    { x1: "45%", y1: "0", x2: "95%", y2: "100%", opacity: 0.08 },
    { x1: "55%", y1: "0", x2: "105%", y2: "100%", opacity: 0.08 },
    { x1: "40%", y1: "0", x2: "90%", y2: "100%", opacity: 0.05 },
    { x1: "60%", y1: "0", x2: "110%", y2: "100%", opacity: 0.05 },
    { x1: "35%", y1: "0", x2: "85%", y2: "100%", opacity: 0.03 },
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="rg-hero" cx="65%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="40%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#rg-hero)" />
        {beams.map((beam, i) => (
          <line
            key={i}
            x1={beam.x1}
            y1={beam.y1}
            x2={beam.x2}
            y2={beam.y2}
            stroke={i % 2 === 0 ? "url(#beam-grad)" : "url(#beam-grad2)"}
            strokeWidth="0.5"
            opacity={beam.opacity}
          />
        ))}
        {/* Bottom glow */}
        <ellipse cx="65%" cy="110%" rx="40%" ry="30%" fill="#8b5cf6" fillOpacity="0.06" />
      </svg>
    </div>
  );
}
