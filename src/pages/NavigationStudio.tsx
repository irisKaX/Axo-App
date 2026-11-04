import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ThemeSwitch } from '../components/ThemeSwitch'
import { themes, type ThemeName } from '../design-system/foundations/colors'
import './navigation-studio.css'

type Menu = 'workspace' | 'media' | 'checks' | 'tabs' | 'notifications' | 'profile' | null
type IconName = 'home'|'work'|'media'|'shield'|'globe'|'copy'|'tabs'|'bell'|'gear'|'down'|'plus'|'check'|'arrow'|'document'
function Icon({name}: {name:IconName}) {
  const shapes:Record<IconName,ReactNode>={
    home:<><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/></>,
    work:<><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    media:<><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8" cy="9" r="1"/><path d="m3 17 6-5 4 3 3-4 5 5"/></>,
    shield:<><path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></>,
    globe:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18m0-18c5 5 5 13 0 18"/></>,
    copy:<><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
    tabs:<><rect x="6" y="6" width="15" height="15" rx="2"/><path d="M17 6V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2"/></>,
    bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    gear:<><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></>,
    down:<path d="m6 9 6 6 6-6"/>,
    plus:<path d="M12 5v14M5 12h14"/>,
    check:<path d="m5 12 4 4L19 6"/>,
    arrow:<path d="M5 12h14m-6-6 6 6-6 6"/>,
    document:<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>
}

const groups: Record<Exclude<Menu,null|'tabs'>,string[]> = {
  workspace:['Dashboard','Notebook','Projekty','Úkoly'],
  media:['Obrázky z URL','Konvertor WebP','PDF Scout','Screenshot Tool'],
  checks:['Metadata Check','Find Phrase','Strukturovaná data'],
  notifications:['Žádná nová upozornění'],
  profile:['Nastavení','Můj profil','Nápověda']
}
const browserTabs=[
  {title:'Oneplay',url:'https://www.o2.cz/osobni/oneplay'},
  {title:'Oneplay Sport',url:'https://www.o2.cz/osobni/oneplay/sport'},
  {title:'O2',url:'https://www.o2.cz/'}
]

export function HeaderPreview({mode,onModeChange,standalone=false}: {mode:ThemeName;onModeChange:(mode:ThemeName)=>void;standalone?:boolean}){
  const [open,setOpen]=useState<Menu>(null)
  const [activeTab,setActiveTab]=useState(0)
  const [feedback,setFeedback]=useState('')
  const [time,setTime]=useState(()=>new Date())
  const rootRef=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const update=()=>setTime(new Date())
    const id=window.setInterval(update,30000)
    return ()=>window.clearInterval(id)
  },[])
  useEffect(()=>{
    function onKey(event:KeyboardEvent){if(event.key==='Escape')setOpen(null)}
    function onPointer(event:MouseEvent){if(rootRef.current&&!rootRef.current.contains(event.target as Node))setOpen(null)}
    document.addEventListener('keydown',onKey)
    document.addEventListener('mousedown',onPointer)
    return ()=>{document.removeEventListener('keydown',onKey);document.removeEventListener('mousedown',onPointer)}
  },[])
  function toggle(menu:Exclude<Menu,null>){setOpen(current=>current===menu?null:menu);setFeedback('')}
  async function copyURL(){
    try{await navigator.clipboard.writeText(browserTabs[activeTab].url);setFeedback('URL zkopírována')}
    catch{setFeedback('Kopírování není dostupné')}
  }
  const tokens=themes[mode]
  const style={'--nh-canvas':tokens.canvas,'--nh-surface':tokens.surface,'--nh-subtle':tokens.subtle,'--nh-border':tokens.border,'--nh-text':tokens.text,'--nh-muted':tokens.muted,'--nh-focus':tokens.focusRing} as CSSProperties
  return <div className={'nh-stage is-'+mode+(standalone?' nh-standalone':'')} style={style} ref={rootRef}>
    {!standalone&&<div className="nh-stage-label">{mode==='dark'?'DARK MODE':'LIGHT MODE'} <span>Desktop preview · jedna řada</span></div>}
    <div className="nh-scroll">
      <header className="nh-header" aria-label="Ukázka horizontální navigace">
        <div className="nh-brand" aria-label="Axolotl">✳</div>
        <button type="button" className="nh-home" aria-label="Home" onClick={()=>{setOpen(null);setFeedback('Dashboard · ukázková navigace')}}><Icon name="home"/></button>
        <div className="nh-nav-set">
          {([['workspace','Můj workspace','work'],['media','Média','media'],['checks','Kontrola','shield']] as const).map(([id,label,icon])=><div className="nh-popup-anchor" key={id}>
            <button type="button" className={'nh-pill'+(open===id?' is-active':'')} aria-haspopup="menu" aria-expanded={open===id} onClick={()=>toggle(id)}><Icon name={icon}/><span>{label}</span><Icon name="down"/></button>
            {open===id&&<div className="nh-menu" role="menu">{groups[id].map(item=><button role="menuitem" type="button" key={item} onClick={()=>{setFeedback(item+' · ukázková navigace');setOpen(null)}}>{item}<Icon name="arrow"/></button>)}</div>}
          </div>)}
        </div>
        <div className="nh-url-zone">
          <div className="nh-url" role="group" aria-label="Aktuální URL prohlížeče">
            <Icon name="globe"/><span className="nh-url-text" title={browserTabs[activeTab].url}>{browserTabs[activeTab].url}</span>
            <button type="button" className="nh-url-action" aria-label="Kopírovat URL" title="Kopírovat URL" onClick={()=>void copyURL()}><Icon name="copy"/></button>
            <span className="nh-url-separator"/>
            <div className="nh-popup-anchor">
              <button type="button" className="nh-url-action" aria-label="Přepnout kartu prohlížeče" title="Přepnout kartu" aria-expanded={open==='tabs'} aria-haspopup="menu" onClick={()=>toggle('tabs')}><Icon name="tabs"/></button>
              {open==='tabs'&&<div className="nh-menu nh-tabs-menu" role="menu">{browserTabs.map((tab,index)=><button type="button" role="menuitemradio" aria-checked={activeTab===index} key={tab.url} onClick={()=>{setActiveTab(index);setOpen(null);setFeedback('')}}><span><strong>{tab.title}</strong><small>{tab.url}</small></span>{activeTab===index&&<Icon name="check"/>}</button>)}</div>}
            </div>
          </div>
          <span className="nh-indicator" title="Ukázkový indikátor stavu URL" aria-label="Ukázkový stav URL"/>
        </div>
        <div className="nh-clock"><strong>{time.toLocaleTimeString('cs-CZ',{hour:'2-digit',minute:'2-digit'})}</strong><small>{time.toLocaleDateString('cs-CZ',{day:'numeric',month:'numeric',year:'numeric'})}</small></div>
        <div className="nh-popup-anchor">
          <button type="button" className="nh-circle" aria-haspopup="menu" aria-expanded={open==='notifications'} aria-label="Upozornění" onClick={()=>toggle('notifications')}><Icon name="bell"/></button>
          {open==='notifications'&&<div className="nh-menu nh-menu-right" role="menu"><p>Upozornění</p>{groups.notifications.map(x=><span className="nh-menu-empty" key={x}>{x}</span>)}</div>}
        </div>
        <div className="nh-popup-anchor">
          <button type="button" className="nh-circle" aria-haspopup="menu" aria-expanded={open==='profile'} aria-label="Nastavení a profil" onClick={()=>toggle('profile')}><Icon name="gear"/></button>
          {open==='profile'&&<div className="nh-menu nh-menu-right" role="menu">{groups.profile.map(x=><button role="menuitem" type="button" key={x} onClick={()=>{setFeedback(x+' · ukázka');setOpen(null)}}>{x}</button>)}</div>}
        </div>
        <div className="nh-theme"><ThemeSwitch theme={mode} onThemeChange={onModeChange} label="Tmavý režim"/></div>
      </header>
    </div>
    <div className={standalone?'nh-feedback nh-feedback-floating':'nh-feedback'} role="status" aria-live="polite">{feedback}</div>
  </div>
}

