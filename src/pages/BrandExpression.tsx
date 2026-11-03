import { useState } from 'react'
import { brandColors } from '../design-system/foundations/colors'
import { brandGradients, brandExpressionAssets } from '../design-system/foundations/brand-expression'
import './brand-expression.css'

type Gradient = (typeof brandGradients)[number]

function Head({ className = '' }: { className?: string }) {
  return <img className={'expression-head ' + className} src={brandExpressionAssets.whiteHead} alt="Bílá 2D ikonická hlava axolotla z Figmy" />
}

function GradientCard({ gradient, selected, onSelect }: { gradient: Gradient; selected: boolean; onSelect: () => void }) {
  return <button type="button" className={'expression-gradient-choice' + (selected ? ' is-selected' : '')} onClick={onSelect} aria-pressed={selected}>
    <div className="expression-gradient-art" style={{ background: gradient.css }}>
      <Head className="expression-gradient-head" />
      <span className="expression-fg-circle expression-fg-circle-one" aria-hidden="true" />
    </div>
    <div className="expression-gradient-description">
      <span><strong>{gradient.name}</strong><small>Figma Frame {gradient.figmaFrame}</small></span>
      <span className="expression-gradient-check" aria-hidden="true">{selected ? '✓' : '↗'}</span>
    </div>
  </button>
}

export default function BrandExpression() {
  const [selected, setSelected] = useState(0)
  const [markVisible, setMarkVisible] = useState(true)
  const [copied, setCopied] = useState('')
  const active = brandGradients[selected]

  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setCopied(value) } catch { setCopied('') }
  }

  return <div className="expression-page">
    <p className="eyebrow">FOUNDATIONS / BRAND EXPRESSION</p>
    <h1>Brand <span className="heading-accent">Expression.</span></h1>
    <p className="intro">Výrazné modrofialové plochy a bílá hlava axolotla jako rozpoznatelná značka. Čtyři gradienty jsou převzaté z tvých framů ve Figmě.</p>
    <div className="expression-status">SOURCE: FIGMA · 4 GRADIENTS · ORIGINAL WHITE HEAD</div>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">01 / SIGNATURE</span>
        <h2>Naše vizuální signatura</h2>
        <p>Gradient tvoří atmosféru, bílá ikonická hlava dodává identitu. V běžných pracovních prvcích necháváme prostor pro obsah.</p>
      </div>
      <div className="expression-hero" style={{ background: active.css }}>
        <div className="expression-hero-copy">
          <span>AXOLOTL · BRAND SYSTEM</span>
          <h3>Make work<br />flow better.</h3>
          <p>Code by code. Pixel by pixel.</p>
        </div>
        {markVisible && <Head className="expression-hero-head" />}
        <div className="expression-hero-orbit" aria-hidden="true" />
      </div>
      <div className="expression-hero-controls">
        <div><strong>{active.name}</strong><span>Frame {active.figmaFrame} · Figma gradient</span></div>
        <label className="expression-switch"><input type="checkbox" checked={markVisible} onChange={event=>setMarkVisible(event.target.checked)}/> Zobrazit bílou hlavu</label>
        <button type="button" onClick={()=>void copy(active.css)}>{copied===active.css?'✓ Zkopírováno':'Kopírovat CSS'}</button>
      </div>
    </section>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">02 / GRADIENT LIBRARY</span>
        <h2>Čtyři gradienty z Figmy</h2>
        <p>Kliknutím vyber gradient a zobraz ho ve větším náhledu nahoře. Každý používá přesně stejné HEX barvy a pořadí stopů jako ve Figmě.</p>
      </div>
      <div className="expression-gradient-grid">
        {brandGradients.map((gradient,i)=><GradientCard key={gradient.id} gradient={gradient} selected={selected===i} onSelect={()=>setSelected(i)}/>)}
      </div>
      <div className="expression-gradient-spec">
        <div><strong>{active.name}</strong><p>{active.usage}</p></div>
        <div className="expression-stop-list">{active.stops.map((color,i)=><button type="button" key={color+i} title={'Kopírovat '+color} onClick={()=>void copy(color)}><i style={{background:color}}/><code>{copied===color?'✓':color}</code><small>{i*50}%</small></button>)}</div>
      </div>
    </section>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">03 / BRIGHT BLUE</span>
        <h2>Bright Blue jako brandová plocha</h2>
        <p>Bright Blue není určená pro každou akci. Nejlépe funguje jako výrazný samostatný panel, který kontrastuje s neutrálními pracovními kartami.</p>
      </div>
      <div className="expression-blue-examples">
        <div className="expression-bright-tile">
          <span>BRAND SURFACE</span>
          <Head className="expression-blue-head" />
          <strong>Make something<br />remarkable.</strong>
          <code>{brandColors.brightBlue}</code>
        </div>
        <div className="expression-work-tile">
          <div className="expression-work-title"><span className="expression-work-symbol">⌕</span><div><strong>Find Phrase</strong><small>Pracovní widget</small></div></div>
          <span className="expression-work-label">URL adresa</span>
          <div className="expression-work-input">https://www.o2.cz</div>
          <span className="expression-work-button">Analyzovat stránku</span>
          <p>Neutrální surface, barevná akce. Bez přebytečného gradientu.</p>
        </div>
      </div>
    </section>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">04 / WHITE BRAND MARK</span>
        <h2>Bílá 2D hlava</h2>
        <p>Používáme skutečný asset z Figmy, nikoliv náhradní symbol. Dobře funguje na sytých plochách, kde má dostatečný prostor.</p>
      </div>
      <div className="expression-mark-grid">
        <div className="expression-mark-demo" style={{background:brandGradients[0].css}}><Head/></div>
        <div className="expression-mark-demo" style={{background:brandColors.royalViolet}}><Head/></div>
        <div className="expression-mark-demo expression-mark-dark"><Head/></div>
      </div>
      <div className="expression-mark-caption"><span>Gradient</span><span>Solid violet</span><span>True Dark</span></div>
    </section>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">05 / USAGE GUIDELINES</span>
        <h2>Kde Brand Expression použít</h2>
        <p>Velká osobnost, ale s mírou. Maskot a gradient mají podpořit produkt, nikoliv přehlušit práci.</p>
      </div>
      <div className="expression-guidelines">
        <div className="expression-rule"><span className="expression-rule-icon">✓</span><strong>Brandové plochy</strong><p>Hero, onboarding, uvítání, výrazné cover karty a vybraná oznámení.</p></div>
        <div className="expression-rule"><span className="expression-rule-icon">✓</span><strong>Neutral workspace</strong><p>Dashboard, widgety, inputy a tabulky zůstávají přehledné na neutrálních plochách.</p></div>
        <div className="expression-rule"><span className="expression-rule-icon expression-rule-no">×</span><strong>Ne všude</strong><p>Neopakovat gradient za každým widgetem, nepoužívat bílou hlavu jako drobnou textovou ikonu.</p></div>
      </div>
      <p className="expression-note">Barevné stopy jsou převzaté z Figmy. Úhel CSS je vizuální aproximací směru původního figmového gradientu. Finální sémantické textové a interaktivní barvy zůstávají řízené systémem Colors v2.</p>
    </section>

    <footer className="page-footer">Axolotl · Brand Expression · Gradient Frames 24–27 · White head from Figma</footer>
  </div>
}
