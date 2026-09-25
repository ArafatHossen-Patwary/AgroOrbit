import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Droplets, Loader2, Save, Sprout } from 'lucide-react'
import { Badge, Button, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { getFields } from '../../services/fieldService'
import { getSoilProfile, saveSoilProfile } from '../../services/soilService'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'soil-profile')
const empty = {
  soilType: '', ph: '', organicMatter: '', nitrogen: '', phosphorus: '', potassium: '',
  drainage: '', irrigationAvailable: '',
}
const fieldsHelp = [
  ['ph', 'pH', '0–14 scale'],
  ['organicMatter', 'Organic matter', '%'],
  ['nitrogen', 'Nitrogen', 'your test unit'],
  ['phosphorus', 'Phosphorus', 'your test unit'],
  ['potassium', 'Potassium', 'your test unit'],
]

export default function SoilProfile() {
  const [fields, setFields] = useState([])
  const [fieldId, setFieldId] = useState('')
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('loading')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const loadProfile = useCallback(async (id) => {
    if (!id) { setForm(empty); return }
    try {
      const profile = await getSoilProfile(id)
      setForm(profile ? { ...empty, ...profile } : empty)
      setMessage(null)
    } catch (error) {
      if (error.response?.status === 404) setForm(empty)
      else setMessage({ type: 'error', text: error.userMessage || 'Could not load the soil profile.' })
    }
  }, [])

  useEffect(() => {
    getFields().then((items) => {
      setFields(items)
      if (items[0]) setFieldId(String(items[0].id))
      setStatus('ready')
    }).catch((error) => {
      setStatus('error')
      setMessage({ type: 'error', text: error.userMessage || 'Could not load saved fields.' })
    })
  }, [])

  useEffect(() => { loadProfile(fieldId) }, [fieldId, loadProfile])

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const save = async (event) => {
    event.preventDefault()
    if (!fieldId) return setMessage({ type: 'error', text: 'Create or select a field first.' })
    setSaving(true); setMessage(null)
    try {
      const saved = await saveSoilProfile(fieldId, form)
      setForm({ ...empty, ...saved })
      setMessage({ type: 'success', text: 'Soil profile saved for the selected field.' })
    } catch (error) {
      const details = error.validationErrors ? Object.values(error.validationErrors).flat().join(' ') : null
      setMessage({ type: 'error', text: details || error.userMessage || 'Could not save the soil profile.' })
    } finally { setSaving(false) }
  }

  const indicators = useMemo(() => [
    ['pH', form.ph === '' ? 'Not provided' : form.ph, form.ph === '' ? 0 : Math.min(100, (Number(form.ph) / 14) * 100), 'Measured by the farmer', 'blue'],
    ['Organic matter', form.organicMatter === '' ? 'Not provided' : `${form.organicMatter}%`, form.organicMatter === '' ? 0 : Math.min(100, Number(form.organicMatter) * 5), 'User-provided estimate or test', 'green'],
    ['Drainage', form.drainage || 'Not provided', form.drainage ? ({ poor: 25, moderate: 55, good: 80, excellent: 100 }[form.drainage] || 0) : 0, 'Farmer observation', 'amber'],
    ['Irrigation', form.irrigationAvailable === '' ? 'Not provided' : form.irrigationAvailable ? 'Available' : 'Not available', form.irrigationAvailable === '' ? 0 : form.irrigationAvailable ? 100 : 20, 'Farmer observation', 'cyan'],
  ], [form])

  return <PageContainer className="max-w-7xl" title={`${meta.emoji} ${meta.label}`} description="Record what you know about your soil. Empty fields remain unknown—no values are inferred from NASA data.">
    <div className="space-y-6">
      <GlassCard className="border-orbit-green-500/20 bg-gradient-to-br from-orbit-green-500/10 via-space-900/70 to-orbit-blue-500/10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-3"><div className="rounded-2xl bg-orbit-green-500/15 p-3 text-orbit-green-300"><Sprout className="h-6 w-6" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-green-300">Field context</p><h2 className="mt-1 font-display text-xl font-semibold text-space-50">Soil profile workspace</h2><p className="mt-1 text-sm text-space-300">One profile per selected field · optional inputs</p></div></div>
          <Badge variant="warning">USER INPUT</Badge>
        </div>
      </GlassCard>

      {message && <div role="status" className={`flex items-start gap-3 rounded-xl border p-3 text-sm ${message.type === 'error' ? 'border-orbit-rose/30 bg-orbit-rose/10 text-orbit-rose' : 'border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300'}`}>{message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}{message.text}</div>}

      {status === 'error' ? null : fields.length === 0 ? <GlassCard><p className="text-space-300">Create a field in My Field before adding a soil profile.</p></GlassCard> : <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,.9fr)]">
        <GlassCard><form onSubmit={save} className="space-y-5"><div><label className="mb-2 block text-sm font-medium text-space-200" htmlFor="field">Selected field</label><select id="field" value={fieldId} onChange={(event) => setFieldId(event.target.value)} className="w-full rounded-xl border border-white/10 bg-space-950/70 px-3 py-2.5 text-sm text-space-100 outline-none focus:border-orbit-cyan"><option value="">Choose a field</option>{fields.map((field) => <option key={field.id} value={field.id}>{field.name}</option>)}</select></div><div className="flex items-center justify-between border-b border-white/10 pb-3"><div><h2 className="font-display text-lg font-semibold text-space-50">Known soil information</h2><p className="text-xs text-space-500">Only enter values you know from observation or testing.</p></div><Badge variant="warning" size="sm">USER INPUT</Badge></div><Field name="soilType" label="Soil type" value={form.soilType} onChange={update} placeholder="e.g. loam, clay, sandy" /><div className="grid gap-4 sm:grid-cols-2">{fieldsHelp.map(([name, label, hint]) => <Field key={name} name={name} label={label} hint={hint} value={form[name]} onChange={update} type="number" step="any" />)}</div><div className="grid gap-4 sm:grid-cols-2"><SelectField name="drainage" label="Drainage" value={form.drainage} onChange={update} options={[['poor','Poor'],['moderate','Moderate'],['good','Good'],['excellent','Excellent']]} /><SelectField name="irrigationAvailable" label="Irrigation available?" value={form.irrigationAvailable} onChange={update} options={[[true,'Yes'],[false,'No']]} /></div><Button type="submit" size="lg" className="w-full justify-center" loading={saving} leftIcon={<Save className="h-4 w-4" />}>Save soil profile</Button></form></GlassCard>
        <HealthCard indicators={indicators} />
      </div>}
    </div>
  </PageContainer>
}

