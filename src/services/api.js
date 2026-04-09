import { environment } from '../config/environment'

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    const refreshToken = localStorage.getItem('refreshToken')

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true

      try {
        const res = await axios.post(
          `${environment.backend.url}/auth/refresh`,
          { refreshToken }
        )

        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)

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