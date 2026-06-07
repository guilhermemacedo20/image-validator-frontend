import { useState, useRef } from "react"
import { analyzeImage } from "../services/aiService"

export function useAnalyzeImage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const abortRef = useRef(null)

  const analyze = async (file) => {
    if (!file || loading) return

    try {
      setLoading(true)
      setError(null)
      setResult(null)

      if (abortRef.current) {
        abortRef.current.abort()
      }

      const controller = new AbortController()
      abortRef.current = controller

      const res = await analyzeImage(file, controller.signal)

      setResult(res.data)
    } catch (err) {
      if (err.name === "CanceledError") return

      if (err.response?.status === 429) {
        setError("Limite de análises atingido. Aguarde.")
        return
      }

      if (err.response?.status === 401) {
        setError("Sessão expirada. Faça login novamente.")
        return
      }

      setError(
        err.response?.data?.error ||
        err.message ||
        "Erro ao analisar imagem"
      )
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
    setLoading(false)
  }

  return {
    analyze,
    loading,
    result,
    error,
    reset,
  }
}