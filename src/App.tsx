import { useState, type CSSProperties } from 'react'
import { purple, neutral, themes, contrastRatio, type ThemeName } from './design-system/foundations/colors'

type Section = 'colors' | 'typography' | 'spacing' | 'components' | 'widgets' | 'layouts'
const nav: { title: string; items: { id: Section; label: string }[] }[] = [
  { title: 'FOUNDATIONS', items: [{ id: 'colors', label: 'Colors' }, { id: 'typography', label: 'Typography' }, { id: 'spacing', label: 'Spacing & Grid' }] },
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
  const [section, setSection] = useState<Section>('colors')
  const [url, setUrl] = useState('')
  const t = themes[theme]
  const vars = {
    '--canvas': t.canvas, '--surface': t.surface, '--subtle': t.subtle, '--border': t.border,
    '--text': t.text, '--muted': t.muted, '--brand': t.brand, '--brand-text': t.brandText,
    '--brand-soft': t.brandSoft,
  } as CSSProperties
  const pairs = [
    { label: 'Primární text / Surface', fg: t.text, bg: t.surface, threshold: 4.5 },
    { label: 'Sekundární text / Surface', fg: t.muted, bg: t.surface, threshold: 4.5 },
    { label: 'Brand text / tlačítko', fg: t.brandText, bg: t.brand, threshold: 4.5 },
    { label: 'Border / Surface (UI)', fg: t.border, bg: t.surface, threshold: 3 },
  ]
  return <div className="app-shell" style={vars} data-theme={theme}>
    <aside className="sidebar">
      <a className="logo" href="#colors" onClick={() => setSection('colors')}><span className="logo-icon">A</span><span><strong>Axo-App</strong><small>Design System</small></span></a>
      {nav.map((group) => <div className="nav-group" key={group.title}>
        <p className="nav-heading">{group.title}</p>
        {group.items.map((item) => <button className={'nav-item ' + (section === item.id ? 'active' : '')} key={item.id} onClick={() => setSection(item.id)}>{item.label}{section === item.id && <span className="nav-dot" />}</button>)}
      </div>)}
      <div className="sidebar-bottom">Axo Purple · Candidate v1.0</div>
    </aside>
    <div className="workspace">
      <header className="topbar"><span className="breadcrumbs">Design System <span>/</span> {section === 'colors' ? 'Foundations / Colors' : section}</span><div className="theme-toggle" role="group" aria-label="Barevný režim"><button className={theme === 'light' ? 'chosen' : ''} onClick={() => setTheme('light')}>☀ Light</button><button className={theme === 'dark' ? 'chosen' : ''} onClick={() => setTheme('dark')}>☾ Dark</button></div></header>
      <main className="main">
        {section === 'colors' ? <>
          <div className="eyebrow">FOUNDATIONS · 01 / COLORS</div>
          <h1>Axo Purple <span className="heading-accent">Palette</span></h1>
          <p className="intro">Iris Purple × Royal Violet Neutrals. Pracovní barevný systém pro Axo-App: škály, sémantické role, dva režimy a skutečné ukázky použití.</p>
          <span className="status">● CANDIDATE · NOT YET APPROVED</span>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">01 · BRAND</span><h2>Purple Scale</h2><p>Značková škála od nejjemnějšího odstínu po nejtmavší. Kliknutím na barvu zkopíruješ HEX.</p></div><span className="annotation">11 odstínů</span></div><Swatches data={purple}/><div className="note">Základ značky: <strong>#7138E8 (Purple 600)</strong>. Pro tmavý režim je interaktivní akcent světlejší, aby zůstal dobře čitelný.</div></section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">02 · NEUTRALS</span><h2>Neutral Scale</h2><p>Chladnější, téměř neutrální odstíny pro pozadí, plochy, typografii a hranice.</p></div><span className="annotation">11 odstínů</span></div><Swatches data={neutral}/></section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">03 · SEMANTIC ROLES</span><h2>Theme Tokens</h2><p>Stejný význam, jiné hodnoty podle tématu. Přepínej Light / Dark nahoře.</p></div></div>
            <div className="token-grid">{([
              ['Canvas',t.canvas,'bg.canvas'],['Surface',t.surface,'bg.surface'],['Subtle',t.subtle,'bg.subtle'],['Border',t.border,'border.default'],
              ['Text',t.text,'text.primary'],['Muted',t.muted,'text.secondary'],['Action',t.brand,'action.primary'],['Accent',t.brandSoft,'bg.brand.subtle'],
            ] as const).map(([name,color,token])=><div className="token-card" key={token}><div className="token-chip" style={{backgroundColor:color}}/><div><strong>{name}</strong><code>{token}</code><span>{color}</span></div></div>)}</div>
          </section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">04 · REAL UI</span><h2>Component Preview</h2><p>Živá kontrola neutrálních ploch, inputů, karet a interaktivní barvy.</p></div></div>
            <div className="preview-stage"><div className="preview-top"><span className="preview-logo">A</span><b>Axolotl Workspace</b><span className="preview-right">Overview &nbsp; · &nbsp; Tools</span></div><div className="preview-grid">
              <div className="widget-preview"><div className="widget-title"><span className="widget-icon">⌕</span><div><strong>Find Phrase</strong><small>Analýza obsahu stránky</small></div><span className="more">···</span></div><label htmlFor="url-field">URL adresa</label><input id="url-field" value={url} onChange={(event)=>setUrl(event.target.value)} placeholder="https://www.o2.cz" /><button className="primary-action" onClick={()=>{ if(url) setUrl('') }} type="button">{url ? 'Vymazat URL' : 'Analyzovat stránku'}</button></div>
              <div className="metric-column"><div className="metric"><span>Aktivní projekty</span><strong>12</strong><small>↗ +2 tento týden</small></div><div className="metric"><span>Dokončené úkoly</span><strong>48</strong><div className="progress"><span/></div></div></div>
            </div></div>
          </section>
          <section className="panel"><div className="section-top"><div><span className="eyebrow">05 · ACCESSIBILITY</span><h2>Contrast Checks</h2><p>Automatický výpočet kontrastu WCAG 2.x; pro text AA minimálně 4.5:1, pro důležité UI hranice 3:1.</p></div></div>
            <div className="contrast-grid">{pairs.map((pair)=>{const ratio=contrastRatio(pair.fg,pair.bg);const pass=ratio>=pair.threshold;return <div className="contrast-item" key={pair.label}><span className="contrast-sample" style={{background:pair.bg,color:pair.fg}}>Aa</span><div><strong>{pair.label}</strong><small>{pair.fg} / {pair.bg}</small></div><div className={'contrast-result ' + (pass?'pass':'fail')}><b>{ratio.toFixed(2)}:1</b><small>{pass?'PASS':'CHECK'}</small></div></div>})}</div><div className="note">Upozornění: výchozí jemný border není určen pro povinné obrysy formulářových ovládacích prvků. Ty dostanou samostatný kontrastnější token.</div>
          </section>
          <footer className="page-footer">Axo-App / Design System · Colors Candidate v1.0 · návrh ke schválení</footer>
        </> : <section className="panel placeholder"><div className="eyebrow">DESIGN SYSTEM · COMING NEXT</div><h1>{nav.flatMap(x=>x.items).find(x=>x.id===section)?.label}</h1><p>Pro tuto oblast zatím není schválený design. Nejprve dokončíme Foundations → Colors.</p><button onClick={()=>setSection('colors')} className="primary-action return">Zpět na Colors</button></section>}
      </main>
    </div>
  </div>
}
export default App
