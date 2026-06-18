// ─── src/components/states/States.tsx ───
import type { ReactNode } from 'react'
import { Inbox, AlertCircle } from 'lucide-react'
import { Skeleton } from '../ui'

/** Empty state — shown when there's no data. An invitation to act. */
export function EmptyState({
  title,
  message,
  action,
}: {
  title: string
  message: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

/** Error state — explains what went wrong, in the interface's voice. */
export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-danger-200 bg-danger-50 py-16 text-center dark:border-danger-500/20 dark:bg-danger-500/5">
      <AlertCircle className="mb-3 h-8 w-8 text-danger-500" />
      <p className="text-sm font-medium text-danger-600 dark:text-danger-500">{message}</p>
    </div>
  )
}

/** Loading skeleton — mimics the shape of the transaction list. */
export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  )
}