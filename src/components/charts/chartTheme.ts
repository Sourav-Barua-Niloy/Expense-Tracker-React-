// ─── src/components/charts/chartTheme.ts ───
import { useTheme } from '../../context/ThemeContext'
import type { CSSProperties } from 'react'

export function useChartColors() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const colors = {
    grid: isDark ? '#1e293b' : '#e2e8f0',
    axis: isDark ? '#94a3b8' : '#64748b',
    income: '#10b981',
    expense: '#ef4444',
    brand: '#3b82f6',
    tooltipBg: isDark ? '#0f172a' : '#ffffff',
    tooltipBorder: isDark ? '#1e293b' : '#e2e8f0',
    tooltipText: isDark ? '#f1f5f9' : '#0f172a',
  }

  // Shared tooltip box style — change this once, every chart updates.
  const tooltipStyle: CSSProperties = {
    backgroundColor: colors.tooltipBg,
    border: `1px solid ${colors.tooltipBorder}`,
    borderRadius: 14,
    color: colors.tooltipText,
    fontSize: 13,
    padding: '10px 14px',
    boxShadow: isDark
      ? '0 10px 30px rgba(0, 0, 0, 0.45)'
      : '0 10px 30px rgba(15, 23, 42, 0.12)',
  }

  // The hover indicator behind bars — a soft tinted backdrop instead of grey.
  const tooltipCursor = { fill: isDark ? 'rgba(148,163,184,0.08)' : 'rgba(148,163,184,0.15)' }

  return { ...colors, tooltipStyle, tooltipCursor }
}