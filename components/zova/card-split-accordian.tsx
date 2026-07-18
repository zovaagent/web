"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { PanelCard, PanelHeader } from "./web3-dashboard/components/ui/panel";
import { cn } from "@/lib/utils";

export interface AccordianItem {
  title: string;
  value?: string;
  badge?: string;
  content: React.ReactNode;
}

interface CardSplitAccordianProps {
  title: string;
  action?: React.ReactNode;
  items: AccordianItem[];
  className?: string;
  defaultOpen?: string;
}

export function CardSplitAccordian({
  title,
  action,
  items,
  className,
  defaultOpen,
}: CardSplitAccordianProps) {
  const [open, setOpen] = React.useState<string | null>(
    defaultOpen ?? items[0]?.title ?? null,
  );

  return (
    <PanelCard className={className}>
      <PanelHeader title={title} action={action} />
      <div>
        {items.map((item) => {
          const isOpen = open === item.title;
          return (
            <div key={item.title} className="border-b border-border/50 last:border-0">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
                onClick={() => setOpen(isOpen ? null : item.title)}
              >
                <span className="flex-1 text-sm font-medium">{item.title}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md border border-border bg-muted font-medium text-muted-foreground">
                    {item.badge}
                  </span>
                )}
                {item.value && (
                  <span className="text-sm font-semibold tabular-nums">{item.value}</span>
                )}
                <ChevronDown
                  className={cn(
                    "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground border-t border-border/30 bg-muted/20">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PanelCard>
  );
}
