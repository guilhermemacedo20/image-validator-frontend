import { createContext, useContext, useState } from "react"
import { api } from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (email, password, twoFactorCode = null) => {
    const res = await api.post('/auth/login', {
      email,
      password,
      twoFactorCode
    })

    if (res.data.requiresTwoFactor) {
      return { requiresTwoFactor: true }
    }

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)

    setUser(res.data.user)

    return { success: true }
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')

    await api.post('/auth/logout', { refreshToken })

    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)