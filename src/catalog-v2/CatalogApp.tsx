import { useState, type CSSProperties } from 'react'
import { ColorsV2, TypographyV2, IconsV2 } from './FoundationPages'
import './catalog.css'

type Theme = 'dark' | 'light'
type Section = 'overview' | 'buttons' | 'colors' | 'typography' | 'icons' | 'components' | 'layouts' | 'playground'
type Variant = 'primary' | 'primary-2' | 'secondary' | 'outline' | 'ghost' | 'danger'

const variants: { id: Variant; label: string; detail: string; caption: string }[] = [
  { id: 'primary', label: 'Primary', detail: 'Hlavní akce', caption: 'Schválený Blue × Purple gradient. Bez automatické ikony.' },
  { id: 'primary-2', label: 'Primary 2 · Orbital Glow', detail: 'Zvýrazněná hlavní akce', caption: 'Stejný gradient s nepřetržitým světlem po obvodu.' },
  { id: 'secondary', label: 'Secondary', detail: 'Vedlejší akce', caption: 'Gradient Reveal: barevná kontura, gradient při hoveru.' },
  { id: 'outline', label: 'Outline', detail: 'Alternativní akce', caption: 'Čistá fialová kontura Accent Outline.' },
  { id: 'ghost', label: 'Ghost', detail: 'Nenápadná akce', caption: 'Bez výrazné plochy, pro méně důležité kroky.' },
  { id: 'danger', label: 'Danger', detail: 'Destruktivní akce', caption: 'Červená kontura, při hoveru plná červená.' },
]

const navigation: { label: string; items: { id: Section; name: string }[] }[] = [
  { label: 'CATALOG', items: [{ id: 'overview', name: 'Přehled' }] },
  { label: 'FOUNDATIONS', items: [{ id: 'colors', name: 'Colors' }, { id: 'typography', name: 'Typography' }] },
  { label: 'LIBRARY', items: [{ id: 'buttons', name: 'Buttons' }, { id: 'icons', name: 'Icons' }, { id: 'components', name: 'Další komponenty' }] },
  { label: 'EXPLORATION', items: [{ id: 'layouts', name: 'Widgets & Layouts' }, { id: 'playground', name: 'Playground' }] },
]

