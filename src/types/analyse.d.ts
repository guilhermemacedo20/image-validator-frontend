type AnalysisVerdict = "AI_GENERATED" | "REAL" | "EDITED" | "INCONCLUSIVE";

type AnalysisConfidence = "BAIXA" | "MEDIA" | "ALTA";

type IndicatorDirection = "IA" | "REAL" | "EDICAO";

type IndicatorWeight = "BAIXO" | "MEDIO" | "ALTO";

interface AnalysisIndicator {
  category: string;
  direction: IndicatorDirection;
  weight: IndicatorWeight;
  description: string;
}

interface ImageMetadataSummary {
  format: string;
  width: number | null;
  height: number | null;
  hasExif: boolean;
  cameraMake: string | null;
  cameraModel: string | null;
  software: string | null;
  captureDate: string | null;
  hasContentCredentials: boolean;
  aiGeneratorHint: string | null;
  editingSoftwareHint: string | null;
}

interface AnalyzeResult {
  id?: string;
  provider?: string;
  model?: string;
  verdict?: AnalysisVerdict;
  confidence?: AnalysisConfidence;
  isAIGenerated?: boolean;
  scoreIa?: number;
  scoreReal?: number;
  scoreEdicao?: number;
  summary?: string;
  reasons?: string[];
  indicators?: AnalysisIndicator[];
  metadata?: ImageMetadataSummary | null;
  durationMs?: number;
  analyzedAt?: string;
}

interface AnalysisHistoryItem extends AnalyzeResult {
  id: string;
  verdict: AnalysisVerdict;
  scoreIa: number;
  scoreReal: number;
  scoreEdicao: number;
  analyzedAt: string;
  fileName: string | null;
  mimeType: string;
  sizeBytes: number;
}

interface PaginatedAnalyses {
  items: AnalysisHistoryItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface DailyAnalysisCount {
  date: string;
  total: number;
  aiGenerated: number;
  real: number;
  edited: number;
  inconclusive: number;
}

interface AnalysisStats {
  total: number;
  byVerdict: Record<AnalysisVerdict, number>;
  averageScoreIa: number;
  lastAnalysisAt: string | null;
  daily: DailyAnalysisCount[];
}
