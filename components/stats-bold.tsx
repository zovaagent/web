'use client'

import { motion } from 'motion/react'
import { SectionLabel } from '@/components/landing/section-label'
import { CountUp } from '@/components/count-up'

const stats = [
  {
    value: '110+',
    label: 'Animation clips',
    desc: 'Walk, dance, gesture, react — looped and blended, driven by AI response.',
  },
  {
    value: '1',
    label: 'Line to embed',
    desc: '<agent-3d> web component. Drop it anywhere. Works in any framework or plain HTML.',
  },
  {
    value: '0%',
    label: 'Platform fee',
    desc: 'Keep 100% of your pay-per-call earnings during open beta. No rev-share, no cut.',
  },
  {
    value: '<10ms',
    label: 'Embed load',
    desc: 'Lazy-loaded, CDN-hosted, isolated CSS. Fastest path from tag to talking agent.',
  },
]

export const BoldStats = () => {
  return (
    <section className="bg-[#07070f] py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-4">
          <SectionLabel number="04" label="Capabilities" dark />
          <h2 className="text-3xl font-semibold tracking-tight text-white max-w-lg leading-tight">
            Every feature your agent needs.
          </h2>
          <p className="text-sm text-white/40 max-w-md leading-relaxed">
            Real numbers. Shipping today. No vaporware — each metric reflects a live system.
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
