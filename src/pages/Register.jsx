import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const { register } = useAuth()
  const [accountCreated, setAccountCreated] = useState(false)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async () => {
    try {
      setError("")
      await register(email, password)
      setAccountCreated(true)
      setTimeout(() => navigate("/"), 2000)
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao criar conta")
    }
  }

  const handleLogin = async () => {
    navigate('/')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4 font-bold text-center">Criar Conta</h1>

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

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Criar conta
        </button>

        <button
          onClick={handleLogin}
          className="bg-green-500 text-white w-full mt-2 p-2 rounded"
        >
          Fazer login
        </button>
        {accountCreated && <p className="text-green-500 text-sm mt-2">Conta criada com sucesso! Faça login.</p>}
      </div>
    </div>
  )
}