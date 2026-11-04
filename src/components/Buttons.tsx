import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { AxoIcon, type AxoIconName } from './AxoIcon'
import { controls } from '../design-system/foundations/spacing'
import { bluePurple } from '../design-system/foundations/brand-expression'
import './buttons.css'

export type ButtonVariant = 'primary' | 'primary-2' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'compact' | 'default'
export type ButtonIconName = AxoIconName

// Backward-compatible adapter while icon usage is migrated to the shared registry.
export function ButtonIcon({ name, size = 18 }: { name: ButtonIconName; size?: number }) {
  return <AxoIcon name={name} size={size}/>
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
  // Icon-only controls retain their accessible circular dimensions.
  const buttonHeight = iconOnly ? (size === 'compact' ? controls.compact.height : controls.default.height) : dimension.height
  const buttonWidth = size === 'compact' ? 148 : 176
  const label = iconOnly ? (rest['aria-label'] || (typeof children === 'string' ? children : undefined)) : undefined
  return <button ref={ref} type="button" {...rest}
    aria-label={label ?? rest['aria-label']}
    aria-busy={loading || undefined}
    data-tooltip={iconOnly ? (label || undefined) : undefined}
    disabled={disabled || loading}
    className={['axo-button','axo-button--'+variant,'axo-button--'+size,iconOnly?'axo-button--icon':'',loading?'axo-button--loading':'',iconMotion?'axo-button--motion':'',variant==='primary-2'?'axo-button--orbital':'',className].filter(Boolean).join(' ')}
    style={{'--axo-button-height':buttonHeight+'px','--axo-button-width':buttonWidth+'px','--axo-button-pad':dimension.horizontalPadding+'px','--axo-button-font':dimension.fontSize+'px','--axo-gradient-blue':bluePurple.stops[0],'--axo-gradient-middle':bluePurple.stops[1],'--axo-gradient-purple':bluePurple.stops[2],...style} as React.CSSProperties}>
    {iconOnly ? <>
      {loading ? <span className="axo-button-icon" data-icon="loader"><AxoIcon name="loader"/></span> : icon ? <span className="axo-button-icon" data-icon={icon}><AxoIcon name={icon}/></span> : null}
      <span className="axo-button-icon-sr">{children}</span>
    </> : <span className={'axo-button-content'+(variant==='secondary'?' axo-button-reveal-inner':'')}>
      <span className="axo-button-content-slot">
        {loading ? <span className="axo-button-icon" data-icon="loader"><AxoIcon name="loader"/></span> : icon ? <span className="axo-button-icon" data-icon={icon}><AxoIcon name={icon}/></span> : null}
      </span>
      <span className="axo-button-label">{children}</span>
      <span className="axo-button-content-slot">
        {!loading && iconRight ? <span className="axo-button-icon" data-icon={iconRight}><AxoIcon name={iconRight}/></span> : null}
      </span>
    </span>}
  </button>
})

export const buttonVariants: ButtonVariant[] = ['primary','primary-2','secondary','outline','ghost','danger']
export const buttonSizes: ButtonSize[] = ['compact','default']
