import { Link } from 'react-router-dom'
import { Satellite } from 'lucide-react'

const footerLinks = [
  { href: '#nasa-intelligence', label: 'NASA Intelligence' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#data-sources', label: 'Data sources' },
  { href: '#explore', label: 'Explore' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-space-950 px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300">
              <Satellite className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold text-space-50">
              AgroOrbit
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-space-400">
            Explore Your Field. Adapt for Tomorrow. Built for the NASA Space
            Apps Challenge — Field Shift: Adapting Farms with NASA Data.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-space-500">
            Navigate
          </p>
          <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-space-300 transition hover:text-orbit-green-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-white/5 pt-6 text-xs text-space-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} AgroOrbit. NASA Space Apps Challenge.</p>
        <Link to="/design-system" className="hover:text-space-300">
          Design system
        </Link>
      </div>
    </footer>
  )
}
