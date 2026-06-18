// ─── src/services/authService.ts ───
// The only file that talks to Firebase Auth + writes the user profile doc.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  type User as FirebaseUser,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import type { UserProfile } from '../types'

/**
 * Firebase throws errors with codes like "auth/email-already-in-use".
 * This maps them to friendly, human messages for our toasts.
 */
export function getAuthErrorMessage(code: string): string {
  const map: Record<string, string> = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'That email address looks invalid.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  }
  return map[code] ?? 'Something went wrong. Please try again.'
}

/**
 * Register: create the auth account, set the display name, and create the
 * matching users/{uid} profile document in Firestore.
 */
export async function registerUser(
  displayName: string,
  email: string,
  password: string,
): Promise<void> {
  // 1. create the Firebase Auth account
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  // 2. set the display name on the auth profile
  await updateProfile(user, { displayName })

  // 3. create the Firestore profile document at users/{uid}
  await setDoc(doc(db, 'users', user.uid), {
    displayName,
    email,
    photoURL: null,
    createdAt: serverTimestamp(), // Firestore fills in the server's time
  })
}

/** Log in with email + password. */
export async function loginUser(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password)
}

/** Log out the current user. */
export async function logoutUser(): Promise<void> {
  await fbSignOut(auth)
}

/** Send a password-reset email. */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

/** Read a user's profile document from Firestore. */
export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null

  const data = snap.data()
  return {
    uid,
    displayName: data.displayName ?? '',
    email: data.email ?? '',
    photoURL: data.photoURL ?? null,
    // convert Firestore Timestamp → JS Date (with a fallback for the brief
    // window before serverTimestamp resolves)
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
  }
}

/** Update the display name on both Auth and the Firestore profile doc. */
export async function updateUserProfile(
  user: FirebaseUser,
  displayName: string,
): Promise<void> {
  await updateProfile(user, { displayName })
  await setDoc(
    doc(db, 'users', user.uid),
    { displayName },
    { merge: true }, // merge = update only this field, don't overwrite the doc
  )
}

/**
 * Change password. Firebase requires a recent login to change sensitive data,
 * so we re-authenticate with the current password first.
 */
export async function changeUserPassword(
  user: FirebaseUser,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const credential = EmailAuthProvider.credential(user.email!, currentPassword)
  await reauthenticateWithCredential(user, credential)
  await updatePassword(user, newPassword)
}