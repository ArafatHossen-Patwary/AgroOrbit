import { FadeIn, Section, SectionHeading } from './Section'

const reasons = [
  {
    title: 'Built for adaptation',
    text: 'Climate shifts faster than tradition alone can answer. AgroOrbit helps you explore change with clearer context.',
  },
  {
    title: 'NASA-rooted, farm-facing',
    text: 'Earth science stays accessible — translated into rotation conversations farmers can actually use.',
  },
  {
    title: 'Your priorities, not a black box',
    text: 'Strategies reflect what you value. The tool surfaces options; you stay in control of the decision.',
  },
  {
    title: 'Rotation as resilience',
    text: 'Crop sequences are a powerful lever for soil, water, and risk. We put that lever in an orbital frame.',
  },
]

export default function WhyAgroOrbit() {
  return (
    <Section id="why">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          className="mb-0"
          eyebrow="Why AgroOrbit"
          title="Precision agriculture meets climate intelligence"
          description="A modern product surface for a timeless problem: how to keep land productive as the climate around it changes."
        />

        <div className="grid gap-8 sm:grid-cols-2">
          {reasons.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="border-l border-orbit-cyan/30 pl-5">
                <h3 className="font-display text-lg font-semibold text-space-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-space-300">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  )
}
