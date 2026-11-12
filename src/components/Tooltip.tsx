import { cloneElement, useEffect, useId, useLayoutEffect, useRef, useState, type AriaAttributes, type CSSProperties, type ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { radius, spacing } from '../design-system/foundations/spacing'
import { fontFamilies, typography } from '../design-system/foundations/typography'
import './tooltip.css'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
type TooltipControlProps = AriaAttributes & { disabled?: boolean }

interface TooltipProps {
  theme: ThemeName
  text: string
  placement?: TooltipPlacement
  children: ReactElement<TooltipControlProps>
}

export function Tooltip({ theme, text, placement = 'top', children }: TooltipProps) {
  const uid = useId()
  const anchor = useRef<HTMLSpanElement>(null)
  const tooltip = useRef<HTMLDivElement>(null)
  const hovered = useRef(false)
  const focused = useRef(false)
  const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [requested, setRequested] = useState(false)
  const disabled = children.props.disabled || children.props['aria-disabled'] === true || children.props['aria-disabled'] === 'true'
  const open = requested && !disabled && Boolean(text.trim())
  const colors = colorTokens.semantic[theme]
  const variables = {
    '--tt-surface': colors.surface.raised,
    '--tt-border': colors.border.default,
    '--tt-text': colors.text.primary,
    '--tt-radius': radius.sm + 'px',
    '--tt-padding-y': spacing[2] + 'px',
    '--tt-padding-x': spacing[3] + 'px',
    '--tt-font': fontFamilies.ui,
    '--tt-font-size': typography.caption.size + 'px',
    '--tt-font-leading': typography.caption.lineHeight,
    '--tt-font-weight': typography.caption.weight,
  } as CSSProperties

  function cancelHoverDelay() { clearTimeout(showTimer.current) }

  useLayoutEffect(() => {
    if (!open || !anchor.current || !tooltip.current) return
    const trigger = anchor.current
    const element = tooltip.current
    const viewport = window.visualViewport
    const gap = spacing[2]

    function place() {
      const rect = trigger.getBoundingClientRect()
      const minX = (viewport?.offsetLeft ?? 0) + gap
      const minY = (viewport?.offsetTop ?? 0) + gap
      const maxX = minX + (viewport?.width ?? document.documentElement.clientWidth) - gap * 2
      const maxY = minY + (viewport?.height ?? window.innerHeight) - gap * 2
      element.style.setProperty('--tt-max-width', Math.max(0, maxX - minX) + 'px')
      element.style.setProperty('--tt-max-height', Math.max(0, maxY - minY) + 'px')
      const { width, height } = element.getBoundingClientRect()
      const room = { top: rect.top - minY - gap, bottom: maxY - rect.bottom - gap, left: rect.left - minX - gap, right: maxX - rect.right - gap }
      const opposite: Record<TooltipPlacement, TooltipPlacement> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }
      const choices: TooltipPlacement[] = [placement, opposite[placement], 'top', 'bottom', 'right', 'left']
      const chosen = choices.find(side => room[side] >= (side === 'top' || side === 'bottom' ? height : width))
        ?? (room.top >= room.bottom ? 'top' : 'bottom')
      let x = rect.left + (rect.width - width) / 2
      let y = rect.top + (rect.height - height) / 2
      if (chosen === 'top') y = rect.top - gap - height
      else if (chosen === 'bottom') y = rect.bottom + gap
      else if (chosen === 'left') x = rect.left - gap - width
      else x = rect.right + gap
      element.style.setProperty('--tt-left', Math.max(minX, Math.min(x, maxX - width)) + 'px')
      element.style.setProperty('--tt-top', Math.max(minY, Math.min(y, maxY - height)) + 'px')
      element.style.setProperty('--tt-visibility', rect.bottom < minY || rect.top > maxY || rect.right < minX || rect.left > maxX ? 'hidden' : 'visible')
      element.dataset.placement = chosen
    }

    place()
    const observer = new ResizeObserver(place)
    observer.observe(trigger)
    observer.observe(element)
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
    }
  }, [open, placement, text])

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { clearTimeout(showTimer.current); setRequested(false) }
    }
    document.addEventListener('keydown', escape, true)
    return () => {
      clearTimeout(showTimer.current)
      document.removeEventListener('keydown', escape, true)
    }
  }, [])

  const describedBy = [children.props['aria-describedby'], open ? uid : undefined].filter(Boolean).join(' ') || undefined
  return <>
    <span className="axo-tooltip-anchor" ref={anchor}
      onPointerEnter={event => {
        if (event.pointerType !== 'touch') {
          hovered.current = true
          cancelHoverDelay()
          // Ignore brief pointer crossings; keyboard focus stays immediate.
          showTimer.current = setTimeout(() => setRequested(true), 80)
        }
      }}
      onPointerLeave={() => { hovered.current = false; cancelHoverDelay(); if (!focused.current) setRequested(false) }}
      onFocusCapture={() => { focused.current = true; cancelHoverDelay(); setRequested(true) }}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) { focused.current = false; if (!hovered.current) setRequested(false) }
      }}>
      {cloneElement(children, { 'aria-describedby': describedBy })}
    </span>
    {open && createPortal(<div ref={tooltip} id={uid} role="tooltip" className="axo-tooltip" style={variables}>{text}</div>, document.body)}
  </>
}
