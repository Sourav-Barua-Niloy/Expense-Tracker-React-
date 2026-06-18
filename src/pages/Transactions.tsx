// ─── src/pages/Transactions.tsx ───
import { useState } from 'react'
import { Plus, SearchX } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button, Modal } from '../components/ui'
import { TransactionForm } from '../components/forms/TransactionForm'
import { FilterBar } from '../components/forms/FilterBar'
import { TransactionItem } from '../components/TransactionItem'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { EmptyState, ErrorState, ListSkeleton } from '../components/states/States'
import { useTransactions } from '../hooks/useTransactions'
import { useTransactionFilters } from '../hooks/useTransactionFilters'
import type { Transaction, TransactionInput } from '../types'

export function Transactions() {
  const {
    transactions,
    loading,
    error,
    addTransaction,
    editTransaction,
    removeTransaction,
  } = useTransactions()

  // Apply filters over the loaded transactions.
  const { filters, setFilter, resetFilters, hasActiveFilters, filtered } =
    useTransactionFilters(transactions)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | undefined>(undefined)
  const [deleting, setDeleting] = useState<Transaction | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const openAdd = () => {
    setEditing(undefined)
    setFormOpen(true)
  }
  const openEdit = (t: Transaction) => {
    setEditing(t)
    setFormOpen(true)
  }

  const handleSubmit = async (input: TransactionInput) => {
    try {
      if (editing) {
        await editTransaction(editing.id, input)
        toast.success('Transaction updated')
      } else {
        await addTransaction(input)
        toast.success('Transaction added')
      }
      setFormOpen(false)
      setEditing(undefined)
    } catch {
      toast.error('Could not save transaction')
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setDeleteLoading(true)
    try {
      await removeTransaction(deleting.id)
      toast.success('Transaction deleted')
      setDeleting(null)
    } catch {
      toast.error('Could not delete transaction')
    } finally {
      setDeleteLoading(false)
    }
  }

  // Decide what to render in the list area.
  const renderList = () => {
    if (loading) return <ListSkeleton />
    if (error) return <ErrorState message={error} />

    // No transactions at all → first-run empty state with a CTA.
    if (transactions.length === 0) {
      return (
        <EmptyState
          title="No transactions yet"
          message="Add your first transaction to start tracking your money."
          action={
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAdd}>
              Add transaction
            </Button>
          }
        />
      )
    }

    // Have transactions, but filters matched none → distinct "no results" state.
    if (filtered.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
            <SearchX className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">No matches</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            No transactions match your filters. Try adjusting or clearing them.
          </p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={resetFilters}>
            Clear filters
          </Button>
        </div>
      )
    }

    // Normal: render the filtered list.
    return (
      <div className="space-y-3">
        {filtered.map((t) => (
          <TransactionItem
            key={t.id}
            transaction={t}
            onEdit={openEdit}
            onDelete={setDeleting}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Transactions
          </h2>
          <p className="text-sm text-slate-500">
            {/* show filtered count when filtering, else total */}
            {hasActiveFilters
              ? `${filtered.length} of ${transactions.length}`
              : `${transactions.length} total`}
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAdd}>
          Add transaction
        </Button>
      </div>

      {/* Filter bar — only show once there's data to filter */}
      {!loading && transactions.length > 0 && (
        <FilterBar
          filters={filters}
          setFilter={setFilter}
          hasActiveFilters={hasActiveFilters}
          onReset={resetFilters}
        />
      )}

      {/* List area */}
      {renderList()}

      {/* Add / Edit modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditing(undefined) }}
        title={editing ? 'Edit transaction' : 'Add transaction'}
      >
        <TransactionForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => { setFormOpen(false); setEditing(undefined) }}
        />
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={deleting !== null}
        title="Delete transaction"
        message={`Delete "${deleting?.title}"? This can't be undone.`}
        isLoading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  )
}