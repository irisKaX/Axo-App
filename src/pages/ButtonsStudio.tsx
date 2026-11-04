import { useState } from 'react'
import { AxoButton, ButtonIcon, buttonSizes, buttonVariants, type ButtonSize, type ButtonVariant } from '../components/Buttons'
import { controls, radius } from '../design-system/foundations/spacing'
import './buttons-studio.css'

type PreviewState = 'default'|'hover'|'active'|'focus'|'disabled'|'loading'
const previewStates:PreviewState[] = ['default','hover','active','focus','disabled','loading']
const titles:Record<ButtonVariant,string> = {
  primary:'Primary',secondary:'Secondary',ghost:'Ghost',outline:'Outline',danger:'Danger'
}
const descriptions:Record<ButtonVariant,string> = {
  primary:'Hlavní akce na stránce. Jedno jasné CTA.',
  secondary:'Vedlejší akce bez přehnaného důrazu.',
  ghost:'Nenápadná akce v toolbaru nebo v navigaci.',
  outline:'Alternativní akce s viditelným ohraničením.',
  danger:'Destruktivní akce vyžadující potvrzení.'
}
const icons = ['plus','copy','download','arrow-right','check','trash','refresh','settings','close'] as const

export default function ButtonsStudio() {
  const [size,setSize]=useState<ButtonSize>('default')
  const [variant,setVariant]=useState<ButtonVariant>('primary')
  const [state,setState]=useState<PreviewState>('default')
  const [counter,setCounter]=useState(3)
  const [copied,setCopied]=useState(false)
  const [note,setNote]=useState('Vyzkoušej jednotlivá tlačítka. Ukázky neovlivňují skutečná data.')
  const [showCode,setShowCode]=useState(false)

  async function copyText() {
    try{
      await navigator.clipboard.writeText('https://iriskax.github.io/Axo-App/')
      setCopied(true)
      setNote('Adresa katalogu zkopírována do schránky.')
    }catch{
      setCopied(false)
      setNote('Kopírování vyžaduje povolený přístup ke schránce.')
    }
  }
  function downloadSample() {
    const blob=new Blob(['Axo-App · Button specimen\nNeo Iris Design System\n'],{type:'text/plain;charset=utf-8'})
    const url=URL.createObjectURL(blob)
    const anchor=document.createElement('a')
    anchor.href=url
    anchor.download='axo-button-sample.txt'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
    setNote('Vygenerován ukázkový textový soubor.')
  }

  return <div className="bs-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / BUTTONS</p>
    <h1>Buttons<span className="heading-accent">.</span></h1>
    <p className="intro">Pilulková tlačítka a malé dokonale kulaté ikonové akce. Vycházejí z Colors v2, Poppins a schválené měkké geometrie. Zde si můžeš vyzkoušet jejich chování před finálním schválením.</p>
    <div className="bs-status">DESIGN CANDIDATE · PILL + CIRCLE · DARK / LIGHT · INTERACTIVE</div>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>01 / VARIANTS</span><h2>Hierarchie akcí</h2><p>Pět jasně odlišených úloh. Primární tlačítko je vždy nejvýraznější; ostatní podporují soustředěnou práci.</p></div></div>
      <div className="bs-variants">
        {buttonVariants.map(v=><div className="bs-variant-row" key={v}>
          <div className="bs-variant-description"><strong>{titles[v]}</strong><p>{descriptions[v]}</p></div>
          <AxoButton variant={v} size="default" iconRight={v==='primary'?'arrow-right':undefined} icon={v==='danger'?'trash':undefined} onClick={()=>setNote('Kliknutí: '+titles[v])}>{v==='danger'?'Odstranit':'Pokračovat'}</AxoButton>
        </div>)}
      </div>
    </section>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>02 / BUTTON SIZES</span><h2>Jedna geometrie, tři velikosti</h2><p>Textová tlačítka zůstávají pilulková a ikonová vždy tvoří kruh. Výchozí velikost je 44 px.</p></div></div>
      <div className="bs-size-rows">
        {buttonSizes.map(s=><div className="bs-size-row" key={s}>
          <div className="bs-size-name"><strong>{s==='compact'?'Compact':s==='default'?'Default':'Comfortable'}</strong><small>{controls[s].height}px výška</small></div>
          <div className="bs-size-actions">
            <AxoButton size={s} iconRight="arrow-right" onClick={()=>setNote('Primární akce · '+s)}>Pokračovat</AxoButton>
            <AxoButton size={s} variant="secondary" onClick={()=>setNote('Sekundární akce · '+s)}>Zrušit</AxoButton>
            <AxoButton size={s} variant="outline" icon="copy" iconOnly aria-label={'Kopírovat · '+s} onClick={()=>void copyText()}/>
            <AxoButton size={s} variant="secondary" icon="plus" iconOnly aria-label={'Přidat · '+s} onClick={()=>{setCounter(n=>n+1);setNote('Přidána ukázková položka.')}}/>
          </div>
        </div>)}
      </div>
      <div className="bs-guide"><strong>Dotyková plocha:</strong> 36px Compact se hodí do hustého desktopového rozhraní. Pro dotyk musí mít ovládání aktivní oblast alespoň 44 × 44 px.</div>
    </section>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>03 / ICON ACTIONS</span><h2>Dokonale kulatá tlačítka</h2><p>Ikony mají jednotnou linku a čitelný význam. Každé samostatné ikonové tlačítko musí mít přístupný název.</p></div></div>
      <div className="bs-icon-library">{icons.map(icon=><div key={icon} className="bs-icon-swatch"><AxoButton variant={icon==='trash'?'danger':'secondary'} icon={icon} iconOnly aria-label={'Akce '+icon} onClick={()=>setNote('Ikonová akce: '+icon)}/><span>{icon}</span></div>)}</div>
    </section>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>04 / STATES PLAYGROUND</span><h2>Stavy a chování</h2><p>Přepínej variantu, rozměr a stav. Vizualizace hover/focus/active umožňuje kontrolu i bez myši.</p></div></div>
      <div className="bs-playground">
        <div className="bs-playground-controls">
          <label htmlFor="bs-variant">Varianta</label>
          <select id="bs-variant" value={variant} onChange={e=>setVariant(e.target.value as ButtonVariant)}>{buttonVariants.map(v=><option key={v} value={v}>{titles[v]}</option>)}</select>
          <label htmlFor="bs-size">Velikost</label>
          <select id="bs-size" value={size} onChange={e=>setSize(e.target.value as ButtonSize)}>{buttonSizes.map(s=><option key={s} value={s}>{s}</option>)}</select>
          <span className="bs-control-label">Stav</span>
          <div className="bs-state-options">{previewStates.map(s=><button type="button" key={s} className={state===s?'selected':''} aria-pressed={state===s} onClick={()=>setState(s)}>{s}</button>)}</div>
        </div>
        <div className="bs-playground-stage">
          <span className="bs-stage-label">{variant.toUpperCase()} / {size.toUpperCase()} / {state.toUpperCase()}</span>
          <AxoButton variant={variant} size={size} iconRight="arrow-right" className={'bs-preview-'+state} disabled={state==='disabled'} loading={state==='loading'} onClick={()=>setNote('Playground: '+variant+' / '+size)}>Analyzovat stránku</AxoButton>
          <span className="bs-stage-caption">{state==='loading'?'Zpracovává se, tlačítko je uzamčené':state==='disabled'?'Akce je neaktivní':state==='focus'?'Viditelný focus ring':'Můžeš tlačítko také přímo vyzkoušet'}</span>
        </div>
      </div>
    </section>

    <section className="panel bs-panel">
      <div className="bs-section-heading"><div><span>05 / SPECIAL ACTIONS</span><h2>Copy, Download, Add a Remove</h2><p>Ukázky mají reálné interakce. Kopírování používá schránku, Download vytváří ukázkový soubor, ostatní mění počítadlo.</p></div></div>
      <div className="bs-special-grid">
        <div className="bs-special-card"><span>COPY</span><strong>Kopírovat URL</strong><p>{copied?'Zkopírováno do schránky':'Připraveno ke kopírování'}</p><AxoButton variant="secondary" icon={copied?'check':'copy'} onClick={()=>void copyText()}>{copied?'Zkopírováno':'Kopírovat'}</AxoButton></div>
        <div className="bs-special-card"><span>DOWNLOAD</span><strong>Ukázkový soubor</strong><p>Stažení .txt přímo v prohlížeči.</p><AxoButton icon="download" onClick={downloadSample}>Stáhnout</AxoButton></div>
        <div className="bs-special-card"><span>ICON BUTTONS</span><strong>Pracovní položky: {counter}</strong><p>Přidej nebo odeber jednu položku.</p><div className="bs-special-icon-actions"><AxoButton variant="primary" icon="plus" iconOnly aria-label="Přidat položku" onClick={()=>setCounter(n=>n+1)}/><AxoButton variant="secondary" icon="trash" iconOnly aria-label="Odebrat položku" disabled={counter===0} onClick={()=>setCounter(n=>Math.max(0,n-1))}/></div></div>
      </div>
      <div className="bs-notification" role="status"><ButtonIcon name="check" size={16}/>{note}</div>
    </section>

    <details className="bs-technical" open={showCode} onToggle={e=>setShowCode(e.currentTarget.open)}>
      <summary>Technické specifikace a pravidla <span>{showCode?'−':'+'}</span></summary>
      <div className="bs-technical-body">
        <p><strong>Single source of truth:</strong> <code>src/components/Buttons.tsx</code> a <code>src/components/buttons.css</code>, rozměry <code>src/design-system/foundations/spacing.ts</code>, barvy <code>Colors v2</code>.</p>
        <p>Text buttons: <code>border-radius: {radius.pill}px</code>. Icon-only buttons: <code>border-radius: {radius.round}</code> se stejnou šířkou a výškou.</p>
        <p>Podporované stavy: default, hover, active, keyboard focus, disabled, loading. Loading blokuje opakované kliknutí; samostatné ikony vyžadují <code>aria-label</code>.</p>
        <p>Speciální chování není součástí čistě vizuální varianty tlačítka. Akce Copy, Download, Add a Remove poskytuje konkrétní kontext použití.</p>
      </div>
    </details>
    <footer className="page-footer">Axolotl · Components / Buttons · Návrh k vizuálnímu schválení</footer>
  </div>
}
