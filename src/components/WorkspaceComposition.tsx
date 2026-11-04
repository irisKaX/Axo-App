import './workspace-composition.css'

/** Shared visual pattern. Layout only; the workspace data in this preview is illustrative. */
export function WorkspaceComposition() {
  return <div className="typo-preview">
        <div className="typo-preview-intro"><span className="typo-preview-eyebrow">AXOLOTL / WORKSPACE</span><h3>Make work<br/><em>flow better.</em></h3><p>Všechny tvoje nástroje v jednom kreativním prostoru.</p></div>
        <div className="typo-preview-grid">
          <div className="typo-demo-card"><div className="typo-card-title"><span className="typo-card-symbol">⌕</span><div><strong>Find Phrase</strong><small>Vyhledávání v obsahu stránky</small></div></div><label htmlFor="typo-example-input">URL adresa</label><input id="typo-example-input" placeholder="https://www.o2.cz" type="url"/><button type="button" className="typo-action">Analyzovat stránku <span>↗</span></button></div>
          <div className="typo-demo-card typo-metric"><span>Aktivní projekty</span><strong>12</strong><small>+2 tento týden</small><div className="typo-metric-track"><i/></div></div>
        </div>
      </div>
}
