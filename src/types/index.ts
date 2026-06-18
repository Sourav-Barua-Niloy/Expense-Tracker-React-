// ─── src/types/index.ts ───
// Central type definitions. Imported anywhere we touch user or transaction data.

/** The two kinds of transaction. Using a union type means TS rejects any other value. */
export type TransactionType = 'income' | 'expense'

/** A category is just one of our predefined strings (defined in constants). */
export type Category = string

/**
 * A transaction as used *inside the app*.
 * Note: `date` and `createdAt` are JS Date objects here — NOT Firestore Timestamps.
 * We convert Timestamp → Date at the service boundary (Phase 6) so the rest of
 * the app only ever deals with normal Dates.
 */
export interface Transaction {
  id: string                // Firestore document ID
  userId: string            // owner's uid — every query filters on this
  title: string
  amount: number            // always positive; `type` decides income vs expense
  type: TransactionType
  category: Category
  note: string
  date: Date                // when the transaction happened
  createdAt: Date           // when the record was created (used for sorting)
}

/**
 * The data needed to CREATE a transaction.
 * We omit `id` (Firestore generates it) and `createdAt` (the service sets it).
 */
export type TransactionInput = Omit<Transaction, 'id' | 'userId' | 'createdAt'>

/** A user profile document stored at users/{uid}. */
export interface UserProfile {
  uid: string
  displayName: string
  email: string
  photoURL: string | null
  createdAt: Date
}

/** Computed dashboard statistics (calculated from a list of transactions). */
export interface Stats {
  totalIncome: number
  totalExpenses: number
  balance: number          // income − expenses
  savings: number          // same as balance here, shown separately in UI
}

/** The shape of our filter controls on the Transactions page (Phase 9). */
export interface TransactionFilters {
  search: string
  type: TransactionType | 'all'
  category: Category | 'all'
  startDate: Date | null
  endDate: Date | null
}