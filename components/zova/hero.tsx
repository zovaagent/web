"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { InteractiveHeroCreator } from "./interactive-hero-creator";

interface HeroProps {
  onSubmitPrompt: (prompt: string) => void;
}

export function Hero({ onSubmitPrompt }: HeroProps) {
  const [prompt, setPrompt] = useState("");

  const scrollToGenerator = () => {
    const el = document.getElementById("interactive-agent-generator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMarketplace = () => {
    const el = document.getElementById("agent-marketplace");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="zova-hero"
      className="relative overflow-hidden bg-[#05050a] min-h-screen flex items-center pt-24 md:pt-28 pb-16 md:pb-20"
    >
      {/* Shader gradient backdrop — same engine as main landing, different geometry & palette */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <ShaderGradientCanvas
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          pointerEvents="none"
          pixelDensity={1}
        >
          <ShaderGradient
            animate="on"
            type="waterPlane"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.08}
            uStrength={1.6}
            uDensity={1.3}
            uFrequency={0}
            uAmplitude={0}
            positionX={-1.2}
            positionY={0}
            positionZ={0}
            rotationX={45}
            rotationY={0}
            rotationZ={50}
            color1="#4b2cd6"
            color2="#05050a"
            color3="#3ed8ff"
            reflection={0.4}
            cAzimuthAngle={180}
            cPolarAngle={80}
            cDistance={2.8}
            cameraZoom={9.1}
            lightType="3d"
            brightness={0.9}
            envPreset="city"
            grain="on"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Top + bottom edge fades so the shader blends into adjacent sections */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05050a] to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05050a] to-transparent z-[1] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#6d4dff]/10 border border-[#6d4dff]/25 text-[#a78bfa] text-[10px] md:text-[11px] px-3 py-1 font-mono uppercase tracking-[0.22em]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Create · Deploy · Scale · Intelligent Agents
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-6xl font-semibold tracking-[-0.04em] text-white leading-[0.98]">
              Build intelligent <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] via-[#8d72ff] to-[#3ed8ff]">
                agents.
              </span>
            </h1>

            <p className="text-sm md:text-base text-white/50 leading-relaxed font-light max-w-xl">
              ZOVA enables anyone to create digital agents that understand objectives, use tools,
              and operate autonomously.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToGenerator}
              className="px-6 py-3 bg-gradient-to-br from-[#6d4dff] to-[#4b2cd6] hover:from-[#7a5eff] hover:to-[#5b3ce8] text-white font-medium shadow-lg shadow-[#6d4dff]/25 transition-all text-sm cursor-pointer"
            >
              Create an Agent
            </button>
            <button
              onClick={scrollToMarketplace}
              className="px-6 py-3 bg-white/[0.04] border border-white/10 hover:bg-white/10 text-white font-medium transition-all text-sm cursor-pointer"
            >
              Explore Marketplace
            </button>
          </div>

          {/* Prompt input */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3 font-mono">
              Ready to deploy?
            </p>
            <div className="relative flex items-center">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your agent's objective..."
                className="w-full bg-white/[0.04] border border-white/10 px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6d4dff]/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && prompt.trim()) {
                    onSubmitPrompt(prompt);
                    scrollToGenerator();
                  }
                }}
              />
              <button
                onClick={() => {
                  if (prompt.trim()) onSubmitPrompt(prompt);
                  scrollToGenerator();
                }}
                className="absolute right-2 px-3.5 py-1.5 bg-white text-black text-[11px] font-bold hover:bg-white/90 transition-colors cursor-pointer uppercase tracking-[0.14em]"
              >
                Start
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-white/10 pt-6 grid grid-cols-3 gap-6">
            <div>
              <span className="text-lg md:text-xl font-mono font-bold text-white block">99.8%</span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em] mt-1 block">
                Decision Accuracy
              </span>
            </div>
            <div>
              <span className="text-lg md:text-xl font-mono font-bold text-white block">
                &lt; 500ms
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em] mt-1 block">
                Execution Latency
              </span>
            </div>
            <div>
              <span className="text-lg md:text-xl font-mono font-bold text-white block">2.1M+</span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em] mt-1 block">
                Active Deployments
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Live Preview */}
        <div className="lg:col-span-6">
          <InteractiveHeroCreator />
        </div>
      </div>
    </section>
  );
}
