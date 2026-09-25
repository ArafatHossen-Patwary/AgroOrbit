import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CloudRain,
  Orbit,
  Sprout,
  SunMedium,
  Thermometer,
  TimerReset,
} from 'lucide-react'
import { Badge, Button, GlassCard, MetricCard, Slider } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'field-time-machine')

const yearTimeline = [
  {
    year: 2026,
    label: 'NASA OBSERVED',
    badge: 'NASA OBSERVED',
    source: 'Historical observations',
    temperature: 24.1,
    rainfall: 100,
    moisture: 'Stable',
    rotation: 'Maize → Soybean',
    stress: 'Low',
    summary: 'Baseline conditions from historical NASA POWER observations and field records.',
  },
  {
    year: 2027,
    label: 'USER INPUT',
    badge: 'USER INPUT',
    source: 'Current conditions',
    temperature: 24.8,
    rainfall: 92,
    moisture: 'Slightly lower',
    rotation: 'Maize → Soybean → Wheat',
    stress: 'Moderate',
    summary: 'User-adjusted conditions based on the current field plan and local decisions.',
  },
  {
    year: 2028,
    label: 'SIMULATED',
    badge: 'SIMULATED',
    source: 'Hypothetical future scenario',
    temperature: 25.6,
    rainfall: 84,
    moisture: 'Reduced',
    rotation: 'Wheat → Sorghum → Soybean',
    stress: 'Moderate',
    summary: 'Future scenario simulation using the baseline plus a user-defined warming profile.',
  },
  {
    year: 2029,
    label: 'SIMULATED',
    badge: 'SIMULATED',
    source: 'Hypothetical future scenario',
    temperature: 26.4,
    rainfall: 76,
    moisture: 'Elevated stress',
    rotation: 'Soybean → Sorghum → Millet',
    stress: 'High',
    summary: 'A projected adaptation case for hotter and drier growing conditions.',
  },
  {
    year: 2030,
    label: 'SIMULATED',
    badge: 'SIMULATED',
    source: 'Hypothetical future scenario',
    temperature: 27.2,
    rainfall: 68,
    moisture: 'High stress',
    rotation: 'Soybean → Cover Crop → Millet',
    stress: 'High',
    summary: 'Long-range scenario for planning resilience; not a NASA prediction.',
  },
]

const getBadgeTone = (badge) => {
  if (badge === 'NASA OBSERVED') return 'info'
  if (badge === 'USER INPUT') return 'success'
  return 'warning'
}

