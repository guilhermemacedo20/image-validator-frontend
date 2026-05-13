import { useNavigate } from "react-router-dom";

export default function RetentionPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-100 to-purple-100 dark:from-gray-950 dark:via-gray-950 dark:to-purple-950" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <header className="h-16 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="h-full px-6 flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          <span className="text-sm text-gray-400 dark:text-gray-500">Deep Analysis for Learning-based Evidence</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">

          {/* Title */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Documento Legal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Política de Retenção de Dados
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Última atualização: maio de 2026 · Versão 1.0
            </p>
          </div>

          {/* Intro */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
            Esta Política de Retenção de Dados descreve por quanto tempo o <strong>Deep Analysis for Learning-based Evidence</strong> armazena
            os dados pessoais e operacionais coletados durante o uso da plataforma, bem como os critérios utilizados
            para definir esses prazos e os procedimentos adotados após o encerramento do período de retenção,
            em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
          </p>

          <div className="space-y-8">

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</span>
                Dados de Cadastro e Conta
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Dados coletados</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">E-mail, nome, sobrenome, senha (hash) e registro de consentimento.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Prazo de retenção</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Mantidos enquanto a conta estiver ativa. Após a exclusão da conta pelo usuário, os dados são removidos permanentemente em até <strong>30 dias</strong>.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Justificativa</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Necessário para a prestação do serviço e cumprimento de obrigações contratuais com o titular.</span>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</span>
                Tokens de Autenticação
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Access Token (JWT)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Expira em <strong>15 minutos</strong>. Após o logout, é adicionado à blacklist até expirar.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Refresh Token</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Expira em <strong>7 dias</strong>. Invalidado após uso (rotação) ou no logout.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Token 2FA</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Expira em <strong>5 minutos</strong> após a geração.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</span>
                Token de Recuperação de Senha
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Prazo de validade</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">O token de redefinição de senha expira em <strong>15 minutos</strong> após a solicitação.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Armazenamento</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Armazenado em formato hash (SHA-256) no banco de dados. Removido imediatamente após o uso ou expiração.</span>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</span>
                Logs de Auditoria
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Dados registrados</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Ações do usuário (login, logout, alterações de conta, análises de imagem), endereço IP, agente de navegação e data/hora.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Prazo de retenção</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Retidos por <strong>12 meses</strong> a partir do registro, para fins de auditoria, segurança e cumprimento de obrigações legais.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Justificativa</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Exigência de rastreabilidade para fins de segurança da informação e conformidade com a LGPD.</span>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</span>
                Imagens Enviadas para Análise
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Prazo de retenção</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">As imagens enviadas são processadas e <strong>excluídas imediatamente</strong> após a análise. Nenhuma imagem é armazenada permanentemente.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Justificativa</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Princípio de minimização de dados previsto na LGPD. O armazenamento temporário ocorre apenas durante o processamento.</span>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">6</span>
                Consentimento
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Dados registrados</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Data do consentimento, versão dos termos aceitos e status atual (ativo ou revogado).</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Prazo de retenção</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Mantido pelo período de vigência da conta e por até <strong>5 anos</strong> após o encerramento, para fins de comprovação legal.</span>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">7</span>
                Eliminação de Dados
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Ao solicitar a exclusão da conta, todos os dados pessoais associados são removidos permanentemente
                  em até <strong>30 dias</strong>, exceto aqueles que devem ser mantidos por obrigação legal
                  (como registros de consentimento e logs de auditoria dentro do prazo previsto).
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  O usuário pode solicitar a exclusão a qualquer momento através da seção
                  <strong> Privacidade</strong> no painel da conta.
                </p>
              </div>
            </section>

            {/* Contact */}
            <div className="mt-10 p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Dúvidas sobre esta política?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Entre em contato com nosso encarregado de dados (DPO) pelo e-mail:{" "}
                <a href="mailto:smtpfabricio@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline">
                  smtpfabricio@gmail.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
