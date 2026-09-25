import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { getNavItemByPath, toAppPath } from '../../navigation/navItems'
import { cn } from '../../lib/cn'

export default function Breadcrumb({ className }) {
  const { pathname } = useLocation()
  const current = getNavItemByPath(pathname)

  const crumbs = [
    { label: 'App', to: toAppPath('overview'), icon: true },
    { label: current.label, to: toAppPath(current.path), current: true },
  ]

  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <ol className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, index) => (
          <Fragment key={crumb.to + crumb.label}>
            {index > 0 && (
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-space-500"
                aria-hidden
              />
            )}
            <li className="min-w-0">
              {crumb.current ? (
                <span
                  className="block truncate font-medium text-space-100"
                  aria-current="page"
                >
                  <span className="mr-1.5" aria-hidden>
                    {current.emoji}
                  </span>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.to}
                  className="inline-flex items-center gap-1.5 text-space-400 transition hover:text-orbit-green-300"
                >
                  {crumb.icon && <Home className="h-3.5 w-3.5" aria-hidden />}
                  {crumb.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
