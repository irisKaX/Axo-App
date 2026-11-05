import { useState, type CSSProperties } from 'react'
import { FileDropzone } from '../components/AdvancedFormControls'
import { AxoButton } from '../components/Buttons'
import { AxoIcon } from '../components/AxoIcon'
import { HeaderPreview } from './NavigationStudio'
import type { ThemeName } from '../design-system/foundations/colors'
import './image-converter-layout.css'

type Stage = 'empty' | 'ready' | 'converted'
type Props = { theme: ThemeName; onThemeChange: (theme: ThemeName) => void; fullScreen?: boolean; onClose?: () => void }

/** Layout composition only: sample image rows and controls, no real conversion or uploads. */
const sampleFiles = [
  { id: 'hero', name: 'hero-banner.png', size: '2,4 MB', output: 'hero-banner.webp', result: '412 kB' },
  { id: 'product', name: 'product-photo.jpg', size: '1,8 MB', output: 'product-photo.webp', result: '286 kB' },
  { id: 'thumb', name: 'thumbnail.png', size: '850 kB', output: 'thumbnail.webp', result: '128 kB' },
]

export function ImageConverterLayout({theme,onThemeChange,fullScreen=false,onClose}:Props) {
  const [stage,setStage] = useState<Stage>('empty')
  const [quality,setQuality] = useState<'balanced'|'high'|'custom'>('balanced')
  const [format,setFormat] = useState('WebP')
  const [compare,setCompare] = useState<string|null>(null)
  const [removed,setRemoved] = useState<string[]>([])
  const files = sampleFiles.filter(file=>!removed.includes(file.id))
  const ready = stage!=='empty'
  const converted = stage==='converted'

  return <div className={'icl-shell'+(fullScreen?' icl-shell--fullscreen':'')} data-theme={theme} style={{'--icl-accent':'var(--brand)'} as CSSProperties}>
    {fullScreen && <div className="icl-header">
      <HeaderPreview mode={theme} onModeChange={onThemeChange} standalone/>
      <button type="button" className="icl-exit" onClick={onClose}><AxoIcon name="close" size={17}/> Zavřít náhled</button>
    </div>}
    <div className="icl-page">
      <div className="icl-intro">
        <div><span className="icl-eyebrow">AXOLOTL / IMAGE CONVERTER</span>
          <h2>Image Converter<span>.</span></h2>
          <p>Hromadná konverze a optimalizace obrázků na jednom místě.</p></div>
        <span className="icl-demo-label">DESIGN PREVIEW · BEZ KONVERZE</span>
      </div>

      <div className="icl-stage-switch" role="group" aria-label="Ukázkové stavy návrhu">
        {([['empty','01 / Nahrávání'],['ready','02 / Připravené'],['converted','03 / Převedené']] as const).map(([value,label])=>
          <button type="button" key={value} className={stage===value?'is-current':''} aria-pressed={stage===value}
            onClick={()=>{setStage(value);setCompare(null);setRemoved([])}}>{label}</button>
        )}
      </div>

      <div className="icl-primary-grid">
        <section className="icl-panel icl-upload" aria-labelledby="icl-upload-title">
          <div className="icl-panel-heading"><div><span>01 / VSTUP</span><h3 id="icl-upload-title">Nahrání obrázků</h3></div>
            <small>Jeden nebo více souborů</small></div>
          <FileDropzone context="images" previewOnly size="default"
            label="Ilustrační nahrávací plocha Image Converteru" accept=".png,.jpg,.jpeg,.webp,.avif,.bmp,.gif"
            files={[]} onChange={()=>{}}/>
        </section>
        <section className="icl-panel icl-settings" aria-labelledby="icl-settings-title">
          <div className="icl-panel-heading"><div><span>02 / NASTAVENÍ</span><h3 id="icl-settings-title">Výstupní parametry</h3></div></div>
          <div className="icl-setting-block">
            <label htmlFor="icl-format">Výstupní formát</label>
            <div className="icl-select-wrap"><select id="icl-format" value={format} onChange={e=>setFormat(e.target.value)} aria-label="Ukázkový výstupní formát"><option>WebP</option><option>JPG</option><option>PNG</option><option>AVIF</option></select><AxoIcon name="chevron-down" size={16}/></div>
          </div>
          <fieldset className="icl-setting-block">
            <legend>Kvalita převodu</legend>
            <div className="icl-choice-row">
              <label><input type="radio" name="icl-quality" checked={quality==='balanced'} onChange={()=>setQuality('balanced')}/> Vyvážená</label>
              <label><input type="radio" name="icl-quality" checked={quality==='high'} onChange={()=>setQuality('high')}/> Vysoká</label>
              <label><input type="radio" name="icl-quality" checked={quality==='custom'} onChange={()=>setQuality('custom')}/> Vlastní</label>
            </div>
          </fieldset>
          <div className="icl-setting-block">
            <div className="icl-setting-inline"><span>Kvalita</span><strong>{quality==='high'?'95':quality==='custom'?'60':'80'} %</strong></div>
            <div className="icl-slider-placeholder" aria-label="Ilustrační podoba budoucí komponenty Quality Slider">
              <div className="icl-slider-track"><span style={{width:quality==='high'?'95%':quality==='custom'?'60%':'80%'}}/><i style={{left:quality==='high'?'95%':quality==='custom'?'60%':'80%'}}/></div>
              <div className="icl-slider-ends"><span>0</span><span>100</span></div>
            </div>
            <small className="icl-pending">Quality Slider · samostatná komponenta k návrhu</small>
          </div>
          <div className="icl-cta">
            <AxoButton variant="primary" disabled={!ready || converted} icon="refresh" onClick={()=>setStage('converted')}>Převést obrázky</AxoButton>
            <span>{ready?files.length+' obrázky v ukázkovém seznamu':'Nejprve přidejte obrázky'}</span>
          </div>
        </section>
      </div>

      <section className="icl-panel icl-results" aria-labelledby="icl-results-title">
        <div className="icl-panel-heading"><div><span>03 / SOUBORY</span><h3 id="icl-results-title">Seznam obrázků</h3></div>
          <small>{ready?files.length+' soubory':'Zatím žádné soubory'}</small></div>
        {!ready ? <div className="icl-empty-list"><AxoIcon name="image" size={30}/><strong>Vaše obrázky se zobrazí zde</strong><span>Po nahrání uvidíte názvy, miniatury a dostupné akce.</span></div> :
        <div className="icl-file-list">{files.map(file=><div className="icl-file-row" key={file.id}>
          <div className="icl-file-thumb"><AxoIcon name="image" size={23}/></div>
          <div className="icl-file-name"><strong>{converted?file.output:file.name}</strong><span>{file.size}{converted?' → '+file.result:''}</span></div>
          <button type="button" className="icl-icon-action" title="Přejmenovat (náhled)" aria-label={'Přejmenovat '+file.name}><AxoIcon name="pencil" size={16}/></button>
          <span className={'icl-file-status'+(converted?' is-done':'')}>{converted?'Hotovo':'Připraveno'}</span>
          <div className="icl-file-actions">
            {converted && <button type="button" className="icl-row-action" onClick={()=>setCompare(file.id)}><AxoIcon name="image" size={16}/> Porovnat</button>}
            <button type="button" className="icl-icon-action" disabled={!converted} title="Stáhnout (náhled)" aria-label={'Stáhnout '+file.name}><AxoIcon name="download" size={17}/></button>
            <button type="button" className="icl-icon-action" title="Odebrat z ukázky" aria-label={'Odebrat '+file.name} onClick={()=>setRemoved(old=>[...old,file.id])}><AxoIcon name="trash" size={17}/></button>
          </div>
        </div>)}</div>}
        {converted && files.length>0 && <div className="icl-results-bottom">
          <span><AxoIcon name="check" size={17}/> Všechny obrázky připravené</span>
          <AxoButton variant="secondary" icon="download" disabled>Stáhnout vše jako ZIP</AxoButton>
        </div>}
      </section>

      {converted && compare && <div className="icl-compare-overlay" role="presentation">
        <div className="icl-compare-panel" role="dialog" aria-modal="true" aria-label="Porovnání obrázků">
          <div className="icl-compare-header"><div><span>IMAGE COMPARE / NÁHLED</span><h3>Před a po konverzi</h3></div>
            <button type="button" className="icl-icon-action" onClick={()=>setCompare(null)} aria-label="Zavřít porovnání"><AxoIcon name="close" size={19}/></button></div>
          <div className="icl-compare-placeholder"><div><span>PŘED</span><AxoIcon name="image" size={35}/></div><span className="icl-compare-divider" aria-hidden="true"/><div><span>PO</span><AxoIcon name="image" size={35}/></div></div>
          <p>Vizuální místo pro komponentu Image Compare. Interaktivní posuvník vytvoříme a schválíme samostatně.</p>
        </div>
      </div>}
    </div>
  </div>
}
