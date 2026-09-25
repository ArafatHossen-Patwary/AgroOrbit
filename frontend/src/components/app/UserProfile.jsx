import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/cn'

export default function UserProfile({ className }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-2 rounded-xl border border-white/10 bg-space-900/60',
          'py-1.5 pl-1.5 pr-2.5 text-left transition hover:border-white/20 hover:bg-space-800/80',
        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orbit-green-500/40 to-orbit-blue-500/40 text-sm font-semibold text-space-50">
          AO
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-sm font-medium text-space-100">
            Field Explorer
          </span>
          <span className="block truncate text-[11px] text-space-400">
            Demo profile
          </span>
        </span>
        <ChevronDown
          className={cn(
            'hidden h-4 w-4 text-space-400 transition sm:block',
            open && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default"
              aria-label="Close profile menu"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-space-900 shadow-card"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <div className="border-b border-white/10 px-3 py-3">
                <p className="text-sm font-medium text-space-50">Field Explorer</p>
                <p className="text-xs text-space-400">explorer@agroorbit.local</p>
              </div>
              <div className="p-1.5">
                <MenuRow icon={User} label="Profile" disabled />
                <Link
                  to="/app/settings"
                  role="menuitem"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-space-200 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  <Settings className="h-4 w-4 text-space-400" />
                  Settings
                </Link>
                <MenuRow icon={LogOut} label="Sign out" disabled />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuRow({ icon: Icon, label, disabled }) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-space-200 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Icon className="h-4 w-4 text-space-400" />
      {label}
    </button>
  )
}
