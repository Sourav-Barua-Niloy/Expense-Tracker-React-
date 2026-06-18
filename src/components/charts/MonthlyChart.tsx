// ─── src/components/charts/MonthlyChart.tsx ───
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { useChartColors } from './chartTheme'
import { formatCurrency } from '../../utils'

interface MonthlyChartProps {
  data: { month: string; income: number; expense: number }[]
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const c = useChartColors()

  return (
    // ResponsiveContainer makes the chart fill its parent and resize fluidly.
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} vertical={false} />
        <XAxis dataKey="month" stroke={c.axis} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={c.axis} fontSize={12} tickLine={false} axisLine={false}
          tickFormatter={(v) => `${v >= 1000 ? `${v / 1000}k` : v}`} />
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
          contentStyle={{
            backgroundColor: c.tooltipBg,
            border: `1px solid ${c.tooltipBorder}`,
            borderRadius: 12,
            color: c.tooltipText,
            fontSize: 13,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 13 }} />
        <Bar dataKey="income" name="Income" fill={c.income} radius={[6, 6, 0, 0]} maxBarSize={40} />
        <Bar dataKey="expense" name="Expense" fill={c.expense} radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  )
}