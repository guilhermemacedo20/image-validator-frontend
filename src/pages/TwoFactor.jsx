import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function TwoFactor() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const { email, password } = location.state || {}

  const [code, setCode] = useState("")

  const [error, setError] = useState("")

  const handleVerify = async () => {
    try {
      setError("")
      await login(email, password, code)
      navigate('/my-account')
    } catch (err) {
      setError("Código 2FA inválido")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4 font-bold text-center">2FA</h1>

        <input
          placeholder="Código 2FA"
          onChange={e => setCode(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <button
          onClick={handleVerify}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Validar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    </div>
  )
}