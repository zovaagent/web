import { StaticDocsToc } from "@/components/docs/docs-toc";
import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";

/* Static doc content map — replace with MDX loader when content files are ready */
const docContent: Record<
  string,
  { title: string; toc: Array<{ id: string; title: string; level: number }>; body: React.ReactNode }
> = {
  "": introductionContent(),
  "why-zova": whyZovaContent(),
  "platform-overview": platformOverviewContent(),
  "core-architecture": coreArchitectureContent(),
  "intelligence-pipeline": intelligencePipelineContent(),
  "context-engine": contextEngineContent(),
  "wallet-intelligence": walletIntelligenceContent(),
  "token-intelligence": tokenIntelligenceContent(),
  "contract-intelligence": contractIntelligenceContent(),
  "risk-signals": riskSignalsContent(),
  "developer-platform": developerPlatformContent(),
  "dashboard": dashboardContent(),
  "api-philosophy": apiPhilosophyContent(),
  "design-principles": designPrinciplesContent(),
  "future-platform": futurePlatformContent(),
  "documentation-roadmap": documentationRoadmapContent(),
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const key = slug ? slug.join("/") : "";
  const doc = docContent[key] ?? notFoundContent(key);

  return (
    <div className="flex gap-0 min-h-full">
      {/* Main content */}
      <div className="flex-1 min-w-0 px-6 sm:px-10 lg:px-16 py-12">
        <TracingBeam>
          <article className="prose-zova max-w-3xl">
            <h1 id="title">{doc.title}</h1>
            {doc.body}
          </article>
        </TracingBeam>
      </div>

      {/* Right TOC */}
      {doc.toc.length > 0 && (
        <aside className="hidden xl:block w-56 shrink-0 py-12 pr-6">
          <div className="sticky top-20">
            <StaticDocsToc items={doc.toc} />
          </div>
        </aside>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(docContent).map((key) => ({
    slug: key === "" ? [] : key.split("/"),
  }));
}

/* ─── Content factories ─────────────────────────────────────── */

function introductionContent() {
  return {
    title: "Introduction",
    toc: [
      { id: "what-is-zova", title: "What is ZOVA?", level: 2 },
      { id: "platform-overview", title: "Platform Overview", level: 2 },
      { id: "how-zova-works", title: "How ZOVA Works", level: 2 },
    ],
    body: (
      <>
        <h2 id="what-is-zova">What is ZOVA?</h2>
        <p>
          ZOVA is an AI infrastructure platform that enables autonomous systems to better
          understand blockchain activity through structured intelligence.
        </p>
        <p>
          Instead of exposing raw on-chain data, ZOVA transforms blockchain events into
          contextual information that is easier for AI agents, developers, and decentralized
          applications to interpret.
        </p>
        <p>
          The platform is designed to bridge the gap between blockchain transparency and
          machine understanding.
        </p>

        <h2 id="platform-overview">Platform Overview</h2>
        <p>
          ZOVA functions as an intelligence layer positioned between blockchain infrastructure
          and AI applications. Instead of requiring developers to process thousands of
          blockchain events manually, ZOVA performs contextual analysis before exposing
          structured outputs.
        </p>
        <p>
          The result is a platform that allows AI agents to make faster, more informed
          decisions using enriched blockchain intelligence.
        </p>

        <h2 id="how-zova-works">How ZOVA Works</h2>
        <p>
          The platform follows a structured intelligence pipeline: raw blockchain data flows
          through normalization, indexing, entity recognition, behavior analysis, context
          enrichment, and risk evaluation — emerging as structured intelligence ready for AI
          consumption.
        </p>
        <ul>
          <li>Collect raw data from multiple blockchain networks</li>
          <li>Enrich events with behavioral and contextual analysis</li>
          <li>Expose structured intelligence via REST API, SDK, and Dashboard</li>
        </ul>
      </>
    ),
  };
}

function whyZovaContent() {
  return {
    title: "Why ZOVA Exists",
    toc: [
      { id: "the-problem", title: "The Problem", level: 2 },
      { id: "the-intelligence-gap", title: "The Intelligence Gap", level: 2 },
      { id: "why-context-matters", title: "Why Context Matters", level: 2 },
    ],
    body: (
      <>
        <h2 id="the-problem">The Problem</h2>
        <p>
          Modern blockchain networks generate millions of transactions every day. Although
          this information is publicly accessible, it remains difficult for autonomous systems
          to interpret without additional processing.
        </p>
        <p>A transaction alone does not explain:</p>
        <ul>
          <li>Why it occurred</li>
          <li>Who initiated it</li>
          <li>Whether it represents normal behavior</li>
          <li>How risky it may be</li>
          <li>How it relates to previous activities</li>
        </ul>

        <h2 id="the-intelligence-gap">The Intelligence Gap</h2>
        <p>
          Despite remarkable progress across blockchain infrastructure, one critical layer
          remains largely absent. Blockchain excels at recording events. Artificial
          intelligence excels at reasoning. Neither technology independently solves the
          problem of contextual understanding.
        </p>
        <p>
          This creates what we describe as the <strong>Blockchain Intelligence Gap</strong>.
          The gap exists because blockchain data was never designed to communicate meaning.
          It was designed to guarantee integrity.
        </p>

        <h2 id="why-context-matters">Why Context Matters</h2>
        <p>
          Context changes everything. Consider a wallet that executes fifty transactions
          within a single hour. Raw blockchain data describes activity. Context explains
          behavior.
        </p>
        <p>
          Without contextual understanding, identical transactions may represent completely
          different intentions. For autonomous systems, understanding these distinctions is
          essential.
        </p>
      </>
    ),
  };
}

function platformOverviewContent() {
  return {
    title: "Platform Overview",
    toc: [
      { id: "intelligence-layer", title: "Intelligence Layer", level: 2 },
      { id: "core-components", title: "Core Components", level: 2 },
    ],
    body: (
      <>
        <h2 id="intelligence-layer">Intelligence Layer</h2>
        <p>
          ZOVA functions as an intelligence layer positioned between blockchain infrastructure
          and AI applications. It performs contextual analysis before exposing structured
          outputs to consuming systems.
        </p>

        <h2 id="core-components">Core Components</h2>
        <p>The ZOVA platform includes four primary intelligence modules:</p>
        <ul>
          <li><strong>Wallet Intelligence</strong> — behavioral analysis for blockchain addresses</li>
          <li><strong>Token Intelligence</strong> — digital asset lifecycle analysis</li>
          <li><strong>Contract Intelligence</strong> — smart contract metadata extraction</li>
          <li><strong>Risk Signals</strong> — real-time contextual risk evaluation</li>
        </ul>
      </>
    ),
  };
}

function coreArchitectureContent() {
  return {
    title: "Core Architecture",
    toc: [
      { id: "architecture-overview", title: "Architecture Overview", level: 2 },
      { id: "layers", title: "Architecture Layers", level: 2 },
    ],
    body: (
      <>
        <h2 id="architecture-overview">Architecture Overview</h2>
        <p>
          ZOVA's architecture follows a layered design where each stage progressively
          enriches raw blockchain information into structured intelligence.
        </p>

        <h2 id="layers">Architecture Layers</h2>
        <pre><code>{`Blockchain Networks
       │
       ▼
Data Collection Layer
       │
       ▼
Data Indexing Engine
       │
       ▼
Context Processing Engine
       │
       ▼
Intelligence Engine
       │
       ▼
REST API / SDK / Dashboard
       │
       ▼
AI Agents & Applications`}</code></pre>
        <p>
          Each layer is responsible for transforming raw blockchain information into
          progressively richer intelligence.
        </p>
      </>
    ),
  };
}

function intelligencePipelineContent() {
  return {
    title: "Intelligence Pipeline",
    toc: [
      { id: "pipeline-stages", title: "Pipeline Stages", level: 2 },
      { id: "processing-stages", title: "Processing Stages", level: 2 },
    ],
    body: (
      <>
        <h2 id="pipeline-stages">Pipeline Stages</h2>
        <p>The platform follows a structured intelligence pipeline:</p>
        <pre><code>{`Raw Blockchain Data → Normalization → Indexing → Entity Recognition
→ Behavior Analysis → Context Enrichment → Risk Evaluation
→ Structured Intelligence → AI Applications`}</code></pre>

        <h2 id="processing-stages">Processing Stages</h2>
        <p>
          Each processing stage increases the informational value available to autonomous
          systems. Raw events are progressively enriched until they carry sufficient context
          for intelligent decision-making.
        </p>
      </>
    ),
  };
}

function contextEngineContent() {
  return {
    title: "Context Processing Engine",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "enrichment", title: "Contextual Enrichment", level: 2 },
    ],
    body: (
      <>
        <h2 id="overview">Overview</h2>
        <p>
          The Context Processing Engine represents the core of ZOVA. Instead of exposing
          blockchain events directly, the engine enriches each event with additional
          knowledge derived from historical activity, behavioral analysis, entity
          relationships, and network observations.
        </p>

        <h2 id="enrichment">Contextual Enrichment</h2>
        <p>
          This transformation allows AI agents to receive meaningful context rather than
          isolated blockchain events. The engine continuously processes new on-chain data
          and maintains a contextual model of all observed entities and their relationships.
        </p>
      </>
    ),
  };
}

function walletIntelligenceContent() {
  return {
    title: "Wallet Intelligence",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "capabilities", title: "Current Capabilities", level: 2 },
      { id: "future", title: "Future Capabilities", level: 2 },
    ],
    body: (
      <>
        <h2 id="overview">Overview</h2>
        <p>
          Wallet Intelligence provides behavioral analysis for blockchain addresses. Rather
          than displaying transaction history alone, ZOVA identifies patterns such as wallet
          activity, interaction frequency, historical behavior, and contextual classifications.
        </p>

        <h2 id="capabilities">Current Capabilities</h2>
        <ul>
          <li>Activity pattern analysis</li>
          <li>Interaction frequency tracking</li>
          <li>Historical behavior classification</li>
          <li>Contextual entity identification</li>
        </ul>

        <h2 id="future">Future Capabilities</h2>
        <ul>
          <li>Behavioral scoring</li>
          <li>Activity timeline visualization</li>
          <li>Wallet categorization</li>
          <li>Historical summaries</li>
          <li>Entity relationships mapping</li>
        </ul>
      </>
    ),
  };
}

