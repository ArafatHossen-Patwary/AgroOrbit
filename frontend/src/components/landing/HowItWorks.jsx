import { FadeIn, Section, SectionHeading } from './Section'

const steps = [
  {
    step: '01',
    title: 'Frame your field',
    text: 'Describe the place you farm — boundaries, soil story, and what this season needs to protect.',
  },
  {
    step: '02',
    title: 'Bring Earth data into view',
    text: 'Layer NASA Earth observation context with crop traits so rotation ideas sit in a real climate picture.',
  },
  {
    step: '03',
    title: 'Set your priorities',
    text: 'Signal what matters most: water resilience, soil health, risk balance, or market flexibility.',
  },
  {
    step: '04',
    title: 'Explore rotation paths',
    text: 'Compare resilient crop-rotation strategies shaped by orbit-scale insight and your local goals.',
  },
]

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-space-950/50">
      <SectionHeading
        eyebrow="How it works"
        title="From satellite vantage to field strategy"
        description="A clear path from curiosity to informed rotation choices — designed for exploration, not prescription."
      />

      <ol className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-orbit-green-500/40 to-transparent lg:block"
          aria-hidden
        />
        {steps.map((item, i) => (
          <FadeIn key={item.step} delay={i * 0.1}>
            <li className="relative px-1 py-6 lg:px-4">
              <span className="font-display text-4xl font-bold text-orbit-green-500/30">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-space-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-space-300">
                {item.text}
              </p>
            </li>
          </FadeIn>
        ))}
      </ol>
    </Section>
  )
}
