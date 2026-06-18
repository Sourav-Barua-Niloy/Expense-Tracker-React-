// ─── src/constants/index.ts ───
import type { TransactionType } from '../types'

/**
 * Each category has an icon name (from lucide-react) and a color.
 * Centralizing this means the category dropdown, the transaction list,
 * and the charts all stay visually consistent.
 */
export interface CategoryMeta {
  name: string
  /** lucide-react icon name — used like <Icon /> in components */
  icon: string
  /** a hex color, used for chart slices and category badges */
  color: string
  /** which transaction type this category usually belongs to */
  defaultType: TransactionType
}

export const CATEGORIES: CategoryMeta[] = [
  { name: 'Food',          icon: 'UtensilsCrossed', color: '#f97316', defaultType: 'expense' },
  { name: 'Transport',     icon: 'Car',             color: '#06b6d4', defaultType: 'expense' },
  { name: 'Shopping',      icon: 'ShoppingBag',     color: '#ec4899', defaultType: 'expense' },
  { name: 'Bills',         icon: 'ReceiptText',     color: '#ef4444', defaultType: 'expense' },
  { name: 'Entertainment', icon: 'Clapperboard',    color: '#8b5cf6', defaultType: 'expense' },
  { name: 'Health',        icon: 'HeartPulse',      color: '#14b8a6', defaultType: 'expense' },
  { name: 'Education',     icon: 'GraduationCap',    color: '#3b82f6', defaultType: 'expense' },
  { name: 'Salary',        icon: 'Wallet',          color: '#22c55e', defaultType: 'income'  },
  { name: 'Freelancing',   icon: 'Laptop',          color: '#10b981', defaultType: 'income'  },
  { name: 'Investment',    icon: 'TrendingUp',      color: '#84cc16', defaultType: 'income'  },
  { name: 'Others',        icon: 'CircleDashed',    color: '#94a3b8', defaultType: 'expense' },
]

/** Just the names, handy for dropdowns and validation. */
export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name)

/** Look up a category's metadata by name (returns "Others" as a safe fallback). */
export const getCategoryMeta = (name: string): CategoryMeta =>
  CATEGORIES.find((c) => c.name === name) ?? CATEGORIES[CATEGORIES.length - 1]

/**
 * All app route paths in one object.
 * Use ROUTES.DASHBOARD instead of typing "/dashboard" — typos become impossible
 * because TypeScript autocompletes these.
 */
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/',
  TRANSACTIONS: '/transactions',
  ANALYTICS: '/analytics',
  PROFILE: '/profile',
} as const

/** Currency settings — change these once to re-currency the whole app. */
export const CURRENCY = {
  locale: 'en-US',
  code: 'USD',
  symbol: '$',
}

export const NAV_ITEMS = [
  { label: 'Dashboard',    path: ROUTES.DASHBOARD,    icon: 'LayoutDashboard' },
  { label: 'Transactions', path: ROUTES.TRANSACTIONS, icon: 'ArrowLeftRight' },
  { label: 'Analytics',    path: ROUTES.ANALYTICS,    icon: 'PieChart' },
  { label: 'Profile',      path: ROUTES.PROFILE,      icon: 'UserCircle' },
] as const