import { useState } from 'react'
import { ImageConverterLayout, type ConverterLayoutVariant } from './ImageConverterLayout'
import { layout, spacing } from '../design-system/foundations/spacing'
import { themes, type ThemeName } from '../design-system/foundations/colors'
import './layouts-studio.css'

type Viewport = 'desktop' | 'tablet' | 'mobile'
const viewports: {id:Viewport;label:string;caption:string}[] = [
  {id:'desktop',label:'Desktop',caption:'nad 1050 px'},
  {id:'tablet',label:'Tablet',caption:'601–1050 px'},
  {id:'mobile',label:'Mobile',caption:'do 600 px'},
]
const cells = [
  {id:'workspace',label:'Workspace',size:'large'},
  {id:'qr',label:'QR generátor',size:'small'},
  {id:'search',label:'Find Phrase',size:'small'},
  {id:'media',label:'Media Tools',size:'small'},
  {id:'screenshot',label:'Screenshot',size:'small'},
  {id:'notebook',label:'Notebook',size:'large'},
] as const

function LayoutPreview({viewport,theme,headerOnly=false}:{viewport:Viewport;theme:ThemeName;headerOnly?:boolean}){
  const [menuOpen,setMenuOpen] = useState(false)
  return <div className={'ls-canvas ls-canvas--'+viewport} data-theme={theme} style={{
    '--ls-canvas':themes[theme].canvas,
    '--ls-surface':themes[theme].surface,
    '--ls-border':themes[theme].border,
    '--ls-text':themes[theme].text,
    '--ls-muted':themes[theme].muted,
  } as React.CSSProperties}>
    <div className="ls-shell-header" aria-label="Schematický horizontální header">
      <span className="ls-brand" aria-hidden="true">✳</span>
      <span className="ls-home" aria-hidden="true">⌂</span>
      <div className="ls-shell-links" aria-hidden="true"><i>Workspace</i><i>Tools</i><i>SEO check</i></div>
      <span className="ls-url" aria-hidden="true"><span>URL display</span><b>◎</b></span>
      <span className="ls-alert" aria-label="Upozornění" role="img">♧</span>
      <span className="ls-settings" aria-label="Nastavení" role="img">⚙</span>
      <span className="ls-switch" aria-hidden="true"><i/></span>
      <span className="ls-mobile-title">Dashboard</span>
      <button type="button" className="ls-menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen?'Zavřít nabídku':'Otevřít nabídku'}
        onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?'×':'☰'}</button>
    </div>
    {viewport!=='desktop' && menuOpen && <div className="ls-mobile-sheet">
      <strong>Navigace</strong>
      <span>Workspace <b>⌄</b></span><span>Tools <b>⌄</b></span><span>SEO check <b>⌄</b></span>
      <strong>Pracovní URL</strong>
      <div className="ls-mobile-sheet-url">https://www.o2.cz/... <b>▣</b></div>
      <div className="ls-mobile-sheet-foot"><span>⚙ Nastavení</span><span className="ls-mobile-sheet-switch">☾</span></div>
    </div>}
    {headerOnly ? <div className="ls-shell-placeholder">
      <span>CONTENT AREA</span>
      <div className="ls-shell-placeholder-grid" aria-hidden="true"><i/><i/></div>
    </div> : <div className="ls-widget-grid" aria-label="Pořadí šesti dashboardových widgetů">
      {cells.map(cell=><div className={'ls-cell ls-cell--'+cell.size} key={cell.id}>
        <div className="ls-cell-head"><span>{cell.label}</span><span aria-hidden="true">↗</span></div>
        <div className="ls-cell-body" aria-hidden="true"/>
      </div>)}
    </div>}
  </div>
}

function Rule({label,value,description}:{label:string;value:string;description:string}){
  return <div className="ls-rule"><strong>{label}</strong><code>{value}</code><p>{description}</p></div>
}

