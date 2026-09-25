import { Link } from 'react-router-dom'
import { Menu, Satellite } from 'lucide-react'
import Button from '../ui/Button'
import Breadcrumb from './Breadcrumb'
import UserProfile from './UserProfile'
import { cn } from '../../lib/cn'

export default function TopNav({ onMenuClick, className, showMenuButton = false }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-white/10',
        'bg-space-950/80 px-4 backdrop-blur-xl sm:px-6',
        className,
      )}
    >
      {showMenuButton && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <Link to="/app/overview" className="flex items-center gap-2 lg:hidden" aria-label="AgroOrbit overview">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300 shadow-glow-green">
          <Satellite className="h-3.5 w-3.5" />
        </span>
        <span className="font-display text-sm font-semibold text-space-50">AgroOrbit</span>
      </Link>

      <div className="hidden min-w-0 flex-1 md:block">
        <Breadcrumb />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden rounded-full border border-orbit-cyan/25 bg-orbit-cyan/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-orbit-cyan sm:inline-flex">
          Demo Mode
        </span>
        <UserProfile />
      </div>
    </header>
  )
}
