import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

export default function GlassCard({
  className,
  children,
  padding = 'md',
  animate = true,
  strong = false,
  ...props
}) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  const Comp = animate ? motion.div : 'div'
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: 'easeOut' },
      }
    : {}

  return (
    <Comp
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 shadow-soft transition-all duration-300',
        strong ? 'glass-strong' : 'glass',
        paddings[padding],
        'hover:border-white/15 hover:shadow-[0_12px_30px_rgba(15,23,42,0.45)]',
        className,
      )}
      {...motionProps}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_32%)]" />
      <div className="relative">{children}</div>
    </Comp>
  )
}
