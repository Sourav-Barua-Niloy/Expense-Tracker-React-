// ─── src/routes/AppRouter.tsx ───
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Dashboard } from '../pages/Dashboard'
import { Transactions } from '../pages/Transactions'
import { Analytics } from '../pages/Analytics'
import { Profile } from '../pages/Profile'
import { ROUTES } from '../constants'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes — bounce to dashboard if already logged in */}
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>

        {/* Protected app routes — require login, wrapped in the dashboard shell */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
            <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>
        </Route>

        {/* Anything else → redirect to dashboard (which itself guards auth) */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  )
}