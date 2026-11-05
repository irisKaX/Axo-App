import { useState } from 'react'
import { AxoButton, buttonVariants, type ButtonVariant, type ButtonIconName } from '../components/Buttons'
import { WidgetLaunchButton } from '../components/WidgetLaunchButton'
import { controls } from '../design-system/foundations/spacing'
import './buttons-studio.css'

const titles: Record<ButtonVariant,string> = {
  primary:'Primary',
  'primary-2':'Primary 2 · Orbital Glow',
  secondary:'Secondary',
  outline:'Outline',
  ghost:'Ghost',
  danger:'Danger'
}
const descriptions: Record<ButtonVariant,string> = {
  primary:'Schválený Blue × Purple gradient bez automatické šipky.',
  'primary-2':'Stejný primární gradient se stále rotujícím světlem po obvodu.',
  secondary:'Gradient Reveal: barevný obvod a plynulé odhalení gradientu při hoveru.',
  outline:'Výrazná fialová kontura z původního Accent Outline.',
  ghost:'Nenápadná akce bez výrazné plochy.',
  danger:'Destruktivní akce pro nevratné operace.'
}
const textIcons:Record<ButtonVariant,ButtonIconName> = {
  primary:'plus',
  'primary-2':'refresh',
  secondary:'copy',
  outline:'download',
  ghost:'arrow-right',
  danger:'trash'
}

const widgetLaunchExample = `<WidgetLaunchButton
  label="Otevřít nástroj z widgetu"
  onClick={handleOpenTool}
/>`

export default function ButtonsStudio() {
  const [note,setNote]=useState('Text a ikona jsou obsahové varianty stejného tlačítka.')
  return <div className="bs-page">
    <p className="eyebrow">LIBRARY / BUTTONS</p>
    <h1>Buttons<span className="heading-accent">.</span></h1>
    <p className="intro">Jednotná knihovna tlačítek Clean Neo Iris. Používáme pouze velikosti Compact a Default a zachováváme schválené animace ikon.</p>
    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>01 / VARIANTS</span><h2>Hierarchie akcí</h2><p>Šest schválených rolí. Každá má stejně velkou variantu s textem a s textem a ikonou. Ikonu měníme podle účelu akce.</p></div></div>
      <div className="bs-variants">
        {buttonVariants.map(v=><div className="bs-variant-row" key={v}>
          <div className="bs-variant-description"><strong>{titles[v]}</strong><p>{descriptions[v]}</p></div>
          <div className="bs-variant-actions">
            <AxoButton variant={v} size="default" onClick={()=>setNote('Text: '+titles[v])}>{v==='danger'?'Odstranit':'Pokračovat'}</AxoButton>
            <AxoButton variant={v} size="default" icon={textIcons[v]} onClick={()=>setNote('Text + ikona: '+titles[v])}>{v==='danger'?'Odstranit':'Pokračovat'}</AxoButton>
          </div>
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
      <div className="bs-icon-examples">
        <div className="bs-section-heading"><div><span>ICON-ONLY / PRIMARY & SECONDARY</span><h2>Kulatá tlačítka</h2><p>Stejné dvě barevné role, pouze bez textu. Ikonu lze vyměnit, aniž by vznikala nová designová varianta.</p></div></div>
        <div className="bs-icon-example-row">
          <div className="bs-icon-example">
            <AxoButton size="default" variant="primary" icon="plus" iconOnly aria-label="Primární akce" onClick={()=>setNote('Kulaté Primary')}/>
            <span>Primary</span>
          </div>
          <div className="bs-icon-example">
            <AxoButton size="default" variant="secondary" icon="plus" iconOnly aria-label="Sekundární akce" onClick={()=>setNote('Kulaté Secondary')}/>
            <span>Secondary</span>
          </div>
        </div>
      </div>
    </section>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>02 / WIDGET ACTION</span><h2>Widget → Tool</h2><p>Samostatná akce pro otevření celého nástroje z hlavičky widgetu. Náhled k vizuálnímu schválení.</p></div></div>
      <div className="bs-widget-launch-demo">
        <div className="bs-widget-launch-surface">
          <div className="bs-widget-launch-heading">
            <div><span>UKÁZKA HLAVIČKY</span><strong>Ukázkový widget</strong></div>
            <WidgetLaunchButton label="Otevřít nástroj z widgetu" onClick={() => setNote('Ukázka: otevření nástroje z widgetu. Navigace zatím není připojena.')} />
          </div>
          <div className="bs-widget-launch-empty" aria-hidden="true" />
        </div>
        <div className="bs-widget-launch-description">
          <strong>Widget → Tool</strong>
          <p>V katalogu tlačítko zobrazí pouze stavovou zprávu. Skutečný nástroj později připojí vlastní obsluhu kliknutí.</p>
          <pre><code>{widgetLaunchExample}</code></pre>
        </div>
      </div>
    </section>

    <div className="bs-notification" role="status">{note}</div>
    <footer className="page-footer">Axolotl · Buttons · Clean Neo Iris</footer>
  </div>
}
