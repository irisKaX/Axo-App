import { useState, type CSSProperties } from 'react'
import { AxoIcon, type AxoIconName } from '../components/AxoIcon'
import { themes } from '../design-system/foundations/colors'
import './cards-studio.css'

type PreviewMode = 'dark' | 'light'
type CardKind = 'base' | 'interactive' | 'tool' | 'widget'
const specimens: { id: CardKind; number: string; name: string; summary: string; usage: string; states: string }[] = [
  { id:'base', number:'01', name:'Base Card', summary:'Neutrální plocha pro obsah a dokumentaci. Bez dekorativních efektů a bez hoveru.', usage:'Poznámky, informace, statické přehledy', states:'Default · Nested' },
  { id:'interactive', number:'02', name:'Interactive Card', summary:'Stejný základ jako Base Card, ale s jasnou odezvou při interakci.', usage:'Navigace, výběr sekce, otevření detailu', states:'Default · Hover · Focus · Selected · Disabled' },
  { id:'tool', number:'03', name:'Tool Card', summary:'Katalog nástrojů s nezakrytou ikonou, názvem, popisem a akcí.', usage:'Tools, oblíbené nástroje, rychlé spuštění', states:'Default · Hover · Favorite · Disabled' },
  { id:'widget', number:'04', name:'Widget Container', summary:'Jednotný rám pro obsah widgetů bez zbytečné dekorace.', usage:'Dashboard · Small / Large · Vlastní obsah', states:'Default · Loading · Empty · Success · Error' }
]

type CardIconKind = 'grid'|'search'|'qr'|'arrow'|'star'|'more'
const cardIconAliases:Record<CardIconKind,AxoIconName> = {
  grid:'layout-grid',search:'search',qr:'qr-code',arrow:'arrow-right',star:'star',more:'more-horizontal'
}
function Glyph({kind}:{kind:CardIconKind}){
  return <AxoIcon name={cardIconAliases[kind]} size={22}/>
}

