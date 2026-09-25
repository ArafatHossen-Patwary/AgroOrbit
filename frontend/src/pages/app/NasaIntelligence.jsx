import PlaceholderPage from './PlaceholderPage'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((i) => i.id === 'nasa-intelligence')

export default function NasaIntelligence() {
  return (
    <PlaceholderPage
      emoji={meta.emoji}
      title={meta.label}
      description={meta.description}
    />
  )
}
