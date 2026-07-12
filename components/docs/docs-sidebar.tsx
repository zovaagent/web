"use client";
import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const docNavigation = [
  {
    group: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Why ZOVA Exists", href: "/docs/why-zova" },
      { title: "Platform Overview", href: "/docs/platform-overview" },
    ],
  },
  {
    group: "Architecture",
    items: [
      { title: "Core Architecture", href: "/docs/core-architecture" },
      { title: "Intelligence Pipeline", href: "/docs/intelligence-pipeline" },
      { title: "Context Processing Engine", href: "/docs/context-engine" },
    ],
  },
  {
    group: "Core Components",
    collapsible: true,
    items: [
      { title: "Wallet Intelligence", href: "/docs/wallet-intelligence" },
      { title: "Token Intelligence", href: "/docs/token-intelligence" },
      { title: "Contract Intelligence", href: "/docs/contract-intelligence" },
      { title: "Risk Signals", href: "/docs/risk-signals" },
    ],
  },
  {
    group: "Developer Platform",
    items: [
      { title: "Developer Overview", href: "/docs/developer-platform" },
      { title: "Dashboard", href: "/docs/dashboard" },
      { title: "API Philosophy", href: "/docs/api-philosophy" },
      { title: "Design Principles", href: "/docs/design-principles" },
    ],
  },
  {
    group: "Future Platform",
    collapsible: true,
    items: [
      { title: "Future Platform", href: "/docs/future-platform" },
      { title: "Documentation Roadmap", href: "/docs/documentation-roadmap" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-r border-white/6 bg-[#060610]"
      style={
        {
          "--sidebar": "#060610",
          "--sidebar-foreground": "rgba(255,255,255,0.75)",
          "--sidebar-accent": "rgba(255,255,255,0.05)",
          "--sidebar-accent-foreground": "#ffffff",
          "--sidebar-border": "rgba(255,255,255,0.06)",
          "--sidebar-ring": "rgba(168,139,250,0.5)",
        } as React.CSSProperties
      }
    >
      <SidebarContent className="px-2 pt-16 pb-4">
        {docNavigation.map((section) =>
          section.collapsible ? (
            <CollapsibleSection
              key={section.group}
              section={section}
              pathname={pathname}
            />
          ) : (
            <SidebarGroup key={section.group}>
              <SidebarGroupLabel className="text-white/25 text-[10px] tracking-[0.15em] uppercase px-2 mb-1">
                {section.group}
              </SidebarGroupLabel>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={pathname === item.href}
                      className={cn(
                        "text-white/50 hover:text-white hover:bg-white/5 rounded-lg text-sm",
                        pathname === item.href &&
                          "text-purple-300 bg-purple-500/10 hover:text-purple-200 hover:bg-purple-500/15"
                      )}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )
        )}
      </SidebarContent>
    </Sidebar>
  );
}

function CollapsibleSection({
  section,
  pathname,
}: {
  section: (typeof docNavigation)[number];
  pathname: string;
}) {
  const isActive = section.items.some((item) => pathname === item.href);
  const [open, setOpen] = useState(isActive);

  return (
    <SidebarGroup>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 group">
          <span className="text-white/25 text-[10px] tracking-[0.15em] uppercase">
            {section.group}
          </span>
          <ChevronRight
            className={cn(
              "h-3 w-3 text-white/20 transition-transform",
              open && "rotate-90"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="mt-1">
            {section.items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  isActive={pathname === item.href}
                  className={cn(
                    "text-white/50 hover:text-white hover:bg-white/5 rounded-lg text-sm pl-4",
                    pathname === item.href &&
                      "text-purple-300 bg-purple-500/10 hover:text-purple-200 hover:bg-purple-500/15"
                  )}
                >
                  {item.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}
