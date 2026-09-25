import PlaceholderPage from './PlaceholderPage'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((i) => i.id === 'settings')

export default function Settings() {
  return (
    <PlaceholderPage
      emoji={meta.emoji}
      title={meta.label}
      description={meta.description}
    />
  )
}
