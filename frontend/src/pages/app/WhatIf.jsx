import { useMemo, useState } from 'react'
import { ArrowRight, CloudRain, Droplets, Gauge, Leaf, ShieldCheck, ThermometerSun } from 'lucide-react'
import { Badge, Button, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'what-if')

const baseline = {
  water: 84,
  climate: 78,
  soil: 76,
  rotationIndex: 81,
  temperature: 24,
  rainfall: 100,
  stress: 'Low',
}

const scenarios = [
  {
    id: 'current',
    label: 'Current conditions',
    summary: 'Baseline environment from NASA-derived observations',
    tempDelta: 0,
    rainfallDelta: 0,
    stress: 'Low',
    waterShift: 0,
    climateShift: 0,
    soilShift: 0,
    indexShift: 0,
  },
  {
    id: 'plus-1c',
    label: '+1°C temperature',
    summary: 'Gradual warming signal with moderate stress on crop water use',
    tempDelta: 1,
    rainfallDelta: 0,
    stress: 'Moderate',
    waterShift: -6,
    climateShift: -8,
    soilShift: -3,
    indexShift: -6,
  },
  {
    id: 'plus-2c',
    label: '+2°C temperature',
    summary: 'Higher heat stress driving elevated evapotranspiration',
    tempDelta: 2,
    rainfallDelta: 0,
    stress: 'High',
    waterShift: -12,
    climateShift: -15,
    soilShift: -6,
    indexShift: -12,
  },
  {
    id: 'rain-20',
    label: '20% lower rainfall',
    summary: 'Reduced precipitation across the rotation window',
    tempDelta: 0,
    rainfallDelta: -20,
    stress: 'Moderate',
    waterShift: -16,
    climateShift: -11,
    soilShift: -7,
    indexShift: -13,
  },
  {
    id: 'rain-30',
    label: '30% lower rainfall',
    summary: 'Substantial moisture deficit affecting water-sensitive crops',
    tempDelta: 0,
    rainfallDelta: -30,
    stress: 'High',
    waterShift: -25,
    climateShift: -18,
    soilShift: -11,
    indexShift: -19,
  },
  {
    id: 'water-stress',
    label: 'Increased water stress',
    summary: 'A sustained dry-season pressure scenario with reduced soil moisture retention',
    tempDelta: 0.5,
    rainfallDelta: -15,
    stress: 'Extreme',
    waterShift: -30,
    climateShift: -20,
    soilShift: -15,
    indexShift: -24,
  },
  {
    id: 'extreme-rain',
    label: 'Extreme rainfall',
    summary: 'High-intensity rainfall with elevated runoff risk and soil disruption',
    tempDelta: 0,
    rainfallDelta: 25,
    stress: 'High',
    waterShift: -18,
    climateShift: -22,
    soilShift: -10,
    indexShift: -17,
  },
]

const clamp = (value) => Math.min(100, Math.max(0, value))

function getScenarioOutcome(scenario) {
  return {
    water: clamp(baseline.water + scenario.waterShift),
    climate: clamp(baseline.climate + scenario.climateShift),
    soil: clamp(baseline.soil + scenario.soilShift),
    rotationIndex: clamp(baseline.rotationIndex + scenario.indexShift),
    temperature: baseline.temperature + scenario.tempDelta,
    rainfall: baseline.rainfall + scenario.rainfallDelta,
    stress: scenario.stress,
  }
}

