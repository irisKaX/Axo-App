import { useId, useRef, useState, type CSSProperties } from 'react'
import { DropdownMenu, type DropdownMenuItem } from '../components/DropdownMenu'
import { SettingsPopover } from '../components/SettingsPopover'
import { Tooltip, type TooltipPlacement } from '../components/Tooltip'
import { AxoIcon } from '../components/AxoIcon'
import { FormSelect } from './forms/FormControlsV2'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { controls, radius, spacing } from '../design-system/foundations/spacing'
import { fontFamilies, typography } from '../design-system/foundations/typography'
import './navigation.css'

function MenuExample({ theme, trigger }: { theme: ThemeName; trigger: 'icon' | 'text' }) {
  const [pinned, setPinned] = useState(false)
  const [notice, setNotice] = useState('')
  const items: DropdownMenuItem[] = [
    { id: 'detail', label: 'Otevřít detail', icon: 'external-link' },
    { id: 'edit', label: 'Upravit', icon: 'pencil' },
    { id: 'duplicate', label: 'Duplikovat', icon: 'copy' },
    { id: 'pin', label: 'Připnout', icon: 'star', separatorBefore: true, checked: pinned },
    { id: 'disabled', label: 'Zakázaná akce', disabled: true },
    { id: 'delete', label: 'Odstranit', icon: 'trash', separatorBefore: true, danger: true },
  ]
  return <figure className="v2-navigation-example">
    <figcaption>{trigger === 'icon' ? 'A / Icon Trigger' : 'B / Text Trigger'}</figcaption>
    <div className="v2-navigation-stage"><DropdownMenu theme={theme} trigger={trigger} triggerLabel={trigger === 'icon' ? 'Možnosti karty' : 'Možnosti'} items={items}
      onAction={id => {
        if (id === 'pin') setPinned(current => !current)
        setNotice(id === 'pin' ? (pinned ? 'Ukázka: Připnutí zrušeno.' : 'Ukázka: Připnuto.') : 'Ukázka: ' + items.find(item => item.id === id)?.label + '.')
      }} /></div>
    <p className="v2-navigation-notice" role="status" aria-atomic="true">{notice}</p>
  </figure>
}

function SettingsExample({ theme }: { theme: ThemeName }) {
  const [open, setOpen] = useState(false)
  const [slot02, setSlot02] = useState('qr')
  const [slot03, setSlot03] = useState('phrase')
  const colors = colorTokens.semantic[theme]
  const field = colors.field
  const states = colorTokens.interaction[theme]
  // Bind the existing Select's public CSS variables without changing Forms V2.
  const selectVariables = {
    '--v2f-field-base-background': field.background,
    '--v2f-field-base-border': field.border,
    '--v2f-field-hover-background': field.hover.background,
    '--v2f-field-hover-border': field.hover.border,
    '--v2f-field-focus-background': field.focus.background,
    '--v2f-field-focus-border': field.focus.border,
    '--v2f-field-filled-background': field.filled.background,
    '--v2f-field-disabled-background': field.disabled.background,
    '--v2f-text': colors.text.primary,
    '--v2f-muted': colors.text.secondary,
    '--v2f-border': colors.border.default,
    '--v2f-raised': colors.surface.raised,
    '--v2f-hover': states.hover.background,
    '--v2f-pressed': states.pressed.background,
    '--v2f-selected': states.selected.background,
    '--v2f-focus': states.focus.ring,
    '--v2f-disabled-text': states.disabled.text,
    '--v2f-radius-lg': radius.lg + 'px',
    '--v2f-radius-sm': radius.sm + 'px',
    '--v2f-radius-pill': radius.pill + 'px',
    '--v2f-shadow': colorTokens.effects[theme].shadow,
  } as CSSProperties
  const options = [
    { value: 'qr', label: 'QR generátor' },
    { value: 'phrase', label: 'Find Phrase' },
    { value: 'media', label: 'Média' },
  ]
  return <div className="v2-navigation-stage">
    <SettingsPopover theme={theme} title="Nastavení widgetů" description="Vyber nástroj pro každý slot."
      triggerLabel="Nastavení widgetů" open={open} onOpenChange={setOpen}>
      <div className="v2-settings-fields" style={selectVariables}>
        <FormSelect label="Slot 02 · Small" options={options} value={slot02} onChange={setSlot02} />
        <FormSelect label="Slot 03 · Small" options={options} value={slot03} onChange={setSlot03} />
        <div className="v2-settings-footer"><button type="button" className="settings-popover-button" onClick={() => setOpen(false)}>Hotovo</button></div>
      </div>
    </SettingsPopover>
  </div>
}

