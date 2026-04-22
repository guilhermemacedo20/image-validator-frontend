import { useState } from "react"
import { useAuth } from "../context/AuthContext"

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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4 font-bold text-center">Recuperar senha</h1>

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Enviar
        </button>

        {message && <p className="text-sm mt-3 text-center">{message}</p>}
      </div>
    </div>
  )
}