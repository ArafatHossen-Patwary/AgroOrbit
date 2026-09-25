import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createField,
  deleteField,
  getFields,
  updateField,
} from '../../services/fieldService'
import {
  centroidOfPolygon,
  formatArea,
  polygonAreaSqMeters,
} from '../../lib/geo'

const DEFAULT_CENTER = { lat: 23.8103, lng: 90.4125 }

export const MAP_MODES = {
  POINT: 'point',
  DRAW: 'draw',
}

const emptyForm = {
  name: '',
  location: '',
  latitude: DEFAULT_CENTER.lat,
  longitude: DEFAULT_CENTER.lng,
  currentCrop: '',
}

export function useFieldSelection() {
  const [form, setForm] = useState(emptyForm)
  const [boundary, setBoundary] = useState([])
  const [mapMode, setMapMode] = useState(MAP_MODES.POINT)
  const [flyTo, setFlyTo] = useState(null)
  const [activeFieldId, setActiveFieldId] = useState(null)
  const [fields, setFields] = useState([])
  const [listLoading, setListLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const areaSqm = useMemo(() => polygonAreaSqMeters(boundary), [boundary])
  const areaLabel = useMemo(() => formatArea(areaSqm), [areaSqm])

  const savedField = useMemo(
    () => fields.find((f) => f.id === activeFieldId) || null,
    [fields, activeFieldId],
  )

  const showStatus = useCallback((type, text) => {
    setStatusMessage({ type, text, at: Date.now() })
  }, [])

  const loadFields = useCallback(async () => {
    setListLoading(true)
    try {
      const list = await getFields()
      setFields(list)
    } catch (err) {
      showStatus('error', err.userMessage || 'Could not load saved fields.')
    } finally {
      setListLoading(false)
    }
  }, [showStatus])

  useEffect(() => {
    loadFields()
  }, [loadFields])

  useEffect(() => {
    if (!statusMessage || statusMessage.type !== 'success') return undefined
    const t = setTimeout(() => setStatusMessage(null), 4500)
    return () => clearTimeout(t)
  }, [statusMessage])

  const updateForm = useCallback((patch) => {
    setForm((prev) => ({ ...prev, ...patch }))
  }, [])

  const setCenter = useCallback((lat, lng, { locationLabel, fly = true } = {}) => {
    setForm((prev) => ({
      ...prev,
      latitude: round(lat),
      longitude: round(lng),
      ...(locationLabel != null ? { location: locationLabel } : {}),
    }))
    if (fly) {
      setFlyTo({ lat, lng, ts: Date.now() })
    }
  }, [])

  const onMapClick = useCallback(
    (latlng) => {
      if (mapMode === MAP_MODES.DRAW) {
        setBoundary((prev) => [...prev, { lat: latlng.lat, lng: latlng.lng }])
        return
      }
      setCenter(latlng.lat, latlng.lng, { fly: false })
    },
    [mapMode, setCenter],
  )

  const undoVertex = useCallback(() => {
    setBoundary((prev) => prev.slice(0, -1))
  }, [])

  const clearBoundary = useCallback(() => {
    setBoundary([])
  }, [])

  const finishDrawing = useCallback(() => {
    if (boundary.length < 3) {
      showStatus('error', 'Add at least 3 points to close a field boundary.')
      return
    }
    const center = centroidOfPolygon(boundary)
    if (center) {
      setForm((prev) => ({
        ...prev,
        latitude: round(center.lat),
        longitude: round(center.lng),
      }))
    }
    setMapMode(MAP_MODES.POINT)
    showStatus('success', 'Boundary closed. Area updated from the polygon.')
  }, [boundary, showStatus])

  const buildPayload = useCallback(() => {
    const name = form.name.trim()
    if (!name) {
      showStatus('error', 'Give your field a name first.')
      return null
    }
    if (boundary.length > 0 && boundary.length < 3) {
      showStatus('error', 'Finish the boundary (3+ points) or clear it.')
      return null
    }

    return {
      name,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      boundary: boundary.length >= 3 ? boundary.map((p) => ({ ...p })) : null,
      areaSqm: boundary.length >= 3 ? areaSqm : null,
      currentCrop: form.currentCrop || null,
    }
  }, [form, boundary, areaSqm, showStatus])

  const saveField = useCallback(async () => {
    const payload = buildPayload()
    if (!payload) return null

    setSaving(true)
    try {
      let saved
      if (activeFieldId) {
        saved = await updateField(activeFieldId, payload)
        setFields((prev) => prev.map((f) => (f.id === saved.id ? saved : f)))
        showStatus('success', 'Field updated on the server.')
      } else {
        saved = await createField(payload)
        setFields((prev) => [saved, ...prev])
        setActiveFieldId(saved.id)
        showStatus('success', 'Field saved to the server.')
      }
      return saved
    } catch (err) {
      const details = err.validationErrors
        ? Object.values(err.validationErrors).flat().join(' ')
        : null
      showStatus('error', details || err.userMessage || 'Could not save field.')
      return null
    } finally {
      setSaving(false)
    }
  }, [buildPayload, activeFieldId, showStatus])

  const analyzeField = useCallback(async () => {
    const saved = await saveField()
    if (!saved) return
    showStatus(
      'success',
      'Field saved. NASA analysis will connect in a later step.',
    )
  }, [saveField, showStatus])

  const selectField = useCallback(
    (field) => {
      if (!field) return
      setActiveFieldId(field.id)
      setForm({
        name: field.name || '',
        location: '',
        latitude: round(field.latitude),
        longitude: round(field.longitude),
        currentCrop: field.currentCrop || '',
      })
      setBoundary(
        Array.isArray(field.boundary)
          ? field.boundary.map((p) => ({ lat: p.lat, lng: p.lng }))
          : [],
      )
      setMapMode(MAP_MODES.POINT)
      setFlyTo({
        lat: Number(field.latitude),
        lng: Number(field.longitude),
        ts: Date.now(),
      })
      showStatus('success', `Loaded “${field.name}”.`)
    },
    [showStatus],
  )

  const startNewField = useCallback(() => {
    setActiveFieldId(null)
    setForm(emptyForm)
    setBoundary([])
    setMapMode(MAP_MODES.POINT)
    setFlyTo({ ...DEFAULT_CENTER, ts: Date.now() })
    setStatusMessage(null)
  }, [])

  const removeField = useCallback(async () => {
    if (!activeFieldId) {
      showStatus('error', 'No saved field selected to delete.')
      return
    }
    setDeleting(true)
    try {
      await deleteField(activeFieldId)
      setFields((prev) => prev.filter((f) => f.id !== activeFieldId))
      startNewField()
      showStatus('success', 'Field deleted from the server.')
    } catch (err) {
      showStatus('error', err.userMessage || 'Could not delete field.')
    } finally {
      setDeleting(false)
    }
  }, [activeFieldId, showStatus, startNewField])

  return {
    form,
    updateForm,
    setCenter,
    boundary,
    areaSqm,
    areaLabel,
    mapMode,
    setMapMode,
    flyTo,
    onMapClick,
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
    loadFields,
    statusMessage,
    setStatusMessage,
    defaultCenter: DEFAULT_CENTER,
  }
}

function round(n, digits = 5) {
  const f = 10 ** digits
  return Math.round(Number(n) * f) / f
}
