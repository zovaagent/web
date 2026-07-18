import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { PanelCard } from "../ui/panel";
import { ApySparkline } from "./charts";
import { stats } from "../../data";
import { cn } from "@/lib/utils";

export function StatGrid() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <PanelCard key={stat.label} className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className={cn("rounded-lg p-1.5 flex items-center justify-center", stat.tone)}>
              <stat.icon className="size-4 text-white" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
          </div>

          <div>
            <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
            {stat.compactChart ? (
              <div className="mt-2 h-10">
                <ApySparkline />
              </div>
            ) : (
              <div
                className={cn("mt-1 flex items-center gap-1 text-xs", {
                  "text-emerald-400": stat.detail.startsWith("+"),
                  "text-red-400":     stat.detail.startsWith("-"),
                  "text-muted-foreground": !stat.detail.startsWith("+") && !stat.detail.startsWith("-"),
                })}
              >
                {stat.detail.startsWith("+") && <GoTriangleUp className="size-3 fill-current" />}
                {stat.detail.startsWith("-") && <GoTriangleDown className="size-3 fill-current" />}
                <span>{stat.detail}</span>
              </div>
            )}
          </div>
        </PanelCard>
      ))}
    </section>
  );
}
