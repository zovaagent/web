"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Database,
  Wrench,
  Terminal,
  Play,
  Pause,
  Check,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Agent } from "./types";

const PROMPT_SUGGESTIONS = [
  {
    text: "Monitor wallets",
    prompt:
      "Monitor crypto wallets and send Slack notifications when large transactions over $100k occur.",
  },
  {
    text: "Analyze markets",
    prompt:
      "Track major tech stocks, analyze overall market sentiment, and flag high-risk volatility events.",
  },
  {
    text: "Research assets",
    prompt:
      "Summarize top academic research, blog posts, and press releases about synthetic biology and carbon-neutral fuels daily.",
  },
  {
    text: "Manage operations",
    prompt:
      "Identify customer issues in GitHub, summarize them, assign priority tags, and alert the development leads.",
  },
  {
    text: "Protect accounts",
    prompt:
      "Audit access history to check for unauthorized access locations and trigger automatic key isolation upon anomalies.",
  },
  {
    text: "Automate workflows",
    prompt:
      "Automatically pull new leads from Typeform, qualify them, generate personalized outreach drafts, and log them to HubSpot.",
  },
];

const LOADING_MESSAGES = [
  "Contacting ZOVA compiler nodes...",
  "Analyzing linguistic objective context...",
  "Interpreting logic chains & tools matching...",
  "Assembling structural agent blueprint...",
  "Generating secure execution graph...",
];

interface Props {
  prefilledPrompt?: string;
}

