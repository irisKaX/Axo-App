import type { ThemeName } from '../design-system/foundations/colors'
import './theme-switch.css'

export interface ThemeSwitchProps {
  theme: ThemeName
  onThemeChange: (theme: ThemeName) => void
  disabled?: boolean
  label?: string
}

/** Accessible, controlled theme switch. The parent owns the app-wide theme. */
export function ThemeSwitch({theme,onThemeChange,disabled=false,label='Tmavý režim'}:ThemeSwitchProps){
  const dark=theme==='dark'
  return <label className={'axo-theme-switch'+(disabled?' is-disabled':'')}>
    <span className="axo-theme-switch-label">{label}</span>
    <span className="axo-theme-switch-control">
      <input type="checkbox" role="switch" aria-label={label} checked={dark} disabled={disabled}
        onChange={event=>onThemeChange(event.target.checked?'dark':'light')}/>
      <span className="axo-theme-switch-track" aria-hidden="true">
        <svg className="axo-theme-switch-icon axo-theme-switch-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>
        </svg>
        <svg className="axo-theme-switch-icon axo-theme-switch-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M20.4 15.4A8.4 8.4 0 0 1 8.6 3.6 8.4 8.4 0 1 0 20.4 15.4Z"/>
        </svg>
        <span className="axo-theme-switch-thumb">
          <svg className="axo-theme-switch-thumb-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>
          </svg>
          <svg className="axo-theme-switch-thumb-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M20.4 15.4A8.4 8.4 0 0 1 8.6 3.6 8.4 8.4 0 1 0 20.4 15.4Z"/>
          </svg>
        </span>
      </span>
    </span>
  </label>
}
