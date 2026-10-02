import { fileToBase64 } from "@/infrastructure/utils/base64";
import { api } from "@/infrastructure/http/client";
import type { AnalyzeResult } from "@/types/analysis.types";

export async function analyzeImage(
  file: File,
  signal?: AbortSignal,
  geminiApiKey?: string,
): Promise<AnalyzeResult> {
  const imageBase64 = await fileToBase64(file);

  const response = await api.post(
    "/ai/analyze-image",
    {
      imageBase64,
      mimeType: file.type,
    },
    {
      signal,
      headers: {
        "X-Gemini-API-Key": geminiApiKey,
      },
    },
  );

  return response.data;
}
