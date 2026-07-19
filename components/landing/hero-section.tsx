'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Terminal, Sparkles, Code2, Coins } from 'lucide-react'
import { type Variants } from 'motion/react'
import { TimelineAnimation } from '@/components/timeline-animation'
import { Button } from '@/components/ui/button'
import { ParticlesBg } from '@/components/landing/particles-bg'
import { CountUp } from '@/components/count-up'

const fadeUp: Variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
  hidden: { opacity: 0, y: 20 },
}

const bullets = [
  { Icon: Sparkles, cmd: 'zova create', desc: 'Prompt or selfie into a 3D agent in about a minute' },
  { Icon: Code2,    cmd: 'zova embed',  desc: 'Two lines of HTML. Any site. Any framework.'         },
  { Icon: Coins,    cmd: 'zova earn',   desc: 'USDC per chat via x402 micropayments'                },
]

const stats = [
  { value: '110+',  label: 'Animation clips' },
  { value: '0%',    label: 'Platform fee'    },
  { value: '<10ms', label: 'Embed load'      },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: '#07070f' }}
    >
      <ParticlesBg />

      {/* Top edge fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07070f] to-transparent z-[2] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-36 pb-16">

        {/* Overline badge */}
        <TimelineAnimation
          timelineRef={sectionRef}
          animationNum={1}
          customVariants={fadeUp}
          className="inline-flex items-center gap-2.5 border border-white/10 bg-black/40 backdrop-blur px-4 py-2 text-[10px] font-semibold tracking-[0.22em] uppercase text-white/50 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6d4dff] animate-pulse" />
          <Terminal className="h-3 w-3 text-[#a78bfa]" />
          Text to 3D · Live
        </TimelineAnimation>

        {/* Headline — plain ZOVA text */}
        <TimelineAnimation
          timelineRef={sectionRef}
          as="h1"
          animationNum={2}
          customVariants={fadeUp}
          className="text-[clamp(2.8rem,8vw,5.75rem)] font-semibold tracking-[-0.04em] leading-[1.02] max-w-4xl mb-6 text-white"
        >
          The 3D agent layer
          <br />
          <span className="text-white/40">of the internet.</span>
        </TimelineAnimation>

        {/* Subtitle */}
        <TimelineAnimation
          timelineRef={sectionRef}
          as="p"
          animationNum={3}
          customVariants={fadeUp}
          className="text-white/50 text-base md:text-lg max-w-[560px] mb-10 font-light leading-relaxed"
        >
          ZOVA gives your AI a body — mesh, voice, memory, and payments —
          embeddable on any page in two lines of HTML.
        </TimelineAnimation>

        {/* Feature bullets with icons */}
        <TimelineAnimation
          timelineRef={sectionRef}
          animationNum={4}
          customVariants={fadeUp}
          className="flex flex-col items-start gap-2.5 mb-12"
        >
          {bullets.map((b, i) => (
            <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
              <span className="inline-flex size-6 items-center justify-center rounded-none border border-white/10 bg-[#6d4dff]/10">
                <b.Icon className="h-3.5 w-3.5 text-[#a78bfa]" />
              </span>
              <span className="font-mono text-white">{b.cmd}</span>
              <span className="text-white/25">·</span>
              <span className="text-white/50">{b.desc}</span>
            </div>
          ))}
        </TimelineAnimation>

        {/* CTAs */}
        <TimelineAnimation
          timelineRef={sectionRef}
          animationNum={5}
          customVariants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 items-center mb-20"
        >
          <Button
            size="lg"
            render={<Link href="#forge" />}
            nativeButton={false}
            className="bg-white text-[#07070f] hover:bg-white/90 border-0 px-8 h-11 gap-2 font-semibold text-sm"
          >
            Build your agent
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            render={<Link href="#workflow" />}
            nativeButton={false}
            className="border border-white/10 text-white/50 hover:text-white hover:bg-white/[0.05] hover:border-white/20 h-11 gap-2 px-8 text-sm"
          >
            <Terminal className="h-3.5 w-3.5" />
            See the workflow
          </Button>
        </TimelineAnimation>

        {/* Stats */}
        <TimelineAnimation
          timelineRef={sectionRef}
          animationNum={6}
          customVariants={fadeUp}
          className="flex items-center gap-12 mb-0"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-semibold tracking-tight text-white">
                <CountUp value={s.value} />
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/30">{s.label}</p>
            </div>
          ))}
        </TimelineAnimation>
      </div>
    </section>
  )
}
