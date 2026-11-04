import { useEffect, useRef } from "react";

import { formatBytes } from "@/utils/analysis";
import AnalysisResultCard from "./AnalysisResultCard";

interface AnalysisDetailsModalProps {
  analysis: AnalysisHistoryItem | null;
  onClose: () => void;
}

export default function AnalysisDetailsModal({ analysis, onClose }: AnalysisDetailsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (analysis && !dialog.open) dialog.showModal();
    if (!analysis && dialog.open) dialog.close();
  }, [analysis]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="w-[min(920px,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] rounded-3xl p-0 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {analysis && (
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold truncate">{analysis.fileName || "Imagem sem nome"}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {analysis.mimeType} · {formatBytes(analysis.sizeBytes)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes"
              className="shrink-0 rounded-xl p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <AnalysisResultCard result={analysis} />
        </div>
      )}
    </dialog>
  );
}
