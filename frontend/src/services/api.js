import axios from 'axios'

/**
 * Shared Axios client for the AgroOrbit Laravel API.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong talking to the API.'
    return Promise.reject(
      Object.assign(error, {
        userMessage: message,
        validationErrors: error.response?.data?.errors || null,
      }),
    )
  },
)

export default api
