import { fileToBase64 } from "@/utils/base64";
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
  geminiApiKey?: string
): Promise<AnalyzeImageResponse> {
  const formData = new FormData();

  formData.append("image", await fileToBase64(file));

  const response = await api.post("/ai/analyze-image", formData, {
    signal,
    headers: {
      "X-Gemini-API-Key": geminiApiKey,
    },
  });

  return response.data;
}
