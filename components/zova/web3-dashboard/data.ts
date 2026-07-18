import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  BrainCircuit,
  Coins,
  Code2,
  Database,
  LayoutDashboard,
  LayoutGrid,
  Mic,
  Settings,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  PersonStanding,
  Zap,
  Terminal,
  DollarSign,
} from "lucide-react";

export const navSections = [
  {
    title: "CREATE",
    items: [
      { label: "Get started",  icon: Sparkles,      external: true  },
      { label: "Overview",     icon: LayoutDashboard, active: true  },
      { label: "Avatars",      icon: Users                          },
      { label: "Agents",       icon: Bot                            },
      { label: "Library",      icon: BookOpen                       },
      { label: "Voice Lab",    icon: Mic,           external: true  },
      { label: "Brain",        icon: BrainCircuit                   },
    ],
  },
  {
    title: "DISTRIBUTE",
    items: [
      { label: "Widgets",        icon: LayoutGrid                    },
      { label: "Walk Companion", icon: PersonStanding                },
      { label: "API & Embed",    icon: Code2                         },
      { label: "Developer Hub",  icon: Terminal,    external: true  },
      { label: "Data API",       icon: Database                      },
      { label: "Marketplace",    icon: Store,       external: true  },
      { label: "Skills",         icon: Zap,         external: true  },
    ],
  },
  {
    title: "MONETIZE",
    items: [
      { label: "$ZOVA",     icon: Coins    },
      { label: "Holders",   icon: Users    },
      { label: "Analytics", icon: BarChart3 },
    ],
  },
];

export const utilityItems = [
  { label: "Notifications", icon: Bell     },
  { label: "Settings",      icon: Settings },
];

export const stats = [
  {
    label: "Avatars Created",
    value: "12,847",
    detail: "+24.1%",
    icon: Users,
    tone: "bg-violet-500",
  },
  {
    label: "Active Agents",
    value: "3,291",
    detail: "Across 9 sites",
    icon: Bot,
    tone: "bg-blue-500",
  },
  {
    label: "API Calls / Mo",
    value: "8.4M",
    detail: "+15.2%",
    icon: Activity,
    tone: "bg-emerald-500",
  },
  {
    label: "Revenue (USDC)",
    value: "$24,800",
    detail: "",
    icon: DollarSign,
    tone: "bg-amber-500",
    compactChart: true,
  },
];

export const portfolioData = [
  { month: "Jan", value: 800   },
  { month: "Feb", value: 1500  },
  { month: "Mar", value: 2100  },
  { month: "Apr", value: 2800  },
  { month: "May", value: 3400  },
  { month: "Jun", value: 4200  },
  { month: "Jul", value: 5800  },
  { month: "Aug", value: 7200  },
  { month: "Sep", value: 8900  },
  { month: "Oct", value: 10400 },
  { month: "Nov", value: 11900 },
  { month: "Now", value: 12847 },
];

export const apyData = [
  { month: "Oct", value: 1800 },
  { month: "Nov", value: 2100 },
  { month: "Dec", value: 2400 },
  { month: "Jan", value: 2200 },
  { month: "Feb", value: 2600 },
  { month: "Mar", value: 3000 },
  { month: "Apr", value: 3291 },
];

export const markets = [
  { name: "Low-poly Fox",    symbol: "FOX",   change: "+24.5K embeds", color: "bg-orange-400" },
  { name: "Sci-fi Helmet",   symbol: "SFH",   change: "+18.2K embeds", color: "bg-blue-500"   },
  { name: "Corporate Alex",  symbol: "ALEX",  change: "+12.1K embeds", color: "bg-violet-500" },
  { name: "Dragon",          symbol: "DRG",   change: "+8.4K embeds",  color: "bg-red-500"    },
  { name: "Ceramic Teapot",  symbol: "TEA",   change: "+6.7K embeds",  color: "bg-amber-400"  },
  { name: "Film Camera",     symbol: "CAM",   change: "+5.3K embeds",  color: "bg-slate-400"  },
];

export const netWorthAssets = [
  { asset: "3D Fox",      balance: "24,510", value: "4,802 calls",  color: "bg-orange-400" },
  { asset: "Sci-fi Helm", balance: "18,200", value: "3,640 calls",  color: "bg-blue-500"   },
  { asset: "Corp Alex",   balance: "12,100", value: "2,420 calls",  color: "bg-violet-500" },
  { asset: "Dragon",      balance: "8,400",  value: "1,680 calls",  color: "bg-red-500"    },
];

export const borrowedAssets = [
  { asset: "example.com",    balance: "Fox",      value: "482/day", color: "bg-orange-400" },
  { asset: "mystore.io",     balance: "Corp Alex", value: "391/day", color: "bg-violet-500" },
  { asset: "devblog.net",    balance: "Dragon",   value: "210/day", color: "bg-red-500"    },
  { asset: "agency.co",      balance: "Helmet",   value: "188/day", color: "bg-blue-500"   },
];
