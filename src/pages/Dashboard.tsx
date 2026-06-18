// ─── src/pages/Dashboard.tsx ───
import { Link } from 'react-router-dom'
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowRight } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { TransactionItem } from '../components/TransactionItem'
import { ChartCard } from '../components/charts/ChartCard'
import { MonthlyChart } from '../components/charts/MonthlyChart'
import { CategoryChart } from '../components/charts/CategoryChart'
import { EmptyState, ErrorState } from '../components/states/States'
import { Card, Skeleton } from '../components/ui'
import { useTransactions } from '../hooks/useTransactions'
import { useStats } from '../hooks/useStats'
import { formatCurrency } from '../utils'
import { ROUTES } from '../constants'

export function Dashboard() {
  const { transactions, loading, error } = useTransactions()
  const { stats, monthly, byCategory, recent } = useStats(transactions)

  if (error) return <ErrorState message={error} />

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Balance"
          value={formatCurrency(stats.balance)}
          loading={loading}
          icon={<Wallet className="h-6 w-6" />}
          accent="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
        />
        <StatCard
          label="Total Income"
          value={formatCurrency(stats.totalIncome)}
          loading={loading}
          icon={<TrendingUp className="h-6 w-6" />}
          accent="bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-500"
        />
        <StatCard
          label="Total Expenses"
          value={formatCurrency(stats.totalExpenses)}
          loading={loading}
          icon={<TrendingDown className="h-6 w-6" />}
          accent="bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-500"
        />
        <StatCard
          label="Savings"
          value={formatCurrency(stats.savings)}
          loading={loading}
          icon={<PiggyBank className="h-6 w-6" />}
          accent="bg-warning-500/10 text-warning-500"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ChartCard
            title="Monthly Overview"
            subtitle="Income vs expenses by month"
            isEmpty={!loading && monthly.length === 0}
          >
            <MonthlyChart data={monthly} />
          </ChartCard>
        </div>
        <div className="lg:col-span-2">
          <ChartCard
            title="Spending by Category"
            subtitle="Where your money goes"
            isEmpty={!loading && byCategory.length === 0}
          >
            <CategoryChart data={byCategory} />
          </ChartCard>
        </div>
      </div>

      {/* Recent transactions */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Recent Transactions
          </h3>
          <Link
            to={ROUTES.TRANSACTIONS}
            className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            message="Your most recent transactions will show up here once you add some."
          />
        ) : (
          <div className="space-y-3">
            {/* read-only preview: edit/delete live on the Transactions page */}
            {recent.map((t) => (
              <TransactionItem key={t.id} transaction={t} readOnly />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}