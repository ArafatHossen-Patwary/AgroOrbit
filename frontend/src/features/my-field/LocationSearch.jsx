import { useEffect, useId, useRef, useState } from 'react'
import { Loader2, MapPin, Search } from 'lucide-react'
import { searchNominatim } from '../../lib/geo'
import { cn } from '../../lib/cn'

export default function LocationSearch({ value, onChange, onSelect, className }) {
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const listId = useId()
  const rootRef = useRef(null)
  const abortRef = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    const q = value?.trim() || ''
    if (q.length < 3) {
      setResults([])
      setLoading(false)
      setError(null)
      return undefined
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      setLoading(true)
      setError(null)
      try {
        const items = await searchNominatim(q, { signal: controller.signal })
        if (controller.signal.aborted) return
        setResults(items)
        setOpen(true)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError('Could not search locations. Try again.')
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      abortRef.current?.abort()
    }
  }, [value])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <label className="flex w-full flex-col gap-1.5">
        <span className="text-sm font-medium text-space-200">Location</span>
        <div className="relative">
          <input
            name="location"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Search a place (OpenStreetMap)"
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            className={cn(
              'h-10 w-full rounded-xl border border-white/10 bg-space-900/60 py-2 pl-3 pr-10',
              'text-sm text-space-50 placeholder:text-space-500',
              'focus:border-orbit-blue-400/50 focus:outline-none focus:ring-2 focus:ring-orbit-blue-400/40 focus:ring-offset-1 focus:ring-offset-void',
            )}
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-space-400">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </span>
        </div>
        <span className="text-xs text-space-400">
          Powered by Nominatim · OpenStreetMap
        </span>
      </label>

      {error && <p className="mt-1.5 text-xs text-orbit-rose">{error}</p>}

      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-white/10 bg-space-900 py-1 shadow-card"
        >
          {results.map((item) => (
            <li key={item.id} role="option">
              <button
                type="button"
                className="flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm text-space-200 hover:bg-white/5 hover:text-space-50"
                onClick={() => {
                  onSelect(item)
                  setOpen(false)
                }}
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orbit-cyan" />
                <span className="line-clamp-2">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
