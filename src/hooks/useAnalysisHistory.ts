import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { deleteAnalysis, getAnalysisStats, listAnalyses } from "@/services/aiService";

const PAGE_SIZE = 8;

function errorMessage(err: unknown, fallback: string): string {
  const error = err as AxiosError<{ error?: string }>;
  return error.response?.data?.error || fallback;
}

export function useAnalysisHistory() {
  const [page, setPage] = useState(1);
  const [verdict, setVerdict] = useState<AnalysisVerdict | null>(null);
  const [list, setList] = useState<PaginatedAnalyses | null>(null);
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    Promise.all([
      listAnalyses({ page, limit: PAGE_SIZE, verdict }, controller.signal),
      getAnalysisStats(controller.signal),
    ])
      .then(([listData, statsData]) => {
        if (listData.items.length === 0 && page > 1) {
          setPage((p) => p - 1);
          return;
        }
        setList(listData);
        setStats(statsData);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(errorMessage(err, "Não foi possível carregar o histórico."));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page, verdict, reloadKey]);

  const changeVerdict = useCallback((value: AnalysisVerdict | null) => {
    setVerdict(value);
    setPage(1);
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteAnalysis(id);
      setReloadKey((k) => k + 1);
      return true;
    } catch (err) {
      setError(errorMessage(err, "Não foi possível excluir a análise."));
      return false;
    }
  }, []);

  return {
    list,
    stats,
    loading,
    error,
    page,
    setPage,
    verdict,
    changeVerdict,
    remove,
    reload: () => setReloadKey((k) => k + 1),
  };
}
