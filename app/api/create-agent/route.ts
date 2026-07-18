import { NextResponse } from "next/server";
import type { Agent } from "@/components/zova/types";

export const runtime = "nodejs";

function compileFallbackAgent(prompt: string): Agent {
  const normalized = prompt.toLowerCase();

  let name = "Z-Agent";
  let category: Agent["category"] = "Operations";
  let tagline = "Autonomous general task workflow optimizer.";
  let description =
    "An intelligent virtual workforce agent pre-trained to parse instructions, establish secure connections, and operate on your behalf.";
  let tools = ["Web Browser Agent", "Notification Hook", "API Compiler"];
  let knowledge = ["ZOVA General Vector DB", "Standard Docs"];
  let workflow = [
    "Identify task constraints and context",
    "Gather web and internal references",
    "Synthesize logical solution routes",
    "Execute action pipeline and report results",
  ];
  let simulatedLogs = [
    "[10:00:00] Initialized ZOVA Virtual Agent Core.",
    "[10:00:03] Syncing target environment credentials...",
    "[10:00:05] Context synthesis active: Processing input payload.",
    "[10:00:08] Objective parsed successfully. Entering standby loop.",
    "[10:00:12] Monitoring channel for inbound request triggers...",
  ];

  if (/(wallet|portfolio|market|finance)/.test(normalized)) {
    name = "AssetWatch-Alpha";
    category = "Finance";
    tagline = "Autonomous portfolio guardian and market volatility analyzer.";
    description =
      "Continuous monitoring agent designed to scan, analyze, and flag significant changes or anomalies across active portfolios and asset feeds.";
    tools = ["Live Volatility Engine", "Security Feed Webhook", "Alert Gateway"];
    knowledge = ["Portfolio Settings DB", "Live Asset Metrics Feed"];
    workflow = [
      "Continuously poll active portfolios and asset feeds",
      "Evaluate statistical variance against baseline metrics",
      "Compile comprehensive risk and performance profiles",
      "Dispatch real-time emergency notifications via designated channels",
    ];
    simulatedLogs = [
      "[11:15:30] AssetWatch Core activated on secure port.",
      "[11:15:32] Synced successfully with portfolio data source.",
      "[11:15:35] Analyzing 24h delta across asset parameters...",
      "[11:15:38] Detected baseline fluctuation of 1.2% (within safe threshold).",
      "[11:15:42] Listening for volatility spikes...",
    ];
  } else if (/(research|analyze|news|feed)/.test(normalized)) {
    name = "NexusResearch";
    category = "Research";
    tagline = "Self-directed qualitative synthesizer and market analyst.";
    description =
      "An agent specializing in continuous information gathering, factual synthesis, and professional dossier compilation on selected target topics.";
    tools = ["Multimodal Reader API", "Factual Synthesizer Engine", "Markdown Publisher"];
    knowledge = ["Academic Vector Repositories", "Global News API"];
    workflow = [
      "Inhale search terms and target news feeds",
      "Verify source credibility and cross-reference claims",
      "Formulate concise summaries and narrative outlines",
      "Publish structured digests to your documentation repository",
    ];
    simulatedLogs = [
      "[14:22:00] NexusResearch spawning search spiders.",
      "[14:22:05] Querying public databases for target trends...",
      "[14:22:12] Retrieved 14 relevant articles. Starting synthesis...",
      "[14:22:18] Formulating outline: Eliminating duplicates and redundant claims.",
      "[14:22:25] Ready: Research digest compiled.",
    ];
  } else if (/(security|risk|protect|threat)/.test(normalized)) {
    name = "AegisSentinel";
    category = "Security";
    tagline = "Proactive vulnerability scanning and threat prevention manager.";
    description =
      "High-frequency auditing agent dedicated to continuous behavioral analysis, access control tracking, and critical security audits.";
    tools = ["Signature Scanning Toolkit", "Identity Auditor Agent", "Auto-isolation Trigger"];
    knowledge = ["Active Threat Intelligence feed", "Access History Logs"];
    workflow = [
      "Monitor event streams for aberrant behavior patterns",
      "Cross-check system signatures against active zero-day updates",
      "Calculate localized security threat index scoring",
      "Trigger instantaneous firewall isolation upon infraction detection",
    ];
    simulatedLogs = [
      "[08:02:10] AegisSentinel running micro-audits on system nodes.",
      "[08:02:12] Scan complete: No vulnerable ports found.",
      "[08:02:15] Auditing recent cross-region authentication request...",
      "[08:02:18] Authentication source confirmed: Secure JWT validated.",
      "[08:02:22] Sentinel standby. System health at 100%.",
    ];
  } else if (/(operations|automate|workflow|slack)/.test(normalized)) {
    name = "OpusCore";
    category = "Operations";
    tagline = "Multi-platform operational glue and pipeline orchestrator.";
    description =
      "An orchestrator agent built to link disconnected web tools, parse triggers, and complete complex multi-step workflows without human intervention.";
    tools = ["Multi-OAuth Router", "Dynamic Payload Parser", "Web Task Compiler"];
    knowledge = ["Workspace Organization Schemas", "Execution State Store"];
    workflow = [
      "Listen to inbound webhooks or time-based triggers",
      "Extract semantic values and parse required action payload",
      "Coordinate handshakes across external service integrations",
      "Record step success and emit execution history dashboard",
    ];
    simulatedLogs = [
      "[16:40:01] OpusCore listening on configured Workspace webhooks.",
      "[16:40:04] Inbound trigger detected from connected repository.",
      "[16:40:05] Parsing payload: Identified 3 actionable change events.",
      "[16:40:08] Relaying action tasks to Slack and Linear channels...",
      "[16:40:11] Operations workflow successfully finished. Standby.",
    ];
  }

  if (prompt.trim().length > 10 && name === "Z-Agent") {
    const cleanWord =
      prompt.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").filter((w) => w.length > 3)[0] || "Alpha";
    name = `${cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1)}Bot-V1`;
    tagline = `Customized agent for: "${prompt.substring(0, 40)}${prompt.length > 40 ? "..." : ""}"`;
  }

  return {
    name,
    tagline,
    description,
    category,
    autonomyLevel: parseFloat((95 + Math.random() * 4.8).toFixed(1)),
    tools,
    knowledge,
    workflow,
    simulatedLogs,
  };
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required and must be a string." }, { status: 400 });
    }
    // Simulate small latency so the UI compile animation feels real
    await new Promise((r) => setTimeout(r, 900));
    const agent = compileFallbackAgent(prompt);
    return NextResponse.json({ agent, source: "fallback" });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
