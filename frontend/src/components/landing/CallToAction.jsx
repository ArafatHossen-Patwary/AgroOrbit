import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

export default function CallToAction() {
  return (
    <section id="explore" className="relative scroll-mt-24 px-6 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-orbit-green-600/25 via-space-900 to-orbit-blue-600/20" />
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-orbit-green-500/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-orbit-blue-500/25 blur-3xl" />

        <motion.div
          className="relative px-8 py-16 text-center sm:px-12 sm:py-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orbit-cyan">
            Ready when you are
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-space-50 sm:text-4xl">
            Start exploring resilient rotations for your field
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-space-300">
            Field tools are coming next. For now, learn how NASA Earth
            intelligence can shape adaptation — and be ready to explore your
            land with AgroOrbit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app/overview">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Open field workspace
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="secondary">
                See the workflow
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
