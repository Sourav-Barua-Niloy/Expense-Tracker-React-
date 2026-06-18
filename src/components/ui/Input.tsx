// ─── src/components/ui/Input.tsx ───
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string        // validation message shown in red below the field
  leftIcon?: ReactNode  // optional icon inside the field (e.g. a $ or mail icon)
}

/**
 * We use forwardRef because React Hook Form needs a ref to the underlying
 * <input>. forwardRef passes the ref straight through to the DOM element.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </span>
          )}

          <input
            id={id}
            ref={ref}
            className={cn(
              'h-11 w-full rounded-xl border bg-white px-3 text-sm text-slate-900 transition-colors',
              'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40',
              'dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
              leftIcon && 'pl-10',
              // border turns red when there's an error, otherwise normal/brand-on-focus
              error
                ? 'border-danger-500 focus:ring-danger-500/40'
                : 'border-slate-200 focus:border-brand-500 dark:border-slate-700',
              className,
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-danger-500">{error}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'