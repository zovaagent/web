import { GreetingHero } from "@/components/dashboard/mission-control/greeting-hero";
import { MetricRow } from "@/components/dashboard/mission-control/metric-row";
import { QuickActionBar } from "@/components/dashboard/mission-control/quick-action-bar";
import { LiveActivityFeed } from "@/components/dashboard/mission-control/live-activity-feed";
import { AgentPulseGrid } from "@/components/dashboard/mission-control/agent-pulse-grid";

export default function MissionControlPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <GreetingHero />
      <MetricRow />
      <QuickActionBar />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LiveActivityFeed />
        </div>
        <div>
          <AgentPulseGrid />
        </div>
      </div>
    </div>
  );
}
