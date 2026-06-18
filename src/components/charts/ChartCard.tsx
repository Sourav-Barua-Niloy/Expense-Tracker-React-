// ─── src/components/charts/ChartCard.tsx ───
import type { ReactNode } from 'react'
import { Card } from '../ui'

interface ChartCardProps {
  title: string
  subtitle?: string
  /** when true, show an empty message instead of the chart */
  isEmpty?: boolean
  emptyMessage?: string
  children: ReactNode
}

export function ChartCard({ title, subtitle, isEmpty, emptyMessage, children }: ChartCardProps) {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {isEmpty ? (
        <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">
          {emptyMessage ?? 'No data to display yet.'}
        </div>
      ) : (
        children
      )}
    </Card>
  )
}