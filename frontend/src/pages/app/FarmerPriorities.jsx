import { useCallback, useEffect, useMemo, useState } from 'react'
import { BarChart3, CheckCircle2, Loader2, Save, SlidersHorizontal } from 'lucide-react'
import { Badge, Button, GlassCard, Slider } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { getFields } from '../../services/fieldService'
import { getFieldPreferences, saveFieldPreferences, PRIORITY_KEYS, PRIORITY_META } from '../../services/farmerPreferenceService'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'farmer-priorities')

const defaults = {
  water_conservation: 50,
  soil_improvement: 50,
  yield_stability: 50,
  economic_return: 50,
  climate_resilience: 50,
  crop_diversity: 50,
}

export default function FarmerPriorities() {
  const [fields, setFields] = useState([])
  const [fieldId, setFieldId] = useState('')
  const [preferences, setPreferences] = useState(defaults)
  const [status, setStatus] = useState('loading')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const loadPreferences = useCallback(async (selectedFieldId) => {
    if (!selectedFieldId) {
      setPreferences(defaults)
      return
    }

    try {
      const result = await getFieldPreferences(selectedFieldId)
      setPreferences(result || defaults)
    } catch (error) {
      setPreferences(defaults)
    }
  }, [])

  useEffect(() => {
    getFields().then((items) => {
      setFields(items)
      if (items[0]) setFieldId(String(items[0].id))
      setStatus('ready')
    }).catch(() => setStatus('error'))
  }, [])

  useEffect(() => {
    loadPreferences(fieldId)
  }, [fieldId, loadPreferences])

  const updateValue = (key, value) => {
    setPreferences((current) => ({ ...current, [key]: Number(value) }))
  }

  const save = async (event) => {
    event.preventDefault()
    if (!fieldId) {
      setMessage('Please select a field first.')
      return
    }

    setSaving(true)
    setMessage('')
    try {
      await saveFieldPreferences(fieldId, preferences)
      setMessage('Farmer priorities saved for this field.')
    } catch (error) {
      setMessage(error.userMessage || 'Could not save priorities.')
    } finally {
      setSaving(false)
    }
  }

  const ranked = useMemo(() => {
    return PRIORITY_KEYS.map((key) => ({ key, ...PRIORITY_META[key], value: preferences[key] }))
      .sort((a, b) => b.value - a.value)
  }, [preferences])

  return (
    <PageContainer className="max-w-7xl" title={`${meta.emoji} ${meta.label}`} description="Set the priorities that will guide later rotation planning. These preferences are stored per field and will be used by the rotation engine later.">
      <div className="space-y-6">
        <GlassCard className="border-orbit-cyan/20 bg-gradient-to-br from-orbit-cyan/10 via-space-900/70 to-orbit-green-500/10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex gap-3"><div className="rounded-2xl bg-orbit-cyan/15 p-3 text-orbit-cyan"><SlidersHorizontal className="h-6 w-6" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-cyan">Decision weighting</p><h2 className="mt-1 font-display text-xl font-semibold text-space-50">Field priorities</h2><p className="mt-1 text-sm text-space-300">A farmer-centered weighting model for later rotation decisions.</p></div></div>
            <Badge variant="info">Stored per field</Badge>
          </div>
        </GlassCard>

        {fields.length === 0 ? <GlassCard><p className="text-space-300">Create a field first before saving priorities.</p></GlassCard> : <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(260px,.7fr)]">
          <GlassCard>
            <form onSubmit={save} className="space-y-5">
              <div>
                <label htmlFor="field" className="mb-2 block text-sm font-medium text-space-200">Selected field</label>
                <select id="field" value={fieldId} onChange={(event) => setFieldId(event.target.value)} className="w-full rounded-xl border border-white/10 bg-space-950/70 px-3 py-2.5 text-sm text-space-100">
                  <option value="">Choose a field</option>
                  {fields.map((field) => <option key={field.id} value={field.id}>{field.name}</option>)}
                </select>
              </div>

              {PRIORITY_KEYS.map((key) => (
                <Slider key={key} label={PRIORITY_META[key].label} value={preferences[key]} min={0} max={100} onChange={(event) => updateValue(key, event.target.value)} showValue />
              ))}

              {message && <div className={`rounded-xl border p-3 text-sm ${message.includes('saved') ? 'border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300' : 'border-orbit-rose/30 bg-orbit-rose/10 text-orbit-rose'}`}>{message}</div>}

              <Button type="submit" className="w-full justify-center" loading={saving} leftIcon={<Save className="h-4 w-4" />}>Save priorities</Button>
            </form>
          </GlassCard>

          <GlassCard>
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-orbit-green-500/15 p-2 text-orbit-green-300"><BarChart3 className="h-5 w-5" /></div>
              <div>
                <h3 className="font-display text-lg font-semibold text-space-50">Current priorities</h3>
                <p className="text-xs text-space-400">Visual ranking</p>
              </div>
            </div>
            <div className="space-y-4">
              {ranked.map((item, index) => (
                <div key={item.key}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-space-200">{index + 1}. {item.label}</span>
                    <span className="font-display text-orbit-cyan">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-white/10 bg-space-950/40 p-3 text-xs text-space-400">
              <span className="inline-flex items-center gap-1 text-orbit-green-300"><CheckCircle2 className="h-3.5 w-3.5" /> Later used</span> by the rotation engine after this feature is connected.
            </div>
          </GlassCard>
        </div>}
      </div>
    </PageContainer>
  )
}
