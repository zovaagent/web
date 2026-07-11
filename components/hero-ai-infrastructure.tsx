'use client'
import { useRef } from 'react'
import { ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'
import { type Variants } from 'motion/react'
import { TimelineAnimation } from '@/components/timeline-animation'
import { Button } from '@/components/ui/button'
import {
  NetworkSolana,
  NetworkSui,
  NetworkBase,
  NetworkArbitrumOne,
  NetworkEthereum,
  NetworkAbstract,
} from '@web3icons/react'

const fadeUp: Variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  }),
  hidden: { opacity: 0, y: 16 },
}

const chains = [
  { label: 'Solana', Icon: NetworkSolana },
  { label: 'Sui', Icon: NetworkSui },
  { label: 'Base', Icon: NetworkBase },
  { label: 'Arbitrum', Icon: NetworkArbitrumOne },
  { label: 'Ethereum', Icon: NetworkEthereum },
  { label: 'Abstract', Icon: NetworkAbstract },
]

export const HeroAiInfrastructure = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={timelineRef}
      className="relative min-h-screen flex flex-col bg-white text-zinc-900 w-full overflow-hidden"
    >
      {/* Subtle ambient — CSS only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(124, 58, 237, 0.05) 0%, transparent 65%)',
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 80%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">

        {/* Overline badge */}
        <TimelineAnimation
          timelineRef={timelineRef}
          animationNum={1}
          customVariants={fadeUp}
          className="inline-flex items-center gap-2 border border-zinc-200 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-zinc-400 mb-10"
        >
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
          Intelligence Layer · Blockchain × AI
        </TimelineAnimation>

        {/* Headline */}
        <TimelineAnimation
          timelineRef={timelineRef}
          as="h1"
          animationNum={2}
          customVariants={fadeUp}
          className="text-[clamp(2.75rem,8vw,5.5rem)] font-semibold tracking-tight leading-[1.04] max-w-4xl mb-6 text-zinc-950"
        >
          Intelligence Infrastructure
          <br />
          <span className="text-zinc-400">for Autonomous AI.</span>
        </TimelineAnimation>

        {/* Sub */}
        <TimelineAnimation
          timelineRef={timelineRef}
          as="p"
          animationNum={3}
          customVariants={fadeUp}
          className="text-zinc-500 text-base md:text-lg max-w-[480px] mb-10 font-light leading-relaxed"
        >
          ZOVA transforms raw on-chain data into structured context, memory, and
          understanding — purpose-built for autonomous AI systems.
        </TimelineAnimation>

        {/* Buttons */}
        <TimelineAnimation
          timelineRef={timelineRef}
          animationNum={4}
          customVariants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <Button
            size="lg"
            render={<Link href="#" />}
            nativeButton={false}
            className="bg-zinc-900 text-white hover:bg-zinc-800 border-0 px-7 h-11 gap-2 font-semibold text-sm"
          >
            Enter ZOVA
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            render={<Link href="/docs" />}
            nativeButton={false}
            className="border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 h-11 gap-2 px-7 text-sm"
          >
            <FileText className="h-4 w-4" />
            Documentation
          </Button>
        </TimelineAnimation>
      </div>

      {/* Bottom — chain trust strip */}
      <div className="relative z-10 border-t border-zinc-200/70 pb-14">
        <TimelineAnimation
          timelineRef={timelineRef}
          as="p"
          animationNum={5}
          customVariants={fadeUp}
          className="text-zinc-400 text-[10px] font-semibold tracking-[0.24em] uppercase text-center mt-10 mb-8"
        >
          Built for leading blockchain networks
        </TimelineAnimation>
        <div className="flex flex-wrap justify-center items-center gap-10 px-6">
          {chains.map(({ label, Icon }, i) => (
            <TimelineAnimation
              key={label}
              timelineRef={timelineRef}
              animationNum={6 + i}
              customVariants={fadeUp}
              className="opacity-40 hover:opacity-70 transition-opacity duration-200 cursor-default"
              title={label}
            >
              <Icon size={30} variant="branded" />
            </TimelineAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
