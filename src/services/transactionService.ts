// ─── src/services/transactionService.ts ───
// The only file that touches the Firestore `transactions` collection.
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  type QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import type { Transaction, TransactionInput } from '../types'

const COLLECTION = 'transactions'

/**
 * Convert a Firestore document into our app's Transaction type.
 * This is the single place Timestamp → Date conversion happens.
 */
function mapDoc(snap: QueryDocumentSnapshot<DocumentData>): Transaction {
  const data = snap.data()
  return {
    id: snap.id,
    userId: data.userId,
    title: data.title,
    amount: data.amount,
    type: data.type,
    category: data.category,
    note: data.note ?? '',
    // .toDate() turns a Firestore Timestamp into a JS Date.
    // Fallbacks guard the brief moment before serverTimestamp resolves.
    date: data.date?.toDate?.() ?? new Date(),
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
  }
}

/**
 * Subscribe to a user's transactions in real time.
 * onSnapshot fires immediately with current data, then again on every change
 * (add/edit/delete) — so the UI updates live without manual refetching.
 * Returns an unsubscribe function to call on cleanup.
 */
export function subscribeToTransactions(
  userId: string,
  onData: (transactions: Transaction[]) => void,
  onError: (error: Error) => void,
): () => void {
  // Filter to this user's docs, newest first.
  const q = query(
    collection(db, COLLECTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
  )

  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map(mapDoc)),
    (error) => onError(error),
  )
}

/** Create a new transaction. Firestore generates the id; we set createdAt. */
export async function createTransaction(
  userId: string,
  input: TransactionInput,
): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    userId,
    title: input.title,
    amount: input.amount,
    type: input.type,
    category: input.category,
    note: input.note,
    // store the JS Date as a Firestore Timestamp
    date: Timestamp.fromDate(input.date),
    createdAt: serverTimestamp(),
  })
}

/** Update an existing transaction's fields. */
export async function updateTransaction(
  id: string,
  input: TransactionInput,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    title: input.title,
    amount: input.amount,
    type: input.type,
    category: input.category,
    note: input.note,
    date: Timestamp.fromDate(input.date),
  })
}

/** Delete a transaction. */
export async function deleteTransaction(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id))
}