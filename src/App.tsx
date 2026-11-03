const sections = [
  { index: '01', name: 'Foundations', description: 'Design tokens, typografie, barvy, spacing a grid.' },
  { index: '02', name: 'Components', description: 'Znovupoužitelné UI prvky a jejich stavy.' },
  { index: '03', name: 'Widgets', description: 'Malé a velké pracovní nástroje.' },
  { index: '04', name: 'Layouts', description: 'Dashboard, workspace a responzivní chování.' },
]

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark" aria-hidden="true">A</span><span>Axo-App</span></div>
        <span className="topbar-label">Foundation / v0.1</span>
      </header>

      <main className="main">
        <p className="eyebrow">AXOLOTL 2.0 · NEW FOUNDATION</p>
        <h1>Prostor pro nový začátek.</h1>
        <p className="intro">
          Zatím jen funkční základ aplikace. Vizuální pravidla, komponenty a widgety
          budeme navrhovat a ověřovat postupně, bez přenášení starého katalogu.
        </p>
        <section className="section-grid" aria-label="Oblasti aplikace">
          {sections.map((section) => (
            <article className="section-card" key={section.index}>
              <span className="section-index">{section.index}</span>
              <h2>{section.name}</h2>
              <p>{section.description}</p>
            </article>
          ))}
        </section>
        <footer>React · TypeScript · Vite</footer>
      </main>
    </div>
  )
}