function TooltipExamples({ theme }: { theme: ThemeName }) {
  const [placement, setPlacement] = useState<TooltipPlacement>('top')
  const colors = colorTokens.semantic[theme]
  const states = colorTokens.interaction[theme]
  const variables = {
    '--v2-tooltip-control-size': controls.iconDefault + 'px',
    '--v2-tooltip-surface': colors.surface.default,
    '--v2-tooltip-border': colors.border.default,
    '--v2-tooltip-text': colors.text.primary,
    '--v2-tooltip-hover': states.hover.background,
    '--v2-tooltip-selected': states.selected.background,
    '--v2-tooltip-indicator': states.selected.indicator,
    '--v2-tooltip-focus': states.focus.ring,
    '--v2-tooltip-pill': radius.pill + 'px',
  } as CSSProperties
  return <div className="v2-tooltip-gallery" style={variables}>
    <figure className="v2-navigation-example"><figcaption>A / Icon Tooltip</figcaption>
      <div className="v2-navigation-stage"><Tooltip theme={theme} text="Otevřít nástroj">
        <button type="button" className="v2-tooltip-control" aria-label="Otevřít nástroj"><AxoIcon name="external-link" size={18} /></button>
      </Tooltip></div>
    </figure>
    <figure className="v2-navigation-example"><figcaption>B / Long Text</figcaption>
      <div className="v2-navigation-stage"><Tooltip theme={theme} text="Otevřít nástroj: Metadata Check">
        <button type="button" className="v2-tooltip-control" aria-label="Otevřít nástroj: Metadata Check"><AxoIcon name="external-link" size={18} /></button>
      </Tooltip></div>
    </figure>
    <figure className="v2-navigation-example"><figcaption>C / Placement</figcaption>
      <div className="v2-navigation-stage"><Tooltip theme={theme} text="Otevřít nástroj" placement={placement}>
        <button type="button" className="v2-tooltip-control" aria-label="Otevřít nástroj"><AxoIcon name="external-link" size={18} /></button>
      </Tooltip></div>
      <fieldset className="v2-tooltip-positions"><legend>Pozice tooltipu</legend><div>
        {(['top', 'bottom', 'left', 'right'] as const).map(side => <button type="button" key={side} aria-pressed={placement === side} onClick={() => setPlacement(side)}>{side.charAt(0).toUpperCase() + side.slice(1)}</button>)}
      </div></fieldset>
    </figure>
  </div>
}

const tabOptions = [
  { label: 'Přehled', heading: 'Všechno na jednom místě.', description: 'Základní informace a aktuální stav projektu.' },
  { label: 'Soubory', heading: 'Prostor pro podklady.', description: 'Dokumenty, obrázky a další soubory projektu.' },
  { label: 'Aktivita', heading: 'Co je nového.', description: 'Poslední změny a přehled pracovních aktivit.' },
  { label: 'Archiv', heading: '', description: '', disabled: true },
]

function TabsExample({ variant, label }: { variant: 'underline' | 'accent'; label: string }) {
  const uid = useId()
  const [active, setActive] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  function moveFocus(key: string) {
    const enabled = tabOptions.flatMap((option, index) => option.disabled ? [] : [index])
    const current = enabled.indexOf(active)
    const next = key === 'Home' ? enabled[0] : key === 'End' ? enabled[enabled.length - 1]
      : enabled[(current + (key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length]
    setActive(next)
    buttons.current[next]?.focus()
  }

  return <figure className="v2-navigation-example">
    <figcaption id={uid + '-label'}>{label}</figcaption>
    <div className="v2-nav-tabs-example">
      <div className="v2-nav-tabs" data-variant={variant} role="tablist" aria-labelledby={uid + '-label'}>
        {tabOptions.map((option, index) => <button type="button" role="tab" key={option.label}
          ref={element => { buttons.current[index] = element }} id={uid + '-tab-' + index}
          aria-controls={uid + '-panel-' + index} aria-selected={active === index} disabled={option.disabled}
          tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
            if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
              event.preventDefault()
              moveFocus(event.key)
            }
          }}>{option.label}</button>)}
      </div>
      {tabOptions.map((option, index) => <div key={option.label} className="v2-nav-tab-panel" role="tabpanel"
        id={uid + '-panel-' + index} aria-labelledby={uid + '-tab-' + index} hidden={active !== index} tabIndex={0}>
        <h3>{option.heading}</h3><p>{option.description}</p>
      </div>)}
    </div>
  </figure>
}

