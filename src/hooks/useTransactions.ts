// ─── src/hooks/useTransactions.ts ───
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  subscribeToTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService'
import type { Transaction, TransactionInput } from '../types'

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Subscribe when we have a user; clean up the listener on unmount/user change.
  useEffect(() => {
    if (!user) {
      setTransactions([])
      setLoading(false)
      return
    }

    setLoading(true)
    const unsubscribe = subscribeToTransactions(
      user.uid,
      (data) => {
        setTransactions(data)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('Transaction subscription error:', err)
        setError('Failed to load transactions.')
        setLoading(false)
      },
    )

    // React calls this cleanup when the component unmounts or `user` changes.
    return unsubscribe
  }, [user])

  // CRUD actions, wrapped so components get a clean async API.
  // useCallback keeps the function identity stable across renders.
  const addTransaction = useCallback(
    async (input: TransactionInput) => {
      if (!user) throw new Error('Not authenticated')
      await createTransaction(user.uid, input)
    },
    [user],
  )

  const editTransaction = useCallback(
    async (id: string, input: TransactionInput) => {
      await updateTransaction(id, input)
    },
    [],
  )

  const removeTransaction = useCallback(async (id: string) => {
    await deleteTransaction(id)
  }, [])

  return {
    transactions,
    loading,
    error,
    addTransaction,
    editTransaction,
    removeTransaction,
  }
}