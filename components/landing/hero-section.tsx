'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import { type Variants } from 'motion/react'
import { TimelineAnimation } from '@/components/timeline-animation'
import { Button } from '@/components/ui/button'
import { ParticlesBg } from '@/components/landing/particles-bg'
import { CountUp } from '@/components/count-up'
import { ZovaWordmark } from '@/components/landing/zova-wordmark'
const fadeUp: Variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
  hidden: { opacity: 0, y: 20 },
}

const stats = [
  { value: '50M+', label: 'Events indexed daily' },
  { value: '<100ms', label: 'API response time' },
  { value: '10+', label: 'Supported networks' },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: '#07070f' }}
    >
      {/* Shader gradient — ZOVA purple sphere, right-positioned */}
      <div className="absolute inset-0 z-0">
        <ShaderGradientCanvas
          style={{ width: '100%', height: '100%' }}
          pointerEvents="none"
          pixelDensity={1}
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.15}
            uStrength={0.5}
            uDensity={1.0}
            uFrequency={5.5}
            uAmplitude={3.0}
            positionX={0.6}
            positionY={0.1}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={50}
            color1="#6d4dff"
            color2="#07070f"
            color3="#1a0838"
            reflection={0.25}
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={13}
            lightType="env"
            brightness={0.8}
            envPreset="city"
            grain="on"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Particles */}
      <ParticlesBg />

      {/* Top edge fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07070f] to-transparent z-[2] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-36 pb-16">

        {/* Overline */}
        <TimelineAnimation
          timelineRef={sectionRef}
          animationNum={1}
          customVariants={fadeUp}
          className="inline-flex items-center gap-2.5 border border-white/10 px-4 py-2 text-[10px] font-semibold tracking-[0.22em] uppercase text-white/40 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6d4dff] animate-pulse" />
          Zone of Virtual Economy &middot; Blockchain x AI
        </TimelineAnimation>

        {/* Headline */}
        <TimelineAnimation
          timelineRef={sectionRef}
          as="h1"
          animationNum={2}
          customVariants={fadeUp}
          className="text-[clamp(2.8rem,8vw,5.75rem)] font-semibold tracking-[-0.04em] leading-[1.02] max-w-4xl mb-6 text-white"
        >
          Zone of Virtual
          <br />
          <span className="text-white/35">Autonomy.</span>
        </TimelineAnimation>

        {/* Subtitle */}
        <TimelineAnimation
          timelineRef={sectionRef}
          as="p"
          animationNum={3}
          customVariants={fadeUp}
          className="text-white/50 text-base md:text-lg max-w-[540px] mb-12 font-light leading-relaxed"
        >
          The platform where intelligent systems understand, reason, and act
          across decentralized environments.
        </TimelineAnimation>

        {/* CTAs */}
        <TimelineAnimation
          timelineRef={sectionRef}
          animationNum={4}
          customVariants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 items-center mb-20"
        >
          <Button
            size="lg"
            render={<Link href="#" />}
            nativeButton={false}
            className="bg-white text-[#07070f] hover:bg-white/90 border-0 px-8 h-11 gap-2 font-semibold text-sm"
          >
            Enter <ZovaWordmark height={12} className="inline-block align-[-0.1em] ml-1 text-[#07070f]" />
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            render={<Link href="/docs" />}
            nativeButton={false}
            className="border border-white/10 text-white/50 hover:text-white hover:bg-white/[0.05] hover:border-white/20 h-11 gap-2 px-8 text-sm"
          >
            <FileText className="h-4 w-4" />
            Documentation
          </Button>
        </TimelineAnimation>

        {/* Stats */}
        <TimelineAnimation
          timelineRef={sectionRef}
          animationNum={5}
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
