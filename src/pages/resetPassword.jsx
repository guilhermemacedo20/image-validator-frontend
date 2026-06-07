import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const token = params.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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

  const handleReset = async () => {
    try {
      setError("")
      setSuccess("")

      if (!token) {
        setError("Token inválido")
        return
      }

      if (!isPasswordValid) {
        setError("Senha não atende os requisitos")
        return
      }

      if (!isMatch) {
        setError("Senhas não coincidem")
        return
      }

      await resetPassword(token, password)

      setSuccess("Senha alterada com sucesso!")

      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.error || "Token inválido ou expirado")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-3">
        <h1 className="text-xl font-bold text-center uppercase">Redefinir Senha</h1>

        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`p-2 rounded border ${getInputBorder(isPasswordValid, password)}`}
        />

        <div className="text-xs flex flex-col gap-1">
          <span className={getColor(validations.length)}>{validations.length ? '✔' : '•'} Mínimo 8 caracteres</span>
          <span className={getColor(validations.upper)}>{validations.upper ? '✔' : '•'} Letra maiúscula</span>
          <span className={getColor(validations.lower)}>{validations.lower ? '✔' : '•'} Letra minúscula</span>
          <span className={getColor(validations.number)}>{validations.number ? '✔' : '•'} Número</span>
          <span className={getColor(validations.special)}>{validations.special ? '✔' : '•'} Caractere especial</span>
        </div>

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className={`p-2 rounded border ${getInputBorder(isMatch, confirmPassword)}`}
        />

        {confirmPassword && (
          <span className={`text-xs ${isMatch ? 'text-green-600' : 'text-red-500'}`}>
            {isMatch ? '✔ Senhas coincidem' : '✖ Senhas não coincidem'}
          </span>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}

        <button
          onClick={handleReset}
          className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
        >
          Redefinir senha
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Voltar para login
        </button>
      </div>
    </div>
  )
}