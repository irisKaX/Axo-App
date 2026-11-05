import { useState } from 'react'
import { WidgetFoundation } from '../widgets/WidgetFoundation'
import { layout } from '../design-system/foundations/spacing'
import './widgets-studio.css'

const specimens = [
  { size: 'small', label: '01 / SMALL WIDGET', toolCode: 'QR', title: 'QR generátor.', tagline: 'QR kódy snadno.', description: 'Vytvářejte QR kódy pro webové adresy.' },
  { size: 'large', label: '02 / LARGE WIDGET', toolCode: 'METADATA', title: 'Metadata Check.', tagline: 'Kontrola metadat.', description: 'Zkontrolujte titulek a popis vybrané webové stránky.' },
] as const

export default function WidgetsStudio() {
  const [notice, setNotice] = useState('')
  return (
    <div className="ws-page" style={{ maxWidth: layout.contentMax }}>
      <p className="eyebrow">LIBRARY / WIDGETS</p>
      <h1>Widgets<span className="heading-accent">.</span></h1>
      <p className="intro">Sdílená kostra widgetů: AXOLOTL / NÁSTROJ, bílý název, fialový popis do tří slov a jedna krátká vysvětlující věta. Small zabírá jeden sloupec, Large dva.</p>
      <div className="ws-grid" style={{ gap: layout.gaps.default }}>
        {specimens.map(({ size, label, toolCode, title, tagline, description }) => (
          <section className={`ws-preview ws-preview--${size}`} key={size} aria-labelledby={`ws-${size}`}>
            <h2 className="ws-preview-label" id={`ws-${size}`}>{label}</h2>
            <WidgetFoundation size={size} dashboard toolCode={toolCode} title={title} tagline={tagline} description={description} onOpenTool={() => setNotice('Ukázka: cílový nástroj ještě není připojený.')} />
          </section>
        ))}
      </div>
      <p className="ws-launch-notice" role="status" aria-live="polite">{notice}</p>
      <footer className="page-footer">Axolotl · Widgets · Foundation</footer>
    </div>
  )
}
