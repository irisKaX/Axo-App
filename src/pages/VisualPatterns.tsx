import { useState } from 'react'
import { WorkspaceComposition } from '../components/WorkspaceComposition'
import { AccentWord, EyebrowHeading } from '../components/TextTreatments'
import { themes, type ThemeName } from '../design-system/foundations/colors'
import { radius } from '../design-system/foundations/spacing'
import './visual-patterns.css'

export default function VisualPatterns({theme}: {theme:ThemeName}) {
  const [showStructure,setShowStructure]=useState(false)
  const t=themes[theme]
  return <div className="vp-page">
    <p className="eyebrow">LIBRARY / VISUAL PATTERNS</p>
    <h1>Visual <span className="heading-accent">Patterns.</span></h1>
    <p className="intro">To nejlepší z náhledu Typography konečně jako dohledatelné stavební vzory. Atmosférické pozadí, hierarchie textu, pracovní karty a metriky. Nejde o novou paletu ani čtyři nové schválené komponenty.</p>
    <div className="vp-status">EXISTING UI REFERENCE · REUSABLE COMPOSITION · LIGHT / DARK</div>
    <section className="panel vp-panel">
      <div className="vp-section-head"><span>01 / COMPLETE COMPOSITION</span><h2>Workspace Atmosphere</h2><p>Stejná kompozice jako v Typography → Real Interface. Obě místa nyní používají jednu sdílenou komponentu a stejné CSS, takže se vzhled nemůže tiše rozcházet.</p></div>
      <WorkspaceComposition/>
      <div className="vp-implementation">
        <div><strong>WorkspaceComposition</strong><span>Kompozice pracovního hero a widgetů</span></div>
        <button type="button" onClick={()=>setShowStructure(v=>!v)} aria-expanded={showStructure}>{showStructure?'Skrýt strukturu':'Zobrazit strukturu'}</button>
      </div>
      {showStructure&&<div className="vp-anatomy" role="region" aria-label="Anatomie kompozice">
        <div><strong>01 / Atmospheric backdrop</strong><span>theme.{theme}.backdrop · Colors v2</span></div>
        <div><strong>02 / Eyebrow + headline</strong><span>Poppins, akcentové slovo · Typography</span></div>
        <div><strong>03 / Tool surface</strong><span>Neutrální karta, formulářová pole, CTA</span></div>
        <div><strong>04 / Metric surface</strong><span>Číslo, podpůrný popisek a progress</span></div>
      </div>}
    </section>
    <section className="panel vp-panel">
      <div className="vp-section-head"><span>02 / BUILDING BLOCKS</span><h2>Prvky, které dávají kompozici charakter</h2><p>Rozdělené podle odpovědnosti. Schválené Text Treatments zůstávají v Typography, backdrop ve Colors. Karty a metriky jsou zatím návrhové vzory k budoucímu schválení.</p></div>
      <div className="vp-elements">
        <article className="vp-sample">
          <div className="vp-sample-surface vp-atmospheric" style={{background:t.backdrop}}>
            <span style={{color:t.accent}}>AXOLOTL / WORKSPACE</span>
            <strong>Quiet space.<br/>Bright ideas.</strong>
          </div>
          <div className="vp-element-info"><strong>Atmospheric Surface</strong><span>Colors → Backdrop Gradient</span><small>Existující Light / Dark token</small></div>
        </article>
        <article className="vp-sample">
          <div className="vp-sample-surface vp-headline-demo">
            <EyebrowHeading eyebrow="DESIGN FOUNDATION" as="h3">Built for creators</EyebrowHeading>
            <AccentWord as="span" before="Make work " accent="better."/>
          </div>
          <div className="vp-element-info"><strong>Type Treatments</strong><span>Typography → schválené varianty</span><small>Eyebrow, Accent Dot a Accent Word</small></div>
        </article>
        <article className="vp-sample">
          <div className="vp-sample-surface vp-tool-demo">
            <div className="vp-tool-heading"><div className="vp-tool-glyph">⌕</div><div><strong>Find Phrase</strong><span>Vyhledávání v obsahu stránky</span></div></div>
            <div className="vp-tool-input">https://www.o2.cz</div>
            <div className="vp-tool-action">Analyzovat stránku <span>↗</span></div>
          </div>
          <div className="vp-element-info"><strong>Tool Surface</strong><span>Neutrální karta a funkční hierarchie</span><small>Návrhový vzor, není finální widget</small></div>
        </article>
        <article className="vp-sample">
          <div className="vp-sample-surface vp-metric-demo">
            <span>Aktivní projekty</span>
            <strong>12</strong>
            <small>+2 tento týden</small>
            <div className="vp-metric-track"><i/></div>
          </div>
          <div className="vp-element-info"><strong>Metric Card</strong><span>Data, typografická váha, progres</span><small>Návrhový vzor, ne finální komponenta</small></div>
        </article>
      </div>
    </section>
    <section className="panel vp-panel">
      <div className="vp-section-head"><span>03 / USAGE RULES</span><h2>Jedna identita, různé role</h2><p>Atmosféra má pomáhat hierarchii, nikoli obarvit všechny prvky aplikace.</p></div>
      <div className="vp-rules">
        <div><strong>Backdrop</strong><p>Vhodný pro úvodní kompozice a větší kontextové plochy. Nikoli jako pozadí každého inputu.</p></div>
        <div><strong>Neutral Surfaces</strong><p>Widgety, metriky a data čteme na neutrálním podkladu s jasným kontrastem.</p></div>
        <div><strong>Text Treatments</strong><p>Akcenty z již schválených typografických vzorů. Bez nových náhodných barev.</p></div>
        <div><strong>Radius</strong><p>Velké kompozice využívají měkké tvary; karty se mají řídit společnou škálou. Referenční hodnota radius.lg: {radius.lg}px.</p></div>
      </div>
    </section>
    <footer className="page-footer">Axo-App · Visual Patterns · Zdroj: Typography Real Interface</footer>
  </div>
}
