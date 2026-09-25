import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Orbit } from 'lucide-react'
import Button from '../ui/Button'
import OrbitVisual from './OrbitVisual'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-void pt-16"
    >
      <OrbitVisual />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-6 py-16 lg:py-20">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.h1
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-space-50 sm:text-6xl lg:text-7xl"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <span className="text-gradient-orbit">AgroOrbit</span>
          </motion.h1>

          <motion.p
            className="mt-5 font-display text-xl font-medium text-space-100 sm:text-2xl"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Explore Your Field. Adapt for Tomorrow.
          </motion.p>

          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-space-300 sm:text-lg"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            AgroOrbit combines NASA Earth observations, local soil information,
            crop characteristics, and farmer priorities to help farmers explore
            resilient crop-rotation strategies.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Link to="/app/overview">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Explore My Field
              </Button>
            </Link>
            <a href="#nasa-intelligence">
              <Button size="lg" variant="outline" leftIcon={<Orbit className="h-4 w-4" />}>
                How NASA Data Works
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-space-500">
          Scroll
        </span>
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-orbit-cyan/80 to-transparent"
          animate={{ scaleY: [1, 0.6, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
