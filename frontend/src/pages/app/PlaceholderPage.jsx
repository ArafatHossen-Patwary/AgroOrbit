import { Badge, GlassCard } from '../../components/ui'
import PageContainer from '../../components/app/PageContainer'

/**
 * Empty placeholder for app routes — no feature logic yet.
 */
export default function PlaceholderPage({ emoji, title, description }) {
  return (
    <PageContainer title={`${emoji} ${title}`} description={description}>
      <GlassCard className="max-w-2xl">
        <Badge variant="orbit" className="mb-3">
          Coming soon
        </Badge>
        <p className="font-display text-lg font-semibold text-space-50">
          This workspace is ready for implementation
        </p>
        <p className="mt-2 text-sm leading-relaxed text-space-300">
          The AgroOrbit app shell and navigation are in place. Feature logic for{' '}
          <span className="text-orbit-green-300">{title}</span> will be built in a
          later step. No NASA data or crop engine runs here yet.
        </p>
      </GlassCard>
    </PageContainer>
  )
}
