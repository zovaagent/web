"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { apyData, portfolioData } from "../../data";

/* Subtle area fill using CSS var — not a UI gradient, just chart fill */
const CHART_PRIMARY = "oklch(0.62 0.22 280)";   /* --primary */
const CHART_GREEN   = "oklch(0.79 0.209 151.5)"; /* emerald-400 */

export function PortfolioChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={portfolioData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={CHART_PRIMARY} stopOpacity={0.18} />
            <stop offset="100%" stopColor={CHART_PRIMARY} stopOpacity={0}    />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeOpacity={0.4} vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={2}
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          width={42}
          tickFormatter={(v) => `${Number(v) / 1000}K`}
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={CHART_PRIMARY}
          strokeWidth={2}
          fill="url(#chartFill)"
          dot={false}
          activeDot={{ r: 4, fill: CHART_PRIMARY, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ApySparkline() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={apyData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={CHART_GREEN} stopOpacity={0.3} />
            <stop offset="100%" stopColor={CHART_GREEN} stopOpacity={0}   />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={CHART_GREEN}
          strokeWidth={1.5}
          fill="url(#sparkFill)"
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
