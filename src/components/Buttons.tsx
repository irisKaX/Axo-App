import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { controls } from '../design-system/foundations/spacing'
import { deepElectric } from '../design-system/foundations/brand-expression'
import './buttons.css'

export type ButtonVariant = 'primary' | 'gradient' | 'secondary' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'compact' | 'default' | 'comfortable'
export type ButtonIconName = 'plus' | 'copy' | 'download' | 'arrow-right' | 'check' | 'trash' | 'refresh' | 'settings' | 'close' | 'loader'

export function ButtonIcon({ name, size = 18 }: { name: ButtonIconName; size?: number }) {
  const paths: Record<ButtonIconName, ReactNode> = {
    plus: <path d="M12 5v14M5 12h14"/>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4"/><path d="M4 17v3h16v-3"/></>,
    'arrow-right': <><path d="M4 12h16M14 6l6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    trash: <><path d="M4 7h16M10 4h4m-8 3 1 13h10l1-13M10 10v7m4-7v7"/></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.4 9A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 12.6-2"/></>,
    settings: <><path d="M12 4v3m0 10v3M4 12h3m10 0h3M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1m0-11.4-2.1 2.1m-7.2 7.2-2.1 2.1"/><circle cx="12" cy="12" r="4"/></>,
    close: <path d="M5 5l14 14M19 5 5 19"/>,
    loader: <path d="M12 3a9 9 0 1 0 9 9"/>,
  }
  return <svg className={name === 'loader' ? 'axo-button-spinner' : undefined} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

export interface AxoButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ButtonIconName
  iconRight?: ButtonIconName
  iconOnly?: boolean
  loading?: boolean
  iconMotion?: boolean
}

export const AxoButton = forwardRef<HTMLButtonElement, AxoButtonProps>(function AxoButton({
  children, variant = 'primary', size = 'default', icon, iconRight, iconOnly = false,
  loading = false, iconMotion = true, disabled, className = '', style, ...rest
}, ref) {
  const dimension = controls[size]
  const label = iconOnly ? (rest['aria-label'] || (typeof children === 'string' ? children : undefined)) : undefined
  return <button ref={ref} type="button" {...rest}
    aria-label={label ?? rest['aria-label']}
    aria-busy={loading || undefined}
    disabled={disabled || loading}
    className={['axo-button','axo-button--'+variant,'axo-button--'+size,iconOnly?'axo-button--icon':'',loading?'axo-button--loading':'',iconMotion?'axo-button--motion':'',className].filter(Boolean).join(' ')}
    style={{'--axo-button-height':dimension.height+'px','--axo-button-pad':dimension.horizontalPadding+'px','--axo-button-font':dimension.fontSize+'px','--axo-button-gradient':deepElectric.css,...style} as React.CSSProperties}>
    {loading ? <span className="axo-button-icon" data-icon="loader"><ButtonIcon name="loader"/></span> : icon ? <span className="axo-button-icon" data-icon={icon}><ButtonIcon name={icon}/></span> : null}
    {iconOnly ? <span className="axo-button-icon-sr">{children}</span> : children ? <span className="axo-button-label">{children}</span> : null}
    {!loading && iconRight ? <span className="axo-button-icon" data-icon={iconRight}><ButtonIcon name={iconRight}/></span> : null}
  </button>
})

export const buttonVariants: ButtonVariant[] = ['primary','gradient','secondary','ghost','outline','danger']
export const buttonSizes: ButtonSize[] = ['compact','default','comfortable']
