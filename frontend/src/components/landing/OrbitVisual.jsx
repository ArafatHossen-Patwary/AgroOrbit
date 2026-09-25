import { motion } from 'framer-motion'

/**
 * Full-bleed space + Earth + field visual with orbiting satellite.
 * Decorative only — no measurement data.
 */
export default function OrbitVisual({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Atmosphere gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(14,165,233,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(16,185,129,0.18),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(5,8,15,0.95),transparent_45%)]" />

      {/* Star field */}
      <div className="absolute inset-0 opacity-70">
        {Array.from({ length: 48 }).map((_, i) => {
          const left = ((i * 47) % 100) + (i % 7) * 0.3
          const top = ((i * 31) % 95) + (i % 5) * 0.4
          const size = i % 5 === 0 ? 2 : 1
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 2.4 + (i % 5) * 0.4,
                repeat: Infinity,
                delay: (i % 8) * 0.25,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </div>

      {/* Earth + fields + orbit */}
      <svg
        className="absolute -right-[8%] top-[8%] h-[85%] w-[85%] max-w-none sm:right-[-2%] sm:top-[5%] sm:h-[90%] sm:w-[70%] lg:w-[58%]"
        viewBox="0 0 640 640"
        fill="none"
      >
        <defs>
          <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#10b981" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#05080f" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="earthBody" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="45%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#082f49" />
          </radialGradient>
          <linearGradient id="fieldGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="fieldGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0.7" />
          </linearGradient>
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Glow */}
        <circle cx="320" cy="330" r="250" fill="url(#earthGlow)" />

        {/* Orbit ring */}
        <motion.ellipse
          cx="320"
          cy="330"
          rx="270"
          ry="110"
          stroke="rgba(34,211,238,0.35)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          transform="rotate(-28 320 330)"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <ellipse
          cx="320"
          cy="330"
          rx="270"
          ry="110"
          stroke="rgba(16,185,129,0.15)"
          strokeWidth="1"
          transform="rotate(-28 320 330)"
        />

        {/* Earth disk */}
        <circle cx="320" cy="330" r="168" fill="url(#earthBody)" />
        <circle
          cx="320"
          cy="330"
          r="168"
          fill="none"
          stroke="rgba(56,189,248,0.35)"
          strokeWidth="2"
        />

        {/* Continents / agricultural patches (abstract) */}
        <g opacity="0.92">
          <path
            d="M220 280 C250 250, 310 255, 340 285 C360 305, 355 340, 325 355 C290 375, 240 360, 225 325 C215 305, 210 295, 220 280Z"
            fill="url(#fieldGreen)"
          />
          <path
            d="M340 250 C370 240, 410 255, 425 285 C435 310, 420 340, 390 350 C360 360, 330 340, 325 310 C320 280, 325 255, 340 250Z"
            fill="url(#fieldGold)"
            opacity="0.85"
          />
          <path
            d="M250 360 C280 350, 320 365, 345 390 C360 410, 350 440, 315 445 C280 450, 245 425, 240 395 C236 375, 238 365, 250 360Z"
            fill="#047857"
            opacity="0.9"
          />
          {/* Field contour lines */}
          <path
            d="M235 300 H320 M245 320 H335 M255 340 H310"
            stroke="rgba(167,243,208,0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M350 280 H405 M360 300 H415 M355 320 H400"
            stroke="rgba(190,242,100,0.3)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* Atmosphere rim */}
        <circle
          cx="320"
          cy="330"
          r="172"
          fill="none"
          stroke="rgba(125,211,252,0.25)"
          strokeWidth="6"
          filter="url(#softBlur)"
        />

        {/* Orbiting satellite — SVG animateTransform for reliable orbit */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 320 330"
            to="360 320 330"
            dur="18s"
            repeatCount="indefinite"
          />
          <g transform="rotate(-28 320 330) translate(320 220)">
            <rect
              x="-10"
              y="-6"
              width="20"
              height="12"
              rx="2"
              fill="#e2e8f0"
            />
            <rect x="-28" y="-3" width="16" height="6" rx="1" fill="#38bdf8" />
            <rect x="12" y="-3" width="16" height="6" rx="1" fill="#34d399" />
            <circle cx="0" cy="-10" r="2.5" fill="#22d3ee" />
            <motion.circle
              cx="0"
              cy="-10"
              r="6"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              animate={{ r: [4, 14], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          </g>
        </g>

        {/* Second faint orbit tracer */}
        <motion.circle
          cx="320"
          cy="330"
          r="210"
          fill="none"
          stroke="rgba(14,165,233,0.12)"
          strokeWidth="1"
          strokeDasharray="2 14"
          animate={{ rotate: -360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '320px 330px' }}
        />
      </svg>

      {/* Ground haze */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void via-void/80 to-transparent" />
    </div>
  )
}
