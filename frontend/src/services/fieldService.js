import api from './api'

/**
 * Normalize a Laravel FieldResource into frontend-friendly shape.
 */
export function mapFieldFromApi(data) {
  if (!data) return null
  return {
    id: data.id,
    name: data.name,
    latitude: data.latitude,
    longitude: data.longitude,
    boundary: Array.isArray(data.boundary) ? data.boundary : [],
    area: data.area,
    currentCrop: data.current_crop ?? '',
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

function mapFieldToApi(payload) {
  const body = {
    name: payload.name,
    latitude: Number(payload.latitude),
    longitude: Number(payload.longitude),
  }

  if (payload.boundary != null) {
    body.boundary =
      Array.isArray(payload.boundary) && payload.boundary.length >= 3
        ? payload.boundary.map((p) => ({
            lat: Number(p.lat),
            lng: Number(p.lng),
          }))
        : null
  }

  if (payload.area != null && payload.area !== '') {
    body.area = Number(payload.area)
  } else if (payload.areaSqm != null) {
    body.area = Number(payload.areaSqm)
  }

  if (payload.currentCrop !== undefined || payload.current_crop !== undefined) {
    body.current_crop = payload.currentCrop ?? payload.current_crop ?? null
  }

  return body
}

export async function getFields() {
  const { data } = await api.get('/fields')
  const list = data.data ?? data
  return (Array.isArray(list) ? list : []).map(mapFieldFromApi)
}

export async function getField(id) {
  const { data } = await api.get(`/fields/${id}`)
  return mapFieldFromApi(data.data ?? data)
}

export async function createField(payload) {
  const { data } = await api.post('/fields', mapFieldToApi(payload))
  return mapFieldFromApi(data.data ?? data)
}

export async function updateField(id, payload) {
  const { data } = await api.put(`/fields/${id}`, mapFieldToApi(payload))
  return mapFieldFromApi(data.data ?? data)
}

export async function deleteField(id) {
  const { data } = await api.delete(`/fields/${id}`)
  return data
}

const fieldService = {
  getFields,
  getField,
  createField,
  updateField,
  deleteField,
  mapFieldFromApi,
}

export default fieldService
