// ─── src/components/ui/Badge.tsx ───
import type { HTMLAttributes } from 'react'
import { cn } from '../../utils'

type Tone = 'success' | 'danger' | 'neutral' | 'brand'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

const tones: Record<Tone, string> = {
  success: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-500',
  danger: 'bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-500',
  brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

export function Badge({ tone = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}