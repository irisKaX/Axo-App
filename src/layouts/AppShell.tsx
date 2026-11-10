import { useId, type ReactNode } from 'react'
import { HeaderPreview } from '../pages/NavigationStudio'
import type { ThemeName } from '../design-system/foundations/colors'
import { themeStyle } from './theme'
import './layout-system.css'

export interface AppShellProps {
  theme: ThemeName
  onThemeChange: (theme: ThemeName) => void
  children: ReactNode
  pageLabel?: string
  footer?: ReactNode
  className?: string
  mainClassName?: string
}

/** The application environment. Catalog previews render this same tree. */
export function AppShell({ theme, onThemeChange, children, pageLabel, footer, className = '', mainClassName = '' }: AppShellProps) {
  const mainId = useId()
  return <div className={'axo-app-shell ' + className} style={themeStyle(theme)} data-theme={theme}>
    <a className="axo-skip-link" href={'#' + mainId}>Přejít na obsah</a>
    <div className="axo-app-header"><HeaderPreview mode={theme} onModeChange={onThemeChange} standalone pageLabel={pageLabel}/></div>
    <main id={mainId} tabIndex={-1} className={'axo-app-main ' + mainClassName}>{children}</main>
    {footer}
  </div>
}
