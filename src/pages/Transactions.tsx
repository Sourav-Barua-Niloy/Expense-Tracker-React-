// ─── src/pages/Transactions.tsx ───
import { useState } from 'react'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button, Modal } from '../components/ui'
import { TransactionForm } from '../components/forms/TransactionForm'
import { TransactionItem } from '../components/TransactionItem'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { EmptyState, ErrorState, ListSkeleton } from '../components/states/States'
import { useTransactions } from '../hooks/useTransactions'
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

  // Modal state: which transaction (if any) we're editing, and whether the
  // add/edit modal is open.
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | undefined>(undefined)

  // Delete confirmation state.
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Transactions
          </h2>
          <p className="text-sm text-slate-500">
            {transactions.length} total
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAdd}>
          Add transaction
        </Button>
      </div>

      {/* Body — pick the right state */}
      {loading ? (
        <ListSkeleton />
      ) : error ? (
        <ErrorState message={error} />
      ) : transactions.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          message="Add your first transaction to start tracking your money."
          action={
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAdd}>
              Add transaction
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {transactions.map((t) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              onEdit={openEdit}
              onDelete={setDeleting}
            />
          ))}
        </div>
      )}

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