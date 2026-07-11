'use client'

import { useCallback } from 'react'
import { ParticlesProvider, Particles } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

async function initParticles(engine: Engine) {
  await loadSlim(engine)
}

export function ParticlesBg() {
  const init = useCallback(initParticles, [])

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="hero-particles"
        className="absolute inset-0 z-[1] pointer-events-none"
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            color: { value: '#8b72ff' },
            links: {
              enable: true,
              color: '#6d4dff',
              opacity: 0.08,
              distance: 140,
              width: 0.8,
            },
            move: {
              enable: true,
              speed: 0.35,
              direction: 'none',
              random: true,
              outModes: { default: 'bounce' },
            },
            number: {
              value: 35,
              density: { enable: true, width: 900, height: 900 },
            },
            opacity: {
              value: { min: 0.06, max: 0.22 },
              animation: { enable: true, speed: 0.4 },
            },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 1.8 } },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  )
}