function Glyph({ name }: { name: 'plus' | 'external' | 'sun' | 'moon' | 'check' | 'arrow' }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    external: <><path d="M8 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /><path d="M13 3h8v8M21 3l-10 10" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.5 14.2A8 8 0 0 1 9.8 3.5 8.2 8.2 0 1 0 20.5 14.2Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  }
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function DemoButton({ variant = 'primary', compact = false, round = false, onClick, children }: {
  variant?: Variant; compact?: boolean; round?: boolean; onClick: () => void; children?: string
}) {
  return <button type="button" onClick={onClick}
    className={['v2-button', 'v2-button--' + variant, compact ? 'v2-button--compact' : '', round ? 'v2-button--round' : ''].filter(Boolean).join(' ')}
    aria-label={round ? variant === 'primary' ? 'Kulaté Primary' : 'Kulaté Secondary' : undefined}>
    <span className="v2-button__content">{round ? <Glyph name="plus" /> : (children ?? (variant === 'danger' ? 'Odstranit' : 'Pokračovat'))}</span>
  </button>
}

function SectionHeader({ n, title, copy }: { n: string; title: string; copy: string }) {
  return <div className="v2-section-heading">
    <span className="v2-kicker">{n}</span>
    <h2>{title}</h2>
    <p>{copy}</p>
  </div>
}

function ButtonsPage() {
  const [notice, setNotice] = useState('Klikni na ukázku tlačítka a vyzkoušej jeho chování.')
  return <div className="v2-page">
    <div className="v2-page-title">
      <div><span className="v2-kicker">LIBRARY / APPROVED COMPONENTS</span><h1>Buttons<span className="v2-period">.</span></h1>
        <p>Šest schválených rolí, dvě velikosti a dvě speciální skupiny. Jeden vzorek pro každou variantu, bez zbytečného opakování.</p></div>
      <span className="v2-status"><Glyph name="check" /> Schválený vzhled</span>
    </div>
    <section className="v2-panel">
      <SectionHeader n="01 / VARIANTS" title="Hierarchie akcí" copy="Každá role má svůj účel. V katalogu je pouze jedna reprezentativní ukázka, bez duplicitní varianty s ikonou." />
      <div className="v2-variant-list">
        {variants.map(item => <div className="v2-specimen" key={item.id}>
          <div className="v2-specimen__text"><div className="v2-specimen__name">{item.label}</div><p>{item.caption}</p></div>
          <span className="v2-specimen__detail">{item.detail}</span>
          <div className="v2-specimen__action"><DemoButton variant={item.id} onClick={() => setNotice('Ukázka: ' + item.label)} /></div>
        </div>)}
      </div>
    </section>
    <section className="v2-panel">
      <SectionHeader n="02 / SIZES" title="Velikosti" copy="Dvě schválené výšky. Velikost se mění, vizuální jazyk tlačítka zůstává stejný." />
      <div className="v2-size-grid">
        <div className="v2-example"><div><strong>Compact</strong><p>32 px výška</p></div><DemoButton compact onClick={() => setNotice('Compact · 32 px')} /></div>
        <div className="v2-example"><div><strong>Default</strong><p>38 px výška</p></div><DemoButton onClick={() => setNotice('Default · 38 px')} /></div>
      </div>
    </section>
    <section className="v2-panel">
      <SectionHeader n="03 / ROUND" title="Kulatá tlačítka" copy="Pouze Primary a Secondary. Ikona je součástí kulatého tlačítka, nikoliv další povinná ukázka u každé varianty." />
      <div className="v2-round-grid">
        <div className="v2-example"><div><strong>Primary</strong><p>Gradientová kruhová akce</p></div><DemoButton variant="primary" round onClick={() => setNotice('Round Primary')} /></div>
        <div className="v2-example"><div><strong>Secondary</strong><p>Neutrální kruhová akce</p></div><DemoButton variant="secondary" round onClick={() => setNotice('Round Secondary')} /></div>
      </div>
    </section>
    <section className="v2-panel">
      <SectionHeader n="04 / WIDGET ACTION" title="Widget → Tool" copy="Jedno kompaktní tlačítko v pravém horním rohu widgetu. V této fázi pouze vizuální ukázka." />
      <div className="v2-widget">
        <div className="v2-widget__heading"><div><span className="v2-kicker">AXOLOTL / TOOL</span><strong>Ukázkový widget</strong><p>Náhled umístění akce</p></div>
          <button className="v2-widget__launch" type="button" aria-label="Otevřít nástroj (ukázka)" title="Otevřít nástroj" onClick={() => setNotice('Widget → Tool je zatím pouze designová ukázka.')}><Glyph name="external" /></button>
        </div>
        <div className="v2-widget__body">Prostor pro budoucí obsah widgetu</div>
      </div>
    </section>
    <div className="v2-notice" role="status"><span className="v2-notice__dot" />{notice}</div>
  </div>
}

const previews = [
  ['01', 'Foundations', 'Barvy, gradienty, typografie a geometrie.'],
  ['02', 'Buttons', 'První schválená skupina komponent.'],
  ['03', 'Widgets & Layouts', 'Příští návrhy pracovních obrazovek.'],
] as const

export default function CatalogApp() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [section, setSection] = useState<Section>('buttons')
  const isButtons = section === 'buttons'
  const title = navigation.flatMap(g => g.items).find(x => x.id === section)?.name ?? 'Přehled'
  const labels = { dark: 'Přepnout na světlý motiv', light: 'Přepnout na tmavý motiv' }
  const cssTheme = {
    '--v2-blue': '#0F9FDC', '--v2-mid': '#3B09C7', '--v2-purple': '#8101EC',
    '--v2-gradient': 'linear-gradient(130deg,#0F9FDC 0%,#3B09C7 52%,#8101EC 100%)',
  } as CSSProperties
  return <div className="v2-shell" data-theme={theme} style={cssTheme}>
    <aside className="v2-sidebar">
      <button className="v2-logo" type="button" onClick={() => setSection('overview')}><span className="v2-logo__mark">A</span><span><strong>AXOLOTL</strong><small>DESIGN CATALOG <b>V2</b></small></span></button>
      <div className="v2-sidebar__label">DESIGN EXPLORATION</div>
      <nav className="v2-navigation" aria-label="Navigace katalogu">{navigation.map(group => <div className="v2-nav-group" key={group.label}><span>{group.label}</span>{group.items.map(item =>
        <button type="button" key={item.id} className={'v2-nav-item' + (section === item.id ? ' is-active' : '')} aria-current={section === item.id ? 'page' : undefined} onClick={() => setSection(item.id)}>
          {item.name}{!(['overview','buttons','colors','typography','icons'] as Section[]).includes(item.id) ? <span className="v2-soon">Brzy</span> : section === item.id ? <span className="v2-active-dot" /> : null}
        </button>)}</div>)}</nav>
      <div className="v2-sidebar__footer"><span className="v2-footer-dot" /> DESIGN ONLY <span>·</span> CLEAN NEO IRIS</div>
    </aside>
    <div className="v2-workspace">
      <header className="v2-topbar"><div className="v2-breadcrumb">CATALOG <span>/</span> {isButtons ? 'LIBRARY / ' : ''}<strong>{title}</strong></div>
        <div className="v2-topbar__right"><span className="v2-draft">DESIGN PREVIEW</span><button type="button" className="v2-theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={labels[theme]} title={labels[theme]}><Glyph name={theme === 'dark' ? 'moon' : 'sun'} /></button></div>
      </header>
      <main className="v2-main">{isButtons ? <ButtonsPage /> : section === 'colors' ? <ColorsV2 theme={theme} /> : section === 'typography' ? <TypographyV2 /> : section === 'icons' ? <IconsV2 /> : section === 'overview' ? <div className="v2-page">
        <div className="v2-page-title"><div><span className="v2-kicker">DESIGN EXPLORATION / V2</span><h1>Začínáme od <span className="v2-period">schváleného.</span></h1><p>Nový katalog vzniká postupně. Přenášíme jen to, co už má správnou vizuální podobu, a každý další prvek má své jasné místo.</p></div></div>
        <div className="v2-overview-grid">{previews.map(([number, heading, description]) => <div className="v2-overview-card" key={number}><span className="v2-kicker">{number}</span><h2>{heading}</h2><p>{description}</p><span className="v2-card-foot">{heading === 'Buttons' ? 'SCHVÁLENÝ STYL' : 'BUDEME PŘEVÁDĚT'}</span></div>)}</div>
        <button type="button" className="v2-open-buttons" onClick={() => setSection('buttons')}>Prohlédnout Buttons <Glyph name="arrow" /></button>
      </div> : <div className="v2-page"><div className="v2-page-title"><div><span className="v2-kicker">DESIGN CATALOG / PŘIPRAVUJEME</span><h1>{title}<span className="v2-period">.</span></h1><p>Tato část zatím neobsahuje převedené komponenty. Naplníme ji až schválenými návrhy, bez starých CSS vrstev a duplicit.</p></div></div><button className="v2-open-buttons" type="button" onClick={() => setSection('buttons')}>Zpět na Buttons <Glyph name="arrow" /></button></div>}</main>
      <footer className="v2-page-footer">AXOLOTL DESIGN CATALOG V2 <span>·</span> VISUAL EXPLORATION ONLY</footer>
    </div>
  </div>
}
