import { useId, useState, type CSSProperties } from 'react'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { radius, spacing } from '../design-system/foundations/spacing'
import './forms/forms.css'
import './loading.css'

function LoaderExample({ number, title, description, ring = false, dots = false, skeleton = false }: { number: string; title: string; description: string; ring?: boolean; dots?: boolean; skeleton?: boolean }) {
  const uid = useId()
  const [paused, setPaused] = useState(false)
  const [revision, setRevision] = useState(0)

  return <section className="v2-panel">
    <div className="v2-section-heading"><span className="v2-kicker">{number} / {title.toUpperCase()}</span><h2>{title}</h2><p>{description}</p></div>
    <div className="v2-loading-body">
      <div className="v2-loading-preview" id={uid} data-paused={paused} role="img" aria-label={title + ' · vizuální náhled'}>
        {ring ? <span key={revision} className="v2-loading-ring" aria-hidden="true" /> : dots ?
          <span key={revision} className="v2-loading-dots" aria-hidden="true"><i /><i /><i /></span> : skeleton ?
          <div key={revision} className="v2-loading-skeleton" aria-hidden="true"><div className="v2-loading-skeleton-icon" /><div className="v2-loading-skeleton-text"><i /><i /><i /></div></div> :
          <span key={revision} className="v2-loading-blades" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--v2-blade-index': index } as CSSProperties} />)}
          </span>}
      </div>
      <div className="v2-loading-controls">
        <button type="button" className="v2-button v2-button--outline" aria-controls={uid}
          aria-label={(paused ? 'Spustit' : 'Pozastavit') + ' animaci ' + title} onClick={() => setPaused(current => !current)}>
          <span className="v2-button__content">{paused ? 'Spustit animaci' : 'Pozastavit animaci'}</span>
        </button>
        <button type="button" className="v2-button v2-button--ghost" aria-controls={uid}
          aria-label={'Restartovat animaci ' + title} onClick={() => { setRevision(current => current + 1); setPaused(false) }}>
          <span className="v2-button__content">Restartovat</span>
        </button>
      </div>
    </div>
  </section>
}

function CircularProgressExample({ theme }: { theme: ThemeName }) {
  const uid = useId()
  const [progress, setProgress] = useState(65)
  // Reuse the existing V2 range control with its central theme bindings.
  const sliderColors = {
    '--v2f-brand': colorTokens.primitives.brand.irisPurple,
    '--v2f-border': colorTokens.semantic[theme].border.default,
    '--v2f-focus': colorTokens.interaction[theme].focus.ring,
    '--v2f-radius-pill': radius.pill + 'px',
    '--v2f-quality-progress': progress + '%',
  } as CSSProperties

  return <section className="v2-panel" style={sliderColors}>
    <div className="v2-section-heading"><span className="v2-kicker">04 / CIRCULAR PROGRESS</span><h2>Circular Progress</h2><p>74 px · prstenec 8 px · výchozí hodnota 65 %. Původní kruhový indikátor s ruční změnou hodnoty.</p></div>
    <div className="v2-loading-body">
      <div className="v2-loading-preview">
        <div className="v2-loading-circular" id={uid + '-progress'} role="progressbar" aria-label="Dokončeno"
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} style={{ '--v2-circular-progress': progress } as CSSProperties}>
          <div><strong>{progress}%</strong></div>
        </div>
      </div>
      <div className="v2-loading-progress-control">
        <label htmlFor={uid + '-slider'}>Dokončeno: {progress} %</label>
        <input id={uid + '-slider'} className="v2f-quality-range" type="range" min={0} max={100} step={1}
          value={progress} onChange={event => setProgress(Number(event.currentTarget.value))} aria-controls={uid + '-progress'} aria-valuetext={progress + ' procent'} />
      </div>
    </div>
  </section>
}

function LinearProgressExample({ theme }: { theme: ThemeName }) {
  const uid = useId()
  const [progress, setProgress] = useState(65)
  const sliderColors = {
    '--v2f-brand': colorTokens.primitives.brand.irisPurple,
    '--v2f-border': colorTokens.semantic[theme].border.default,
    '--v2f-focus': colorTokens.interaction[theme].focus.ring,
    '--v2f-radius-pill': radius.pill + 'px',
    '--v2f-quality-progress': progress + '%',
  } as CSSProperties

  return <section className="v2-panel" style={sliderColors}>
    <div className="v2-section-heading"><span className="v2-kicker">06 / LINEAR PROGRESS</span><h2>Linear Progress</h2><p>Původní stopa 9 px · Blue × Purple · výchozí hodnota 65 %. Ruční změna hodnoty s přechodem šířky 0,24 s.</p></div>
    <div className="v2-loading-body">
      <div className="v2-loading-preview">
        <div className="v2-loading-linear-example">
          <div className="v2-loading-linear-head"><span>Konverze souborů</span><strong>{progress}%</strong></div>
          <div className="v2-loading-linear" id={uid + '-progress'} role="progressbar" aria-label="Ukázkový průběh konverze"
            aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} style={{ '--v2-linear-progress': progress + '%' } as CSSProperties}><span /></div>
        </div>
      </div>
      <div className="v2-loading-progress-control">
        <label htmlFor={uid + '-slider'}>Dokončeno: {progress} %</label>
        <input id={uid + '-slider'} className="v2f-quality-range" type="range" min={0} max={100} step={1}
          value={progress} onChange={event => setProgress(Number(event.currentTarget.value))} aria-controls={uid + '-progress'} aria-valuetext={progress + ' procent'} />
      </div>
    </div>
  </section>
}

export default function LoadingV2({ theme }: { theme: ThemeName }) {
  const variables = {
    '--v2-loading-blade': theme === 'dark' ? colorTokens.interaction.dark.focus.ring : colorTokens.interaction.outline.hoverBorder,
    '--v2-loading-gap': spacing[6] + 'px',
    '--v2-loading-radius': radius.lg + 'px',
    '--v2-loading-radius-sm': radius.sm + 'px',
  } as CSSProperties

  return <div className="v2-page v2-loading-page" style={variables}>
    <div className="v2-page-title"><div><span className="v2-kicker">LIBRARY / LOADING & PROGRESS</span><h1>Loading <span className="v2-period">& Progress.</span></h1><p>Původní loadery, kruhový i lineární průběh a Skeleton Clean Neo Iris. Samostatné ovládání ukázek, vzhled podle společného motivu katalogu.</p></div><span className="v2-status">NÁHLED K VIZUÁLNÍMU SCHVÁLENÍ</span></div>
    <LoaderExample number="01" title="Gradient Ring" ring description="40 px · původní tloušťka prstence · Blue × Purple · plynulá rotace za 0,65 s." />
    <LoaderExample number="02" title="Blade Spinner" description="36 px · 12 původních lamel · postupné zhasínání v cyklu 1 s. Barevnost zachovaná pro Dark i Light Mode." />
    <LoaderExample number="03" title="Loading Dots" dots description="Tři tečky po 9 px · rozestupy 7 px · Iris Purple. Původní pulzování v cyklu 1,1 s s prodlevami 0,15 a 0,3 s." />
    <CircularProgressExample theme={theme} />
    <LoaderExample number="05" title="Skeleton" skeleton description="Plocha 44 × 44 px a tři řádky s původními proporcemi. Neutrální shimmer s cyklem 1,7 s a původním směrem pohybu." />
    <LinearProgressExample theme={theme} />
    <p className="v2-loading-note">Pouze vizuální ukázky. Při zapnutém omezení pohybu zůstávají všechny loadery statické i po spuštění nebo restartu.</p>
  </div>
}
