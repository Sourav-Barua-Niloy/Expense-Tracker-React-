// ─── src/components/TransactionItem.tsx ───
import { Pencil, Trash2 } from 'lucide-react'
import { Badge, Icon } from './ui'
import { formatCurrency, formatDate } from '../utils'
import { getCategoryMeta } from '../constants'
import type { Transaction } from '../types'

interface TransactionItemProps {
  transaction: Transaction
  onEdit?: (t: Transaction) => void
  onDelete?: (t: Transaction) => void
  readOnly?: boolean   // dashboard preview hides the action buttons
}

export function TransactionItem({ transaction, onEdit, onDelete, readOnly }: TransactionItemProps) {
  const meta = getCategoryMeta(transaction.category)
  const isIncome = transaction.type === 'income'

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/50">
      {/* category icon chip */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
      >
        <Icon name={meta.icon} className="h-5 w-5" />
      </div>

      {/* title + meta */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900 dark:text-slate-100">
          {transaction.title}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
          <Badge tone="neutral" className="hidden xs:inline-flex">{transaction.category}</Badge>
          <span>{formatDate(transaction.date)}</span>
        </div>
      </div>

      {/* amount */}
      <div className={`shrink-0 text-right font-semibold ${isIncome ? 'text-success-600 dark:text-success-500' : 'text-danger-600 dark:text-danger-500'}`}>
        {isIncome ? '+' : '−'}{formatCurrency(transaction.amount)}
      </div>

      {/* actions — hidden in read-only mode (e.g. the dashboard preview) */}
      {!readOnly && (
        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onEdit?.(transaction)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete?.(transaction)}
            className="rounded-lg p-2 text-slate-400 hover:bg-danger-50 hover:text-danger-600 dark:hover:bg-danger-500/10"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}