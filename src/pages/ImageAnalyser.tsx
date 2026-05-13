import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "@/components/DashboardLayout";
import { useAnalyzeImage } from "@/hooks/analyse";

export default function ImageAnalyzer() {

  const [file, setFile] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const [geminiApiKey, setGeminiApiKey] = useState("");

  const [tab, setTab] = useState("analyze");

  const navigate = useNavigate();

  const { analyze, loading, result, error } = useAnalyzeImage();

  const typedResult = result as AnalyzeResult | null;

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {

    const f = e.target.files?.[0] || null;

    setFile(f);

    if (f) {
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSidebarChange = (value: string) => {

    setTab(value);

    if (value === "account") {
      navigate("/my-account");
    }
  };

  const sidebarItems = [
    {
      id: "analyze",
      title: "Análise de Imagem",
      subtitle: "Detector de IA",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L15 12l-5.25-5"
          />
        </svg>
      )
    },

    {
      id: "account",
      title: "Minha Conta",
      subtitle: "Perfil e segurança",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )
    }
  ];

  return (
    <DashboardLayout
      currentTab={tab}
      onTabChange={handleSidebarChange}
      sidebarItems={sidebarItems}
    >

      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Análise de Imagem
          </h1>
          <div className="flex flex-col gap-2 mt-4">
              <label className="text-sm font-medium">
                Insira a chave de API do Gemini
              </label>

              <input
                placeholder="Chave de API do Gemini"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Faça upload de uma imagem para detectar conteúdo gerado por IA
          </p>

        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-6">

          {/* INPUT */}
          <div className="flex flex-col gap-3">

            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload da imagem
            </label>

            <label className="group relative border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all rounded-3xl p-10 cursor-pointer bg-gray-50/70 dark:bg-gray-800/30">

              <input
                type="file"
                onChange={handleFile}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center text-center">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xl mb-5">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999A5.002 5.002 0 006 9a4 4 0 00-3 6z"
                    />
                  </svg>

                </div>

                <p className="font-semibold text-gray-800 dark:text-white">
                  Clique para selecionar uma imagem
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  PNG, JPG ou WEBP
                </p>

              </div>

            </label>

          </div>

          {/* PREVIEW */}
          {preview && (
            <div className="flex flex-col gap-3">

              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Pré-visualização
              </p>

              <div className="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800/40 w-fit shadow-xl">

                <img
                  src={preview}
                  className="max-w-full w-[350px] object-cover"
                  alt="preview"
                />

              </div>

            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={() => file && geminiApiKey && analyze(file, geminiApiKey)}
            disabled={!file || loading || !geminiApiKey}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-900/30 disabled:opacity-50 disabled:hover:scale-100 transition-all text-white px-6 py-4 rounded-2xl font-semibold"
          >
            {loading ? "Analisando..." : "Analisar imagem"}
          </button>

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl">
              {error}
            </div>
          )}

          {/* RESULT */}
          {typedResult && (
            <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-3xl p-6">

              <div className="flex items-center justify-between flex-wrap gap-4 mb-5">

                <div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Resultado da análise
                  </p>

                  <h2 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">

                    {typedResult.isAIGenerated
                      ? "IA 🤖"
                      : "Real 📸"}

                  </h2>

                </div>

                <div className="px-5 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Confiança
                  </p>

                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {typedResult.score}%
                  </p>

                </div>

              </div>

              {/* REASONS */}
              {typedResult.reasons?.length ? (
                <div>

                  <p className="font-semibold mb-3 text-gray-800 dark:text-white">
                    Motivos detectados
                  </p>

                  <div className="flex flex-col gap-3">

                    {typedResult.reasons.map((reason, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-2xl p-4"
                      >

                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />

                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {reason}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>
              ) : null}

            </div>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}