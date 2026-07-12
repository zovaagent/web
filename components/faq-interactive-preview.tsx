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
      'ZOVA is an AI-native intelligence infrastructure that transforms fragmented blockchain activity into structured, contextual intelligence for autonomous systems. Rather than another analytics platform, we operate beneath applications — providing intelligence as foundational infrastructure.',
  },
  {
    id: 'g2',
    category: 'General',
    question: 'How is ZOVA different from a blockchain explorer?',
    answer:
      'Explorers and dashboards provide visibility for humans. ZOVA provides understanding for machines. Instead of visualizing information, we organize knowledge into structured representations that autonomous AI can immediately reason about — without building custom processing pipelines.',
  },
  {
    id: 'g3',
    category: 'General',
    question: 'Why is context the missing layer?',
    answer:
      'Blockchain data is optimized for verification, not understanding. Machines can observe activity without understanding its significance. Two wallets executing identical transactions may represent completely different intentions — context is what transforms identical data into different knowledge.',
  },
  {
    id: 't1',
    category: 'Technical',
    question: 'How does ZOVA integrate with AI agents?',
    answer:
      'ZOVA will expose a REST API, SDK, and webhooks that any agent framework can consume. Structured JSON responses are designed for immediate consumption by autonomous systems — enabling AI to reason about on-chain behavior with a single call.',
  },
  {
    id: 't2',
    category: 'Technical',
    question: 'What are the four core intelligence modules?',
    answer:
      'Wallet Intelligence provides behavioral analysis for addresses. Token Intelligence analyzes the full lifecycle of digital assets. Contract Intelligence extracts structured metadata from smart contracts. Risk Signals continuously evaluate contextual indicators for elevated operational risk.',
  },
  {
    id: 't3',
    category: 'Technical',
    question: 'What does the Intelligence Pipeline do?',
    answer:
      'Raw blockchain data flows through normalization, indexing, entity recognition, behavior analysis, context enrichment, and risk evaluation. Each stage increases the informational value before structured intelligence is delivered to AI applications.',
  },
  {
    id: 'r1',
    category: 'Roadmap',
    question: 'What phase is ZOVA in?',
    answer:
      'ZOVA is in Phase 01 — Foundation. This phase establishes brand identity, whitepaper, documentation, community, and initial product architecture. Phase 02 (Intelligence Engine) introduces the first generation of contextual intelligence capabilities across Wallet, Token, and Contract Intelligence.',
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
            Everything you need to know about the ZOVA intelligence layer and how it powers autonomous AI on-chain.
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
