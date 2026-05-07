import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "@/components/PageContainer";
import { useAnalyzeImage } from "@/hooks/analyse";

export default function ImageAnalyzer() {
  const [file, setFile] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

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

  return (
    <PageContainer title="Análise de Imagem">
      <div className="flex flex-col items-center gap-4">
        <input type="file" onChange={handleFile} />

        {preview && (
          <img src={preview} className="w-64 rounded shadow" alt="preview" />
        )}

        <button
          onClick={() => file && analyze(file)}
          disabled={!file || loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Analisando..." : "Analisar imagem"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {typedResult && (
          <div className="bg-gray-100 p-4 rounded w-full">
            <p>
              Tipo:{" "}
              <strong>
                {typedResult.isAIGenerated ? "IA 🤖" : "Humano 📸"}
              </strong>
            </p>

            <p>
              Confiança: <strong>{typedResult.score}%</strong>
            </p>

            <ul className="mt-2 list-disc pl-4 text-sm">
              {typedResult.reasons?.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/my-account")}
        className="text-blue-500 w-full p-2 my-2"
      >
        Minha conta
      </button>
    </PageContainer>
  );
}
