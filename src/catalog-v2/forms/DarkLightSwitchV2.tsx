import type { ThemeName } from '../../design-system/foundations/colors'

interface DarkLightSwitchProps {
  theme: ThemeName
  onThemeChange: (theme: ThemeName) => void
}

export default function DarkLightSwitchV2({ theme, onThemeChange }: DarkLightSwitchProps) {
  const dark = theme === 'dark'
  const label = dark ? 'Přepnout na světlý motiv' : 'Přepnout na tmavý motiv'

  return <button type="button" className="v2f-theme-switch" role="switch" aria-checked={dark} aria-label="Tmavý režim" title={label}
    onClick={() => onThemeChange(dark ? 'light' : 'dark')}>
    <span className="v2f-theme-orb" aria-hidden="true" />
  </button>
}
