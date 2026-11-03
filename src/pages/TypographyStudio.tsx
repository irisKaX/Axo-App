import { useState, type CSSProperties } from 'react'
import { typography, typographySamples, fontWeights, fontFamilies, type TypographyRole } from '../design-system/foundations/typography'
import './typography-studio.css'

const sampleRoles: TypographyRole[] = ['display', 'h1', 'h2', 'h3', 'h4', 'bodyLg', 'body', 'bodySm', 'label', 'button', 'caption', 'overline']
const friendlyNames: Record<TypographyRole,string> = {
  display:'Display', h1:'Heading 1', h2:'Heading 2', h3:'Heading 3', h4:'Heading 4',
  bodyLg:'Body Large', body:'Body', bodySm:'Body Small', label:'Label', button:'Button',
  caption:'Caption', overline:'Overline',
}

function roleStyle(role: TypographyRole): CSSProperties {
  const token = typography[role]
  return {
    fontFamily: fontFamilies.ui,
    fontSize: token.size,
    fontWeight: token.weight,
    lineHeight: token.lineHeight,
    letterSpacing: token.tracking + 'em',
  }
}

export default function TypographyStudio() {
  const [example, setExample] = useState('Všechno na jednom místě. Přehledně a s radostí.')
  const [weight, setWeight] = useState(600)
  const [size, setSize] = useState(28)
  const [spacing, setSpacing] = useState(0)
  return <div className="typo-page">
    <p className="eyebrow">FOUNDATIONS / TYPOGRAPHY</p>
    <h1>Typography<span className="heading-accent">.</span></h1>
    <p className="intro">Poppins pro přátelský charakter Axolotlu a přitom jasnou pracovní hierarchii. Nejprve použití v rozhraní, podrobné hodnoty až níže.</p>
    <div className="typo-status">POPPINS · PRVNÍ NÁVRH TYPOGRAFIE</div>

    <section className="typo-panel">
      <div className="typo-section-head"><span className="typo-kicker">01 · FONT FAMILY</span><h2>Jedno písmo, jasná identita.</h2><p>Zaoblené tvary Poppins ladí s maskotem. Technické hodnoty a kód mohou používat systémový monospace.</p></div>
      <div className="typo-family">
        <div><span className="typo-kicker">PRIMARY FONT</span><div className="typo-family-display">Poppins<span>.</span></div><p>ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ · abcdefghijklmnopqrstuvwxyz · 0123456789</p></div>
        <div className="typo-family-side"><span>Jazyk a diakritika</span><strong>Čeština · English</strong><span>UI řezy</span><strong>400 / 500 / 600 / 700</strong><span>Technické hodnoty</span><code>ui-monospace</code></div>
      </div>
    </section>

    <section className="typo-panel">
      <div className="typo-section-head"><span className="typo-kicker">02 · REAL INTERFACE</span><h2>Jak Poppins funguje v aplikaci</h2><p>Stejný styl pro nadpisy, texty, input, tlačítko a widget. Přepínač Light/Dark celého katalogu funguje i zde.</p></div>
      <div className="typo-preview">
        <div className="typo-preview-intro"><span className="typo-preview-eyebrow">AXOLOTL / WORKSPACE</span><h3>Make work<br/><em>flow better.</em></h3><p>Všechny tvoje nástroje v jednom kreativním prostoru.</p></div>
        <div className="typo-preview-grid">
          <div className="typo-demo-card"><div className="typo-card-title"><span className="typo-card-symbol">⌕</span><div><strong>Find Phrase</strong><small>Vyhledávání v obsahu stránky</small></div></div><label htmlFor="typo-example-input">URL adresa</label><input id="typo-example-input" placeholder="https://www.o2.cz" type="url"/><button type="button" className="typo-action">Analyzovat stránku <span>↗</span></button></div>
          <div className="typo-demo-card typo-metric"><span>Aktivní projekty</span><strong>12</strong><small>+2 tento týden</small><div className="typo-metric-track"><i/></div></div>
        </div>
      </div>
    </section>

    <section className="typo-panel">
      <div className="typo-section-head"><span className="typo-kicker">03 · TYPE SCALE</span><h2>Typografická hierarchie</h2><p>12 pojmenovaných rolí, které budou komponenty sdílet. Velikosti jsou výchozí návrh, nikoliv povinné hodnoty pro všechny obrazovky.</p></div>
      <div className="typo-scale">
        {sampleRoles.map(role => <div className="typo-scale-row" key={role}>
          <div className="typo-scale-meta"><strong>{friendlyNames[role]}</strong><span>{typography[role].size} px · {typography[role].weight}</span></div>
          <div className="typo-scale-sample" style={roleStyle(role)}>{typographySamples[role]}</div>
        </div>)}
      </div>
    </section>

    <section className="typo-panel">
      <div className="typo-section-head"><span className="typo-kicker">04 · FONT WEIGHTS</span><h2>Čtyři váhy stačí</h2><p>Nemusíme mít každou variantu od Thin po Black. Méně vah pomáhá udržet konzistenci.</p></div>
      <div className="typo-weights">{fontWeights.map(item=><div key={item.value}><span>{item.name} / {item.value}</span><strong style={{fontWeight:item.value}}>Axolotl Aa</strong></div>)}</div>
    </section>

    <section className="typo-panel">
      <div className="typo-section-head"><span className="typo-kicker">05 · TYPOGRAPHY PLAYGROUND</span><h2>Vyzkoušej si vlastní text</h2><p>Uprav velikost, váhu a rozestupy a podívej se, jak se písmo chová. Změny jsou pouze v tomto náhledu.</p></div>
      <div className="typo-playground">
        <div className="typo-controls">
          <label htmlFor="typo-text">Ukázkový text</label><input id="typo-text" value={example} onChange={e=>setExample(e.target.value)} maxLength={140}/>
          <label htmlFor="typo-size">Velikost: <strong>{size} px</strong></label><input id="typo-size" type="range" min="12" max="56" step="1" value={size} onChange={e=>setSize(Number(e.target.value))}/>
          <label htmlFor="typo-weight">Váha</label><select id="typo-weight" value={weight} onChange={e=>setWeight(Number(e.target.value))}>{fontWeights.map(w=><option value={w.value} key={w.value}>{w.name} · {w.value}</option>)}</select>
          <label htmlFor="typo-spacing">Letter spacing: <strong>{spacing.toFixed(2)} em</strong></label><input id="typo-spacing" type="range" min="-0.05" max="0.1" step="0.005" value={spacing} onChange={e=>setSpacing(Number(e.target.value))}/>
        </div>
        <div className="typo-playground-result" style={{fontSize:size,fontWeight:weight,letterSpacing:spacing+'em'}}>{example || 'Napiš ukázkový text…'}</div>
      </div>
    </section>

    <details className="typo-technical"><summary><span><strong>Technické specifikace</strong><small>Tokeny, velikosti, řádkování a tracking pro vývoj</small></span><span aria-hidden="true">⌄</span></summary>
      <div className="typo-technical-body"><table><thead><tr><th>Token</th><th>Velikost</th><th>Váha</th><th>Line height</th><th>Tracking</th></tr></thead><tbody>{sampleRoles.map(role=><tr key={role}><td><code>type.{role}</code></td><td>{typography[role].size}px</td><td>{typography[role].weight}</td><td>{typography[role].lineHeight}</td><td>{typography[role].tracking}em</td></tr>)}</tbody></table><p>U malých textů dáme přednost čitelnosti před hustotou informací. Běžná data a popisky v pracovních widgetech by neměly automaticky končit na 10 px.</p></div>
    </details>
    <footer className="page-footer">Axo-App · Typography · Poppins · Candidate v1</footer>
  </div>
}
