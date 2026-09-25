import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Droplets,
  Leaf,
  MapPinned,
  Satellite,
  SlidersHorizontal,
  Sprout,
} from 'lucide-react'
import { Badge, Button, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((item) => item.id === 'overview')

const workspaceCards = [
  {
    to: '/app/my-field',
    icon: MapPinned,
    tone: 'green',
    title: 'Explore My Field',
    text: 'Select a location, draw a boundary, and save your field to Laravel.',
    action: 'Open field tools',
  },
  {
    to: '/app/nasa-intelligence',
    icon: Satellite,
    tone: 'blue',
    title: 'NASA Intelligence',
    text: 'Review real NASA POWER observations for the selected field.',
    action: 'View observations',
  },
  {
    to: '/app/soil-profile',
    icon: Droplets,
    tone: 'cyan',
    title: 'Soil Profile',
    text: 'Record the soil information you know and review its health indicators.',
    action: 'Open soil profile',
  },
  {
    to: '/app/crop-library',
    icon: BookOpen,
    tone: 'amber',
    title: 'Crop Library',
    text: 'Browse the reference crop database before planning rotations.',
    action: 'Browse crops',
  },
  {
    to: '/app/farmer-priorities',
    icon: SlidersHorizontal,
    tone: 'rose',
    title: 'Farmer Priorities',
    text: 'Set the goals that will guide the future rotation engine.',
    action: 'Set priorities',
  },
]

const demoSteps = [
  { step: 1, title: 'Select field', label: 'USER INPUT', to: '/app/my-field', detail: 'Feni Demonstration Farm is loaded as a sample field for the presentation flow.' },
  { step: 2, title: 'NASA data scan', label: 'NASA OBSERVED', to: '/app/nasa-intelligence', detail: 'Demonstration weather baselines are shown for context and clearly marked as sample values.' },
  { step: 3, title: 'Field Intelligence', label: 'DERIVED', to: '/app/nasa-intelligence', detail: 'AgroOrbit interprets the field environment using NASA baseline context and measured indicators.' },
  { step: 4, title: 'Soil Profile', label: 'USER INPUT', to: '/app/soil-profile', detail: 'Soil characteristics are entered as local input and never presented as live field measurements.' },
  { step: 5, title: 'Farmer Priorities', label: 'USER INPUT', to: '/app/farmer-priorities', detail: 'Priority weights guide water, soil, climate, and diversity decisions during planning.' },
  { step: 6, title: 'Rotation Lab', label: 'CROP DATABASE', to: '/app/rotation-lab', detail: 'Crop references are used to build realistic rotation sequences and test seasonal plans.' },
  { step: 7, title: 'Rotation DNA', label: 'DERIVED', to: '/app/rotation-dna', detail: 'The crop sequence is unpacked into agronomic logic and characteristic trade-offs.' },
  { step: 8, title: 'What-If simulation', label: 'SIMULATED', to: '/app/what-if', detail: 'Hypothetical climate scenarios change the environmental assumptions without claiming NASA forecasts.' },
  { step: 9, title: 'Rotation Comparison', label: 'DERIVED', to: '/app/compare', detail: 'Multiple rotations are compared across trade-offs rather than ranked as a single best option.' },
  { step: 10, title: 'Data Sources', label: 'NASA DATA / CROP DATABASE / SIMULATION', to: '/app/data-sources', detail: 'The review shows what is observed, entered by the user, derived, and simulated.' },
]

const toneClasses = {
  green: 'bg-orbit-green-500/15 text-orbit-green-300',
  blue: 'bg-orbit-blue-500/15 text-orbit-blue-300',
  cyan: 'bg-orbit-cyan/15 text-orbit-cyan',
  amber: 'bg-orbit-amber/15 text-orbit-amber',
  rose: 'bg-orbit-rose/15 text-orbit-rose',
}

function DemoBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-orbit-cyan/25 bg-orbit-cyan/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-orbit-cyan">
      {children}
    </span>
  )
}

