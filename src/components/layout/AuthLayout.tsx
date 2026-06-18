// ─── src/components/layout/AuthLayout.tsx ───
import type { ReactNode } from 'react'
import { Wallet } from 'lucide-react'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
            <Wallet className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>

        {/* The form card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}