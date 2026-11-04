import { useState } from "react";
import { Link } from "react-router-dom";

import ActivityChart from "@/components/analysis/ActivityChart";
import AnalysisDetailsModal from "@/components/analysis/AnalysisDetailsModal";
import VerdictBadge from "@/components/analysis/VerdictBadge";
import VerdictDistribution from "@/components/analysis/VerdictDistribution";
import DashboardLayout from "@/components/DashboardLayout";
import { mainSidebarItems, useMainNavigation } from "@/components/navigation/mainSidebar";
import { useAuth } from "@/context/AuthContext";
import { useAnalysisHistory } from "@/hooks/useAnalysisHistory";
import { VERDICT_META, VERDICT_ORDER, formatDateTime, percent } from "@/utils/analysis";

const card =
  "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl";

function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className={`${card} p-5`}>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1 tabular-nums">{value}</p>
      {hint && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { logout, user } = useAuth();
  const goTo = useMainNavigation();
  const { list, stats, loading, error, page, setPage, verdict, changeVerdict, remove } =
    useAnalysisHistory();
  const [selected, setSelected] = useState<AnalysisHistoryItem | null>(null);

  const total = stats?.total ?? 0;
  const byVerdict = stats?.byVerdict;
  const firstLoad = loading && !stats;

  const handleDelete = async (item: AnalysisHistoryItem) => {
    const confirmed = window.confirm(
      `Excluir a análise de "${item.fileName || "imagem sem nome"}"? Essa ação não pode ser desfeita.`,
    );
    if (!confirmed) return;
    const ok = await remove(item.id);
    if (ok && selected?.id === item.id) setSelected(null);
  };

  return (
    <DashboardLayout
      user={user}
      currentTab="dashboard"
      onTabChange={goTo}
      onLogout={logout}
      sidebarItems={mainSidebarItems}
    >
      <div className="flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Suas últimas análises e um resumo do que foi encontrado.
              {stats?.lastAnalysisAt && ` Última análise em ${formatDateTime(stats.lastAnalysisAt)}.`}
            </p>
          </div>
          <Link
            to="/analyze-image"
            className="shrink-0 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-xl hover:shadow-purple-900/30 transition-all"
          >
            Nova análise
          </Link>
        </header>

        {error && (
          <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl">
            {error}
          </div>
        )}

        {firstLoad ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`${card} h-28 animate-pulse`} />
            ))}
          </div>
        ) : total === 0 && !verdict ? (
          <div className={`${card} p-10 text-center`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nenhuma análise ainda</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
              Faça sua primeira análise e o histórico aparece aqui.
            </p>
            <Link
              to="/analyze-image"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Analisar uma imagem
            </Link>
          </div>
        ) : (
          <div className={`flex flex-col gap-6 transition-opacity ${loading ? "opacity-60" : ""}`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatTile label="Análises feitas" value={String(total)} />
              <StatTile
                label="Prováveis IA"
                value={`${percent(byVerdict?.AI_GENERATED ?? 0, total)}%`}
                hint={`${byVerdict?.AI_GENERATED ?? 0} de ${total}`}
              />
              <StatTile
                label="Prováveis reais"
                value={`${percent((byVerdict?.REAL ?? 0) + (byVerdict?.EDITED ?? 0), total)}%`}
                hint={`${byVerdict?.EDITED ?? 0} com sinais de edição`}
              />
              <StatTile
                label="Chance média de IA"
                value={`${stats?.averageScoreIa ?? 0}%`}
                hint="média de todas as análises"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className={`${card} p-6 lg:col-span-2`}>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Análises por dia</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Últimos 14 dias</p>
                {stats && <ActivityChart daily={stats.daily} />}
              </section>

              <section className={`${card} p-6`}>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Resultados</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Todas as análises</p>
                {byVerdict && <VerdictDistribution byVerdict={byVerdict} total={total} />}
              </section>
            </div>

            <section className={`${card} p-6`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Últimas análises</h2>

                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por resultado">
                  {[null, ...VERDICT_ORDER].map((v) => (
                    <button
                      key={v ?? "all"}
                      type="button"
                      onClick={() => changeVerdict(v)}
                      aria-pressed={verdict === v}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium border transition-all ${
                        verdict === v
                          ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white"
                          : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {v ? VERDICT_META[v].shortLabel : "Todas"}
                    </button>
                  ))}
                </div>
              </div>

              {list && list.items.length === 0 ? (
                <p className="py-8 text-center text-gray-500 dark:text-gray-400">
                  Nenhuma análise com esse resultado.
                </p>
              ) : (
                <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
                  {list?.items.map((item) => (
                    <li key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {item.fileName || "Imagem sem nome"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {formatDateTime(item.analyzedAt)} · {item.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <VerdictBadge verdict={item.verdict} />
                        <span className="w-14 text-right text-sm tabular-nums text-gray-700 dark:text-gray-200" title="Chance de ser IA">
                          {item.scoreIa}% IA
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelected(item)}
                          className="rounded-xl px-3 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                        >
                          Detalhes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          aria-label={`Excluir análise de ${item.fileName || "imagem sem nome"}`}
                          className="rounded-xl p-2 text-gray-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {list && list.totalPages > 1 && (
                <nav className="flex items-center justify-between mt-5 text-sm" aria-label="Paginação">
                  <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1 || loading}
                    className="rounded-xl px-4 py-2 border border-gray-300 dark:border-gray-700 disabled:opacity-40"
                  >
                    Anterior
                  </button>
                  <span className="text-gray-500 dark:text-gray-400">
                    Página {list.page} de {list.totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= list.totalPages || loading}
                    className="rounded-xl px-4 py-2 border border-gray-300 dark:border-gray-700 disabled:opacity-40"
                  >
                    Próxima
                  </button>
                </nav>
              )}
            </section>
          </div>
        )}
      </div>

      <AnalysisDetailsModal analysis={selected} onClose={() => setSelected(null)} />
    </DashboardLayout>
  );
}
