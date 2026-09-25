export const APP_BASE = '/app'

export const navItems = [
  { id: 'overview', label: 'Overview', emoji: '🌍', path: 'overview', description: 'Mission control for your farm adaptation workspace.' },
  { id: 'nasa-intelligence', label: 'NASA Intelligence', emoji: '🛰', path: 'nasa-intelligence', description: 'Earth observation context for your fields.' },
  { id: 'my-field', label: 'My Field', emoji: '🌱', path: 'my-field', description: 'Define and explore your field boundaries.' },
  { id: 'soil-profile', label: 'Soil Profile', emoji: '🧪', path: 'soil-profile', description: 'Local soil characteristics and inputs.' },
  { id: 'crop-library', label: 'Crop Library', emoji: '🌾', path: 'crop-library', description: 'Reference crop characteristics for planning.' },
  { id: 'farmer-priorities', label: 'Farmer Priorities', emoji: '🎯', path: 'farmer-priorities', description: 'Set your decision priorities for field planning.' },
  { id: 'rotation-lab', label: 'Rotation Lab', emoji: '🔄', path: 'rotation-lab', description: 'Design and test crop rotation sequences.' },
  { id: 'what-if', label: 'What If?', emoji: '🔮', path: 'what-if', description: 'Scenario exploration for adaptation choices.' },
  { id: 'rotation-dna', label: 'Rotation DNA', emoji: '🧬', path: 'rotation-dna', description: 'Break down the structure of a rotation plan.' },
  { id: 'field-time-machine', label: 'Field Time Machine', emoji: '⏳', path: 'field-time-machine', description: 'Look across seasons and historical context.' },
  { id: 'compare', label: 'Compare', emoji: '📊', path: 'compare', description: 'Side-by-side strategy comparison.' },
  { id: 'data-sources', label: 'Data Sources', emoji: '📚', path: 'data-sources', description: 'NASA and complementary data provenance.' },
  { id: 'settings', label: 'Settings', emoji: '⚙', path: 'settings', description: 'Preferences and workspace configuration.' },
]

export const mobilePrimaryIds = ['overview', 'my-field', 'crop-library', 'compare']

export function getNavItemByPath(pathname) {
  const segment = pathname.replace(/^\/app\/?/, '').split('/')[0] || 'overview'
  return navItems.find((item) => item.path === segment) || navItems[0]
}

export function toAppPath(path) {
  return `${APP_BASE}/${path}`
}