function tokenIntelligenceContent() {
  return {
    title: "Token Intelligence",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "what-developers-can-understand", title: "What Developers Can Understand", level: 2 },
    ],
    body: (
      <>
        <h2 id="overview">Overview</h2>
        <p>
          Token Intelligence analyzes the lifecycle of digital assets beyond simple market
          information. This enables AI systems to reason about assets rather than merely
          observing price movements.
        </p>

        <h2 id="what-developers-can-understand">What Developers Can Understand</h2>
        <ul>
          <li>Token activity patterns</li>
          <li>Holder behavior analysis</li>
          <li>Liquidity characteristics</li>
          <li>Historical events timeline</li>
          <li>Distribution patterns</li>
        </ul>
      </>
    ),
  };
}

function contractIntelligenceContent() {
  return {
    title: "Contract Intelligence",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "metadata-extraction", title: "Metadata Extraction", level: 2 },
    ],
    body: (
      <>
        <h2 id="overview">Overview</h2>
        <p>
          Smart contracts contain valuable operational information that is often difficult to
          interpret automatically. Contract Intelligence extracts structured metadata and
          contextual characteristics to simplify machine understanding.
        </p>

        <h2 id="metadata-extraction">Metadata Extraction</h2>
        <p>Examples of extracted information include:</p>
        <ul>
          <li>Deployment information and history</li>
          <li>Contract interaction patterns</li>
          <li>Permission models and access control</li>
          <li>Execution history and frequency</li>
        </ul>
      </>
    ),
  };
}

