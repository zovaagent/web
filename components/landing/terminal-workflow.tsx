"use client";

import { motion } from "motion/react";
import { Check, ChevronRight, Sparkles, Code2, Coins, Circle } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { SectionLabel } from "./section-label";

const ease = [0.25, 0.1, 0.25, 1] as const;

type IconCmp = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

type Line =
  | { type: "cmd";     text: string }
  | { type: "comment"; text: string }
  | { type: "ok";      text: string }
  | { type: "info";    text: string }
  | { type: "output";  text: string }
  | { type: "result";  text: string };

const steps: {
  step:   string;
  label:  string;
  Icon:   IconCmp;
  title:  string;
  desc:   string;
  file:   string;
  lines:  Line[];
}[] = [
  {
    step: "01",
    label: "CREATE",
    Icon: Sparkles,
    title: "From prompt to rigged 3D agent.",
    desc: "One command. The Forge handles mesh, rigging, animations, and voice binding.",
    file: "~/agents/alex.zova.ts",
    lines: [
      { type: "comment", text: "# Generate a 3D avatar + wire personality" },
      { type: "cmd",     text: "zova create alex \\"                              },
      { type: "cmd",     text: "  --prompt \"friendly product guide, warm smile\" \\" },
      { type: "cmd",     text: "  --voice elevenlabs:lyra \\"                     },
      { type: "cmd",     text: "  --model anthropic/claude-sonnet"               },
      { type: "output",  text: ""                                                },
      { type: "ok",      text: "text to 3D mesh generated · 42s"                 },
      { type: "ok",      text: "auto-rigged · 68 bones · 110 animations"         },
      { type: "ok",      text: "voice bound · lyra (en-US)"                      },
      { type: "ok",      text: "identity attested · alex.zova.sol"               },
      { type: "result",  text: "ready: agent://alex.zova.sol"                    },
    ],
  },
  {
    step: "02",
    label: "EMBED",
    Icon: Code2,
    title: "Two lines. Any page. Any framework.",
    desc: "Drop the web component. No SDK install, no iframe, no build step.",
    file: "app/page.tsx",
    lines: [
      { type: "comment", text: "# Add to any HTML, React, Vue, or Svelte page" },
      { type: "cmd",     text: "<script src=\"https://cdn.zova.ai/embed.js\" defer></script>" },
      { type: "cmd",     text: "<zova-agent id=\"alex.zova.sol\" mode=\"talk\" />" },
      { type: "output",  text: ""                                                },
      { type: "info",    text: "lazy-loaded on viewport enter"                   },
      { type: "info",    text: "isolated shadow DOM · zero style leak"           },
      { type: "info",    text: "voice + memory + animation included"             },
      { type: "result",  text: "live in <10ms after intersection"                },
    ],
  },
  {
    step: "03",
    label: "EARN",
    Icon: Coins,
    title: "Charge per chat. Keep everything.",
    desc: "Gate any skill behind pay-per-call USDC. Real-time settlement on Solana.",
    file: "config/monetize.ts",
    lines: [
      { type: "comment", text: "# Enable x402 micropayments" },
      { type: "cmd",     text: "zova monetize alex \\"                     },
      { type: "cmd",     text: "  --protocol x402 \\"                      },
      { type: "cmd",     text: "  --price 0.002 --token USDC \\"           },
      { type: "cmd",     text: "  --wallet <your-solana-address>"          },
      { type: "output",  text: ""                                          },
      { type: "ok",      text: "x402 gateway attached"                     },
      { type: "ok",      text: "402-payment challenge active"              },
      { type: "info",    text: "price:    0.002 USDC / chat"               },
      { type: "info",    text: "fee:      0% (open beta)"                  },
      { type: "info",    text: "settled:  <2s on-chain finality"           },
      { type: "result",  text: "dashboard: zova.ai/earn/alex"              },
    ],
  },
];

const colorFor = (t: Line["type"]) => {
  switch (t) {
    case "cmd":     return "text-white";
    case "comment": return "text-white/25";
    case "ok":      return "text-white/70";
    case "info":    return "text-[#a78bfa]";
    case "result":  return "text-[#6d4dff]";
    case "output":  return "text-white/40";
  }
};

const iconFor = (t: Line["type"]) => {
  switch (t) {
    case "ok":     return <Check       className="inline-block h-3 w-3 mr-2 text-[#a78bfa]" />;
    case "info":   return <Circle      className="inline-block h-1.5 w-1.5 mr-2.5 ml-1 fill-[#a78bfa] text-[#a78bfa]" />;
    case "result": return <ChevronRight className="inline-block h-3 w-3 mr-2 text-[#6d4dff]" />;
    default:       return null;
  }
};

export function TerminalWorkflow() {
  return (
    <section id="workflow" className="bg-[#05050a] py-28 border-t border-white/[0.06] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="mb-16 flex flex-col gap-4">
          <SectionLabel number="05" label="Workflow" dark />
          <h2 className="text-3xl font-semibold tracking-tight text-white max-w-xl leading-tight">
            Three commands. One living agent.
          </h2>
          <p className="text-sm text-white/40 max-w-md leading-relaxed">
            The full lifecycle in real syntax. Copy, paste, ship.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease, delay: i * 0.08 }}
              className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start"
            >
              <div className="flex flex-col gap-3 lg:pt-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-6 items-center justify-center border border-white/10 bg-[#6d4dff]/10">
                    <s.Icon className="h-3.5 w-3.5 text-[#a78bfa]" />
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.22em] text-white/25 uppercase font-mono">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-[#a78bfa] uppercase">
                    {s.label}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="border border-white/10 bg-[#0a0a12] overflow-hidden">
                <div className="flex items-center gap-3 px-4 h-9 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/10" />
                    <span className="size-2.5 rounded-full bg-white/10" />
                    <span className="size-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 text-[11px] font-mono text-white/40">
                    <s.Icon className="h-3 w-3 text-[#6d4dff]" />
                    <span>{s.file}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/25 uppercase tracking-wider">
                    zsh
                  </span>
                </div>

                <pre className="px-5 py-5 text-[12.5px] leading-[1.75] font-mono overflow-x-auto whitespace-pre">
                  {s.lines.map((line, li) => (
                    <span key={li} className={`block ${colorFor(line.type)}`}>
                      {line.type === "cmd" && (
                        <span className="text-[#6d4dff] select-none">$ </span>
                      )}
                      {iconFor(line.type)}
                      {line.text}
                    </span>
                  ))}
                  <span className="flex items-center gap-1 text-[#6d4dff] mt-1">
                    <span>$</span>
                    <span className="inline-block w-2 h-4 bg-[#6d4dff] animate-pulse" />
                  </span>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
