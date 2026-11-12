import { useId, useLayoutEffect, useRef, useState, type MouseEventHandler } from 'react'
import { AxoButton } from './Buttons'
import { Tooltip } from './Tooltip'
import type { ThemeName } from '../design-system/foundations/colors'
import './widget-launch-button.css'

export interface WidgetLaunchButtonProps {
  /** Handler supplied by the widget/router once its tool route exists. */
  onClick: MouseEventHandler<HTMLButtonElement>
  /** Accessible description of the destination, e.g. "Otevřít QR generátor". */
  label: string
  disabled?: boolean
  className?: string
}

/**
 * One compact launcher for the upper-right corner of Small/Large widgets.
 * This is an action button, not a new general button hierarchy or navigation state.
 * The component never invents a route or changes application state by itself.
 */
export function WidgetLaunchButton({ onClick, label, disabled = false, className = '' }: WidgetLaunchButtonProps) {
  const labelId = useId()
  const button = useRef<HTMLButtonElement>(null)
  const [theme, setTheme] = useState<ThemeName>('dark')

  useLayoutEffect(() => {
    const owner = button.current?.closest('[data-theme]')
    if (!owner) return
    const syncTheme = () => setTheme(owner.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
    syncTheme()
    const observer = new MutationObserver(syncTheme)
    observer.observe(owner, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <Tooltip theme={theme} text={label} placement="bottom">
      <AxoButton
        ref={button}
        size="compact"
        variant="ghost"
        icon="external-link"
        iconOnly
        iconMotion={false}
        aria-labelledby={labelId}
        disabled={disabled}
        onClick={onClick}
        className={['widget-launch-button', className].filter(Boolean).join(' ')}
      >
        {/* A named element preserves the label without AxoButton's automatic CSS tooltip. */}
        <span id={labelId}>{label}</span>
      </AxoButton>
    </Tooltip>
  )
}
