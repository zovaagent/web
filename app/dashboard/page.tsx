import { AssetTableCard }  from "@/components/zova/web3-dashboard/components/web3/asset-table-card";
import { borrowedAssets, netWorthAssets } from "@/components/zova/web3-dashboard/data";
import { DashboardTopbar }  from "@/components/zova/web3-dashboard/components/web3/topbar";
import { MarketsPanel }     from "@/components/zova/web3-dashboard/components/web3/markets-panel";
import { PortfolioPanel }   from "@/components/zova/web3-dashboard/components/web3/portfolio-panel";
import { StatGrid }         from "@/components/zova/web3-dashboard/components/web3/stat-card";
import { CardSplitAccordian } from "@/components/zova/card-split-accordian";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const agentItems = [
  {
    title: "3D Fox Agent",
    value: "24,510 embeds",
    badge: "Live",
    content: (
      <div className="space-y-2 pt-1">
        <p>Low-poly fox avatar embedded across 1,200 sites. Processes 4,802 API calls/day. Custom voice: Lyra (en-US).</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs text-foreground font-medium">x402 enabled</span>
          <span className="text-xs">·</span>
          <span className="text-xs">$0.002 per chat</span>
          <span className="text-xs">·</span>
          <span className="text-xs">avg 1.4s response</span>
        </div>
      </div>
    ),
  },
  {
    title: "Corporate Alex",
    value: "12,100 embeds",
    badge: "Live",
    content: (
      <div className="space-y-2 pt-1">
        <p>Human-style business avatar. Handles customer support and product demos. Deployed on e-commerce and SaaS sites.</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs text-foreground font-medium">x402 enabled</span>
          <span className="text-xs">·</span>
          <span className="text-xs">$0.003 per chat</span>
          <span className="text-xs">·</span>
          <span className="text-xs">avg 1.8s response</span>
        </div>
      </div>
    ),
  },
  {
    title: "Dragon (Fantasy Pack)",
    value: "8,400 embeds",
    badge: "Beta",
    content: (
      <div className="space-y-2 pt-1">
        <p>High-detail dragon avatar from the Fantasy Forge pack. Popular in gaming portals and metaverse landing pages.</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs text-foreground font-medium">x402 disabled</span>
          <span className="text-xs">·</span>
          <span className="text-xs">free tier</span>
          <span className="text-xs">·</span>
          <span className="text-xs">avg 2.1s response</span>
        </div>
      </div>
    ),
  },
];

const forgeItems = [
  {
    title: "Ceramic Teapot",
    value: "2 min ago",
    content: (
      <p>Standard lane · 38s generation · GLB 4.2 MB · Stylize: none. 6,700 embeds to date.</p>
    ),
  },
  {
    title: "Sci-fi Helmet v2",
    value: "14 min ago",
    content: (
      <p>Premium lane · 22s generation · GLB 11.1 MB · Stylize: metallic. 18,200 embeds to date.</p>
    ),
  },
  {
    title: "Film Camera",
    value: "1h ago",
    content: (
      <p>Standard lane · 41s generation · GLB 3.8 MB · Stylize: vintage. 5,300 embeds to date.</p>
    ),
  },
];

export default function DashboardPage() {
  return (
    <main className="flex-1 px-4 lg:px-6">
      <DashboardTopbar />

      <div className="grid gap-4 pb-8">
        <StatGrid />

        <section className="grid gap-4 xl:grid-cols-4">
          <PortfolioPanel />
          <MarketsPanel />
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <CardSplitAccordian
            title="Live Agents"
            action={
              <Button variant="ghost" size="sm" className="h-7 gap-1 px-1 text-xs text-muted-foreground hover:text-foreground">
                View all <ArrowUpRight className="size-3.5" />
              </Button>
            }
            items={agentItems}
          />
          <CardSplitAccordian
            title="Recent Forges"
            action={
              <Button variant="ghost" size="sm" className="h-7 gap-1 px-1 text-xs text-muted-foreground hover:text-foreground">
                Open Forge <ArrowUpRight className="size-3.5" />
              </Button>
            }
            items={forgeItems}
            defaultOpen="Ceramic Teapot"
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <AssetTableCard
            title="Top Avatars"
            assets={netWorthAssets}
            action="Create Avatar"
            valueLabel="API Calls"
          />
          <AssetTableCard
            title="Active Embeds"
            assets={borrowedAssets}
            action="Add Embed"
            valueLabel="Daily Calls"
            external
          />
        </section>
      </div>
    </main>
  );
}
