"use client";

import { motion } from "motion/react";
import { Terminal, Package, Boxes } from "lucide-react";
import { SectionShell } from "./shared/section-shell";
import { SectionHeader } from "./shared/section-header";
import { IconTile } from "./shared/icon-tile";

const ease = [0.25, 0.1, 0.25, 1] as const;

type Endpoint = { method: "GET" | "POST"; path: string; note: string };

const endpoints: Endpoint[] = [
  { method: "GET",  path: "/v1/agents",         note: "List agents in your workspace"        },
  { method: "POST", path: "/v1/agents",         note: "Create an agent from a prompt or GLB" },
  { method: "POST", path: "/v1/chat",           note: "Send a message · stream the reply"    },
  { method: "GET",  path: "/v1/avatars/:id",    note: "Fetch avatar metadata and bindings"   },
  { method: "GET",  path: "/mcp",               note: "Model Context Protocol endpoint"      },
  { method: "POST", path: "/v1/a2a/:agentId",   note: "Agent-to-agent handoff protocol"      },
];

const sdks = [
  { name: "JavaScript", pkg: "npm i @zova/sdk",     lang: "typescript" },
  { name: "Python",     pkg: "pip install zova",    lang: "python"     },
  { name: "Rust",       pkg: "cargo add zova",      lang: "rust"       },
];

const methodColor: Record<Endpoint["method"], string> = {
  GET:  "text-[#a78bfa] border-[#a78bfa]/30 bg-[#a78bfa]/5",
  POST: "text-[#6d4dff] border-[#6d4dff]/40 bg-[#6d4dff]/10",
};

export function DeveloperPlatform() {
  return (
    <SectionShell id="api" tone="darker">
      <SectionHeader
        number="08"
        label="Developer Platform"
        dark
        title="Headless. Composable. Yours."
        subtitle="Every ZOVA capability ships as a REST endpoint, an SDK method, and an MCP tool. Bring your own model, front-end, or agent framework."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 border-t border-white/[0.07] pt-12">
        {/* Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3">
            <IconTile Icon={Terminal} />
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#a78bfa]">
              REST API
            </span>
          </div>

          <div className="border border-white/10 bg-[#0a0a12] overflow-hidden">
            {endpoints.map((e, i) => (
              <div
                key={e.path}
                className={
                  "grid grid-cols-[64px_1fr] items-center gap-4 px-4 py-3 " +
                  (i > 0 ? "border-t border-white/[0.06]" : "")
                }
              >
                <span
                  className={
                    "inline-flex justify-center items-center text-[10px] font-mono font-semibold tracking-wider py-1 border " +
                    methodColor[e.method]
                  }
                >
                  {e.method}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <code className="font-mono text-[13px] text-white truncate">{e.path}</code>
                  <span className="text-[11px] text-white/40">{e.note}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SDKs + MCP */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.08 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <IconTile Icon={Package} />
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#a78bfa]">
              SDKs
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {sdks.map((s) => (
              <div
                key={s.name}
                className="border border-white/10 bg-[#0a0a12] flex items-center justify-between px-4 py-3"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{s.name}</span>
                  <code className="font-mono text-[11px] text-white/40">{s.pkg}</code>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 border border-white/10 px-2 py-1">
                  Apache-2.0
                </span>
              </div>
            ))}
          </div>

          <div className="border border-[#6d4dff]/30 bg-[#6d4dff]/[0.06] p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <IconTile Icon={Boxes} />
              <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#a78bfa]">
                MCP Server
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Register ZOVA as a Model Context Protocol server in Claude Desktop, Cursor, or any MCP-aware client.
            </p>
            <code className="font-mono text-[12px] text-white bg-black/40 px-3 py-2 border border-white/10 self-start">
              zova://mcp
            </code>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
