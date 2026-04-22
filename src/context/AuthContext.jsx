import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (email, password, twoFactorCode = null) => {
    const res = await api.post('/auth/login', {
      email,
      password,
      twoFactorCode,
    })

    if (res.data.requiresTwoFactor) {
      return { requiresTwoFactor: true }
    }

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)

    setUser(res.data.user)

    return { success: true }
  }

  const register = async (email, password) => {
    return api.post('/auth/register', { email, password })
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

  const forgotPassword = async (email) => {
    return api.post('/auth/forgot-password', { email })
  }

  const resetPassword = async (token, newPassword) => {
    return api.post('/auth/reset-password', {
      token,
      newPassword,
    })
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
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      fetchUser,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve estar dentro do AuthProvider')
  return context
}