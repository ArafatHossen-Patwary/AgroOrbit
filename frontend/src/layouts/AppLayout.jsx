import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from '../components/app/Sidebar'
import TopNav from '../components/app/TopNav'
import MobileNav from '../components/app/MobileNav'
import { cn } from '../lib/cn'

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!drawerOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [drawerOpen])

  return (
    <div className="min-h-screen bg-void text-space-100">
      <div className="pointer-events-none fixed inset-0 bg-space-gradient opacity-75" aria-hidden />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_38%)]" aria-hidden />

      <div className="relative flex min-h-screen">
        <div className="sticky top-0 hidden h-screen shrink-0 lg:block">
          <Sidebar />
        </div>

        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close sidebar"
                className="fixed inset-0 z-50 bg-void/70 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
              />
              <motion.div
                className="fixed inset-y-0 left-0 z-50 lg:hidden"
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              >
                <Sidebar onNavigate={() => setDrawerOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="relative flex min-w-0 flex-1 flex-col">
          <TopNav showMenuButton onMenuClick={() => setDrawerOpen(true)} />

          <main className={cn('flex-1 pb-24 lg:pb-8')}>
            <Outlet />
          </main>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
