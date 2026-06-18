// ─── src/components/ui/Skeleton.tsx ───
import { cn } from '../../utils'

interface SkeletonProps {
  className?: string
}

/**
 * A pulsing grey block. Size it with className, e.g.:
 *   <Skeleton className="h-4 w-32" />
 * Compose several to mimic the shape of the content that's loading.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-200 dark:bg-slate-800',
        className,
      )}
    />
  )
}