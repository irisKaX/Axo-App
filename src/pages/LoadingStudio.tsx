import { useState, type CSSProperties } from 'react'
import { themes, type ThemeName } from '../design-system/foundations/colors'
import './loading-studio.css'

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
function LoadingStage({theme,paused}:{theme:ThemeName;paused:boolean}){
  const t=themes[theme]
  const [progress,setProgress]=useState(65)
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
    </div>
  </div>
}
export default function LoadingStudio({theme}:{theme:ThemeName}){
  const [paused,setPaused]=useState(false)
  return <div className="ld-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / FEEDBACK & STATUS / LOADING & PROGRESS</p>
    <h1>Loading <span className="heading-accent">& Progress.</span></h1>
    <p className="intro">Clean Neo Iris · návrhy animací a stavů načítání. První dva loadery vycházejí z dodaných CSS referencí, upravených do barev Axolotlu. Zachované komponenty 01 až 06 pokrývají načítání obsahu i průběh operací.</p>
    <div className="ld-status">SIX APPROVED LOADING COMPONENTS</div>
    <section className="panel ld-panel">
      <div className="ld-section-head"><span>01 / APPROVED LOADERS</span><h2>Knihovna loaderů</h2><p>Všechny animace můžeš pozastavit. Vzhled se řídí globálním přepínačem motivu katalogu.</p></div>
      <div className="ld-toolbar"><button type="button" className="ld-reset" onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?'Spustit animace':'Pozastavit animace'}</button><span>Respektujeme nastavení omezeného pohybu.</span></div>
      <LoadingStage theme={theme} paused={paused}/>
    </section>
    <footer className="page-footer">Axolotl · Feedback & Status / Loading & Progress · Clean Neo Iris · Návrh k vizuálnímu schválení</footer>
  </div>
}
