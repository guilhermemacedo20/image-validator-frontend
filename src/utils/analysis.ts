export const VERDICT_ORDER: AnalysisVerdict[] = [
  "AI_GENERATED",
  "EDITED",
  "REAL",
  "INCONCLUSIVE",
];

interface VerdictMeta {
  label: string;
  shortLabel: string;
  description: string;
  swatch: string;
  soft: string;
  dailyKey: keyof Omit<DailyAnalysisCount, "date" | "total">;
}

export const VERDICT_META: Record<AnalysisVerdict, VerdictMeta> = {
  AI_GENERATED: {
    label: "Provável IA",
    shortLabel: "IA",
    description: "A imagem tem sinais fortes de ter sido criada por inteligência artificial.",
    swatch: "bg-[#6250d6] dark:bg-[#9085e9]",
    soft: "bg-violet-50 border-violet-200 dark:bg-violet-950/40 dark:border-violet-900",
    dailyKey: "aiGenerated",
  },
  EDITED: {
    label: "Real com edição",
    shortLabel: "Editada",
    description: "Parece uma foto real, mas há sinais de edição ou montagem.",
    swatch: "bg-[#eb6834] dark:bg-[#d95926]",
    soft: "bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900",
    dailyKey: "edited",
  },
  REAL: {
    label: "Provável real",
    shortLabel: "Real",
    description: "A imagem tem características compatíveis com uma foto real.",
    swatch: "bg-[#1baf7a] dark:bg-[#199e70]",
    soft: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900",
    dailyKey: "real",
  },
  INCONCLUSIVE: {
    label: "Inconclusivo",
    shortLabel: "Inconclusiva",
    description: "Não há evidências suficientes para uma conclusão segura.",
    swatch: "bg-[#eda100] dark:bg-[#c98500]",
    soft: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900",
    dailyKey: "inconclusive",
  },
};

export const CONFIDENCE_LABEL: Record<AnalysisConfidence, string> = {
  BAIXA: "Confiança baixa",
  MEDIA: "Confiança média",
  ALTA: "Confiança alta",
};

export const DIRECTION_META: Record<IndicatorDirection, { label: string; swatch: string }> = {
  IA: { label: "Indica IA", swatch: VERDICT_META.AI_GENERATED.swatch },
  EDICAO: { label: "Indica edição", swatch: VERDICT_META.EDITED.swatch },
  REAL: { label: "Indica foto real", swatch: VERDICT_META.REAL.swatch },
};

export const WEIGHT_LABEL: Record<IndicatorWeight, string> = {
  BAIXO: "evidência fraca",
  MEDIO: "evidência média",
  ALTO: "evidência forte",
};

const CATEGORY_LABEL: Record<string, string> = {
  ANATOMIA: "Anatomia",
  ILUMINACAO: "Iluminação",
  TEXTURA: "Textura",
  ARTEFATOS: "Artefatos",
  PADROES: "Padrões",
  TEXTO: "Texto",
  GEOMETRIA: "Geometria",
  METADADOS: "Metadados",
  EDICAO: "Edição",
  OUTRO: "Outro",
};

export const categoryLabel = (category: string): string =>
  CATEGORY_LABEL[category] ?? category;

export function resolveVerdict(result: AnalyzeResult): AnalysisVerdict {
  if (result.verdict) return result.verdict;
  return result.isAIGenerated ? "AI_GENERATED" : "REAL";
}

export function resolveIndicators(result: AnalyzeResult): AnalysisIndicator[] {
  if (result.indicators?.length) return result.indicators;
  return (result.reasons ?? []).map((description) => ({
    category: "OUTRO",
    direction: result.isAIGenerated ? "IA" : "REAL",
    weight: "MEDIO",
    description,
  }));
}

export function formatDateTime(iso?: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatShortDay(dateKey: string): string {
  const [, month, day] = dateKey.split("-");
  return `${day}/${month}`;
}

export function formatBytes(bytes?: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function percent(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_BYTES = 7 * 1024 * 1024;

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Formato não suportado. Envie uma imagem PNG, JPG ou WEBP.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `A imagem tem ${formatBytes(file.size)}. O limite é 7 MB.`;
  }
  return null;
}
