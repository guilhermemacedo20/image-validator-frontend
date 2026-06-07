import { api } from "./api"

export async function analyzeImage(file, signal) {
  const formData = new FormData()
  formData.append("image", file)

  const response = await api.post(
    "/ai/analyze-image",
    formData,
    {
      signal,
    }
  )

  return response.data
}