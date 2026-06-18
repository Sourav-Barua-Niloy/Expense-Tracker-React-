// ─── src/components/layout/Sidebar.tsx ───
import { NavLink } from 'react-router-dom'
import { Wallet, X } from 'lucide-react'
import { Icon } from '../ui'
import { cn } from '../../utils'
import { NAV_ITEMS } from '../../constants'

interface SidebarProps {
  /** mobile drawer open state */
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop — only visible when the drawer is open on small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white',
          'dark:border-slate-800 dark:bg-slate-900',
          'transition-transform duration-300',
          // on mobile: slide in/out. on desktop (lg): always visible.
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0',
        )}
      >
        {/* Brand + mobile close button */}
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Spendly
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'} // exact match for the dashboard root
              onClick={onClose} // close drawer after navigating on mobile
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                )
              }
            >
              <Icon name={item.icon} className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 text-xs text-slate-400">
          Spendly · Sourav Barua · v1.0
        </div>
      </aside>
    </>
  )
}