import type { ThemeName } from '../design-system/foundations/colors'
import './theme-switch.css'

export interface ThemeSwitchProps {
  theme: ThemeName
  onThemeChange: (theme: ThemeName) => void
  disabled?: boolean
  label?: string
}

/** Accessible controlled Uiverse-inspired sun/moon switch. The parent owns the app theme. */
export function ThemeSwitch({theme,onThemeChange,disabled=false,label='Tmavý režim'}:ThemeSwitchProps){
  const dark=theme==='dark'
  return <label className={'axo-theme-switch'+(disabled?' is-disabled':'')}>
    <span className="axo-theme-switch-label">{label}</span>
    <span className="axo-theme-switch-control">
      <input type="checkbox" role="switch" aria-label={label} checked={dark} disabled={disabled}
        onChange={event=>onThemeChange(event.target.checked?'dark':'light')}/>
      <span className="axo-theme-switch-track" aria-hidden="true">
        <span className="axo-theme-switch-orb"/>
      </span>
    </span>
  </label>
}
