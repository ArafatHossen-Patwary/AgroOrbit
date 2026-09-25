import { useMemo, useState } from 'react'
import {
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ArrowRight, Droplets, Leaf, ShieldCheck, Sun, Thermometer, Waves } from 'lucide-react'
import { Badge, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'rotation-dna')

const rotations = [
  {
    id: 'balanced',
    label: 'Balanced rotation',
    crops: 'Rice → Lentil → Maize → Vegetables',
    values: {
      water: 56,
      soil: 82,
      climate: 72,
      diversity: 90,
      heat: 76,
      drought: 62,
    },
  },
  {
    id: 'water-smart',
    label: 'Water-smart rotation',
    crops: 'Lentil → Chickpea → Wheat → Mustard',
    values: {
      water: 86,
      soil: 79,
      climate: 78,
      diversity: 84,
      heat: 64,
      drought: 88,
    },
  },
  {
    id: 'cereal-led',
    label: 'Cereal-led rotation',
    crops: 'Rice → Wheat → Maize → Wheat',
    values: {
      water: 43,
      soil: 55,
      climate: 64,
      diversity: 42,
      heat: 74,
      drought: 55,
    },
  },
]

const dimensions = [
  { key: 'water', label: 'Water efficiency', icon: Droplets, color: 'text-orbit-blue-300', explanation: 'A comparative planning signal based on the reference water requirements of crops in the rotation.' },
  { key: 'soil', label: 'Soil benefit', icon: Leaf, color: 'text-orbit-green-300', explanation: 'Reflects crop-library soil-benefit characteristics and the presence of soil-diversifying crops.' },
  { key: 'climate', label: 'Climate resilience', icon: ShieldCheck, color: 'text-orbit-cyan', explanation: 'A combined planning view of the rotation’s documented heat and drought tolerance characteristics.' },
  { key: 'diversity', label: 'Crop diversity', icon: Waves, color: 'text-orbit-green-300', explanation: 'Reflects the number and variety of crop families represented in the selected sequence.' },
  { key: 'heat', label: 'Heat compatibility', icon: Thermometer, color: 'text-orbit-rose', explanation: 'Compares the crop-library heat-tolerance descriptors across the sequence.' },
  { key: 'drought', label: 'Drought compatibility', icon: Sun, color: 'text-orbit-amber', explanation: 'Compares the crop-library drought-tolerance descriptors across the sequence.' },
]

export default function RotationDna() {
  const [selectedId, setSelectedId] = useState(rotations[0].id)
  const selected = rotations.find((rotation) => rotation.id === selectedId) || rotations[0]
  const chartData = useMemo(() => dimensions.map((dimension) => ({
    subject: dimension.label,
    value: selected.values[dimension.key],
    fullMark: 100,
  })), [selected])

  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="See the shape of a rotation through transparent, derived planning indicators—not official NASA measurements."
    >
      <div className="space-y-6">
        <GlassCard className="overflow-hidden border-orbit-cyan/20 bg-gradient-to-br from-orbit-blue-500/10 via-space-900/80 to-orbit-green-500/10" padding="lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="orbit">Rotation fingerprint</Badge>
                <Badge variant="warning">DERIVED INDICATOR</Badge>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-space-50">Compare rotation DNA</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-space-300">Each axis is a 0–100 comparative indicator derived from crop-library characteristics and rotation structure. It is not a crop-yield forecast or an official NASA measurement.</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orbit-cyan/20 bg-orbit-cyan/10 text-orbit-cyan"><Waves className="h-8 w-8" /></div>
          </div>
        </GlassCard>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Rotations">
          {rotations.map((rotation) => (
            <button
              key={rotation.id}
              type="button"
              role="tab"
              aria-selected={selected.id === rotation.id}
              onClick={() => setSelectedId(rotation.id)}
              className={`rounded-xl border px-4 py-2.5 text-left transition ${selected.id === rotation.id ? 'border-orbit-cyan/50 bg-orbit-cyan/10 text-orbit-cyan' : 'border-white/10 bg-space-900/50 text-space-300 hover:border-white/20 hover:text-space-100'}`}
            >
              <span className="block text-sm font-semibold">{rotation.label}</span>
              <span className="mt-0.5 block text-[11px] text-space-500">{rotation.crops}</span>
            </button>
          ))}
        </div>

        <div className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)]">
          <GlassCard className="relative overflow-hidden border-orbit-cyan/20 bg-space-900/55" padding="lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.08),transparent_60%)]" />
            <div className="relative flex items-start justify-between gap-3">
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-cyan">Central visualization</p><h3 className="mt-1 font-display text-xl font-semibold text-space-50">{selected.label}</h3><p className="mt-1 text-sm text-space-400">{selected.crops}</p></div>
              <Badge variant="warning">DERIVED INDICATOR</Badge>
            </div>
            <div className="relative mx-auto mt-4 h-[390px] w-full max-w-2xl">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={chartData}>
                  <PolarGrid stroke="#ffffff22" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} />
                  <Radar name="Derived indicator" dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.25} strokeWidth={2} />
                  <Tooltip formatter={(value) => [`${value}/100`, 'Derived indicator']} contentStyle={{ background: '#0b1220', border: '1px solid #ffffff1a', borderRadius: 12, color: '#e2e8f0' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="relative text-center text-xs leading-relaxed text-space-500">Higher values indicate stronger compatibility within this comparison model. They do not represent measured field performance.</p>
          </GlassCard>

          <GlassCard className="border-white/10 bg-space-900/55" padding="lg">
            <div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-green-300">Reading the shape</p><h3 className="mt-1 font-display text-xl font-semibold text-space-50">Indicator explanations</h3></div><Badge variant="warning">DERIVED INDICATOR</Badge></div>
            <div className="space-y-4">
              {dimensions.map((dimension) => {
                const Icon = dimension.icon
                const value = selected.values[dimension.key]
                return <div key={dimension.key} className="border-b border-white/10 pb-4 last:border-0 last:pb-0"><div className="flex items-start gap-3"><Icon className={`mt-0.5 h-4 w-4 shrink-0 ${dimension.color}`} /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="text-sm font-medium text-space-100">{dimension.label}</p><span className="font-display text-sm text-orbit-cyan">{value}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-orbit-blue-500 to-orbit-cyan" style={{ width: `${value}%` }} /></div><p className="mt-2 text-xs leading-relaxed text-space-500">{dimension.explanation}</p></div></div></div>
              })}
            </div>
          </GlassCard>
        </div>

        <GlassCard className="border-orbit-amber/20 bg-orbit-amber/5" padding="lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start"><div className="rounded-xl bg-orbit-amber/10 p-2.5 text-orbit-amber"><ShieldCheck className="h-5 w-5" /></div><div><h3 className="font-display text-lg font-semibold text-space-50">Transparent interpretation</h3><p className="mt-1 text-sm leading-relaxed text-space-300">Rotation DNA is a visual summary for comparing plans. The current visualization is based on crop reference descriptors and sequence structure. NASA data may provide environmental context elsewhere, but this radar chart is not an official NASA score and should not be used as a scientifically validated yield prediction.</p></div></div>
        </GlassCard>
      </div>
    </PageContainer>
  )
}
