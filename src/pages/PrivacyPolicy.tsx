import AuthLayout from "@/components/AuthLayout";

export default function PrivacyPolicy() {
  return (
    <AuthLayout
      title="Política de Privacidade"
      subtitle="Entenda como suas informações são coletadas e utilizadas"
    >
      <div className="max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">
          Política de Privacidade
        </h1>

        <div className="space-y-8 text-sm leading-7 text-gray-300">
          <section>
            <p>
              Esta Política de Privacidade descreve como os dados dos usuários
              são coletados, utilizados, armazenados e protegidos durante o uso
              da plataforma. Ao utilizar nossos serviços, o usuário concorda com
              as práticas descritas neste documento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Dados Coletados
            </h2>

            <p>
              Durante a utilização da plataforma, poderão ser coletados os
              seguintes dados:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Nome e endereço de e-mail;</li>
              <li>Senha criptografada para autenticação;</li>
              <li>Informações de acesso e navegação;</li>
              <li>Imagens enviadas para análise;</li>
              <li>Dados técnicos do dispositivo e navegador.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. Finalidade da Coleta
            </h2>

            <p>
              Os dados coletados são utilizados para:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Permitir autenticação e acesso seguro à plataforma;</li>
              <li>Realizar análises de imagens utilizando inteligência artificial;</li>
              <li>Melhorar funcionalidades e desempenho do sistema;</li>
              <li>Garantir segurança, prevenção de fraudes e monitoramento;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Armazenamento e Segurança
            </h2>

            <p>
              As informações são armazenadas em ambiente seguro e protegidas
              contra acessos não autorizados, vazamentos, alterações ou
              destruição indevida.
            </p>

            <p className="mt-3">
              A plataforma utiliza mecanismos de autenticação, criptografia e
              boas práticas de segurança para proteção dos dados dos usuários.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Uso das Imagens Enviadas
            </h2>

            <p>
              As imagens enviadas pelo usuário são utilizadas exclusivamente
              para processamento e análise dentro da plataforma.
            </p>

            <p className="mt-3">
              As imagens não serão compartilhadas com terceiros sem autorização,
              exceto quando exigido por obrigação legal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Compartilhamento de Dados
            </h2>

            <p>
              Os dados pessoais não são vendidos ou compartilhados com terceiros,
              exceto nas seguintes situações:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Quando houver obrigação legal;</li>
              <li>Para cumprimento de decisões judiciais;</li>
              <li>Para investigação de atividades ilícitas;</li>
              <li>Quando necessário para funcionamento técnico da plataforma.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Direitos do Usuário
            </h2>

            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), o
              usuário poderá:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Solicitar acesso aos seus dados;</li>
              <li>Solicitar correção de informações incorretas;</li>
              <li>Solicitar exclusão de dados pessoais;</li>
              <li>Revogar consentimentos fornecidos anteriormente;</li>
              <li>Solicitar informações sobre o tratamento dos dados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Cookies e Tecnologias de Navegação
            </h2>

            <p>
              A plataforma poderá utilizar cookies e tecnologias semelhantes
              para melhorar a experiência do usuário, manter sessões ativas e
              coletar métricas de desempenho.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              8. Retenção de Dados
            </h2>

            <p>
              Os dados serão armazenados apenas pelo período necessário para
              cumprimento das finalidades descritas nesta política ou conforme
              exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              9. Alterações nesta Política
            </h2>

            <p>
              Esta Política de Privacidade poderá ser atualizada periodicamente
              para refletir melhorias na plataforma, alterações legais ou novas
              funcionalidades.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              10. Contato
            </h2>

            <p>
              Em caso de dúvidas sobre esta Política de Privacidade ou sobre o
              tratamento de dados pessoais, o usuário poderá entrar em contato
              pelos canais oficiais da plataforma.
            </p>
          </section>

          <div className="border-t border-gray-700 pt-6 text-xs text-gray-500">
            Última atualização: Maio de 2026
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
