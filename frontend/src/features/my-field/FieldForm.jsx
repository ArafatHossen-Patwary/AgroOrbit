import {
  AlertCircle,
  CheckCircle2,
  Eraser,
  Pentagon,
  Redo2,
  Save,
  Sparkles,
  Undo2,
} from 'lucide-react'
import { Badge, Button, Input, Select } from '../../components/ui'
import LocationSearch from './LocationSearch'
import SavedFieldsList from './SavedFieldsList'
import { formatCoord } from '../../lib/geo'
import { MAP_MODES } from './useFieldSelection'
import { reverseNominatim } from '../../lib/geo'

const CROP_OPTIONS = [
  { value: 'wheat', label: 'Wheat' },
  { value: 'rice', label: 'Rice' },
  { value: 'maize', label: 'Maize' },
  { value: 'soybean', label: 'Soybean' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'potato', label: 'Potato' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'other', label: 'Other / mixed' },
]

export default function FieldForm({
  form,
  updateForm,
  setCenter,
  areaLabel,
  boundary,
  mapMode,
  setMapMode,
  undoVertex,
  clearBoundary,
  finishDrawing,
  saveField,
  analyzeField,
  savedField,
  activeFieldId,
  fields,
  listLoading,
  saving,
  deleting,
  selectField,
  startNewField,
  removeField,
  statusMessage,
}) {
  const isDrawing = mapMode === MAP_MODES.DRAW

  const applyLatLng = async (lat, lng) => {
    setCenter(lat, lng, { fly: true })
    try {
      const label = await reverseNominatim(lat, lng)
      if (label) updateForm({ location: label })
    } catch {
      /* optional reverse geocode */
    }
  }

  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-space-900/50 p-5 shadow-soft backdrop-blur-sm">
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h2 className="font-display text-lg font-semibold text-space-50">
            Field information
          </h2>
          {activeFieldId ? (
            <Badge variant="success">Synced · #{activeFieldId}</Badge>
          ) : (
            <Badge variant="info">New field</Badge>
          )}
        </div>
        <p className="text-sm text-space-400">
          Select or draw a field, then save it to the Laravel API.
        </p>
      </div>

      <SavedFieldsList
        fields={fields}
        loading={listLoading}
        activeFieldId={activeFieldId}
        onSelect={selectField}
        onNew={startNewField}
        onDelete={removeField}
        deleting={deleting}
      />

      <Input
        label="Field name"
        name="name"
        value={form.name}
        onChange={(e) => updateForm({ name: e.target.value })}
        placeholder="e.g. North Valley Plot A"
      />

      <LocationSearch
        value={form.location}
        onChange={(location) => updateForm({ location })}
        onSelect={(item) => {
          updateForm({ location: item.label })
          setCenter(item.lat, item.lng, { locationLabel: item.label, fly: true })
        }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Latitude"
          name="latitude"
          type="number"
          step="any"
          value={form.latitude}
          onChange={(e) => updateForm({ latitude: e.target.value })}
          onBlur={(e) => {
            const lat = Number(e.target.value)
            const lng = Number(form.longitude)
            if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
              applyLatLng(lat, lng)
            }
          }}
        />
        <Input
          label="Longitude"
          name="longitude"
          type="number"
          step="any"
          value={form.longitude}
          onChange={(e) => updateForm({ longitude: e.target.value })}
          onBlur={(e) => {
            const lng = Number(e.target.value)
            const lat = Number(form.latitude)
            if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
              applyLatLng(lat, lng)
            }
          }}
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-space-950/50 px-3 py-2.5">
        <p className="text-xs font-medium uppercase tracking-wider text-space-500">
          Selected coordinates
        </p>
        <p className="mt-1 font-mono text-sm text-orbit-cyan">
          {formatCoord(form.latitude)}, {formatCoord(form.longitude)}
        </p>
      </div>

      <div>
        <p className="mb-1.5 text-sm font-medium text-space-200">Area</p>
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-space-950/50 px-3 py-2.5">
          <span className="font-display text-base font-semibold text-space-50">
            {areaLabel}
          </span>
          <span className="text-xs text-space-500">
            {boundary.length >= 3
              ? `${boundary.length} vertices`
              : 'Draw a boundary to estimate'}
          </span>
        </div>
      </div>

      <Select
        label="Current crop"
        name="currentCrop"
        value={form.currentCrop}
        onChange={(e) => updateForm({ currentCrop: e.target.value })}
        options={CROP_OPTIONS}
        placeholder="Select current crop"
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-space-200">Boundary tools</p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={isDrawing ? 'primary' : 'secondary'}
            leftIcon={<Pentagon className="h-3.5 w-3.5" />}
            onClick={() => {
              if (isDrawing) {
                setMapMode(MAP_MODES.POINT)
              } else {
                clearBoundary()
                setMapMode(MAP_MODES.DRAW)
              }
            }}
          >
            {isDrawing ? 'Drawing…' : 'Draw boundary'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Undo2 className="h-3.5 w-3.5" />}
            onClick={undoVertex}
            disabled={boundary.length === 0}
          >
            Undo
          </Button>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Eraser className="h-3.5 w-3.5" />}
            onClick={clearBoundary}
            disabled={boundary.length === 0}
          >
            Clear
          </Button>
          {isDrawing && (
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Redo2 className="h-3.5 w-3.5" />}
              onClick={finishDrawing}
            >
              Finish shape
            </Button>
          )}
        </div>
      </div>

      {statusMessage && (
        <div
          role="status"
          className={`rounded-xl border px-3 py-2.5 text-sm ${
            statusMessage.type === 'error'
              ? 'border-orbit-rose/30 bg-orbit-rose/10 text-orbit-rose'
              : 'border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300'
          }`}
        >
          <span className="inline-flex items-start gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            {statusMessage.text}
          </span>
        </div>
      )}

      {savedField && (
        <div className="rounded-xl border border-orbit-blue-500/25 bg-orbit-blue-500/10 px-3 py-3 text-xs text-space-300">
          <p className="font-medium text-orbit-blue-300">Server record</p>
          <p className="mt-1">
            {savedField.name} · {formatCoord(savedField.latitude)},{' '}
            {formatCoord(savedField.longitude)}
            {savedField.area ? ` · area ${savedField.area} m²` : ''}
          </p>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <Button
          size="lg"
          className="w-full justify-center"
          leftIcon={<Sparkles className="h-4 w-4" />}
          loading={saving}
          onClick={analyzeField}
        >
          Analyze This Field
        </Button>
        <Button
          size="md"
          variant="secondary"
          className="w-full justify-center"
          leftIcon={<Save className="h-4 w-4" />}
          loading={saving}
          onClick={saveField}
        >
          {activeFieldId ? 'Update field on server' : 'Save field to server'}
        </Button>
      </div>
    </div>
  )
}
