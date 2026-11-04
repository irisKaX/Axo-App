import { useState } from 'react'
import { AxoIcon, iconGroups, iconNames, animatedIconNames, type AxoIconName } from '../components/AxoIcon'
import './icons-studio.css'

export default function IconsStudio(){
  const [query,setQuery]=useState('')
  const [size,setSize]=useState<16|18|20|24>(20)
  const [feedback,setFeedback]=useState('')
  const filtered=iconNames.filter(name=>name.includes(query.trim().toLowerCase()))
  async function copyName(name:AxoIconName){
    try{await navigator.clipboard.writeText(name);setFeedback('Zkopírováno: '+name)}
    catch{setFeedback('Schránka není dostupná. Název ikony: '+name)}
  }
  return <div className="is-page">
    <p className="eyebrow">LIBRARY / ICONS</p>
    <h1>Icons<span className="heading-accent">.</span></h1>
    <p className="intro">Jednotná knihovna SVG ikon. Ikona určuje symbol, tlačítko určuje vzhled a interakci. Název ikony zkopíruješ kliknutím na její náhled.</p>
    <section className="panel is-panel">
      <div className="is-head">
        <div><span>01 / ICON LIBRARY</span><h2>Knihovna ikon</h2><p>Jedna sada pro navigaci, nástroje a tlačítka. Bez dekorativních podkladů za samotnými ikonami.</p></div>
        <span className="is-count">{filtered.length} / {iconNames.length} ikon</span>
      </div>
      <div className="is-toolbar">
        <label className="is-search"><span>Hledat ikonu</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Např. copy, home, search…" /></label>
        <fieldset className="is-sizes"><legend>Velikost náhledu</legend><div className="is-sizes-row">
          {([16,18,20,24] as const).map(value=><button key={value} type="button" aria-pressed={size===value} className={size===value?'is-selected':''} onClick={()=>setSize(value)}>{value} px</button>)}
        </div></fieldset>
      </div>
      {Object.entries(iconGroups).map(([group,icons])=>{
        const shown=icons.filter(name=>name.includes(query.trim().toLowerCase()))
        return shown.length?<div className="is-group" key={group}>
          <h3>{group}</h3>
          <div className="is-grid">{shown.map(name=><button type="button" className="is-icon-tile" key={name} onClick={()=>void copyName(name)} title={'Kopírovat název '+name}>
            <AxoIcon name={name} size={size}/>
            <span>{name}</span>
          </button>)}</div>
        </div>:null
      })}
      {!filtered.length&&<p className="is-empty">Žádná ikona neodpovídá hledání.</p>}
      <p className="is-feedback" role="status">{feedback||'Kliknutím na ikonu zkopíruješ její název.'}</p>
    </section>
    <div className="is-rules">
      <div><strong>Geometrie</strong><span>SVG viewBox 24 × 24, line style, zaoblené konce a spoje.</span></div>
      <div><strong>Velikosti</strong><span>16 / 18 / 20 / 24 px. V tlačítkách se používá 18 px.</span></div>
      <div><strong>Barvy</strong><span>currentColor, bez vlastní pevné barvy ikony. Řídí ji nadřazená komponenta.</span></div>
      <div><strong>Animace</strong><span>{animatedIconNames.filter(name=>name!=='loader').join(', ')}. Spouští je interaktivní komponenta.</span></div>
    </div>
    <footer className="page-footer">Axolotl · Icons · Sdílený SVG registr</footer>
  </div>
}
