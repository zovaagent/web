"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { navSections, utilityItems } from "../../data";
import { cn } from "@/lib/utils";
import { ZovaWordmark } from "@/components/landing/zova-wordmark";

type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  external?: boolean;
};

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Header */}
      <SidebarHeader className="p-3 pb-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              size="lg"
              className="h-10 px-2 gap-2 group-data-[collapsible=icon]:hidden"
              render={<a href="/dashboard" />}
            >
              <ZovaWordmark height={14} className="text-foreground shrink-0" />
            </SidebarMenuButton>
            <SidebarTrigger className="shrink-0 ml-auto" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent className="px-2 py-1 gap-0">
        {navSections.map((section) => (
          <SidebarGroup key={section.title} className="p-0 mb-2">
            <SidebarGroupLabel className="h-6 px-2 text-[10px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/50 group-data-[collapsible=icon]:hidden">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0">
                {section.items.map((item: NavItem) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={"active" in item && !!item.active}
                      tooltip={item.label}
                      className={cn(
                        "h-8 gap-2 rounded-md px-2 text-[13px] transition-colors",
                        "active" in item && item.active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-muted-foreground font-normal hover:text-foreground hover:bg-muted/40",
                      )}
                      render={<a href="#" />}
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {"external" in item && item.external && (
                        <ExternalLink className="size-3 text-muted-foreground/30 group-data-[collapsible=icon]:hidden" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator className="mx-2" />

      {/* Footer */}
      <SidebarFooter className="px-2 py-2">
        <SidebarMenu className="gap-0">
          {utilityItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                tooltip={item.label}
                className="h-8 gap-2 rounded-md px-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40"
                render={<a href="#" />}
              >
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Account"
              className="h-10 gap-2 rounded-md px-2 mt-1"
              render={<a href="#" />}
            >
              <Avatar className="size-6 shrink-0">
                <AvatarFallback className="bg-muted text-[10px] font-bold text-foreground">
                  VP
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 text-[13px] font-medium truncate group-data-[collapsible=icon]:hidden">
                Vansh Patel
              </span>
              <ChevronDown className="size-3.5 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="px-2 pt-1 group-data-[collapsible=icon]:hidden">
          <a href="#" className="text-[10px] text-muted-foreground/40 hover:text-muted-foreground transition-colors">
            ← Production dashboard
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