function riskSignalsContent() {
  return {
    title: "Risk Signals",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "signal-types", title: "Signal Types", level: 2 },
    ],
    body: (
      <>
        <h2 id="overview">Overview</h2>
        <p>
          Blockchain activity constantly changes. ZOVA continuously evaluates contextual
          indicators that may suggest elevated operational risk. Risk Signals are intended to
          assist AI systems by highlighting unusual or potentially significant on-chain
          behavior.
        </p>

        <h2 id="signal-types">Signal Types</h2>
        <ul>
          <li>Abnormal transaction patterns</li>
          <li>Suspicious wallet behavior</li>
          <li>Unusual contract interactions</li>
          <li>Rapid liquidity changes</li>
          <li>Unexpected token movements</li>
        </ul>
      </>
    ),
  };
}

function developerPlatformContent() {
  return {
    title: "Developer Platform",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "planned-capabilities", title: "Planned Capabilities", level: 2 },
    ],
    body: (
      <>
        <h2 id="overview">Overview</h2>
        <p>
          ZOVA is designed primarily for developers building autonomous applications. The
          platform will provide modern interfaces for integrating blockchain intelligence into
          software products.
        </p>

        <h2 id="planned-capabilities">Planned Capabilities</h2>
        <ul>
          <li>REST API with structured intelligence endpoints</li>
          <li>Software Development Kit (SDK)</li>
          <li>Authentication system and API key management</li>
          <li>Developer dashboard and portal</li>
          <li>Comprehensive documentation</li>
          <li>Webhooks for real-time intelligence events</li>
        </ul>
      </>
    ),
  };
}

