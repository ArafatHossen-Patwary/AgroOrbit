import { useCallback } from 'react'
import PageContainer from '../../components/app/PageContainer'
import FieldForm from '../../features/my-field/FieldForm'
import FieldMap from '../../features/my-field/FieldMap'
import {
  MAP_MODES,
  useFieldSelection,
} from '../../features/my-field/useFieldSelection'
import { reverseNominatim } from '../../lib/geo'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((i) => i.id === 'my-field')

export default function MyField() {
  const {
    form,
    updateForm,
    setCenter,
    boundary,
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
    statusMessage,
  } = useFieldSelection()

  const handleMapClick = useCallback(
    async (latlng) => {
      onMapClick(latlng)
      if (mapMode !== MAP_MODES.POINT) return
      try {
        const label = await reverseNominatim(latlng.lat, latlng.lng)
        if (label) updateForm({ location: label })
      } catch {
        /* reverse geocode is best-effort */
      }
    },
    [onMapClick, mapMode, updateForm],
  )

  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="Select a field on the map and save it to Laravel. Reload anytime from the saved list. NASA data comes later."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,400px)_minmax(0,1fr)] lg:items-stretch">
        <FieldForm
          form={form}
          updateForm={updateForm}
          setCenter={setCenter}
          areaLabel={areaLabel}
          boundary={boundary}
          mapMode={mapMode}
          setMapMode={setMapMode}
          undoVertex={undoVertex}
          clearBoundary={clearBoundary}
          finishDrawing={finishDrawing}
          saveField={saveField}
          analyzeField={analyzeField}
          savedField={savedField}
          activeFieldId={activeFieldId}
          fields={fields}
          listLoading={listLoading}
          saving={saving}
          deleting={deleting}
          selectField={selectField}
          startNewField={startNewField}
          removeField={removeField}
          statusMessage={statusMessage}
        />

        <div className="flex min-h-[480px] flex-col gap-3 lg:min-h-[640px]">
          <FieldMap
            className="flex-1"
            center={{
              lat: Number(form.latitude),
              lng: Number(form.longitude),
            }}
            boundary={boundary}
            mapMode={mapMode}
            flyTo={flyTo}
            onMapClick={handleMapClick}
          />
          <p className="text-center text-xs text-space-500">
            Map data © OpenStreetMap contributors · Persisted via{' '}
            <code className="text-orbit-cyan">/api/fields</code>
          </p>
        </div>
      </div>
    </PageContainer>
  )
}
