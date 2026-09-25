import { cn } from '../../lib/cn'

const tones = {
  green: 'from-orbit-green-600 to-orbit-green-400',
  blue: 'from-orbit-blue-600 to-orbit-blue-400',
  orbit: 'from-orbit-green-500 via-orbit-cyan to-orbit-blue-500',
  amber: 'from-orbit-amber/80 to-orbit-amber',
}

export default function ProgressBar({
  value = 0,
  max = 100,
  className,
  tone = 'orbit',
  showLabel = true,
  label,
  size = 'md',
}) {
  const clamped = Math.min(Math.max(Number(value), 0), max)
  const percent = Math.round((clamped / max) * 100)

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  }

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-space-300">{label || 'Progress'}</span>
          <span className="font-display font-semibold text-space-100">{percent}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-white/10',
          heights[size],
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out',
            tones[tone],
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
