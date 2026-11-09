import { useState, type CSSProperties } from 'react'
import { brandColors, referencePalette, themes, semantic, bluePurpleGradient } from '../design-system/foundations/colors'
import { typography, typographySamples, fontWeights, type TypographyRole } from '../design-system/foundations/typography'
import { AxoIcon, iconGroups, iconNames, iconTones, type AxoIconName, type AxoIconTone } from '../components/AxoIcon'
import './foundations.css'

type Mode='dark'|'light'
const tokens = [
  {label:'Iris Purple',hex:brandColors.irisPurple,usage:'Primary accent'},
  {label:'Bright Cyan Blue',hex:brandColors.blue,usage:'Secondary accent'},
  {label:'O2 Blue',hex:brandColors.o2Blue,usage:'O2 identity'},
  {label:'Electric Purple',hex:brandColors.electricPurple,usage:'Gradient end'},
  {label:'Royal Blue',hex:brandColors.royalBlue,usage:'Gradient middle'},
  {label:'Sunshine Yellow',hex:brandColors.sunshineYellow,usage:'Theme icons'},
]
const typeNames:Record<TypographyRole,string> = {
 display:'Display',h1:'Heading 1',h2:'Heading 2',h3:'Heading 3',h4:'Heading 4',bodyLg:'Body Large',
 body:'Body',bodySm:'Body Small',label:'Label',button:'Button',caption:'Caption',overline:'Overline'
}
const typeKeys=Object.keys(typography) as TypographyRole[]
function Heading({tag,title,description}:{tag:string,title:string,description:string}){
 return <div className="v2-foundation-heading"><span className="v2-kicker">{tag}</span><h2>{title}</h2><p>{description}</p></div>
}
function CopySwatch({hex,name,usage,onCopy,copied}:{hex:string,name:string,usage:string,onCopy:(value:string)=>void,copied:string}){
 return <button className="v2-swatch" type="button" onClick={()=>onCopy(hex)} title={'Kopírovat '+hex}>
 <span className="v2-swatch__color" style={{background:hex}}/>
 <strong>{name}</strong><small>{usage}</small><code>{copied===hex?'✓ Zkopírováno':hex}</code></button>
}
export function ColorsV2({theme}:{theme:Mode}){
 const [copied,setCopied]=useState('')
 const t=themes[theme]
 async function copy(value:string){try{await navigator.clipboard.writeText(value);setCopied(value)}catch{setCopied('Kopírování není dostupné')}}
 return <div className="v2-page">
 <div className="v2-page-title"><div><span className="v2-kicker">FOUNDATIONS / COLORS</span><h1>Electric Colors<span className="v2-period">.</span></h1>
 <p>Schválená paleta Clean Neo Iris. Výrazná modrá, fialová a neutrální podklady pro světlý i tmavý motiv.</p></div></div>
 <section className="v2-panel"><Heading tag="01 / BRAND PALETTE" title="Základní barvy" description="Klepnutím na barevný vzorek zkopíruješ HEX kód."/>
 <div className="v2-swatches">{tokens.map(c=><CopySwatch key={c.label} {...c} name={c.label} onCopy={copy} copied={copied}/>)}</div></section>
 <section className="v2-panel"><Heading tag="02 / GRADIENT" title="Blue × Purple" description="Schválený gradient s úhlem 130°. Používáme stejné barevné zastávky jako u tlačítek."/>
 <button type="button" className="v2-gradient-demo" onClick={()=>copy(bluePurpleGradient)} title="Kopírovat CSS gradient">
 <span>BLUE × PURPLE</span><strong>Electric by nature.</strong><code>{copied===bluePurpleGradient?'✓ CSS zkopírováno':'130° · #0F9FDC → #3B09C7 → #8101EC'}</code></button></section>
 <section className="v2-panel"><Heading tag="03 / THEME TOKENS" title="Light & Dark" description="Přepínač motivu v horní navigaci mění i ukázky sémantických barev."/>
 <div className="v2-theme-swatches">{([
 ['Canvas',t.canvas],['Surface',t.surface],['Subtle',t.subtle],['Border',t.border],['Text',t.text],['Muted',t.muted],
 ['Primary',t.brand],['Secondary',t.secondary],['Success',semantic[theme].success.foreground],
 ['Warning',semantic[theme].warning.foreground],['Error',semantic[theme].error.foreground],['Info',semantic[theme].info.foreground]
 ] as [string,string][]).map(([name,hex])=><CopySwatch key={name} name={name} usage={'theme.'+theme} hex={hex} copied={copied} onCopy={copy}/>)}</div></section>
 <section className="v2-panel"><Heading tag="04 / BACKDROPS" title="Atmosférické pozadí" description="Dekorativní gradienty pro náhledy. Nejsou náhradou neutrálního pozadí aplikace."/>
 <div className="v2-backdrops">{(['dark','light'] as const).map(mode=><button type="button" key={mode} onClick={()=>copy(themes[mode].backdrop)}
 style={{background:themes[mode].backdrop,color:themes[mode].text}}>
 <span style={{color:themes[mode].accent}}>AXOLOTL / {mode.toUpperCase()}</span><strong>Make work<br/><em style={{color:themes[mode].brand}}>flow better.</em></strong>
 <small style={{color:themes[mode].muted}}>{copied===themes[mode].backdrop?'✓ CSS zkopírováno':'Klikni pro kopírování CSS'}</small></button>)}</div></section>
 <details className="v2-panel v2-details"><summary>Další referenční barvy z původního katalogu</summary>
 <div className="v2-swatches">{referencePalette.map(c=><CopySwatch key={c.name} name={c.name} usage={c.role} hex={c.hex} copied={copied} onCopy={copy}/>)}</div></details>
 </div>
}
export function TypographyV2(){
 const [text,setText]=useState('Všechno na jednom místě.')
 const [size,setSize]=useState(28)
 const [weight,setWeight]=useState(600)
 const [tracking,setTracking]=useState(0)
 return <div className="v2-page">
 <div className="v2-page-title"><div><span className="v2-kicker">FOUNDATIONS / TYPOGRAPHY</span><h1>Typography<span className="v2-period">.</span></h1>
 <p>Poppins pro texty, navigaci i komponenty. Schválené typografické akcenty a interaktivní ukázky.</p></div></div>
 <section className="v2-panel"><Heading tag="01 / FONT FAMILY" title="Jedno písmo, jasná identita" description="Poppins s českou diakritikou. Technické hodnoty mohou používat monospace."/>
 <div className="v2-type-hero"><div><span className="v2-kicker">PRIMARY FONT</span><div>Poppins<span>.</span></div><p>ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ · abcdefghijklmnopqrstuvwxyz · 0123456789</p></div><aside><small>Řezy UI</small><strong>400 / 500 / 600 / 700</strong><small>Technické hodnoty</small><code>ui-monospace</code></aside></div></section>
 <section className="v2-panel"><Heading tag="02 / TYPE SCALE" title="Typografická hierarchie" description="Dvanáct původních pojmenovaných rolí, se stejnými velikostmi, váhami a řádkováním."/>
 <div className="v2-type-scale">{typeKeys.map(key=><div className="v2-type-row" key={key}><div><strong>{typeNames[key]}</strong><small>{typography[key].size} px · {typography[key].weight}</small></div>
 <span style={{fontSize:typography[key].size,fontWeight:typography[key].weight,lineHeight:typography[key].lineHeight,letterSpacing:typography[key].tracking+'em'} as CSSProperties}>{typographySamples[key]}</span></div>)}</div></section>
 <section className="v2-panel"><Heading tag="03 / WEIGHTS" title="Čtyři váhy" description="Základní výběr řezů pro konzistentní rozhraní."/>
 <div className="v2-type-weights">{fontWeights.map(f=><div key={f.value}><small>{f.name} / {f.value}</small><strong style={{fontWeight:f.value}}>Axolotl Aa</strong></div>)}</div></section>
 <section className="v2-panel"><Heading tag="04 / TEXT TREATMENTS" title="Typografické akcenty" description="Tři schválené úpravy nadpisů z původního katalogu."/>
 <div className="v2-type-treatments"><article><small>ACCENT DOT</small><h3>Vše na jednom místě<span>.</span></h3><p>Fialová tečka na konci nadpisu.</p></article>
 <article><small>ACCENT WORD</small><h3>Tvůj <span>workspace.</span></h3><p>Klíčové slovo zvýrazněné fialovou.</p></article>
 <article><small>EYEBROW + HEADING</small><label>AXOLOTL / DESIGN</label><h3>Jednoduše přehledné<span>.</span></h3><p>Horní popisek a akcentovaná tečka.</p></article></div></section>
 <section className="v2-panel"><Heading tag="05 / PLAYGROUND" title="Vyzkoušej si vlastní text" description="Uprav velikost, váhu a rozestupy. Změny platí pouze pro tento náhled."/>
 <div className="v2-type-playground"><div className="v2-type-controls">
 <label>Text<input value={text} maxLength={140} onChange={e=>setText(e.target.value)}/></label>
 <label>Velikost · {size} px<input type="range" min="12" max="56" value={size} onChange={e=>setSize(Number(e.target.value))}/></label>
 <label>Váha<select value={weight} onChange={e=>setWeight(Number(e.target.value))}>{fontWeights.map(w=><option key={w.value} value={w.value}>{w.name} · {w.value}</option>)}</select></label>
 <label>Letter spacing · {tracking.toFixed(2)} em<input type="range" min="-.05" max=".1" step=".005" value={tracking} onChange={e=>setTracking(Number(e.target.value))}/></label></div>
 <div className="v2-type-result" style={{fontSize:size,fontWeight:weight,letterSpacing:tracking+'em'}}>{text||'Napiš vlastní text…'}</div></div></section></div>
}
const toneColors:Record<AxoIconTone,string> = {inherit:'var(--v2-text)',muted:'var(--v2-muted)',brand:'#7C4BFE',success:'#9EF01A',warning:'#F6DE26',danger:'#FF0A54',info:'#4CC9F0'}
export function IconsV2(){
 const [query,setQuery]=useState('')
 const [size,setSize]=useState<16|18|20|24>(20)
 const [tone,setTone]=useState<AxoIconTone>('inherit')
 const [motion,setMotion]=useState(true)
 const [notice,setNotice]=useState('Kliknutím na ikonu zkopíruješ její název.')
 const filtered=iconNames.filter(n=>n.includes(query.trim().toLowerCase()))
 async function copy(name:AxoIconName){try{await navigator.clipboard.writeText(name);setNotice('Zkopírováno: '+name)}catch{setNotice('Název ikony: '+name)}}
 return <div className="v2-page">
 <div className="v2-page-title"><div><span className="v2-kicker">LIBRARY / ICONS</span><h1>Icons<span className="v2-period">.</span></h1><p>Schválený SVG registr. Bez dekorativních podkladů za ikonami; velikost, barvu a animace můžeš vyzkoušet.</p></div></div>
 <section className="v2-panel"><Heading tag="01 / ICON LIBRARY" title="Knihovna ikon" description="Stejná sada jako v původním katalogu. Vyhledávání a kopírování názvů."/>
 <div className="v2-icon-toolbar"><label>Hledat ikonu<input type="search" value={query} placeholder="copy, home, search…" onChange={e=>setQuery(e.target.value)}/></label>
 <fieldset><legend>Velikost</legend>{([16,18,20,24] as const).map(v=><button type="button" aria-pressed={size===v} key={v} className={size===v?'selected':''} onClick={()=>setSize(v)}>{v} px</button>)}</fieldset></div>
 <div className="v2-icon-controls"><fieldset><legend>Barevná role</legend>{iconTones.map(v=><button type="button" aria-pressed={tone===v} key={v} className={tone===v?'selected':''} onClick={()=>setTone(v)}><i style={{background:toneColors[v]}}/>{v}</button>)}</fieldset>
 <label><input type="checkbox" checked={motion} onChange={e=>setMotion(e.target.checked)}/> Animace na hover</label></div>
 {Object.entries(iconGroups).map(([group,icons])=>{const selected=icons.filter(n=>filtered.includes(n));return selected.length?<div className="v2-icon-group" key={group}><h3>{group}</h3><div className="v2-icon-grid">{selected.map(name=><button className={'v2-icon-tile'+(motion?' is-motion':'')} type="button" title={'Kopírovat '+name} key={name} onClick={()=>void copy(name)}>
 <AxoIcon name={name} size={size} style={{color:toneColors[tone]}}/><span>{name}</span></button>)}</div></div>:null})}
 {!filtered.length&&<p>Žádná ikona neodpovídá hledání.</p>}
 <p className="v2-icon-notice" role="status">{notice}</p></section>
 <div className="v2-icon-info"><article><strong>Geometrie</strong><p>SVG 24 × 24, line style, zaoblené konce.</p></article><article><strong>Velikosti</strong><p>16 / 18 / 20 / 24 px.</p></article><article><strong>Barvy</strong><p>Jednotné sémantické role pro oba motivy.</p></article></div>
 </div>
}
