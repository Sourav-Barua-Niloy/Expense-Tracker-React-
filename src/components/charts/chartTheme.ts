// ─── src/components/charts/chartTheme.ts ───
import { useTheme } from '../../context/ThemeContext'

/**
 * Recharts needs literal colors (not Tailwind classes). This hook returns
 * theme-aware colors so charts look right in light and dark mode.
 */
export function useChartColors() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return {
    grid: isDark ? '#1e293b' : '#e2e8f0',       // slate-800 / slate-200
    axis: isDark ? '#94a3b8' : '#64748b',       // slate-400 / slate-500
    income: '#10b981',                           // success-500
    expense: '#ef4444',                          // danger-500
    brand: '#3b82f6',                            // brand-500
    tooltipBg: isDark ? '#0f172a' : '#ffffff',   // slate-950 / white
    tooltipBorder: isDark ? '#1e293b' : '#e2e8f0',
    tooltipText: isDark ? '#f1f5f9' : '#0f172a',
  }
}