export default function WhatIf() {
  const [selectedId, setSelectedId] = useState(scenarios[0].id)
  const [hasRerun, setHasRerun] = useState(false)

  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedId) ?? scenarios[0]

  const before = useMemo(
    () => ({
      label: 'Before scenario',
      metrics: baseline,
      scenario: 'Baseline conditions',
    }),
    [],
  )

  const after = useMemo(() => {
    const outcome = getScenarioOutcome(selectedScenario)

    return {
      label: 'After scenario',
      metrics: outcome,
      scenario: selectedScenario.label,
    }
  }, [selectedScenario])

  const comparisonRows = [
    {
      key: 'water',
      label: 'Water compatibility',
      before: before.metrics.water,
      after: after.metrics.water,
      icon: Droplets,
      tone: 'text-orbit-blue-300',
    },
    {
      key: 'climate',
      label: 'Climate compatibility',
      before: before.metrics.climate,
      after: after.metrics.climate,
      icon: ShieldCheck,
      tone: 'text-orbit-cyan',
    },
    {
      key: 'soil',
      label: 'Soil benefit',
      before: before.metrics.soil,
      after: after.metrics.soil,
      icon: Leaf,
      tone: 'text-orbit-green-300',
    },
    {
      key: 'rotationIndex',
      label: 'Rotation Compatibility Index',
      before: before.metrics.rotationIndex,
      after: after.metrics.rotationIndex,
      icon: Gauge,
      tone: 'text-orbit-amber',
    },
  ]

  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="Test hypothetical climate stressors against your baseline rotation plan. These are simulated scenario outputs, not NASA forecasts."
    >
      <div className="space-y-6">
        <GlassCard className="border-orbit-cyan/20 bg-gradient-to-br from-orbit-blue-500/10 via-space-900/80 to-orbit-green-500/10" padding="lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="orbit">Climate simulator</Badge>
                <Badge variant="warning">SIMULATED SCENARIO</Badge>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-space-50">Stress-test the rotation</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-space-300">
                This workspace modifies the environmental inputs used by the rotation analysis engine and re-runs the comparison against the NASA-derived baseline observations. It does not represent an official NASA forecast.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orbit-cyan/20 bg-orbit-cyan/10 text-orbit-cyan">
              <CloudRain className="h-8 w-8" />
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)]">
          <GlassCard className="bg-space-900/55" padding="lg">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">Scenario presets</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-space-50">Select a stress profile</h3>
            </div>

            <div className="space-y-2">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(scenario.id)
                    setHasRerun(true)
                  }}
                  className={`w-full rounded-2xl border p-3 text-left transition ${selectedId === scenario.id ? 'border-orbit-cyan/50 bg-orbit-cyan/10' : 'border-white/10 bg-space-900/70 hover:border-white/20'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-space-100">{scenario.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-space-400">{scenario.summary}</p>
                    </div>
                    <Badge variant={selectedId === scenario.id ? 'info' : 'default'} size="sm">
                      {selectedId === scenario.id ? 'Active' : 'Preset'}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-orbit-amber/20 bg-orbit-amber/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-amber">Scenario inputs</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-space-900/60 p-3">
                  <div className="flex items-center gap-2 text-space-400">
                    <ThermometerSun className="h-4 w-4 text-orbit-amber" />
                    <span className="text-xs uppercase tracking-wide">Temperature</span>
                  </div>
                  <p className="mt-2 font-display text-xl text-space-50">{after.metrics.temperature.toFixed(1)}°C</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-space-900/60 p-3">
                  <div className="flex items-center gap-2 text-space-400">
                    <CloudRain className="h-4 w-4 text-orbit-blue-300" />
                    <span className="text-xs uppercase tracking-wide">Rainfall</span>
                  </div>
                  <p className="mt-2 font-display text-xl text-space-50">{after.metrics.rainfall}%</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-space-900/60 px-3 py-2">
                <span className="text-xs uppercase tracking-wide text-space-400">Stress level</span>
                <Badge
                  variant={
                    after.metrics.stress === 'Extreme'
                      ? 'danger'
                      : after.metrics.stress === 'High'
                        ? 'warning'
                        : 'success'
                  }
                >
                  {after.metrics.stress}
                </Badge>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-space-900/55" padding="lg">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">Simulation result</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-space-50">{selectedScenario.label}</h3>
              </div>
              <Badge variant="warning">SIMULATED SCENARIO</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-space-950/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-green-300">Before scenario</p>
                <div className="mt-4 space-y-3">
                  {comparisonRows.map((row) => (
                    <div key={`before-${row.key}`} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-space-300">
                        <row.icon className={`h-4 w-4 ${row.tone}`} />
                        <span className="text-sm">{row.label}</span>
                      </div>
                      <span className="font-display text-lg text-space-50">{row.before}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-orbit-cyan/20 bg-orbit-cyan/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-cyan">After scenario</p>
                <div className="mt-4 space-y-3">
                  {comparisonRows.map((row) => (
                    <div key={`after-${row.key}`} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-space-300">
                        <row.icon className={`h-4 w-4 ${row.tone}`} />
                        <span className="text-sm">{row.label}</span>
                      </div>
                      <span className="font-display text-lg text-orbit-cyan">{row.after}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-space-900/60 p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-space-400">Result status</p>
                <p className="mt-1 text-sm text-space-200">
                  {hasRerun ? 'Rotation analysis rerun complete.' : 'Ready to rerun rotation analysis.'}
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => setHasRerun(true)}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Rerun analysis
              </Button>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="border-orbit-amber/20 bg-orbit-amber/5" padding="lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="rounded-xl bg-orbit-amber/10 p-2.5 text-orbit-amber">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-space-50">Interpretation</h3>
              <p className="mt-1 text-sm leading-relaxed text-space-300">
                These values represent a hypothetical scenario simulation based on NASA-derived baseline observations. They are designed for decision support and planning discussion, not as official NASA forecasts or field-measured outcomes.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  )
}
