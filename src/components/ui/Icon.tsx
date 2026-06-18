// ─── src/components/ui/Icon.tsx ───
import { icons, type LucideProps } from 'lucide-react'

interface IconProps extends LucideProps {
  name: string // e.g. "LayoutDashboard", "Wallet"
}

/**
 * Renders any lucide-react icon by name.
 * lucide-react exports an `icons` object keyed by PascalCase names, so we can
 * look up the component dynamically. Falls back to a neutral icon if not found.
 */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? icons.Circle
  return <LucideIcon {...props} />
}