"use client";

import { useEffect, useState } from "react";
import {
  Cpu,
  Database,
  Wrench,
  CheckCircle,
  RefreshCw,
  Terminal,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CreationStep {
  label: string;
  status: "idle" | "running" | "completed";
  icon: React.ComponentType<{ className?: string }>;
}

const PRESET_OBJECTIVES = [
  {
    label: "Portfolio Guardian",
    prompt: "Monitor my portfolio and alert me when unusual activity occurs.",
    category: "Finance",
    tools: ["Portfolio Scanner", "Volatility Engine", "Slack Alerts"],
    knowledge: ["Live Asset Prices", "User Risk Limits"],
  },
  {
    label: "Vulnerability Scan",
    prompt: "Scan our staging server and isolate nodes showing anomalies.",
    category: "Security",
    tools: ["Signature Scanner", "Threat Engine", "Node Isolator"],
    knowledge: ["CVE Database", "Internal Server Metrics"],
  },
  {
    label: "Asset Research",
    prompt: "Synthesize tech breakthroughs and compile a market report.",
    category: "Research",
    tools: ["Multimodal Reader", "Factual Synthesizer", "PDF Builder"],
    knowledge: ["Research Journals", "Global Patent Database"],
  },
];

export function InteractiveHeroCreator() {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_OBJECTIVES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [activeLogs, setActiveLogs] = useState<string[]>([
    "[ZOVA-OS] Booting Portfolio Guardian Agent...",
    "[SYSTEM] Connecting specialized tools: Portfolio Scanner, Volatility Engine",
    "[KNOWLEDGE] Hydrating vector databases: Live Asset Prices",
    "[LAUNCH] Agent autonomy state fully established.",
    "[STATUS] 0 errors. Listening for triggers...",
  ]);

  const [steps, setSteps] = useState<CreationStep[]>([
    { label: "Understanding objective", status: "completed", icon: Sparkles },
    { label: "Connecting knowledge", status: "completed", icon: Database },
    { label: "Selecting tools", status: "completed", icon: Wrench },
    { label: "Creating workflow", status: "completed", icon: Cpu },
    { label: "Agent Ready", status: "completed", icon: CheckCircle },
  ]);

  const triggerSimulation = (preset: (typeof PRESET_OBJECTIVES)[number]) => {
    setIsProcessing(true);
    setIsLive(false);

    setSteps([
      { label: "Understanding objective", status: "running", icon: Sparkles },
      { label: "Connecting knowledge", status: "idle", icon: Database },
      { label: "Selecting tools", status: "idle", icon: Wrench },
      { label: "Creating workflow", status: "idle", icon: Cpu },
      { label: "Agent Ready", status: "idle", icon: CheckCircle },
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setSteps((prev) =>
        prev.map((s, idx) => {
          if (idx < step) return { ...s, status: "completed" };
          if (idx === step) return { ...s, status: "running" };
          return { ...s, status: "idle" };
        }),
      );

      if (step === 4) {
        clearInterval(interval);
        setTimeout(() => {
          setSteps((prev) => prev.map((s) => ({ ...s, status: "completed" })));
          setIsProcessing(false);
          setIsLive(true);
          setActiveLogs([
            `[ZOVA-OS] Booting ${preset.label} Agent...`,
            `[SYSTEM] Connecting specialized tools: ${preset.tools.join(", ")}`,
            `[KNOWLEDGE] Hydrating vector databases: ${preset.knowledge.join(", ")}`,
            `[LAUNCH] Agent autonomy state fully established.`,
            `[STATUS] 0 errors. Listening for triggers...`,
          ]);
        }, 700);
      }
    }, 900);
  };

  const handlePresetSelect = (preset: (typeof PRESET_OBJECTIVES)[number]) => {
    if (isProcessing) return;
    setSelectedPreset(preset);
    triggerSimulation(preset);
  };

  useEffect(() => {
    if (!isLive || isProcessing) return;
    const interval = setInterval(() => {
      const liveEvents = [
        `[${new Date().toLocaleTimeString()}] Scanning asset parameters: OK.`,
        `[${new Date().toLocaleTimeString()}] Querying knowledge vectors for active changes...`,
        `[${new Date().toLocaleTimeString()}] Health telemetry ping: latency 4ms. CPU 2.1%.`,
        `[${new Date().toLocaleTimeString()}] Logged session handshake across secure channels.`,
        `[${new Date().toLocaleTimeString()}] Iteration state complete: standing by.`,
      ];
      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      setActiveLogs((prev) => [...prev.slice(1), randomEvent]);
    }, 4000);
    return () => clearInterval(interval);
  }, [isLive, isProcessing]);

  return (
    <div id="interactive-hero-creator" className="w-full">

      {/* Top toolbar: header + preset selector */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-6 items-center justify-center border border-white/10 bg-white/[0.02] text-white/70">
            <Terminal className="w-3 h-3" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Live Preview
          </span>
          {isLive && !isProcessing ? (
            <span className="inline-flex items-center gap-1 border border-white/10 bg-white/[0.02] text-[#a78bfa] text-[9px] px-1.5 py-0.5 font-mono uppercase tracking-[0.14em]">
              <span className="w-1 h-1 bg-[#a78bfa] animate-pulse" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 border border-white/10 bg-white/[0.02] text-[#a78bfa] text-[9px] px-1.5 py-0.5 font-mono uppercase tracking-[0.14em]">
              <RefreshCw className="w-2 h-2 animate-spin" />
              Compiling
            </span>
          )}
        </div>
      </div>

      {/* Preset tab strip */}
      <div className="flex border border-white/10 border-b-0 divide-x divide-white/10 overflow-x-auto">
        {PRESET_OBJECTIVES.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            disabled={isProcessing}
            className={`flex-1 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-colors cursor-pointer ${
              selectedPreset.label === preset.label
                ? "bg-white/[0.06] text-white"
                : "text-white/40 hover:text-white/70 hover:bg-white/[0.02]"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Panel — full width, minimal */}
      <div className="border border-white/10 bg-white/[0.015]">
        {/* Objective bar */}
        <div className="border-b border-white/10 px-5 py-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25 block mb-1.5">
            Objective
          </span>
          <div className="text-sm md:text-[15px] text-white/85 font-light leading-relaxed">
            <span className="text-[#a78bfa] mr-1 select-none">“</span>
            {selectedPreset.prompt}
            <span className="text-[#a78bfa] ml-1 select-none">”</span>
          </div>
        </div>

        {/* Body — grid of tools / knowledge / output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[280px]">
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="compilation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="col-span-12 px-6 md:px-8 py-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {steps.map((step) => {
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={step.label}
                        className={`flex flex-col gap-3 p-5 transition-colors duration-300 ${
                          step.status === "running" ? "bg-[#6d4dff]/[0.06]" : ""
                        }`}
                      >
                        <span
                          className={`inline-flex size-8 items-center justify-center border transition-colors ${
                            step.status === "completed"
                              ? "border-white/10 bg-white/[0.02] text-[#a78bfa]"
                              : step.status === "running"
                              ? "border-[#6d4dff]/40 bg-[#6d4dff]/10 text-[#a78bfa]"
                              : "border-white/5 bg-transparent text-white/20"
                          }`}
                        >
                          <StepIcon
                            className={`w-3.5 h-3.5 ${
                              step.status === "running" ? "animate-pulse" : ""
                            }`}
                          />
                        </span>
                        <span
                          className={`text-xs font-medium leading-tight ${
                            step.status === "idle" ? "text-white/30" : "text-white/80"
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em]">
                          {step.status === "completed" && (
                            <span className="text-[#a78bfa]">Ready</span>
                          )}
                          {step.status === "running" && (
                            <span className="text-[#a78bfa] animate-pulse">Running…</span>
                          )}
                          {step.status === "idle" && (
                            <span className="text-white/25">Pending</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="monitor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="col-span-12 flex flex-col"
              >
                {/* Tools + Knowledge row */}
                <div className="grid grid-cols-2 border-b border-white/10">
                  <div className="flex flex-col gap-2.5 px-5 py-4 border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-5 items-center justify-center border border-white/10 text-white/70">
                        <Wrench className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                        Tools
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {selectedPreset.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] font-mono text-white/60 border-l border-white/10 pl-2 py-0.5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-5 items-center justify-center border border-white/10 text-white/70">
                        <Database className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                        Knowledge
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {selectedPreset.knowledge.map((kb) => (
                        <span
                          key={kb}
                          className="text-[11px] font-mono text-white/60 border-l border-white/10 pl-2 py-0.5"
                        >
                          {kb}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Output console — full width below */}
                <div className="flex flex-col gap-2.5 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-5 items-center justify-center border border-white/10 text-white/70">
                        <Terminal className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                        Output Stream
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/25">
                      &gt;_ live
                    </span>
                  </div>
                  <div className="font-mono text-[10px] leading-relaxed text-white/50 space-y-0.5 max-h-[110px] overflow-hidden">
                    {activeLogs.map((log, i) => (
                      <div
                        key={i}
                        className={`truncate ${
                          i === activeLogs.length - 1
                            ? "text-white/90 border-l border-[#a78bfa] pl-2"
                            : "pl-2"
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer meta */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-3.5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            {isLive
              ? "Runtime · 24/7 autonomous loop"
              : "Compiling execution graph…"}
          </div>
          <button
            onClick={() => triggerSimulation(selectedPreset)}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/30 px-3 py-1.5"
          >
            <RefreshCw
              className={`w-3 h-3 ${isProcessing ? "animate-spin" : ""}`}
            />
            Re-compile
          </button>
        </div>
      </div>
    </div>
  );
}
