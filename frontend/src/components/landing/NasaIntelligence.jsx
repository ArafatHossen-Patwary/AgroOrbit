import { motion } from 'framer-motion'
import { Globe2, Layers, RadioTower, Waves } from 'lucide-react'
import { FadeIn, Section, SectionHeading } from './Section'

const pillars = [
  {
    icon: Globe2,
    title: 'Orbit to acre',
    text: 'Earth-observing missions watch landscapes at scale. AgroOrbit brings that vantage into decisions about a single field.',
  },
  {
    icon: Waves,
    title: 'Soil & moisture context',
    text: 'Local soil character and moisture patterns shape what rotations can sustain — satellite signals help frame the question.',
  },
  {
    icon: Layers,
    title: 'Crop & rotation lens',
    text: 'Crop traits and sequence choices meet climate pressure. Explore options before committing seed and season.',
  },
  {
    icon: RadioTower,
    title: 'Farmer priorities first',
    text: 'Resilience is personal. Yield, water, risk, and market goals guide which strategies deserve a closer look.',
  },
]

export default function NasaIntelligence() {
  return (
    <Section id="nasa-intelligence" className="border-t border-white/5">
      <SectionHeading
        eyebrow="NASA Earth Intelligence"
        title="See your land through the orbit that watches Earth"
        description="AgroOrbit is built around the idea that farmers should explore adaptation with the same Earth-system intelligence NASA uses to study our changing planet — without replacing local knowledge."
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          {pillars.map((item, i) => {
            const Icon = item.icon
            return (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="flex gap-4">
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orbit-blue-500/25 bg-orbit-blue-500/10 text-orbit-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-space-50">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-space-300 sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.15} className="relative">
          <div className="relative aspect-square max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-space-900/40 lg:ml-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.25),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.2),transparent_45%)]" />
            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Abstract field grid */}
              {Array.from({ length: 8 }).map((_, r) =>
                Array.from({ length: 8 }).map((_, c) => (
                  <rect
                    key={`${r}-${c}`}
                    x={48 + c * 38}
                    y={48 + r * 38}
                    width="34"
                    height="34"
                    rx="4"
                    fill={
                      (r + c) % 3 === 0
                        ? 'rgba(16,185,129,0.35)'
                        : (r + c) % 3 === 1
                          ? 'rgba(14,165,233,0.22)'
                          : 'rgba(255,255,255,0.04)'
                    }
                    stroke="rgba(255,255,255,0.06)"
                  />
                )),
              )}
              <motion.rect
                x="40"
                width="320"
                height="36"
                fill="url(#scan)"
                animate={{ y: [40, 320, 40] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <circle
                cx="200"
                cy="200"
                r="120"
                fill="none"
                stroke="rgba(34,211,238,0.25)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
            </svg>
            <p className="absolute bottom-5 left-5 right-5 text-sm text-space-300">
              Conceptual field view — connecting satellite observation patterns
              with on-farm decisions. No sample measurements shown.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  )
}
