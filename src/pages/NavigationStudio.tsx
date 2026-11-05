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
          {([['workspace','Workspace'],['media','Tools'],['checks','SEO check']] as const).map(([id,label])=><div className="nh-popup-anchor" key={id}>
            <NavigationButton state={open===id ? 'expanded' : 'inactive'} shape="label" className="nh-pill" iconRight="chevron-down" aria-haspopup="menu" aria-expanded={open===id} onClick={()=>toggle(id)}>{label}</NavigationButton>
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
        <div className="nh-popup-anchor nh-alert-anchor">
          <NavigationButton state={open==='notifications' ? 'expanded' : 'inactive'} shape="round" icon="bell" className="nh-circle" aria-haspopup="menu" aria-expanded={open==='notifications'} aria-label="Upozornění" onClick={()=>toggle('notifications')}/>
          {open==='notifications'&&<div className="nh-menu nh-menu-right" role="menu"><p>Upozornění</p>{groups.notifications.map(x=><span className="nh-menu-empty" key={x}>{x}</span>)}</div>}
        </div>
        <div className="nh-popup-anchor nh-settings-anchor">
          <NavigationButton state={open==='profile' ? 'expanded' : 'inactive'} shape="round" icon="settings" className="nh-circle" aria-haspopup="menu" aria-expanded={open==='profile'} aria-label="Nastavení a profil" onClick={()=>toggle('profile')}/>
          {open==='profile'&&<div className="nh-menu nh-menu-right" role="menu">{groups.profile.map(x=><button role="menuitem" type="button" key={x} onClick={()=>{setFeedback(x+' · ukázka');setOpen(null)}}>{x}</button>)}</div>}
        </div>
        <div className="nh-theme"><ThemeSwitch theme={mode} onThemeChange={onModeChange} label="Tmavý režim"/></div>
      </header>
    </div>
    <div className={standalone?'nh-feedback nh-feedback-floating':'nh-feedback'} role="status" aria-live="polite">{feedback}</div>
  </div>
}

const navigationStates = [
  { state: 'inactive', label: 'Inactive', description: 'Fialové pozadí' },
  { state: 'current', label: 'Current', description: 'Aktuální stránka · Orbital Glow' },
  { state: 'expanded', label: 'Expanded', description: 'Otevřená nabídka · zvýraznění' },
] as const

function NavigationButtonGallery({ mode }: { mode: ThemeName }) {
  const [sample, setSample] = useState('')
  const t = themes[mode]
  const style = {
    '--nh-canvas': t.canvas,
    '--nh-surface': t.surface,
    '--nh-subtle': t.subtle,
    '--nh-border': t.border,
    '--nh-text': t.text,
    '--nh-muted': t.muted,
    '--nh-focus': t.focusRing,
  } as CSSProperties
  return <div className={'nh-stage nh-gallery-stage is-' + mode} style={style}>
    <div className="nh-gallery-grid">
      <div className="nh-gallery-row">
        <p className="nh-gallery-row-heading">01 / KULATÁ NAVIGACE <span>38 × 38 px</span></p>
        {navigationStates.map(({ state, label, description }) =>
          <div className="nh-gallery-specimen" key={state}>
            <NavigationButton shape="round" state={state} icon="home" aria-label={'Home · ' + label}
              onClick={() => setSample('Kulaté tlačítko · ' + label)} />
            <div><strong>{label}</strong><small>{description}</small></div>
          </div>
        )}
      </div>
      <div className="nh-gallery-row">
        <p className="nh-gallery-row-heading">02 / TEXTOVÁ NAVIGACE <span>výška 38 px</span></p>
        {navigationStates.map(({ state, label, description }) =>
          <div className="nh-gallery-specimen" key={state}>
            <NavigationButton shape="label" state={state} iconRight="chevron-down"
              aria-label={'Workspace · ' + label}
              aria-expanded={state === 'expanded'}
              onClick={() => setSample('Textové tlačítko · ' + label)}>Workspace</NavigationButton>
            <div><strong>{label}</strong><small>{description}</small></div>
          </div>
        )}
      </div>
    </div>
    <p className="nh-gallery-feedback" role="status">{sample ? 'Vybraná ukázka: ' + sample : 'Kliknutím na ukázku označíš stav k porovnání.'}</p>
  </div>
}

export default function NavigationStudio({theme,onThemeChange,onOpenDashboard}:{theme:ThemeName;onThemeChange:(mode:ThemeName)=>void;onOpenDashboard:()=>void}){
  return <div className="nh-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / NAVIGATION & HEADER</p>
    <h1>Navigation <span className="heading-accent">& Header.</span></h1>
    <p className="intro">Schválená horizontální navigace Axolotl Workspace. Jeden řádek bez sidebaru, jednotná výška ovládacích prvků a vlastní NavigationButton s oddělenými stavy stránky a rozbaleného menu.</p>
    <div className="nh-status">APPROVED · HORIZONTAL HEADER · DARK & LIGHT</div>
    <div className="nh-open-dashboard"><button type="button" onClick={onOpenDashboard}>Otevřít Dashboard v reálné velikosti ↗</button><span>Bez sidebaru katalogu, celý viewport laptopu.</span></div>
    <section className="panel nh-panel">
      <div className="nh-heading"><span>01 / LIVE HEADER</span><h2>Horizontální navigace</h2><p>Režim ovládá globální přepínač katalogu a sdílený Theme Switch v náhledu. Pro skutečný náhled v plné šířce použij samostatnou sekci Dashboard.</p></div>
      <HeaderPreview mode={theme} onModeChange={onThemeChange}/>
    </section>
    <section className="panel nh-panel">
      <div className="nh-heading"><span>02 / NAVIGATION BUTTONS</span><h2>NavigationButton · stavy a tvary</h2><p>Samostatná komponenta. Všechna navigační tlačítka včetně Upozornění a Nastavení používají stejné fialové pozadí jako přepínač motivu podle Light/Dark režimu. Current používá existující animovaný Orbital Glow z Primary 2, Expanded označuje právě otevřené menu. URL display má neutrální Surface výplň a fialový 2px border. Všechny varianty mají výšku 38 px.</p></div>
      <NavigationButtonGallery mode={theme}/>
    </section>
    <section className="panel nh-panel">
      <div className="nh-heading"><span>03 / ANATOMY</span><h2>Komponenty a chování</h2><p>Dropdowny vycházejí ze způsobu ovládání selectu v Inputs & Forms. Jde o koncepční navigační menu, nikoliv další samostatný select.</p></div>
      <div className="nh-anatomy">
        <div><strong>Brand & navigace</strong><p>Logo · Home · Workspace · Tools · SEO check</p></div>
        <div><strong>URL Display</strong><p>Read-only URL · Copy · přepínač otevřených karet · stavový indikátor</p></div>
        <div><strong>Utility</strong><p>Aktuální čas a datum · upozornění · nastavení/profil · Theme Switch</p></div>
      </div>
      <p className="nh-note">V tomto náhledu jsou URL a stav indikátoru ukázkové. Přepínač karet URL pouze mění v demonstraci, skutečné karty prohlížeče nelze z běžné webové aplikace automaticky vyčítat. Pro produkční integraci bude potřeba vlastní správa pracovních URL.</p>
    </section>
    <section className="panel nh-panel">
      <div className="nh-heading"><span>04 / APPROVED SPECIFICATION</span><h2>Schválená pravidla headeru</h2><p>Implementační kontrakt pro další stránky Axolotlu. Žádné samostatné varianty barev, jiná výška tlačítek ani vlastní obrysy v jednotlivých nástrojích.</p></div>
      <div className="nh-spec-grid">
        <article className="nh-spec-item">
          <strong>Struktura a plocha</strong>
          <p>Horizontální navigace bez sidebaru. V Dashboardu nemá header vlastní pozadí, border ani stín. Hlavní aplikační Canvas v Dark Mode je <code>#090B10</code>. V katalogu je header zobrazen uvnitř odděleného demonstračního rámečku.</p>
          <code>HeaderPreview · DashboardStudio</code>
        </article>
        <article className="nh-spec-item">
          <strong>Jednotná geometrie</strong>
          <p>Textová i kulatá navigační tlačítka, URL display i Theme Switch mají výšku <strong>38 px</strong>. Kulatá tlačítka mají 38 × 38 px. Text tlačítek a URL je 11 px. Všechny prvky jsou v jedné optické ose.</p>
          <code>NavigationButton · controls.default</code>
        </article>
        <article className="nh-spec-item">
          <strong>NavigationButton / Inactive</strong>
          <p>Všechna tlačítka včetně Home, Upozornění a Nastavení mají stejnou fialovou výplň z Theme Switch, podle Light/Dark režimu. Textová tlačítka jsou bez počátečních ikon; pouze centrovaný text a pravý chevron.</p>
          <code>--axo-switch-dark-background · --axo-switch-light-background</code>
        </article>
        <article className="nh-spec-item">
          <strong>NavigationButton / Current</strong>
          <p>Aktuální stránka používá <strong>Orbital Glow z Primary 2</strong>, nikoli bílý outline. Current určuje skutečně zobrazená stránka. Zároveň se nastavuje <code>aria-current="page"</code>. Pressed, hover a expanded nejsou totéž co Current.</p>
          <code>state="current" · AxoButton primary-2</code>
        </article>
        <article className="nh-spec-item">
          <strong>Expanded, hover a fokus</strong>
          <p>Otevřené menu používá 2px zvýraznění Surface z aktuálního tématu. Hover zachová fialovou paletu. Keyboard focus zůstává viditelný a není zaměnitelný za Expanded. Menu má <code>aria-expanded</code> a zavírá se Escape nebo kliknutím mimo.</p>
          <code>state="expanded" · :focus-visible · aria-expanded</code>
        </article>
        <article className="nh-spec-item">
          <strong>URL display</strong>
          <p>Pouze read-only adresa, nikoli editovatelný input. Pružně zabírá volné místo. Má výšku 38 px, výplň <strong>Surface #141820</strong> v Dark Mode a 2px fialový border. Obsahuje ikonu, zkrácenou URL, Copy, oddělovač, Tabs a samostatný indikátor.</p>
          <code>.nh-url-zone · .nh-url · theme.surface</code>
        </article>
        <article className="nh-spec-item">
          <strong>URL akce a tooltipy</strong>
          <p>Copy a Tabs nemění při hoveru barvu pozadí. Natočí pouze ikonku o −9° s plynulým přechodem a respektují reduced motion. Tooltipy kulatých NavigationButton se zobrazují <strong>pod tlačítky</strong>, aby neutíkaly mimo horní okraj okna.</p>
          <code>.nh-url-action · .nav-button--round</code>
        </article>
        <article className="nh-spec-item">
          <strong>Pomocné ovládací prvky</strong>
          <p>Pořadí: logo, Home, Workspace, Tools, SEO check, URL, stavový indikátor, čas/datum, Upozornění, Nastavení a Theme Switch. Ikonky používají AxoIcon. Theme Switch je jediný sdílený přepínač s fialovou kolejnicí a žlutým sluncem/měsícem.</p>
          <code>NavigationStudio · ThemeSwitch · AxoIcon</code>
        </article>
        <article className="nh-spec-item">
          <strong>Responzivita a vrstva menu</strong>
          <p>Desktop má jednu řadu. Na menším viewportu se hlavička zalomí, ale ovládací prvky si ponechávají správnou výšku. Dropdowny a tooltipy nesmí být schované pod Dashboardem. Nesmí vznikat prázdná mezera omezením maximální šířky URL.</p>
          <code>navigation-studio.css · dashboard-studio.css</code>
        </article>
        <article className="nh-spec-item">
          <strong>Rozsah demonstrace</strong>
          <p>Současná navigace je živý návrh komponent: dropdowny, kopírování a Theme Switch fungují. Vzorkové URL a indikátor jsou demonstrační. Pro budoucí produkční směrování bude Current vycházet z routeru a seznam URL z dat aplikace, nikoli z fiktivních karet prohlížeče.</p>
          <code>HeaderPreview · NavigationButtonProps</code>
        </article>
      </div>
      <div className="nh-spec-rule"><strong>Pravidlo údržby</strong><p>NavigationButton vychází z AxoButton, ale jeho stav se řídí samostatně. Pro nový nástroj nepřidávat lokální CSS kopie barev ani jiný button preset. Všechny barevné role, gradienty a efekty jsou evidované také ve Foundations → Colors.</p></div>
    </section>
    <footer className="page-footer">Axolotl · Navigation & Header · Schváleno · Design System</footer>
  </div>
}
