import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  CloudRain,
  Droplets,
  Leaf,
  Loader2,
  RefreshCw,
  Satellite,
  Sun,
  Thermometer,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge, Button, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { getFields } from '../../services/fieldService'
import { getNASAObservations, NASA_VARIABLES } from '../../services/nasaService'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'nasa-intelligence')
const DEFAULT_LOCATION = { latitude: 23.8103, longitude: 90.4125 }

const METRICS = [
  {
    key: 'temperature',
    variable: NASA_VARIABLES.temperature,
    label: 'Temperature',
    icon: Thermometer,
    color: '#fb7185',
    description: 'Near-surface air temperature',
    unavailable: false,
  },
  {
    key: 'precipitation',
    variable: NASA_VARIABLES.precipitation,
    label: 'Precipitation',
    icon: CloudRain,
    color: '#38bdf8',
    description: 'Bias-corrected daily precipitation',
    unavailable: false,
  },
  {
    key: 'soilMoisture',
    variable: 'SMAP_SOIL_MOISTURE',
    label: 'Soil moisture',
    icon: Droplets,
    color: '#a78bfa',
    description: 'Requires a SMAP provider connection',
    unavailable: true,
  },
  {
    key: 'vegetation',
    variable: 'MODIS_VEGETATION',
    label: 'Vegetation indicator',
    icon: Leaf,
    color: '#34d399',
    description: 'Requires a MODIS vegetation provider connection',
    unavailable: true,
  },
  {
    key: 'solar',
    variable: NASA_VARIABLES.solar,
    label: 'Solar / meteorological',
    icon: Sun,
    color: '#fbbf24',
    description: 'All-sky surface solar irradiance',
    unavailable: false,
  },
]

function dateRange() {
  const end = new Date()
  end.setDate(end.getDate() - 1)
  const start = new Date(end)
  start.setDate(start.getDate() - 13)
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  }
}

