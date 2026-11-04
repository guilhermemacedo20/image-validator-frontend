import { VERDICT_META } from "@/utils/analysis";

interface VerdictBadgeProps {
  verdict: AnalysisVerdict;
  size?: "sm" | "md";
}

export default function VerdictBadge({ verdict, size = "sm" }: VerdictBadgeProps) {
  const meta = VERDICT_META[verdict];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap ${
        size === "md" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs"
      }`}
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${meta.swatch}`} />
      {meta.label}
    </span>
  );
}
