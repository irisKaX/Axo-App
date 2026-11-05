import type { ReactNode } from 'react'
import { AxoButton, type AxoButtonProps } from './Buttons'
import './navigation-button.css'

export type NavigationButtonState = 'inactive' | 'current' | 'expanded'
export type NavigationButtonShape = 'round' | 'label'

/**
 * Navigation state is independent from the generic Button variant:
 * current = destination currently displayed; expanded = transient open menu.
 * The parent/router is the sole source of truth for current.
 */
export interface NavigationButtonProps extends Omit<AxoButtonProps, 'variant' | 'size' | 'iconOnly' | 'iconMotion'> {
  state?: NavigationButtonState
  shape?: NavigationButtonShape
  children?: ReactNode
}

export function NavigationButton({
  state = 'inactive',
  shape = 'label',
  className = '',
  children,
  ...props
}: NavigationButtonProps) {
  const isCurrent = state === 'current'
  return (
    <AxoButton
      {...props}
      size="default"
      variant={isCurrent ? 'primary' : 'secondary'}
      iconOnly={shape === 'round'}
      iconMotion={false}
      data-nav-state={state}
      aria-current={isCurrent ? 'page' : undefined}
      className={['nav-button', 'nav-button--' + shape, className].filter(Boolean).join(' ')}
    >
      {children}
    </AxoButton>
  )
}
