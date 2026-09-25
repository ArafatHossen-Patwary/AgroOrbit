import api from './api'

export function mapCrop(data) {
  return {
    id: data.id,
    name: data.name,
    scientificName: data.scientific_name,
    cropFamily: data.crop_family,
    waterRequirement: data.water_requirement,
    heatTolerance: data.heat_tolerance,
    droughtTolerance: data.drought_tolerance,
    soilBenefit: data.soil_benefit,
    nutrientDemand: data.nutrient_demand,
    growingDuration: data.growing_duration,
    suitableSoils: data.suitable_soils || [],
    seasons: data.seasons || [],
  }
}

export async function getCrops() {
  const { data } = await api.get('/crops')
  return (data.data || []).map(mapCrop)
}

export async function getCrop(id) {
  const { data } = await api.get(`/crops/${id}`)
  return mapCrop(data.data || data)
}

export default { getCrops, getCrop }
