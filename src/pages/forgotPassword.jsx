import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import AuthLayout from "../components/AuthLayout"

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    try {
      await forgotPassword(email)
      setMessage("Se o email existir, você receberá instruções")
    } catch {
      setMessage("Erro ao solicitar recuperação")
    }
  }

  return (
    <AuthLayout title="Recuperar Senha" subtitle="Digite seu email para realizar a recuperação">
      <div className="relative">
        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 pl-11 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <span className="absolute left-3 top-3 text-gray-400">
          @
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 active:scale-[0.98] transition-all shadow-lg"
      >
        Enviar
      </button>

      {message && <p className="text-sm mt-3 text-center">{message}</p>}
    </AuthLayout>
  )
}