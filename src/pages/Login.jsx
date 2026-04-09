import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const res = await login(email, password)

      if (res.requiresTwoFactor) {
        navigate('/2fa', { state: { email, password } })
        return
      }

      navigate('/dashboard')
    } catch {
      alert("Erro no login")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4 font-bold text-center">Login</h1>

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <button
          onClick={handleLogin}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}