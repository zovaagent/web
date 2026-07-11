'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { SectionLabel } from '@/components/landing/section-label'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'g1',
    category: 'General',
    question: 'What is ZOVA?',
    answer:
      'ZOVA is an intelligence infrastructure platform that transforms raw blockchain data into structured context for autonomous AI systems. We provide enriched, explainable data layers so AI agents can reason and act with confidence on on-chain information.',
  },
  {
    id: 'g2',
    category: 'General',
    question: 'Which blockchains does ZOVA support?',
    answer:
      'ZOVA currently supports Solana, Ethereum, Base, Arbitrum, Sui, and Abstract — with more networks being added continuously. Our architecture is chain-agnostic by design, enabling rapid expansion to new ecosystems.',
  },
  {
    id: 't1',
    category: 'Technical',
    question: 'How does ZOVA integrate with AI agents?',
    answer:
      'ZOVA exposes a REST API and webhooks that any agent framework can consume. We return structured JSON responses optimized for LLM context windows, making it straightforward to give your agent real-time blockchain awareness with a single call.',
  },
  {
    id: 't2',
    category: 'Technical',
    question: 'What does Wallet Intelligence return?',
    answer:
      'Wallet Intelligence returns behavioral scores, activity timelines, entity classifications, counterparty graphs, asset exposure breakdowns, and risk signals — all structured and enriched for immediate machine consumption.',
  },
  {
    id: 't3',
    category: 'Technical',
    question: 'How fast is the API?',
    answer:
      'Our API delivers sub-100ms response times at P99 for most intelligence queries. Real-time event streaming via webhooks delivers sub-second latency across all supported networks.',
  },
  {
    id: 'p1',
    category: 'Pricing',
    question: 'Is there a free tier?',
    answer:
      'Yes. ZOVA offers a generous free tier for developers and researchers. You get full access to all four intelligence modules with rate limits suitable for prototyping and integration testing — no credit card required.',
  },
]

export const FaqInteractivePreview = () => {
  const [activeItem, setActiveItem] = useState<FAQItem>(FAQ_DATA[0])

  return (
    <section className="w-full py-28 bg-white border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-4">
          <SectionLabel number="06" label="FAQ" />
          <h2 className="max-w-lg text-3xl font-semibold leading-tight text-zinc-900 lg:text-4xl">
            Frequently asked questions
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">
            Everything you need to know about integrating ZOVA into your AI infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-0 border-t border-zinc-100 lg:grid-cols-[1fr_1fr]">
          {/* Question list — plain border rows */}
          <div className="border-b border-zinc-100 lg:border-b-0 lg:border-r lg:border-zinc-100 lg:pr-16">
            {FAQ_DATA.map((item) => (
              <motion.button
                key={item.id}
                onMouseEnter={() => setActiveItem(item)}
                onClick={() => setActiveItem(item)}
                className={cn(
                  'group flex w-full items-start justify-between border-b border-zinc-100 py-5 text-left transition-colors duration-150 last:border-b-0',
                  activeItem.id === item.id
                    ? 'text-zinc-900'
                    : 'text-zinc-400 hover:text-zinc-700'
                )}
              >
                <span className="pr-6 text-sm font-medium leading-snug">
                  {item.question}
                </span>
                <span
                  className={cn(
                    'mt-0.5 shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150',
                    activeItem.id === item.id
                      ? 'text-[var(--zova-purple)]'
                      : 'text-zinc-300'
                  )}
                >
                  {item.category}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Answer panel — plain, no card */}
          <div className="lg:pl-16 py-8 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gap-5 pt-5"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--zova-purple)]">
                  {activeItem.category}
                </span>
                <h3 className="text-xl font-semibold leading-snug text-zinc-900 max-w-sm">
                  {activeItem.question}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                  {activeItem.answer}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