export default function NavigationStudio({theme,onThemeChange}:{theme:ThemeName;onThemeChange:(mode:ThemeName)=>void}){
  return <div className="nh-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / NAVIGATION & HEADER</p>
    <h1>Navigation <span className="heading-accent">& Header.</span></h1>
    <p className="intro">Horizontal Workspace Navigation V2 · Clean Neo Iris. Jediná horizontální lišta bez sidebaru. Obsahuje logo, Home, pracovní nabídky, URL display, karty prohlížeče, indikátor, čas, upozornění, nastavení a již existující Theme Switch.</p>
    <div className="nh-status">DESIGN CANDIDATE · HORIZONTAL / SINGLE ROW · DARK & LIGHT</div>
    <section className="panel nh-panel">
      <div className="nh-heading"><span>01 / LIVE HEADER</span><h2>Horizontální navigace</h2><p>Režim ovládá globální přepínač katalogu a sdílený Theme Switch v náhledu. Při zúženém náhledu lze ukázkovou lištu horizontálně posunout, cílové desktopové rozložení však scrollbar mít nemá.</p></div>
      <HeaderPreview mode={theme} onModeChange={onThemeChange}/>
    </section>
    <section className="panel nh-panel">
      <div className="nh-heading"><span>02 / ANATOMY</span><h2>Komponenty a chování</h2><p>Dropdowny vycházejí ze způsobu ovládání selectu v Inputs & Forms. Jde o koncepční navigační menu, nikoliv další samostatný select.</p></div>
      <div className="nh-anatomy">
        <div><strong>Brand & navigace</strong><p>Logo · Home · Můj workspace · Média · Kontrola</p></div>
        <div><strong>URL Display</strong><p>Read-only URL · Copy · přepínač otevřených karet · stavový indikátor</p></div>
        <div><strong>Utility</strong><p>Aktuální čas a datum · upozornění · nastavení/profil · Theme Switch</p></div>
      </div>
      <p className="nh-note">V tomto náhledu jsou URL a stav indikátoru ukázkové. Přepínač karet URL pouze mění v demonstraci, skutečné karty prohlížeče nelze z běžné webové aplikace automaticky vyčítat. Pro produkční integraci bude potřeba vlastní správa pracovních URL.</p>
    </section>
    <footer className="page-footer">Axolotl · Navigation & Header V2 · Clean Neo Iris · návrh k vizuálnímu schválení</footer>
  </div>
}
