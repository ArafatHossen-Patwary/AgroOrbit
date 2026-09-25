import { FadeIn, Section, SectionHeading } from './Section'

/**
 * Real NASA program / mission families — descriptive only, no fabricated measurements.
 */
const sources = [
  {
    name: 'Landsat',
    agency: 'NASA / USGS',
    role: 'Multispectral land imaging for vegetation, land cover, and field-scale change over time.',
  },
  {
    name: 'MODIS',
    agency: 'NASA Terra & Aqua',
    role: 'Wide-swath Earth observations supporting vegetation indices and regional environmental context.',
  },
  {
    name: 'SMAP',
    agency: 'NASA',
    role: 'Soil moisture and freeze/thaw insights that inform water availability conversations.',
  },
  {
    name: 'GPM',
    agency: 'NASA / JAXA',
    role: 'Global precipitation measurement for rainfall patterns that shape seasonal planning.',
  },
  {
    name: 'NASA Earthdata',
    agency: 'NASA EOSDIS',
    role: 'Access pathways to Earth science collections that power open, research-grade observation.',
  },
  {
    name: 'Harmonized Landsat Sentinel',
    agency: 'NASA / ESA collaboration',
    role: 'Denser optical time series for monitoring crop landscapes with greater temporal clarity.',
  },
]

export default function NasaDataSources() {
  return (
    <Section id="data-sources">
      <SectionHeading
        eyebrow="NASA data sources"
        title="Grounded in open Earth observation"
        description="AgroOrbit is designed to draw on established NASA Earth science programs. Listings below describe mission families — not live readings or sample numbers."
      />

      <ul className="divide-y divide-white/10 border-y border-white/10">
        {sources.map((source, i) => (
          <FadeIn key={source.name} delay={i * 0.05} y={12}>
            <li className="grid gap-2 py-6 sm:grid-cols-[minmax(0,220px)_minmax(0,160px)_1fr] sm:gap-6 sm:items-baseline">
              <span className="font-display text-lg font-semibold text-space-50">
                {source.name}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-orbit-cyan">
                {source.agency}
              </span>
              <span className="text-sm leading-relaxed text-space-300">
                {source.role}
              </span>
            </li>
          </FadeIn>
        ))}
      </ul>
    </Section>
  )
}
