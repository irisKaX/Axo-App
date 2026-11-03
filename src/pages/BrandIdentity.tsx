import { useState } from 'react'
import { mascotAsset, mascotPalette } from '../design-system/foundations/brand'
import './brand-identity.css'

type PreviewTheme = 'dark' | 'light'

function Mascot({ className = '' }: { className?: string }) {
  return <img className={className} src={mascotAsset.preview} alt={mascotAsset.description} loading="lazy" />
}

export default function BrandIdentity() {
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('dark')
  const [copied, setCopied] = useState<string | null>(null)
  async function copyColor(hex: string) {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
    } catch {
      setCopied(null)
    }
  }

  return <div className="brand-page">
    <div className="eyebrow">FOUNDATIONS · BRAND IDENTITY</div>
    <h1>Meet <span className="heading-accent">Axolotl.</span></h1>
    <p className="intro">Hlavní maskot aplikace, jeho vizuální identita a pravidla použití. Vycházíme z originálního obrázku a barevné atmosféry Neo Iris.</p>
    <div className="brand-status">● MASCOT REFERENCE · ACCENTS CANDIDATE</div>

    <section className="brand-hero" aria-label="Hlavní podoba maskota">
      <div className="brand-hero-art">
        <div className="brand-hero-halo" aria-hidden="true" />
        <Mascot className="brand-master" />
      </div>
      <div className="brand-hero-copy">
        <span className="brand-kicker">01 / CHARACTER MASTER</span>
        <h2>Malý axolotl.<br /><em>Velká osobnost.</em></h2>
        <p>Růžové žábry, velké fialové oči, levandulová mikina a příjemný výraz. Tyto charakteristické rysy musí zůstat konzistentní ve všech dalších ilustracích.</p>
        <div className="brand-traits"><span>Friendly</span><span>Expressive</span><span>Soft 3D</span><span>Neo Iris</span></div>
        <div className="brand-master-note">Použitý obrázek je optimalizovaný náhled dodaného masteru. Pro finální velkoformátové použití zachováme originál v plném rozlišení.</div>
      </div>
    </section>

    <section className="panel brand-panel">
      <div className="section-top"><div><div className="eyebrow">02 · MASCOT COLOR DNA</div><h2>Brand Accent Palette</h2><p>Barvy harmonizované s maskotem a Neo Iris. Tyto akcenty doplňují hlavní barevný systém, nenahrazují sémantické statusové barvy.</p></div><span className="annotation">6 charakterových barev</span></div>
      <div className="brand-colors">
        {mascotPalette.map(color => <button className="brand-color" type="button" key={color.id} onClick={() => void copyColor(color.hex)} title={'Kopírovat ' + color.hex}>
          <span className="brand-color-swatch" style={{ background: color.hex }} />
          <span className="brand-color-name">{color.name}</span>
          <code>{copied === color.hex ? '✓ Zkopírováno' : color.hex}</code>
          <small>{color.role}</small>
        </button>)}
      </div>
      <div className="brand-info">Výběr odstínů je zatím návrh inspirovaný vzhledem maskota, nikoli přesné vzorkování pixelů. Finální hodnoty a WCAG kontrasty sjednotíme ve Foundations → Colors.</div>
    </section>

    <section className="panel brand-panel">
      <div className="section-top">
        <div><div className="eyebrow">03 · IN CONTEXT</div><h2>Neo Iris × Mascot</h2><p>Maskot potřebuje fungovat v obou režimech, aniž by se měnily jeho vlastní barvy.</p></div>
        <div className="brand-theme-switch" role="group" aria-label="Barevný režim náhledu">
          <button type="button" aria-pressed={previewTheme === 'light'} className={previewTheme === 'light' ? 'active' : ''} onClick={() => setPreviewTheme('light')}>☀ Light</button>
          <button type="button" aria-pressed={previewTheme === 'dark'} className={previewTheme === 'dark' ? 'active' : ''} onClick={() => setPreviewTheme('dark')}>☾ Dark</button>
        </div>
      </div>
      <div className={'brand-context brand-context-' + previewTheme}>
        <div className="brand-context-content">
          <span className="brand-context-eyebrow"><span aria-hidden="true">✦</span> YOUR SPACE, YOUR FLOW</span>
          <h3>Práce může být<br /><em>radost.</em></h3>
          <p>Nástroje, nápady a projekty na jednom místě.</p>
          <div className="brand-context-actions"><span className="brand-context-primary">Explore tools ↗</span><span className="brand-context-secondary">Open workspace</span></div>
        </div>
        <div className="brand-context-art"><Mascot className="brand-context-mascot" /></div>
      </div>
    </section>

    <section className="panel brand-panel">
      <div className="section-top"><div><div className="eyebrow">04 · APPLICATION</div><h2>Where the mascot belongs</h2><p>Maskot dodává charakter, ale nemá odvádět pozornost od práce ve widgetech.</p></div></div>
      <div className="brand-usage-grid">
        <div className="brand-usage">
          <div className="brand-usage-visual brand-usage-welcome"><Mascot className="brand-usage-image" /></div>
          <strong>Welcome & Onboarding</strong><p>Velká ilustrace, uvítání, první seznámení s aplikací.</p>
        </div>
        <div className="brand-usage">
          <div className="brand-usage-visual brand-usage-support"><div className="brand-usage-bubble">Ahoj! S čím dnes pomůžu?</div><Mascot className="brand-usage-image" /></div>
          <strong>Empty States & Help</strong><p>Smysluplné momenty, kdy maskot doplňuje krátkou radu nebo zpětnou vazbu.</p>
        </div>
        <div className="brand-usage">
          <div className="brand-usage-visual brand-usage-icon"><div className="brand-icon-placeholder"><span>?</span></div><span className="brand-icon-caption">2D HEAD · TO DESIGN</span></div>
          <strong>Logo & Small Sizes</strong><p>Pro 16–48 px nejdřív vytvoříme samostatnou ikonickou hlavičku. 3D render nepoužívat jako favicon.</p>
        </div>
      </div>
    </section>

    <section className="panel brand-panel">
      <div className="section-top"><div><div className="eyebrow">05 · USAGE PRINCIPLES</div><h2>Keep the character consistent</h2><p>Výchozí pravidla, která ochrání identitu maskota před náhodnými variantami.</p></div></div>
      <div className="brand-rule-grid">
        <div className="brand-rule brand-rule-do"><span className="brand-rule-mark">✓</span><strong>Keep</strong><p>Růžové žábry, jemný přátelský výraz, velké fialové oči, přirozené proporce a levandulovou mikinu.</p></div>
        <div className="brand-rule brand-rule-dont"><span className="brand-rule-mark">×</span><strong>Avoid</strong><p>Náhodné jiné obličeje, odlišné žábry, přebarvenou mikinu, přeplněné efekty a maskota uvnitř každého widgetu.</p></div>
      </div>
    </section>
    <footer className="page-footer">Axo-App · Brand Identity · Mascot master reference / candidate palette</footer>
  </div>
}