function PreviewCard({kind,mode}: {kind:CardKind;mode:PreviewMode}) {
  const [selected,setSelected]=useState(false)
  const [favorite,setFavorite]=useState(false)
  const [widgetStatus,setWidgetStatus]=useState<'ready'|'generated'>('ready')
  const [menuOpen,setMenuOpen]=useState(false)
  if(kind==='base') return <article className="cs-card cs-base">
    <div className="cs-eyebrow">PROJECT OVERVIEW</div>
    <h3>Přehled projektu</h3>
    <p>Všechny důležité informace o projektu na jednom místě.</p>
    <div className="cs-static-meta"><span>Poslední úprava</span><strong>Dnes</strong></div>
  </article>
  if(kind==='interactive') return <button type="button" aria-pressed={selected} onClick={()=>setSelected(v=>!v)} className={'cs-card cs-interactive'+(selected?' is-selected':'')}>
    <span className="cs-card-top"><span className="cs-icon"><Glyph kind="grid"/></span><span className="cs-arrow"><Glyph kind="arrow"/></span></span>
    <h3>Workspace</h3>
    <p>Otevři pracovní prostředí, poznámky a poslední projekty.</p>
    <span className="cs-selection">{selected?'Vybráno · klikni znovu pro zrušení':'Kliknutím vyber kartu'}</span>
  </button>
  if(kind==='tool') return <article className="cs-card cs-tool">
    <div className="cs-tool-top"><span className="cs-icon"><Glyph kind="search"/></span><button className={'cs-favorite'+(favorite?' is-favorite':'')} type="button" aria-label={favorite?'Odebrat z oblíbených':'Přidat do oblíbených'} aria-pressed={favorite} onClick={()=>setFavorite(v=>!v)}><Glyph kind="star"/></button></div>
    <h3>Find Phrase</h3>
    <p>Vyhledej výskyty slov a frází přímo na webové stránce.</p>
    <div className="cs-tool-footer"><span>SEO · Content tools</span><button type="button" className="cs-open-tool" onClick={e=>{e.currentTarget.textContent='Ukázka spuštění ✓'}}>Spustit <Glyph kind="arrow"/></button></div>
  </article>
  return <article className="cs-card cs-widget">
    <div className="cs-widget-header"><span className="cs-widget-title"><Glyph kind="qr"/> QR Generator</span><div className="cs-widget-actions"><button aria-expanded={menuOpen} aria-label="Možnosti widgetu" type="button" onClick={()=>setMenuOpen(v=>!v)}><Glyph kind="more"/></button>{menuOpen&&<div className="cs-menu"><button type="button" onClick={()=>{setWidgetStatus('ready');setMenuOpen(false)}}>Reset ukázky</button></div>}</div></div>
    <div className="cs-widget-body"><label htmlFor={'cs-url-'+mode}>URL adresa</label><input id={'cs-url-'+mode} type="url" defaultValue="https://www.o2.cz" aria-label="Ukázková URL"/><p>{widgetStatus==='generated'?'QR kód je připravený (ukázkový stav).':'Vlož odkaz pro vytvoření QR kódu.'}</p></div>
    <div className="cs-widget-footer"><span className="cs-widget-state"><i/>{widgetStatus==='generated'?'Hotovo':'Připraveno'}</span><button type="button" onClick={()=>setWidgetStatus(v=>v==='ready'?'generated':'ready')}>{widgetStatus==='generated'?'Znovu':'Generovat'} <Glyph kind="arrow"/></button></div>
  </article>
}
function Stage({kind,mode}: {kind:CardKind;mode:PreviewMode}) {
  const t=themes[mode]
  return <div className={'cs-stage is-'+mode} style={{'--cs-surface':t.surface,'--cs-canvas':t.canvas,'--cs-border':t.border,'--cs-text':t.text,'--cs-muted':t.muted,'--cs-subtle':t.subtle,'--cs-focus':t.focusRing} as CSSProperties}>
    <div className="cs-stage-title"><span className="cs-stage-dot"/>{mode==='dark'?'DARK MODE':'LIGHT MODE'}</div>
    <PreviewCard kind={kind} mode={mode}/>
  </div>
}
export default function CardsStudio({theme}:{theme:PreviewMode}){
  return <div className="cs-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / CARDS & CONTAINERS</p>
    <h1>Cards <span className="heading-accent">& Containers.</span></h1>
    <p className="intro">Clean Neo Iris · V2. Jednotné, čisté plochy pro obsah, navigaci, nástroje a widgety. Bez pozadí za ikonami a bez barevných linek na jediné straně karty.</p>
    <div className="cs-status">V2 DESIGN CANDIDATE · DARK / LIGHT · INTERACTIVE PREVIEW</div>
    {specimens.map(item=><section className="panel cs-section" key={item.id}>
      <div className="cs-section-head"><span>{item.number} / {item.name.toUpperCase()}</span><h2>{item.name}</h2><p>{item.summary}</p></div>
      <div className="cs-grid"><Stage kind={item.id} mode={theme}/></div>
      <div className="cs-notes"><span><strong>Použití:</strong> {item.usage}</span><span><strong>Stavy:</strong> {item.states}</span></div>
    </section>)}
    <section className="panel cs-section">
      <div className="cs-section-head"><span>05 / FOUNDATION RULES</span><h2>Společná geometrie</h2><p>Podklad k vizuálnímu schválení, postavený na existujících tokenech. Hranice karty musí vždy obepínat celý její obvod.</p></div>
      <div className="cs-rules">
        <div><span>Radius</span><strong>radius.lg · 24 px</strong></div>
        <div><span>Padding</span><strong>24 px / compact 16 px</strong></div>
        <div><span>Border</span><strong>1 px · celý obvod</strong></div>
        <div><span>Barvy</span><strong>themes.dark / themes.light</strong></div>
        <div><span>Ikony</span><strong>Bez dekorativního podkladu</strong></div>
        <div><span>Hover</span><strong>Jen klikací karty</strong></div>
      </div>
      <p className="cs-guidance">Widget Container je strukturální plocha. Vlastní logika QR, Notebooku nebo Screenshot Toolu do něj bude vložena až později. Akce v této sekci jsou pouze interaktivní ukázky.</p>
    </section>
    <footer className="page-footer">Axolotl · Cards & Containers V2 · Clean Neo Iris · Návrh k vizuálnímu schválení</footer>
  </div>
}
