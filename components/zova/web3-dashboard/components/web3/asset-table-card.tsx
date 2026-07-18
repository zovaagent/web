import { ArrowRight, ChevronsUpDown, MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PanelCard, PanelHeader } from "../ui/panel";
import { AssetBadge } from "./asset-badge";

type Asset = {
  asset: string;
  balance: string;
  value: string;
  color: string;
};

type AssetTableCardProps = {
  title: string;
  assets: Asset[];
  action: string;
  valueLabel: string;
  external?: boolean;
};

export function AssetTableCard({ title, assets, action, valueLabel, external }: AssetTableCardProps) {
  return (
    <PanelCard className="flex flex-col">
      <PanelHeader
        title={title}
        action={
          <Button variant="ghost" size="sm" className="size-7 p-0 text-muted-foreground hover:text-foreground">
            <MoreVertical className="size-4" />
          </Button>
        }
      />

      <div className="flex-1">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="h-9 px-4 text-xs font-medium">Asset</TableHead>
              <TableHead className="h-9 px-4 text-xs font-medium">
                <span className="inline-flex items-center gap-1">
                  Balance <ChevronsUpDown className="size-3.5" />
                </span>
              </TableHead>
              <TableHead className="h-9 px-4 text-xs font-medium">
                <span className="inline-flex items-center gap-1">
                  {valueLabel} <ChevronsUpDown className="size-3.5" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.asset} className="border-b border-border/50 hover:bg-muted/30">
                <TableCell className="h-12 px-4">
                  <span className="inline-flex items-center gap-2.5 font-medium text-sm">
                    <AssetBadge symbol={asset.asset} color={asset.color} size="sm" />
                    {asset.asset}
                  </span>
                </TableCell>
                <TableCell className="h-12 px-4 text-sm">{asset.balance}</TableCell>
                <TableCell className="h-12 px-4 text-sm">{asset.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-3 border-t border-border">
        <Button variant="outline" className="h-9 w-full text-sm font-normal gap-2">
          {action}
          {external ? <ArrowRight className="size-4" /> : <Plus className="size-4" />}
        </Button>
      </div>
    </PanelCard>
  );
}
