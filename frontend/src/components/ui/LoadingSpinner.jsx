import { cn } from '../../lib/cn'

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
}

const tones = {
  green: 'border-orbit-green-500/25 border-t-orbit-green-400',
  blue: 'border-orbit-blue-500/25 border-t-orbit-blue-400',
  cyan: 'border-orbit-cyan/25 border-t-orbit-cyan',
  white: 'border-white/20 border-t-white',
}

export default function LoadingSpinner({
  className,
  size = 'md',
  tone = 'green',
  label = 'Loading',
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', className)}
    >
      <span
        className={cn(
          'animate-spin rounded-full',
          sizes[size],
          tones[tone],
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
