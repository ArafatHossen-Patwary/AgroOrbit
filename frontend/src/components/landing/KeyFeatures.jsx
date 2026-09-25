import {
  Compass,
  MapPinned,
  RefreshCcw,
  Shield,
  Sprout,
  Telescope,
} from 'lucide-react'
import { FadeIn, Section, SectionHeading } from './Section'

const features = [
  {
    icon: MapPinned,
    title: 'Field-centered exploration',
    text: 'Start from your place on Earth — not a generic regional average.',
  },
  {
    icon: Telescope,
    title: 'Earth observation context',
    text: 'Bring NASA mission perspectives into the way you read land and season.',
  },
  {
    icon: Sprout,
    title: 'Crop-aware guidance',
    text: 'Rotation ideas respect crop characteristics and what your soils can carry.',
  },
  {
    icon: Compass,
    title: 'Priority-driven paths',
    text: 'Weight resilience goals so recommendations match how you farm.',
  },
  {
    icon: RefreshCcw,
    title: 'Rotation scenarios',
    text: 'Compare sequences side by side before you commit the next cycle.',
  },
  {
    icon: Shield,
    title: 'Climate-forward mindset',
    text: 'Designed for tomorrow’s risk — drought, heat, and shifting seasons.',
  },
]

export default function KeyFeatures() {
  return (
    <Section id="features" className="border-y border-white/5 bg-space-950/40">
      <SectionHeading
        eyebrow="Key features"
        title="Everything you need to explore resilient rotations"
        description="A focused toolkit for discovery. Built to feel like a modern climate product — calm, clear, and serious about the land."
      />

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, i) => {
          const Icon = item.icon
          return (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orbit-green-500/20 to-orbit-blue-500/20 text-orbit-green-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-space-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-space-300">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </Section>
  )
}
