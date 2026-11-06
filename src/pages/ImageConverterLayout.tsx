import { useId, useState, type CSSProperties } from 'react'
import { FileDropzone } from '../components/AdvancedFormControls'
import { FormSelect, FormRadioGroup } from '../components/FormControls'
import { AxoButton } from '../components/Buttons'
import { AxoIcon } from '../components/AxoIcon'
import { QualitySlider } from '../components/QualitySlider'
import { ContrastDot } from '../components/TextTreatments'
import { HeaderPreview } from './NavigationStudio'
import type { ThemeName } from '../design-system/foundations/colors'
import { toolHeadingStack } from '../design-system/foundations/typography'
import './image-converter-layout.css'

type Stage = 'empty' | 'ready' | 'converted'
type Props = { theme: ThemeName; onThemeChange: (theme: ThemeName) => void; fullScreen?: boolean; onClose?: () => void }
const formats = [{value:'webp',label:'WebP'},{value:'jpg',label:'JPG'},{value:'png',label:'PNG'},{value:'avif',label:'AVIF'}]
const qualities = [{value:'balanced',label:'Vyvážená'},{value:'high',label:'Vysoká'},{value:'custom',label:'Vlastní'}]
const examples = [
  {name:'hero-banner.png',result:'hero-banner.webp',size:'2,4 MB',after:'412 kB'},
  {name:'product-photo.jpg',result:'product-photo.webp',size:'1,8 MB',after:'286 kB'},
  {name:'thumbnail.png',result:'thumbnail.webp',size:'850 kB',after:'128 kB'}
]

const rainColumns = Array.from({length:54},(_,i)=>({
 left:`${((i*37.719)%99).toFixed(2)}%`,
 delay:`-${((i*1.47)%9).toFixed(2)}s`,
 duration:`${(4.6+(i%7)*.63).toFixed(2)}s`,
 opacity:.22+(i%6)*.1,
 length:`${24+(i%5)*15}px`
}))
function ConverterRain(){
 return <div className="icl-rain" aria-hidden="true">{rainColumns.map((column,i)=><span key={i} className="icl-rain-drop" style={{
 '--rain-x':column.left,'--rain-delay':column.delay,'--rain-duration':column.duration,'--rain-opacity':column.opacity,'--rain-length':column.length
 } as CSSProperties}/>)}</div>
}
function ConverterFormats(){
 return <div className="icl-format-panel" aria-label="Podporované vstupní formáty">
  <span className="icl-format-label">VSTUPNÍ FORMÁTY</span>
  <div className="icl-format-chips">{['PNG','JPG','WebP','AVIF','BMP','GIF'].map(format=><span key={format} className="icl-format-chip">{format}</span>)}</div>
  <span className="icl-format-note">GIF bez animace</span>
 </div>
}


