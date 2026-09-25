import { useId, useState } from 'react'
import { cn } from '../../lib/cn'

export default function Tooltip({
  content,
  children,
  side = 'top',
  className,
}) {
  const [open, setOpen] = useState(false)
  const id = useId()

  const sides = {
    top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
    bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
    left: 'right-full top-1/2 mr-2 -translate-y-1/2',
    right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex">
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-40 whitespace-nowrap rounded-lg px-2.5 py-1.5',
          'bg-space-700 text-xs font-medium text-space-50 shadow-soft',
          'border border-white/10',
          'transition-all duration-150',
          sides[side],
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0.5',
          className,
        )}
      >
        {content}
      </span>
    </span>
  )
}
