import { NavLink } from 'react-router-dom'
import { Satellite } from 'lucide-react'
import { cn } from '../../lib/cn'
import { navItems, toAppPath } from '../../navigation/navItems'

export default function Sidebar({ className, onNavigate }) {
  return (
    <aside
      className={cn(
        'flex h-full w-64 flex-col border-r border-white/10 bg-space-950/95',
        className,
      )}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300">
          <Satellite className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-base font-semibold tracking-tight text-space-50">
            AgroOrbit
          </p>
          <p className="truncate text-[10px] uppercase tracking-[0.16em] text-orbit-cyan">
            Field workspace
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Main">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={toAppPath(item.path)}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                isActive
                  ? 'bg-orbit-green-500/15 text-orbit-green-300 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.25)]'
                  : 'text-space-300 hover:bg-white/5 hover:text-space-50',
              )
            }
          >
            <span className="text-base leading-none" aria-hidden>
              {item.emoji}
            </span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-3 text-[11px] text-space-500">
        NASA Space Apps · Field Shift
      </div>
    </aside>
  )
}