function Field({ name, label, hint, value, onChange, ...props }) { return <label className="block"><span className="mb-1.5 block text-sm font-medium text-space-200">{label} {hint && <span className="text-xs font-normal text-space-500">({hint})</span>}</span><input {...props} value={value} onChange={(event) => onChange(name, event.target.value)} className="w-full rounded-xl border border-white/10 bg-space-950/70 px-3 py-2.5 text-sm text-space-100 outline-none placeholder:text-space-600 focus:border-orbit-cyan" /></label> }
function SelectField({ name, label, value, onChange, options }) { return <label className="block"><span className="mb-1.5 block text-sm font-medium text-space-200">{label}</span><select value={value} onChange={(event) => onChange(name, event.target.value === '' ? '' : event.target.value === 'true' ? true : event.target.value)} className="w-full rounded-xl border border-white/10 bg-space-950/70 px-3 py-2.5 text-sm text-space-100 outline-none focus:border-orbit-cyan"><option value="">Not provided</option>{options.map(([value, label]) => <option key={String(value)} value={String(value)}>{label}</option>)}</select></label> }
function HealthCard({ indicators }) { return <GlassCard><div className="mb-5 flex items-center justify-between"><div><h2 className="font-display text-xl font-semibold text-space-50">Soil Health Profile</h2><p className="mt-1 text-sm text-space-400">Visualized only from your saved inputs.</p></div><Droplets className="h-6 w-6 text-orbit-cyan" /></div><div className="mb-5 rounded-xl border border-orbit-amber/20 bg-orbit-amber/5 p-3 text-xs leading-relaxed text-space-300"><Badge variant="warning" size="sm">USER INPUT</Badge><span className="ml-2">These are not laboratory results and are not NASA observations.</span></div><div className="space-y-5">{indicators.map(([label, value, percent, source, color]) => <div key={label}><div className="mb-1.5 flex justify-between gap-3 text-sm"><span className="text-space-200">{label}</span><span className="text-space-400">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-space-700"><div className={`h-full rounded-full bg-orbit-${color === 'green' ? 'green-500' : color === 'blue' ? 'blue-500' : color === 'amber' ? 'amber' : 'cyan'}`} style={{ width: `${percent}%` }} /></div><p className="mt-1 text-[11px] text-space-500">{source}</p></div>)}</div><div className="mt-6 border-t border-white/10 pt-4 text-xs text-space-500"><span className="font-semibold text-space-300">NASA OBSERVED:</span> NASA Earth observation data may provide regional environmental context elsewhere in the app, but it is not used here as soil laboratory measurement.</div></GlassCard> }
