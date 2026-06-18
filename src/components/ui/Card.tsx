// ─── src/components/ui/Card.tsx ───
import type { HTMLAttributes } from 'react'
import { cn } from '../../utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** adds a subtle lift on hover — nice for clickable cards */
  hoverable?: boolean
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all',
        'dark:border-slate-800 dark:bg-slate-900',
        hoverable && 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}