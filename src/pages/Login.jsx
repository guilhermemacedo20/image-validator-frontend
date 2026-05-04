import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      setError('')
      const res = await login(email, password)

      if (res.requiresTwoFactor) {
        navigate('/2fa', { state: { twoFactorToken: res.twoFactorToken } })
        return
      }

      navigate('/my-account')
    } catch (err) {
      const message = err.response?.data?.error
      if (message === 'Credenciais inválidas') {
        setError('Usuário ou senha inválidos')
      } else if (message?.includes('bloqueada')) {
        setError(message)
      } else {
        setError(message || 'Erro ao realizar login')
      }

      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <AuthLayout title="Bem-vindo(a) de volta!" subtitle="Faça login para acessar sua conta">

      {/* Email */}
      <div className="relative">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 pl-11 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <span className="absolute left-3 top-3 text-gray-400">
          @
        </span>
      </div>

      {/* Senha */}
      <div className="relative">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 pl-11 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <span className="absolute left-3 top-3 text-gray-400">
          #
        </span>
      </div>

      {/* Esqueci senha */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-purple-600 hover:text-purple-500 transition"
        >
          Esqueci minha senha
        </button>
      </div>

      {/* Botão */}
      <button
        onClick={handleLogin}
        className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 active:scale-[0.98] transition-all shadow-lg"
      >
        Entrar
      </button>

      {/* Erro */}
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      {/* Cadastro */}
      <p className="text-sm text-center text-gray-500">
        Não possui conta?{" "}
        <button
          onClick={() => navigate('/register')}
          className="text-purple-600 font-medium hover:underline"
        >
          Cadastre-se
        </button>
      </p>

    </AuthLayout>
  )
}
