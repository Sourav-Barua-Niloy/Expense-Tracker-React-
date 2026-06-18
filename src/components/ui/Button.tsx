// ─── src/components/ui/Button.tsx ───
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

// We extend the native <button> props so this works exactly like a real button
// (onClick, type, disabled, etc.) plus our own extras.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  leftIcon?: ReactNode
  fullWidth?: boolean
}

// Base styles shared by every button, then variant/size specifics merged on top.
const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium ' +
  'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-brand-500 focus-visible:ring-offset-2 ' +
  'dark:focus-visible:ring-offset-slate-950 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 ' +
    'dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
  danger:
    'bg-danger-600 text-white hover:bg-danger-500 shadow-sm shadow-danger-600/20',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 ' +
    'dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      // a loading button is also disabled, so users can't double-submit
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
    </button>
  )
}