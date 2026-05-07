import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";

import { analyzeImage } from "@/services/aiService";

interface AnalyzeResult {
  [key: string]: any;
}

interface ApiErrorResponse {
  error?: string;
}

export function useAnalyzeImage() {
  const [loading, setLoading] = useState<boolean>(false);

  const [result, setResult] = useState<AnalyzeResult | null>(null);

  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const analyze = async (file: File): Promise<void> => {
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

      const res = await analyzeImage(file, controller.signal);

      setResult(res.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }

      const error = err as AxiosError<ApiErrorResponse>;

      if (error.response?.status === 429) {
        setError("Limite de análises atingido. Aguarde.");

        return;
      }

      if (error.response?.status === 401) {
        setError("Sessão expirada. Faça login novamente.");

        return;
      }

      setError(
        error.response?.data?.error ||
          error.message ||
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
