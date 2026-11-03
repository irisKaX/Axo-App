import { useState } from 'react'
import { brandColors, purple, neutral, semantic, themes, contrastRatio, type ThemeName } from '../design-system/foundations/colors'
import './color-studio.css'

const selected = [
  { name: 'Iris Purple', role: 'Hlavní barva aplikace', color: brandColors.irisPurple },
  { name: 'O2 Blue', role: 'O2 služby a integrace', color: brandColors.o2Blue },
  { name: 'Axolotl Pink', role: 'Maskot a hravé detaily', color: brandColors.axolotlPink },
  { name: 'Hoodie Lilac', role: 'Světlo a zvýraznění', color: brandColors.hoodieLilac },
] as const

function Swatches({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div className="studio-scale">{items.map(([name, hex]) =>
    <div className="studio-scale-item" key={name}><span style={{background:hex}} /><strong>{name}</strong><code>{hex}</code></div>
  )}</div>
}

export default function ColorStudio({ theme, onThemeChange }: { theme: ThemeName; onThemeChange: (value: ThemeName) => void }) {
  const [copied, setCopied] = useState('')
  const t = themes[theme]
  async function copy(hex: string) {
    try { await navigator.clipboard.writeText(hex); setCopied(hex) } catch { setCopied('') }
  }
  const checks = [
    {name:'Hlavní text na kartě', fg:t.text, bg:t.surface, min:4.5},
    {name:'Doplňkový text na kartě', fg:t.muted, bg:t.surface, min:4.5},
    {name:'Text na primárním tlačítku', fg:t.brandText, bg:t.brand, min:4.5},
    {name:'O2 Blue s bílým textem', fg:'#FFFFFF', bg:brandColors.o2Blue, min:4.5},
    {name:'Hranice inputu', fg:t.controlBorder, bg:t.surface, min:3},
  ]
  return <div className="color-studio">
    <p className="eyebrow">FOUNDATIONS / COLORS</p>
    <h1>Colors<span className="heading-accent">.</span></h1>
    <p className="intro">Nejdřív se podívej, jak barvy fungují dohromady. Až když bude vzhled sedět, budeme řešit jednotlivé technické odstíny.</p>
    <div className="studio-status">NEO IRIS · SCHVÁLENÝ SMĚR / DETAILY K DOLADĚNÍ</div>

    <section className="studio-panel">
      <div className="studio-section-head"><div><p className="studio-overline">01 · IDENTITA</p><h2>Naše čtyři barvy</h2><p>Barvy, které jsi vybrala. Každá má jasný účel. Kliknutím zkopíruješ HEX.</p></div></div>
      <div className="studio-selected-colors">{selected.map(item=><button type="button" key={item.name} className="studio-color" onClick={()=>void copy(item.color)} title={'Kopírovat '+item.color}>
        <span className="studio-color-fill" style={{background:item.color}}/>
        <strong>{item.name}</strong><small>{item.role}</small><code>{copied===item.color?'✓ Zkopírováno':item.color}</code>
      </button>)}</div>
      <p className="studio-guidance">Fialová vede. Modrá označuje O2. Růžová a levandulová patří osobnosti maskota. Žádná z nich nemusí vyplňovat každou kartu.</p>
    </section>

    <section className="studio-panel">
      <div className="studio-section-head studio-section-head-split">
        <div><p className="studio-overline">02 · JAK TO VYPADÁ</p><h2>Barvy v reálném rozhraní</h2><p>Stejná aplikace, dvě témata. Posuzuj celek, ne izolované čtverečky.</p></div>
        <div className="studio-theme" role="group" aria-label="Náhled režimu"><button type="button" aria-pressed={theme==='light'} className={theme==='light'?'active':''} onClick={()=>onThemeChange('light')}>☀ Light</button><button type="button" aria-pressed={theme==='dark'} className={theme==='dark'?'active':''} onClick={()=>onThemeChange('dark')}>☾ Dark</button></div>
      </div>
      <div className="studio-stage">
        <div className="studio-stage-head"><div className="studio-stage-logo">✳</div><strong>axolotl<span className="studio-brand-dot">.</span></strong><div className="studio-stage-nav">Workspace&nbsp; / &nbsp;Tools</div><div className="studio-stage-avatar">I</div></div>
        <div className="studio-stage-intro"><span>YOUR WORKSPACE</span><h3>Make work <em>flow better.</em></h3><p>Nástroje a nápady na jednom místě.</p></div>
        <div className="studio-demo-grid">
          <div className="studio-demo-card">
            <div className="studio-demo-card-title"><span className="studio-demo-icon">⌕</span><div><strong>Find Phrase</strong><small>Analýza obsahu stránky</small></div></div>
            <label htmlFor="studio-demo-url">URL adresa</label><input id="studio-demo-url" type="url" placeholder="https://www.o2.cz" />
            <button type="button" className="studio-demo-primary">Analyzovat stránku <span>↗</span></button>
          </div>
          <div className="studio-demo-side">
            <div className="studio-demo-card studio-demo-metric"><span>Dokončené úkoly</span><strong>48<span>+</span></strong><div className="studio-progress"><i/></div></div>
            <div className="studio-demo-card studio-demo-o2"><span className="studio-o2-marker">O2</span><div><strong>O2 Workspace</strong><small>Propojené pracovní nástroje</small></div><span className="studio-o2-arrow">↗</span></div>
          </div>
        </div>
      </div>
      <div className="studio-under-preview"><span className="studio-mark"><i style={{background:brandColors.irisPurple}}/>Hlavní akce</span><span className="studio-mark"><i style={{background:brandColors.o2Blue}}/>O2 kontext</span><span className="studio-mark"><i style={{background:brandColors.axolotlPink}}/>Maskot / dekorace</span></div>
    </section>

    <section className="studio-panel">
      <div className="studio-section-head"><div><p className="studio-overline">03 · PRINCIP</p><h2>Kdy kterou barvu použít?</h2><p>Jednoduché pravidlo, podle kterého později budeme stavět komponenty a widgety.</p></div></div>
      <div className="studio-roles"><div><span className="studio-role-marker" style={{background:brandColors.irisPurple}}/><strong>Akce</strong><p>Primární tlačítka, aktivní navigace a výběr.</p></div><div><span className="studio-role-marker" style={{background:brandColors.o2Blue}}/><strong>O2 kontext</strong><p>Označení O2 služeb, integrací a zdrojů dat.</p></div><div><span className="studio-role-marker" style={{background:brandColors.axolotlPink}}/><strong>Charakter</strong><p>Maskot, ilustrace a jemné brandové momenty.</p></div><div><span className="studio-role-marker" style={{background:brandColors.hoodieLilac}}/><strong>Světlo</strong><p>Glow, akcenty a atmosféra, ne čitelnost textu.</p></div></div>
    </section>

    <details className="studio-technical">
      <summary><span><strong>Technické podklady</strong><small>Škály, sémantické tokeny a kontrast · pro vývoj</small></span><span aria-hidden="true">⌄</span></summary>
      <div className="studio-technical-content">
        <h3>Odstíny fialové</h3><p>Pomocné hodnoty pro hover, výběr a další stavy. Nemusíš je schvalovat jednotlivě.</p><Swatches items={purple}/>
        <h3>Neutrální odstíny</h3><p>Technické hodnoty pro plochy, text a hranice. Nejsou to samostatné brandové barvy.</p><Swatches items={neutral}/>
        <h3>Barvy podle tématu</h3><div className="studio-token-grid">{([
          ['Canvas',t.canvas],['Surface',t.surface],['Text',t.text],['Secondary text',t.muted],['Border',t.border],['Control border',t.controlBorder],['Focus',t.focusRing],['Action',t.brand],['Corporate',t.corporate],['Success',semantic[theme].success.foreground],['Warning',semantic[theme].warning.foreground],['Error',semantic[theme].error.foreground],['Info',semantic[theme].info.foreground],
        ] as const).map(([name,color])=><div className="studio-token" key={name}><i style={{background:color}}/><strong>{name}</strong><code>{color}</code></div>)}</div>
        <h3>Kontrola kontrastu</h3><div className="studio-checks">{checks.map(check=>{const ratio=contrastRatio(check.fg,check.bg);return <div key={check.name}><span>{check.name}</span><strong>{ratio.toFixed(2)}:1</strong><span className={ratio>=check.min?'pass':'review'}>{ratio>=check.min?'Splňuje':'Zkontrolovat'}</span></div>})}</div>
      </div>
    </details>
    <footer className="page-footer">Axo-App · Colors · Vizuální směr potvrzen, technické hodnoty v revizi</footer>
  </div>
}
