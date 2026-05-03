import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function Register() {
  const { register } = useAuth()
  const [accountCreated, setAccountCreated] = useState(false)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  }

  const isPasswordValid = Object.values(validations).every(Boolean)
  const isMatch = password === confirmPassword && confirmPassword.length > 0

  const getColor = (valid) => (valid ? 'text-green-600' : 'text-gray-400')

  const getInputBorder = (valid, value) => {
    if (!value) return 'border-gray-300'
    return valid ? 'border-green-500' : 'border-red-500'
  }

  const handleRegister = async () => {
    try {
      setError('')

      if (!isValidEmail(email)) {
        setError('Email inválido')
        return
      }

      if (!isPasswordValid) {
        setError('Senha não atende os requisitos')
        return
      }

      if (!isMatch) {
        setError('Senhas não coincidem')
        return
      }

      if (!consent) {
        setError('Você precisa aceitar os termos e a política de privacidade')
        return
      }

      await register(email, password, consent)
      setAccountCreated(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar conta')
    }
  }

  return (
    <AuthLayout title="Criar Conta" subtitle="Preencha os campos para criar sua conta">
    <div className=" flex flex-col gap-3">
        <div className="relative">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-3 pl-11 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${getInputBorder(isValidEmail(email), email)}`}
        />
         <span className="absolute left-3 top-3 text-gray-400">
          @
        </span>
        </div>

        <div className="relative">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-4 py-3 pl-11 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${getInputBorder(isPasswordValid, password)}`}
        />
        <span className="absolute left-3 top-3 text-gray-400">
          #
        </span>
        </div>

        <div className="text-xs flex flex-col gap-1">
          <span className={getColor(validations.length)}>{validations.length ? '✔' : '•'} Mínimo 8 caracteres</span>
          <span className={getColor(validations.upper)}>{validations.upper ? '✔' : '•'} Letra maiúscula</span>
          <span className={getColor(validations.lower)}>{validations.lower ? '✔' : '•'} Letra minúscula</span>
          <span className={getColor(validations.number)}>{validations.number ? '✔' : '•'} Número</span>
          <span className={getColor(validations.special)}>{validations.special ? '✔' : '•'} Caractere especial</span>
        </div>

        <div className="relative">
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full px-4 py-3 pl-11 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${getInputBorder(isMatch, confirmPassword)}`}
        />
        <span className="absolute left-3 top-3 text-gray-400">
          #
        </span>
        </div>

        {confirmPassword && (
          <span className={`text-xs ${isMatch ? 'text-green-600' : 'text-red-500'}`}>
            {isMatch ? '✔ Senhas coincidem' : '✖ Senhas não coincidem'}
          </span>
        )}

        <label className="flex items-start gap-2 text-sm text-gray-400">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
          <span>Aceito os termos de uso e a política de privacidade para fins de autenticação e uso da plataforma.</span>
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button onClick={handleRegister} className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 active:scale-[0.98] transition-all shadow-lg">
          Criar conta
        </button>

        <button onClick={() => navigate('/')} className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 active:scale-[0.98] transition-all shadow-lg">
          Fazer login
        </button>

        {accountCreated && <p className="text-green-600 text-sm text-center">Conta criada com sucesso! Redirecionando...</p>}
      </div>
    </AuthLayout>
  )
}
