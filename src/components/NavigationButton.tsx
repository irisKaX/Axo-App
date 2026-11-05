import type { ReactNode } from 'react'
import { AxoButton, type AxoButtonProps } from './Buttons'
import './navigation-button.css'

export type NavigationButtonState = 'inactive' | 'current' | 'expanded'
export type NavigationButtonShape = 'round' | 'label'

/**
 * All navigation states use the ThemeSwitch purple surface.
 * current = destination currently displayed (reuses Primary 2 Orbital Glow);
 * expanded = transient open menu.
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
  return (
    <AxoButton
      {...props}
      size="default"
      variant={state === 'current' ? 'primary-2' : 'primary'}
      iconOnly={shape === 'round'}
      iconMotion={false}
      data-nav-state={state}
      aria-current={state === 'current' ? 'page' : undefined}
      className={['nav-button', 'nav-button--' + shape, className].filter(Boolean).join(' ')}
    >
      {children}
    </AxoButton>
  )
}
