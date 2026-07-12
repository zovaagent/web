'use client'

import { motion, type Variants } from 'motion/react'
import { SectionLabel } from '@/components/landing/section-label'

const features = [
  {
    index: '01',
    title: 'Wallet Intelligence',
    description:
      'Behavioral analysis for blockchain addresses — patterns, interaction frequency, historical behavior, and contextual classifications rather than raw transaction history.',
    tags: ['Behavioral scoring', 'Activity timeline', 'Entity relationships'],
  },
  {
    index: '02',
    title: 'Token Intelligence',
    description:
      'Analyze the full lifecycle of digital assets beyond market data — enabling AI systems to reason about assets, not just observe price movements.',
    tags: ['Holder behavior', 'Liquidity characteristics', 'Distribution patterns'],
  },
  {
    index: '03',
    title: 'Contract Intelligence',
    description:
      'Extract structured metadata and contextual characteristics from smart contracts to simplify machine understanding of operational logic.',
    tags: ['Deployment info', 'Permission models', 'Execution history'],
  },
  {
    index: '04',
    title: 'Risk Signals',
    description:
      'Continuously evaluate contextual indicators that may suggest elevated operational risk — anomalies, suspicious behavior, and unusual on-chain patterns.',
    tags: ['Abnormal patterns', 'Suspicious behavior', 'Liquidity anomalies'],
  },
]

const row: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export const FeaturePlatform = () => {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 mb-16">
          <SectionLabel number="03" label="Core Intelligence Modules" />
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 max-w-lg leading-tight">
            Four contextual layers of on-chain intelligence
          </h2>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed mt-1">
            Instead of delivering isolated blockchain events, each module produces structured, machine-readable understanding.
          </p>
        </div>

        <div className="border-t border-zinc-100">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={row}
              className="group grid grid-cols-1 md:grid-cols-[72px_1fr_auto] gap-6 md:gap-10 items-start border-b border-zinc-100 py-8 cursor-default transition-colors duration-200 hover:bg-zinc-50/60"
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

        {/* API callout — inline, no card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300 mb-1">API-first</p>
            <p className="text-sm text-zinc-500">
              REST API, webhooks, and SDK. Integrate blockchain intelligence into your agent pipeline with a single endpoint.
            </p>
          </div>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--zova-purple)] hover:text-[var(--zova-purple-light)] transition-colors shrink-0"
          >
            View Documentation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