export default function FieldTimeMachine() {
  const [selectedYear, setSelectedYear] = useState(2028)

  const selected = useMemo(
    () => yearTimeline.find((entry) => entry.year === selectedYear) || yearTimeline[0],
    [selectedYear],
  )

  const range = { min: 2026, max: 2030 }
  const percent = ((selectedYear - range.min) / (range.max - range.min)) * 100

  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="Explore chronological field conditions across NASA-observed history, current decisions, and simulated future scenarios."
    >
      <div className="space-y-6">
        <GlassCard className="relative overflow-hidden border-orbit-cyan/20 bg-gradient-to-br from-space-900 via-space-900 to-orbit-blue-500/10" padding="lg">
          <motion.div
            className="pointer-events-none absolute -right-14 top-0 flex h-40 w-40 items-center justify-center rounded-full border border-orbit-cyan/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          >
            <div className="h-24 w-24 rounded-full border border-orbit-green-400/20" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute -left-12 bottom-0 flex h-32 w-32 items-center justify-center rounded-full border border-orbit-green-400/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <div className="h-16 w-16 rounded-full border border-orbit-cyan/20" />
          </motion.div>

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="orbit">Time machine</Badge>
                <Badge variant={getBadgeTone(selected.badge)}>{selected.badge}</Badge>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-space-50 sm:text-3xl">
                Explore the field through time
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-space-300">
                Historical observations, user-driven planning inputs, and hypothetical future simulations are shown in separate layers. Simulated values are not NASA predictions.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-space-900/60 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orbit-cyan/10 text-orbit-cyan">
                <Orbit className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-space-500">Selected year</p>
                <p className="font-display text-xl font-semibold text-space-50">{selected.year}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="bg-space-900/55" padding="lg">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">Timeline</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-space-50">Chronological exploration</h3>
            </div>
            <Badge variant="warning">SIMULATED</Badge>
          </div>

          <div className="rounded-2xl border border-white/10 bg-space-950/60 p-4">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-space-500">
              <span>2026</span>
              <span>2030</span>
            </div>
            <Slider
              label="Year"
              min={range.min}
              max={range.max}
              step={1}
              value={selectedYear}
              showValue={false}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
            />
            <div className="mt-5 grid grid-cols-5 gap-2">
              {yearTimeline.map((entry) => (
                <button
                  key={entry.year}
                  type="button"
                  onClick={() => setSelectedYear(entry.year)}
                  className={`rounded-xl border px-3 py-2 text-center transition ${selected.year === entry.year ? 'border-orbit-cyan/40 bg-orbit-cyan/10 text-orbit-cyan' : 'border-white/10 bg-space-900/50 text-space-300 hover:border-white/20'}`}
                >
                  <div className="text-[10px] uppercase tracking-[0.2em]">{entry.year}</div>
                  <div className="mt-2 text-[9px] font-medium">{entry.label}</div>
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <GlassCard className="bg-space-900/55" padding="lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">Current layer</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-space-50">{selected.year}</h3>
              </div>
              <Badge variant={getBadgeTone(selected.badge)} size="lg">{selected.badge}</Badge>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Temperature" value={selected.temperature.toFixed(1)} unit="°C" icon={<Thermometer className="h-4 w-4" />} className="min-h-[150px]" />
              <MetricCard label="Rainfall" value={selected.rainfall} unit="%" icon={<CloudRain className="h-4 w-4" />} className="min-h-[150px]" />
              <MetricCard label="Moisture" value={selected.moisture} unit="" icon={<TimerReset className="h-4 w-4" />} className="min-h-[150px]" />
              <MetricCard label="Rotation" value={selected.rotation.split(' → ').length} unit="crops" icon={<Sprout className="h-4 w-4" />} className="min-h-[150px]" />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-space-950/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">Field status</p>
                  <p className="mt-2 font-display text-xl text-space-50">{selected.source}</p>
                </div>
                <Badge variant={selected.badge === 'NASA OBSERVED' ? 'info' : selected.badge === 'USER INPUT' ? 'success' : 'warning'}>{selected.stress} stress</Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-space-300">{selected.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="default">{selected.rotation}</Badge>
                <Badge variant="default">Stress: {selected.stress}</Badge>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-space-900/55" padding="lg">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">Source markers</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-space-50">Layer audit</h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'NASA OBSERVED',
                  value: 'Historical observations where available',
                  tone: 'info',
                  detail: 'Baseline data from NASA-derived environmental records.',
                },
                {
                  title: 'USER INPUT',
                  value: 'Current operational decisions',
                  tone: 'success',
                  detail: 'Farmer-entered field assumptions and planning edits.',
                },
                {
                  title: 'SIMULATED',
                  value: 'Hypothetical future conditions',
                  tone: 'warning',
                  detail: 'Scenario planning only — not a NASA forecast or measured prediction.',
                },
              ].map((entry) => (
                <div key={entry.title} className="rounded-2xl border border-white/10 bg-space-950/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-space-100">{entry.title}</p>
                    <Badge variant={entry.tone}>{entry.value}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-space-400">{entry.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-orbit-amber/20 bg-orbit-amber/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-amber">Important note</p>
              <p className="mt-2 text-sm leading-relaxed text-space-300">
                Future scenario values are presented as user-defined planning hypotheses and are clearly labeled as simulated. They should not be interpreted as NASA predictions.
              </p>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="border-orbit-cyan/20 bg-space-900/55" padding="lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">Next action</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-space-50">Review the full planning sequence</h3>
            </div>
            <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Compare scenario layers
            </Button>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  )
}
