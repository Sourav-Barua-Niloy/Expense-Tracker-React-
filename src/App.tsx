// ─── src/App.tsx (temporary, for Phase 4 testing) ───
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PublicRoute } from './routes/PublicRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'
import { Button } from './components/ui'
import { ROUTES } from './constants'

// A throwaway "dashboard" just to confirm protected routes + logout work.
function TempDashboard() {
  const { user, logout } = useAuth()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Logged in as {user?.displayName || user?.email}
      </h1>
      <p className="text-sm text-slate-500">Protected route works. 🎉</p>
      <Button variant="secondary" onClick={logout}>Log out</Button>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Toaster renders our react-hot-toast notifications app-wide */}
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes — redirect to dashboard if already logged in */}
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          </Route>

          {/* Protected routes — redirect to login if not authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<TempDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App