import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// ThemeToggle removed — template shipped with a missing dependency; unused in ZOVA.
const ThemeToggle = () => null;
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
import LogoIcon from "./logo-icons";

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r overflow-hidden">
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton size="lg" className="h-11 px-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:hidden" render={<a href="#" />}><LogoIcon className="size-8 text-primary" /><span className="text-lg font-medium">Watermelon</span></SidebarMenuButton>
            <SidebarTrigger className=" " />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-4 p-3">
        {navSections.map((section) => (
          <SidebarGroup key={section.title} className="p-0">
            <SidebarGroupLabel className="h-8 px-1 text-sm">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 ">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.label} className={cn(
                                                "h-9 gap-3 rounded-lg px-3 text-sm font-medium",
                                                item.active
                                                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-primary"
                                                  : "text-muted-foreground",
                                              )} render={<a href="#" />}><item.icon
                                                  className={cn(
                                                    "size-4",
                                                    item.active ? "text-primary" : "",
                                                  )}
                                                /><span>{item.label}</span></SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator />

      <SidebarFooter className="gap-3 px-3 pb-3">
        <SidebarMenu className="gap-1">
          {utilityItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton tooltip={item.label} className="h-9 gap-3 rounded-lg px-3 text-sm text-muted-foreground" render={<a href="#" />}><item.icon className="size-4" /><span>{item.label}</span></SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem className="flex items-center gap-0 group-data-[collapsible=icon]:p-0">
            <SidebarMenuButton tooltip="Connected account" className="h-11 gap-3 rounded-md flex items-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center" render={<a href="#" />}><Avatar className="size-6 shrink-0">
                                        <AvatarImage
                                          src={"https://assets.watermelon.sh/wm_ben.png"}
                                          className=""
                                        />

                                        <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                                          VP
                                        </AvatarFallback>
                                      </Avatar><span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-medium group-data-[collapsible=icon]:hidden">
                                        Vansh Patel
                                      </span><ChevronDown className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" /></SidebarMenuButton>
            <div className="group-data-[collapsible=icon]:hidden">
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
