// ─── src/utils/index.ts ───
import type { Transaction, Stats } from '../types'
import { CURRENCY } from '../constants'

// Re-export the robust cn helper (clsx + tailwind-merge) from cn.ts.
// This replaces the old simple cn that used to live at the bottom of this file.
export { cn } from './cn'

/**
 * Format a number as currency, e.g. 1234.5 → "$1,234.50".
 * Uses the browser's built-in Intl API, configured from our CURRENCY constant.
 */
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
  }).format(amount)

/**
 * Format a Date for display, e.g. "Jun 18, 2026".
 */
export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat(CURRENCY.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)

/**
 * Format a Date for an <input type="date">, which requires "YYYY-MM-DD".
 */
export const toDateInputValue = (date: Date): string => {
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60 * 1000)
  return local.toISOString().split('T')[0]
}

/**
 * Calculate dashboard stats from a list of transactions.
 * Income adds up, expenses add up, balance is the difference.
 */
export const calculateStats = (transactions: Transaction[]): Stats => {
  let totalIncome = 0
  let totalExpenses = 0

  for (const tx of transactions) {
    if (tx.type === 'income') totalIncome += tx.amount
    else totalExpenses += tx.amount
  }

  const balance = totalIncome - totalExpenses
  return {
    totalIncome,
    totalExpenses,
    balance,
    savings: balance > 0 ? balance : 0, // savings can't be negative
  }
}

/**
 * Group transactions by month, returning data ready for the monthly chart.
 * Output example: [{ month: "Jan 2026", income: 5000, expense: 3200 }, ...]
 */
export const groupByMonth = (transactions: Transaction[]) => {
  const map = new Map<string, { income: number; expense: number }>()

  for (const tx of transactions) {
    const key = new Intl.DateTimeFormat(CURRENCY.locale, {
      month: 'short',
      year: 'numeric',
    }).format(tx.date)

    const entry = map.get(key) ?? { income: 0, expense: 0 }
    if (tx.type === 'income') entry.income += tx.amount
    else entry.expense += tx.amount
    map.set(key, entry)
  }

  return Array.from(map, ([month, vals]) => ({ month, ...vals }))
}

/**
 * Group EXPENSE transactions by category, for the category breakdown chart.
 * Output example: [{ category: "Food", value: 450 }, ...]
 */
export const groupByCategory = (transactions: Transaction[]) => {
  const map = new Map<string, number>()

  for (const tx of transactions) {
    if (tx.type !== 'expense') continue
    map.set(tx.category, (map.get(tx.category) ?? 0) + tx.amount)
  }

  return Array.from(map, ([category, value]) => ({ category, value }))
}

/**
 * Like groupByMonth, but guaranteed sorted oldest → newest, and includes a
 * running cumulative balance. Used by the trend chart.
 * Output: [{ month, income, expense, net, cumulative }, ...]
 */
export const buildMonthlyTrend = (transactions: Transaction[]) => {
  // group into a map keyed by a sortable "YYYY-MM" plus a display label
  const map = new Map<string, { label: string; income: number; expense: number }>()

  for (const tx of transactions) {
    const sortKey = `${tx.date.getFullYear()}-${String(tx.date.getMonth() + 1).padStart(2, '0')}`
    const label = new Intl.DateTimeFormat(CURRENCY.locale, {
      month: 'short',
      year: 'numeric',
    }).format(tx.date)

    const entry = map.get(sortKey) ?? { label, income: 0, expense: 0 }
    if (tx.type === 'income') entry.income += tx.amount
    else entry.expense += tx.amount
    map.set(sortKey, entry)
  }

  // sort by the YYYY-MM key, then compute the running cumulative balance
  const sorted = Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))

  let cumulative = 0
  return sorted.map(([, v]) => {
    const net = v.income - v.expense
    cumulative += net
    return {
      month: v.label,
      income: v.income,
      expense: v.expense,
      net,
      cumulative,
    }
  })
}

/**
 * Top spending categories (expenses only), sorted highest → lowest,
 * with each one's share of total expenses as a percentage.
 */
export const topCategories = (transactions: Transaction[]) => {
  const grouped = groupByCategory(transactions) // reuse Phase 2 helper
  const total = grouped.reduce((sum, c) => sum + c.value, 0)

  return grouped
    .map((c) => ({
      ...c,
      percent: total > 0 ? (c.value / total) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value)
}