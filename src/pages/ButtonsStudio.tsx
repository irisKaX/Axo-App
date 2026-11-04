import { useState } from 'react'
import { AxoButton, ButtonIcon, buttonVariants, type ButtonVariant } from '../components/Buttons'
import { controls } from '../design-system/foundations/spacing'
import './buttons-studio.css'

const titles: Record<ButtonVariant,string> = {
  primary:'Primary',gradient:'Gradient','gradient-reveal':'Gradient Reveal',
  secondary:'Secondary',ghost:'Ghost',outline:'Outline',
  'accent-outline':'Accent Outline',danger:'Danger'
}
const descriptions: Record<ButtonVariant,string> = {
  primary:'Hlavní akce na stránce.',
  gradient:'Schválený Blue × Purple gradient.',
  'gradient-reveal':'Gradientový obvod s plynulým odhalením výplně.',
  secondary:'Vedlejší akce.',
  ghost:'Nenápadná akce.',
  outline:'Neutrální obrys.',
  'accent-outline':'Výrazná fialová kontura s jemným hoverem.',
  danger:'Destruktivní akce.'
}
const roundIcons = ['plus','copy','download','arrow-right','check','trash','refresh','settings','close'] as const

export default function ButtonsStudio() {
  const [note,setNote]=useState('Vyzkoušej schválené komponenty.')
  const [motionEnabled,setMotionEnabled]=useState(true)
  const [copied,setCopied]=useState(false)

  async function copyText(){
    try{
      await navigator.clipboard.writeText('https://iriskax.github.io/Axo-App/')
      setCopied(true)
      setNote('URL zkopírována do schránky.')
    }catch{setNote('Kopírování není dostupné.')}
  }
  function downloadSample(){
    const blob=new Blob(['Axolotl · ukázkový soubor\n'],{type:'text/plain;charset=utf-8'})
    const url=URL.createObjectURL(blob)
    const a=document.createElement('a')
    a.href=url
    a.download='axolotl-sample.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    setNote('Soubor byl připraven ke stažení.')
  }

  return <div className="bs-page">
    <p className="eyebrow">LIBRARY / BUTTONS</p>
    <h1>Buttons<span className="heading-accent">.</span></h1>
    <p className="intro">Jednotná knihovna tlačítek Clean Neo Iris. Používáme pouze velikosti Compact a Default a zachováváme schválené animace ikon.</p>
    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>01 / VARIANTS</span><h2>Hierarchie akcí</h2><p>Primární, sekundární a doplňkové akce. Všechny varianty mají společný základ.</p></div></div>
      <div className="bs-variants">
        {buttonVariants.map(v=><div className="bs-variant-row" key={v}>
          <div className="bs-variant-description"><strong>{titles[v]}</strong><p>{descriptions[v]}</p></div>
          <AxoButton variant={v} size="default" iconRight={v==='primary'||v==='gradient'?'arrow-right':undefined} icon={v==='danger'?'trash':undefined} onClick={()=>setNote('Kliknutí: '+titles[v])}>{v==='danger'?'Odstranit':'Pokračovat'}</AxoButton>
        </div>)}
      </div>
      <div className="bs-size-rows">
        {(['compact','default'] as const).map(s=><div className="bs-size-row" key={s}>
          <div className="bs-size-name"><strong>{s==='compact'?'Compact':'Default'}</strong><small>{controls[s].height}px výška</small></div>
          <div className="bs-size-actions">
            <AxoButton size={s} onClick={()=>setNote('Velikost '+s)}>Pokračovat</AxoButton>
            <AxoButton variant="secondary" size={s} onClick={()=>setNote('Sekundární · '+s)}>Zrušit</AxoButton>
          </div>
        </div>)}
      </div>
    </section>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>02 / ICON ACTIONS</span><h2>Dokonale kulatá tlačítka</h2><p>Jednotné kruhové ikony. Každá akce má přístupný název.</p></div></div>
      <div className="bs-icon-library">
        {roundIcons.map(icon=><div className="bs-icon-swatch" key={icon}>
          <AxoButton size="default" variant={icon==='trash'?'danger':'secondary'} icon={icon} iconOnly aria-label={'Akce '+icon} onClick={()=>setNote('Ikona: '+icon)}/>
          <span>{icon}</span>
        </div>)}
      </div>
    </section>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>03 / ORBITAL GLOW</span><h2>Orbital Glow</h2><p>Schválený pohyb světelného segmentu kolem gradientového tlačítka.</p></div></div>
      <div className="bs-beam-grid">
        <div className="bs-beam-card"><span>ORBITAL GLOW</span><strong>Spinning Accent</strong><p>Světlo se pohybuje po obvodu, tlačítko zůstává na místě.</p>
          <div className="bs-beam-showcase"><AxoButton variant="gradient" borderMotion="spin" size="default" iconRight="arrow-right" onClick={()=>setNote('Orbital Glow')}>Pokračovat</AxoButton></div>
        </div>
      </div>
    </section>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>04 / ICON MICRO-INTERACTIONS</span><h2>Copy, Download, Arrow, Plus & Refresh</h2><p>Schválené pohyby samotných ikon bez poskakování celého tlačítka.</p></div></div>
      <div className="bs-motion-toolbar"><span>MICRO-INTERACTIONS</span><button type="button" className={motionEnabled?'bs-motion-switch is-on':'bs-motion-switch'} aria-pressed={motionEnabled} onClick={()=>setMotionEnabled(v=>!v)}>{motionEnabled?'Animace zapnuté':'Animace vypnuté'} <span aria-hidden="true">{motionEnabled?'●':'○'}</span></button></div>
      <div className="bs-motion-grid">
        <div className="bs-motion-card"><span>COPY</span><strong>Kopírovat</strong><p>Pohyb dvou vrstev kopírovací ikony.</p><div className="bs-motion-actions">
          <AxoButton variant="secondary" icon="copy" iconOnly iconMotion={motionEnabled} aria-label="Kopírovat URL" onClick={()=>void copyText()}/>
          <AxoButton variant="outline" icon={copied?'check':'copy'} iconMotion={motionEnabled} onClick={()=>void copyText()}>{copied?'Zkopírováno':'Kopírovat'}</AxoButton>
        </div></div>
        <div className="bs-motion-card"><span>DOWNLOAD</span><strong>Stáhnout</strong><p>Šipka zajede do zásobníku.</p><div className="bs-motion-actions">
          <AxoButton variant="secondary" icon="download" iconOnly iconMotion={motionEnabled} aria-label="Stáhnout" onClick={downloadSample}/>
          <AxoButton icon="download" iconMotion={motionEnabled} onClick={downloadSample}>Stáhnout</AxoButton>
        </div></div>
        <div className="bs-motion-card"><span>ARROW</span><strong>Pokračovat</strong><p>Animovaná směrová šipka.</p><div className="bs-motion-actions">
          <AxoButton variant="gradient" icon="arrow-right" iconOnly iconMotion={motionEnabled} aria-label="Pokračovat" onClick={()=>setNote('Arrow')}/>
          <AxoButton variant="secondary" iconRight="arrow-right" iconMotion={motionEnabled} onClick={()=>setNote('Arrow')}>Pokračovat</AxoButton>
        </div></div>
        <div className="bs-motion-card"><span>PLUS & REFRESH</span><strong>Přidat a obnovit</strong><p>Jemné pootočení obou ikon.</p><div className="bs-motion-actions">
          <AxoButton icon="plus" iconOnly iconMotion={motionEnabled} aria-label="Přidat" onClick={()=>setNote('Přidáno')}/>
          <AxoButton variant="outline" icon="refresh" iconOnly iconMotion={motionEnabled} aria-label="Obnovit" onClick={()=>setNote('Obnoveno')}/>
        </div></div>
      </div>
      <div className="bs-notification" role="status"><ButtonIcon name="check" size={16}/>{note}</div>
    </section>
    <footer className="page-footer">Axolotl · Buttons · Clean Neo Iris</footer>
  </div>
}
