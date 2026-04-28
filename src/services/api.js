import axios from 'axios'
import { environment } from '../config/environment'

export const api = axios.create({
  baseURL: environment.backend.url,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')

  config.headers = config.headers || {}

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

    const shouldSkipRefresh = [
      '/auth/login',
      '/auth/refresh',
      '/auth/register',
      '/auth/forgot-password',
      '/auth/reset-password',
    ].some((path) => url.includes(path))

    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    if (
      error.response?.status === 401 &&
      refreshToken &&
      !shouldSkipRefresh
    ) {
      originalRequest._retry = true

      try {
        const res = await axios.post(
          `${environment.backend.url}/auth/refresh`,
          { refreshToken }
        )

        const newAccessToken = res.data.accessToken
        const newRefreshToken = res.data.refreshToken

        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        originalRequest.headers = originalRequest.headers || {}

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        localStorage.clear()
        window.location.href = '/'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)