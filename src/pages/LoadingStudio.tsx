import { useState, type CSSProperties, type ReactNode } from 'react'
import { themes, type ThemeName } from '../design-system/foundations/colors'
import './loading-studio.css'

type LoaderKind = 'gradient' | 'blades' | 'dots'
function GradientLoader({size=40}:{size?:number}) {
  return <span className="ld-gradient" style={{'--ld-size':size+'px'} as CSSProperties} aria-hidden="true"/>
}
function BladeLoader({size=32}:{size?:number}) {
  return <span className="ld-blades" style={{'--ld-size':size+'px'} as CSSProperties} aria-hidden="true">
    {Array.from({length:12},(_,i)=><i key={i} style={{'--blade-index':i} as CSSProperties}/>)}
  </span>
}
function DotsLoader() {
  return <span className="ld-dots" aria-hidden="true"><i/><i/><i/></span>
}
function Spinner({kind,size}:{kind:LoaderKind;size?:number}):ReactNode{
  if(kind==='gradient')return <GradientLoader size={size}/>
  if(kind==='blades')return <BladeLoader size={size}/>
  return <DotsLoader/>
}
function LoadingStage({theme,paused}:{theme:ThemeName;paused:boolean}){
  const t=themes[theme]
  const [progress,setProgress]=useState(65)
  const [buttonLoading,setButtonLoading]=useState(false)
  const [overlay,setOverlay]=useState(false)
  const [kind,setKind]=useState<LoaderKind>('gradient')
  const vars={'--ld-bg':t.canvas,'--ld-surface':t.surface,'--ld-subtle':t.subtle,'--ld-border':t.border,'--ld-text':t.text,'--ld-muted':t.muted,'--ld-accent':t.brand,'--ld-focus':t.focusRing} as CSSProperties
  return <div className={'ld-stage is-'+theme+(paused?' is-paused':'')} style={vars}>
    <div className="ld-stage-label"><span>{theme==='dark'?'DARK MODE':'LIGHT MODE'}</span><span>Clean Neo Iris</span></div>
    <div className="ld-demo-grid">
      <article className="ld-demo">
        <div className="ld-demo-head"><strong>01 / Gradient Ring</strong><small>Dodaná reference · 40 px</small></div>
        <div className="ld-display"><GradientLoader/></div>
        <p>Rotující gradientový prstenec s čistým středem. Barvy Blue × Purple.</p>
      </article>
      <article className="ld-demo">
        <div className="ld-demo-head"><strong>02 / Blade Spinner</strong><small>Dodaná reference · 12 lamel</small></div>
        <div className="ld-display"><BladeLoader size={36}/></div>
        <p>Postupné zhasínání dvanácti segmentů. Odstíny přebírá z motivu.</p>
      </article>
      <article className="ld-demo">
        <div className="ld-demo-head"><strong>03 / Dots</strong><small>Krátké čekání</small></div>
        <div className="ld-display"><DotsLoader/></div>
        <p>Tři jemně pulzující tečky pro nenápadné načítací stavy.</p>
      </article>
      <article className="ld-demo">
        <div className="ld-demo-head"><strong>04 / Circular Progress</strong><small>Určitý průběh</small></div>
        <div className="ld-display"><div className="ld-circular" style={{background:'conic-gradient(#7C4BFE '+progress+'%, var(--ld-subtle) 0)'}}><div><strong>{progress}%</strong></div></div></div>
        <label className="ld-progress-label" htmlFor={'ld-circular-'+theme}>Dokončeno: {progress}%</label>
        <input id={'ld-circular-'+theme} className="ld-range" type="range" min="0" max="100" value={progress} onChange={e=>setProgress(Number(e.target.value))}/>
      </article>
      <article className="ld-demo ld-wide">
        <div className="ld-demo-head"><strong>05 / Skeleton</strong><small>Načítání obsahu</small></div>
        <div className="ld-skeleton"><div className="ld-skeleton-icon"/><div className="ld-skeleton-text"><i/><i/><i/></div></div>
        <p>Struktura karty zůstává stabilní. Bez barevného podkladu za skutečnými ikonami.</p>
      </article>
      <article className="ld-demo ld-wide">
        <div className="ld-demo-head"><strong>06 / Linear Progress</strong><small>Nahrávání a konverze</small></div>
        <div className="ld-linear-head"><span>Konverze souborů</span><strong>{progress}%</strong></div>
        <div className="ld-linear" role="progressbar" aria-label="Ukázkový průběh konverze" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{width:progress+'%'}}/></div>
        <p>Stejná hodnota jako u kruhového progressu, nastavitelná posuvníkem výše.</p>
      </article>
      <article className="ld-demo ld-wide">
        <div className="ld-demo-head"><strong>07 / Button Loader</strong><small>Stav existující akce</small></div>
        <div className="ld-button-row"><button className="ld-primary" type="button" disabled={buttonLoading} onClick={()=>setButtonLoading(true)}>{buttonLoading?<><BladeLoader size={18}/> Zpracovávám…</>:'Spustit analýzu'}</button><button className="ld-reset" type="button" onClick={()=>setButtonLoading(false)}>Reset</button></div>
        <p>Zobrazení průběhu zablokuje opakované spuštění akce. Zde jde o ručně ovládanou ukázku.</p>
      </article>
      <article className="ld-demo ld-wide">
        <div className="ld-demo-head"><strong>08 / Full-page Loader</strong><small>Inicializace aplikace</small></div>
        <div className="ld-overlay-controls"><label htmlFor={'ld-kind-'+theme}>Typ loaderu</label><select id={'ld-kind-'+theme} value={kind} onChange={e=>setKind(e.target.value as LoaderKind)}><option value="gradient">Gradient Ring</option><option value="blades">Blade Spinner</option><option value="dots">Dots</option></select><button type="button" className="ld-reset" onClick={()=>setOverlay(true)}>Zobrazit ukázku</button></div>
        <div className="ld-overlay-scene">
          <div className="ld-mock-header"><span>Axolotl</span><span>Workspace</span></div>
          <div className="ld-mock-body"><i/><i/><i/></div>
          {overlay&&<div className="ld-overlay" role="status" aria-label="Ukázka načítání celé aplikace"><Spinner kind={kind} size={40}/><strong>Načítám workspace…</strong><button type="button" onClick={()=>setOverlay(false)}>Zavřít ukázku</button></div>}
        </div>
      </article>
    </div>
  </div>
}
export default function LoadingStudio({theme}:{theme:ThemeName}){
  const [paused,setPaused]=useState(false)
  const [size,setSize]=useState(40)
  return <div className="ld-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / FEEDBACK & STATUS / LOADING & PROGRESS</p>
    <h1>Loading <span className="heading-accent">& Progress.</span></h1>
    <p className="intro">Clean Neo Iris · návrhy animací a stavů načítání. První dva loadery vycházejí z dodaných CSS referencí, upravených do barev Axolotlu. Ostatní ukázky pokrývají časté situace v nástrojích a dashboardu.</p>
    <div className="ld-status">DESIGN CANDIDATE · DARK / LIGHT · LIVE STATES</div>
    <section className="panel ld-panel">
      <div className="ld-section-head"><span>01 / LOADER LIBRARY</span><h2>Knihovna loaderů</h2><p>Všechny animace můžeš pozastavit. Vzhled se řídí globálním přepínačem motivu katalogu.</p></div>
      <div className="ld-toolbar"><button type="button" className="ld-reset" onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?'Spustit animace':'Pozastavit animace'}</button><span>Respektujeme nastavení omezeného pohybu.</span></div>
      <LoadingStage theme={theme} paused={paused}/>
    </section>
    <section className="panel ld-panel">
      <div className="ld-section-head"><span>02 / SIZE SYSTEM</span><h2>Velikosti komponent</h2><p>Jeden loader používáme ve více kontextech. Základní referenční kruh má 40 px.</p></div>
      <div className="ld-size-controls"><label htmlFor="ld-size">Velikost: <strong>{size} px</strong></label><input id="ld-size" type="range" min="20" max="64" step="2" value={size} onChange={e=>setSize(Number(e.target.value))}/></div>
      <div className={'ld-size-sample'+(paused?' is-paused':'')}><GradientLoader size={size}/><BladeLoader size={size}/><span>Ring / Blades</span></div>
    </section>
    <section className="panel ld-panel">
      <div className="ld-section-head"><span>03 / IMPLEMENTATION RULES</span><h2>Pravidla použití</h2></div>
      <div className="ld-guidelines">
        <div><strong>Indeterminate</strong><p>Spinner nebo Dots, když neznáme přesnou dobu načítání. Přístupný stav popsat textem nebo stavovým oznámením.</p></div>
        <div><strong>Determinate</strong><p>Progress Bar a Circular Progress zobrazují skutečné procento. Nikdy nevymýšlet průběh dokončení.</p></div>
        <div><strong>Skeleton</strong><p>Pro načítání obsahu zachová rozměry cílové karty a minimalizuje posouvání rozhraní.</p></div>
        <div><strong>Reduced motion</strong><p>Animace se vypnou; textové označení načítání a stavové informace zůstanou čitelné.</p></div>
      </div>
      <p className="ld-footnote">Samostatné příklady jsou pouze katalogové ukázky. Nenahrazují existující Button, Card ani Widget komponenty a neodesílají žádná data.</p>
    </section>
    <footer className="page-footer">Axolotl · Feedback & Status / Loading & Progress · Clean Neo Iris · Návrh k vizuálnímu schválení</footer>
  </div>
}
