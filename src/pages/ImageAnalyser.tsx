import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AnalysisResultCard from "@/components/analysis/AnalysisResultCard";
import DashboardLayout from "@/components/DashboardLayout";
import { mainSidebarItems, useMainNavigation } from "@/components/navigation/mainSidebar";
import { useAuth } from "@/context/AuthContext";
import { useAnalyzeImage } from "@/hooks/analyse";
import { formatBytes, validateImageFile } from "@/utils/analysis";

const LOADING_STEPS = [
  "Lendo os metadados do arquivo…",
  "Procurando falhas de anatomia, luz e textura…",
  "Comparando sinais de IA, edição e foto real…",
];

export default function ImageAnalyzer() {
  const { logout } = useAuth();
  const goTo = useMainNavigation();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const { analyze, loading, result, error, reset } = useAnalyzeImage();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const timer = window.setInterval(
      () => setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)),
      2500,
    );
    return () => window.clearInterval(timer);
  }, [loading]);

  const selectFile = (selected: File | null) => {
    reset();
    setFileError(null);

    if (!selected) return;

    const validation = validateImageFile(selected);
    if (validation) {
      setFile(null);
      setPreview(null);
      setFileError(validation);
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    selectFile(e.target.files?.[0] || null);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    selectFile(e.dataTransfer.files?.[0] || null);
  };

  const handleNewAnalysis = () => {
    reset();
    setFile(null);
    setPreview(null);
    setFileError(null);
    inputRef.current?.focus();
  };

  return (
    <DashboardLayout
      currentTab="analyze"
      onTabChange={goTo}
      onLogout={logout}
      sidebarItems={mainSidebarItems}
    >
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Análise de Imagem</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Envie uma imagem para descobrir se ela parece real, gerada por IA ou editada — e por quê.
          </p>
        </div>

        {!result && (
          <div className="flex flex-col gap-6">
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`group relative border-2 border-dashed transition-all rounded-3xl p-8 md:p-10 cursor-pointer focus-within:ring-2 focus-within:ring-purple-500 ${
                dragging
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                  : "border-gray-300 dark:border-gray-700 hover:border-purple-500 bg-gray-50/70 dark:bg-gray-800/30"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleInput}
                className="sr-only"
                disabled={loading}
              />

              {preview && file ? (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img
                    src={preview}
                    alt="Pré-visualização da imagem selecionada"
                    className="w-full sm:w-56 max-h-56 object-cover rounded-2xl shadow-xl"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-semibold text-gray-800 dark:text-white break-all">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {file.type.replace("image/", "").toUpperCase()} · {formatBytes(file.size)}
                    </p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-3 font-medium">
                      Clique ou arraste outra imagem para trocar
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xl mb-5">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999A5.002 5.002 0 006 9a4 4 0 00-3 6z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    Arraste uma imagem aqui ou clique para selecionar
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">PNG, JPG ou WEBP · até 7 MB</p>
                </div>
              )}
            </label>

            {fileError && (
              <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl">
                {fileError}
              </div>
            )}

            <button
              type="button"
              onClick={() => file && analyze(file)}
              disabled={!file || loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-900/30 disabled:opacity-50 disabled:hover:scale-100 transition-all text-white px-6 py-4 rounded-2xl font-semibold"
            >
              {loading ? "Analisando…" : "Analisar imagem"}
            </button>

            {loading && (
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300" role="status">
                <span className="h-4 w-4 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" aria-hidden="true" />
                {LOADING_STEPS[loadingStep]}
              </div>
            )}

            {error && (
              <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl">
                {error}
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-6">
            <AnalysisResultCard result={result} previewUrl={preview} fileName={file?.name} />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleNewAnalysis}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-purple-900/30 transition-all"
              >
                Analisar outra imagem
              </button>
              <Link
                to="/dashboard"
                className="flex-1 text-center px-6 py-4 rounded-2xl font-semibold border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Ver histórico no dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
