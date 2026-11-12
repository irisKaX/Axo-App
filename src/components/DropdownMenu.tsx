import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { AxoIcon, type AxoIconName } from './AxoIcon'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { controls, radius, spacing } from '../design-system/foundations/spacing'
import { fontFamilies, typography } from '../design-system/foundations/typography'
import './dropdown-menu.css'

export interface DropdownMenuItem {
  id: string
  label: string
  icon?: AxoIconName
  separatorBefore?: boolean
  disabled?: boolean
  danger?: boolean
  checked?: boolean
}

interface DropdownMenuProps {
  theme: ThemeName
  trigger: 'icon' | 'text'
  triggerLabel?: string
  items: readonly DropdownMenuItem[]
  onAction: (id: string) => void
}

export function DropdownMenu({ theme, trigger, triggerLabel = 'Možnosti', items, onAction }: DropdownMenuProps) {
  const uid = useId()
  const [open, setOpen] = useState(false)
  const anchor = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const initialFocus = useRef<'first' | 'last'>('first')
  const colors = colorTokens.semantic[theme]
  const states = colorTokens.interaction[theme]
  const variables = {
    '--dm-surface': colors.surface.raised,
    '--dm-trigger-surface': colors.surface.default,
    '--dm-border': colors.border.default,
    '--dm-text': colors.text.primary,
    '--dm-hover': states.hover.background,
    '--dm-pressed': states.pressed.background,
    '--dm-selected': states.selected.background,
    '--dm-accent': states.selected.indicator,
    '--dm-disabled': states.disabled.text,
    '--dm-error': colorTokens.status[theme].error.foreground,
    '--dm-focus': states.focus.ring,
    '--dm-radius': radius.md + 'px',
    '--dm-item-radius': radius.sm + 'px',
    '--dm-pill': radius.pill + 'px',
    '--dm-padding': spacing[2] + 'px',
    '--dm-gap': spacing[1] + 'px',
    '--dm-item-padding': spacing[3] + 'px',
    '--dm-trigger-padding': spacing[4] + 'px',
    '--dm-target': controls.minTouchTarget + 'px',
    '--dm-trigger-size': controls.default.height + 'px',
    '--dm-font': fontFamilies.ui,
    '--dm-font-size': typography.bodySm.size + 'px',
    '--dm-font-leading': typography.bodySm.lineHeight,
    '--dm-font-weight': typography.label.weight,
  } as CSSProperties

  const enabledButtons = () => Array.from(menu.current?.querySelectorAll<HTMLButtonElement>('button[role^="menuitem"]:not(:disabled)') ?? [])
  const close = () => { setOpen(false); anchor.current?.focus({ preventScroll: true }) }

  useLayoutEffect(() => {
    if (!open || !anchor.current || !menu.current) return
    const triggerElement = anchor.current
    const menuElement = menu.current
    const viewport = window.visualViewport
    const edge = spacing[2]

    function place() {
      const rect = triggerElement.getBoundingClientRect()
      const minX = (viewport?.offsetLeft ?? 0) + edge
      const minY = (viewport?.offsetTop ?? 0) + edge
      const width = viewport?.width ?? document.documentElement.clientWidth
      const height = viewport?.height ?? window.innerHeight
      const maxX = minX + width - edge * 2
      const maxY = minY + height - edge * 2
      menuElement.style.setProperty('--dm-max-width', Math.max(0, width - edge * 2) + 'px')
      menuElement.style.setProperty('--dm-max-height', Math.max(0, height - edge * 2) + 'px')
      const naturalHeight = menuElement.scrollHeight + 2
      const below = Math.max(0, maxY - rect.bottom - edge)
      const above = Math.max(0, rect.top - edge - minY)
      const upwards = naturalHeight > below && above > below
      menuElement.style.setProperty('--dm-max-height', (upwards ? above : below) + 'px')
      const box = menuElement.getBoundingClientRect()
      const left = Math.max(minX, Math.min(rect.left, maxX - box.width))
      const top = Math.max(minY, Math.min(upwards ? rect.top - edge - box.height : rect.bottom + edge, maxY - box.height))
      menuElement.style.setProperty('--dm-left', left + 'px')
      menuElement.style.setProperty('--dm-top', top + 'px')
      menuElement.style.setProperty('--dm-visibility', 'visible')
    }

    place()
    const buttons = enabledButtons()
    const first = initialFocus.current === 'last' ? buttons[buttons.length - 1] : buttons[0]
    const focusTarget = first ?? menuElement
    focusTarget.focus({ preventScroll: true })
    first?.scrollIntoView({ block: 'nearest' })
    const outside = (event: PointerEvent) => {
      const target = event.target as Node
      if (!menuElement.contains(target) && !triggerElement.contains(target)) close()
    }
    const observer = new ResizeObserver(place)
    observer.observe(menuElement)
    observer.observe(triggerElement)
    document.addEventListener('pointerdown', outside)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    viewport?.addEventListener('resize', place)
    viewport?.addEventListener('scroll', place)
    return () => {
      observer.disconnect()
      document.removeEventListener('pointerdown', outside)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
      viewport?.removeEventListener('resize', place)
      viewport?.removeEventListener('scroll', place)
    }
  }, [open])

  function menuKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close() }
    else if (event.key === 'Tab') close()
    else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      const buttons = enabledButtons()
      if (!buttons.length) return
      const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 :
        (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length
      buttons[next]?.focus()
    }
  }

  return <>
    <button type="button" className="dropdown-menu-trigger" data-trigger={trigger} ref={anchor} id={uid + '-trigger'} style={variables}
      aria-label={triggerLabel} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? uid + '-menu' : undefined}
      onClick={() => { if (open) close(); else { initialFocus.current = 'first'; setOpen(true) } }}
      onKeyDown={event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          initialFocus.current = event.key === 'ArrowUp' ? 'last' : 'first'
          if (open) {
            const buttons = enabledButtons()
            const next = event.key === 'ArrowUp' ? buttons[buttons.length - 1] : buttons[0]
            next?.focus()
          } else setOpen(true)
        } else if (event.key === 'Escape' && open) { event.preventDefault(); close() }
      }}>
      {trigger === 'icon' ? <AxoIcon name="more-horizontal" size={18} /> : <>{triggerLabel}<AxoIcon name="chevron-down" size={18} /></>}
    </button>
    {open && createPortal(<div className="dropdown-menu" ref={menu} id={uid + '-menu'} role="menu" tabIndex={-1}
      aria-labelledby={uid + '-trigger'} aria-orientation="vertical" style={variables} onKeyDown={menuKey}>
      {items.map(item => <div className="dropdown-menu-entry" role="none" key={item.id}>
        {item.separatorBefore && <div className="dropdown-menu-separator" role="separator" />}
        <button type="button" className="dropdown-menu-item" role={item.checked === undefined ? 'menuitem' : 'menuitemcheckbox'}
          aria-checked={item.checked} aria-disabled={item.disabled || undefined} disabled={item.disabled} data-danger={item.danger || undefined} tabIndex={-1}
          onClick={() => { if (!item.disabled) { close(); onAction(item.id) } }}>
          {item.icon && <AxoIcon name={item.icon} size={18} />}<span className="dropdown-menu-label">{item.label}</span>
          {item.checked && <AxoIcon className="dropdown-menu-check" name="check" size={16} />}
        </button>
      </div>)}
    </div>, document.body)}
  </>
}
