import PageContainer from '@/components/PageContainer'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'

export default function MyAccount() {
  const { logout, user, fetchUser } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('profile')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profileMessage, setProfileMessage] = useState('')
  const [qrCode, setQrCode] = useState(null)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [exportedData, setExportedData] = useState('')

  useEffect(() => {
    setFirstName(user?.firstName || '')
    setLastName(user?.lastName || '')
  }, [user])

  const handleSaveProfile = async () => {
    try {
      setProfileMessage('')

      if (!firstName || !lastName) {
        setProfileMessage('Preencha todos os campos')
        return
      }

      const res = await api.put('/user/profile', { firstName, lastName })
      setFirstName(res.data.user.firstName)
      setLastName(res.data.user.lastName)
      await fetchUser()
      setProfileMessage('✅ Dados atualizados com sucesso')
    } catch (error: any) {
      setProfileMessage(error.response?.data?.error || '❌ Erro ao salvar dados')
    }
  }

  const handleSetup2FA = async () => {
    try {
      setLoading(true)
      setMessage('')
      const res = await api.post('/auth/2fa/setup')
      setQrCode(res.data.qrCode)
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Erro ao iniciar 2FA')
    } finally {
      setLoading(false)
    }
  }

  const handleDisable2FA = async () => {
    try {
      setLoading(true)
      setMessage('')
      await api.post('/auth/2fa/disable')
      setCode('')
      setQrCode(null)
      await fetchUser()
      setMessage('✅ 2FA desativado com sucesso')
    } catch (error: any) {
      setMessage(error.response?.data?.error || '❌ Erro ao desativar 2FA')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm2FA = async () => {
    try {
      setLoading(true)
      setMessage('')
      await api.post('/auth/2fa/confirm', { token: code })
      await fetchUser()
      setQrCode(null)
      setCode('')
      setMessage('✅ 2FA ativado com sucesso')
    } catch (error: any) {
      setMessage(error.response?.data?.error || '❌ Código inválido')
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = async () => {
    try {
      const res = await api.get('/user/export')
      setExportedData(JSON.stringify(res.data.data, null, 2))
      setMessage('Dados exportados com sucesso')
    } catch (error: any) {
      setMessage(error.response?.data?.error || '❌ Erro ao exportar dados')
    }
  }

  const handleRevokeConsent = async () => {
    try {
      await api.post('/user/revoke-consent')
      await fetchUser()
      setMessage('Consentimento revogado com sucesso')
    } catch (error: any) {
      setMessage(error.response?.data?.error || '❌ Erro ao revogar consentimento')
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')
    if (!confirmed) return

    try {
      await api.delete('/user')
      localStorage.clear()
      window.location.href = '/'
    } catch (error: any) {
      setMessage(error.response?.data?.error || '❌ Erro ao excluir conta')
    }
  }

  const handleAnalyze = (value: string) => {

    setTab(value);

    if (value === "analyze") {
      navigate("/analyze-image");
    }
  };

  const sidebarItems = [
     {
      id: "analyze",
      title: "Análise de Imagem",
      subtitle: "Detector de IA",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L15 12l-5.25-5"
          />
        </svg>
      )
    },
    {
      id: 'profile',
      title: 'Dados da Conta',
      subtitle: 'Informações pessoais',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )
    },

    {
      id: 'security',
      title: 'Segurança',
      subtitle: 'Autenticação e proteção',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 relative left-px"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm0 0v2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    },

    {
      id: 'privacy',
      title: 'Privacidade',
      subtitle: 'Dados e consentimento',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 relative left-px"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    }
  ]

 return (
    <DashboardLayout
      user={user}
      firstName={firstName}
      currentTab={tab}
      onTabChange={handleAnalyze}
      onAnalyze={() => navigate('/analyze-image')}
      onLogout={logout}
      sidebarItems={sidebarItems}
    >

      {/* PROFILE */}
      {tab === 'profile' && (
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dados da Conta
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Atualize suas informações pessoais
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Nome
              </label>

              <input
                placeholder="Nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Sobrenome
              </label>

              <input
                placeholder="Sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

          </div>

          <div className="mt-6 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Consentimento:{' '}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {user?.consent ? 'ativo' : 'revogado'}
              </span>

              {user?.consentDate
                ? ` • ${new Date(user.consentDate).toLocaleString('pt-BR')}`
                : ''}
            </p>
          </div>

          {profileMessage && (
            <p className="mt-4 text-sm font-medium">
              {profileMessage}
            </p>
          )}

          <button
            onClick={handleSaveProfile}
            className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-900/30 transition-all text-white px-6 py-3 rounded-2xl font-medium"
          >
            Salvar Dados
          </button>

        </div>
      )}

      {/* SECURITY */}
      {tab === 'security' && (
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8">

          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Segurança
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Gerencie sua autenticação
            </p>
          </div>

          {user?.twoFactorEnabled ? (
            <div className="flex flex-col gap-4">

              <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
                <p className="text-green-600 font-semibold">
                  ✅ 2FA já está ativado
                </p>
              </div>

              <button
                onClick={handleDisable2FA}
                className="bg-red-500 hover:bg-red-600 transition-colors text-white px-5 py-3 rounded-2xl w-fit"
              >
                Desativar 2FA
              </button>

            </div>
          ) : !qrCode ? (
            <button
              onClick={handleSetup2FA}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] transition-all text-white px-5 py-3 rounded-2xl w-fit"
            >
              Ativar 2FA
            </button>
          ) : (
            <div className="flex flex-col gap-5">

              <div>
                <p className="font-medium mb-4">
                  Escaneie o QR Code:
                </p>

                <div className="w-fit p-5 rounded-3xl bg-white shadow-xl">
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="w-48"
                  />
                </div>
              </div>

              <input
                placeholder="Digite o código"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="max-w-sm bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />

              <button
                onClick={handleConfirm2FA}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] transition-all text-white px-5 py-3 rounded-2xl w-fit"
              >
                Confirmar
              </button>

            </div>
          )}

          {message && (
            <p className="mt-5 text-sm font-medium">
              {message}
            </p>
          )}

          {loading && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              Processando...
            </p>
          )}

        </div>
      )}

      {/* PRIVACY */}
      {tab === 'privacy' && (
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8">

          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Privacidade
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Controle seus dados e permissões
            </p>
          </div>

          <div className="flex flex-col gap-4">

            <button
              onClick={handleExportData}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.01] transition-all text-white p-4 rounded-2xl text-left"
            >
              Exportar meus dados
            </button>

            <button
              onClick={handleRevokeConsent}
              className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white p-4 rounded-2xl text-left"
            >
              Revogar consentimento
            </button>

            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 transition-colors text-white p-4 rounded-2xl text-left"
            >
              Excluir minha conta
            </button>

            {exportedData && (
              <pre className="bg-gray-100 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl text-xs overflow-auto max-h-96">
                {exportedData}
              </pre>
            )}

          </div>

        </div>
      )}

    </DashboardLayout>
  )
}