import { useLayoutEffect, useRef, useState, forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { controls } from '../design-system/foundations/spacing'
import { bluePurple } from '../design-system/foundations/brand-expression'
import './buttons.css'

export type ButtonVariant = 'primary' | 'gradient' | 'gradient-reveal' | 'secondary' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'compact' | 'default' | 'comfortable'
export type ButtonBorderMotion = 'none' | 'beam' | 'spin'
export type ButtonIconName = 'plus' | 'copy' | 'download' | 'arrow-right' | 'check' | 'trash' | 'refresh' | 'settings' | 'close' | 'loader'

export function ButtonIcon({ name, size = 18 }: { name: ButtonIconName; size?: number }) {
  const paths: Record<ButtonIconName, ReactNode> = {
    plus: <path d="M12 5v14M5 12h14"/>,
    copy: <><rect className="axo-glyph-copy-front" x="8" y="8" width="12" height="12" rx="2"/><path className="axo-glyph-copy-back" d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    download: <><path className="axo-glyph-download-arrow" d="M12 3v12m-4-4 4 4 4-4"/><path className="axo-glyph-download-tray" d="M4 17v3h16v-3"/></>,
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

/** One SVG unit is one CSS pixel; measure the viewport instead of stretching
 * a fixed viewBox (which would turn the capsule ends into ellipses). */
function ButtonBorderBeam() {
  const ref = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    const svg = ref.current
    if (!svg) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])
  const { width, height } = size
  // A 2px stroke centered 1px inside the outer edge stays in the border ring.
  const radius = Math.max(0, (Math.min(width, height) - 2) / 2)
  return <svg ref={ref} className="axo-button-border-beam" aria-hidden="true" focusable="false"
    viewBox={width && height ? `0 0 ${width} ${height}` : undefined}>
    {width > 2 && height > 2 ? <rect x="1" y="1" width={width - 2} height={height - 2}
      rx={radius} ry={radius} pathLength="100" /> : null}
  </svg>
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
  borderMotion?: ButtonBorderMotion
}

export const AxoButton = forwardRef<HTMLButtonElement, AxoButtonProps>(function AxoButton({
  children, variant = 'primary', size = 'default', icon, iconRight, iconOnly = false,
  loading = false, iconMotion = true, borderMotion = 'none', disabled, className = '', style, ...rest
}, ref) {
  const dimension = controls[size]
  // Icon-only controls retain their accessible circular dimensions.
  const buttonHeight = iconOnly ? (size === 'compact' ? controls.iconCompact : size === 'default' ? controls.iconDefault : controls.iconComfortable) : dimension.height
  const label = iconOnly ? (rest['aria-label'] || (typeof children === 'string' ? children : undefined)) : undefined
  return <button ref={ref} type="button" {...rest}
    aria-label={label ?? rest['aria-label']}
    aria-busy={loading || undefined}
    data-tooltip={iconOnly ? (label || undefined) : undefined}
    disabled={disabled || loading}
    className={['axo-button','axo-button--'+variant,'axo-button--'+size,iconOnly?'axo-button--icon':'',loading?'axo-button--loading':'',iconMotion?'axo-button--motion':'',variant==='gradient'?'axo-button--border-'+borderMotion:'',className].filter(Boolean).join(' ')}
    style={{'--axo-button-height':buttonHeight+'px','--axo-button-pad':dimension.horizontalPadding+'px','--axo-button-font':dimension.fontSize+'px','--axo-gradient-blue':bluePurple.stops[0],'--axo-gradient-middle':bluePurple.stops[1],'--axo-gradient-purple':bluePurple.stops[2],...style} as React.CSSProperties}>
    {variant === 'gradient' && borderMotion === 'beam' ? <ButtonBorderBeam /> : null}
    {variant==='gradient-reveal' ? <span className="axo-button-reveal-inner">
      {loading ? <span className="axo-button-icon" data-icon="loader"><ButtonIcon name="loader"/></span> : icon ? <span className="axo-button-icon" data-icon={icon}><ButtonIcon name={icon}/></span> : null}
      {children ? <span className="axo-button-label">{children}</span> : null}
      {!loading && iconRight ? <span className="axo-button-icon" data-icon={iconRight}><ButtonIcon name={iconRight}/></span> : null}
    </span> : <>
    {loading ? <span className="axo-button-icon" data-icon="loader"><ButtonIcon name="loader"/></span> : icon ? <span className="axo-button-icon" data-icon={icon}><ButtonIcon name={icon}/></span> : null}
    {iconOnly ? <span className="axo-button-icon-sr">{children}</span> : children ? <span className="axo-button-label">{children}</span> : null}
    {!loading && iconRight ? <span className="axo-button-icon" data-icon={iconRight}><ButtonIcon name={iconRight}/></span> : null}
    </>}
  </button>
})

export const buttonVariants: ButtonVariant[] = ['primary','gradient','gradient-reveal','secondary','ghost','outline','danger']
export const buttonSizes: ButtonSize[] = ['compact','default','comfortable']
