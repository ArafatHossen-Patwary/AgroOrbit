import api from './api'

export function mapSoilProfile(data) {
  if (!data) return null
  return {
    id: data.id,
    fieldId: data.field_id,
    soilType: data.soil_type ?? '',
    ph: data.ph ?? '',
    organicMatter: data.organic_matter ?? '',
    nitrogen: data.nitrogen ?? '',
    phosphorus: data.phosphorus ?? '',
    potassium: data.potassium ?? '',
    drainage: data.drainage ?? '',
    irrigationAvailable: data.irrigation_available ?? null,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

function toApi(payload) {
  return {
    soil_type: payload.soilType || null,
    ph: payload.ph === '' ? null : Number(payload.ph),
    organic_matter: payload.organicMatter === '' ? null : Number(payload.organicMatter),
    nitrogen: payload.nitrogen === '' ? null : Number(payload.nitrogen),
    phosphorus: payload.phosphorus === '' ? null : Number(payload.phosphorus),
    potassium: payload.potassium === '' ? null : Number(payload.potassium),
    drainage: payload.drainage || null,
    irrigation_available: payload.irrigationAvailable === '' ? null : payload.irrigationAvailable,
  }
}

export async function getSoilProfile(fieldId) {
  const { data } = await api.get(`/fields/${fieldId}/soil-profile`)
  return mapSoilProfile(data.data)
}

export async function saveSoilProfile(fieldId, payload) {
  const { data } = await api.put(`/fields/${fieldId}/soil-profile`, toApi(payload))
  return mapSoilProfile(data.data)
}

export default { getSoilProfile, saveSoilProfile, mapSoilProfile }
