// ─── src/routes/ProtectedRoute.tsx ───
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../constants'

/**
 * Wraps routes that require login.
 * - while auth state is loading → show a spinner (prevents login-page flash)
 * - if no user → redirect to /login
 * - if user → render the child routes via <Outlet />
 */
export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  return <Outlet />
}