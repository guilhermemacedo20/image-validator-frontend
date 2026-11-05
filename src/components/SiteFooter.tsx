import { Link } from "react-router-dom";

import logoP from "@/assets/logos/logoP.png";
import logoW from "@/assets/logos/logoW.png";
import { PROJECT } from "@/config/project";

interface SiteFooterProps {
  compact?: boolean;
}

export default function SiteFooter({ compact = false }: SiteFooterProps) {
  const year = new Date().getFullYear();

  if (compact) {
    return (
      <footer className="border-t border-gray-200/70 dark:border-gray-800/70 px-6 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>
          {PROJECT.name} · Projeto acadêmico de {PROJECT.course}
        </p>
        <p className="mt-1">Equipe: {PROJECT.team.join(" · ")}</p>
      </footer>
    );
  }

  return (
    <footer className="border-t border-gray-200/70 dark:border-gray-800/70 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoP} alt="" className="h-9 block dark:hidden" />
            <img src={logoW} alt="" className="h-9 hidden dark:block" />
            <div>
              <p className="font-extrabold tracking-wide text-gray-900 dark:text-white">
                {PROJECT.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {PROJECT.fullName}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs">
            Uma ferramenta para ajudar você a desconfiar de imagens falsas antes
            de compartilhar.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Equipe
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Projeto acadêmico de {PROJECT.course}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
            {PROJECT.team.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Transparência
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <Link
                to="/politica-de-privacidade"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link
                to="/politica-de-retencao"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Política de Retenção de Dados
              </Link>
            </li>
            <li>
              <Link
                to="/politica-de-seguranca"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Política de Segurança
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200/70 dark:border-gray-800/70 px-6 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © {year} {PROJECT.name} · O resultado da análise é uma ajuda, não uma
        prova.
      </div>
    </footer>
  );
}
