import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRight,
  Droplets,
  Info,
  Leaf,
  Scale,
  ShieldCheck,
  Sprout,
  Sun,
  Thermometer,
} from 'lucide-react'
import { Badge, Button, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'compare')

const rotations = [
  {
    id: 'a',
    label: 'Rotation A',
    sequence: ['Rice', 'Lentil', 'Maize'],
    tone: '#22d3ee',
    values: { water: 54, soil: 82, climate: 72, diversity: 78, heat: 76, drought: 61, alignment: 74 },
    tradeoff: 'Lower water compatibility in exchange for a stronger cereal and legume sequence.',
    rationale: [
      {
        category: 'NASA OBSERVED',
        text: 'NASA-derived precipitation and temperature baselines suggest this field is in a moderate-risk moisture range for a water-intensive cereal sequence.',
      },
      {
        category: 'USER INPUT',
        text: 'Water conservation has a high priority in your profile, so this rotation is less favorable for dry-season resilience.',
      },
      {
        category: 'CROP DATABASE',
        text: 'The selected rotation contains a legume crop, which can improve soil structure and nutrient balance, but the cereal component still raises water demand.',
      },
      {
        category: 'DERIVED',
        text: 'AgroOrbit combines crop water needs, soil benefit, and priority weights to estimate a balanced but not water-optimized plan.',
      },
      {
        category: 'SIMULATED',
        text: 'This explanation reflects the current scenario assumptions; if rainfall drops or heat rises, the trade-off may become more pronounced.',
      },
    ],
  },
  {
    id: 'b',
    label: 'Rotation B',
    sequence: ['Rice', 'Mustard', 'Vegetable'],
    tone: '#10b981',
    values: { water: 63, soil: 68, climate: 75, diversity: 88, heat: 70, drought: 68, alignment: 81 },
    tradeoff: 'Higher diversity and farmer-priority alignment, with a different soil-benefit profile.',
    rationale: [
      {
        category: 'NASA OBSERVED',
        text: 'NASA-derived baseline conditions are compatible with a more diverse rotation, especially where soil conditions are moderate and variable.',
      },
      {
        category: 'USER INPUT',
        text: 'Your profile values crop diversity and climate resilience, which supports the broader mix of crops in this sequence.',
      },
      {
        category: 'CROP DATABASE',
        text: 'The rotation includes crops with different root patterns and nutrient demands, which changes the soil and seasonal profile compared with a cereal-heavy plan.',
      },
      {
        category: 'DERIVED',
        text: 'AgroOrbit shows stronger diversity and alignment signals here, while the soil-benefit score remains more moderate than the legume-heavy option.',
      },
      {
        category: 'SIMULATED',
        text: 'The simulation assumes average climate stress, but a wetter or drier scenario could shift the balance between diversity and water demand.',
      },
    ],
  },
  {
    id: 'c',
    label: 'Rotation C',
    sequence: ['Rice', 'Chickpea', 'Maize'],
    tone: '#fbbf24',
    values: { water: 71, soil: 79, climate: 80, diversity: 72, heat: 82, drought: 78, alignment: 77 },
    tradeoff: 'Stronger heat and drought compatibility, while offering less sequence diversity than Rotation B.',
    rationale: [
      {
        category: 'NASA OBSERVED',
        text: 'Environmental baselines suggest this field can support a more resilient sequence where heat and drought tolerance matter more than pure diversity.',
      },
      {
        category: 'USER INPUT',
        text: 'If your priorities emphasize climate resilience and water efficiency, this rotation responds well to those preferences.',
      },
      {
        category: 'CROP DATABASE',
        text: 'The selected crops provide a useful balance of drought tolerance and soil-building benefits, with moderate diversity compared with other options.',
      },
      {
        category: 'DERIVED',
        text: 'AgroOrbit gives this rotation a stronger climate and drought profile, but not the same crop-diversity signal as the more varied sequence.',
      },
      {
        category: 'SIMULATED',
        text: 'These values remain scenario-dependent and should be understood as planning guidance rather than a guaranteed performance outcome.',
      },
    ],
  },
]

