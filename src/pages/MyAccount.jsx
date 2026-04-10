import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { api } from "../services/api"

export default function MyAccount() {
  const { logout,user,fetchUser } = useAuth()

  const [tab, setTab] = useState("profile")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [profileMessage, setProfileMessage] = useState("")

  const [qrCode, setQrCode] = useState(null)
  const [code, setCode] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const isValidPhone = (value) => {
    return /^\d{10,11}$/.test(value.replace(/\D/g, ""))
  }

  const handleSaveProfile = async () => {
    try {
      setProfileMessage("")

      if (!firstName || !lastName || !phone || !address) {
        setProfileMessage("Preencha todos os campos")
        return
      }

      if (!isValidPhone(phone)) {
        setProfileMessage("Telefone inválido")
        return
      }

      await api.put("/user/profile", {
        firstName,
        lastName,
        phone,
        address,
      })

      setProfileMessage("✅ Dados atualizados com sucesso")
    } catch {
      setProfileMessage("❌ Erro ao salvar dados")
    }
  }

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

  const handleDisable2FA = async () => {
    try {
      setLoading(true)
      setMessage("")

      await api.post("/auth/2fa/disable", {
        userId: user.id,
        email: user.email
      })
      setCode("")
      await fetchUser()
    } catch {
      setMessage("❌ Código inválido ou erro ao desativar")
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
      await fetchUser()
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
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        <h1 className="text-2xl font-bold mb-6 text-center uppercase">
          Minha Conta
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 p-2 rounded ${
              tab === "profile" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            Dados
          </button>
          <button
            onClick={() => setTab("security")}
            className={`flex-1 p-2 rounded ${
              tab === "security" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            Segurança
          </button>
        </div>

        {tab === "profile" && (
          <div className="flex flex-col gap-3">
            <input
              placeholder="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 rounded"
            />

            {profileMessage && (
              <p className="text-sm">{profileMessage}</p>
            )}

            <button
              onClick={handleSaveProfile}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Salvar dados
            </button>
          </div>
        )}

        {tab === "security" && (
          <div>
           {user?.twoFactorEnabled ? (
            <div className="flex flex-col gap-3">
              <p className="text-green-600 font-medium">
                ✅ 2FA já está ativado
              </p>

              <button
                onClick={handleDisable2FA}
                className="text-red-500 p-2"
              >
                Desativar 2FA
              </button>
            </div>
          ) : !qrCode ? (
            <button
              onClick={handleSetup2FA}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Ativar 2FA
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <p>Escaneie o QR Code:</p>

              <img src={qrCode} alt="QR Code" className="w-40" />

              <input
                placeholder="Digite o código"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border p-2 rounded"
              />

              <button
                onClick={handleConfirm2FA}
                className="bg-green-500 text-white p-2 rounded"
              >
                Confirmar
              </button>
            </div>
          )}

            {message && (
              <p className="mt-3 text-sm font-medium">{message}</p>
            )}

            {loading && (
              <p className="text-sm text-gray-500 mt-2">Processando...</p>
            )}
          </div>
        )}

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-6 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  )
}