// ─── src/components/StatCard.tsx ───
import type { ReactNode } from 'react'
import { Card, Skeleton } from './ui'
import { cn } from '../utils'

interface StatCardProps {
  label: string
  value: string
  icon: ReactNode
  /** tailwind classes for the icon chip color, e.g. 'bg-success-50 text-success-600' */
  accent: string
  loading?: boolean
}

export function StatCard({ label, value, icon, accent, loading }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', accent)}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          {loading ? (
            <Skeleton className="mt-1 h-7 w-24" />
          ) : (
            <p className="truncate text-xl font-bold text-slate-900 dark:text-slate-100">
              {value}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}