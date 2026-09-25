import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Satellite, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../ui/Button'
import { cn } from '../../lib/cn'

const links = [
  { href: '#nasa-intelligence', label: 'NASA Data' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#data-sources', label: 'Sources' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-space-950/80 backdrop-blur-xl shadow-soft'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300">
            <Satellite className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-space-50">
            AgroOrbit
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-space-300 transition hover:text-orbit-green-300"
            >
              {link.label}
            </a>
          ))}
          <Link to="/app/overview">
            <Button size="sm">Explore My Field</Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-space-100 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-b border-white/10 bg-space-950/95 px-6 py-4 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-3 pb-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2 py-2 text-space-200 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link to="/app/overview" onClick={() => setOpen(false)}>
                <Button className="w-full justify-center">Explore My Field</Button>
              </Link>
              <Link
                to="/design-system"
                className="px-2 py-1 text-xs text-space-500"
                onClick={() => setOpen(false)}
              >
                Design system
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
