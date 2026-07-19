'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { SectionLabel } from '@/components/landing/section-label'

interface StackPiece {
  id: string
  number: string
  name: string
  tagline: string
  description: string
}

const STACK: StackPiece[] = [
  {
    id: 's1',
    number: '01',
    name: 'Studio',
    tagline: 'Selfie to agent in seconds.',
    description:
      'Browser-native, GPU-accelerated avatar creation — no software to install. Type a prompt or snap a selfie and get a rigged, animated 3D character ready to talk.',
  },
  {
    id: 's2',
    number: '02',
    name: 'Registry',
    tagline: 'Optional blockchain identity.',
    description:
      'Agents discoverable, portable, and attestable across any A2A or MCP client. Record ownership on-chain or keep it off-chain — your choice. SNS subdomain (.threews.sol) included.',
  },
  {
    id: 's3',
    number: '03',
    name: 'Embed',
    tagline: 'One tag. Any host.',
    description:
      '<agent-3d> web component. Works in React, Vue, Svelte, and plain HTML. Lazy-loaded, isolated CSS, CDN-hosted globally. Voice, memory, and payments are built-in — zero config needed.',
  },
  {
    id: 's5',
    number: '04',
    name: 'Walk',
    tagline: 'Multiplayer 3D worlds.',
    description:
      'CRDT-synced avatar positions, spatial voice, joystick control — in one embed tag. Drop a Walk world into any page and your visitors move through it as their own avatar alongside yours.',
  },
  {
    id: 's6',
    number: '05',
    name: 'SDK',
    tagline: 'JavaScript, Python, Rust.',
    description:
      'Mint, sign, attest, render, pay. Apache-2.0 licensed. Available on npm, PyPI, and crates.io. Full API reference in the Developer Hub. Bring your own LLM, voice, or data source.',
  },
]

export const FaqInteractivePreview = () => {
  const [active, setActive] = useState<StackPiece>(STACK[0])

  return (
    <section className="w-full py-28 bg-white border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-4">
          <SectionLabel number="07" label="The stack" />
          <h2 className="max-w-lg text-3xl font-semibold leading-tight text-zinc-900 lg:text-4xl">
            Five pieces. One layer.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">
            Every component is open, real, and shipping today. Use one. Use all. They compose.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-0 border-t border-zinc-100 lg:grid-cols-[1fr_1fr]">
          {/* Piece list */}
          <div className="border-b border-zinc-100 lg:border-b-0 lg:border-r lg:border-zinc-100 lg:pr-16">
            {STACK.map((piece) => (
              <motion.button
                key={piece.id}
                onMouseEnter={() => setActive(piece)}
                onClick={() => setActive(piece)}
                className={cn(
                  'group flex w-full items-start justify-between border-b border-zinc-100 py-5 text-left transition-colors duration-150 last:border-b-0',
                  active.id === piece.id
                    ? 'text-zinc-900'
                    : 'text-zinc-400 hover:text-zinc-700'
                )}
              >
                <div className="flex items-start gap-4 pr-6">
                  <span className={cn(
                    'mt-0.5 text-[10px] font-semibold tracking-[0.18em] shrink-0 transition-colors duration-150',
                    active.id === piece.id ? 'text-[#6d4dff]' : 'text-zinc-300'
                  )}>
                    {piece.number}
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-snug">{piece.name}</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{piece.tagline}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'mt-0.5 shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150',
                    active.id === piece.id
                      ? 'text-[#6d4dff]'
                      : 'text-zinc-300'
                  )}
                >
                  {active.id === piece.id ? '→' : ''}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:pl-16 py-8 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gap-5 pt-5"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6d4dff]">
                  {active.number} · {active.name}
                </span>
                <h3 className="text-xl font-semibold leading-snug text-zinc-900 max-w-sm">
                  {active.tagline}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
