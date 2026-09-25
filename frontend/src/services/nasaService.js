import api from './api'

export const NASA_VARIABLES = {
  precipitation: 'PRECTOTCORR',
  temperature: 'T2M',
  solar: 'ALLSKY_SFC_SW_DWN',
}

export async function getNASAObservations({
  latitude,
  longitude,
  startDate,
  endDate,
  variables,
}) {
  const { data } = await api.get('/nasa/observations', {
    params: {
      latitude,
      longitude,
      start_date: startDate,
      end_date: endDate,
      variables: variables?.join(','),
    },
  })

  return {
    observations: Array.isArray(data.data) ? data.data : [],
    status: data.status || 'unknown',
    cached: Boolean(data.cached),
    source: data.dataset || 'NASA POWER Daily Point',
    endpoint: data.endpoint,
    variables: data.variables || variables || [],
    dateRange: data.date_range,
  }
}

export default { getNASAObservations }
