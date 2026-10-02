import { fileToBase64 } from "@/utils/base64";
import { api } from "./api";

interface AnalyzeImageResponse {
  isAIGenerated?: boolean;
  scoreIa?: number;
  scoreReal?: number;
  reasons?: string[];
  [key: string]: any;
}

export async function analyzeImage(
  file: File,
  signal?: AbortSignal,
): Promise<AnalyzeImageResponse> {
  const imageBase64 = await fileToBase64(file);

  const response = await api.post(
    "/ai/analyze-image",
    {
      imageBase64,
      mimeType: file.type,
    },
    { signal },
  );

  return response.data;
}
