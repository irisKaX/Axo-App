import React from 'react'
import { createRoot } from 'react-dom/client'
import { AxoButton, buttonSizes } from '../../src/components/Buttons'
import { themes } from '../../src/design-system/foundations/colors'
import '../../src/styles.css'

const theme = new URLSearchParams(location.search).get('theme') === 'light' ? 'light' : 'dark'
const colors = themes[theme]
const requestedMotion = new URLSearchParams(location.search).get('motion')
const motion = requestedMotion === 'none' || requestedMotion === 'spin' ? requestedMotion : 'beam'
createRoot(document.getElementById('root')!).render(
  <div style={{ background: colors.canvas, color: colors.text, padding: 32,
    '--brand': colors.brand, '--brand-soft': colors.brandSoft,
    '--focus-ring': colors.focusRing, '--surface': colors.surface,
    '--text': colors.text,
  } as React.CSSProperties}>
    <h1>{theme} · Border Beam</h1>
    {buttonSizes.map(size => <div key={size} style={{display:'flex',gap:24,alignItems:'center',padding:20}}>
      <span style={{width:100}}>{size}</span>
      {['OK', 'Pokračovat', 'Analyzovat vybranou stránku'].map(label =>
        <AxoButton key={label} variant="gradient" borderMotion={motion} size={size} iconRight="arrow-right">{label}</AxoButton>)}
      <AxoButton variant="gradient" borderMotion={motion} size={size} iconOnly icon="plus" aria-label={size + ' icon'}/>
    </div>)}
  </div>,
)
