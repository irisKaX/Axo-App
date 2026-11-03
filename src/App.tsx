import VisualDirections from './pages/VisualDirections'
import { useState, type CSSProperties } from 'react'
import { purple, neutral, semantic, interactionStates, themes, contrastRatio, type ThemeName, type InteractionState } from './design-system/foundations/colors'

type Section = 'visual' | 'colors' | 'typography' | 'spacing' | 'components' | 'widgets' | 'layouts'
const nav: { title: string; items: { id: Section; label: string }[] }[] = [
  { title: 'FOUNDATIONS', items: [{ id: 'visual', label: 'Visual Directions' }, { id: 'colors', label: 'Colors' }, { id: 'typography', label: 'Typography' }, { id: 'spacing', label: 'Spacing & Grid' }] },
  { title: 'LIBRARY', items: [{ id: 'components', label: 'Components' }, { id: 'widgets', label: 'Widgets' }, { id: 'layouts', label: 'Layouts' }] },
]

function Swatches({ data }: { data: readonly (readonly [string, string])[] }) {
  const [copied, setCopied] = useState<string | null>(null)
  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setCopied(value) } catch { setCopied(null) }
  }
  return <div className="swatch-grid">
    {data.map(([scale, color]) => <button type="button" className="swatch" onClick={() => void copy(color)} key={scale} title={'Kopírovat ' + color}>
      <span className="swatch-color" style={{ backgroundColor: color }} />
      <span className="swatch-meta"><strong>{scale}</strong><span>{copied === color ? 'Zkopírováno' : color}</span></span>
    </button>)}
  </div>
}

