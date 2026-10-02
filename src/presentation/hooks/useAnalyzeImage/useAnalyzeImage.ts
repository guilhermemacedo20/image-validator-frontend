import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";

import { analyzeImage } from "@/infrastructure/services/aiService";
import type { AnalyzeResult } from "@/types/analysis.types";

interface ApiErrorResponse {
  error?: string;
}

export function useAnalyzeImage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const analyze = async (file: File, geminiApiKey: string): Promise<void> => {
    if (!file || loading) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;

      const res = await analyzeImage(file, controller.signal, geminiApiKey);
      setResult(res);
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }

      const axiosError = err as AxiosError<ApiErrorResponse>;

      if (axiosError.response?.status === 429) {
        setError("Limite de análises atingido. Aguarde.");
        return;
      }

      if (axiosError.response?.status === 401) {
        setError("Sessão expirada. Faça login novamente.");
        return;
      }

      setError(
        axiosError.response?.data?.error ||
          axiosError.message ||
          "Erro ao analisar imagem",
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = (): void => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return {
    analyze,
    loading,
    result,
    error,
    reset,
  };
}
