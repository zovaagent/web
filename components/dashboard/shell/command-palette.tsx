"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Activity,
  BookOpen,
  Bot,
  LayoutDashboard,
  Settings,
  Sparkles,
  Store,
} from "lucide-react";
import { useUiStore } from "@/stores/dashboard/ui-store";
import { useAgentsStore } from "@/stores/dashboard/agents-store";

const ROUTES = [
  { label: "Mission Control", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Agents", href: "/dashboard/agents", icon: Bot },
  { label: "Create Agent", href: "/dashboard/create", icon: Sparkles },
  { label: "Marketplace", href: "/dashboard/marketplace", icon: Store },
  { label: "Activity", href: "/dashboard/activity", icon: Activity },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function CommandPalette() {
  const router = useRouter();
  const open = useUiStore((s) => s.commandOpen);
  const setOpen = useUiStore((s) => s.setCommandOpen);
  const toggle = useUiStore((s) => s.toggleCommand);
  const agents = useAgentsStore((s) => s.agents);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command Palette"
      description="Jump anywhere in ZOVA"
    >
      <CommandInput placeholder="Search agents, pages, actions…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {ROUTES.map((r) => (
            <CommandItem
              key={r.href}
              value={`nav ${r.label}`}
              onSelect={() => go(r.href)}
            >
              <r.icon className="size-4 text-white/60" />
              <span>{r.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Agents">
          {agents.map((a) => (
            <CommandItem
              key={a.id}
              value={`agent ${a.name} ${a.role}`}
              onSelect={() => go(`/dashboard/agents/${a.id}`)}
            >
              <span
                className="flex size-6 items-center justify-center rounded-md text-[10px] font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${a.gradient[0]}, ${a.gradient[1]})`,
                }}
              >
                {a.name.slice(0, 1)}
              </span>
              <div className="flex flex-col">
                <span className="text-[13px]">{a.name}</span>
                <span className="text-[11px] text-white/45">{a.role}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
