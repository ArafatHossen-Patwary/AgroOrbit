import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X } from 'lucide-react'

const variantStyles = {
  info: 'border-orbit-cyan/30 bg-orbit-cyan/10 text-orbit-cyan',
  success: 'border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300',
  warning: 'border-orbit-amber/30 bg-orbit-amber/10 text-orbit-amber',
}

export function ToastViewport({ toasts = [], onDismiss }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex max-w-sm flex-col gap-3 md:right-6 md:top-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 28, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-auto"
          >
            <div className={`rounded-2xl border p-3 shadow-soft backdrop-blur-xl ${variantStyles[toast.variant] || variantStyles.info}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {toast.variant === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-space-50">{toast.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-space-200">{toast.message}</p>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => onDismiss(toast.id)}
                  className="rounded-lg border border-white/10 bg-black/10 p-1 text-space-100 transition hover:bg-black/20"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
