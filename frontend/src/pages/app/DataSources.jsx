import { ArrowUpRight, Database, Droplets, Sparkles, Sprout, SunMedium, User } from 'lucide-react'
import { Badge, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'data-sources')

const nasaDatasets = [
  {
    name: 'NASA POWER Daily Point',
    officialSource: 'NASA Langley Research Center POWER Project',
    sourceUrl: 'https://power.larc.nasa.gov/',
    variable: 'PRECTOTCORR',
    measure: 'Corrected precipitation total',
    use: 'Baseline rainfall signal for rotation analysis, field stress checks, and scenario testing.',
    observationDate: 'Stored per observation_date from the NASA POWER record',
    units: 'mm/day',
    status: 'Implemented',
  },
  {
    name: 'NASA POWER Daily Point',
    officialSource: 'NASA Langley Research Center POWER Project',
    sourceUrl: 'https://power.larc.nasa.gov/',
    variable: 'T2M',
    measure: 'Temperature at 2 meters',
    use: 'Baseline temperature context for climate compatibility, water stress, and heat/drought analysis.',
    observationDate: 'Stored per observation_date from the NASA POWER record',
    units: 'K (displayed in °C in the UI)',
    status: 'Implemented',
  },
  {
    name: 'NASA POWER Daily Point',
    officialSource: 'NASA Langley Research Center POWER Project',
    sourceUrl: 'https://power.larc.nasa.gov/',
    variable: 'ALLSKY_SFC_SW_DWN',
    measure: 'All-sky surface shortwave downward irradiance',
    use: 'Environmental context for solar and climate stress inputs in the derived rotation assessment.',
    observationDate: 'Stored per observation_date from the NASA POWER record',
    units: 'MJ/m²/day',
    status: 'Implemented',
  },
]

const categoryBlocks = [
  {
    id: 'nasa',
    label: 'NASA DATA',
    icon: Droplets,
    tone: 'info',
    description: 'External environmental observations used as the baseline context for the field.',
    items: nasaDatasets,
  },
  {
    id: 'crop',
    label: 'CROP DATABASE',
    icon: Sprout,
    tone: 'success',
    description: 'Internal reference data describing crop characteristics and agronomic suitability.',
    items: [
      {
        name: 'AgroOrbit Crop Reference Library',
        officialSource: 'Internal AgroOrbit crop database',
        variable: 'Crop profile fields',
        measure: 'Water requirement, heat tolerance, drought tolerance, soil benefit, nutrient demand, seasons, suitability',
        use: 'Used to compare crop characteristics against soil and environmental conditions during rotation planning.',
        observationDate: 'Record date depends on crop database maintenance',
        units: 'Categorical + agronomic descriptors',
        status: 'Implemented',
        sourceUrl: null,
      },
    ],
  },
  {
    id: 'user',
    label: 'USER INPUT',
    icon: User,
    tone: 'success',
    description: 'Farmer and field inputs that shape the rotation decision context.',
    items: [
      {
        name: 'Field soil profile',
        officialSource: 'User-entered field record',
        variable: 'Soil type, pH, organic matter, nutrients, drainage, irrigation',
        measure: 'Field-specific conditions that affect crop fit and soil benefit.',
        use: 'Provides local soil constraints and opportunities for crop compatibility scoring.',
        observationDate: 'Captured when the farmer saves a field or soil profile',
        units: 'Structured field values',
        status: 'Implemented',
        sourceUrl: null,
      },
      {
        name: 'Farmer priorities',
        officialSource: 'User-entered preference model',
        variable: 'Water conservation, soil improvement, yield stability, economic return, climate resilience, crop diversity',
        measure: 'Relative priorities used to weight rotation decision factors.',
        use: 'Shapes the weighted compatibility index and explains why one rotation may be more suitable than another.',
        observationDate: 'Captured at the time a farmer updates priorities',
        units: 'Normalized preference weights',
        status: 'Implemented',
        sourceUrl: null,
      },
    ],
  },
  {
    id: 'derived',
    label: 'DERIVED ANALYSIS',
    icon: Database,
    tone: 'warning',
    description: 'Indicator logic calculated from the environmental and crop profile inputs.',
    items: [
      {
        name: 'Rotation Compatibility Index',
        officialSource: 'AgroOrbit heuristic calculation',
        variable: 'Water compatibility, soil benefit, climate compatibility, crop diversity, heat compatibility, drought compatibility, farmer-priority alignment',
        measure: 'A normalized planning score built from weighted, transparent indicator values.',
        use: 'Supports rotation comparison and trade-off explanations without claiming a validated crop yield outcome.',
        observationDate: 'Calculated at analysis time',
        units: '0–100 scale',
        status: 'Implemented',
        sourceUrl: null,
      },
    ],
  },
  {
    id: 'simulation',
    label: 'SIMULATION',
    icon: Sparkles,
    tone: 'warning',
    description: 'Hypothetical scenario logic that adjusts environmental assumptions for planning exploration.',
    items: [
      {
        name: 'What If? Climate Scenario Layer',
        officialSource: 'AgroOrbit scenario engine',
        variable: 'Temperature delta, rainfall shift, water stress profile, extreme rainfall profile',
        measure: 'User-defined adjustments applied to the baseline environmental conditions.',
        use: 'Runs a simulated comparison against the baseline and shows before/after scenario results.',
        observationDate: 'Scenario date is user-defined and not a NASA forecast',
        units: 'Scenario percentage and °C deltas',
        status: 'Implemented',
        sourceUrl: null,
      },
      {
        name: 'Future time-sequence planning layer',
        officialSource: 'AgroOrbit timeline scenario model',
        variable: '2026–2030 field assumptions',
        measure: 'Historical, current, and hypothetical future rotation states across a time axis.',
        use: 'Models change over time while keeping simulated future values clearly separated from NASA observations.',
        observationDate: 'User-defined planning horizon',
        units: 'Year-by-year scenario state',
        status: 'Implemented',
        sourceUrl: null,
      },
    ],
  },
]

function DataSourceCard({ item }) {
  return (
    <GlassCard className="border-white/10 bg-space-900/55" padding="lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">{item.name}</p>
          <h3 className="mt-2 font-display text-xl font-semibold text-space-50">{item.variable}</h3>
        </div>
        <Badge variant={item.status === 'Implemented' ? 'success' : 'warning'}>{item.status}</Badge>
      </div>

      <div className="mt-4 space-y-3 text-sm text-space-300">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-space-500">Official NASA source</p>
          <p className="mt-1 text-space-200">{item.officialSource}</p>
          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-orbit-cyan underline-offset-4 hover:underline"
            >
              Open source <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-space-500">What it measures</p>
          <p className="mt-1 text-space-200">{item.measure}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-space-500">How AgroOrbit uses it</p>
          <p className="mt-1 text-space-200">{item.use}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-space-500">Observation date</p>
          <p className="mt-1 text-space-200">{item.observationDate}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-space-500">Units</p>
          <p className="mt-1 text-space-200">{item.units}</p>
        </div>
      </div>
    </GlassCard>
  )
}

export default function DataSources() {
  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="Transparent inventory of the data and logic that informs the AgroOrbit planning experience."
    >
      <div className="space-y-8">
        {categoryBlocks.map((category) => {
          const Icon = category.icon
          return (
            <section key={category.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-space-900/60 text-orbit-cyan">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">
                    {category.label}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-space-50">
                    {category.description}
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {category.items.map((item) => (
                  <DataSourceCard key={`${category.id}-${item.name}-${item.variable}`} item={item} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </PageContainer>
  )
}
