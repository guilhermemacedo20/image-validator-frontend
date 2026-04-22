import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      setError("")
      const res = await login(email, password)

      if (res.requiresTwoFactor) {
        navigate('/2fa', { state: { email, password } })
        return
      }

      navigate('/my-account')
    } catch (err) {
      const message = err.response?.data?.error
      if (message === 'Credenciais inválidas') {
        setError("Usuário ou senha inválidos")
      } else if (message === 'Invalid password') {
        setError("Senha inválida")
      } else {
        setError("Erro ao realizar login")
      }

      setTimeout(() => setError(""), 3000)
    }
  }

  const handleCreateAccount = async () => {
    navigate('/register')
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
          className="border p-2 w-full"
        />

        <button
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-blue-500 mt-0 mb-4"
        >
          Esqueci minha senha
        </button>

        <button
          onClick={handleLogin}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Entrar
        </button>

        {error && <p className="text-red-500 text-sm my-2 text-center">{error}</p>}

        <button
          onClick={handleCreateAccount}
          className="text-blue-500 w-full p-2 mt-2"
        >
          Não possui conta? Cadastre-se
        </button>
      </div>      
    </div>
  )
}