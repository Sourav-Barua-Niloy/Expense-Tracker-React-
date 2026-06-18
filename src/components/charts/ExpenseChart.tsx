// ─── src/components/charts/ExpenseChart.tsx ───
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useChartColors } from './chartTheme'
import { formatCurrency } from '../../utils'

interface ExpenseChartProps {
  data: { month: string; expense: number }[]
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  const c = useChartColors()

  return (
    <ResponsiveContainer width="100%" height={300}>
     <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }} barCategoryGap="40%">
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} vertical={false} />
        <XAxis dataKey="month" stroke={c.axis} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={c.axis} fontSize={12} tickLine={false} axisLine={false}
          tickFormatter={(v) => `${v >= 1000 ? `${v / 1000}k` : v}`} />
        <Tooltip
            formatter={(value) => [formatCurrency(Number(value)), 'Expenses']}
            contentStyle={c.tooltipStyle}
            cursor={c.tooltipCursor}
          />
        <Bar dataKey="expense" fill={c.expense} radius={[6, 6, 0, 0]} maxBarSize={56} />
      </BarChart>
    </ResponsiveContainer>
  )
}