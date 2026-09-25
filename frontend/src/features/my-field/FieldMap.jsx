import { useEffect, useMemo } from 'react'
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import { MAP_MODES } from './useFieldSelection'
import { cn } from '../../lib/cn'

const pinIcon = L.divIcon({
  className: 'agroorbit-map-pin',
  html: `<span class="agroorbit-map-pin__dot"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const polygonStyle = {
  color: '#34d399',
  weight: 2,
  fillColor: '#10b981',
  fillOpacity: 0.28,
}

const draftStyle = {
  color: '#22d3ee',
  weight: 2,
  dashArray: '6 6',
  fillColor: '#0ea5e9',
  fillOpacity: 0.12,
}

function MapClickHandler({ mode, onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng)
    },
  })
  return null
}

function FlyToTarget({ target }) {
  const map = useMap()
  useEffect(() => {
    if (!target) return
    map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 14), {
      duration: 1.1,
    })
  }, [target, map])
  return null
}

function InvalidateSize() {
  const map = useMap()
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 80)
    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
  }, [map])
  return null
}

export default function FieldMap({
  center,
  boundary,
  mapMode,
  flyTo,
  onMapClick,
  className,
}) {
  const position = useMemo(
    () => [Number(center.lat) || 0, Number(center.lng) || 0],
    [center.lat, center.lng],
  )

  const isDrawing = mapMode === MAP_MODES.DRAW
  const closed = !isDrawing && boundary.length >= 3

  return (
    <div
      className={cn(
        'relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-card',
        className,
      )}
    >
      <MapContainer
        center={position}
        zoom={13}
        className="agroorbit-leaflet h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InvalidateSize />
        <MapClickHandler mode={mapMode} onMapClick={onMapClick} />
        <FlyToTarget target={flyTo} />

        {!isDrawing && (
          <Marker position={position} icon={pinIcon} />
        )}

        {isDrawing && boundary.length > 0 && (
          <>
            <Polyline
              positions={boundary.map((p) => [p.lat, p.lng])}
              pathOptions={draftStyle}
            />
            {boundary.map((p, i) => (
              <CircleMarker
                key={`${p.lat}-${p.lng}-${i}`}
                center={[p.lat, p.lng]}
                radius={5}
                pathOptions={{
                  color: '#22d3ee',
                  fillColor: '#e2e8f0',
                  fillOpacity: 1,
                  weight: 2,
                }}
              />
            ))}
          </>
        )}

        {closed && (
          <Polygon
            positions={boundary.map((p) => [p.lat, p.lng])}
            pathOptions={polygonStyle}
          />
        )}

        {isDrawing && boundary.length >= 3 && (
          <Polygon
            positions={boundary.map((p) => [p.lat, p.lng])}
            pathOptions={draftStyle}
          />
        )}
      </MapContainer>

      <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-lg border border-white/15 bg-space-950/85 px-2.5 py-1.5 text-[11px] text-space-200 backdrop-blur-md">
        {isDrawing
          ? 'Draw mode · click to add vertices'
          : 'Point mode · click map to set coordinates'}
      </div>
    </div>
  )
}
