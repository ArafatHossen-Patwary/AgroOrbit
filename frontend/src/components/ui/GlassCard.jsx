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
        transition: { duration: 0.35, ease: 'easeOut' },
      }
    : {}

  return (
    <Comp
      className={cn(
        'rounded-2xl shadow-soft',
        strong ? 'glass-strong' : 'glass',
        paddings[padding],
        className,
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Comp>
  )
}
