import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function TwoFactor() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const twoFactorToken = location.state?.twoFactorToken || ''

  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!twoFactorToken) {
      navigate('/')
    }
  }, [twoFactorToken, navigate])

  const handleVerify = async () => {
    try {
      setError('')
      await login(null, null, code, twoFactorToken)
      navigate('/my-account')
    } catch (err) {
      setError(err.response?.data?.error || 'Código 2FA inválido')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4 font-bold text-center">2FA</h1>

        <input
          placeholder="Código 2FA"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <button onClick={handleVerify} className="bg-blue-500 text-white w-full p-2 rounded">
          Validar
        </button>

        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
      </div>
    </div>
  )
}
