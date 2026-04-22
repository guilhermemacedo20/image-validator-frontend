import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const token = params.get("token")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleReset = async () => {
    try {
      await resetPassword(token, password)
      setMessage("Senha alterada com sucesso")

      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch {
      setMessage("Token inválido ou expirado")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4 font-bold text-center">Nova senha</h1>

        <input
          type="password"
          placeholder="Nova senha"
          onChange={e => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <button
          onClick={handleReset}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Redefinir
        </button>

        {message && <p className="text-sm mt-3 text-center">{message}</p>}
      </div>
    </div>
  )
}