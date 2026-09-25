import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

const Select = forwardRef(function Select(
  { className, label, hint, error, id, options = [], placeholder, ...props },
  ref,
) {
  const selectId = id || props.name

  return (
    <label className="flex w-full flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-space-200">{label}</span>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-10 w-full appearance-none rounded-xl border bg-space-900/60 py-2 pl-3 pr-10',
            'text-sm text-space-50',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-void',
            error
              ? 'border-orbit-rose/50 focus:ring-orbit-rose/60'
              : 'border-white/10 focus:border-orbit-blue-400/50 focus:ring-orbit-blue-400/40',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value
            const labelText = typeof opt === 'string' ? opt : opt.label
            return (
              <option key={value} value={value} className="bg-space-900 text-space-50">
                {labelText}
              </option>
            )
          })}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-space-400"
          aria-hidden
        />
      </div>
      {(hint || error) && (
        <span className={cn('text-xs', error ? 'text-orbit-rose' : 'text-space-400')}>
          {error || hint}
        </span>
      )}
    </label>
  )
})

export default Select
