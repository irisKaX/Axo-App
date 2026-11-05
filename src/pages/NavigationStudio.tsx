import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AxoIcon, type AxoIconName } from '../components/AxoIcon'
import { NavigationButton } from '../components/NavigationButton'
import { ThemeSwitch } from '../components/ThemeSwitch'
import { themes, type ThemeName } from '../design-system/foundations/colors'
import './navigation-studio.css'

type Menu = 'workspace' | 'media' | 'checks' | 'tabs' | 'notifications' | 'profile' | null
type IconName = 'home'|'work'|'media'|'shield'|'globe'|'copy'|'tabs'|'bell'|'gear'|'down'|'plus'|'check'|'arrow'|'document'
const iconAliases:Record<IconName,AxoIconName> = {
  home:'home',work:'workspace',media:'image',shield:'shield-check',globe:'globe',
  copy:'copy',tabs:'tabs',bell:'bell',gear:'settings',down:'chevron-down',
  plus:'plus',check:'check',arrow:'arrow-right',document:'file-text'
}
function Icon({name}:{name:IconName}){
  return <AxoIcon name={iconAliases[name]} size={17}/>
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
        <NavigationButton state={standalone ? 'current' : 'inactive'} shape="round" icon="home" className="nh-home" aria-label="Home" onClick={()=>{setOpen(null);setFeedback('Dashboard · ukázková navigace')}}/>
        <div className="nh-nav-set">
          {([['workspace','Můj workspace','work'],['media','Média','media'],['checks','Kontrola','shield']] as const).map(([id,label,icon])=><div className="nh-popup-anchor" key={id}>
            <NavigationButton state={open===id ? 'expanded' : 'inactive'} shape="label" className="nh-pill" icon={iconAliases[icon]} iconRight="chevron-down" aria-haspopup="menu" aria-expanded={open===id} onClick={()=>toggle(id)}>{label}</NavigationButton>
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
          <NavigationButton state={open==='notifications' ? 'expanded' : 'inactive'} shape="round" icon="bell" className="nh-circle" aria-haspopup="menu" aria-expanded={open==='notifications'} aria-label="Upozornění" onClick={()=>toggle('notifications')}/>
          {open==='notifications'&&<div className="nh-menu nh-menu-right" role="menu"><p>Upozornění</p>{groups.notifications.map(x=><span className="nh-menu-empty" key={x}>{x}</span>)}</div>}
        </div>
        <div className="nh-popup-anchor">
          <NavigationButton state={open==='profile' ? 'expanded' : 'inactive'} shape="round" icon="settings" className="nh-circle" aria-haspopup="menu" aria-expanded={open==='profile'} aria-label="Nastavení a profil" onClick={()=>toggle('profile')}/>
          {open==='profile'&&<div className="nh-menu nh-menu-right" role="menu">{groups.profile.map(x=><button role="menuitem" type="button" key={x} onClick={()=>{setFeedback(x+' · ukázka');setOpen(null)}}>{x}</button>)}</div>}
        </div>
        <div className="nh-theme"><ThemeSwitch theme={mode} onThemeChange={onModeChange} label="Tmavý režim"/></div>
      </header>
    </div>
    <div className={standalone?'nh-feedback nh-feedback-floating':'nh-feedback'} role="status" aria-live="polite">{feedback}</div>
  </div>
}

export default function NavigationStudio({theme,onThemeChange,onOpenDashboard}:{theme:ThemeName;onThemeChange:(mode:ThemeName)=>void;onOpenDashboard:()=>void}){
  return <div className="nh-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / NAVIGATION & HEADER</p>
    <h1>Navigation <span className="heading-accent">& Header.</span></h1>
    <p className="intro">Horizontal Workspace Navigation V2 · Clean Neo Iris. Jediná horizontální lišta bez sidebaru. Obsahuje logo, Home, pracovní nabídky, URL display, karty prohlížeče, indikátor, čas, upozornění, nastavení a již existující Theme Switch.</p>
    <div className="nh-status">DESIGN CANDIDATE · HORIZONTAL / SINGLE ROW · DARK & LIGHT</div>
    <div className="nh-open-dashboard"><button type="button" onClick={onOpenDashboard}>Otevřít Dashboard v reálné velikosti ↗</button><span>Bez sidebaru katalogu, celý viewport laptopu.</span></div>
    <section className="panel nh-panel">
      <div className="nh-heading"><span>01 / LIVE HEADER</span><h2>Horizontální navigace</h2><p>Režim ovládá globální přepínač katalogu a sdílený Theme Switch v náhledu. Pro skutečný náhled v plné šířce použij samostatnou sekci Dashboard.</p></div>
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
