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

const toneClasses = {
  green: 'bg-orbit-green-500/15 text-orbit-green-300',
  blue: 'bg-orbit-blue-500/15 text-orbit-blue-300',
  cyan: 'bg-orbit-cyan/15 text-orbit-cyan',
  amber: 'bg-orbit-amber/15 text-orbit-amber',
  rose: 'bg-orbit-rose/15 text-orbit-rose',
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
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">Workspace ready</Badge>
                <Badge variant="orbit">NASA data stays transparent</Badge>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-space-50 sm:text-4xl">
                Start with your field
              </h2>
              <p className="mt-3 text-base leading-relaxed text-space-300">
                Build your field context step by step. Start by saving a field,
                then add soil information, inspect observed environmental data,
                and set the priorities that matter to you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/app/my-field">
                  <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Explore My Field
                  </Button>
                </Link>
                <Link to="/app/nasa-intelligence">
                  <Button size="lg" variant="secondary" leftIcon={<Satellite className="h-4 w-4" />}>
                    Open NASA Intelligence
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
                <h2 className="font-display text-lg font-semibold text-space-50">What is available now?</h2>
                <p className="mt-1 text-sm text-space-400">Field data, NASA POWER observations, soil inputs, crop reference data, and priorities are connected.</p>
              </div>
            </div>
            <Badge variant="warning">Rotation engine coming later</Badge>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  )
}