function SegmentedExample({ compact = false }: { compact?: boolean }) {
  const uid = useId()
  const [active, setActive] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const options = compact ? ['Mřížka', 'Seznam'] : ['Mřížka', 'Seznam', 'Tabulka']

  return <figure className="v2-navigation-example">
    <figcaption id={uid + '-label'}>{compact ? 'B / Compact Switch' : 'A / Segmented Surface'}</figcaption>
    <div className="v2-nav-segment-example">
      <div className={compact ? 'v2-nav-compact' : 'v2-nav-segments'} role="radiogroup" aria-labelledby={uid + '-label'}
        aria-disabled={disabled} style={{ '--v2-nav-active-index': active } as CSSProperties}>
        {options.map((option, index) => <button type="button" role="radio" key={option}
          ref={element => { buttons.current[index] = element }} aria-checked={active === index}
          disabled={disabled} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
            event.preventDefault()
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
              : (index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + options.length) % options.length
            setActive(next)
            buttons.current[next]?.focus()
          }}>{option}</button>)}
      </div>
      <p className="v2-nav-choice-value" role="status">Aktivní zobrazení: <strong>{options[active]}</strong></p>
      <button type="button" className="v2-button v2-button--ghost v2-button--compact" aria-pressed={disabled}
        onClick={() => setDisabled(current => !current)}><span className="v2-button__content">{disabled ? 'Povolit ovládání' : 'Vyzkoušet Disabled'}</span></button>
    </div>
  </figure>
}

function PaginationArrow({ direction, disabled, onClick, showLabel }: {
  direction: 'previous' | 'next'; disabled: boolean; onClick: () => void; showLabel: boolean
}) {
  return <button type="button" className="v2-pagination-button v2-pagination-arrow" data-direction={direction}
    aria-label={direction === 'previous' ? 'Předchozí stránka' : 'Další stránka'} disabled={disabled} onClick={onClick}>
    <AxoIcon name="chevron-down" size={16} />
    {showLabel && <span>{direction === 'previous' ? 'Previous' : 'Next'}</span>}
  </button>
}

function PaginationExample({ variant, label, description }: {
  variant: 'numbered' | 'compact' | 'minimal'; label: string; description: string
}) {
  const uid = useId()
  const [page, setPage] = useState(3)
  const totalItems = 120
  const pageSize = 10
  const totalPages = Math.ceil(totalItems / pageSize)
  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(number =>
    number === 1 || number === totalPages || Math.abs(number - page) <= 1
    || (page <= 3 && number <= 5) || (page >= totalPages - 2 && number >= totalPages - 4),
  )
  const pageItems = visiblePages.flatMap<number | string>((number, index) => {
    const previous = visiblePages[index - 1] ?? 0
    return number - previous > 2 ? ['gap-' + number, number]
      : number - previous === 2 ? [number - 1, number] : [number]
  })

  return <figure className="v2-pagination-example">
    <figcaption><strong id={uid + '-label'}>{label}</strong><p>{description}</p></figcaption>
    <div className="v2-pagination-stage">
      <nav className="v2-pagination" data-variant={variant} aria-labelledby={uid + '-label'}>
        <PaginationArrow direction="previous" disabled={page === 1} onClick={() => setPage(current => Math.max(1, current - 1))} showLabel={variant === 'numbered'} />
        {variant === 'numbered' ? <ul className="v2-pagination-pages">
          {pageItems.map(item => <li key={item}>{typeof item === 'number' ?
            <button type="button" className="v2-pagination-button" aria-label={'Stránka ' + item}
              aria-current={page === item ? 'page' : undefined} onClick={() => setPage(item)}>{item}</button>
            : <span className="v2-pagination-ellipsis" aria-hidden="true">…</span>}</li>)}
        </ul> : <span className="v2-pagination-value" role="status" aria-atomic="true">
          {variant === 'compact' ? <><strong>{page}</strong><span aria-hidden="true"> / </span><span className="v2-pagination-sr-only"> z </span>{totalPages}</>
            : <><strong>{(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)}</strong> z {totalItems}</>}
        </span>}
        <PaginationArrow direction="next" disabled={page === totalPages} onClick={() => setPage(current => Math.min(totalPages, current + 1))} showLabel={variant === 'numbered'} />
      </nav>
    </div>
  </figure>
}

