// ─── src/components/forms/FilterBar.tsx ───
import { Search, X } from 'lucide-react'
import { Input, Select, Button } from '../ui'
import { CATEGORY_NAMES } from '../../constants'
import { toDateInputValue } from '../../utils'
import type { TransactionFilters } from '../../types'

interface FilterBarProps {
  filters: TransactionFilters
  setFilter: <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => void
  hasActiveFilters: boolean
  onReset: () => void
}

export function FilterBar({ filters, setFilter, hasActiveFilters, onReset }: FilterBarProps) {
  const categoryOptions = [
    { value: 'all', label: 'All categories' },
    ...CATEGORY_NAMES.map((c) => ({ value: c, label: c })),
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Input
            placeholder="Search by title…"
            leftIcon={<Search className="h-4 w-4" />}
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
        </div>

        {/* Type */}
        <Select
          options={[
            { value: 'all', label: 'All types' },
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
          ]}
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value as TransactionFilters['type'])}
        />

        {/* Category */}
        <Select
          options={categoryOptions}
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
        />

        {/* Date range */}
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            aria-label="Start date"
            value={filters.startDate ? toDateInputValue(filters.startDate) : ''}
            onChange={(e) =>
              setFilter('startDate', e.target.value ? new Date(e.target.value) : null)
            }
          />
          <Input
            type="date"
            aria-label="End date"
            value={filters.endDate ? toDateInputValue(filters.endDate) : ''}
            onChange={(e) =>
              setFilter('endDate', e.target.value ? new Date(e.target.value) : null)
            }
          />
        </div>
      </div>

      {/* Clear button — only when something is filtered */}
      {hasActiveFilters && (
        <div className="mt-3 flex justify-end">
          <Button variant="ghost" size="sm" leftIcon={<X className="h-4 w-4" />} onClick={onReset}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}