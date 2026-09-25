import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-gradient-to-r from-orbit-green-600 to-orbit-green-500 text-white shadow-[0_0_24px_rgba(16,185,129,0.22)] hover:from-orbit-green-500 hover:to-orbit-green-400 focus-visible:ring-orbit-green-400',
  secondary:
    'bg-space-700/80 text-space-100 border border-white/10 hover:bg-space-600/80 hover:border-white/20 focus-visible:ring-orbit-blue-400',
  outline:
    'bg-transparent text-orbit-green-300 border border-orbit-green-500/40 hover:bg-orbit-green-500/10 hover:border-orbit-green-400 focus-visible:ring-orbit-green-400',
  ghost:
    'bg-transparent text-space-200 hover:bg-white/5 hover:text-white focus-visible:ring-space-400',
  danger:
    'bg-orbit-rose/90 text-white hover:bg-orbit-rose focus-visible:ring-orbit-rose',
}

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-xl',
  icon: 'h-10 w-10 rounded-xl p-0 justify-center',
}

const Button = forwardRef(function Button(
  {
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void',
        'disabled:pointer-events-none disabled:opacity-50',
        'active:scale-[0.98]',
        'hover:-translate-y-0.5',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
})

export default Button
