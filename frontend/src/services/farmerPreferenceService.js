import api from './api'

export const PRIORITY_KEYS = [
  'water_conservation',
  'soil_improvement',
  'yield_stability',
  'economic_return',
  'climate_resilience',
  'crop_diversity',
]

export const PRIORITY_META = {
  water_conservation: { label: 'Water conservation', color: '#38bdf8' },
  soil_improvement: { label: 'Soil improvement', color: '#10b981' },
  yield_stability: { label: 'Yield stability', color: '#a78bfa' },
  economic_return: { label: 'Economic return', color: '#fbbf24' },
  climate_resilience: { label: 'Climate resilience', color: '#fb7185' },
  crop_diversity: { label: 'Crop diversity', color: '#22d3ee' },
}

export function mapPreference(data) {
  if (!data) return null
  return {
    id: data.id,
    fieldId: data.field_id,
    water_conservation: Number(data.water_conservation ?? 50),
    soil_improvement: Number(data.soil_improvement ?? 50),
    yield_stability: Number(data.yield_stability ?? 50),
    economic_return: Number(data.economic_return ?? 50),
    climate_resilience: Number(data.climate_resilience ?? 50),
    crop_diversity: Number(data.crop_diversity ?? 50),
  }
}

export async function getFieldPreferences(fieldId) {
  const { data } = await api.get(`/fields/${fieldId}/preferences`)
  return mapPreference(data.data)
}

export async function saveFieldPreferences(fieldId, payload) {
  const { data } = await api.post(`/fields/${fieldId}/preferences`, payload)
  return mapPreference(data.data)
}

export default { getFieldPreferences, saveFieldPreferences }
