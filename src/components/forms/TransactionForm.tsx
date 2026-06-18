// ─── src/components/forms/TransactionForm.tsx ───
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Select } from '../ui'
import { CATEGORIES } from '../../constants'
import { toDateInputValue } from '../../utils'
import {
  transactionSchema,
  type TransactionFormValues,
} from '../../utils/validation'
import type { Transaction, TransactionInput } from '../../types'

interface TransactionFormProps {
  /** if provided, the form is in "edit" mode and pre-fills these values */
  initial?: Transaction
  onSubmit: (input: TransactionInput) => Promise<void>
  onCancel: () => void
}

export function TransactionForm({ initial, onSubmit, onCancel }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    // Pre-fill for edit mode, or sensible defaults for add mode.
    // amount is a STRING here because the schema treats it as a string
    // (the form input gives strings); we convert to a number on submit.
    defaultValues: initial
      ? {
          title: initial.title,
          amount: String(initial.amount), // number → string for the input
          type: initial.type,
          category: initial.category,
          note: initial.note,
          date: toDateInputValue(initial.date),
        }
      : {
          title: '',
          amount: '', // empty string, not undefined
          type: 'expense',
          category: '',
          note: '',
          date: toDateInputValue(new Date()), // default to today
        },
  })

  const submit = async (values: TransactionFormValues) => {
    // Convert the form's string fields into the types the service expects.
    const input: TransactionInput = {
      title: values.title,
      amount: Number(values.amount), // string → number for storage
      type: values.type,
      category: values.category,
      note: values.note ?? '',
      date: new Date(values.date),
    }
    await onSubmit(input)
  }

  const categoryOptions = CATEGORIES.map((c) => ({ value: c.name, label: c.name }))

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
      <Input
        id="title"
        label="Title"
        placeholder="e.g. Groceries"
        error={errors.title?.message}
        {...register('title')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="amount"
          type="number"
          step="0.01"
          label="Amount"
          placeholder="0.00"
          error={errors.amount?.message}
          {...register('amount')}
        />
        <Select
          id="type"
          label="Type"
          options={[
            { value: 'expense', label: 'Expense' },
            { value: 'income', label: 'Income' },
          ]}
          error={errors.type?.message}
          {...register('type')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          id="category"
          label="Category"
          placeholder="Select category"
          options={categoryOptions}
          error={errors.category?.message}
          {...register('category')}
        />
        <Input
          id="date"
          type="date"
          label="Date"
          error={errors.date?.message}
          {...register('date')}
        />
      </div>

      <div>
        <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Note <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          id="note"
          rows={2}
          placeholder="Add a note…"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          {...register('note')}
        />
        {errors.note && <p className="mt-1.5 text-sm text-danger-500">{errors.note.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initial ? 'Save changes' : 'Add transaction'}
        </Button>
      </div>
    </form>
  )
}