'use client'

import Link from 'next/link'
import { ZovaLogo } from '@/components/landing/zova-logo'
import { ZovaWordmark } from '@/components/landing/zova-wordmark'

export const FooterPrivilege = () => {
  return (
    <footer className="px-8 py-20 text-white">
      <div className="zova-dark-panel mx-auto grid max-w-7xl grid-cols-1 gap-12 rounded-[2rem] px-8 py-12 md:grid-cols-2 md:items-end md:px-10">
        <div>
          <h2 className="mb-4 text-6xl font-light leading-none tracking-tighter text-white lg:text-7xl">
            Build with
            <br />
            Intelligence.
          </h2>
          <div className="mt-16 flex items-center gap-3">
            <ZovaLogo size={40} idPrefix="footer-priv" />
            <ZovaWordmark height={26} className="text-white" />
          </div>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/35">
            Intelligence infrastructure for autonomous AI systems.
          </p>
        </div>

        <div className="space-y-8">
          <h2 className="text-6xl font-light leading-none tracking-tighter text-white/20 lg:text-7xl">
            Built for
            <br />
            Builders.
          </h2>
          <p className="max-w-md text-sm font-light leading-relaxed text-white/40">
            <ZovaWordmark height={12} className="inline-block align-middle" /> turns raw blockchain data into structured context that AI agents
            can reason over. REST API, webhooks, SDK — production-ready from day one.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="inline-block rounded-full bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--zova-ink)] transition-colors hover:bg-zinc-100"
            >
              Get API Access
            </Link>
            <Link
              href="/docs"
              className="inline-block rounded-full border border-white/10 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:border-white/25 hover:text-white/80"
            >
              Read Docs
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 flex max-w-7xl flex-col justify-between gap-4 border-t border-[rgba(12,18,34,0.08)] pt-8 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400 md:flex-row">
        <p className="inline-flex items-center gap-1.5">© 2025 <ZovaWordmark height={10} /> Inc.</p>
        <p>Intelligence Infrastructure · Blockchain × AI</p>
        <div className="flex items-center gap-8">
          <Link href="#" className="transition-colors hover:text-zinc-600">Privacy</Link>
          <Link href="#" className="transition-colors hover:text-zinc-600">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
