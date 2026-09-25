import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '../../lib/cn'
import GlassCard from './GlassCard'
import Badge from './Badge'

export default function MetricCard({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  trend = 'neutral',
  icon,
  className,
  ...props
}) {
  const trendTone =
    trend === 'up' ? 'success' : trend === 'down' ? 'danger' : 'default'

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null

  return (
    <GlassCard className={cn('relative overflow-hidden', className)} {...props}>
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orbit-green-500/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-orbit-blue-500/10 blur-2xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-space-400">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-space-50">
            {value}
            {unit && (
              <span className="ml-1 text-base font-medium text-space-400">{unit}</span>
            )}
          </p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orbit-cyan">
            {icon}
          </div>
        )}
      </div>

      {(delta != null || deltaLabel) && (
        <div className="relative mt-4 flex items-center gap-2">
          {delta != null && (
            <Badge variant={trendTone} size="sm">
              {TrendIcon && <TrendIcon className="h-3 w-3" />}
              {delta}
            </Badge>
          )}
          {deltaLabel && (
            <span className="text-xs text-space-400">{deltaLabel}</span>
          )}
        </div>
      )}
    </GlassCard>
  )
}
