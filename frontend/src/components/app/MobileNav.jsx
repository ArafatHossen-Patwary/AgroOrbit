import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Grid2x2, X } from 'lucide-react'
import {
  mobilePrimaryIds,
  navItems,
  toAppPath,
} from '../../navigation/navItems'
import { cn } from '../../lib/cn'

export default function MobileNav() {
  const [moreOpen, setMoreOpen] = useState(false)
  const { pathname } = useLocation()

  const primary = navItems.filter((item) => mobilePrimaryIds.includes(item.id))
  const moreItems = navItems.filter((item) => !mobilePrimaryIds.includes(item.id))
  const moreActive = moreItems.some((item) =>
    pathname.startsWith(toAppPath(item.path)),
  )

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-space-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
        aria-label="Mobile"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-0.5 px-1 py-1.5">
          {primary.map((item) => (
            <NavLink
              key={item.id}
              to={toAppPath(item.path)}
              onClick={() => setMoreOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-[10px] font-medium transition',
                  isActive
                    ? 'bg-orbit-green-500/15 text-orbit-green-300'
                    : 'text-space-400 hover:text-space-200',
                )
              }
            >
              <span className="text-base leading-none" aria-hidden>
                {item.emoji}
              </span>
              <span className="max-w-full truncate">{shortLabel(item.label)}</span>
            </NavLink>
          ))}

          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            className={cn(
              'flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-[10px] font-medium transition',
              moreOpen || moreActive
                ? 'bg-orbit-blue-500/15 text-orbit-blue-300'
                : 'text-space-400 hover:text-space-200',
            )}
            aria-expanded={moreOpen}
            aria-controls="mobile-more-sheet"
          >
            <Grid2x2 className="h-4 w-4" />
            <span>More</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close more menu"
              className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              id="mobile-more-sheet"
              className="fixed inset-x-0 bottom-[calc(3.75rem+env(safe-area-inset-bottom))] z-50 mx-3 mb-2 max-h-[60vh] overflow-hidden rounded-2xl border border-white/10 bg-space-900 shadow-card lg:hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="font-display text-sm font-semibold text-space-50">
                  More destinations
                </p>
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-space-400 hover:bg-white/5 hover:text-space-100"
                  aria-label="Close"
                  onClick={() => setMoreOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-[calc(60vh-3.25rem)] space-y-0.5 overflow-y-auto p-2">
                {moreItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={toAppPath(item.path)}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition',
                        isActive
                          ? 'bg-orbit-green-500/15 text-orbit-green-300'
                          : 'text-space-200 hover:bg-white/5',
                      )
                    }
                  >
                    <span className="text-base" aria-hidden>
                      {item.emoji}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function shortLabel(label) {
  if (label === 'Rotation Lab') return 'Lab'
  if (label === 'My Field') return 'Field'
  return label
}
