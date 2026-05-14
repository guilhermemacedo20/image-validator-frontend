interface AnalyzeResult {
  isAIGenerated?: boolean;
  scoreIa?: number;
  scoreReal?:number;
  reasons?: string[];
}