function dashboardContent() {
  return {
    title: "Dashboard",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "modules", title: "Initial Modules", level: 2 },
    ],
    body: (
      <>
        <h2 id="overview">Overview</h2>
        <p>
          The ZOVA Dashboard will serve as the primary interface for exploring blockchain
          intelligence. It provides visual access to the intelligence layer for developers
          and analysts.
        </p>

        <h2 id="modules">Initial Modules</h2>
        <ul>
          <li><strong>Wallet Explorer</strong> — analyze wallet behavior and historical activity</li>
          <li><strong>Token Explorer</strong> — view contextual token information</li>
          <li><strong>Contract Explorer</strong> — review smart contract characteristics</li>
          <li><strong>Risk Monitor</strong> — observe contextual blockchain risk indicators</li>
        </ul>
        <p>Future dashboard releases will continue expanding analytical capabilities.</p>
      </>
    ),
  };
}

function apiPhilosophyContent() {
  return {
    title: "API Philosophy",
    toc: [
      { id: "objective", title: "Objective", level: 2 },
      { id: "structured-intelligence", title: "Structured Intelligence", level: 2 },
    ],
    body: (
      <>
        <h2 id="objective">Objective</h2>
        <p>
          The purpose of the ZOVA API is not simply to expose blockchain data. Its objective
          is to expose <strong>understanding</strong>.
        </p>
        <p>
          Rather than forcing developers to interpret thousands of blockchain events, ZOVA
          delivers structured intelligence that can be consumed immediately by AI systems.
        </p>

        <h2 id="structured-intelligence">Structured Intelligence</h2>
        <p>
          Every API response is designed to carry contextual meaning — not just raw values.
          Each data point includes the behavioral context needed for autonomous systems to
          make confident decisions without additional processing.
        </p>
      </>
    ),
  };
}

function designPrinciplesContent() {
  return {
    title: "Design Principles",
    toc: [
      { id: "principles", title: "Core Principles", level: 2 },
    ],
    body: (
      <>
        <h2 id="principles">Core Principles</h2>
        <p>The ZOVA platform follows several engineering principles:</p>
        <ul>
          <li><strong>Structured Intelligence</strong> — context should always be more valuable than raw data</li>
          <li><strong>Developer First</strong> — every platform component is designed to simplify integration</li>
          <li><strong>Scalable Architecture</strong> — infrastructure should support future growth without redesigning the platform</li>
          <li><strong>Reliability</strong> — information should remain transparent, reproducible, and verifiable</li>
          <li><strong>AI Native</strong> — every system is designed specifically for autonomous intelligence</li>
        </ul>
      </>
    ),
  };
}

function futurePlatformContent() {
  return {
    title: "Future Platform",
    toc: [
      { id: "upcoming-infrastructure", title: "Upcoming Infrastructure", level: 2 },
      { id: "roadmap-phases", title: "Roadmap Phases", level: 2 },
    ],
    body: (
      <>
        <h2 id="upcoming-infrastructure">Upcoming Infrastructure</h2>
        <p>Future releases will introduce additional infrastructure including:</p>
        <ul>
          <li>AI Memory Layer</li>
          <li>Multi-chain Intelligence</li>
          <li>Agent Collaboration</li>
          <li>Enterprise APIs</li>
          <li>Advanced Risk Detection</li>
          <li>Knowledge Graph</li>
          <li>Context Graph</li>
          <li>Real-time Intelligence Streams</li>
        </ul>

        <h2 id="roadmap-phases">Roadmap Phases</h2>
        <p>ZOVA is developed through five phases:</p>
        <ul>
          <li><strong>Phase 01 — Foundation</strong>: Brand, website, whitepaper, documentation</li>
          <li><strong>Phase 02 — Intelligence Engine</strong>: Core intelligence capabilities</li>
          <li><strong>Phase 03 — Developer Platform</strong>: REST API, SDK, developer portal</li>
          <li><strong>Phase 04 — Autonomous Infrastructure</strong>: Agent context engine, AI memory layer</li>
          <li><strong>Phase 05 — Ecosystem Expansion</strong>: Enterprise, public API, agent marketplace</li>
        </ul>
      </>
    ),
  };
}

function documentationRoadmapContent() {
  return {
    title: "Documentation Roadmap",
    toc: [
      { id: "future-docs", title: "Future Documentation", level: 2 },
    ],
    body: (
      <>
        <h2 id="future-docs">Future Documentation</h2>
        <p>The documentation will evolve alongside the platform. Future versions will include:</p>
        <ul>
          <li>API Reference</li>
          <li>SDK Guide</li>
          <li>Authentication</li>
          <li>Integration Tutorials</li>
          <li>Example Applications</li>
          <li>Webhook Documentation</li>
          <li>Rate Limits</li>
          <li>Best Practices</li>
          <li>Developer Playground</li>
        </ul>
      </>
    ),
  };
}

function notFoundContent(key: string) {
  return {
    title: "Page Not Found",
    toc: [],
    body: (
      <p className="text-white/50">
        The documentation page <code>/{key}</code> does not exist yet. Check back soon.
      </p>
    ),
  };
}
