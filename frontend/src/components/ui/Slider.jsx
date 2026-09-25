import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const Slider = forwardRef(function Slider(
  {
    className,
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    showValue = true,
    unit = '',
    onChange,
    ...props
  },
  ref,
) {
  const percent = ((Number(value) - min) / (max - min)) * 100

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-3">
          {label && (
            <span className="text-sm font-medium text-space-200">{label}</span>
          )}
          {showValue && (
            <span className="font-display text-sm font-semibold text-orbit-cyan">
              {value}
              {unit}
            </span>
          )}
        </div>
      )}
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={{
          background: `linear-gradient(to right, #10b981 0%, #0ea5e9 ${percent}%, rgba(255,255,255,0.08) ${percent}%, rgba(255,255,255,0.08) 100%)`,
        }}
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-full',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-glow-blue',
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orbit-blue-400',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
          '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0',
          '[&::-moz-range-thumb]:bg-white',
        )}
        {...props}
      />
    </div>
  )
})

export default Slider
