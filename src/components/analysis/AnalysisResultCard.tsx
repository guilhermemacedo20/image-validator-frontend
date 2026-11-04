import {
  CONFIDENCE_LABEL,
  DIRECTION_META,
  VERDICT_META,
  WEIGHT_LABEL,
  categoryLabel,
  formatDateTime,
  resolveIndicators,
  resolveVerdict,
} from "@/utils/analysis";
import ScoreMeter from "./ScoreMeter";
import VerdictBadge from "./VerdictBadge";

interface AnalysisResultCardProps {
  result: AnalyzeResult;
  previewUrl?: string | null;
  fileName?: string | null;
}

const DIRECTION_ORDER: IndicatorDirection[] = ["IA", "EDICAO", "REAL"];

function MetadataRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-gray-200/70 dark:border-gray-800 last:border-0">
      <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="text-right font-medium text-gray-800 dark:text-gray-100 break-all">{value}</dd>
    </div>
  );
}

export default function AnalysisResultCard({ result, previewUrl, fileName }: AnalysisResultCardProps) {
  const verdict = resolveVerdict(result);
  const meta = VERDICT_META[verdict];
  const indicators = resolveIndicators(result);
  const scoreIa = result.scoreIa ?? 0;
  const scoreReal = result.scoreReal ?? 100 - scoreIa;
  const metadata = result.metadata;

  const grouped = DIRECTION_ORDER.map((direction) => ({
    direction,
    items: indicators.filter((i) => i.direction === direction),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="flex flex-col gap-6" aria-live="polite">
      <div className={`rounded-3xl border p-6 ${meta.soft}`}>
        <div className="flex flex-col md:flex-row gap-6">
          {previewUrl && (
            <img
              src={previewUrl}
              alt={fileName ? `Imagem analisada: ${fileName}` : "Imagem analisada"}
              className="w-full md:w-48 h-48 object-cover rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg"
            />
          )}

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <VerdictBadge verdict={verdict} size="md" />
              {result.confidence && (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {CONFIDENCE_LABEL[result.confidence]}
                </span>
              )}
            </div>

            <p className="text-lg leading-relaxed text-gray-900 dark:text-white">
              {result.summary || meta.description}
            </p>

            <ScoreMeter
              scoreIa={scoreIa}
              scoreReal={scoreReal}
              scoreEdicao={result.scoreEdicao ?? 0}
            />
          </div>
        </div>
      </div>

      {grouped.length > 0 && (
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">O que a análise encontrou</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">
            Evidências da mais forte para a mais fraca, agrupadas pelo que indicam.
          </p>

          <div className="flex flex-col gap-6">
            {grouped.map(({ direction, items }) => (
              <div key={direction}>
                <p className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${DIRECTION_META[direction].swatch}`} />
                  {DIRECTION_META[direction].label}
                </p>

                <ul className="flex flex-col gap-3">
                  {items.map((indicator, index) => (
                    <li
                      key={`${direction}-${index}`}
                      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
                        <span className="rounded-full bg-gray-200 dark:bg-gray-700 px-2.5 py-0.5 font-semibold text-gray-700 dark:text-gray-200">
                          {categoryLabel(indicator.category)}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">{WEIGHT_LABEL[indicator.weight]}</span>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{indicator.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {metadata && (
        <details className="group rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-6">
          <summary className="cursor-pointer list-none flex items-center justify-between font-semibold text-gray-900 dark:text-white">
            Metadados do arquivo
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 group-open:hidden">Mostrar</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 hidden group-open:inline">Ocultar</span>
          </summary>

          <dl className="mt-4 text-sm">
            <MetadataRow label="Formato" value={metadata.format} />
            <MetadataRow
              label="Dimensões"
              value={metadata.width && metadata.height ? `${metadata.width} × ${metadata.height} px` : null}
            />
            <MetadataRow
              label="Câmera"
              value={[metadata.cameraMake, metadata.cameraModel].filter(Boolean).join(" ") || null}
            />
            <MetadataRow label="Data de captura" value={metadata.captureDate ? formatDateTime(metadata.captureDate) : null} />
            <MetadataRow label="Software" value={metadata.software} />
            <MetadataRow label="Gerador de IA nos metadados" value={metadata.aiGeneratorHint} />
            <MetadataRow label="Editor nos metadados" value={metadata.editingSoftwareHint} />
            <MetadataRow label="Content Credentials (C2PA)" value={metadata.hasContentCredentials ? "Presente" : null} />
          </dl>

          {!metadata.hasExif && !metadata.software && !metadata.aiGeneratorHint && !metadata.hasContentCredentials && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Nenhum metadado relevante. Isso é comum em imagens de redes sociais e apps de mensagem, e não indica IA por si só.
            </p>
          )}
        </details>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        O resultado é uma estimativa feita por IA e serve como apoio, não como prova. Confira sempre a fonte da imagem.
        {result.analyzedAt && ` Análise feita em ${formatDateTime(result.analyzedAt)}.`}
      </p>
    </section>
  );
}
