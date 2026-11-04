import { useState } from 'react'
import { brandColors, themes, type ThemeName } from '../design-system/foundations/colors'
import { approvedBrandSurfaces, brandExpressionAssets, deepElectric } from '../design-system/foundations/brand-expression'
import './visual-directions.css'

/** Approved product direction. All colors inherit from Colors v2 / Brand Expression. */
export default function VisualDirections({ theme }: { theme: ThemeName }) {
  const [url, setUrl] = useState('')
  const [feedback, setFeedback] = useState(false)
  const t = themes[theme]

  return <div className="vd-page">
    <p className="eyebrow">FOUNDATIONS / VISUAL DIRECTION</p>
    <h1>Neo <span className="heading-accent">Iris.</span></h1>
    <p className="intro">Jediný schválený vizuální směr Axolotlu. Skutečně neutrální pracovní plochy, výrazná fialová, Bright Blue a gradient Deep Electric. Přepínač Light / Dark v horní liště mění celý náhled.</p>
    <div className="vd-status">SCHVÁLENO · NEO IRIS · COLORS V2 · {theme.toUpperCase()}</div>

    <section className="vd-panel">
      <header className="vd-section-heading"><span>01 / REAL INTERFACE</span><h2>Jak bude Axolotl působit</h2><p>Jedna vizuální identita v obou tématech. Barevné plochy vytvářejí atmosféru, widgety zůstávají čitelné.</p></header>
      <div className="vd-canvas">
        <div className="vd-appbar">
          <span className="vd-appmark">✳</span>
          <strong>axolotl<span className="vd-appdot">.</span></strong>
          <div className="vd-navigation">Workspace <span>Tools</span> Dashboard</div>
          <span className="vd-avatar">I</span>
        </div>
        <div className="vd-hero" style={{ background: deepElectric.css }}>
          <div className="vd-hero-text">
            <span className="vd-eyebrow">AXOLOTL WORKSPACE</span>
            <h3>Make work<br/>flow better.</h3>
            <p>Všechny tvé nástroje v jednom prostoru.</p>
          </div>
          <img src={brandExpressionAssets.whiteHead} alt="Bílá 2D hlava axolotla" className="vd-white-head" />
          <div className="vd-hero-ring" aria-hidden="true"/>
        </div>
        <div className="vd-demo-layout">
          <div className="vd-widget">
            <div className="vd-widget-top"><span className="vd-tool-icon">⌕</span><div><strong>Find Phrase</strong><small>Analýza obsahu stránky</small></div><span className="vd-ellipsis">···</span></div>
            <label htmlFor="vd-url">URL adresa</label>
            <input id="vd-url" type="url" value={url} onChange={e=>{setUrl(e.target.value);setFeedback(false)}} placeholder="https://www.o2.cz"/>
            <button type="button" onClick={()=>setFeedback(true)} className="vd-main-action">{feedback?'Náhled připraven':'Analyzovat stránku'} <span>↗</span></button>
          </div>
          <div className="vd-right-column">
            <div className="vd-widget vd-metric">
              <span>Dokončené úkoly</span><strong>48<span>+</span></strong>
              <div className="vd-progress"><i/></div>
            </div>
            <div className="vd-widget vd-corporate">
              <span className="vd-o2-icon">O₂</span><div><strong>O2 Workspace</strong><small>Firemní integrace</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="vd-panel">
      <header className="vd-section-heading"><span>02 / APPROVED PALETTE</span><h2>Barvy, které skutečně používáme</h2><p>Barvy jsou převzaté z jednoho zdroje. Další barevné koncepty už nemají v katalogu vlastní varianty.</p></header>
      <div className="vd-swatches">
        {[
          {name:'True Dark',value:themes.dark.canvas,usage:'Základ aplikace'},
          {name:'Iris Purple',value:brandColors.irisPurple,usage:'Primární akce'},
          {name:'Bright Blue',value:approvedBrandSurfaces.brightBlue,usage:'Výrazné brandové plochy'},
          {name:'O2 Blue',value:brandColors.o2Blue,usage:'Corporate kontext'},
          {name:'Surface · '+theme,value:t.surface,usage:'Neutrální karty '+theme},
        ].map(c=><div className="vd-swatch" key={c.name}><div style={{background:c.value}}/><strong>{c.name}</strong><code>{c.value}</code><small>{c.usage}</small></div>)}
      </div>
    </section>

    <section className="vd-panel">
      <header className="vd-section-heading"><span>03 / BRAND EXPRESSION</span><h2>Deep Electric + bílá hlava</h2><p>Schválený vizuální podpis. Plnohodnotná dokumentace a použití patří do samostatné sekce Brand Expression.</p></header>
      <div className="vd-brand-strip">
        <div className="vd-gradient-tile" style={{ background: deepElectric.css }}><img src={brandExpressionAssets.whiteHead} alt="Bílý symbol hlavy axolotla na Deep Electric" /></div>
        <div className="vd-bright-tile" style={{ background: approvedBrandSurfaces.brightBlue }}><strong>Bright Blue</strong><span>{approvedBrandSurfaces.brightBlue}</span></div>
        <div className="vd-neutral-tile"><span>Pracovní UI</span><strong>Clean. Focused. Functional.</strong></div>
      </div>
    </section>
    <footer className="page-footer">Axo-App · Visual Direction · Neo Iris / schválená paleta Colors v2</footer>
  </div>
}
