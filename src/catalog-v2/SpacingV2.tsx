import { useState } from 'react'
import { spacing, radius, controls, density, layout } from '../design-system/foundations/spacing'
import './spacing.css'

type Density = keyof typeof density
type Columns = 4 | 8 | 12

const spaceTokens = Object.entries(spacing)
  .filter(([name]) => name !== '0')
  .map(([name, value]) => ({ name: 'space.' + name, value }))

const corners = [
  { key: 'xs', name: 'XS', use: 'Drobné prvky' },
  { key: 'sm', name: 'SM', use: 'Tooltipy a ovládací prvky' },
  { key: 'md', name: 'MD', use: 'Menší kontejnery' },
  { key: 'lg', name: 'LG', use: 'Karty, inputy a widgety' },
  { key: 'xl', name: 'XL', use: 'Panely a velké kontejnery' },
  { key: 'xxl', name: '2XL', use: 'Výrazné plochy' },
  { key: 'pill', name: 'PILL', use: 'Textová tlačítka a chips' },
  { key: 'round', name: 'ROUND', use: 'Kulatá ikonová tlačítka' },
] as const

function Heading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="v2-spacing-heading">
    <span className="v2-kicker">{number}</span>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
}

function Toggle<T extends string | number>({ items, value, onChange, label }: {
  items: readonly { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  label: string
}) {
  return <div className="v2-spacing-segment" role="group" aria-label={label}>
    {items.map(item => <button key={item.value} type="button" aria-pressed={value === item.value}
      className={value === item.value ? 'selected' : ''} onClick={() => onChange(item.value)}>
      {item.label}
    </button>)}
  </div>
}

export default function SpacingV2() {
  const [copied, setCopied] = useState('')
  const [mode, setMode] = useState<Density>('comfortable')
  const [columns, setColumns] = useState<Columns>(12)
  const values = density[mode]

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
    } catch {
      setCopied('Schránka není dostupná')
    }
  }

  return <div className="v2-page v2-spacing">
    <div className="v2-page-title">
      <div>
        <span className="v2-kicker">FOUNDATIONS / SPACING & GRID</span>
        <h1>Space. Shape. <span className="v2-period">Rhythm.</span></h1>
        <p>Čistý 4px rytmus, měkká geometrie a flexibilní layout. Jednotné prostorové hodnoty místo náhodných odsazení.</p>
      </div>
      <span className="v2-status">4 PX BASE GRID</span>
    </div>

    <section className="v2-panel">
      <Heading number="01 / SPACING SCALE" title="Rozestupy, které drží rytmus"
        description="Všechny rozestupy vycházejí z násobků 4 px. Kliknutím zkopíruješ přesnou hodnotu." />
      <div className="v2-spacing-scale">
        {spaceTokens.map(({ name, value }) => <button type="button" key={name} className="v2-spacing-token"
          onClick={() => void copy(value + 'px')} title={'Kopírovat ' + value + 'px'}>
          <span>{name}</span>
          <span className="v2-spacing-track"><i style={{ width: value / 96 * 100 + '%' }} /></span>
          <strong>{copied === value + 'px' ? '✓ ' : ''}{value} px</strong>
        </button>)}
      </div>
      <div className="v2-spacing-guidance">
        <strong>Praktické pravidlo</strong>
        <div><span>4–8 px <small>Úzce související obsah</small></span>
          <span>12–16 px <small>Vnitřní skupiny</small></span>
          <span>24–32 px <small>Obsah karet</small></span>
          <span>40–64 px <small>Samostatné sekce</small></span>
        </div>
      </div>
    </section>

    <section className="v2-panel">
      <Heading number="02 / RADIUS" title="Měkká geometrie"
        description="Jedna sada zaoblení pro malé prvky, karty a výrazné plochy. Žádné paralelní radius systémy." />
      <div className="v2-spacing-radius-grid">
        {corners.map(({ key, name, use }) => {
          const value = radius[key]
          const printable = typeof value === 'number' ? value + 'px' : value
          return <button type="button" className="v2-spacing-radius-card" key={key}
            onClick={() => void copy(printable)} title={'Kopírovat ' + printable}>
            <span className={'v2-spacing-radius-shape' + (key === 'round' ? ' is-round' : '')}
              style={{ borderRadius: typeof value === 'number' ? value : value }}>
              {name}
            </span>
            <strong>radius.{key}</strong>
            <code>{copied === printable ? '✓ ' : ''}{printable}</code>
            <small>{use}</small>
          </button>
        })}
      </div>
      <div className="v2-spacing-context">
        <div className="v2-spacing-form">
          <span className="v2-kicker">RADIUS / LG</span>
          <strong>Formulářová plocha</strong>
          <p>Vstupní pole má měkké, ale čitelné hrany.</p>
          <div className="v2-spacing-faux-input"><span>https://axolotl.app</span><span aria-hidden="true">↗</span></div>
        </div>
        <div className="v2-spacing-feature">
          <span>FEATURE SURFACE</span>
          <strong>Soft shapes.<br />Bold presence.</strong>
          <small>radius.xl · {radius.xl} px</small>
        </div>
      </div>
    </section>

    <section className="v2-panel">
      <Heading number="03 / CONTROL GEOMETRY" title="Dvě schválené velikosti"
        description="Spacing určuje rozměry. Vzhled, hover efekty a varianty samotných tlačítek zůstávají výhradně v sekci Buttons." />
      <div className="v2-spacing-sizes">
        {(['compact', 'default'] as const).map(key => <div className="v2-spacing-size-row" key={key}>
          <div><strong>{key === 'compact' ? 'Compact' : 'Default'}</strong>
            <small>{controls[key].height} px výška · {controls[key].horizontalPadding} px horizontální padding</small></div>
          <div className="v2-spacing-measure">
            <div className="v2-spacing-measure-pill" style={{ height: controls[key].height, paddingInline: controls[key].horizontalPadding, fontSize: controls[key].fontSize }}>
              Ukázka rozměru
            </div>
            <div className="v2-spacing-measure-circle" style={{ width: controls[key].height, height: controls[key].height }} aria-label={'Kruhový rozměr ' + controls[key].height + ' px'} />
          </div>
        </div>)}
      </div>
      <div className="v2-spacing-note"><strong>Poznámka k použití:</strong> Vizuální průměr kulatého tlačítka je 32 nebo 38 px. Na dotykovém zařízení může jeho interaktivní plocha potřebovat alespoň 44 × 44 px, aniž se zvětší samotný kruh.</div>
    </section>

    <section className="v2-panel">
      <div className="v2-spacing-heading-row">
        <Heading number="04 / DENSITY" title="Spacing v kontextu"
          description="Porovnej dva rytmy v realistické ukázce widgetů. Jde pouze o prezentaci prostorových hodnot, nikoli hotové nástroje." />
        <Toggle<Density> label="Hustota rozložení" value={mode} onChange={setMode}
          items={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} />
      </div>
      <div className="v2-spacing-widget-grid" style={{ gap: values.gap }}>
        <div className="v2-spacing-widget" style={{ padding: values.padding, gap: values.gap }}>
          <div className="v2-spacing-widget-head">
            <span className="v2-spacing-widget-symbol">⌕</span>
            <div><strong>Find Phrase</strong><small>Ukázka nástroje</small></div>
          </div>
          <div className="v2-spacing-widget-field">https://www.o2.cz</div>
          <div className="v2-spacing-widget-line"><i /><span>Hledání fráze v obsahu</span></div>
          <div className="v2-spacing-widget-bottom">NÁHLED WIDGETU</div>
        </div>
        <div className="v2-spacing-widget" style={{ padding: values.padding, gap: values.gap }}>
          <div className="v2-spacing-widget-head">
            <span className="v2-spacing-widget-symbol">◷</span>
            <div><strong>Recent activity</strong><small>Ukázka přehledu</small></div>
          </div>
          {['Úprava metadat', 'Nová poznámka', 'Kontrola indexace'].map((name, i) =>
            <div className="v2-spacing-widget-line" key={name}><i /><span>{name}</span><small>{i + 1} h</small></div>)}
        </div>
      </div>
      <div className="v2-spacing-metrics">
        <span>Gap <strong>{values.gap} px</strong></span>
        <span>Padding <strong>{values.padding} px</strong></span>
        <span>Radius <strong>{radius.lg} px</strong></span>
      </div>
    </section>

    <section className="v2-panel">
      <div className="v2-spacing-heading-row">
        <Heading number="05 / RESPONSIVE GRID" title="Grid napříč obrazovkami"
          description="Přepínačem změníš počet sloupců. Náhled ukazuje proporce, ne skutečnou šířku zařízení." />
        <Toggle<Columns> label="Počet sloupců" value={columns} onChange={setColumns}
          items={[{ value: 4, label: '4 cols' }, { value: 8, label: '8 cols' }, { value: 12, label: '12 cols' }]} />
      </div>
      <div className="v2-spacing-grid-stage">
        <div className="v2-spacing-columns" style={{ gridTemplateColumns: 'repeat(' + columns + ',minmax(0,1fr))' }}>
          {Array.from({ length: columns }, (_, i) => <span key={i}>{String(i + 1).padStart(2, '0')}</span>)}
        </div>
        <div className="v2-spacing-grid-composition">
          <div>Hlavní obsah</div>
          <div>Vedlejší widget</div>
        </div>
      </div>
      <div className="v2-spacing-breakpoints">
        {[
          { name: 'Mobile', cols: layout.mobileColumns, range: 'do 599 px' },
          { name: 'Tablet', cols: layout.tabletColumns, range: '600–1199 px' },
          { name: 'Desktop', cols: layout.desktopColumns, range: 'od 1200 px' }
        ].map(item => <div key={item.name}><strong>{item.name}</strong><span>{item.cols} sloupce</span><small>{item.range}</small></div>)}
      </div>
    </section>

    <details className="v2-panel v2-spacing-technical">
      <summary>Technické tokeny <span>Spacing · Radius · Controls · Grid</span></summary>
      <div className="v2-spacing-json">
        {([['spacing', spacing], ['radius', radius], ['controls', { compact: controls.compact, default: controls.default }], ['layout', layout]] as const)
          .map(([name, data]) => <div key={name}><strong>{name}</strong><pre>{JSON.stringify(data, null, 2)}</pre></div>)}
      </div>
    </details>
    <p className="v2-spacing-footer">4px grid · Neo Iris geometry · Design catalog only</p>
  </div>
}
