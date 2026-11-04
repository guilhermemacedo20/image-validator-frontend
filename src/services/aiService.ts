import { fileToBase64 } from "@/utils/base64";
import { api } from "./api";

export async function analyzeImage(
  file: File,
  signal?: AbortSignal,
): Promise<AnalyzeResult> {
  const imageBase64 = await fileToBase64(file);

  const response = await api.post<AnalyzeResult>(
    "/ai/analyze-image",
    {
      imageBase64,
      mimeType: file.type,
      fileName: file.name,
    },
    { signal },
  );

  return response.data;
}

export interface ListAnalysesParams {
  page?: number;
  limit?: number;
  verdict?: AnalysisVerdict | null;
}

export async function listAnalyses(
  { page = 1, limit = 10, verdict }: ListAnalysesParams = {},
  signal?: AbortSignal,
): Promise<PaginatedAnalyses> {
  const response = await api.get<PaginatedAnalyses>("/ai/analyses", {
    params: { page, limit, ...(verdict ? { verdict } : {}) },
    signal,
  });
  return response.data;
}

export async function getAnalysisStats(signal?: AbortSignal): Promise<AnalysisStats> {
  const response = await api.get<AnalysisStats>("/ai/analyses/stats", { signal });
  return response.data;
}

export async function deleteAnalysis(id: string): Promise<void> {
  await api.delete(`/ai/analyses/${encodeURIComponent(id)}`);
}
