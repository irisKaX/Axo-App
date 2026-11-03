import { useState } from 'react'
import { deepElectric, approvedBrandSurfaces, brandExpressionAssets } from '../design-system/foundations/brand-expression'
import './brand-expression.css'

function WhiteHead({ className = '' }: { className?: string }) {
  return <img className={'expression-head ' + className} src={brandExpressionAssets.whiteHead} alt="Bílá 2D hlava axolotla z Figmy" />
}

export default function BrandExpression() {
  const [copied, setCopied] = useState('')
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
    } catch {
      setCopied('')
    }
  }

  return <div className="expression-page">
    <p className="eyebrow">FOUNDATIONS / BRAND EXPRESSION</p>
    <h1>Brand <span className="heading-accent">Expression.</span></h1>
    <p className="intro">Schválená vizuální identita: Deep Electric, Bright Blue a originální bílá 2D hlava axolotla.</p>
    <div className="expression-status">APPROVED · DEEP ELECTRIC · BRIGHT BLUE · WHITE AXOLOTL HEAD</div>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">01 / PRIMARY BRAND GRADIENT</span>
        <h2>Deep Electric</h2>
        <p>Schválený gradient z Frame 27. Používáme ho na významných brandových plochách, ne jako pozadí běžných widgetů.</p>
      </div>
      <div className="expression-hero" style={{ background: deepElectric.css }}>
        <div className="expression-hero-copy">
          <span>AXOLOTL · BRAND SYSTEM</span>
          <h3>Make work<br />flow better.</h3>
          <p>Code by code. Pixel by pixel.</p>
        </div>
        <WhiteHead className="expression-hero-head" />
        <div className="expression-hero-orbit" aria-hidden="true" />
      </div>
      <div className="expression-gradient-spec">
        <div><strong>{deepElectric.name}</strong><p>Figma Frame {deepElectric.figmaFrame}</p></div>
        <div className="expression-stop-list">
          {deepElectric.stops.map((hex, i) => <button type="button" key={hex} onClick={() => void copy(hex)} title={'Kopírovat ' + hex}>
            <i style={{ background: hex }} /><code>{copied === hex ? '✓ Zkopírováno' : hex}</code><small>{i * 50}%</small>
          </button>)}
        </div>
        <button type="button" className="expression-copy-css" onClick={() => void copy(deepElectric.css)}>
          {copied === deepElectric.css ? '✓ CSS zkopírováno' : 'Kopírovat CSS'}
        </button>
      </div>
    </section>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">02 / APPROVED BLUE SURFACE</span>
        <h2>Bright Blue</h2>
        <p>Výrazná plocha pro brandové bloky. Pro běžné pracovní prvky zachováváme neutrální pozadí.</p>
      </div>
      <div className="expression-blue-examples">
        <div className="expression-bright-tile" style={{ background: approvedBrandSurfaces.brightBlue }}>
          <span>BRAND SURFACE</span>
          <WhiteHead className="expression-blue-head" />
          <strong>Make something<br />remarkable.</strong>
          <code>{approvedBrandSurfaces.brightBlue}</code>
        </div>
        <div className="expression-work-tile">
          <div className="expression-work-title"><span className="expression-work-symbol">⌕</span><div><strong>Find Phrase</strong><small>Pracovní widget</small></div></div>
          <span className="expression-work-label">URL adresa</span>
          <div className="expression-work-input">https://www.o2.cz</div>
          <span className="expression-work-button">Analyzovat stránku</span>
          <p>Neutrální pracovní plocha bez dekorativního gradientu.</p>
        </div>
      </div>
    </section>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">03 / WHITE BRAND MARK</span>
        <h2>Bílá 2D hlava</h2>
        <p>Originální asset z Figmy použitý se schváleným Deep Electric a Bright Blue.</p>
      </div>
      <div className="expression-mark-grid">
        <div className="expression-mark-demo" style={{ background: deepElectric.css }}><WhiteHead /></div>
        <div className="expression-mark-demo" style={{ background: approvedBrandSurfaces.brightBlue }}><WhiteHead /></div>
      </div>
      <div className="expression-mark-caption"><span>Deep Electric</span><span>Bright Blue</span></div>
    </section>

    <section className="expression-panel">
      <div className="expression-heading">
        <span className="expression-eyebrow">04 / USAGE</span>
        <h2>Pravidla použití</h2>
        <p>Základem pracovní aplikace jsou neutrální plochy. Schválené brandové barvy mají vyniknout v důležitých místech.</p>
      </div>
      <div className="expression-guidelines">
        <div className="expression-rule"><span className="expression-rule-icon">✓</span><strong>Brandové plochy</strong><p>Deep Electric pro hero a vybrané cover karty. Bright Blue pro výrazné značkové bloky.</p></div>
        <div className="expression-rule"><span className="expression-rule-icon">✓</span><strong>Neutral workspace</strong><p>Dashboard, formuláře a pracovní widgety zůstávají na neutrálním povrchu.</p></div>
        <div className="expression-rule"><span className="expression-rule-icon expression-rule-no">×</span><strong>Bez přebarvování</strong><p>Bílou hlavu nepřebarvovat. Nepoužívat výrazný gradient za drobným pracovním textem.</p></div>
      </div>
      <p className="expression-note">HEX hodnoty a pořadí barevných stopů pocházejí z Figmy. CSS úhel je vizuální aproximací figmového gradientu. Textové a interaktivní barvy nadále spravují Colors v2.</p>
    </section>
    <footer className="page-footer">Axolotl · Brand Expression · Approved Figma Frame 27</footer>
  </div>
}
