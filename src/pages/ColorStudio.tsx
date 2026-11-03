import { useState } from 'react'
import { brandColors, referencePalette, readableColorCombinations, colorRoles, purple, neutral, semantic, themes, contrastRatio, type ThemeName } from '../design-system/foundations/colors'
import './color-studio.css'

const essentials = [
  { name: 'Electric Purple', hex: brandColors.irisPurple, role: 'Primary UI' },
  { name: 'Bright Cyan Blue', hex: brandColors.blue, role: 'Secondary brand' },
  { name: 'O2 Blue', hex: brandColors.o2Blue, role: 'O2 corporate' },
  { name: 'True Dark', hex: '#090B10', role: 'App background' },
] as const

function Swatches({ items }: { items: readonly (readonly [string,string])[] }) {
  return <div className="studio-scale">{items.map(([name,hex])=><div className="studio-scale-item" key={name}>
    <span style={{background:hex}}/><strong>{name}</strong><code>{hex}</code>
  </div>)}</div>
}

export default function ColorStudio({ theme, onThemeChange }: { theme: ThemeName; onThemeChange: (value: ThemeName) => void }) {
  const [copied,setCopied] = useState('')
  const t = themes[theme]
  async function copy(hex: string) {
    try {await navigator.clipboard.writeText(hex);setCopied(hex)}catch{setCopied('')}
  }
  const checks = [
    {name:'Primární text na kartě',fg:t.text,bg:t.surface,min:4.5},
    {name:'Sekundární text na kartě',fg:t.muted,bg:t.surface,min:4.5},
    {name:'Primární tlačítko',fg:t.brandText,bg:t.brand,min:4.5},
    {name:'O2 Blue s bílým textem',fg:'#FFFFFF',bg:brandColors.o2Blue,min:4.5},
    {name:'Cyan s tmavým textem',fg:t.secondaryText,bg:t.secondary,min:4.5},
    {name:'Obrys inputu',fg:t.controlBorder,bg:t.surface,min:3},
  ]
  return <div className="color-studio">
    <p className="eyebrow">FOUNDATIONS / COLORS V2</p>
    <h1>Electric <span className="heading-accent">Colors.</span></h1>
    <p className="intro">Z referenčních barev Figmy jsme sestavili jednotný vizuální jazyk: výrazná fialová, jasná modrá a opravdu neutrální tmavé pozadí. O2 má vlastní přesnou modrou.</p>
    <div className="studio-status">FIGMA-BASED · V2 DESIGN CANDIDATE</div>

    <section className="studio-panel">
      <div className="studio-section-head"><div className="studio-overline">01 · THE PALETTE</div><h2>Čtyři základní role</h2><p>Tohle jsou barvy, podle kterých poznáš Axolotl. Ostatní odstíny jsou podpůrné a najdeš je níže.</p></div>
      <div className="studio-selected-colors">{essentials.map(item=><button type="button" className="studio-color" key={item.name} onClick={()=>void copy(item.hex)} title={'Kopírovat '+item.hex}>
        <span className="studio-color-fill" style={{background:item.hex}}/>
        <strong>{item.name}</strong><small>{item.role}</small><code>{copied===item.hex?'✓ Zkopírováno':item.hex}</code>
      </button>)}</div>
    </section>

    <section className="studio-panel">
      <div className="studio-section-head studio-section-head-split">
        <div><div className="studio-overline">02 · THE EXPERIENCE</div><h2>Jak bude Axolotl vypadat?</h2><p>Živé barevné plochy, tmavé pracovní karty a přehledný obsah. Přepni téma a porovnej atmosféru.</p></div>
        <div className="studio-theme" role="group" aria-label="Barevný režim"><button type="button" className={theme==='dark'?'active':''} aria-pressed={theme==='dark'} onClick={()=>onThemeChange('dark')}>☾ Dark</button><button type="button" className={theme==='light'?'active':''} aria-pressed={theme==='light'} onClick={()=>onThemeChange('light')}>☀ Light</button></div>
      </div>
      <div className="studio-stage">
        <div className="studio-stage-head"><span className="studio-stage-logo">✳</span><strong>axolotl<span className="studio-brand-dot">.</span></strong><div className="studio-stage-nav">Workspace / Tools</div><span className="studio-stage-avatar">I</span></div>
        <div className="studio-brand-hero">
          <div className="studio-hero-orbit" aria-hidden="true"/>
          <span className="studio-hero-kicker">YOUR CREATIVE SPACE · AXOLOTL</span>
          <h3>Make work<br/>flow better.</h3>
          <p>Code by code. Pixel by pixel. One tool at a time.</p>
          <span className="studio-hero-symbol" aria-hidden="true">✦</span>
        </div>
        <div className="studio-demo-grid">
          <div className="studio-demo-card"><div className="studio-demo-card-title"><span className="studio-demo-icon">⌕</span><div><strong>Find Phrase</strong><small>Analýza obsahu stránky</small></div></div>
            <label htmlFor="studio-demo-url">URL adresa</label><input id="studio-demo-url" type="url" placeholder="https://www.o2.cz"/>
            <button className="studio-demo-primary" type="button">Analyzovat stránku <span>↗</span></button>
          </div>
          <div className="studio-demo-side">
            <div className="studio-demo-card studio-demo-metric"><span>Dokončené úkoly</span><strong>48<span>+</span></strong><div className="studio-progress"><i/></div></div>
            <div className="studio-demo-card studio-demo-o2"><span className="studio-o2-marker">O2</span><div><strong>O2 Workspace</strong><small>Firemní integrace</small></div><span className="studio-o2-arrow">↗</span></div>
          </div>
        </div>
      </div>
      <div className="studio-under-preview"><span><i style={{background:brandColors.irisPurple}}/>Akce</span><span><i style={{background:brandColors.blue}}/>Brand</span><span><i style={{background:brandColors.o2Blue}}/>O2</span><span><i style={{background:t.surface}}/>Neutrální plochy</span></div>
    </section>

    <section className="studio-panel">
      <div className="studio-section-head"><div className="studio-overline">03 · BRAND EXPRESSION</div><h2>Gradients & barevné plochy</h2><p>Gradient je hlavní výrazový prvek. Není potřeba ho dávat na každé tlačítko nebo widget.</p></div>
      <div className="studio-expression">
        <div className="studio-expression-gradient"><span>BLUE × PURPLE</span><strong>Electric by nature.</strong><code>gradient.brand</code></div>
        <div className="studio-expression-cyan"><span>SECONDARY BRAND</span><strong>Bright Blue</strong><code>{brandColors.blue}</code></div>
        <div className="studio-expression-violet"><span>PRIMARY BRAND</span><strong>Iris Purple</strong><code>{brandColors.irisPurple}</code></div>
      </div>
    </section>

    <section className="studio-panel">
      <div className="studio-section-head">
        <div className="studio-overline">04 · FIGMA COMBINATIONS</div>
        <h2>Čitelné kombinace barev</h2>
        <p>Z tvých framů jsme vybrali pouze kombinace s kontrastem alespoň 3 : 1. Větší rezerva znamená použití i pro běžné texty, menší rezerva pouze pro velké nadpisy.</p>
      </div>
      <div className="studio-combinations">
        {readableColorCombinations.map(pair => {
          const ratio = contrastRatio(pair.foreground, pair.background)
          const standard = pair.use === 'standard'
          return <div className="studio-combination" key={pair.frame}>
            <div className="studio-combination-preview" style={{backgroundColor:pair.background,color:pair.foreground}}>
              <span>AXOLOTL</span>
            </div>
            <div className="studio-combination-info">
              <div className="studio-combination-title"><strong>Frame {pair.frame}</strong><span className={standard?'studio-combination-pass':'studio-combination-limited'}>{standard?'Běžný i velký text':'Pouze velký text'}</span></div>
              <div className="studio-combination-specs"><code>{pair.background}</code><span>+</span><code>{pair.foreground}</code><strong>{ratio.toFixed(2)} : 1</strong></div>
            </div>
          </div>
        })}
      </div>
      <p className="studio-combination-note">Pro běžný text požadujeme nejméně 4,5 : 1. Varianta „pouze velký text“ má alespoň 3 : 1 a je určena minimálně pro 24px běžný text nebo přibližně 19px tučný text. Tyto kombinace nepoužívat na popisky widgetů ani malé CTA.</p>
    </section>

    <section className="studio-panel">
      <div className="studio-section-head"><div className="studio-overline">05 · HOW TO USE</div><h2>Jednoduchá pravidla</h2><p>Každá barva má svou práci. Maskot a jeho růžová/levandulová identita zůstávají samostatnou vrstvou, kterou sladíme později.</p></div>
      <div className="studio-roles">{colorRoles.map(role=><div key={role.id}><i style={{background:role.color}}/><strong>{role.name}</strong><p>{role.usage}</p></div>)}</div>
    </section>

    <details className="studio-technical">
      <summary><span><strong>Technické podklady a přesné barvy z Figmy</strong><small>Vzorník reference, technické škály, Light/Dark tokeny a kontrasty</small></span><span aria-hidden="true">⌄</span></summary>
      <div className="studio-technical-content">
        <h3>Barvy extrahované z Figmy</h3><p>Skutečné HEX hodnoty z barevných objektů ve Figma moodboardu. Tmavé UI neutrály jsou navržené zvlášť.</p>
        <div className="studio-reference-grid">{referencePalette.map(item=><button type="button" key={item.name} onClick={()=>void copy(item.hex)} title={'Kopírovat '+item.hex}><span style={{background:item.hex}}/><strong>{item.name}</strong><small>{item.role}</small><code>{item.hex}</code></button>)}</div>
        <h3>Pomocná Purple Scale</h3><Swatches items={purple}/>
        <h3>Neutral Scale</h3><Swatches items={neutral}/>
        <h3>Sémantické hodnoty · {theme}</h3><div className="studio-token-grid">{([
          ['Canvas',t.canvas],['Surface',t.surface],['Subtle',t.subtle],['Border',t.border],
          ['Text',t.text],['Muted',t.muted],['Primary',t.brand],['Secondary',t.secondary],
          ['O2 Blue',t.corporate],['Success',semantic[theme].success.foreground],
          ['Warning',semantic[theme].warning.foreground],['Error',semantic[theme].error.foreground],
          ['Info',semantic[theme].info.foreground],
        ] as const).map(([name,color])=><div className="studio-token" key={name}><i style={{background:color}}/><strong>{name}</strong><code>{color}</code></div>)}</div>
        <h3>Kontrast vybraných kombinací</h3><div className="studio-checks">{checks.map(check=>{const ratio=contrastRatio(check.fg,check.bg);return <div key={check.name}><span>{check.name}</span><strong>{ratio.toFixed(2)} : 1</strong><span className={ratio>=check.min?'pass':'review'}>{ratio>=check.min?'Splňuje':'K doladění'}</span></div>})}</div>
      </div>
    </details>
    <footer className="page-footer">Axolotl Colors v2 · Figma reference / neutral dark / Poppins unchanged</footer>
  </div>
}
