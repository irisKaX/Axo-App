import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { AxoIcon } from '../components/AxoIcon'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { radius, spacing } from '../design-system/foundations/spacing'
import './cards.css'

// Cards are content containers; their foundation is independent of WidgetFoundation.
export function BaseCard({ children }: { children?: ReactNode }) {
  return <div className="v2-base-card">{children}</div>
}

function InteractiveCard({ selected, onClick, disabled = false }: { selected: boolean; onClick?: () => void; disabled?: boolean }) {
  const uid = useId()
  return <button type="button" className="v2-base-card v2-interactive-card" aria-pressed={selected} disabled={disabled} onClick={onClick}
    aria-labelledby={uid + '-title'} aria-describedby={uid + '-description ' + uid + '-status'}>
    <span className="v2-interactive-card-top"><AxoIcon name="folder-open" size={24} /><AxoIcon className="v2-interactive-card-indicator" name={selected ? 'check' : 'arrow-right'} size={18} /></span>
    <span className="v2-card-copy"><span className="v2-card-title" id={uid + '-title'}>Můj workspace</span><span className="v2-card-description" id={uid + '-description'}>Otevři poznámky, projekty a pracovní přehledy.</span></span>
    <span className="v2-interactive-card-status" id={uid + '-status'}>{selected ? 'Vybráno' : 'Kliknutím vyber kartu.'}</span>
  </button>
}

export default function CardsV2({ theme }: { theme: ThemeName }) {
  const [selected, setSelected] = useState(false)
  const colors = colorTokens.semantic[theme]
  const states = colorTokens.interaction[theme]
  const variables = {
    '--v2-card-surface': colors.surface.default,
    '--v2-card-subtle': colors.surface.subtle,
    '--v2-card-border': colors.border.default,
    '--v2-card-text': colors.text.primary,
    '--v2-card-muted': colors.text.secondary,
    '--v2-card-success': colorTokens.status[theme].success.foreground,
    '--v2-card-hover': states.hover.background,
    '--v2-card-selected': states.selected.background,
    '--v2-card-accent': colorTokens.primitives.brand.irisPurple,
    '--v2-card-disabled-surface': states.disabled.background,
    '--v2-card-disabled-text': states.disabled.text,
    '--v2-card-radius': radius.lg + 'px',
    '--v2-card-inner-radius': radius.md + 'px',
    '--v2-card-space': spacing[6] + 'px',
    '--v2-card-inset': spacing[4] + 'px',
    '--v2-card-small-gap': spacing[3] + 'px',
    '--v2-card-copy-gap': spacing[2] + 'px',
  } as CSSProperties

  return <div className="v2-page" style={variables}>
    <div className="v2-page-title"><div><span className="v2-kicker">LIBRARY / CARDS</span><h1>Cards<span className="v2-period">.</span></h1><p>Obecné obsahové, informační a navigační kontejnery Clean Neo Iris.</p></div><span className="v2-status">NÁHLED K VIZUÁLNÍMU SCHVÁLENÍ</span></div>
    <section className="v2-panel">
      <div className="v2-section-heading"><span className="v2-kicker">01 / BASE CARD</span><h2>Jeden základ, dvě kompozice</h2><p>Neutrální povrch, jemný obrys a přirozená výška podle obsahu. Vnořené plochy pomáhají členit informace.</p></div>
      <div className="v2-cards-grid">
        <figure className="v2-card-specimen">
          <figcaption>B / Soft Layer</figcaption>
          <BaseCard>
            <div className="v2-card-copy"><h3>Přehled projektu</h3><p>Základní informace a aktuální stav.</p></div>
            <div className="v2-card-layer">
              <dl className="v2-card-details">
                <div><dt>Stav</dt><dd className="v2-card-active">Aktivní</dd></div>
                <div><dt>Upraveno</dt><dd>Dnes</dd></div>
              </dl>
            </div>
          </BaseCard>
        </figure>
        <figure className="v2-card-specimen">
          <figcaption>C / Structured</figcaption>
          <BaseCard>
            <div className="v2-card-meta"><span>PROJECT / 001</span><AxoIcon name="more-horizontal" size={18} /></div>
            <hr className="v2-card-divider" />
            <div className="v2-card-copy"><h3>Přehled projektu</h3><p>Souhrn pracovních aktivit.</p></div>
            <dl className="v2-card-stats">
              <div><dt>Úkoly</dt><dd>12</dd></div>
              <div><dt>Hotovo</dt><dd>8</dd></div>
            </dl>
          </BaseCard>
        </figure>
      </div>
    </section>
    <section className="v2-panel">
      <div className="v2-section-heading"><span className="v2-kicker">02 / INTERACTIVE CARD</span><h2>C / Hybrid</h2><p>Výběr karty kliknutím, Enterem nebo mezerníkem. Opětovná aktivace výběr zruší.</p></div>
      <div className="v2-cards-grid">
        <figure className="v2-card-specimen"><figcaption>C / Hybrid</figcaption><InteractiveCard selected={selected} onClick={() => setSelected(current => !current)} /></figure>
        <figure className="v2-card-specimen"><figcaption>Disabled</figcaption><InteractiveCard selected={false} disabled /></figure>
      </div>
    </section>
  </div>
}
