import { purple } from '../design-system/foundations/colors'
import { useState } from 'react'
import './visual-directions.css'

type DirectionId = 'aurora' | 'neo' | 'plasma'
type Theme = 'light' | 'dark'

const directions = [
  { id: 'aurora', number: '01', name: 'Aurora Glow', subtitle: 'Luminous · Soft · Fresh', description: 'Světlá, zářivá atmosféra. Fialová s elektrickou limetkou, vzdušné plochy a jemné světelné halo.', palette: ['#7138E8','#B4FF58','#79E7E0','#F7F9FD','#15132B'] },
  { id: 'neo', number: '02', name: 'Neo Iris', subtitle: 'Electric · Bold · Premium', description: 'Hluboký kontrast, intenzivní violet, modrotyrkysové světlo a výrazný, ale disciplinovaný interface.', palette: [purple[6][1],'#A06AFF','#4DEFE3','#111022','#F8F7FF'] },
  { id: 'plasma', number: '03', name: 'Playful Plasma', subtitle: 'Juicy · Expressive · Friendly', description: 'Syté růžové, limetkové a azurové detaily. Výrazné grafické tvary, osobitost a hravý produktový feeling.', palette: ['#7138E8','#FF4DAE','#B6F63E','#54DDF5','#171125'] },
] as const

function Mockup({ id, mode, large = false }: { id: DirectionId; mode: Theme; large?: boolean }) {
  const [value, setValue] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  return <div className={`vd-mock vd-${id} vd-${mode} ${large ? 'vd-large' : ''}`}>
    <div className="vd-glow vd-glow-one" /><div className="vd-glow vd-glow-two" />
    <div className="vd-shell">
      <div className="vd-appbar">
        <div className="vd-appmark"><span>✳</span></div><strong>axolotl<span className="vd-brand-dot">.</span></strong>
        <span className="vd-appbar-spacer" />
        <span className="vd-mini-nav">Workspace</span><span className="vd-avatar">I</span>
      </div>
      <div className="vd-copy"><div className="vd-kicker"><span className="vd-pulse" /> YOUR CREATIVE SPACE</div><h3>Make work<br/><em>flow better.</em></h3><p>Všechny tvoje nástroje. Jeden kreativní prostor.</p></div>
      <div className="vd-content">
        <div className="vd-widget">
          <div className="vd-widget-head"><span className="vd-widget-symbol">⌕</span><div><strong>Find Phrase</strong><small>Smart search tool</small></div><span className="vd-widget-dots">•••</span></div>
          <label htmlFor={`vd-input-${id}-${large}`}>Website URL</label>
          <input id={`vd-input-${id}-${large}`} value={value} onChange={e => {setValue(e.target.value);setAnalyzed(false)}} placeholder="https://example.com" />
          <button type="button" className="vd-primary" onClick={()=>setAnalyzed(true)}>{analyzed ? '✓ Ready to analyze' : 'Analyze page'} <span>↗</span></button>
        </div>
        <div className="vd-sidecards">
          <div className="vd-stat vd-stat-main"><span className="vd-stat-label">Completed tasks ↗</span><strong>48<span>+</span></strong><div className="vd-bar"><i/></div></div>
          <div className="vd-stat vd-stat-fun"><span className="vd-small-orb">✦</span><div><strong>Keep creating</strong><small>You've got this!</small></div></div>
        </div>
      </div>
      <div className="vd-foot"><span>✦  DESIGN WITH PERSONALITY</span><span>AXO / 2026</span></div>
    </div>
  </div>
}

export default function VisualDirections() {
  const [selected, setSelected] = useState<DirectionId>('neo')
  const [mode, setMode] = useState<Theme>('dark')
  const active = directions.find(d => d.id === selected)!
  return <div className="vd-page">
    <div className="eyebrow">FOUNDATIONS · VISUAL EXPLORATION</div>
    <h1>Visual <span className="heading-accent">Directions</span></h1>
    <p className="intro">Tři skutečné návrhové směry pro Axolotl. Prohlédni si vizuální atmosféru, komponenty i widgety, přepínej režimy a vyber, co stojí za další rozpracování.</p>
    <div className="vd-toolbar"><span className="vd-exploration-badge">● EXPERIMENT · NOTHING APPROVED YET</span><div className="vd-switch" role="group" aria-label="Náhled režimu"><button type="button" aria-pressed={mode==='light'} className={mode==='light'?'on':''} onClick={()=>setMode('light')}>☀ Light</button><button type="button" aria-pressed={mode==='dark'} className={mode==='dark'?'on':''} onClick={()=>setMode('dark')}>☾ Dark</button></div></div>
    <div className="vd-choices">{directions.map(d=><article key={d.id} className={`vd-choice ${selected===d.id?'vd-selected':''}`}>
      <div className="vd-choice-bar"><div><span className="vd-number">{d.number} / DESIGN DIRECTION</span><h2>{d.name}</h2><p>{d.subtitle}</p></div>{selected===d.id&&<span className="vd-picked">Viewing</span>}</div>
      <Mockup id={d.id} mode={mode}/>
      <div className="vd-choice-bottom"><div className="vd-palette">{d.palette.map(c=><span key={c} style={{background:c}} title={c}/>)}</div><p>{d.description}</p><button type="button" className="vd-select" aria-pressed={selected===d.id} onClick={()=>setSelected(d.id)}>{selected===d.id?'✓ Zobrazeno ve velkém':'Prohlédnout detail'} <span>↗</span></button></div>
    </article>)}</div>
    <section className="vd-detail"><div className="vd-detail-top"><div><span className="vd-number">SELECTED CONCEPT / {active.number}</span><h2>{active.name}</h2><p>Interaktivní ukázka ve větším měřítku. Zkus vložit URL a kliknout na tlačítko.</p></div><span className="vd-detail-caption">DESIGN EXPLORATION, NOT FINAL UI</span></div>
      <Mockup key={selected+'-'+mode} id={selected} mode={mode} large/>
      <div className="vd-detail-bottom"><div className="vd-palette">{active.palette.map(c=><button type="button" key={c} title={'Kopírovat '+c} onClick={()=>void navigator.clipboard?.writeText(c)} style={{background:c}} aria-label={'Kopírovat '+c}/>)}</div><p>{active.description} Barvy a efekty jsou zatím koncept, nikoli schválené design tokeny.</p></div>
    </section>
  </div>
}
