export const TIMEZONE = "America/New_York";

export function getDateInTimezone(timestamp?: number): Date {
  const date = timestamp ? new Date(timestamp) : new Date();
  return new Date(date.toLocaleString("en-US", { timeZone: TIMEZONE }));
}

export function getHoursInTimezone(timestamp?: number): number {
  return getDateInTimezone(timestamp).getHours();
}

export function formatTimeInTimezone(timestamp: number): string {
  const d = getDateInTimezone(timestamp);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function formatDateInTimezone(timestamp: number): string {
  const d = getDateInTimezone(timestamp);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function formatDateLabelInTimezone(timestamp: number): string {
  const d = getDateInTimezone(timestamp);
  const now = getDateInTimezone();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const dKey = formatDateInTimezone(timestamp);
  const todayKey = formatDateInTimezone(Date.now());
  const yesterdayKey = formatDateInTimezone(yesterday.getTime());

  if (dKey === todayKey) return "Today";
  if (dKey === yesterdayKey) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

export function formatRelative(ts: number, from: number = Date.now()): string {
  const diff = Math.max(0, from - ts);
  const s = Math.floor(diff / 1000);
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function formatDuration(ms: number): string {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  if (m < 60) return `${m}m ${rem}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
