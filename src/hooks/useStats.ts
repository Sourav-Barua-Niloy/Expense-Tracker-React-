// ─── src/hooks/useStats.ts ───
import { useMemo } from 'react'
import {
  calculateStats,
  groupByMonth,
  groupByCategory,
  buildMonthlyTrend,
  topCategories,
} from '../utils'
import type { Transaction } from '../types'

/**
 * Derives all dashboard/analytics numbers from a list of transactions.
 * useMemo caches the results and only recomputes when `transactions` changes,
 * so re-renders (e.g. opening a modal) don't redo the math.
 */
export function useStats(transactions: Transaction[]) {
  const stats = useMemo(() => calculateStats(transactions), [transactions])
  const monthly = useMemo(() => groupByMonth(transactions), [transactions])
  const byCategory = useMemo(() => groupByCategory(transactions), [transactions])

  // The most recent few, for the dashboard's "Recent transactions" panel.
  // transactions already arrive newest-first from Firestore.
  const recent = useMemo(() => transactions.slice(0, 6), [transactions])

  // Analytics-specific (Phase 8).
  const trend = useMemo(() => buildMonthlyTrend(transactions), [transactions])
  const categoryRanking = useMemo(() => topCategories(transactions), [transactions])

  return { stats, monthly, byCategory, recent, trend, categoryRanking }
}