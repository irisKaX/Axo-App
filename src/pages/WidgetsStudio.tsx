import { WidgetFoundation } from '../widgets/WidgetFoundation'
import { layout } from '../design-system/foundations/spacing'
import './widgets-studio.css'

const specimens = [
  { size: 'small', label: '01 / SMALL WIDGET' },
  { size: 'large', label: '02 / LARGE WIDGET' },
] as const

export default function WidgetsStudio() {
  return (
    <div className="ws-page" style={{ maxWidth: layout.contentMax }}>
      <p className="eyebrow">LIBRARY / WIDGETS</p>
      <h1>Widgets<span className="heading-accent">.</span></h1>
      <p className="intro">Sdílený základ pro budoucí widgety. Atmosférická plocha, jednotná typografie a prázdný prostor pro obsah.</p>
      <div className="ws-grid" style={{ gap: layout.gaps.default }}>
        {specimens.map(({ size, label }) => (
          <section className={`ws-preview ws-preview--${size}`} key={size} aria-labelledby={`ws-${size}`}>
            <h2 className="ws-preview-label" id={`ws-${size}`}>{label}</h2>
            <WidgetFoundation size={size} />
          </section>
        ))}
      </div>
      <footer className="page-footer">Axolotl · Widgets · Foundation</footer>
    </div>
  )
}
