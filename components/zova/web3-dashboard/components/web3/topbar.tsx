import { Bell, ChevronDown, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardTopbar() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-border px-1 mb-6">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <SidebarTrigger className="lg:hidden shrink-0" />
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search"
            className="h-9 rounded-lg bg-muted border-transparent pl-9 text-sm w-full placeholder:text-muted-foreground/50"
            placeholder="Search avatars, agents, embeds..."
          />
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <Button variant="ghost" size="sm" className="h-9 gap-2 text-sm text-muted-foreground hover:text-foreground">
          <Badge className="size-5 rounded-full bg-violet-500 p-0 text-white text-[10px] font-bold">S</Badge>
          Solana
          <ChevronDown className="size-3.5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
          <Bell className="size-4" />
        </Button>
        <Button size="sm" className="h-9 gap-2 bg-primary px-4 text-primary-foreground text-sm">
          <Plus className="size-4" />
          New Agent
        </Button>
      </div>
    </header>
  );
}