export function InteractiveAgentGenerator({ prefilledPrompt }: Props) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [compiledAgent, setCompiledAgent] = useState<Agent | null>(null);
  const [isLiveRunning, setIsLiveRunning] = useState(true);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "workflow" | "tools" | "console">(
    "overview",
  );
  const [isDeployed, setIsDeployed] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);

  const handleGenerate = async (promptToUse: string) => {
    const p = promptToUse.trim();
    if (!p || isLoading) return;
    setIsLoading(true);
    setCompiledAgent(null);
    setIsDeployed(false);
    setDeploySuccess(false);
    try {
      const res = await fetch("/api/create-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: p }),
      });
      const data = await res.json();
      if (data?.agent) {
        setCompiledAgent(data.agent);
        setActiveLogs(data.agent.simulatedLogs || []);
        setActiveTab("overview");
      }
    } catch (e) {
      console.error("Agent compilation failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (prefilledPrompt) {
      setInputText(prefilledPrompt);
      handleGenerate(prefilledPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledPrompt]);

  useEffect(() => {
    if (!isLoading) return;
    setLoadingStep(0);
    const iv = setInterval(() => {
      setLoadingStep((prev) => (prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev));
    }, 1100);
    return () => clearInterval(iv);
  }, [isLoading]);

  useEffect(() => {
    if (!compiledAgent || !isLiveRunning || isLoading) return;
    const iv = setInterval(() => {
      const gen = [
        `[${new Date().toLocaleTimeString()}] Querying knowledge bases: ${compiledAgent.knowledge.join(", ")}`,
        `[${new Date().toLocaleTimeString()}] Evaluating risk scores and operational boundaries...`,
        `[${new Date().toLocaleTimeString()}] Executed agent heartbeat. Autonomy state optimal.`,
        `[${new Date().toLocaleTimeString()}] Scanning active vectors for unusual events...`,
        `[${new Date().toLocaleTimeString()}] No anomalies identified. Standing by.`,
      ];
      if (compiledAgent.tools?.length) {
        const t = compiledAgent.tools[Math.floor(Math.random() * compiledAgent.tools.length)];
        gen.push(
          `[${new Date().toLocaleTimeString()}] Spawning worker instance to invoke tool: [${t}]`,
        );
      }
      const sel = gen[Math.floor(Math.random() * gen.length)];
      setActiveLogs((prev) => [...prev.slice(1), sel]);
    }, 4500);
    return () => clearInterval(iv);
  }, [compiledAgent, isLiveRunning, isLoading]);

  const handleDeploy = () => {
    setIsDeployed(true);
    setTimeout(() => setDeploySuccess(true), 1800);
  };

  return (
    <div
      id="interactive-agent-generator"
      className="w-full max-w-5xl mx-auto px-4 md:px-0 py-8"
    >
      {/* Prompt box */}
      <div className="relative border border-white/10 bg-[#0a0a12] p-6 md:p-8 mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-40 bg-[#6d4dff]/8 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#a78bfa]" />
          <h3 className="text-sm font-medium text-white uppercase tracking-[0.18em]">
            ZOVA Interactive Agent Architect
          </h3>
        </div>

        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., Build an agent that monitors hacker news for AI breakthroughs, summarizes them, and drafts an internal newsletter..."
            className="w-full h-32 md:h-28 bg-white/[0.04] border border-white/10 hover:border-[#6d4dff]/30 focus:border-[#6d4dff]/50 p-4 text-sm text-white/85 placeholder-white/30 focus:outline-none transition-all resize-none pr-12 leading-relaxed"
          />
          <button
            onClick={() => handleGenerate(inputText)}
            disabled={isLoading || !inputText.trim()}
            className="absolute bottom-4 right-4 bg-white text-black hover:bg-white/90 disabled:bg-white/10 disabled:text-white/30 p-2.5 transition-all flex items-center justify-center cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.22em] block mb-2.5">
            Suggested Prompts (Click to populate)
          </span>
          <div className="flex flex-wrap gap-2">
            {PROMPT_SUGGESTIONS.map((s) => (
              <button
                key={s.text}
                onClick={() => {
                  setInputText(s.prompt);
                  handleGenerate(s.prompt);
                }}
                disabled={isLoading}
                className="text-[11px] bg-white/[0.03] border border-white/10 text-white/50 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 hover:shadow-[0_0_10px_rgba(139,92,246,0.15)] hover:-translate-y-0.5 rounded-sm px-3 py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap uppercase tracking-[0.14em]"
              >
                {s.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="border border-white/10 bg-[#0a0a12] p-12 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden"
          >
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 border-2 border-t-[#6d4dff] border-r-transparent border-b-transparent border-l-transparent animate-spin rounded-full" />
              <div
                className="absolute inset-1.5 border border-t-transparent border-r-[#3ed8ff] border-b-transparent border-l-transparent animate-spin rounded-full"
                style={{ animationDirection: "reverse" }}
              />
              <div className="absolute inset-4 bg-[#6d4dff]/10 rounded-full flex items-center justify-center">
                <Cpu className="w-6 h-6 text-[#a78bfa] animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 text-center max-w-sm">
              <p className="text-xs font-mono text-[#a78bfa] font-semibold tracking-[0.24em] uppercase animate-pulse">
                Compiling Node Engine
              </p>
              <p className="text-xs text-white/50 h-4">{LOADING_MESSAGES[loadingStep]}</p>
            </div>
          </motion.div>
        )}

        {compiledAgent && !isLoading && (
          <motion.div
            key="agent-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0a0a12] border border-white/10 p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(109,77,255,0.10),transparent_45%)] pointer-events-none" />

            {/* Left col */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6 flex flex-col justify-between relative">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-14 h-14 bg-white/[0.04] border border-white/10 flex items-center justify-center overflow-hidden">
                    <span className="absolute inset-3 rounded-full bg-[#6d4dff]/30 animate-ping" />
                    <span className="relative w-7 h-7 rounded-full bg-[#6d4dff] flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-black" />
                    </span>
                  </div>
                  <div>
                    <span className="border border-[#6d4dff]/30 bg-[#6d4dff]/10 text-[#a78bfa] text-[9px] px-2 py-0.5 font-mono uppercase tracking-[0.22em]">
                      {compiledAgent.category} Agent
                    </span>
                    <h4 className="text-lg font-semibold text-white tracking-tight mt-1">
                      {compiledAgent.name}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-white/70 italic leading-relaxed mb-5">
                  &ldquo;{compiledAgent.tagline}&rdquo;
                </p>

                <div className="bg-white/[0.03] border border-white/10 p-4 space-y-3 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em]">
                      Autonomy Rating
                    </span>
                    <span className="text-xs font-mono font-bold text-[#a78bfa]">
                      {compiledAgent.autonomyLevel}%
                    </span>
                  </div>
                  <div className="w-full bg-black h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#6d4dff] to-[#3ed8ff] h-full"
                      style={{ width: `${compiledAgent.autonomyLevel}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-white/40 leading-normal">
                    Agent handles objective execution, tool invocation, and decision trees with
                    high structural independence.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {isDeployed ? (
                  deploySuccess ? (
                    <div className="border border-emerald-400/30 bg-emerald-500/10 p-3 text-center text-xs text-emerald-300 flex items-center justify-center gap-2 uppercase tracking-[0.14em]">
                      <Check className="w-4 h-4" />
                      Agent Registered in Sandbox OS!
                    </div>
                  ) : (
                    <div className="bg-white/[0.03] border border-white/10 p-3 text-center text-xs text-white/50 font-mono flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-ping" />
                      Configuring cloud ingress...
                    </div>
                  )
                ) : (
                  <button
                    onClick={handleDeploy}
                    className="w-full bg-white hover:bg-white/90 text-black text-xs font-semibold py-3 px-4 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-[0.16em]"
                  >
                    Deploy to ZOVA Cloud
                  </button>
                )}

                <button
                  onClick={() =>
                    handleGenerate(inputText || "Create an autonomous research scanner")
                  }
                  className="w-full bg-transparent border border-white/10 hover:border-white/20 text-white/50 hover:text-white text-xs font-semibold py-3 px-4 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-[0.14em]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Compile Alternative Model
                </button>
              </div>
            </div>

            {/* Right col */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full min-h-[380px] relative">
              <div>
                <div className="flex border-b border-white/10 pb-2 mb-4 gap-4 overflow-x-auto">
                  {(["overview", "workflow", "tools", "console"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[11px] tracking-[0.18em] pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap uppercase ${
                        activeTab === tab
                          ? "border-[#6d4dff] text-white font-medium"
                          : "border-transparent text-white/40 hover:text-white/70"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="min-h-[220px]">
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.22em] block mb-1.5">
                          Description
                        </span>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {compiledAgent.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-white/[0.02] border border-white/10 p-3">
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.22em] block mb-1">
                            Primary Directives
                          </span>
                          <ul className="text-xs text-white/60 list-disc pl-4 space-y-1">
                            <li>Process natural input queries safely.</li>
                            <li>Enforce sandbox network boundaries.</li>
                            <li>Minimize API latency through structured loops.</li>
                          </ul>
                        </div>
                        <div className="bg-white/[0.02] border border-white/10 p-3">
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.22em] block mb-1">
                            Execution Frequency
                          </span>
                          <span className="text-xs font-mono text-white/70 block">
                            Continuous (24/7 autonomous loop)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "workflow" && (
                    <div className="space-y-3.5">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.22em] block">
                        Agent Decision & Action Loop
                      </span>
                      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                        {compiledAgent.workflow.map((step, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute -left-[22px] top-0.5 w-3 h-3 rounded-full bg-black border border-[#6d4dff] flex items-center justify-center text-[8px] font-mono text-[#a78bfa]">
                              {idx + 1}
                            </span>
                            <div className="text-xs font-medium text-white/85">
                              Step {idx + 1}
                            </div>
                            <p className="text-xs text-white/55 mt-0.5 leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "tools" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.22em] block">
                          Registered Toolboxes
                        </span>
                        <div className="space-y-2">
                          {compiledAgent.tools.map((tool) => (
                            <div
                              key={tool}
                              className="bg-white/[0.02] border border-white/10 p-3 flex items-start gap-2.5"
                            >
                              <Wrench className="w-4 h-4 text-[#a78bfa] mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="text-xs font-medium text-white/85">{tool}</h5>
                                <span className="text-[9px] font-mono text-white/40">
                                  ZOVA Standard Secure SDK
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.22em] block">
                          Knowledge Embeddings
                        </span>
                        <div className="space-y-2">
                          {compiledAgent.knowledge.map((kb) => (
                            <div
                              key={kb}
                              className="bg-white/[0.02] border border-white/10 p-3 flex items-start gap-2.5"
                            >
                              <Database className="w-4 h-4 text-[#3ed8ff] mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="text-xs font-medium text-white/85">{kb}</h5>
                                <span className="text-[9px] font-mono text-white/40">
                                  Sync state: Completed
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "console" && (
                    <div className="space-y-3 h-full">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.22em] flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5" /> Output Telemetry (Simulated Stream)
                        </span>

                        <button
                          onClick={() => setIsLiveRunning(!isLiveRunning)}
                          className="flex items-center gap-1 text-[10px] font-mono text-white/50 hover:text-white transition-all bg-white/[0.04] px-2 py-1 border border-white/10 cursor-pointer uppercase tracking-[0.14em]"
                        >
                          {isLiveRunning ? (
                            <>
                              <Pause className="w-2.5 h-2.5" /> Pause Feed
                            </>
                          ) : (
                            <>
                              <Play className="w-2.5 h-2.5 text-emerald-400" /> Resume Feed
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-black/80 border border-white/10 rounded-sm p-4 font-mono text-xs leading-relaxed overflow-y-auto max-h-[170px] space-y-1.5">
                        {activeLogs.map((log, i) => {
                          const isLast = i === activeLogs.length - 1;
                          const bracket = log.match(/^(\[[^\]]+\])\s*(.*)$/);
                          const tag = bracket?.[1] ?? "";
                          const body = bracket?.[2] ?? log;
                          const tagColor = /ZOVA-OS|SYSTEM/.test(tag)
                            ? "text-cyan-400"
                            : /KNOWLEDGE/.test(tag)
                            ? "text-fuchsia-400"
                            : /LAUNCH/.test(tag)
                            ? "text-amber-400"
                            : /STATUS/.test(tag)
                            ? "text-emerald-400"
                            : /^\[\d/.test(tag)
                            ? "text-violet-400"
                            : "text-neutral-500";
                          return (
                            <div
                              key={i}
                              className={`truncate ${
                                isLast
                                  ? "border-l-2 border-violet-500 pl-2 font-semibold"
                                  : "pl-2"
                              }`}
                            >
                              {tag && <span className={`${tagColor} font-semibold`}>{tag}</span>}{" "}
                              <span className={isLast ? "text-white/95" : "text-white/60"}>
                                {body}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-[0.14em]">
                <span>Model parameters: Compiled successfully</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-full animate-ping" />
                  ZOVA Node #2441-A
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
