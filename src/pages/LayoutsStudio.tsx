import { useState } from 'react'
import { layoutExamples } from '../layouts/LayoutDemonstrations'
import { ViewportPreview } from '../layouts/ViewportPreview'
import type { ThemeName } from '../design-system/foundations/colors'
import './layouts-studio.css'

export default function LayoutsStudio({ theme, onThemeChange }: { theme: ThemeName; onThemeChange: (theme: ThemeName) => void }) {
  const [id, setId] = useState<string>('workspace')
  const active = layoutExamples.find(item => item.id === id)!
  return <div className="ls-page">
    <p className="eyebrow">LIBRARY / LAYOUTS</p>
    <h1>Layouts<span className="heading-accent">.</span></h1>
    <p className="intro">Sdílená architektura aplikace a nástrojů. Skutečné komponenty, skutečné rozměry a stejný strom jako na samostatné stránce.</p>
    <section aria-labelledby="layout-system-title">
      <h2 id="layout-system-title">Axolotl Layout System</h2>
      <nav className="ls-category-nav" aria-label="Axolotl Layout System">
        {layoutExamples.map(item => <button key={item.id} type="button" aria-current={id === item.id ? 'page' : undefined} onClick={() => setId(item.id)}>{item.label}</button>)}
      </nav>
      <div className="ls-layout-description"><h3>{active.label}</h3><p>{active.description}</p></div>
      <ViewportPreview key={id} id={id} label={active.label} theme={theme} onThemeChange={onThemeChange}/>
    </section>
    <footer className="page-footer">AppShell → ToolShell → Layout → Obsah nástroje · Clean Neo Iris · v1.0</footer>
  </div>
}
