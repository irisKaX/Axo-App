import { useState } from 'react'
import { brandColors, semantic, themes, type ThemeName } from '../design-system/foundations/colors'
import { brandUsage, foundationRoles, getGradientInventory, neutralInventory, neutralUsage, statusNames, statusUsage } from '../design-system/foundations/color-usage'
import './color-inventory.css'

type CopyButtonProps = { value: string; copied: string; onCopy: (value: string) => void }
function CopyValue({ value, copied, onCopy }: CopyButtonProps) {
  return <button className="ci-copy" type="button" onClick={() => onCopy(value)} title={'Kopírovat ' + value}>
    {copied === value ? '✓ Zkopírováno' : value}
  </button>
}

export function ColorInventory({ theme }: { theme: ThemeName }) {
  const [copied, setCopied] = useState('')
  const t = themes[theme]
  const copy = async (value: string) => {
    try { await navigator.clipboard.writeText(value); setCopied(value) }
    catch { setCopied('') }
  }
  const semanticTokens = Object.entries(t).filter(([key]) => key !== 'gradient' && key !== 'backdrop')
    as [keyof typeof foundationRoles, string][]

  return <div className="ci-inventory">
    <section className="studio-panel">
      <div className="studio-section-head">
        <div className="studio-overline">07 · SEMANTIC TOKENS</div>
        <h2>Barvy rozhraní · {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</h2>
        <p>Úplná aktuální sada hodnot z <code>themes.{theme}</code>. Barvy mění význam podle role, ne podle jednotlivé stránky. Přepnutím tématu se změní i celý tento přehled.</p>
      </div>
      <div className="ci-token-grid">
        {semanticTokens.map(([key, hex]) => <article className="ci-token" key={key}>
          <span className="ci-token-swatch" style={{ background: hex }} />
          <div className="ci-token-info">
            <strong>{key}</strong>
            <small>{foundationRoles[key]}</small>
            <code>theme.{theme}.{key}</code>
            <CopyValue value={hex} copied={copied} onCopy={copy}/>
          </div>
        </article>)}
      </div>
      <div className="ci-rule">
        <strong>Schválené pravidlo ploch</strong>
        <p>V Dark Mode je <code>Canvas #090B10</code> hlavní pozadí aplikace a Dashboardu. <code>Surface #141820</code> tvoří widgety, karty a vnitřek URL display. <code>Subtle #222832</code> je pouze další neutrální vrstva. Používej tokeny <code>--canvas</code>, <code>--surface</code> a <code>--subtle</code>, ne ručně kopírované HEX hodnoty.</p>
      </div>
    </section>
    <section className="studio-panel">
      <div className="studio-section-head">
        <div className="studio-overline">08 · BRAND INVENTORY</div>
        <h2>Kompletní brand paleta</h2>
        <p>Všechny hodnoty z <code>brandColors</code>, včetně podpůrných odstínů pro maskota, O2, ikonky a dekorativní efekty. Barva ve vzorníku neznamená automatické povolení použít ji na libovolnou UI plochu.</p>
      </div>
      <div className="ci-token-grid">
        {(Object.entries(brandColors) as [keyof typeof brandColors,string][]).map(([key,hex])=><article className="ci-token" key={key}>
          <span className="ci-token-swatch" style={{background:hex}}/>
          <div className="ci-token-info">
            <strong>{key}</strong><small>{brandUsage[key]}</small><code>brandColors.{key}</code>
            <CopyValue value={hex} copied={copied} onCopy={copy}/>
          </div>
        </article>)}
      </div>
    </section>
    <section className="studio-panel">
      <div className="studio-section-head">
        <div className="studio-overline">09 · APPROVED EFFECTS</div>
        <h2>Gradienty a efekty s přesným použitím</h2>
        <p>Brand, Atmosphere, navigační fialová a Orbital Glow jsou <strong>odlišné vzory</strong>. Náhledy vycházejí z aktuálních tokenů nebo z jejich existujících CSS proměnných; nejde o nově namíchané varianty.</p>
      </div>
      <div className="ci-gradient-grid">
        {getGradientInventory(theme).map(item=><article className="ci-gradient-card" key={item.id}>
          <div className={'ci-gradient-preview'+(item.id==='orbital'?' ci-gradient-preview--orbital':'')} style={{background:item.id==='orbital'?t.surface:item.value}}>
            {item.id==='orbital' && <span className="ci-orbital-demo" aria-label="Ukázka okružního světelného obrysu"><span/></span>}
          </div>
          <div className="ci-gradient-body">
            <strong>{item.name}</strong>
            <code>{item.token}</code>
            <p>{item.usage}</p>
            <small>{item.details}</small>
            <CopyValue value={item.value} copied={copied} onCopy={copy}/>
          </div>
        </article>)}
      </div>
      <div className="ci-rule">
        <strong>Pravidlo gradientů</strong>
        <p>Blue × Purple zůstává brand gradientem. Fialový gradient navigace vychází z přepínače tématu. Orbital Glow je efekt pouze na obrysu, ne další výplň. Atmosphere může zdobit vybrané kompozice, ale hlavní Canvas zůstává neutrální.</p>
      </div>
    </section>
    <section className="studio-panel">
      <div className="studio-section-head">
        <div className="studio-overline">10 · FEEDBACK COLORS</div>
        <h2>Stavové barvy a sémantika</h2>
        <p>Přesné popředí, pozadí a border z <code>semantic.{theme}</code>. Nezaměňovat za navigační stav Current nebo hover tlačítka.</p>
      </div>
      <div className="ci-feedback-grid">
        {statusNames.map(key=>{
          const value = semantic[theme][key]
          return <article className="ci-feedback" key={key} style={{background:value.background,borderColor:value.border,color:value.foreground}}>
            <strong>{key}</strong>
            <p>{statusUsage[key]}</p>
            <div><span>Text</span><CopyValue value={value.foreground} copied={copied} onCopy={copy}/></div>
            <div><span>Background</span><CopyValue value={value.background} copied={copied} onCopy={copy}/></div>
            <div><span>Border</span><CopyValue value={value.border} copied={copied} onCopy={copy}/></div>
          </article>
        })}
      </div>
    </section>
    <section className="studio-panel">
      <div className="studio-section-head">
        <div className="studio-overline">11 · NEUTRAL REFERENCE</div>
        <h2>Úplná neutrální škála</h2>
        <p>Škála 50–950 je referenční sada. Pro funkční komponenty používej primárně pojmenované sémantické tokeny, zejména Canvas, Surface a Subtle.</p>
      </div>
      <div className="ci-token-grid">
        {neutralInventory.map(([step,hex])=><article className="ci-token" key={step}>
          <span className="ci-token-swatch" style={{background:hex}}/>
          <div className="ci-token-info"><strong>Neutral {step}</strong><small>{neutralUsage[step]}</small><code>neutral.{step}</code>
          <CopyValue value={hex} copied={copied} onCopy={copy}/></div>
        </article>)}
      </div>
    </section>
  </div>
}
