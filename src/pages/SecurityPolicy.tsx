import { useNavigate } from "react-router-dom";

export default function SecurityPolicy() {
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
            onClick={() => navigate('/register')}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Documento Legal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Política de Segurança da Informação
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Última atualização: maio de 2026 · Versão 1.0
            </p>
          </div>

          {/* Intro */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
            Esta Política de Segurança da Informação descreve os mecanismos técnicos e organizacionais
            adotados pelo <strong>Deep Analysis for Learning-based Evidence</strong> para garantir a confidencialidade, integridade
            e disponibilidade dos dados pessoais e operacionais tratados pela plataforma, em conformidade
            com a LGPD (Lei nº 13.709/2018) e boas práticas de segurança da informação.
          </p>

          <div className="space-y-8">

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</span>
                Autenticação e Controle de Acesso
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Hash de senhas</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Senhas armazenadas exclusivamente em formato hash utilizando <strong>bcrypt</strong> com fator de custo parametrizado (mínimo 12 rounds), garantindo resistência a ataques de força bruta.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Tokens JWT</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Autenticação baseada em <strong>JSON Web Tokens</strong> de curta duração (15 min), combinados com refresh tokens rotativos e blacklist para invalidação segura.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Autenticação Multifator (MFA)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Suporte a <strong>TOTP</strong> (Time-based One-Time Password) via aplicativo autenticador, com geração de QR Code e janela de validação de 2 períodos.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Proteção de rotas</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Todas as rotas sensíveis exigem token válido e não presente na blacklist. Rotas administrativas possuem verificação adicional de permissão.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</span>
                Criptografia de Dados
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Dados em repouso</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Dados sensíveis são cifrados no banco de dados utilizando <strong>AES-256-CBC</strong> com vetor de inicialização (IV) aleatório por registro.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Dados em trânsito</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Toda comunicação entre cliente e servidor é protegida por <strong>TLS/HTTPS</strong>. Conexões não seguras são redirecionadas automaticamente em ambiente de produção.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Token de reset</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Tokens de recuperação de senha são armazenados como hash <strong>SHA-256</strong>, nunca em texto claro.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Chaves criptográficas</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Chaves e segredos são gerenciados exclusivamente via variáveis de ambiente, nunca expostos no código-fonte ou repositório.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</span>
                Proteção Contra Ataques
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Força bruta</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Contas são bloqueadas temporariamente após <strong>5 tentativas consecutivas</strong> de login com falha. Atraso artificial de 700ms é aplicado em todas as tentativas.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Rate Limiting</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Limite de requisições por IP e por usuário autenticado em todas as rotas sensíveis: <strong>5 tentativas de login</strong> por 15 minutos e <strong>5 análises de imagem</strong> por minuto.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Validação de entrada</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Todos os dados recebidos pela API são validados e sanitizados antes do processamento, prevenindo injeções e manipulação de dados.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Requisitos de senha</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Senhas devem ter mínimo de 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais, prevenindo senhas fracas.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</span>
                Auditoria e Monitoramento
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Todas as ações relevantes são registradas em logs de auditoria, incluindo:
                </p>
                <ul className="space-y-2">
                  {[
                    "Tentativas de login (com sucesso ou falha)",
                    "Ativação, confirmação e desativação do 2FA",
                    "Alterações de perfil e dados pessoais",
                    "Solicitações e redefinições de senha",
                    "Análises de imagem realizadas",
                    "Exportação, revogação de consentimento e exclusão de conta",
                    "Operações de logout"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
                  Cada registro contém: identificação do usuário, endereço IP, agente de navegação, data/hora e detalhes da ação.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</span>
                Gestão de Sessão
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Renovação automática</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">O frontend renova automaticamente o access token via refresh token quando necessário, sem interromper a sessão do usuário.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Invalidação no logout</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">O access token é adicionado à blacklist e o refresh token é revogado no banco de dados, impedindo qualquer reutilização após o logout.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Falha de refresh</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Em caso de falha na renovação do token, todos os dados de sessão locais são removidos e o usuário é redirecionado ao login.</span>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">6</span>
                Responsabilidades
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  A plataforma é responsável pela segurança dos dados em seu ambiente. O usuário é responsável por:
                </p>
                <ul className="space-y-2">
                  {[
                    "Manter sua senha confidencial e não compartilhá-la",
                    "Utilizar autenticação multifator sempre que possível",
                    "Notificar imediatamente qualquer acesso suspeito à sua conta",
                    "Manter seus dados de contato atualizados"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">7</span>
                Incidentes de Segurança
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Em caso de incidente de segurança que possa afetar dados pessoais, a plataforma se compromete a:
                </p>
                <ul className="space-y-2">
                  {[
                    "Identificar e conter o incidente no menor tempo possível",
                    "Notificar os titulares afetados em até 72 horas, conforme exigido pela LGPD",
                    "Comunicar a Autoridade Nacional de Proteção de Dados (ANPD) quando aplicável",
                    "Documentar o incidente e as medidas corretivas adotadas"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Contact */}
            <div className="mt-10 p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Reportar uma vulnerabilidade</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Identificou alguma falha de segurança? Entre em contato com nossa equipe pelo e-mail:{" "}
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