/** Visual composition only. The catalog controls sit outside the actual tool page. */
export function ImageConverterLayout({theme,onThemeChange,fullScreen=false,onClose}:Props){
  const qualityGroupId=useId()
  const [stage,setStage]=useState<Stage>('empty')
  const [format,setFormat]=useState('webp')
  const [quality,setQuality]=useState('balanced')
  const [qualityValue,setQualityValue]=useState(80)
  const [customQuality,setCustomQuality]=useState(60)
  // Demo-only quality presets: choosing Custom restores the last manually chosen value.
  const selectQuality=(next:string)=>{
    setQuality(next)
    if(next==='balanced')setQualityValue(80)
    else if(next==='high')setQualityValue(95)
    else if(next==='custom')setQualityValue(customQuality)
  }
  const [showCompare,setShowCompare]=useState(false)
  const hasFiles=stage!=='empty'
  const converted=stage==='converted'

  return <div className={'icl-shell icl-shell--b'+(fullScreen?' icl-shell--fullscreen':'')}>
    <div className="icl-app-header"><HeaderPreview mode={theme} onModeChange={onThemeChange} standalone/></div>
    <main className="icl-page">
      <div className="icl-composition">
        <section className="icl-workspace" aria-label="Pracovní plocha Image Converteru">
          <div className="icl-workspace-head">
            <div className="icl-heading-copy" style={{
              '--tool-heading-gap': toolHeadingStack.gap + 'px',
              '--tool-heading-leading': toolHeadingStack.lineHeight,
            } as CSSProperties}>
              <span className="icl-overline">AXOLOTL/WebP</span>
              <div className="icl-heading-pair">
                <h1><ContrastDot tone="neutral">Konvertor webP.</ContrastDot></h1>
                <h2><ContrastDot tone="accent">Převod obrázků.</ContrastDot></h2>
              </div>
              <p>Převádějte a optimalizujte jeden nebo více obrázků.</p>
            </div>
            {hasFiles && <span className="icl-workspace-count">3 obrázky</span>}
          </div>
          <div className="icl-main-column">
            {!hasFiles
              ? <div className="icl-upload-stack"><div className="icl-upload-stage"><ConverterRain/><FileDropzone context="images" previewOnly size="default" files={[]} onChange={()=>{}} label="File Upload · Image Converter"/></div><ConverterFormats/></div>
              : <div className="icl-files">
                  {examples.map(file=><article className="icl-file" key={file.name}>
                    <div className="icl-file-thumb"><AxoIcon name="image" size={21}/></div>
                    <div className="icl-file-copy"><strong>{converted?file.result:file.name}</strong><small>{converted?file.size+' → '+file.after:file.size}</small></div>
                    <AxoButton variant="ghost" size="compact" icon="pencil" iconOnly disabled aria-label="Přejmenovat (budoucí návrh)"/>
                    {converted && <AxoButton variant="outline" size="compact" icon="image" onClick={()=>setShowCompare(true)}>Porovnat</AxoButton>}
                    <AxoButton variant="ghost" size="compact" icon={converted?'download':'trash'} iconOnly disabled aria-label="Akce souboru (budoucí návrh)"/>
                  </article>)}
                  <div className="icl-list-note"><AxoIcon name={converted?'check':'info'} size={16}/>
                    <span>{converted?'Převedené soubory jsou připravené ke stažení.':'Ilustrační seznam pro budoucí komponentu File Item.'}</span>
                  </div>
                </div>}
          </div>
        </section>
        <aside className="icl-side-column" aria-label="Nastavení Image Converteru">
          <div className="icl-side-heading">
            <span className="icl-overline">NASTAVENÍ / 02</span>
            <h2><ContrastDot tone="neutral">Parametry převodu</ContrastDot></h2>
            <p>Zvolte formát a kvalitu výsledných obrázků.</p>
          </div>
          <div className="icl-settings-fields">
            <FormSelect label="Výstupní formát" options={formats} value={format} onChange={setFormat}/>
            <FormRadioGroup label="Kvalita převodu" options={qualities} value={quality} onChange={selectQuality} name={'icl-quality-'+qualityGroupId}/>
            <QualitySlider label="Kvalita" value={qualityValue} onChange={value=>{
              setQualityValue(value)
              setCustomQuality(value)
              setQuality('custom')
            }}/>
          </div>
          <div className="icl-action-area">
            <div className="icl-action-status" role="status">
              <AxoIcon name={converted?'check':hasFiles?'image':'info'} size={17}/>
              <span>{converted?'Ukázka převodu dokončena.':hasFiles?'3 obrázky připravené k převodu.':'Nejdříve vyberte obrázky'}</span>
            </div>
            <div className="icl-primary-action">
              {converted
                ? <AxoButton variant="secondary" icon="download" disabled>Stáhnout vše</AxoButton>
                : <AxoButton variant="primary" icon="refresh" disabled={!hasFiles} onClick={()=>setStage('converted')}>Převést do {formats.find(item=>item.value===format)?.label??'WebP'}</AxoButton>}
            </div>
          </div>
        </aside>
      </div>
    </main>

    {fullScreen && <div className="icl-preview-toolbar" aria-label="Ovládání ukázky mimo návrh stránky">
      <button type="button" className="icl-preview-exit" onClick={onClose} title="Zpět do katalogu" aria-label="Zpět do katalogu"><AxoIcon name="close" size={17}/></button>
      <div className="icl-preview-phase" role="group" aria-label="Změnit ukázkový stav">
        {([['empty','01'],['ready','02'],['converted','03']] as const).map(([value,label])=>
          <button type="button" key={value} aria-pressed={stage===value} className={stage===value?'is-active':''}
            title={value==='empty'?'Nahrání':value==='ready'?'Připravené obrázky':'Výsledky'} onClick={()=>{setStage(value);setShowCompare(false)}}>{label}</button>)}
      </div>
    </div>}
    {!fullScreen && <div className="icl-inline-controls" role="group" aria-label="Stavy katalogového náhledu">
      {([['empty','Nahrání'],['ready','Připravené'],['converted','Výsledky']] as const).map(([value,label])=>
        <button type="button" key={value} aria-pressed={stage===value} onClick={()=>{setStage(value);setShowCompare(false)}}>{label}</button>)}
    </div>}
    {showCompare && <div className="icl-compare-mask"><div className="icl-compare-dialog" role="dialog" aria-modal="true" aria-label="Image Compare">
      <div className="icl-compare-top"><strong>Image Compare</strong><AxoButton size="compact" variant="ghost" icon="close" iconOnly aria-label="Zavřít" onClick={()=>setShowCompare(false)}/></div>
      <p>Komponentu porovnání před a po nejprve vytvoříme v katalogu.</p>
    </div></div>}
  </div>
}
