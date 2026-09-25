import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Droplets,
  Leaf,
  Satellite,
  Thermometer,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  GlassCard,
  Input,
  LoadingSpinner,
  MetricCard,
  Modal,
  ProgressBar,
  Select,
  Slider,
  Tooltip,
} from '../components/ui'

function Section({ title, description, children }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-semibold text-space-50">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-space-400">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export default function DesignSystem() {
  const [slider, setSlider] = useState(62)
  const [modalOpen, setModalOpen] = useState(false)
  const [crop, setCrop] = useState('wheat')

  return (
    <div className="bg-space-gradient min-h-screen">
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-12">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orbit-green-500/30 bg-orbit-green-500/10 text-orbit-green-300">
                <Satellite className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-orbit-cyan">
                  AgroOrbit
                </p>
                <h1 className="font-display text-3xl font-bold text-space-50 sm:text-4xl">
                  Design System
                </h1>
              </div>
            </div>
            <Link
              to="/"
              className="text-sm text-space-300 transition hover:text-orbit-green-300"
            >
              ← Back to home
            </Link>
          </div>
          <p className="max-w-2xl text-space-300">
            Reusable UI primitives for a NASA-inspired climate & precision
            agriculture product. Tokens: space void, orbit green, earth blue,
            glass surfaces, and soft motion.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="orbit">Space tech</Badge>
            <Badge variant="success">Agri green</Badge>
            <Badge variant="info">Earth blue</Badge>
            <Badge variant="warning">Climate signal</Badge>
          </div>
        </header>

        <Section title="Buttons" description="Primary actions and secondary controls.">
          <GlassCard className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Saving</Button>
            <Button size="sm">Small</Button>
            <Button size="lg" leftIcon={<Leaf className="h-4 w-4" />}>
              Large
            </Button>
            <Tooltip content="Satellite sync">
              <Button size="icon" variant="secondary" aria-label="Sync">
                <Satellite className="h-4 w-4" />
              </Button>
            </Tooltip>
          </GlassCard>
        </Section>

        <Section title="Cards" description="Solid card vs glassmorphism surface.">
          <div className="grid gap-4 md:grid-cols-2">
            <Card hover>
              <CardHeader>
                <div>
                  <CardTitle>Solid Card</CardTitle>
                  <CardDescription>
                    Dense content blocks for SaaS layouts.
                  </CardDescription>
                </div>
                <Badge variant="info">Default</Badge>
              </CardHeader>
              <p className="text-sm text-space-300">
                Use for tables, forms, and nested panels where glass would compete
                with background gradients.
              </p>
            </Card>
            <GlassCard>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-space-50">
                  GlassCard
                </h3>
                <Badge variant="orbit">Glass</Badge>
              </div>
              <p className="text-sm text-space-300">
                Frosted panels for hero metrics, overlays, and atmospheric
                dashboard modules.
              </p>
            </GlassCard>
          </div>
        </Section>

        <Section title="Metric cards" description="KPI tiles with trend badges.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              label="Soil moisture"
              value="34"
              unit="%"
              delta="+2.4%"
              deltaLabel="vs last week"
              trend="up"
              icon={<Droplets className="h-5 w-5" />}
            />
            <MetricCard
              label="Canopy temp"
              value="28.6"
              unit="°C"
              delta="-0.8°"
              deltaLabel="cooler than forecast"
              trend="down"
              icon={<Thermometer className="h-5 w-5" />}
            />
            <MetricCard
              label="NDVI index"
              value="0.72"
              delta="+0.05"
              deltaLabel="vegetation vigor"
              trend="up"
              icon={<Leaf className="h-5 w-5" />}
            />
          </div>
        </Section>

        <Section title="Form controls" description="Input, select, and slider.">
          <GlassCard>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Field name"
                placeholder="North Valley Plot A"
                hint="Displayed on maps and reports"
              />
              <Select
                label="Crop type"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                options={[
                  { value: 'wheat', label: 'Wheat' },
                  { value: 'rice', label: 'Rice' },
                  { value: 'maize', label: 'Maize' },
                  { value: 'soy', label: 'Soybean' },
                ]}
              />
              <div className="md:col-span-2">
                <Slider
                  label="Irrigation intensity"
                  value={slider}
                  onChange={(e) => setSlider(Number(e.target.value))}
                  unit="%"
                />
              </div>
              <Input
                label="With error"
                defaultValue=""
                placeholder="Required"
                error="This field is required"
              />
            </div>
          </GlassCard>
        </Section>

        <Section title="Feedback" description="Progress, loading, badges, modal, tooltip.">
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard className="space-y-5">
              <ProgressBar value={72} label="Model readiness" tone="orbit" />
              <ProgressBar value={45} label="Soil health" tone="green" size="sm" />
              <ProgressBar value={88} label="Satellite coverage" tone="blue" size="lg" />
              <div className="flex items-center gap-4 pt-2">
                <LoadingSpinner size="sm" />
                <LoadingSpinner tone="blue" />
                <LoadingSpinner size="lg" tone="cyan" />
                <span className="text-sm text-space-400">Loading states</span>
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="orbit" size="lg">
                  Orbit
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Tooltip content="Opens sample dialog">
                  <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                </Tooltip>
                <Tooltip content="Climate-ready badge" side="bottom">
                  <Badge variant="info">Hover me</Badge>
                </Tooltip>
              </div>
            </GlassCard>
          </div>
        </Section>

        <Section title="Typography & color" description="Display + body fonts and core palette.">
          <GlassCard className="space-y-6">
            <div>
              <p className="font-display text-3xl font-bold text-gradient-orbit">
                Field Shift · Orbit Precision
              </p>
              <p className="mt-2 max-w-xl text-space-300">
                Space Grotesk for headlines. Manrope for interface copy. Keep
                sentences short; let data and maps carry the story.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { name: 'Void', className: 'bg-void' },
                { name: 'Space 900', className: 'bg-space-900' },
                { name: 'Orbit Green', className: 'bg-orbit-green-500' },
                { name: 'Earth Blue', className: 'bg-orbit-blue-500' },
              ].map((swatch) => (
                <div key={swatch.name} className="space-y-2">
                  <div className={cnSwatch(swatch.className)} />
                  <p className="text-xs text-space-400">{swatch.name}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Section>

        <footer className="border-t border-white/5 pt-6 text-sm text-space-500">
          AgroOrbit design system · components only · no dashboard or NASA API
        </footer>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Mission brief"
        description="Sample modal using glass surface and soft motion."
      >
        <p className="text-sm text-space-300">
          This dialog is part of the reusable Modal primitive. Escape or click
          the overlay to dismiss.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)}>Confirm</Button>
        </div>
      </Modal>
    </div>
  )
}

function cnSwatch(bg) {
  return `h-14 rounded-xl border border-white/10 shadow-soft ${bg}`
}
