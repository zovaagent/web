'use client'

import { motion } from 'motion/react'
import { SectionLabel } from '@/components/landing/section-label'
import { CountUp } from '@/components/count-up'

const stats = [
  {
    value: '50M+',
    label: 'Events indexed daily',
    desc: 'Real-time ingestion across multiple networks with sub-second processing latency.',
  },
  {
    value: '<100ms',
    label: 'API response time',
    desc: 'Sub-100ms at P99 for all intelligence queries across the platform.',
  },
  {
    value: '99.9%',
    label: 'Uptime SLA',
    desc: 'Enterprise-grade reliability with redundant infrastructure across regions.',
  },
  {
    value: '10+',
    label: 'Supported networks',
    desc: 'From Solana to Ethereum — expanding continuously to new ecosystems.',
  },
]

export const BoldStats = () => {
  return (
    <section className="bg-[#07070f] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-4">
          <SectionLabel number="05" label="Scale & Performance" dark />
          <h2 className="text-3xl font-semibold tracking-tight text-white max-w-lg leading-tight">
            Infrastructure engineered for autonomous systems at production scale.
          </h2>
          <p className="text-sm text-white/40 max-w-md leading-relaxed">
            Intelligence should be reliable, verifiable, and always available —
            so autonomous agents can reason without waiting on data pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className={[
                'py-12 pr-8 flex flex-col gap-3',
                i % 2 === 1 ? 'sm:border-l sm:border-white/[0.07] sm:pl-8' : '',
                i >= 2 ? 'border-t border-white/[0.07] lg:border-t-0' : '',
                i >= 1 ? 'lg:border-l lg:border-white/[0.07] lg:pl-8' : '',
              ].join(' ')}
            >
              <p className="text-[3rem] font-semibold tracking-tighter text-white leading-none">
                <CountUp value={s.value} />
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                {s.label}
              </p>
              <p className="text-sm text-white/40 leading-relaxed max-w-[200px]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
