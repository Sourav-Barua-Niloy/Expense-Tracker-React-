// ─── src/utils/index.ts ───
import type { Transaction, Stats } from '../types'
import { CURRENCY } from '../constants'

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
 * Combine Tailwind class strings conditionally.
 * Lets us write: cn('px-4', isActive && 'bg-brand-600')
 * and have falsy values (false/undefined) safely dropped.
 * We'll upgrade this with tailwind-merge in the next step.
 */
export const cn = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(' ')


