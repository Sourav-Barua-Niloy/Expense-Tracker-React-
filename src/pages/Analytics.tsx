// ─── src/pages/Analytics.tsx ───
import { ChartCard } from '../components/charts/ChartCard'
import { MonthlyChart } from '../components/charts/MonthlyChart'
import { CategoryChart } from '../components/charts/CategoryChart'
import { ExpenseChart } from '../components/charts/ExpenseChart'
import { TrendChart } from '../components/charts/TrendChart'
import { CategoryRanking } from '../components/CategoryRanking'
import { ErrorState } from '../components/states/States'
import { Card, Skeleton } from '../components/ui'
import { useTransactions } from '../hooks/useTransactions'
import { useStats } from '../hooks/useStats'

export function Analytics() {
  const { transactions, loading, error } = useTransactions()
  const { monthly, byCategory, trend, categoryRanking } = useStats(transactions)

  if (error) return <ErrorState message={error} />

  // While loading, show a grid of skeleton chart cards.
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="mb-4 h-5 w-40" />
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </Card>
        ))}
      </div>
    )
  }

  const noData = transactions.length === 0
  const noExpenses = byCategory.length === 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Analytics</h2>
        <p className="text-sm text-slate-500">Insights into your income and spending</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Income vs Expense */}
        <ChartCard
          title="Income vs Expense"
          subtitle="Monthly comparison"
          isEmpty={noData}
        >
          <MonthlyChart data={monthly} />
        </ChartCard>

        {/* Monthly expenses only */}
        <ChartCard
          title="Monthly Expenses"
          subtitle="How much you spend each month"
          isEmpty={noExpenses}
        >
          <ExpenseChart data={monthly} />
        </ChartCard>

        {/* Balance trend */}
        <ChartCard
          title="Balance Trend"
          subtitle="Your cumulative balance over time"
          isEmpty={noData}
        >
          <TrendChart data={trend} />
        </ChartCard>

        {/* Category breakdown donut */}
        <ChartCard
          title="Category Breakdown"
          subtitle="Spending distribution"
          isEmpty={noExpenses}
        >
          <CategoryChart data={byCategory} />
        </ChartCard>
      </div>

      {/* Category ranking — full width */}
      <Card>
        <div className="mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Top Categories</h3>
          <p className="text-sm text-slate-500">Your biggest spending areas</p>
        </div>
        {noExpenses ? (
          <div className="py-10 text-center text-sm text-slate-400">
            No expense data yet. Add some expense transactions to see your breakdown.
          </div>
        ) : (
          <CategoryRanking data={categoryRanking} />
        )}
      </Card>
    </div>
  )
}