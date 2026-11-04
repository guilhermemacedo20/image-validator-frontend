interface ScoreMeterProps {
  scoreIa: number;
  scoreReal: number;
  scoreEdicao: number;
}

export default function ScoreMeter({ scoreIa, scoreReal, scoreEdicao }: ScoreMeterProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex items-end justify-between mb-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Gerada por IA</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{scoreIa}%</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 dark:text-gray-400">Foto real</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{scoreReal}%</p>
          </div>
        </div>

        <div
          className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
          role="img"
          aria-label={`${scoreIa}% de chance de ser gerada por IA e ${scoreReal}% de ser real`}
        >
          {scoreIa > 0 && (
            <div
              className="h-full bg-[#6250d6] dark:bg-[#9085e9] transition-all duration-700"
              style={{ width: `${scoreIa}%` }}
            />
          )}
          {scoreReal > 0 && (
            <div
              className="h-full bg-[#1baf7a] dark:bg-[#199e70] transition-all duration-700"
              style={{ width: `${scoreReal}%` }}
            />
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm mb-2">
          <p className="text-gray-500 dark:text-gray-400">Sinais de edição humana</p>
          <p className="font-semibold text-gray-900 dark:text-white">{scoreEdicao}%</p>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
          role="img"
          aria-label={`${scoreEdicao}% de chance de edição humana`}
        >
          <div
            className="h-full rounded-full bg-[#eb6834] dark:bg-[#d95926] transition-all duration-700"
            style={{ width: `${scoreEdicao}%` }}
          />
        </div>
      </div>
    </div>
  );
}
