"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
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
    <Sidebar className="border-r border-white/6 bg-[#060610]">
      <SidebarHeader className="p-4 border-b border-white/6">
        <Link href="/docs" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <BookOpen className="h-3.5 w-3.5 text-purple-400" />
          </div>
          <span className="text-white/80 text-sm font-medium">Documentation</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
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
