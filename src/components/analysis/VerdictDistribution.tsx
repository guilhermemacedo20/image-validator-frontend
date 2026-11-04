import { VERDICT_META, VERDICT_ORDER, percent } from "@/utils/analysis";

interface VerdictDistributionProps {
  byVerdict: Record<AnalysisVerdict, number>;
  total: number;
}

export default function VerdictDistribution({ byVerdict, total }: VerdictDistributionProps) {
  if (total === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">Sem análises ainda.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        className="flex h-4 w-full gap-0.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
        role="img"
        aria-label={VERDICT_ORDER.map((v) => `${VERDICT_META[v].shortLabel}: ${byVerdict[v] ?? 0}`).join(", ")}
      >
        {VERDICT_ORDER.map((v) =>
          byVerdict[v] ? (
            <div
              key={v}
              className={`h-full ${VERDICT_META[v].swatch}`}
              style={{ flexGrow: byVerdict[v], flexBasis: 0 }}
              title={`${VERDICT_META[v].shortLabel}: ${byVerdict[v]}`}
            />
          ) : null,
        )}
      </div>

      <ul className="flex flex-col gap-3">
        {VERDICT_ORDER.map((v) => (
          <li key={v} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <span aria-hidden="true" className={`h-3 w-3 rounded-sm ${VERDICT_META[v].swatch}`} />
              {VERDICT_META[v].label}
            </span>
            <span className="tabular-nums text-gray-900 dark:text-white">
              <strong>{byVerdict[v] ?? 0}</strong>
              <span className="text-gray-500 dark:text-gray-400"> · {percent(byVerdict[v] ?? 0, total)}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