export default function NasaIntelligence() {
  const [observations, setObservations] = useState([])
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [status, setStatus] = useState('loading')
  const [sourceStatus, setSourceStatus] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setStatus('loading')
    setError('')
    try {
      const fields = await getFields()
      const field = fields[0]
      const nextLocation = field
        ? { latitude: Number(field.latitude), longitude: Number(field.longitude) }
        : DEFAULT_LOCATION
      setLocation(nextLocation)
      const result = await getNASAObservations({
        ...nextLocation,
        ...dateRange(),
        variables: Object.values(NASA_VARIABLES),
      })
      setObservations(result.observations)
      setSourceStatus(result)
      setStatus('ready')
    } catch (requestError) {
      setStatus('error')
      setError(
        requestError.userMessage ||
          'NASA data could not be loaded. The backend returned no live or cached observations.',
      )
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const grouped = useMemo(() => {
    return Object.fromEntries(
      METRICS.map((metric) => [
        metric.key,
        observations
          .filter((observation) => observation.variable === metric.variable)
          .sort((a, b) => a.observation_date.localeCompare(b.observation_date)),
      ]),
    )
  }, [observations])

  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="NASA-derived observations for your selected field. Values are never simulated."
      actions={
        <Button
          size="sm"
          variant="secondary"
          leftIcon={status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          onClick={load}
          disabled={status === 'loading'}
        >
          Refresh observations
        </Button>
      }
    >
      <div className="space-y-6">
        <GlassCard className="overflow-hidden border-orbit-blue-500/20 bg-gradient-to-br from-orbit-blue-500/10 via-space-900/70 to-orbit-green-500/10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="rounded-2xl bg-orbit-blue-500/15 p-3 text-orbit-cyan">
                <Satellite className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-cyan">Earth observation signal</p>
                <h2 className="mt-1 font-display text-xl font-semibold text-space-50">Field climate context</h2>
                <p className="mt-1 text-sm text-space-300">
                  {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}° · Latest 14-day window
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {sourceStatus?.cached ? <Badge variant="warning">NASA OBSERVED · CACHED</Badge> : <Badge variant="success">NASA OBSERVED</Badge>}
              {sourceStatus?.status === 'live' && <CheckCircle2 className="h-4 w-4 text-orbit-green-300" />}
            </div>
          </div>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-space-400">
            Source: NASA POWER Daily Point API. Soil moisture and vegetation cards remain explicitly unavailable until SMAP and MODIS providers are connected; no proxy or simulated values are shown.
          </p>
        </GlassCard>

        {status === 'error' && (
          <div role="alert" className="flex items-start gap-3 rounded-2xl border border-orbit-rose/30 bg-orbit-rose/10 p-4 text-sm text-orbit-rose">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div><p className="font-semibold">NASA data unavailable</p><p className="mt-1 text-orbit-rose/80">{error}</p></div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {METRICS.map((metric) => (
            <MetricCard key={metric.key} metric={metric} observations={grouped[metric.key]} loading={status === 'loading'} />
          ))}
        </div>

        <HowNASAHelps />

        <div className="flex flex-wrap items-center gap-2 text-xs text-space-500">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>Observations are daily and may be delayed by the source provider.</span>
          {sourceStatus?.endpoint && <span>· Backend source: NASA POWER</span>}
        </div>
      </div>
    </PageContainer>
  )
}

function MetricCard({ metric, observations, loading }) {
  const Icon = metric.icon
  const latest = observations?.[observations.length - 1]
  const previous = observations?.[observations.length - 2]
  const trend = latest && previous ? latest.value - previous.value : null
  const chartData = observations?.map((item) => ({
    date: item.observation_date.slice(5),
    value: Number(item.value),
  })) || []

  return (
    <GlassCard className="min-w-0 overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="rounded-xl p-2" style={{ color: metric.color, backgroundColor: `${metric.color}18` }}><Icon className="h-5 w-5" /></span>
          <div><h3 className="font-display font-semibold text-space-50">{metric.label}</h3><p className="text-xs text-space-500">{metric.description}</p></div>
        </div>
        {!metric.unavailable && <Badge variant="success" size="sm">NASA OBSERVED</Badge>}
      </div>

      {loading ? <div className="mt-8 h-28 animate-pulse rounded-xl bg-white/5" /> : metric.unavailable ? (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-space-950/40 p-4"><p className="text-sm font-medium text-space-300">Not available yet</p><p className="mt-1 text-xs leading-relaxed text-space-500">No NASA observation is displayed for this metric. Connect the {metric.key === 'soilMoisture' ? 'SMAP' : 'MODIS'} provider to enable it.</p></div>
      ) : latest ? (
        <>
          <div className="mt-5 flex items-end justify-between gap-2"><div><span className="font-display text-3xl font-bold" style={{ color: metric.color }}>{formatValue(latest.value)}</span><span className="ml-1 text-sm text-space-400">{latest.unit}</span></div>{trend !== null && <span className={`text-xs font-semibold ${trend >= 0 ? 'text-orbit-green-300' : 'text-orbit-rose'}`}>{trend >= 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(2)} vs prior</span>}</div>
          <p className="mt-1 text-xs text-space-500">Observed {latest.observation_date} · {latest.source}</p>
          <div className="mt-4 h-28"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id={`fill-${metric.key}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={metric.color} stopOpacity={0.35} /><stop offset="95%" stopColor={metric.color} stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#ffffff12" vertical={false} /><XAxis dataKey="date" hide /><YAxis hide domain={['auto', 'auto']} /><Tooltip contentStyle={{ background: '#0b1220', border: '1px solid #ffffff1a', borderRadius: 10, fontSize: 12 }} labelStyle={{ color: '#94a3b8' }} /><Area type="monotone" dataKey="value" stroke={metric.color} fill={`url(#fill-${metric.key})`} strokeWidth={2} dot={false} /></AreaChart></ResponsiveContainer></div>
          <p className="mt-2 text-[11px] text-space-500">Trend uses the latest two available observations.</p>
        </>
      ) : <div className="mt-6 rounded-xl border border-dashed border-white/10 p-4 text-sm text-space-500">No observation returned for this metric.</div>}
    </GlassCard>
  )
}

function formatValue(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function HowNASAHelps() {
  return <section className="rounded-2xl border border-white/10 bg-space-900/55 p-5 shadow-soft sm:p-6"><div className="mb-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-green-300">Interpretation guide</p><h2 className="mt-1 font-display text-2xl font-semibold text-space-50">How NASA Data Helps</h2><p className="mt-2 max-w-3xl text-sm text-space-400">These observations provide context for analysis. They are not, by themselves, a diagnosis or a crop recommendation.</p></div><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">{[
    ['🌡', 'Temperature', 'Helps identify heat or cool periods that can affect crop development and planting timing.'],
    ['🌧', 'Precipitation', 'Helps describe recent wetness and rainfall gaps when considering field access or irrigation planning.'],
    ['💧', 'Soil moisture', 'When connected through SMAP, it can add regional surface-moisture context; it is not yet available here.'],
    ['🌱', 'Vegetation', 'When connected through MODIS, it can help compare vegetation response over time; it is not yet available here.'],
    ['☀️', 'Solar / meteorological', 'Solar energy context can help explain evapotranspiration pressure and seasonal growing conditions.'],
  ].map(([emoji, title, text]) => <div key={title} className="rounded-xl border border-white/10 bg-space-950/45 p-4"><span className="text-xl">{emoji}</span><h3 className="mt-3 font-display text-sm font-semibold text-space-100">{title}</h3><p className="mt-1.5 text-xs leading-relaxed text-space-400">{text}</p></div>)}</div></section>
}
