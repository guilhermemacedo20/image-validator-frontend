import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { api } from "../services/api"

export default function Dashboard() {
  const { logout } = useAuth()

  const [qrCode, setQrCode] = useState(null)
  const [code, setCode] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSetup2FA = async () => {
    try {
      setLoading(true)
      setMessage("")

      const res = await api.post("/auth/2fa/setup")

      setQrCode(res.data.qrCode)
    } catch {
      setMessage("Erro ao iniciar 2FA")
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm2FA = async () => {
    try {
      setLoading(true)
      setMessage("")

      await api.post("/auth/2fa/confirm", {
        token: code,
      })

      setMessage("✅ 2FA ativado com sucesso!")
      setQrCode(null)
      setCode("")
    } catch {
      setMessage("❌ Código inválido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl mb-6 font-bold">Dashboard</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Segurança</h2>

        {!qrCode ? (
          <button
            onClick={handleSetup2FA}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Ativar 2FA
          </button>
        ) : (
          <div>
            <p className="mb-2">Escaneie o QR Code:</p>

            <img src={qrCode} alt="QR Code" className="mb-4" />

            <input
              placeholder="Digite o código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border p-2 mb-2 w-full"
            />

            <button
              onClick={handleConfirm2FA}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
          </div>
        )}

        {message && (
          <p className="mt-3 text-sm font-medium">{message}</p>
        )}
      </div>
      {loading && <p className="mb-4 text-sm text-gray-500">Processando...</p>}

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}