export default function LayoutsStudio({theme,onThemeChange}:{theme:ThemeName;onThemeChange:(theme:ThemeName)=>void}){
  const [viewport,setViewport]=useState<Viewport>('desktop')
  const [category,setCategory]=useState<'common'|'image-converter'>('image-converter')
  const [fullPreview,setFullPreview]=useState(false)
  const [converterVariant,setConverterVariant]=useState<ConverterLayoutVariant>('a')
  return <div className="ls-page">
    <p className="eyebrow">LIBRARY / LAYOUTS</p>
    <h1>Layouts<span className="heading-accent">.</span></h1>
    <p className="intro">Katalog skutečných aplikačních rozložení. Společná pravidla máme oddělená od jednotlivých nástrojů; každý nástroj má vlastní návrh stránky v reálných proporcích.</p>
    <nav className="ls-category-nav" aria-label="Sekce Layouts">
      <button type="button" aria-current={category==='common'?'page':undefined} className={category==='common'?'is-selected':''} onClick={()=>setCategory('common')}>App Shell & Dashboard Grid</button>
      <button type="button" aria-current={category==='image-converter'?'page':undefined} className={category==='image-converter'?'is-selected':''} onClick={()=>setCategory('image-converter')}>Tools / Image Converter</button>
    </nav>
    {category==='common' && <>
      <div className="ls-status">SHARED LAYOUT RULES · EXISTING DASHBOARD</div>

    <section className="panel ls-panel">
      <div className="ls-heading"><span>01 / APP SHELL</span><h2>Základní prostor aplikace</h2><p>Bez sidebaru. Horizontální schválená navigace a pod ní pracovní plocha. Ukázka níže je schematická, nikoli další kopie funkčního headeru. Na mobilním náhledu lze menu otevřít tlačítkem vpravo.</p></div>
      <LayoutPreview viewport={viewport} theme={theme} headerOnly/>
      <div className="ls-rules">
        <Rule label="Canvas" value="themes[theme].canvas" description="V Dark Mode je hlavní plocha #090B10. Žádný celoplošný gradient."/>
        <Rule label="Header" value="HeaderPreview / NavigationButton" description="Na Dashboardu průhledný, bez vlastního borderu a stínu. Výchozí ovládací prvky mají výšku 38 px."/>
        <Rule label="Obsah" value="padding 16px · gap 16px" description="Dashboard používá 16px vnější odsazení a oddělení headeru, gridu a footeru. Pod 800 px 12 px."/>
        <Rule label="Responzivita" value="800px / 480px" description="Do 1050 px používá aplikace jednu kompaktní lištu: logo, Home, název stránky, Upozornění a menu. Workspace, Tools, SEO check, pracovní URL, Nastavení a Theme Switch jsou v rozbalovacím panelu. Desktopový header se nezalamuje do několika řádků."/>
      </div>
    </section>

    <section className="panel ls-panel">
      <div className="ls-heading"><span>02 / DASHBOARD GRID</span><h2>Small & Large widgety</h2><p>Stejná skladba šesti widgetů jako na skutečném Dashboardu. Měň zobrazení pomocí přepínače a sleduj rozložení bez zásahu do produkční komponenty.</p></div>
      <div className="ls-viewport-control" role="group" aria-label="Šířka náhledu layoutu">
        {viewports.map(v=><button type="button" key={v.id} aria-pressed={viewport===v.id}
          className={viewport===v.id?'is-selected':''} onClick={()=>setViewport(v.id)}>
          <strong>{v.label}</strong><small>{v.caption}</small>
        </button>)}
      </div>
      <LayoutPreview viewport={viewport} theme={theme}/>
      <div className="ls-rules">
        <Rule label="Desktop" value=">1050 px · 4 sloupce / 2 řady" description="Small zabírá jeden sloupec, Large dva. Dvě řady vyplňují dostupnou výšku Dashboardu."/>
        <Rule label="Tablet" value="601–1050 px · 2 sloupce" description="Large zabírá oba sloupce, Small jeden. Obsah se může svisle posouvat."/>
        <Rule label="Mobile" value="≤600 px · 1 sloupec" description="Small i Large zabírají celou šířku. Jediný svislý tok."/>
        <Rule label="Mezery" value="16 px / 12 px ≤1020 px" description="Grid používá 16px gap, při menší šířce 12 px. Nevytvářet lokální odlišné rozestupy widgetů."/>
        <Rule label="Komponenty" value="WidgetFoundation / WidgetLaunchButton" description="Jedna sdílená karta se dvěma velikostmi a tlačítkem nástroje vpravo nahoře. Vnitřní prostor je samostatná plocha."/>
        <Rule label="Šířka widgetu" value="grid-column: span 1 / span 2" description="Šířka nevychází z pevně zadaných pixelů: respektuje aktuální sloupec gridu a dostupný viewport."/>
      </div>
      <p className="ls-technical">Zdroj pravidel: <code>src/pages/dashboard-studio.css</code>, <code>DashboardStudio.tsx</code>, <code>WidgetFoundation.tsx</code>. Náhled je dokumentační schéma; pro přesný interaktivní obraz používej Preview → Dashboard.</p>
    </section>

    <section className="panel ls-panel">
      <div className="ls-heading"><span>03 / NEXT LAYOUTS</span><h2>Další plánované kompozice</h2><p>V katalogu zatím nevytváříme nepoužívané komponenty. Tyto typy rozložení doplníme, až bude existovat jejich skutečný obsah.</p></div>
      <div className="ls-planned">
        <div><strong>Tool Workspace</strong><p>Samostatná stránka nástroje, nastavení, pracovní plocha a výsledky.</p></div>
        <div><strong>Content Layouts</strong><p>Formuláře, tabulky, detailní panely a Notebook.</p></div>
        <div><strong>Responsive Patterns</strong><p>Vlastní pravidla pro náročnější nástroje na malých obrazovkách.</p></div>
      </div>
    </section>
    </>}
    {category==='image-converter' && <section className="ls-tool-section">
      <div className="ls-heading"><span>TOOLS / 01 IMAGE CONVERTER</span><h2>Image Converter · návrh celé stránky</h2>
        <p>Plnohodnotná pracovní kompozice, ne zmenšený obrázek. Obsah respektuje současné komponenty a stále neřeší žádné skutečné nahrávání ani konverzi. Slider a Image Compare jsou zatím pouze vyznačené návrhové plochy.</p></div>
      <div className="ls-converter-variants" role="group" aria-label="Varianta rozložení Image Converteru">
        <button type="button" className={converterVariant==='a'?'is-selected':''} aria-pressed={converterVariant==='a'}
          onClick={()=>setConverterVariant('a')}>
          <span>A / JEDNA KARTA</span><strong>Společný workspace</strong>
          <small>Nahrávání a nastavení v jedné pracovní kartě</small>
        </button>
        <button type="button" className={converterVariant==='b'?'is-selected':''} aria-pressed={converterVariant==='b'}
          onClick={()=>setConverterVariant('b')}>
          <span>B / DVĚ KARTY</span><strong>Pracovní plocha + nastavení</strong>
          <small>Samostatné plochy vedle sebe</small>
        </button>
      </div>
      <div className="ls-tool-actions">
        <span>VARIANTA {converterVariant.toUpperCase()} · DESIGN ONLY · REÁLNÉ PROPORCE</span>
        <button type="button" onClick={()=>setFullPreview(true)}>Otevřít v celé obrazovce ↗</button>
      </div>
      <div className="ls-tool-preview">
        <ImageConverterLayout key={converterVariant} theme={theme} onThemeChange={onThemeChange} variant={converterVariant}/>
      </div>
      <div className="ls-tool-footnote"><strong>První z nástrojových layoutů</strong><p>QR generátor, Metadata Check, Find Phrase a další zde dostanou vlastní podsekce, až začneme navrhovat jejich rozložení. Budou skládat existující prvky design systému, nikoli vytvářet další kopie komponent.</p></div>
    </section>}
    {fullPreview && <ImageConverterLayout theme={theme} onThemeChange={onThemeChange} variant={converterVariant} onVariantChange={setConverterVariant} fullScreen onClose={()=>setFullPreview(false)}/>}
    <footer className="page-footer">Axolotl · Layouts · {category==='common'?'App Shell & Dashboard Grid':'Tools / Image Converter'} · {layout.gaps.default}px grid / {spacing[3]}px compact</footer>
  </div>
}
