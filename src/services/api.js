import axios from 'axios'
import { environment } from '../config/environment'

export const api = axios.create({
  baseURL: environment.backend.url,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config || {}
    const refreshToken = localStorage.getItem('refreshToken')
    const url = originalRequest.url || ''
    const shouldSkipRefresh = ['/auth/login', '/auth/refresh', '/auth/register', '/auth/forgot-password', '/auth/reset-password'].some((path) => url.includes(path))

    if (error.response?.status === 401 && !originalRequest._retry && refreshToken && !shouldSkipRefresh) {
      originalRequest._retry = true

      try {
        const res = await axios.post(`${environment.backend.url}/auth/refresh`, { refreshToken })

        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)

        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`

        return api(originalRequest)
      } catch {
        localStorage.clear()
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
  }
)
