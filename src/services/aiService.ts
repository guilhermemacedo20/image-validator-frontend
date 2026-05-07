import { api } from "./api";

interface AnalyzeImageResponse {
  isAIGenerated?: boolean;
  score?: number;
  reasons?: string[];
  [key: string]: any;
}

export async function analyzeImage(
  file: File,
  signal?: AbortSignal,
): Promise<AnalyzeImageResponse> {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post("/ai/analyze-image", formData, {
    signal,
  });

  return response.data;
}
