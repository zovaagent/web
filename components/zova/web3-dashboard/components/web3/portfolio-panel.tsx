import { GoTriangleUp } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { PanelCard, PanelHeader } from "../ui/panel";
import { PortfolioChart } from "./charts";
import { cn } from "@/lib/utils";

const ranges = ["All", "1D", "7D", "1M"];

export function PortfolioPanel() {
  return (
    <PanelCard className="xl:col-span-3 flex flex-col">
      <PanelHeader
        title="Avatar Growth"
        action={
          <div className="flex items-center -mr-1">
            {ranges.map((range) => (
              <Button
                key={range}
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 px-2.5 text-xs",
                  range === "All"
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {range}
              </Button>
            ))}
          </div>
        }
      />
      <div className="p-4 flex-1 flex flex-col">
        <div>
          <div className="text-2xl font-semibold tracking-tight">12,847</div>
          <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-400">
            <GoTriangleUp className="size-3 fill-current" />
            <span>Avatars created this month</span>
          </div>
        </div>
        <div className="h-72 mt-4">
          <PortfolioChart />
        </div>
      </div>
    </PanelCard>
  );
}
