// ─── src/components/CategoryRanking.tsx ───
import { Icon } from './ui'
import { getCategoryMeta } from '../constants'
import { formatCurrency } from '../utils'

interface CategoryRankingProps {
  data: { category: string; value: number; percent: number }[]
}

export function CategoryRanking({ data }: CategoryRankingProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => {
        const meta = getCategoryMeta(item.category)
        return (
          <div key={item.category}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                <Icon name={meta.icon} className="h-4 w-4" style={{ color: meta.color }} />
                {item.category}
              </span>
              <span className="text-slate-500">
                {formatCurrency(item.value)}{' '}
                <span className="text-xs text-slate-400">({item.percent.toFixed(0)}%)</span>
              </span>
            </div>
            {/* progress bar showing this category's share */}
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.percent}%`, backgroundColor: meta.color }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}