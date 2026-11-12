import { useState, type CSSProperties } from 'react'
import { DropdownMenu, type DropdownMenuItem } from '../components/DropdownMenu'
import { SettingsPopover } from '../components/SettingsPopover'
import { Tooltip, type TooltipPlacement } from '../components/Tooltip'
import { AxoIcon } from '../components/AxoIcon'
import { FormSelect } from './forms/FormControlsV2'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { controls, radius, spacing } from '../design-system/foundations/spacing'
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
  </div>
}