const metrics = [
  { key: 'water', label: 'Water compatibility', icon: Droplets },
  { key: 'soil', label: 'Soil benefit', icon: Leaf },
  { key: 'climate', label: 'Climate compatibility', icon: ShieldCheck },
  { key: 'diversity', label: 'Crop diversity', icon: Sprout },
  { key: 'heat', label: 'Heat compatibility', icon: Thermometer },
  { key: 'drought', label: 'Drought compatibility', icon: Sun },
  { key: 'alignment', label: 'Farmer-priority alignment', icon: Scale },
]

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState(['a', 'b', 'c'])
  const selected = rotations.filter((rotation) => selectedIds.includes(rotation.id))

  const radarData = useMemo(
    () =>
      metrics.map((metric) => {
        const row = { subject: metric.label, fullMark: 100 }
        selected.forEach((rotation) => {
          row[rotation.id] = rotation.values[metric.key]
        })
        return row
      }),
    [selected],
  )

  const barData = useMemo(
    () =>
      metrics.map((metric) => {
        const row = { metric: metric.label }
        selected.forEach((rotation) => {
          row[rotation.id] = rotation.values[metric.key]
        })
        return row
      }),
    [selected],
  )

  const toggleRotation = (id) => {
    setSelectedIds((current) => {
      if (current.includes(id)) return current.length === 1 ? current : current.filter((value) => value !== id)
      if (current.length >= 3) return current
      return [...current, id]
    })
  }

  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="Compare up to three rotation plans side by side. The goal is to make trade-offs visible, not to declare one universally best rotation."
    >
      <div className="space-y-6">
        <GlassCard
          className="border-orbit-cyan/20 bg-gradient-to-br from-orbit-cyan/10 via-space-900/80 to-orbit-green-500/10"
          padding="lg"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="orbit">Decision support</Badge>
                <Badge variant="warning">DERIVED INDICATORS</Badge>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-space-50">
                Compare rotation trade-offs
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-space-300">
                Explore how different sequences behave across the comparison model. Values are transparent planning indicators, not universal rankings or yield predictions.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orbit-cyan/20 bg-orbit-cyan/10 text-orbit-cyan">
              <Scale className="h-8 w-8" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="bg-space-900/55" padding="lg">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-400">
                Rotation selector
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-space-50">
                Choose up to three plans
              </h3>
            </div>
            <span className="text-xs text-space-500">{selected.length}/3 selected</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {rotations.map((rotation) => {
              const active = selectedIds.includes(rotation.id)
              return (
                <button
                  key={rotation.id}
                  type="button"
                  onClick={() => toggleRotation(rotation.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active ? 'border-white/25 bg-white/5' : 'border-white/10 bg-space-950/40 opacity-65 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold text-space-50">
                        {rotation.label}
                      </p>
                      <p className="mt-1 text-sm text-space-300">
                        {rotation.sequence.join(' → ')}
                      </p>
                    </div>
                    <span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: rotation.tone }} />
                  </div>
                  <Badge className="mt-4" variant={active ? 'success' : 'default'}>
                    {active ? 'Included' : 'Add to compare'}
                  </Badge>
                </button>
              )
            })}
          </div>
        </GlassCard>

        <div className="grid gap-6 xl:grid-cols-2">
          <GlassCard className="border-orbit-cyan/20 bg-space-900/55" padding="lg">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-cyan">
                Radar comparison
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-space-50">
                Indicator profiles
              </h3>
            </div>
            <div className="h-[390px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="68%">
                  <PolarGrid stroke="#ffffff22" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#0b1220',
                      border: '1px solid #ffffff1a',
                      borderRadius: 12,
                    }}
                  />
                  <Legend />
                  {selected.map((rotation) => (
                    <Radar
                      key={rotation.id}
                      name={rotation.label}
                      dataKey={rotation.id}
                      stroke={rotation.tone}
                      fill={rotation.tone}
                      fillOpacity={0.12}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="border-orbit-green-500/20 bg-space-900/55" padding="lg">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-green-300">
                Bar comparison
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-space-50">
                Metric-by-metric view
              </h3>
            </div>
            <div className="h-[390px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: 12, right: 16 }}>
                  <CartesianGrid stroke="#ffffff12" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis type="category" dataKey="metric" width={125} tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#0b1220',
                      border: '1px solid #ffffff1a',
                      borderRadius: 12,
                    }}
                  />
                  <Legend />
                  {selected.map((rotation) => (
                    <Bar
                      key={rotation.id}
                      dataKey={rotation.id}
                      name={rotation.label}
                      fill={rotation.tone}
                      radius={[0, 5, 5, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-amber">
              Timeline cards
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-space-50">
              Sequence context
            </h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {selected.map((rotation) => (
              <GlassCard key={rotation.id} className="border-white/10 bg-space-900/55" padding="lg">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-display text-lg font-semibold text-space-50">
                    {rotation.label}
                  </h4>
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: rotation.tone }} />
                </div>

                <div className="mt-5 space-y-3">
                  {rotation.sequence.map((crop, index) => (
                    <div key={`${rotation.id}-${crop}`} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-space-950 text-xs text-orbit-cyan">
                        {index + 1}
                      </div>
                      <div className="flex-1 rounded-xl border border-white/10 bg-space-950/50 px-3 py-2 text-sm text-space-100">
                        {crop}
                      </div>
                      {index < rotation.sequence.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-space-600" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-orbit-cyan/15 bg-orbit-cyan/5 p-3">
                  <p className="text-xs leading-relaxed text-space-300">{rotation.tradeoff}</p>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-space-950/50 p-3">
                  <div className="flex items-center gap-2 text-orbit-cyan">
                    <Info className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                      Why This Rotation?
                    </p>
                  </div>
                  <div className="mt-3 space-y-3">
                    {rotation.rationale.map((item) => (
                      <div key={`${rotation.id}-${item.category}`} className="rounded-xl border border-white/10 bg-space-900/60 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-space-400">
                          {item.category}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-space-300">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <GlassCard className="border-orbit-amber/20 bg-orbit-amber/5" padding="lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="rounded-xl bg-orbit-amber/10 p-2.5 text-orbit-amber">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-space-50">
                Trade-offs, not a universal winner
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-space-300">
                Rotation A may have lower water demand under this scenario, while Rotation B provides a different soil-benefit and diversity profile. Rotation C may offer stronger drought and heat compatibility. The appropriate choice depends on the farmer’s priorities, resources, and local context.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  )
}
