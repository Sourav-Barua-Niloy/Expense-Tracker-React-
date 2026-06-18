// ─── src/components/charts/TrendChart.tsx ───
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useChartColors } from './chartTheme'
import { formatCurrency } from '../../utils'

interface TrendChartProps {
  data: { month: string; cumulative: number }[]
}

export function TrendChart({ data }: TrendChartProps) {
  const c = useChartColors()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        {/* a soft gradient fill under the line */}
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.brand} stopOpacity={0.3} />
            <stop offset="100%" stopColor={c.brand} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} vertical={false} />
        <XAxis dataKey="month" stroke={c.axis} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={c.axis} fontSize={12} tickLine={false} axisLine={false}
          tickFormatter={(v) => `${v >= 1000 || v <= -1000 ? `${v / 1000}k` : v}`} />
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), 'Balance']}
          contentStyle={{
            backgroundColor: c.tooltipBg,
            border: `1px solid ${c.tooltipBorder}`,
            borderRadius: 12,
            color: c.tooltipText,
            fontSize: 13,
          }}
        />
        <Area
          type="monotone"
          dataKey="cumulative"
          stroke={c.brand}
          strokeWidth={2}
          fill="url(#trendFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}