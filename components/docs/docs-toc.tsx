"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface DocsTocProps {
  items: TocItem[];
}

export function DocsToc({ items }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-60px 0% -60% 0%", threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="flex flex-col gap-1">
      <p className="text-white/25 text-[10px] tracking-[0.15em] uppercase font-semibold mb-3 px-1">
        On This Page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "text-xs leading-5 transition-colors px-1 py-0.5 rounded",
            item.level === 2 ? "pl-1" : "pl-4",
            activeId === item.id
              ? "text-purple-400"
              : "text-white/35 hover:text-white/70"
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}

export function StaticDocsToc({ items }: DocsTocProps) {
  return (
    <nav className="flex flex-col gap-1">
      <p className="text-white/25 text-[10px] tracking-[0.15em] uppercase font-semibold mb-3 px-1">
        On This Page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "text-xs leading-5 transition-colors hover:text-white/70 text-white/35 px-1 py-0.5",
            item.level === 2 ? "pl-1" : "pl-4"
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
