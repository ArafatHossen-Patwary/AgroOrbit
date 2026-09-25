import PlaceholderPage from './PlaceholderPage'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((i) => i.id === 'overview')

export default function Overview() {
  return (
    <PlaceholderPage
      emoji={meta.emoji}
      title={meta.label}
      description={meta.description}
    />
  )
}
