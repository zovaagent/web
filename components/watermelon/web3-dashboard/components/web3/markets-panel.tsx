import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PanelCard, PanelHeader } from "../ui/panel";
import { AssetBadge } from "./asset-badge";
import { markets } from "../../data";

export function MarketsPanel() {
  return (
    <PanelCard className="flex flex-col">
      <PanelHeader
        title="Top Avatars"
        action={
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-1 text-xs text-muted-foreground hover:text-foreground">
            View all <ArrowUpRight className="size-3.5" />
          </Button>
        }
      />
      <div className="flex-1">
        {markets.map((market, i) => (
          <div
            key={market.name}
            className="flex items-center gap-3 px-4 py-3 border-b border-border/50 last:border-0"
          >
            <AssetBadge symbol={market.name} color={market.color} size="sm" />
            <span className="flex-1 text-sm font-medium truncate">{market.name}</span>
            <span className="text-xs text-muted-foreground tabular-nums">{market.change}</span>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
