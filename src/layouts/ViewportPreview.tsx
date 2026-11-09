import { useEffect, useRef, useState } from 'react'
import { FormSelect } from '../components/FormControls'
import type { ThemeName } from '../design-system/foundations/colors'
import type { LayoutState } from './primitives'

export const viewportPresets = [
  { value: 'small', label: 'Laptop Small · 1366 × 768', width: 1366, height: 768 },
  { value: 'laptop', label: 'Laptop · 1440 × 900', width: 1440, height: 900 },
  { value: 'desktop', label: 'Desktop · 1920 × 1080', width: 1920, height: 1080 },
  { value: 'mobile', label: 'Mobile · 390 × 844', width: 390, height: 844 },
]

/** One isolated browsing context at 1 CSS pixel per pixel. Never scale the app. */
export function ViewportPreview({ id, label, theme, onThemeChange }: { id: string; label: string; theme: ThemeName; onThemeChange: (theme: ThemeName) => void }) {
  const [presetId, setPresetId] = useState('small')
  const [state, setState] = useState<LayoutState>('empty')
  const [panels, setPanels] = useState('visible')
  const [presentation, setPresentation] = useState('expanded')
  const frame = useRef<HTMLIFrameElement>(null)
  const preset = viewportPresets.find(item => item.value === presetId)!
  const query = new URLSearchParams({ preview: id, state, panels, presentation })
  // Theme messages preserve files and edits instead of reloading the page.
  const src = `${location.pathname}?${query}`
  const sendTheme = () => frame.current?.contentWindow?.postMessage({ type: 'axo-layout-theme', theme }, location.origin)
  useEffect(sendTheme, [theme])
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return
      if (event.data?.type === 'axo-layout-ready') { sendTheme(); return }
      if (event.data?.type !== 'axo-layout-theme') return
      if (event.data.theme === 'light' || event.data.theme === 'dark') onThemeChange(event.data.theme)
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [onThemeChange, theme])
  return <div className="ls-viewport-preview">
    <div className="ls-preview-controls">
      <FormSelect label="Viewport náhledu" options={viewportPresets} value={presetId} onChange={setPresetId}/>
      <FormSelect label="Stav ukázky" options={[
        { value: 'empty', label: 'Empty' }, { value: 'ready', label: 'Ready' }, { value: 'processing', label: 'Processing' },
        { value: 'success', label: 'Success' }, { value: 'error', label: 'Error' }, { value: 'disabled', label: 'Disabled' },
      ]} value={state} onChange={value => setState(value as LayoutState)}/>
      {id !== 'image-converter' && id !== 'dashboard' && id !== 'app-shell' && <FormSelect label="Volitelné panely" options={[{ value: 'visible', label: 'Zobrazené' }, { value: 'hidden', label: 'Vynechané' }]} value={panels} onChange={setPanels}/>}
      {id === 'form-result' && <FormSelect label="Prezentace" options={[{ value: 'expanded', label: 'Expanded' }, { value: 'compact', label: 'Compact' }]} value={presentation} onChange={setPresentation}/>}
    </div>
    <div className="ls-preview-meta"><span>{preset.label} · 1:1 CSS px · {theme}</span><a href={`${src}&theme=${theme}`} target="_blank" rel="noreferrer">Otevřít v celé obrazovce ↗</a></div>
    <div className="ls-preview-scroll" tabIndex={0} role="region" aria-label="Posouvat náhled v původní velikosti">
      <iframe ref={frame} title={`${label} · živý náhled`} src={src} width={preset.width} height={preset.height} onLoad={sendTheme}/>
    </div>
    <p className="ls-preview-note">Náhled se nezmenšuje. Větší viewport posouvejte vodorovně i svisle. Celá obrazovka používá aktuální rozměry nového okna. Změna stavu nebo panelů obnoví ukázku.</p>
  </div>
}
