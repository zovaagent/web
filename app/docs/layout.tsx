import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ZovaLogo } from "@/components/landing/zova-logo";
import { ZovaWordmark } from "@/components/landing/zova-wordmark";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05050a]">
      {/* Docs top bar */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-white/6 bg-[#05050a] flex items-center">
        <div className="flex items-center gap-4 px-4 w-full max-w-none">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <ZovaLogo size={24} idPrefix="docs-header" />
            <ZovaWordmark height={16} className="text-white" />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-white/50 text-sm">Documentation</span>
          <div className="flex-1" />
          <div className="hidden sm:flex items-center gap-2">
            <kbd className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
              <span>⌘</span><span>K</span>
            </kbd>
            <span className="text-white/20 text-xs">Search docs</span>
          </div>
        </div>
      </header>

      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen pt-14">
          <DocsSidebar />
          <SidebarInset className="flex-1 bg-[#05050a]">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
