import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { AxoIcon, type AxoIconName } from '../components/AxoIcon'
import { SettingsPopover } from '../components/SettingsPopover'
import { WidgetFoundation } from '../widgets/WidgetFoundation'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { controls, radiusCssVariables, spacing } from '../design-system/foundations/spacing'
import { fontFamilies, typography } from '../design-system/foundations/typography'
import DarkLightSwitchV2 from './forms/DarkLightSwitchV2'
import './forms/forms.css'
import './dashboard.css'

const tools = {
  qr: { label: 'QR generátor', toolCode: 'QR', title: 'QR generátor.', tagline: 'QR kódy snadno.', description: 'Vytvářejte QR kódy pro webové adresy.' },
  phrase: { label: 'Find Phrase', toolCode: 'FIND PHRASE', title: 'Find Phrase.', tagline: 'Hledání na webu.', description: 'Vyhledejte zvolenou frázi v obsahu webové stránky.' },
  media: { label: 'Media Tools', toolCode: 'MEDIA', title: 'Media Tools.', tagline: 'Práce s obrázky.', description: 'Stahujte a převádějte obrázky z webových stránek.' },
  screenshot: { label: 'Screenshot', toolCode: 'SCREENSHOT', title: 'Screenshot.', tagline: 'Snímek stránky.', description: 'Pořiďte snímek vybrané webové stránky.' },
  notebook: { label: 'Notebook', toolCode: 'NOTEBOOK', title: 'Notebook.', tagline: 'Poznámky a úkoly.', description: 'Zapisujte poznámky, úkoly a důležité termíny.' },
  pdf: { label: 'PDF Tools', toolCode: 'PDF', title: 'PDF Tools.', tagline: 'Dokumenty přehledně.', description: 'Připravte si přehled práce s PDF dokumenty.' },
  metadata: { label: 'Metadata Check', toolCode: 'METADATA', title: 'Metadata Check.', tagline: 'Kontrola metadat.', description: 'Zkontrolujte titulek a popis vybrané webové stránky.' },
  converter: { label: 'Konvertor obrázků', toolCode: 'IMAGES', title: 'Konvertor obrázků.', tagline: 'Obrázky ve formátu.', description: 'Zvolte formát obrázků pro další použití.' },
} as const
type ToolId = keyof typeof tools
const toolIcons: Record<ToolId, AxoIconName> = {
  qr: 'qr-code', phrase: 'search', media: 'image', screenshot: 'tabs',
  notebook: 'pencil', pdf: 'file-text', metadata: 'info', converter: 'refresh',
}
const toolSlots = [
  { id: '02', size: 'small' }, { id: '03', size: 'small' },
  { id: '04', size: 'small' }, { id: '05', size: 'small' }, { id: '06', size: 'large' },
] as const
type ToolSlot = typeof toolSlots[number]['id']
type Assignments = Record<ToolSlot, ToolId>
const defaultAssignments: Assignments = { '02': 'qr', '03': 'phrase', '04': 'media', '05': 'screenshot', '06': 'notebook' }
type ExitTarget = 'dashboard' | 'catalog'
type DragPreview = { source: ToolSlot; target: ToolSlot | null; x: number; y: number }
type DragGesture = { source: ToolSlot; pointerId: number; startX: number; startY: number; started: boolean; element: HTMLButtonElement }

function dropTargetAt(x: number, y: number, source: ToolSlot): ToolSlot | null {
  const id = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-tool-slot]')?.dataset.toolSlot
  return toolSlots.find(slot => slot.id === id && slot.id !== source)?.id ?? null
}

