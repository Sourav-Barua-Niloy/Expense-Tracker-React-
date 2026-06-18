// ─── src/components/charts/CategoryChart.tsx ───
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useChartColors } from './chartTheme'
import { getCategoryMeta } from '../../constants'
import { formatCurrency } from '../../utils'

interface CategoryChartProps {
  data: { category: string; value: number }[]
}

export function CategoryChart({ data }: CategoryChartProps) {
  const c = useChartColors()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={60}   // innerRadius > 0 makes it a donut
          outerRadius={100}
          paddingAngle={2}
        >
          {/* color each slice using the category's own color from constants */}
          {data.map((entry) => (
            <Cell key={entry.category} fill={getCategoryMeta(entry.category).color} />
          ))}
        </Pie>
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
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}