function PaginationExamples() {
  const variables = {
    '--v2-pagination-size': controls.compact.height + 'px',
    '--v2-pagination-radius': radius.sm + 'px',
    '--v2-pagination-gap': spacing[1] + 'px',
    '--v2-pagination-button-padding': spacing[3] + 'px',
  } as CSSProperties

  return <section className="v2-panel" style={variables}>
    <div className="v2-section-heading"><span className="v2-kicker">06 / PAGINATION</span><h2>Tři způsoby stránkování</h2><p>Schválené varianty A/B/C. Každá ukázka má vlastní stav: 120 položek, 10 na stránku. Ovládání klávesami Tab, Enter a mezerník.</p></div>
    <div className="v2-pagination-gallery">
      <PaginationExample variant="numbered" label="A / Numbered Pagination" description="Přímý výběr stránky s dynamickou výpustkou pro delší rozsahy." />
      <PaginationExample variant="compact" label="B / Compact Pagination" description="Aktuální stránka a celkový počet pro menší panely a nástrojové obrazovky." />
      <PaginationExample variant="minimal" label="C / Minimal Pagination" description="Rozsah položek pro tabulky, výsledky kontrol a seznamy souborů." />
    </div>
  </section>
}

function BreadcrumbsExample({ theme, collapsed = false }: { theme: ThemeName; collapsed?: boolean }) {
  const uid = useId()
  const levels = collapsed ? ['Workspace', 'Projekty', 'Webové projekty', 'Axolotl', 'Detail projektu']
    : ['Workspace', 'Projekty', 'Detail projektu']
  const [current, setCurrent] = useState(levels.length - 1)
  const [disabled, setDisabled] = useState(false)
  const currentLevel = useRef<HTMLSpanElement>(null)
  const visibleLevels = collapsed && current > 1 ? [0, -1, current] : levels.slice(0, current + 1).map((_, index) => index)
  const hiddenItems = levels.slice(1, current).map((label, index) => ({ id: String(index + 1), label, disabled }))

  function navigate(index: number, fromMenu = false) {
    if (disabled) return
    setCurrent(index)
    // The shared menu restores its trigger; only replace that focus if it disappears.
    if (!fromMenu || index < 2) requestAnimationFrame(() => currentLevel.current?.focus({ preventScroll: true }))
  }

  return <figure className="v2-navigation-example">
    <figcaption>{collapsed ? 'B / Collapsed Breadcrumbs' : 'A / Standard Breadcrumbs'}</figcaption>
    <div className="v2-breadcrumbs-stage">
      <nav className="v2-breadcrumbs" aria-label={collapsed ? 'Drobečková navigace — sbalená ukázka' : 'Drobečková navigace — standardní ukázka'}>
        <ol>{visibleLevels.map((level, position) => <li key={level}>
          {position > 0 && <AxoIcon name="chevron-down" size={16} className="v2-breadcrumbs-separator" />}
          {level === -1 ? <DropdownMenu theme={theme} trigger="icon" triggerLabel="Zobrazit skryté úrovně cesty"
            items={hiddenItems} onAction={id => navigate(Number(id), true)} />
            : level === current ? <span className="v2-breadcrumbs-current" id={uid + '-level-' + current} ref={currentLevel} aria-current="page" tabIndex={-1}>{levels[level]}</span>
            : <a href={'#' + uid + '-level-' + level} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined}
              onClick={event => { event.preventDefault(); navigate(level) }}>{levels[level]}</a>}
        </li>)}</ol>
      </nav>
      <div className="v2-breadcrumbs-actions">
        <button type="button" className="v2-button v2-button--ghost v2-button--compact" onClick={() => setCurrent(levels.length - 1)}><span className="v2-button__content">Obnovit cestu</span></button>
        <button type="button" className="v2-button v2-button--ghost v2-button--compact" aria-pressed={disabled}
          onClick={() => setDisabled(value => !value)}><span className="v2-button__content">{disabled ? 'Povolit navigaci' : 'Vyzkoušet Disabled'}</span></button>
      </div>
    </div>
  </figure>
}

function BreadcrumbsExamples({ theme }: { theme: ThemeName }) {
  return <section className="v2-panel" style={{ '--v2-breadcrumbs-radius': radius.xs + 'px' } as CSSProperties}>
    <div className="v2-section-heading"><span className="v2-kicker">07 / BREADCRUMBS</span><h2>Cesta v hierarchii</h2><p>Schválené varianty A / Standard a B / Collapsed. Předchozí úrovně mění pouze lokální ukázku; aktuální stránka není klikací. Skryté úrovně otevírá sdílené Dropdown Menu.</p></div>
    <div className="v2-breadcrumbs-gallery"><BreadcrumbsExample theme={theme} /><BreadcrumbsExample theme={theme} collapsed /></div>
  </section>
}