export default function Overview() {
  return (
    <PageContainer
      className="max-w-7xl"
      title={`${meta.emoji} ${meta.label}`}
      description="Your AgroOrbit workspace for connecting field knowledge, NASA observations, crop context, and farmer goals."
    >
      <div className="space-y-6">
        <GlassCard className="overflow-hidden border-orbit-green-500/20 bg-gradient-to-br from-orbit-green-500/15 via-space-900/80 to-orbit-blue-500/15" padding="lg">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <DemoBadge>Demo Mode</DemoBadge>
                <Badge variant="success">Workspace ready</Badge>
                <Badge variant="orbit">NASA data stays transparent</Badge>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-space-50 sm:text-4xl">
                Feni Demonstration Farm
              </h2>
              <p className="mt-3 text-base leading-relaxed text-space-300">
                This presentation walkthrough uses a sample field and demonstration values to guide the full AgroOrbit workflow. The system clearly separates NASA-observed inputs, user-entered values, crop database references, derived analysis, and simulated scenario assumptions.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-orbit-amber">
                Demonstration values are illustrative and are not live NASA observations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/app/my-field">
                  <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Start demo workflow
                  </Button>
                </Link>
                <Link to="/app/data-sources">
                  <Button size="lg" variant="secondary" leftIcon={<Satellite className="h-4 w-4" />}>
                    View sources
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden shrink-0 rounded-[2rem] border border-white/10 bg-space-950/50 p-8 shadow-glow-green lg:block">
              <Sprout className="h-24 w-24 text-orbit-green-300" strokeWidth={1.2} />
            </div>
          </div>
        </GlassCard>

        <section>
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-cyan">
                Guided workflow
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-space-50">
                Demo sequence for the NASA Space Apps presentation
              </h2>
            </div>
            <span className="hidden text-xs text-space-500 sm:block">10 steps</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {demoSteps.map((step) => (
              <Link key={step.step} to={step.to} className="group">
                <GlassCard className="h-full transition duration-300 group-hover:-translate-y-1 group-hover:border-white/20" padding="lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orbit-green-500/10 text-sm font-semibold text-orbit-green-300">
                      {step.step}
                    </div>
                    <Badge variant="default" size="sm">
                      {step.label}
                    </Badge>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-space-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 min-h-[72px] text-sm leading-relaxed text-space-400">
                    {step.detail}
                  </p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-orbit-cyan">
                    Open step →
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-cyan">Workspace modules</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-space-50">Your field adaptation toolkit</h2>
            </div>
            <span className="hidden text-xs text-space-500 sm:block">Choose a module to continue</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workspaceCards.map((card) => {
              const Icon = card.icon
              return (
                <Link key={card.to} to={card.to} className="group">
                  <GlassCard className="h-full transition duration-300 group-hover:-translate-y-1 group-hover:border-white/20" padding="lg">
                    <div className="flex items-start justify-between gap-3">
                      <span className={`rounded-2xl p-3 ${toneClasses[card.tone]}`}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <ArrowRight className="h-4 w-4 text-space-600 transition group-hover:translate-x-1 group-hover:text-space-200" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-space-50">{card.title}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-relaxed text-space-400">{card.text}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-orbit-cyan">{card.action} →</p>
                  </GlassCard>
                </Link>
              )
            })}
          </div>
        </section>

        <GlassCard className="border-white/10 bg-space-900/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-orbit-blue-500/15 p-2.5 text-orbit-blue-300"><BarChart3 className="h-5 w-5" /></div>
              <div>
                <h2 className="font-display text-lg font-semibold text-space-50">Source transparency</h2>
                <p className="mt-1 text-sm text-space-400">NASA OBSERVED, USER INPUT, CROP DATABASE, DERIVED, and SIMULATED values are separated at every stage.</p>
              </div>
            </div>
            <Badge variant="warning">Demo Mode</Badge>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  )
}
