import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const completeLogin = async (payload) => {
    localStorage.setItem('accessToken', payload.accessToken)
    localStorage.setItem('refreshToken', payload.refreshToken)
    await fetchUser()
    return { success: true }
  }

  const login = async (email, password, twoFactorCode = null, twoFactorToken = null) => {
    const body = {}

    if (twoFactorToken) {
      body.twoFactorToken = twoFactorToken
      body.twoFactorCode = twoFactorCode
    } else {
      body.email = email
      body.password = password
      if (twoFactorCode) body.twoFactorCode = twoFactorCode
    }

    const res = await api.post('/auth/login', body)

    if (res.data.requiresTwoFactor) {
      return { requiresTwoFactor: true, twoFactorToken: res.data.twoFactorToken }
    }

    return completeLogin(res.data)
  }

  const register = async (email, password, consent) => {
    return api.post('/auth/register', { email, password, consent })
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')

    try {
      await api.post('/auth/logout', { refreshToken })
    } catch {}

    localStorage.clear()
    setUser(null)
    window.location.href = '/'
  }

  const forgotPassword = async (email) => api.post('/auth/forgot-password', { email })

  const resetPassword = async (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword })
  }

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      const res = await api.get('/auth/me')
      setUser(res.data.user)
    } catch {
      setUser(null)
      localStorage.clear()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, fetchUser, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve estar dentro do AuthProvider')
  return context
}