function NavigationExploration({ theme }: { theme: ThemeName }) {
  const colors = colorTokens.semantic[theme]
  const states = colorTokens.interaction[theme]
  const variables = {
    '--v2-nav-surface': colors.surface.default,
    '--v2-nav-subtle': colors.surface.subtle,
    '--v2-nav-border': colors.border.default,
    '--v2-nav-text': colors.text.primary,
    '--v2-nav-muted': colors.text.secondary,
    '--v2-nav-hover': states.hover.background,
    '--v2-nav-pressed': states.pressed.background,
    '--v2-nav-accent': colorTokens.primitives.brand.irisPurple,
    '--v2-nav-accent-pressed': states.brand.pressed,
    '--v2-nav-on-accent': colors.text.onBrand,
    '--v2-nav-focus': states.focus.ring,
    '--v2-nav-disabled': states.disabled.background,
    '--v2-nav-disabled-text': states.disabled.text,
    '--v2-nav-pill': radius.pill + 'px',
    '--v2-nav-radius': radius.md + 'px',
    '--v2-nav-small-gap': spacing[2] + 'px',
    '--v2-nav-inset': spacing[1] + 'px',
    '--v2-nav-padding': spacing[4] + 'px',
    '--v2-nav-font': fontFamilies.ui,
    '--v2-nav-font-size': typography.label.size + 'px',
    '--v2-nav-font-weight': typography.label.weight,
    '--v2-nav-line-height': typography.label.lineHeight,
    '--v2-nav-control-height': controls.default.height + 'px',
    '--v2-nav-compact-height': controls.compact.height + 'px',
  } as CSSProperties

  return <div className="v2-navigation-exploration" style={variables}>
    <section className="v2-panel"><div className="v2-section-heading"><span className="v2-kicker">04 / TABS NAVIGATION</span><h2>Dvě podoby záložek</h2><p>Schválené varianty A / Underline a C / Accent. Přepínej obsah kliknutím nebo šipkami; Home a End vyberou první a poslední dostupnou záložku.</p></div>
      <div className="v2-nav-tabs-gallery">
        <TabsExample variant="underline" label="A / Underline Tabs" />
        <TabsExample variant="accent" label="C / Accent Tabs" />
      </div>
    </section>
    <section className="v2-panel"><div className="v2-section-heading"><span className="v2-kicker">05 / SEGMENTED CONTROL</span><h2>Jedna volba, dvě provedení</h2><p>Schválené varianty A / Segmented Surface a B / Compact Switch. Kompaktní přepínání zobrazení s lokálním stavem a možností porovnat Disabled.</p></div>
      <div className="v2-navigation-grid"><SegmentedExample /><SegmentedExample compact /></div>
    </section>
    <PaginationExamples />
    <BreadcrumbsExamples theme={theme} />
  </div>
}

export default function NavigationV2({ theme }: { theme: ThemeName }) {
  const variables = { '--v2-navigation-gap': spacing[6] + 'px', '--v2-navigation-radius': radius.md + 'px' } as CSSProperties
  return <div className="v2-page" style={variables}>
    <div className="v2-page-title"><div><span className="v2-kicker">LIBRARY / NAVIGATION</span><h1>Navigation<span className="v2-period">.</span></h1><p>Sdílené navigační prvky a akční nabídky Clean Neo Iris.</p></div><span className="v2-status">NÁHLED K VIZUÁLNÍMU SCHVÁLENÍ</span></div>
    <section className="v2-panel"><div className="v2-section-heading"><span className="v2-kicker">01 / DROPDOWN MENU</span><h2>Jedna nabídka, dva triggery</h2><p>Akce, volba Připnout, Disabled a Danger. Šipky přeskakují zakázané položky, Enter a mezerník aktivují, Escape zavře nabídku.</p></div>
      <div className="v2-navigation-grid"><MenuExample theme={theme} trigger="icon" /><MenuExample theme={theme} trigger="text" /></div>
    </section>
    <section className="v2-panel"><div className="v2-section-heading"><span className="v2-kicker">02 / SETTINGS POPOVER</span><h2>Plovoucí panel nastavení</h2><p>Nemodální panel s lokální ukázkou dvou slotů. Výběr slouží pouze pro tento náhled.</p></div>
      <SettingsExample theme={theme} />
    </section>
    <section className="v2-panel"><div className="v2-section-heading"><span className="v2-kicker">03 / TOOLTIP</span><h2>Krátká nápověda k ovládání</h2><p>Najeď na ikonu nebo ji zaměř klávesnicí. Escape skryje nápovědu; preferovaná pozice se přizpůsobí dostupnému prostoru.</p></div>
      <TooltipExamples theme={theme} />
    </section>
    <NavigationExploration theme={theme} />
  </div>
}
