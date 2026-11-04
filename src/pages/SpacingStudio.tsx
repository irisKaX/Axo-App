import { useState } from 'react'
import { spacing, radius, controls, density, layout } from '../design-system/foundations/spacing'
import { bluePurple } from '../design-system/foundations/brand-expression'
import './spacing-studio.css'

const spaceEntries = Object.entries(spacing).filter(([key]) => key !== '0').map(([key, value]) => ({token: key, px: value}))
const radii = [
  {key:'xs', name:'XS', use:'Micro prvky'},
  {key:'sm', name:'SM', use:'Inputy, tooltip'},
  {key:'md', name:'MD', use:'Menší karty'},
  {key:'lg', name:'LG', use:'Widgety'},
  {key:'xl', name:'XL', use:'Panely'},
  {key:'xxl', name:'2XL', use:'Hero / feature'},
] as const

export default function SpacingStudio() {
  const [mode, setMode] = useState<'comfortable'|'compact'>('comfortable')
  const [columns, setColumns] = useState<4|8|12>(12)
  const [copied, setCopied] = useState('')
  const [selection, setSelection] = useState<'default'|'hover'|'focus'|'disabled'>('default')
  const d = density[mode]
  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setCopied(value) } catch { setCopied('') }
  }

  return <div className="sg-page">
    <p className="eyebrow">FOUNDATIONS / SPACING & GRID</p>
    <h1>Space. <span className="heading-accent">Shape. Rhythm.</span></h1>
    <p className="intro">Jednotná prostorová pravidla pro Axolotl. Vzdušný layout, zaoblené karty, pilulková tlačítka a dokonale kulatá ikonová tlačítka. Vše na 4px rytmu a responzivním gridu.</p>
    <div className="sg-status">FOUNDATIONS · 4PX GRID · SOFT GEOMETRY · RESPONSIVE</div>

    <section className="panel sg-panel">
      <div className="sg-section-header"><div><span className="sg-kicker">01 / SPACING SCALE</span><h2>Rozestupy, které drží rytmus</h2><p>Jednotky jsou násobky 4 px. Menší rozestupy patří mezi související prvky, větší mezi samostatné bloky.</p></div><span className="sg-hint">Klikni na hodnotu pro kopírování</span></div>
      <div className="sg-scale">{spaceEntries.map(({token, px})=><button key={token} className="sg-space-row" type="button" onClick={()=>void copy(px+'px')} title={'Kopírovat '+px+'px'}>
        <span className="sg-space-token">space.{token}</span><span className="sg-space-track"><i style={{width:Math.max(4,px/96*100)+'%'}}/></span><strong>{copied===px+'px'?'✓':px+'px'}</strong>
      </button>)}</div>
      <div className="sg-note"><strong>Pravidlo:</strong> 8 px uvnitř těsných skupin, 16–24 px mezi souvisejícími prvky, 24–32 px uvnitř karet a 40–64 px mezi většími sekcemi. Nevybíráme náhodné mezihodnoty.</div>
    </section>

    <section className="panel sg-panel">
      <div className="sg-section-header"><div><span className="sg-kicker">02 / ROUNDNESS</span><h2>Měkká geometrie</h2><p>Axolotl nepoužívá ostré rohy. Pro běžné karty volíme 24 px, pro výrazné panely 32–40 px. Tlačítka jsou vždy pilulková.</p></div></div>
      <div className="sg-radius-grid">{radii.map(r=><button className="sg-radius-card" key={r.key} type="button" onClick={()=>void copy(radius[r.key]+'px')} title={'Kopírovat '+radius[r.key]+'px'}>
        <div className="sg-radius-object" style={{borderRadius:radius[r.key]}}><span>{r.name}</span></div><strong>{r.name} · {radius[r.key]}px</strong><span>{r.use}</span>
      </button>)}</div>
      <div className="sg-round-preview">
        <div className="sg-round-form"><div className="sg-round-form-icon">✳</div><div><strong>Rounded by design</strong><p>Formulářová pole jsou zaoblená, ale zachovávají čitelné hrany.</p></div><div className="sg-demo-input">https://axolotl.app <span>↗</span></div></div>
        <div className="sg-round-large" style={{background:bluePurple.css}}><div className="sg-round-large-heading"><span className="sg-round-large-eyebrow">Feature surface</span><strong>Soft shapes.<br/>Bold presence.</strong></div><span className="sg-round-large-meta">radius.xl · {radius.xl}px</span></div>
      </div>
    </section>

    <section className="panel sg-panel">
      <div className="sg-section-header"><div><span className="sg-kicker">03 / CONTROL GEOMETRY</span><h2>Pilulky a dokonale kulatá tlačítka</h2><p>Ukázky proporcí, nikoli nová knihovna tlačítek. Primární, sekundární a ikonové prvky sdílejí stejný prostorový systém.</p></div></div>
      <div className="sg-controls-showcase">
        <div className="sg-control-row"><span className="sg-control-row-label">Compact · {controls.compact.height}px</span><div><button type="button" className="sg-button sg-button-primary" style={{height:controls.compact.height,paddingInline:controls.compact.horizontalPadding,fontSize:controls.compact.fontSize}}>Pokračovat <span>↗</span></button><button type="button" className="sg-button sg-button-secondary" style={{height:controls.compact.height,paddingInline:controls.compact.horizontalPadding,fontSize:controls.compact.fontSize}}>Zrušit</button><button type="button" className="sg-button sg-button-round sg-button-secondary" style={{width:controls.iconCompact,height:controls.iconCompact}} aria-label="Kopírovat příklad compact" onClick={()=>void copy('iconCompact · 36px')}>⧉</button></div></div>
        <div className="sg-control-row"><span className="sg-control-row-label">Default · {controls.default.height}px</span><div><button type="button" className="sg-button sg-button-primary" style={{height:controls.default.height,paddingInline:controls.default.horizontalPadding,fontSize:controls.default.fontSize}}>Pokračovat <span>↗</span></button><button type="button" className="sg-button sg-button-secondary" style={{height:controls.default.height,paddingInline:controls.default.horizontalPadding,fontSize:controls.default.fontSize}}>Zrušit</button><button type="button" className="sg-button sg-button-round sg-button-secondary" style={{width:controls.iconDefault,height:controls.iconDefault}} aria-label="Kopírovat příklad default" onClick={()=>void copy('iconDefault · 44px')}>⧉</button></div></div>
        <div className="sg-control-row"><span className="sg-control-row-label">Comfortable · {controls.comfortable.height}px</span><div><button type="button" className="sg-button sg-button-primary" style={{height:controls.comfortable.height,paddingInline:controls.comfortable.horizontalPadding,fontSize:controls.comfortable.fontSize}}>Pokračovat <span>↗</span></button><button type="button" className="sg-button sg-button-secondary" style={{height:controls.comfortable.height,paddingInline:controls.comfortable.horizontalPadding,fontSize:controls.comfortable.fontSize}}>Zrušit</button><button type="button" className="sg-button sg-button-round sg-button-secondary" style={{width:controls.iconComfortable,height:controls.iconComfortable}} aria-label="Kopírovat příklad comfortable" onClick={()=>void copy('iconComfortable · 52px')}>⧉</button></div></div>
      </div>
      <div className="sg-control-inspector"><div><strong>Interakční stav</strong><p>Vyber stav a porovnej změnu vzhledu.</p></div><div className="sg-segment">{(['default','hover','focus','disabled'] as const).map(s=><button key={s} type="button" className={selection===s?'is-selected':''} aria-pressed={selection===s} onClick={()=>setSelection(s)}>{s}</button>)}</div><button type="button" className={'sg-button sg-button-primary sg-state-'+selection} disabled={selection==='disabled'}>Primární tlačítko ↗</button></div>
      <div className="sg-note"><strong>Dotyk:</strong> ikonová tlačítka 36 px jsou určena pro hustší desktopové UI. Na dotykových zařízeních potřebují alespoň 44 × 44 px klikací plochu, i když je vizuální kruh menší.</div>
    </section>

    <section className="panel sg-panel">
      <div className="sg-section-header"><div><span className="sg-kicker">04 / SPACING IN CONTEXT</span><h2>Jak prostor funguje uvnitř widgetu</h2><p>Vyzkoušej dvě hustoty. Pohodlná je výchozí, kompaktní se hodí pro datově náročnější pracovní prostředí.</p></div><div className="sg-segment"><button type="button" onClick={()=>setMode('comfortable')} aria-pressed={mode==='comfortable'} className={mode==='comfortable'?'is-selected':''}>Comfortable</button><button type="button" onClick={()=>setMode('compact')} aria-pressed={mode==='compact'} className={mode==='compact'?'is-selected':''}>Compact</button></div></div>
      <div className="sg-demo-layout" style={{gap:d.gap}}>
        <div className="sg-demo-card" style={{padding:d.padding,gap:d.gap}}><div className="sg-demo-heading"><div className="sg-demo-icon">⌕</div><div><strong>Find Phrase</strong><span>Pracovní nástroj</span></div><button type="button" className="sg-demo-more" aria-label="Možnosti widgetu">•••</button></div><label htmlFor="sg-widget-url">URL adresa</label><input className="sg-demo-field" id="sg-widget-url" readOnly value="https://www.o2.cz" /><button type="button" className="sg-button sg-button-primary sg-demo-submit">Analyzovat stránku ↗</button></div>
        <div className="sg-demo-card" style={{padding:d.padding,gap:d.gap}}><div className="sg-demo-heading"><div className="sg-demo-icon">◷</div><div><strong>Recent activity</strong><span>Pracovní přehled</span></div></div>{['Aktualizace metadat','Nová poznámka','Kontrola indexace'].map((t,i)=><div className="sg-demo-list-item" key={t}><span className="sg-demo-dot"/><span>{t}</span><small>{i+1} h</small></div>)}</div>
      </div>
      <div className="sg-context-values"><span>Card padding: <strong>{d.padding}px</strong></span><span>Gap: <strong>{d.gap}px</strong></span><span>Card radius: <strong>{radius.lg}px</strong></span></div>
    </section>

    <section className="panel sg-panel">
      <div className="sg-section-header"><div><span className="sg-kicker">05 / RESPONSIVE GRID</span><h2>Grid pro mobil, tablet a desktop</h2><p>Flexibilní sloupce s konzistentními mezerami. Počet sloupců je model rozvržení, ne pevná šířka každé karty.</p></div><div className="sg-segment">{([4,8,12] as const).map(n=><button type="button" key={n} onClick={()=>setColumns(n)} aria-pressed={columns===n} className={columns===n?'is-selected':''}>{n} cols</button>)}</div></div>
      <div className="sg-grid-stage"><div className="sg-grid-preview" style={{gridTemplateColumns:`repeat(${columns}, minmax(0, 1fr))`}}>{Array.from({length:columns},(_,i)=><div key={i}>{String(i+1).padStart(2,'0')}</div>)}</div><div className="sg-grid-examples"><div className="sg-grid-example-large">Main content · flexible</div><div className="sg-grid-example-small">Side widget</div></div></div>
      <div className="sg-breakpoints">{[{title:'Mobile',cols:layout.mobileColumns,range:'< 600 px'},{title:'Tablet',cols:layout.tabletColumns,range:'600–1199 px'},{title:'Desktop',cols:layout.desktopColumns,range:'≥ 1200 px'}].map(b=><div key={b.title}><strong>{b.title}</strong><span>{b.cols} columns</span><small>{b.range}</small></div>)}</div>
    </section>

    <details className="sg-tech"><summary>Technické tokeny a implementační pravidla <span>↘</span></summary><div className="sg-tech-content"><div><strong>Spacing</strong><code>{JSON.stringify(spacing,null,2)}</code></div><div><strong>Radius</strong><code>{JSON.stringify(radius,null,2)}</code></div><div><strong>Controls</strong><code>{JSON.stringify(controls,null,2)}</code></div><div><strong>Layout</strong><code>{JSON.stringify(layout,null,2)}</code></div></div></details>
    <footer className="page-footer">Axolotl · Foundations / Spacing & Grid · Neo Iris</footer>
  </div>
}
