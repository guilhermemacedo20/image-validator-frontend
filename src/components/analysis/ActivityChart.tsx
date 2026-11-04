import { useState } from "react";

import { VERDICT_META, VERDICT_ORDER, formatShortDay } from "@/utils/analysis";

interface ActivityChartProps {
  daily: DailyAnalysisCount[];
}

const CHART_HEIGHT = 160;

function niceMax(value: number): number {
  if (value <= 4) return 4;
  if (value <= 10) return Math.ceil(value / 2) * 2;
  const step = Math.pow(10, Math.floor(Math.log10(value)));
  const top = Math.ceil(value / step) * step;
  return top % 2 === 0 ? top : top + step;
}

export default function ActivityChart({ daily }: ActivityChartProps) {
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  const max = niceMax(Math.max(0, ...daily.map((d) => d.total)));
  const hasData = daily.some((d) => d.total > 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-300" aria-label="Legenda">
          {VERDICT_ORDER.map((v) => (
            <li key={v} className="flex items-center gap-2">
              <span aria-hidden="true" className={`h-3 w-3 rounded-sm ${VERDICT_META[v].swatch}`} />
              {VERDICT_META[v].shortLabel}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setShowTable((s) => !s)}
          className="text-sm font-medium text-purple-700 dark:text-purple-300 hover:underline"
        >
          {showTable ? "Ver gráfico" : "Ver como tabela"}
        </button>
      </div>

      {showTable ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Análises por dia nos últimos {daily.length} dias</caption>
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                <th className="py-2 pr-4 font-medium">Dia</th>
                {VERDICT_ORDER.map((v) => (
                  <th key={v} className="py-2 px-2 font-medium text-right">{VERDICT_META[v].shortLabel}</th>
                ))}
                <th className="py-2 pl-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {[...daily].reverse().map((d) => (
                <tr key={d.date} className="border-b border-gray-100 dark:border-gray-800/70">
                  <td className="py-2 pr-4 text-gray-700 dark:text-gray-200">{formatShortDay(d.date)}</td>
                  {VERDICT_ORDER.map((v) => (
                    <td key={v} className="py-2 px-2 text-right tabular-nums text-gray-700 dark:text-gray-200">
                      {d[VERDICT_META[v].dailyKey]}
                    </td>
                  ))}
                  <td className="py-2 pl-2 text-right tabular-nums font-semibold text-gray-900 dark:text-white">{d.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative">
          {!hasData && (
            <p className="absolute inset-0 z-10 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              Nenhuma análise nos últimos {daily.length} dias.
            </p>
          )}

          <div className="flex gap-3">
            <div
              className="flex flex-col justify-between text-[11px] tabular-nums text-gray-500 dark:text-gray-400 text-right w-6"
              style={{ height: CHART_HEIGHT }}
              aria-hidden="true"
            >
              <span>{max}</span>
              <span>{max / 2}</span>
              <span>0</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="relative" style={{ height: CHART_HEIGHT }}>
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" aria-hidden="true">
                  <div className="border-t border-gray-200 dark:border-gray-800" />
                  <div className="border-t border-dashed border-gray-200 dark:border-gray-800" />
                  <div className="border-t border-gray-300 dark:border-gray-700" />
                </div>

                <div className="absolute inset-0 flex items-end gap-1 sm:gap-2" onMouseLeave={() => setActive(null)}>
                  {daily.map((d, index) => {
                    const label = `${formatShortDay(d.date)}: ${d.total} ${d.total === 1 ? "análise" : "análises"}`;
                    return (
                      <div
                        key={d.date}
                        tabIndex={hasData ? 0 : -1}
                        aria-label={label}
                        onMouseEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        onBlur={() => setActive(null)}
                        className="relative flex-1 h-full flex flex-col justify-end outline-none rounded-t focus-visible:ring-2 focus-visible:ring-purple-500"
                      >
                        <div className="flex flex-col-reverse gap-0.5" style={{ height: `${(d.total / max) * 100}%` }}>
                          {VERDICT_ORDER.map((v) => {
                            const value = d[VERDICT_META[v].dailyKey];
                            if (!value) return null;
                            return (
                              <div
                                key={v}
                                className={`w-full last:rounded-t ${VERDICT_META[v].swatch} ${
                                  active === index ? "opacity-100" : active === null ? "opacity-100" : "opacity-50"
                                } transition-opacity`}
                                style={{ flexGrow: value, flexBasis: 0 }}
                              />
                            );
                          })}
                        </div>

                        {active === index && d.total > 0 && (
                          <div
                            role="tooltip"
                            className={`absolute bottom-full mb-2 z-20 w-40 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 shadow-xl text-xs ${
                              index > daily.length / 2 ? "right-0" : "left-0"
                            }`}
                          >
                            <p className="font-semibold text-gray-900 dark:text-white mb-2">
                              {formatShortDay(d.date)} · {d.total} {d.total === 1 ? "análise" : "análises"}
                            </p>
                            <ul className="flex flex-col gap-1">
                              {VERDICT_ORDER.map((v) => (
                                <li key={v} className="flex items-center justify-between gap-2">
                                  <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                    <span aria-hidden="true" className={`h-0.5 w-3 ${VERDICT_META[v].swatch}`} />
                                    {VERDICT_META[v].shortLabel}
                                  </span>
                                  <span className="font-semibold tabular-nums text-gray-900 dark:text-white">
                                    {d[VERDICT_META[v].dailyKey]}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-1 sm:gap-2 mt-2 text-[11px] text-gray-500 dark:text-gray-400" aria-hidden="true">
                {daily.map((d, index) => (
                  <span key={d.date} className="flex-1 text-center">
                    {index % 2 === daily.length % 2 ? "" : formatShortDay(d.date)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
