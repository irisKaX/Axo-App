import { useEffect, useId, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AxoIcon } from './AxoIcon'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { controls, radius, spacing } from '../design-system/foundations/spacing'
import { fontFamilies, typography } from '../design-system/foundations/typography'
import './settings-popover.css'

// A controlled listbox can be portalled while still belonging to this panel.
function containsPanelContent(panel: HTMLElement | null, target: Node | null) {
  if (!panel || !target) return false
  if (panel.contains(target)) return true
  return Array.from(panel.querySelectorAll<HTMLElement>('[aria-haspopup="listbox"][aria-controls]')).some(control =>
    control.getAttribute('aria-controls')?.split(/\s+/).some(id => document.getElementById(id)?.contains(target)),
  )
}

interface SettingsPopoverProps {
  theme: ThemeName
  title: string
  description?: string
  triggerLabel?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function SettingsPopover({ theme, title, description, triggerLabel = 'Nastavení', open, onOpenChange, children }: SettingsPopoverProps) {
  const uid = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const dismiss = useRef<HTMLButtonElement>(null)
  const colors = colorTokens.semantic[theme]
  const states = colorTokens.interaction[theme]
  const variables = {
    colorScheme: theme,
    '--sp-surface': colors.surface.raised,
    '--sp-control-surface': colors.surface.default,
    '--sp-border': colors.border.default,
    '--sp-text': colors.text.primary,
    '--sp-muted': colors.text.secondary,
    '--sp-hover': states.hover.background,
    '--sp-pressed': states.pressed.background,
    '--sp-focus': states.focus.ring,
    '--sp-radius': radius.lg + 'px',
    '--sp-pill': radius.pill + 'px',
    '--sp-padding': spacing[6] + 'px',
    '--sp-gap': spacing[4] + 'px',
    '--sp-small-gap': spacing[2] + 'px',
    '--sp-control-height': controls.default.height + 'px',
    '--sp-font': fontFamilies.ui,
    '--sp-title-size': typography.h4.size + 'px',
    '--sp-title-leading': typography.h4.lineHeight,
    '--sp-title-weight': typography.h4.weight,
    '--sp-body-size': typography.bodySm.size + 'px',
    '--sp-body-leading': typography.bodySm.lineHeight,
    '--sp-button-weight': typography.button.weight,
  } as CSSProperties

  function close() {
    onOpenChange(false)
    trigger.current?.focus({ preventScroll: true })
  }

  useLayoutEffect(() => {
    if (!open || !trigger.current || !panel.current) return
    const anchor = trigger.current
    const element = panel.current
    const viewport = window.visualViewport
    const gap = spacing[2]

    // Local portal geometry only; the approved DropdownMenu remains unchanged.
    function place() {
      const rect = anchor.getBoundingClientRect()
      const leftEdge = (viewport?.offsetLeft ?? 0) + gap
      const topEdge = (viewport?.offsetTop ?? 0) + gap
      const width = (viewport?.width ?? document.documentElement.clientWidth) - gap * 2
      const height = (viewport?.height ?? window.innerHeight) - gap * 2
      element.style.setProperty('--sp-max-width', Math.max(0, width) + 'px')
      const below = Math.max(0, topEdge + height - rect.bottom - gap)
      const above = Math.max(0, rect.top - gap - topEdge)
      const upwards = element.scrollHeight + 2 > below && above > below
      element.style.setProperty('--sp-max-height', (upwards ? above : below) + 'px')
      const box = element.getBoundingClientRect()
      const x = Math.max(leftEdge, Math.min(rect.left, leftEdge + width - box.width))
      const y = Math.max(topEdge, Math.min(upwards ? rect.top - gap - box.height : rect.bottom + gap, topEdge + height - box.height))
      element.style.setProperty('--sp-left', x + 'px')
      element.style.setProperty('--sp-top', y + 'px')
      element.style.setProperty('--sp-visibility', 'visible')
    }

    place()
    dismiss.current?.focus({ preventScroll: true })
    const observer = new ResizeObserver(place)
    observer.observe(element)
    observer.observe(anchor)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    viewport?.addEventListener('resize', place)
    viewport?.addEventListener('scroll', place)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
      viewport?.removeEventListener('resize', place)
      viewport?.removeEventListener('scroll', place)
      // Also restore focus when a child (for example Hotovo) closes the panel.
      const active = document.activeElement
      if (anchor.isConnected && (containsPanelContent(element, active) || active === document.body)) anchor.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const isOutside = (target: Node) => !containsPanelContent(panel.current, target) && !trigger.current?.contains(target)
    const outside = (event: PointerEvent) => {
      if (isOutside(event.target as Node)) {
        onOpenChange(false)
        trigger.current?.focus({ preventScroll: true })
      }
    }
    const focusOutside = (event: FocusEvent) => {
      // A non-modal panel lets focus move elsewhere without pulling it back.
      if (isOutside(event.target as Node)) onOpenChange(false)
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', focusOutside)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', focusOutside)
    }
  }, [open, onOpenChange])

  return <>
    <button ref={trigger} type="button" className="settings-popover-button" style={variables}
      aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? uid + '-panel' : undefined}
      onClick={() => { if (open) close(); else onOpenChange(true) }}>
      <AxoIcon name="settings" size={18} />{triggerLabel}
    </button>
    {open && createPortal(<div ref={panel} className="settings-popover" style={variables} id={uid + '-panel'}
      role="dialog" aria-labelledby={uid + '-title'} aria-describedby={description ? uid + '-description' : undefined}
      onKeyDown={event => {
        // A nested Select consumes its own Escape before the panel handles it.
        if (event.defaultPrevented) return
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close() }
        else if (event.key === 'Tab') {
          const controls = Array.from(panel.current?.querySelectorAll<HTMLElement>('button, input, textarea, select, a[href], [tabindex]') ?? [])
            .filter(control => control.tabIndex >= 0 && !control.matches(':disabled') && control.getClientRects().length > 0)
          const active = document.activeElement
          if (event.shiftKey && active === controls[0]) { event.preventDefault(); close() }
          else if (!event.shiftKey && active === controls[controls.length - 1]) close()
        }
      }}>
      <header className="settings-popover-header">
        <div><h2 id={uid + '-title'}>{title}</h2>{description && <p id={uid + '-description'}>{description}</p>}</div>
        <button ref={dismiss} type="button" className="settings-popover-button" data-icon="true" aria-label="Zavřít panel" onClick={close}><AxoIcon name="close" size={18} /></button>
      </header>
      {children}
    </div>, document.body)}
  </>
}
