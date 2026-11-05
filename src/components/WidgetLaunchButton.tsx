import type { MouseEventHandler } from 'react'
import { AxoButton } from './Buttons'
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
  return (
    <AxoButton
      size="compact"
      variant="ghost"
      icon="external-link"
      iconOnly
      iconMotion={false}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={['widget-launch-button', className].filter(Boolean).join(' ')}
    />
  )
}
