// ─── src/routes/PublicRoute.tsx ───
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../constants'

/**
 * Wraps auth pages (login/register). If already logged in, bounce to dashboard.
 */
export function PublicRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (user) return <Navigate to={ROUTES.DASHBOARD} replace />

  return <Outlet />
}