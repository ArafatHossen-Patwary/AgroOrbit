import { useEffect, useMemo, useState } from 'react'
import { Droplets, Leaf, Search, Sprout, Sun, Thermometer } from 'lucide-react'
import { Badge, Button, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { getCrops } from '../../services/cropService'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'crop-library')
const icons = [Sprout, Leaf, Droplets, Sun]
const tones = ['green', 'blue', 'amber', 'cyan']

export default function CropLibrary() {
  const [crops, setCrops] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCrops().then(setCrops).catch((requestError) => {
      setError(requestError.userMessage || 'Could not load the crop database.')
    }).finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return crops
    return crops.filter((crop) => [crop.name, crop.scientificName, crop.cropFamily, ...crop.suitableSoils, ...crop.seasons].filter(Boolean).join(' ').toLowerCase().includes(value))
  }, [crops, query])

  return <PageContainer className="max-w-7xl" title={`${meta.emoji} ${meta.label}`} description="Explore crop characteristics from the AgroOrbit crop database. These are reference characteristics, not NASA observations.">
    <div className="space-y-6">
      <GlassCard className="overflow-hidden border-orbit-green-500/20 bg-gradient-to-br from-orbit-green-500/10 via-space-900/70 to-orbit-blue-500/10">
        <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex gap-3"><div className="rounded-2xl bg-orbit-green-500/15 p-3 text-orbit-green-300"><Sprout className="h-6 w-6" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-green-300">Reference knowledge</p><h2 className="mt-1 font-display text-2xl font-semibold text-space-50">Find the right crop context</h2><p className="mt-1 max-w-2xl text-sm text-space-300">Compare water, heat, drought, soil, and nutrient characteristics before building a rotation plan.</p></div></div><Badge variant="warning">CROP DATABASE</Badge></div>
        <div className="mt-5 flex max-w-xl items-center gap-2 rounded-xl border border-white/10 bg-space-950/55 px-3"><Search className="h-4 w-4 text-space-500" /><input aria-label="Search crops" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search crops, families, soils, or seasons…" className="h-11 min-w-0 flex-1 bg-transparent text-sm text-space-100 outline-none placeholder:text-space-500" />{query && <Button size="sm" variant="ghost" onClick={() => setQuery('')}>Clear</Button>}</div>
      </GlassCard>

      {error && <div role="alert" className="rounded-xl border border-orbit-rose/30 bg-orbit-rose/10 p-4 text-sm text-orbit-rose">{error}</div>}
      {loading && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl bg-white/5" />)}</div>}
      {!loading && !error && filtered.length === 0 && <GlassCard><p className="text-sm text-space-400">No crops match “{query}”. Try a crop name, family, soil, or season.</p></GlassCard>}
      {!loading && !error && filtered.length > 0 && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((crop, index) => <CropCard key={crop.id} crop={crop} index={index} />)}</div>}

      <GlassCard className="border-orbit-amber/20"><div className="flex items-start gap-3"><Thermometer className="mt-0.5 h-5 w-5 shrink-0 text-orbit-amber" /><div><h2 className="font-display text-lg font-semibold text-space-50">Transparent crop context</h2><p className="mt-1 text-sm leading-relaxed text-space-400">Crop cards summarize reference characteristics from the AgroOrbit crop database. They are not remotely sensed measurements, do not come from NASA, and do not replace local agronomy or laboratory testing.</p></div></div></GlassCard>
    </div>
  </PageContainer>
}

function CropCard({ crop, index }) {
  const Icon = icons[index % icons.length]
  const tone = tones[index % tones.length]
  return <GlassCard className="group h-full transition hover:-translate-y-1 hover:border-orbit-green-500/30"><div className="flex items-start justify-between gap-3"><div className={`rounded-xl bg-orbit-${tone}-500/15 p-2.5 text-orbit-${tone}-300`}><Icon className="h-5 w-5" /></div><Badge variant="warning" size="sm">CROP DATABASE</Badge></div><h3 className="mt-4 font-display text-xl font-semibold text-space-50">{crop.name}</h3><p className="mt-1 text-sm italic text-space-400">{crop.scientificName || 'Mixed crop category'}</p><p className="mt-3 text-xs uppercase tracking-wider text-orbit-cyan">{crop.cropFamily || 'Crop family not specified'}</p><div className="mt-4 grid grid-cols-2 gap-2 text-xs"><Info label="Water" value={crop.waterRequirement} /><Info label="Heat" value={crop.heatTolerance} /><Info label="Drought" value={crop.droughtTolerance} /><Info label="Nutrients" value={crop.nutrientDemand} /></div><div className="mt-4 space-y-3 border-t border-white/10 pt-4"><Info label="Growing duration" value={crop.growingDuration} /><div><p className="text-[11px] uppercase tracking-wider text-space-500">Suitable soils</p><div className="mt-1.5 flex flex-wrap gap-1.5">{crop.suitableSoils.map((soil) => <span key={soil} className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-space-300">{soil}</span>)}</div></div><div><p className="text-[11px] uppercase tracking-wider text-space-500">Seasons</p><p className="mt-1 text-xs capitalize text-space-300">{crop.seasons.join(' · ') || 'Not specified'}</p></div><p className="text-xs leading-relaxed text-space-400"><span className="font-medium text-space-300">Soil benefit:</span> {crop.soilBenefit || 'Not specified'}</p></div></GlassCard>
}

function Info({ label, value }) { return <div className="rounded-lg border border-white/5 bg-space-950/35 p-2"><p className="text-[10px] uppercase tracking-wider text-space-500">{label}</p><p className="mt-1 text-xs font-medium text-space-200">{value || 'Not specified'}</p></div> }
