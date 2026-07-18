"use client";

import { useState } from "react";
import { Terminal, Code2, Layers, Check, Copy } from "lucide-react";
import { SectionLabel } from "@/components/landing/section-label";

interface CodeBlock {
  language: string;
  code: string;
}

const SCHEMAS: Record<"typescript" | "schema" | "curl", CodeBlock> = {
  schema: {
    language: "JSON",
    code: `{
  "id": "agent-watchdog-01",
  "name": "AuditGuardian",
  "autonomy": 0.98,
  "directives": [
    "Scan node logs for unauthorized privilege escalations",
    "Isolate node automatically upon threat verification"
  ],
  "knowledge": [
    {
      "type": "vector_store",
      "source": "zova://knowledge/cve_indices_2026"
    }
  ],
  "tools": [
    "zova://tools/signature_scanner",
    "zova://tools/firewall_isolator"
  ],
  "runtime": {
    "frequency": "continuous",
    "concurrency_limit": 5
  }
}`,
  },
  typescript: {
    language: "TypeScript",
    code: `import { ZovaEngine, AgentType } from "@zova/sdk";

// Initialize ZOVA platform worker
const zova = new ZovaEngine({ apiKey: process.env.ZOVA_SECRET });

// Create and deploy the audit agent
const agent = await zova.agents.create({
  name: "AuditGuardian",
  type: AgentType.SECURITY,
  objective: "Scan node logs for unauthorized privilege escalations.",
  tools: ["signature_scanner", "firewall_isolator"],
  knowledge: ["cve_indices_2026"]
});

// Start the continuous autonomous loop
await agent.deploy();

console.log(\`Agent \${agent.id} active and auditing.\`);`,
  },
  curl: {
    language: "Bash",
    code: `curl -X POST "https://api.zova.ai/v1/agents/deploy" \\
  -H "Authorization: Bearer $ZOVA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "AuditGuardian",
    "prompt": "Scan node logs for unauthorized privilege escalations",
    "tools": ["signature_scanner", "firewall_isolator"]
  }'`,
  },
};

type TabId = "typescript" | "schema" | "curl";

const TAB_FILE: Record<TabId, string> = {
  typescript: "index.ts",
  schema: "agent.json",
  curl: "deploy.sh",
};

const FEATURES = [
  {
    index: "01",
    icon: Code2,
    title: "Agent SDK",
    desc: "Modular TypeScript and Python client libraries to build and monitor agents programmatically.",
  },
  {
    index: "02",
    icon: Layers,
    title: "Declarative Schemas",
    desc: "Define agent behaviors, memory boundaries, and tool bindings inside auditable, portable JSON declarations.",
  },
  {
    index: "03",
    icon: Terminal,
    title: "Unified REST API",
    desc: "Integrate autonomous agents into applications, CRMs, and continuous integration pipelines over secure endpoints.",
  },
];

export function BuildersSection() {
  const [activeTab, setActiveTab] = useState<TabId>("typescript");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SCHEMAS[activeTab].code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      id="builders-section"
      className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <SectionLabel number="06" label="Developer Platform" dark />
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-white leading-tight">
              Build the next generation of agents.
            </h2>
            <p className="text-sm leading-relaxed text-white/40 max-w-md">
              Complete programmatic access via SDK, declarative JSON schemas,
              and standard REST APIs. Develop locally, compile, deploy globally.
            </p>
          </div>

          <div className="border-t border-white/10">
            {FEATURES.map(({ index, icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group grid grid-cols-[40px_56px_1fr] items-start gap-6 border-b border-white/10 py-6"
              >
                <span className="text-[11px] font-semibold tabular-nums tracking-[0.18em] text-white/25 mt-2 select-none">
                  {index}
                </span>
                <span className="inline-flex size-10 items-center justify-center border border-white/10 bg-white/[0.02] text-white/70 group-hover:text-[#a78bfa] group-hover:border-[#6d4dff]/40 transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-semibold text-white tracking-tight">
                    {title}
                  </h4>
                  <p className="text-sm leading-relaxed text-white/50">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 border border-white/10 bg-[#08080f] overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-4">
              {(Object.keys(SCHEMAS) as TabId[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsCopied(false);
                  }}
                  className={`text-[11px] font-mono tracking-wide transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "text-white"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {TAB_FILE[tab]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                {SCHEMAS[activeTab].language}
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-2.5 py-1.5 cursor-pointer transition-colors"
              >
                {isCopied ? (
                  <>
                    <Check className="h-3 w-3 text-[#a78bfa]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-5 font-mono text-xs text-white/80 leading-relaxed overflow-x-auto h-[440px]">
            <div className="flex">
              <div className="text-white/20 text-right pr-4 select-none border-r border-white/10 text-[11px] leading-relaxed">
                {SCHEMAS[activeTab].code.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="pl-4 text-[11px] text-white/80 leading-relaxed">
                <code>{SCHEMAS[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
