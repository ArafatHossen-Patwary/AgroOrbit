import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

export function Section({
  id,
  className,
  children,
  narrow = false,
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-24 px-6 py-20 sm:py-24 lg:py-28',
        className,
      )}
    >
      <div className={cn('mx-auto', narrow ? 'max-w-3xl' : 'max-w-6xl')}>
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}) {
  return (
    <motion.div
      className={cn(
        'mb-12 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-orbit-cyan">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-space-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-space-300 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}

export function FadeIn({ children, className, delay = 0, y = 20 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
