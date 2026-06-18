// ─── src/components/ui/Select.tsx ───
import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils'

interface Option {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Option[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
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
          <select
            id={id}
            ref={ref}
            className={cn(
              // appearance-none removes the native arrow so we can use our own
              'h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-10 text-sm',
              'text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40',
              'dark:bg-slate-900 dark:text-slate-100',
              error
                ? 'border-danger-500'
                : 'border-slate-200 focus:border-brand-500 dark:border-slate-700',
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* our custom dropdown arrow */}
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        {error && <p className="mt-1.5 text-sm text-danger-500">{error}</p>}
      </div>
    )
  },
)

Select.displayName = 'Select'