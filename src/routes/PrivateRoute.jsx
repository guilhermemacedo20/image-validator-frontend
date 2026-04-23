import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Carregando...</div>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}
