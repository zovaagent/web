'use client'

import { motion, type Variants } from 'motion/react'
import { SectionLabel } from '@/components/landing/section-label'

const features = [
  {
    index: '01',
    title: 'Animations',
    description: 'Walk, dance, gesture, emote — 110+ motion clips ready to wire to any AI response or trigger.',
    tags: ['110+ clips', 'Idle loops', 'Reaction triggers'],
  },
  {
    index: '02',
    title: 'Viewer',
    description: 'WebGL rendering with zero install. Full animations, lighting, and materials — in a browser tab.',
    tags: ['WebGL', 'Lighting & materials', 'GPU-accelerated'],
  },
  {
    index: '03',
    title: 'Embed',
    description: 'Drop <zova-agent> into Notion, Ghost, WordPress, or any React/Vue/Svelte app. One tag. Any site.',
    tags: ['Web component', 'Framework-agnostic', 'Lazy-loaded'],
  },
  {
    index: '04',
    title: 'On-chain identity',
    description: 'Optionally record your agent on the blockchain. Discoverable and portable across any A2A or MCP client.',
    tags: ['Optional', 'Solana', 'Attestable'],
  },
  {
    index: '05',
    title: 'AI expression',
    description: 'Your agent reacts as it speaks, thinks, succeeds, and fails — expressions driven in real time by the AI response.',
    tags: ['Lip-sync', 'Emotion blends', 'Real-time'],
  },
  {
    index: '06',
    title: 'Widgets',
    description: '5 widget types: Turntable · Talking Agent · Animation Gallery · Agent Passport · Hotspot Tour.',
    tags: ['5 widget types', 'Embeddable', 'Configurable'],
  },
  {
    index: '07',
    title: 'SNS subdomains',
    description: 'Claim yourname.zova.sol as a Solana Name Service subdomain. Get paid by name — your agent is findable.',
    tags: ['SNS', '.zova.sol', 'Solana'],
  },
]

const row: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export const FeaturePlatform = () => {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 mb-16">
          <SectionLabel number="03" label="What you get" />
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 max-w-lg leading-tight">
            Everything an agent needs to exist in the world.
          </h2>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed mt-1">
            Every piece ships today. Use one, use all — they compose.
          </p>
        </div>

        <div className="border-t border-zinc-100">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={row}
              className="group grid grid-cols-1 md:grid-cols-[72px_1fr_auto] gap-6 md:gap-10 items-start border-b border-zinc-100 py-7 cursor-default transition-colors duration-200 hover:bg-zinc-50/60"
            >
              <span className="text-[11px] font-semibold tracking-[0.18em] text-zinc-300 mt-1 select-none">
                {f.index}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-zinc-900 group-hover:text-[var(--zova-purple)] transition-colors duration-200">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 max-w-xl">{f.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end pt-0.5">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 border border-zinc-200 px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300 mb-1">Headless API</p>
            <p className="text-sm text-zinc-500">
              JavaScript, Python, Rust SDKs. Mint, sign, attest, render, pay — Apache-2.0 licensed, available on npm.
            </p>
          </div>
          <a
            href="#docs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--zova-purple)] hover:text-[var(--zova-purple-light)] transition-colors shrink-0"
          >
            View docs
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
