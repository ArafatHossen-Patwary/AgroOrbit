/**
 * Geodesic helpers for field polygons (approximate, field-scale).
 */

const EARTH_RADIUS_M = 6378137

/** Spherical polygon area in square meters (ring need not be closed). */
export function polygonAreaSqMeters(latLngs = []) {
  if (!latLngs || latLngs.length < 3) return 0

  let total = 0
  const n = latLngs.length

  for (let i = 0; i < n; i += 1) {
    const a = latLngs[i]
    const b = latLngs[(i + 1) % n]
    const lng1 = toRad(a.lng)
    const lng2 = toRad(b.lng)
    const lat1 = toRad(a.lat)
    const lat2 = toRad(b.lat)
    total += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2))
  }

  return Math.abs((total * EARTH_RADIUS_M * EARTH_RADIUS_M) / 2)
}

export function sqMetersToHectares(sqm) {
  return sqm / 10000
}

export function sqMetersToAcres(sqm) {
  return sqm / 4046.8564224
}

export function formatArea(sqm) {
  if (!sqm || sqm <= 0) return '—'
  const ha = sqMetersToHectares(sqm)
  const acres = sqMetersToAcres(sqm)
  if (ha >= 1) {
    return `${ha.toFixed(2)} ha · ${acres.toFixed(2)} ac`
  }
  return `${(sqm).toFixed(0)} m² · ${acres.toFixed(3)} ac`
}

export function formatCoord(value, digits = 5) {
  if (value == null || Number.isNaN(Number(value))) return '—'
  return Number(value).toFixed(digits)
}

export function centroidOfPolygon(latLngs = []) {
  if (!latLngs.length) return null
  let lat = 0
  let lng = 0
  latLngs.forEach((p) => {
    lat += p.lat
    lng += p.lng
  })
  return { lat: lat / latLngs.length, lng: lng / latLngs.length }
}

function toRad(deg) {
  return (deg * Math.PI) / 180
}

/**
 * Nominatim (OpenStreetMap) search — browser-side, no API key.
 * Respect usage policy: debounce callers; identify the app.
 */
export async function searchNominatim(query, { signal, limit = 5 } = {}) {
  const q = query?.trim()
  if (!q || q.length < 2) return []

  const params = new URLSearchParams({
    format: 'json',
    q,
    limit: String(limit),
    addressdetails: '1',
  })

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      signal,
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Location search failed')
  }

  const data = await res.json()
  return data.map((item) => ({
    id: item.place_id,
    label: item.display_name,
    lat: Number(item.lat),
    lng: Number(item.lon),
  }))
}

export async function reverseNominatim(lat, lng, { signal } = {}) {
  const params = new URLSearchParams({
    format: 'json',
    lat: String(lat),
    lon: String(lng),
  })

  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
    {
      signal,
      headers: { Accept: 'application/json' },
    },
  )

  if (!res.ok) return null
  const data = await res.json()
  return data.display_name || null
}
