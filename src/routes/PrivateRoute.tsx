import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ReactNode } from 'react'

interface PrivateRouteProps {
  children: ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Carregando...</div>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}
