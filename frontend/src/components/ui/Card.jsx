import { cn } from '../../lib/cn'

export default function Card({
  className,
  children,
  padding = 'md',
  hover = false,
  ...props
}) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-space-800/80 shadow-card',
        'transition-all duration-300',
        hover && 'hover:border-white/15 hover:bg-space-700/80 hover:-translate-y-0.5',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('mb-4 flex items-start justify-between gap-3', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn('font-display text-lg font-semibold text-space-50', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('mt-1 text-sm text-space-300', className)} {...props}>
      {children}
    </p>
  )
}
