// ─── src/hooks/useTransactionFilters.ts ───
import { useMemo, useState } from 'react'
import type { Transaction, TransactionFilters } from '../types'

// The starting state: no filters applied.
const DEFAULT_FILTERS: TransactionFilters = {
  search: '',
  type: 'all',
  category: 'all',
  startDate: null,
  endDate: null,
}

export function useTransactionFilters(transactions: Transaction[]) {
  const [filters, setFilters] = useState<TransactionFilters>(DEFAULT_FILTERS)

  // Update a single filter field without touching the others.
  const setFilter = <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  // Are any filters active? (used to show/hide the "Clear" button + empty state)
  const hasActiveFilters =
    filters.search !== '' ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.startDate !== null ||
    filters.endDate !== null

  // The filtered list. Recomputed only when transactions or filters change.
  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      // 1. Search: case-insensitive match on the title
      if (filters.search) {
        const q = filters.search.toLowerCase().trim()
        if (!tx.title.toLowerCase().includes(q)) return false
      }

      // 2. Type
      if (filters.type !== 'all' && tx.type !== filters.type) return false

      // 3. Category
      if (filters.category !== 'all' && tx.category !== filters.category) return false

      // 4. Date range (compare by day, inclusive)
      if (filters.startDate && tx.date < startOfDay(filters.startDate)) return false
      if (filters.endDate && tx.date > endOfDay(filters.endDate)) return false

      return true
    })
  }, [transactions, filters])

  return { filters, setFilter, resetFilters, hasActiveFilters, filtered }
}

// Helpers: normalize a date to the very start / very end of its day so the
// range comparison is inclusive of the whole start and end days.
function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}
function endOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}