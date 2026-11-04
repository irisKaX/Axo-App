import { useState, type CSSProperties } from 'react'
import BrandExpression from './pages/BrandExpression'
import VisualDirections from './pages/VisualDirections'
import ColorStudio from './pages/ColorStudio'
import TypographyStudio from './pages/TypographyStudio'
import SpacingStudio from './pages/SpacingStudio'
import ButtonsStudio from './pages/ButtonsStudio'
import { semantic, themes, type ThemeName } from './design-system/foundations/colors'

type Section = 'expression' | 'colors' | 'visual' | 'typography' | 'spacing' | 'components' | 'widgets' | 'layouts'
const groups: { title: string; items: { id: Section; label: string }[] }[] = [
  { title: 'FOUNDATIONS', items: [
    { id: 'colors', label: 'Colors' },
    { id: 'expression', label: 'Brand Expression' },
    { id: 'visual', label: 'Visual Direction' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing & Grid' },
  ] },
  { title: 'LIBRARY', items: [
    { id: 'components', label: 'Components / Buttons' },
    { id: 'widgets', label: 'Widgets' },
    { id: 'layouts', label: 'Layouts' },
  ] },
]

export default function App() {
  const [section, setSection] = useState<Section>('colors')
  const [theme, setTheme] = useState<ThemeName>('dark')
  const t = themes[theme]
  const vars = {
    '--canvas': t.canvas, '--surface': t.surface, '--subtle': t.subtle, '--border': t.border,
    '--text': t.text, '--muted': t.muted, '--brand': t.brand, '--brand-text': t.brandText,
    '--brand-soft': t.brandSoft, '--control-border': t.controlBorder, '--focus-ring': t.focusRing,
    '--action-hover': t.actionHover, '--action-active': t.actionActive, '--action-disabled': t.actionDisabled,
    '--action-disabled-text': t.actionDisabledText, '--accent': t.accent, '--brand-gradient': t.gradient,
    '--backdrop': t.backdrop, '--glow': t.glow, '--corporate': t.corporate,
    '--corporate-text': t.corporateText, '--mascot': t.mascot, '--lilac': t.lilac,
    '--secondary': t.secondary, '--secondary-text': t.secondaryText,
    '--success': semantic[theme].success.foreground, '--error': semantic[theme].error.foreground,
  } as CSSProperties
  return <div className="app-shell" style={vars} data-theme={theme}>
    <aside className="sidebar">
      <button className="logo" onClick={() => setSection('colors')} type="button" aria-label="Axo-App: domů na Colors">
        <span className="logo-icon">A</span>
        <span><strong>Axo-App</strong><small>Design System</small></span>
      </button>
      {groups.map(group=><nav className="nav-group" key={group.title} aria-label={group.title}>
        <p className="nav-heading">{group.title}</p>
        {group.items.map(item=><button type="button" key={item.id} className={'nav-item '+(section===item.id?'active':'')} aria-current={section===item.id?'page':undefined} onClick={()=>setSection(item.id)}>
          {item.label}{section===item.id&&<span className="nav-dot"/>}
        </button>)}
      </nav>)}
      <div className="sidebar-bottom">NEO IRIS · DESIGN FOUNDATION</div>
    </aside>
    <div className="workspace">
      <header className="topbar">
        <span className="breadcrumbs">Design System <span>/</span> {section==='colors'?'Foundations / Colors':section==='expression'?'Foundations / Brand Expression':section==='visual'?'Foundations / Visual Direction':section==='spacing'?'Foundations / Spacing & Grid':section==='components'?'Library / Components / Buttons':section}</span>
        <div className="theme-toggle" role="group" aria-label="Téma katalogu">
          <button type="button" className={theme==='light'?'chosen':''} onClick={()=>setTheme('light')} aria-pressed={theme==='light'}>☀ Light</button>
          <button type="button" className={theme==='dark'?'chosen':''} onClick={()=>setTheme('dark')} aria-pressed={theme==='dark'}>☾ Dark</button>
        </div>
      </header>
      <main className="main">
        {section==='colors'?<ColorStudio theme={theme} onThemeChange={setTheme}/>:
          section==='expression'?<BrandExpression/>:
          section==='visual'?<VisualDirections theme={theme}/>:
          section==='typography'?<TypographyStudio/>:
          section==='spacing'?<SpacingStudio/>:
          section==='components'?<ButtonsStudio/>:
          <section className="panel placeholder"><p className="eyebrow">PŘIPRAVUJEME</p>
            <h1>{groups.flatMap(group=>group.items).find(item=>item.id===section)?.label}</h1>
            <p>Tu část design systému vytvoříme až po dokončení Colors.</p>
            <button type="button" className="return-action" onClick={()=>setSection('colors')}>Zpět na Colors</button>
          </section>}
      </main>
    </div>
  </div>
}
