import PlaceholderPage from './PlaceholderPage'
import { navItems } from '../../navigation/navItems'

const meta = navItems.find((i) => i.id === 'rotation-dna')

export default function RotationDna() {
  return (
    <PlaceholderPage
      emoji={meta.emoji}
      title={meta.label}
      description={meta.description}
    />
  )
}