export default function DashboardV2({ theme, onThemeChange, onBack }: { theme: ThemeName; onThemeChange: (theme: ThemeName) => void; onBack: () => void }) {
  const [savedAssignments, setSavedAssignments] = useState<Assignments>(defaultAssignments)
  const [draftAssignments, setDraftAssignments] = useState<Assignments>({ ...defaultAssignments })
  const [notice, setNotice] = useState('')
  const [editing, setEditing] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<ToolSlot | null>(null)
  const [replacing, setReplacing] = useState(false)
  const replacementAction = useRef<HTMLDivElement>(null)
  const [swapSource, setSwapSource] = useState<ToolSlot | null>(null)
  const [drag, setDrag] = useState<DragPreview | null>(null)
  const ghostPreview = useRef<HTMLDivElement>(null)
  const gesture = useRef<DragGesture | null>(null)
  const suppressClick = useRef(false)
  const [pendingExit, setPendingExit] = useState<ExitTarget | null>(null)
  const discardDialog = useRef<HTMLDialogElement>(null)
  const editToggle = useRef<HTMLButtonElement>(null)
  const wasEditing = useRef(false)
  const assignments = editing ? draftAssignments : savedAssignments
  const dirty = toolSlots.some(slot => draftAssignments[slot.id] !== savedAssignments[slot.id])
  const dragging = drag !== null
  const colors = colorTokens.semantic[theme]
  const states = colorTokens.interaction[theme]
  const dark = colorTokens.semantic.dark
  const variables = {
    ...radiusCssVariables,
    '--v2-dashboard-gap': spacing[4] + 'px',
    '--v2-dashboard-small-gap': spacing[3] + 'px',
    '--v2-dashboard-copy-gap': spacing[2] + 'px',
    '--v2-dashboard-edit-border': colors.border.default,
    '--v2-dashboard-edit-accent': states.selected.indicator,
    '--v2-dashboard-raised': colors.surface.raised,
    '--v2-dashboard-large-inset': spacing[5] + 'px',
    '--v2-dashboard-handle-size': controls.iconCompact + 'px',
    '--v2-dashboard-handle-muted': colors.icon.muted,
    '--v2-dashboard-handle-hover': colors.icon.default,
    '--v2-dashboard-preview-muted': colors.text.secondary,
    '--v2-drag-success': colorTokens.status[theme].success.foreground,
    '--v2-drag-error': colorTokens.status[theme].error.foreground,
    '--v2-office-padding': spacing[5] + 'px',
    '--v2-office-backdrop': colorTokens.effects.dark.backdrop,
    '--v2-office-surface': dark.surface.canvas,
    '--v2-office-border': dark.border.default,
    '--v2-office-text': dark.text.onBrand,
    '--v2-office-muted': dark.text.secondary,
    '--v2-office-heading-size': typography.h3.size + 'px',
    '--v2-office-heading-weight': typography.h3.weight,
    '--v2-office-heading-leading': typography.h3.lineHeight,
    '--v2-office-body-size': typography.caption.size + 'px',
    // Existing WidgetLaunchButton reads these legacy context bindings.
    '--text': colors.text.primary,
    '--surface': colors.surface.default,
    '--brand': colorTokens.primitives.brand.irisPurple,
    '--focus-ring': colorTokens.interaction[theme].focus.ring,
    '--v2f-radius-pill': radiusCssVariables['--radius-pill'],
    '--v2f-focus': colorTokens.interaction[theme].focus.ring,
    // Reuse the approved popover action button in the edit controls.
    '--sp-control-height': controls.default.height + 'px',
    '--sp-gap': spacing[4] + 'px',
    '--sp-small-gap': spacing[2] + 'px',
    '--sp-border': colors.border.default,
    '--sp-pill': radiusCssVariables['--radius-pill'],
    '--sp-control-surface': colors.surface.default,
    '--sp-text': colors.text.primary,
    '--sp-hover': states.hover.background,
    '--sp-pressed': states.pressed.background,
    '--sp-focus': states.focus.ring,
    '--sp-font': fontFamilies.ui,
    '--sp-body-size': typography.bodySm.size + 'px',
    '--sp-button-weight': typography.button.weight,
  } as CSSProperties

  const pickerVariables = {
    '--v2-dashboard-picker-muted': colors.text.secondary,
    '--v2-dashboard-picker-accent': states.selected.indicator,
    '--v2-dashboard-picker-selected': states.selected.background,
    '--v2-dashboard-picker-radius': radiusCssVariables['--radius-md'],
  } as CSSProperties

  function assignTool(slot: ToolSlot, next: string) {
    if (!Object.prototype.hasOwnProperty.call(tools, next)) return
    const tool = next as ToolId
    if (assignments[slot] === tool) return
    setDraftAssignments(current => {
      const previous = current[slot]
      if (previous === tool) return current
      const occupied = toolSlots.find(other => other.id !== slot && current[other.id] === tool)
      return occupied ? { ...current, [slot]: tool, [occupied.id]: previous } : { ...current, [slot]: tool }
    })
    setNotice('Slot ' + slot + ': ' + tools[tool].label + '.')
  }

  function swapSlots(source: ToolSlot, target: ToolSlot) {
    if (source === target) return
    setDraftAssignments(current => ({ ...current, [source]: current[target], [target]: current[source] }))
    setSwapSource(null)
    setNotice('Obsah slotů ' + source + ' a ' + target + ' byl prohozen.')
  }

  function selectWidget(slot: ToolSlot) {
    if (replacing) {
      // Keep the existing popover's toolbar anchor in view before opening it.
      replacementAction.current?.querySelector('button')?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
      setSelectedSlot(slot)
      return
    }
    setSelectedSlot(null)
    if (swapSource && swapSource !== slot) swapSlots(swapSource, slot)
    else {
      setSwapSource(swapSource === slot ? null : slot)
      setNotice(swapSource === slot ? 'Výběr zdroje zrušen.' : 'Zdroj: ' + tools[assignments[slot]].label + '. Vyber cílový widget.')
    }
  }

  function endReplacement() {
    setSelectedSlot(null)
    setReplacing(false)
  }

  function startReplacement() {
    stopDrag()
    suppressClick.current = false
    setSwapSource(null)
    setSelectedSlot(null)
    setReplacing(true)
    setNotice('Vyber cílový Tool Widget pro nahrazení nástroje. Escape výběr zruší.')
  }

  function stopDrag() {
    const current = gesture.current
    gesture.current = null
    if (current?.started) suppressClick.current = true
    if (current?.element.hasPointerCapture(current.pointerId)) current.element.releasePointerCapture(current.pointerId)
    setDrag(null)
  }

  function beginDrag(event: ReactPointerEvent<HTMLButtonElement>, source: ToolSlot) {
    if (!editing || replacing || event.button !== 0 || !event.isPrimary) return
    suppressClick.current = false
    setSelectedSlot(null)
    gesture.current = { source, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, started: false, element: event.currentTarget }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = gesture.current
    if (!current || current.pointerId !== event.pointerId) return
    if (!current.started && Math.hypot(event.clientX - current.startX, event.clientY - current.startY) < 6) return
    event.preventDefault()
    current.started = true
    setSwapSource(null)
    setDrag({ source: current.source, target: dropTargetAt(event.clientX, event.clientY, current.source), x: event.clientX, y: event.clientY })
  }

  function finishDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = gesture.current
    if (!current || current.pointerId !== event.pointerId) return
    if (current.started) {
      suppressClick.current = true
      const target = dropTargetAt(event.clientX, event.clientY, current.source)
      if (target) swapSlots(current.source, target)
    }
    stopDrag()
  }

  function enterEditor() {
    setDraftAssignments({ ...savedAssignments })
    setSwapSource(null)
    endReplacement()
    setEditing(true)
    setNotice('')
  }

  function finishEditor(save: boolean) {
    stopDrag()
    setSwapSource(null)
    endReplacement()
    if (save) setSavedAssignments({ ...draftAssignments })
    else setDraftAssignments({ ...savedAssignments })
    setEditing(false)
    setNotice(save ? 'Rozmístění potvrzeno v lokálním náhledu.' : 'Pracovní změny zrušeny.')
  }

  function requestExit(target: ExitTarget) {
    if (editing) { stopDrag(); setSwapSource(null); endReplacement() }
    if (editing && dirty) { setPendingExit(target); return }
    if (editing) finishEditor(false)
    if (target === 'catalog') onBack()
  }

  useEffect(() => {
    const dialog = discardDialog.current
    if (!dialog) return
    if (pendingExit && !dialog.open) dialog.showModal()
    else if (!pendingExit && dialog.open) dialog.close()
  }, [pendingExit])

  useEffect(() => {
    if (wasEditing.current && !editing) editToggle.current?.focus({ preventScroll: true })
    wasEditing.current = editing
  }, [editing])

  useEffect(() => {
    if (replacing && selectedSlot === null) replacementAction.current?.closest('.v2-dashboard')?.querySelector<HTMLButtonElement>('[data-tool-slot] .v2-dashboard-drag-handle')?.focus()
  }, [replacing, selectedSlot])

  useEffect(() => {
    if (!dragging) return
    const reposition = () => setDrag(current => current ? { ...current, target: dropTargetAt(current.x, current.y, current.source) } : null)
    window.addEventListener('scroll', reposition, true)
    window.addEventListener('resize', reposition)
    window.addEventListener('blur', stopDrag)
    return () => {
      window.removeEventListener('scroll', reposition, true)
      window.removeEventListener('resize', reposition)
      window.removeEventListener('blur', stopDrag)
    }
  }, [dragging])

  useEffect(() => () => {
    const current = gesture.current
    gesture.current = null
    if (current?.element.hasPointerCapture(current.pointerId)) current.element.releasePointerCapture(current.pointerId)
  }, [])

  const previewTool = drag ? tools[assignments[drag.source]] : null
  const replacementSlot = toolSlots.find(slot => slot.id === selectedSlot)

  useLayoutEffect(() => {
    const element = ghostPreview.current
    if (!drag || !element) return
    const { width, height } = element.getBoundingClientRect()
    const viewport = window.visualViewport
    const edge = spacing[2]
    const minX = (viewport?.offsetLeft ?? 0) + edge
    const minY = (viewport?.offsetTop ?? 0) + edge
    const maxX = minX + (viewport?.width ?? document.documentElement.clientWidth) - edge * 2
    const maxY = minY + (viewport?.height ?? window.innerHeight) - edge * 2
    element.style.setProperty('--v2-drag-left', Math.max(minX, Math.min(drag.x + spacing[4], maxX - width)) + 'px')
    element.style.setProperty('--v2-drag-top', Math.max(minY, Math.min(drag.y + spacing[4], maxY - height)) + 'px')
  }, [drag, theme])

  return <div className="v2-dashboard" style={variables} onKeyDown={event => {
    if (event.key !== 'Escape' || event.defaultPrevented || pendingExit) return
    if (gesture.current) { event.preventDefault(); suppressClick.current = true; stopDrag() }
    else if (replacing) { event.preventDefault(); endReplacement(); replacementAction.current?.querySelector<HTMLButtonElement>('button')?.focus(); setNotice('Výběr cílového widgetu zrušen.') }
    else if (swapSource) { event.preventDefault(); setSwapSource(null); setNotice('Výběr zdroje zrušen.') }
    else if (editing) { event.preventDefault(); requestExit('dashboard') }
  }}>
    <header className="v2-dashboard-header">
      <div className="v2-dashboard-title"><button type="button" className="v2-button v2-button--ghost v2-button--compact" onClick={() => requestExit('catalog')}><span className="v2-button__content">Zpět do katalogu</span></button><h1>Dashboard Layout</h1></div>
      <div className="v2-dashboard-actions">
        <button ref={editToggle} type="button" className="settings-popover-button" aria-pressed={editing} onClick={() => editing ? requestExit('dashboard') : enterEditor()}><span className="v2-dashboard-mode-label">
          <span aria-hidden={editing}>Upravit dashboard</span><span aria-hidden={!editing}>Ukončit úpravy</span>
        </span></button>
        <DarkLightSwitchV2 theme={theme} onThemeChange={onThemeChange} />
      </div>
    </header>
    <main className="v2-dashboard-grid" aria-label="Dashboard · šest pevných slotů">
      <div className="v2-dashboard-cell" data-size="large">
        <section className="v2-dashboard-office" aria-labelledby="v2-office-title">
          <div className="v2-dashboard-office-copy"><h2 id="v2-office-title">Axolotl Office</h2><p>Kancelář s maskotem.</p></div>
          <div className="v2-dashboard-office-placeholder"><AxoIcon name="workspace" size={32} /><span>Vizuální placeholder</span></div>
        </section>
      </div>
      {toolSlots.map(slot => {
        const tool = tools[assignments[slot.id]]
        return <div className="v2-dashboard-cell" data-size={slot.size} data-tool-slot={slot.id} data-editing={editing || undefined}
          data-drop-target={drag?.target === slot.id || undefined} data-swap-source={swapSource === slot.id || undefined} data-replace-target={replacing || undefined} key={slot.id}
          onClick={event => {
            if (!editing || !event.currentTarget.contains(event.target as Node)) return
            if (!(event.target as Element).closest('button')) selectWidget(slot.id)
          }}>
          <WidgetFoundation dashboard theme={theme} size={slot.size} toolCode={tool.toolCode} title={tool.title} tagline={tool.tagline} description={tool.description}
            launchLabel={'Otevřít nástroj: ' + tool.label} onOpenTool={editing ? undefined : () => {
              setNotice(tool.label + ' · pouze vizuální ukázka, pracovní plocha zůstává prázdná.')
            }} />
          {editing && <button type="button" className="v2-dashboard-drag-handle" aria-label={replacing ? 'Nahradit nástroj ve slotu ' + slot.id + ': ' + tool.label : 'Přesunout ' + tool.label + ', slot ' + slot.id + '. Vyber zdroj a potom cíl.'}
              aria-haspopup={replacing ? 'dialog' : undefined} aria-pressed={swapSource === slot.id} onPointerDown={event => beginDrag(event, slot.id)} onPointerMove={moveDrag} onPointerUp={finishDrag}
              onPointerCancel={stopDrag} onLostPointerCapture={() => { if (gesture.current) stopDrag() }} onDragStart={event => event.preventDefault()}
              onClick={event => { if (!replacing && event.detail > 0 && suppressClick.current) return; selectWidget(slot.id) }}>
              <span className="v2-dashboard-grip" aria-hidden="true"><AxoIcon name="more-horizontal" size={18} /><AxoIcon name="more-horizontal" size={18} /></span>
            </button>}
        </div>
      })}
    </main>
    <footer className="v2-dashboard-footer">
      {editing && <div className="v2-dashboard-edit-actions">
        <button type="button" className="settings-popover-button" onClick={() => finishEditor(false)}>Zrušit</button>
        <button type="button" className="settings-popover-button" onClick={() => {
          stopDrag(); setSwapSource(null); endReplacement(); setDraftAssignments({ ...defaultAssignments }); setNotice('Výchozí rozmístění obnoveno v pracovní konfiguraci.')
        }}>Reset</button>
        <div className="v2-dashboard-replacement-action" ref={replacementAction} role="group" aria-label={replacing ? 'Výběr cílového widgetu aktivní' : 'Nahrazení nástroje'}>
          <SettingsPopover theme={theme} title="Vybrat nástroj" description="Vyber nástroj, který chceš zobrazovat v tomto widgetu."
            triggerLabel="Nahradit nástroj" open={selectedSlot !== null} onOpenChange={open => {
              if (open && !replacing) startReplacement()
              else { endReplacement(); setNotice('Nahrazení nástroje zrušeno.') }
            }}>
            {replacementSlot && <div className="v2-dashboard-tool-picker" style={pickerVariables}>
              <p className="v2-dashboard-picker-slot">Slot {replacementSlot.id} / {replacementSlot.size === 'large' ? 'Large' : 'Small'}</p>
              <ul className="v2-dashboard-tool-list">{(Object.keys(tools) as ToolId[]).map(id => {
                const occupied = toolSlots.find(other => assignments[other.id] === id)
                const current = occupied?.id === replacementSlot.id
                const status = current ? 'Aktuální' : occupied ? 'Prohodit · Slot ' + occupied.id + ' / ' + (occupied.size === 'large' ? 'Large' : 'Small') : 'Přiřadit'
                return <li key={id}><button type="button" className="v2-dashboard-tool-option" aria-current={current ? 'true' : undefined} onClick={() => {
                  assignTool(replacementSlot.id, id)
                  endReplacement()
                  if (current) setNotice('Aktuální nástroj zůstává beze změny.')
                }}><AxoIcon name={toolIcons[id]} size={20} /><span><strong>{tools[id].label}</strong><span className="v2-dashboard-tool-status">{status}</span></span></button></li>
              })}</ul>
            </div>}
          </SettingsPopover>
        </div>
        <button type="button" className="v2-button v2-button--primary v2-button--compact" onClick={() => finishEditor(true)}><span className="v2-button__content">Uložit</span></button>
      </div>}
      <span>DESIGN PREVIEW</span>
    </footer>
    <span className="v2-dashboard-announcement" role="status" aria-live="polite" aria-atomic="true">{notice || (editing ? 'Táhni za úchyt nebo vyber zdroj a cíl.' : 'Nástroje lze měnit v režimu Upravit dashboard.')}</span>
    <dialog className="v2-dashboard-discard" ref={discardDialog} aria-labelledby="v2-dashboard-discard-title" aria-describedby="v2-dashboard-discard-description"
      onCancel={event => { event.preventDefault(); setPendingExit(null) }}>
      <h2 id="v2-dashboard-discard-title">Zahodit změny?</h2>
      <p id="v2-dashboard-discard-description">Vrátíš se k poslednímu uloženému rozmístění.</p>
      <div className="v2-dashboard-discard-actions">
        <button type="button" className="settings-popover-button" onClick={() => setPendingExit(null)}>Pokračovat v úpravách</button>
        <button type="button" className="v2-button v2-button--danger v2-button--compact" onClick={() => {
          const target = pendingExit
          setPendingExit(null)
          finishEditor(false)
          if (target === 'catalog') onBack()
        }}><span className="v2-button__content">Zahodit změny</span></button>
      </div>
    </dialog>
    {drag && previewTool && createPortal(<div className="v2-dashboard-drag-preview" ref={ghostPreview} aria-hidden="true" inert data-valid={Boolean(drag.target)}
      style={{ ...variables,
        '--v2-drag-left': drag.x + spacing[4] + 'px', '--v2-drag-top': drag.y + spacing[4] + 'px',
      } as CSSProperties}>
      <div className="v2-dashboard-drag-copy"><span>AXOLOTL / NÁSTROJ</span><strong>{previewTool.label}</strong></div>
      <span className="v2-dashboard-drag-dot" />
    </div>, document.body)}
  </div>
}
