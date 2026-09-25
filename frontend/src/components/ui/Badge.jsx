import { cn } from '../../lib/cn'

const variants = {
  default: 'bg-space-700/80 text-space-200 border-white/10',
  success: 'bg-orbit-green-500/15 text-orbit-green-300 border-orbit-green-500/30',
  info: 'bg-orbit-blue-500/15 text-orbit-blue-300 border-orbit-blue-500/30',
  warning: 'bg-orbit-amber/15 text-orbit-amber border-orbit-amber/30',
  danger: 'bg-orbit-rose/15 text-orbit-rose border-orbit-rose/30',
  orbit:
    'bg-gradient-to-r from-orbit-green-500/20 to-orbit-blue-500/20 text-orbit-cyan border-orbit-cyan/25',
}

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

export default function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium tracking-wide',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