function App() {
  const [theme, setTheme] = useState<ThemeName>('light')
  const [section, setSection] = useState<Section>('visual')
  const [url, setUrl] = useState('')
  const [previewState, setPreviewState] = useState<InteractionState>('default')
  const t = themes[theme]
  const vars = {
    '--canvas': t.canvas, '--surface': t.surface, '--subtle': t.subtle, '--border': t.border,
    '--text': t.text, '--muted': t.muted, '--brand': t.brand, '--brand-text': t.brandText,
    '--brand-soft': t.brandSoft, '--control-border': t.controlBorder, '--focus-ring': t.focusRing,
    '--action-hover': t.actionHover, '--action-active': t.actionActive, '--action-disabled': t.actionDisabled,
    '--action-disabled-text': t.actionDisabledText,
    '--accent': t.accent, '--brand-gradient': t.gradient, '--backdrop': t.backdrop, '--glow': t.glow,
    '--success': semantic[theme].success.foreground, '--error': semantic[theme].error.foreground,
  } as CSSProperties
  const pairs = [
    { label: 'Primární text / Surface', fg: t.text, bg: t.surface, threshold: 4.5 },
    { label: 'Sekundární text / Surface', fg: t.muted, bg: t.surface, threshold: 4.5 },
    { label: 'Brand text / tlačítko', fg: t.brandText, bg: t.brand, threshold: 4.5 },
    { label: 'Control border / Surface', fg: t.controlBorder, bg: t.surface, threshold: 3 },
    ...Object.entries(semantic[theme]).map(([name, colors]) => ({ label: name + ' / Surface', fg: colors.foreground, bg: t.surface, threshold: 4.5 })),
  ]
  return <div className="app-shell" style={vars} data-theme={theme}>
    <aside className="sidebar">
      <a className="logo" href="#visual" onClick={() => setSection('visual')}><span className="logo-icon">A</span><span><strong>Axo-App</strong><small>Design System</small></span></a>
      {nav.map((group) => <div className="nav-group" key={group.title}>
        <p className="nav-heading">{group.title}</p>
        {group.items.map((item) => <button className={'nav-item ' + (section === item.id ? 'active' : '')} key={item.id} onClick={() => setSection(item.id)}>{item.label}{section === item.id && <span className="nav-dot" />}</button>)}
      </div>)}
      <div className="sidebar-bottom">Axo Purple · Candidate v1.0</div>
    </aside>
    <div className="workspace">
      <header className="topbar"><span className="breadcrumbs">Design System <span>/</span> {section === 'colors' ? 'Foundations / Colors' : section === 'visual' ? 'Foundations / Visual Directions' : section}</span><div className="theme-toggle" role="group" aria-label="Barevný režim"><button className={theme === 'light' ? 'chosen' : ''} onClick={() => setTheme('light')}>☀ Light</button><button className={theme === 'dark' ? 'chosen' : ''} onClick={() => setTheme('dark')}>☾ Dark</button></div></header>
      <main className="main">
        {section === 'visual' ? <VisualDirections /> : section === 'colors' ? <>
          <div className="eyebrow">FOUNDATIONS · 01 / COLORS</div>
          <h1>Axo Purple <span className="heading-accent">Palette</span></h1>
          <p className="intro">Neo Iris: živá fialová identita, elektrické akcenty a jasně definované barevné role pro světlý i tmavý režim.</p>
          <span className="status">● NEO IRIS · COLOR FOUNDATION CANDIDATE</span>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">01 · BRAND</span><h2>Purple Scale</h2><p>Značková škála od nejjemnějšího odstínu po nejtmavší. Kliknutím na barvu zkopíruješ HEX.</p></div><span className="annotation">11 odstínů</span></div><Swatches data={purple}/><div className="note">Základ značky: <strong>#7138E8 (Purple 600)</strong>. Akční odstíny jsou v obou tématech samostatně mapované podle kontrastu.</div></section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">02 · NEUTRALS</span><h2>Neutral Scale</h2><p>Neo Iris neutrals: od jasných levandulových světlých ploch po hluboké indigové odstíny.</p></div><span className="annotation">11 odstínů</span></div><Swatches data={neutral}/></section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">03 · SEMANTIC ROLES</span><h2>Theme Tokens</h2><p>Stejný význam, jiné hodnoty podle tématu. Přepínej Light / Dark nahoře.</p></div></div>
            <div className="token-grid">{([
              ['Canvas',t.canvas,'bg.canvas'],['Surface',t.surface,'bg.surface'],['Subtle',t.subtle,'bg.subtle'],['Border',t.border,'border.default'],['Control Border',t.controlBorder,'border.control'],['Focus Ring',t.focusRing,'border.focus'],
              ['Text',t.text,'text.primary'],['Muted',t.muted,'text.secondary'],['Action',t.brand,'action.primary'],['Accent',t.accent,'accent.primary'],['Soft',t.brandSoft,'bg.brand.subtle'],
            ] as const).map(([name,color,token])=><div className="token-card" key={token}><div className="token-chip" style={{backgroundColor:color}}/><div><strong>{name}</strong><code>{token}</code><span>{color}</span></div></div>)}</div>
          </section>
          <section className="panel">
            <div className="section-top">
              <div><span className="eyebrow">04 · EFFECTS</span><h2>Gradients & Glow</h2><p>Brand gradient, atmosférické pozadí a jemná záře. Všechny efekty používají hodnoty aktuálního tématu.</p></div>
              <span className="annotation">NEO IRIS · {theme.toUpperCase()}</span>
            </div>
            <div className="effects-grid">
              <div className="effect-sample effect-brand"><strong>Brand Gradient</strong><code>gradient.brand</code></div>
              <div className="effect-sample effect-atmosphere"><strong>Atmosphere</strong><code>gradient.backdrop</code></div>
              <div className="effect-sample effect-glow"><span className="effect-glow-orb"/><strong>Soft Glow</strong><code>effect.glow</code></div>
            </div>
            <div className="note">Záře patří na vybrané plochy, focus a aktivní prvky. Běžné texty, tabulky a formuláře mají zůstat přehledné a bez vizuálního šumu.</div>
          </section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">05 · FEEDBACK COLORS</span><h2>Semantic Colors</h2><p>Jednotné významové barvy pro zprávy, validaci a stavy systému. Každá role má foreground, background a border pro aktuální režim.</p></div><span className="annotation">Light / Dark</span></div>
            <div className="semantic-grid">{(Object.entries(semantic[theme]) as [keyof typeof semantic.light, { readonly foreground: string; readonly background: string; readonly border: string }][]).map(([key, colors])=><div className="semantic-card" key={key}>
              <div className="semantic-header"><span className="semantic-dot" style={{background:colors.foreground}}/><strong>{key.charAt(0).toUpperCase()+key.slice(1)}</strong><button type="button" onClick={()=>void navigator.clipboard?.writeText(colors.foreground)} title="Kopírovat HEX" aria-label={'Kopírovat '+colors.foreground}>⧉</button></div>
              <div className="semantic-message" style={{background:colors.background,color:colors.foreground,borderColor:colors.border}}><strong>{key==='success'?'Změny byly uloženy':key==='warning'?'Zkontrolujte vstup':key==='error'?'Něco se nepovedlo':'Informace o stavu'}</strong><span>{key==='success'?'Operace proběhla úspěšně.':key==='warning'?'Některé údaje mohou chybět.':key==='error'?'Zkuste to prosím znovu.':'Právě zobrazujete náhled.'}</span></div>
              <div className="semantic-values"><span>Text {colors.foreground}</span><span>Bg {colors.background}</span><span>Border {colors.border}</span></div>
            </div>)}</div>
          </section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">06 · INTERACTION</span><h2>Interactive States</h2><p>Prozkoušej barvy tlačítka v jednotlivých stavech. Focus stav má samostatný viditelný obrys. Disabled blokuje interakci.</p></div></div>
            <div className="state-selector" role="group" aria-label="Ukázka interaktivního stavu">{interactionStates.map((state)=><button type="button" key={state} className={'state-selector-button '+(previewState===state?'selected':'')} onClick={()=>setPreviewState(state)} aria-pressed={previewState===state}>{state}</button>)}</div>
            <div className="interaction-preview"><button type="button" className={'state-demo '+previewState} disabled={previewState==='disabled'} style={{background:previewState==='hover'?t.actionHover:previewState==='active'?t.actionActive:previewState==='disabled'?t.actionDisabled:t.brand,color:previewState==='disabled'?t.actionDisabledText:t.brandText,outlineColor:t.focusRing}}>{previewState==='disabled'?'Nedostupná akce':'Primární akce'}</button><div className="interaction-details"><strong>Stav: {previewState}</strong><span>{previewState==='focus'?'Samostatný focus ring pro ovládání klávesnicí.':previewState==='disabled'?'Akci nelze spustit.':previewState==='hover'?'Zvýrazněná interaktivní plocha.':previewState==='active'?'Vizuální odezva při stisknutí.':'Výchozí akční barva.'}</span></div></div>
            <div className="interaction-tokens">{[['action.primary',t.brand],['action.hover',t.actionHover],['action.active',t.actionActive],['action.disabled',t.actionDisabled],['border.focus',t.focusRing],['border.control',t.controlBorder]].map(([name,color])=><div className="interaction-token" key={name}><i style={{backgroundColor:color}}/><code>{name}</code><small>{color}</small></div>)}</div>
          </section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">07 · REAL UI</span><h2>Component Preview</h2><p>Živá kontrola neutrálních ploch, inputů, karet a interaktivní barvy.</p></div></div>
            <div className="preview-stage"><div className="preview-top"><span className="preview-logo">A</span><b>Axolotl Workspace</b><span className="preview-right">Overview &nbsp; · &nbsp; Tools</span></div><div className="preview-grid">
              <div className="widget-preview"><div className="widget-title"><span className="widget-icon">⌕</span><div><strong>Find Phrase</strong><small>Analýza obsahu stránky</small></div><span className="more">···</span></div><label htmlFor="url-field">URL adresa</label><input id="url-field" value={url} onChange={(event)=>setUrl(event.target.value)} placeholder="https://www.o2.cz" /><button className="primary-action" onClick={()=>{ if(url) setUrl('') }} type="button">{url ? 'Vymazat URL' : 'Analyzovat stránku'}</button></div>
              <div className="metric-column"><div className="metric"><span>Aktivní projekty</span><strong>12</strong><small>↗ +2 tento týden</small></div><div className="metric"><span>Dokončené úkoly</span><strong>48</strong><div className="progress"><span/></div></div></div>
            </div></div>
          </section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">08 · ACCESSIBILITY</span><h2>Contrast Checks</h2><p>Automatický výpočet kontrastu WCAG 2.x; pro text AA minimálně 4.5:1, pro důležité UI hranice 3:1.</p></div></div>
            <div className="contrast-grid">{pairs.map((pair)=>{const ratio=contrastRatio(pair.fg,pair.bg);const pass=ratio>=pair.threshold;return <div className="contrast-item" key={pair.label}><span className="contrast-sample" style={{background:pair.bg,color:pair.fg}}>Aa</span><div><strong>{pair.label}</strong><small>{pair.fg} / {pair.bg}</small></div><div className={'contrast-result ' + (pass?'pass':'fail')}><b>{ratio.toFixed(2)}:1</b><small>{pass?'PASS':'CHECK'}</small></div></div>})}</div><div className="note">Jemné oddělovací linie používají border.default. Povinné hranice formulářových polí mají samostatný token border.control s cílem kontrastu alespoň 3:1.</div>
          </section>
          <footer className="page-footer">Axo-App / Design System · Neo Iris Colors · v1.0 candidate</footer>
        </> : <section className="panel placeholder"><div className="eyebrow">DESIGN SYSTEM · COMING NEXT</div><h1>{nav.flatMap(x=>x.items).find(x=>x.id===section)?.label}</h1><p>Pro tuto oblast zatím není schválený design. Nejprve dokončíme Foundations → Colors.</p><button onClick={()=>setSection('colors')} className="primary-action return">Zpět na Colors</button></section>}
      </main>
    </div>
  </div>
}
export default App
