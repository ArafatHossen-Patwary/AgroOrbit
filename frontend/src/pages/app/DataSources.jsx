import PlaceholderPage from './PlaceholderPage'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((i) => i.id === 'data-sources')

export default function DataSources() {
  return (
    <PlaceholderPage
      emoji={meta.emoji}
      title={meta.label}
      description={meta.description}
    />
  )
}
