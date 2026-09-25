import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown,
  ArrowUp,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  Plus,
  Save,
  Trash2,
} from 'lucide-react'
import { Badge, Button, GlassCard, Select } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { getCrops } from '../../services/cropService'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'rotation-lab')

const defaultCropList = [
  { id: 'rice', name: 'Rice', description: 'Flooded cereal crop with high water demand.' },
  { id: 'lentil', name: 'Lentil', description: 'Legume crop with a role in nitrogen fixation.' },
  { id: 'maize', name: 'Maize', description: 'Cereal crop commonly used in diverse rotations.' },
  { id: 'vegetable', name: 'Vegetable', description: 'Broad vegetable category for diversified planning.' },
]

const buildEmptyYear = (year) => ({
  id: `${year}-${Math.random().toString(36).slice(2, 9)}`,
  year,
  cropId: '',
})

export default function RotationLab() {
  const [crops, setCrops] = useState(defaultCropList)
  const [rotation, setRotation] = useState([
    { id: 'rot-1', year: 2027, cropId: 'rice' },
    { id: 'rot-2', year: 2028, cropId: 'lentil' },
    { id: 'rot-3', year: 2029, cropId: 'maize' },
    { id: 'rot-4', year: 2030, cropId: 'vegetable' },
  ])
  const [selectedId, setSelectedId] = useState('rot-1')
  const [saveState, setSaveState] = useState('idle')
  const [analysisState, setAnalysisState] = useState('idle')

  useEffect(() => {
    getCrops()
      .then((list) => {
        if (list && list.length > 0) {
          setCrops(list)
          setRotation((current) =>
            current.map((item) => {
              if (!item.cropId || !list.some((crop) => crop.id === item.cropId)) {
                return { ...item, cropId: list[0].id }
              }
              return item
            }),
          )
        }
      })
      .catch(() => {
        setCrops(defaultCropList)
      })
  }, [])

  const selectedPlan = rotation.find((entry) => entry.id === selectedId) || rotation[0]

  const selectedCrop = useMemo(() => {
    if (!selectedPlan) return null
    return crops.find((crop) => crop.id === selectedPlan.cropId) || null
  }, [selectedPlan, crops])

  const updateEntry = (entryId, updates) => {
    setRotation((current) =>
      current.map((entry) => (entry.id === entryId ? { ...entry, ...updates } : entry)),
    )
  }

  const addYear = () => {
    const lastYear = rotation.length ? Math.max(...rotation.map((entry) => Number(entry.year || 2027))) : 2027
    const nextYear = lastYear + 1
    const newEntry = buildEmptyYear(nextYear)
    setRotation((current) => [...current, newEntry])
    setSelectedId(newEntry.id)
  }

  const removeEntry = (entryId) => {
    if (rotation.length <= 1) return
    const next = rotation.filter((entry) => entry.id !== entryId)
    setRotation(next)
    if (selectedId === entryId) setSelectedId(next[0]?.id || '')
  }

  const moveEntry = (entryId, direction) => {
    setRotation((current) => {
      const index = current.findIndex((entry) => entry.id === entryId)
      const targetIndex = index + direction
      if (index < 0 || targetIndex < 0 || targetIndex >= current.length) return current

      const updated = [...current]
      const [item] = updated.splice(index, 1)
      updated.splice(targetIndex, 0, item)
      return updated
    })
  }

  const saveRotation = () => {
    setSaveState('saving')
    setTimeout(() => {
      setSaveState('saved')
      window.setTimeout(() => setSaveState('idle'), 1800)
    }, 500)
  }

  const analyzeRotation = () => {
    setAnalysisState('analyzing')
    setTimeout(() => {
      setAnalysisState('ready')
      window.setTimeout(() => setAnalysisState('idle'), 1800)
    }, 600)
  }

  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="Design a field rotation plan with crop sequence, timing, and crop reference details. The analysis engine is not implemented yet."
    >
      <div className="space-y-6">
        <GlassCard className="overflow-hidden border-orbit-green-500/20 bg-gradient-to-br from-orbit-green-500/10 via-space-900/80 to-orbit-cyan-500/10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-green-300">Rotation planning</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-space-50">Build a crop timeline</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" leftIcon={<Plus className="h-4 w-4" />} onClick={addYear}>
                Add year
              </Button>
              <Button leftIcon={<Save className="h-4 w-4" />} onClick={saveRotation} loading={saveState === 'saving'}>
                {saveState === 'saved' ? 'Saved' : 'Save rotation'}
              </Button>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="space-y-4">
            {rotation.map((entry, index) => {
              const cropOptions = [
                { value: '', label: 'Select crop' },
                ...crops.map((crop) => ({ value: crop.id, label: crop.name })),
              ]

              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className={`rounded-2xl border p-4 transition ${selectedId === entry.id ? 'border-orbit-green-500/40 bg-orbit-green-500/5' : 'border-white/10 bg-space-900/40'}`}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedId(entry.id)}
                      className="flex items-center gap-3 text-left"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orbit-green-500/10 text-orbit-green-300">
                        <CalendarRange className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-space-500">Year</p>
                        <p className="font-display text-xl font-semibold text-space-50">{entry.year}</p>
                      </div>
                    </button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveEntry(entry.id, -1)}
                        disabled={index === 0}
                        title="Move earlier"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveEntry(entry.id, 1)}
                        disabled={index === rotation.length - 1}
                        title="Move later"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEntry(entry.id)}
                        disabled={rotation.length <= 1}
                        title="Remove year"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end">
                    <label className="flex-1">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-space-500">Year</span>
                      <input
                        type="number"
                        value={entry.year}
                        onChange={(event) => updateEntry(entry.id, { year: Number(event.target.value || 2027) })}
                        className="h-11 w-full rounded-xl border border-white/10 bg-space-950/60 px-3 text-sm text-space-100 outline-none focus:border-orbit-green-400"
                      />
                    </label>
                    <div className="flex-1">
                      <Select
                        label="Crop"
                        value={entry.cropId}
                        onChange={(event) => updateEntry(entry.id, { cropId: event.target.value })}
                        options={cropOptions}
                        placeholder="Select crop"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="space-y-4">
            {selectedCrop ? (
              <GlassCard className="border-orbit-cyan/20 bg-space-900/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-orbit-cyan">Selected crop</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-space-50">{selectedCrop.name}</h3>
                  </div>
                  <Badge variant="info">{selectedCrop.cropFamily || 'Crop family'}</Badge>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border border-white/10 bg-space-950/50 p-3 text-sm text-space-300">
                    {selectedCrop.soilBenefit || 'Crop reference details will be shown here.'}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <InfoCard label="Water" value={selectedCrop.waterRequirement || '—'} />
                    <InfoCard label="Heat" value={selectedCrop.heatTolerance || '—'} />
                    <InfoCard label="Drought" value={selectedCrop.droughtTolerance || '—'} />
                    <InfoCard label="Nutrients" value={selectedCrop.nutrientDemand || '—'} />
                    <InfoCard label="Duration" value={selectedCrop.growingDuration || '—'} />
                    <InfoCard label="Seasons" value={(selectedCrop.seasons || []).join(', ') || '—'} />
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-space-500">Suitable soils</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedCrop.suitableSoils || []).map((soil) => (
                        <span key={soil} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-space-200">
                          {soil}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="border-dashed border-white/15 bg-space-900/40">
                <p className="text-sm text-space-400">Select a year to inspect a crop and its characteristics.</p>
              </GlassCard>
            )}

            <GlassCard className="border-orbit-amber/20 bg-space-900/60">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-orbit-amber">Rotation summary</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-space-50">{rotation.length} seasons</h3>
                </div>
                <Badge variant="warning">UI only</Badge>
              </div>

              <div className="mt-4 space-y-3">
                {rotation.map((entry, index) => {
                  const crop = crops.find((item) => item.id === entry.cropId)
                  return (
                    <div key={entry.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-space-950/40 p-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orbit-green-500/10 text-xs font-semibold text-orbit-green-300">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-space-100">{entry.year}</p>
                        <p className="text-xs text-space-400">{crop ? crop.name : 'No crop selected'}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button
                className="mt-5 w-full"
                variant="secondary"
                onClick={analyzeRotation}
                loading={analysisState === 'analyzing'}
              >
                {analysisState === 'ready' ? 'Analysis ready' : 'Analyze Rotation'}
              </Button>
              {analysisState === 'ready' && (
                <p className="mt-3 text-xs text-orbit-green-300">The scoring engine is not implemented yet. This button is a placeholder for the next step.</p>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-space-950/50 p-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-space-500">{label}</p>
      <p className="mt-1 font-medium text-space-100">{value}</p>
    </div>
  )
}
