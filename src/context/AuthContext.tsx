// ─── src/context/AuthContext.tsx ───
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { auth } from '../firebase/config'
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} from '../services/authService'

// What the context provides to consumers.
interface AuthContextValue {
  user: FirebaseUser | null  // null = logged out
  loading: boolean           // true while we check the initial auth state
  register: (displayName: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // onAuthStateChanged fires once on load (with the persisted user or null)
    // and again whenever the user logs in or out. This is the heart of
    // persistent auth — on refresh, Firebase restores the session and calls this.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    // clean up the listener when the app unmounts
    return unsubscribe
  }, [])

  const value: AuthContextValue = {
    user,
    loading,
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    forgotPassword: resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * The hook components use to access auth.
 * Throwing if used outside the provider catches setup mistakes early.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}