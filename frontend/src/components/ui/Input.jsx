import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const Input = forwardRef(function Input(
  { className, label, hint, error, id, ...props },
  ref,
) {
  const inputId = id || props.name

  return (
    <label className="flex w-full flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-space-200">{label}</span>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'h-10 w-full rounded-xl border bg-space-900/60 px-3 text-sm text-space-50',
          'placeholder:text-space-500',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-void',
          error
            ? 'border-orbit-rose/50 focus:ring-orbit-rose/60'
            : 'border-white/10 focus:border-orbit-blue-400/50 focus:ring-orbit-blue-400/40',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      {(hint || error) && (
        <span className={cn('text-xs', error ? 'text-orbit-rose' : 'text-space-400')}>
          {error || hint}
        </span>
      )}
    </label>
  )
})

export default Input
