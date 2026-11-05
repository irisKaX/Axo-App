import { useState } from 'react'
import { FileDropzone } from '../components/AdvancedFormControls'
import { FormSelect, FormRadioGroup } from '../components/FormControls'
import { AxoButton } from '../components/Buttons'
import { AxoIcon } from '../components/AxoIcon'
import { HeaderPreview } from './NavigationStudio'
import type { ThemeName } from '../design-system/foundations/colors'
import './image-converter-layout.css'

type Stage = 'empty' | 'ready' | 'converted'
type Props = { theme: ThemeName; onThemeChange: (theme: ThemeName) => void; fullScreen?: boolean; onClose?: () => void }

const imageFormats = [
  {value:'webp',label:'WebP'}, {value:'jpg',label:'JPG'}, {value:'png',label:'PNG'}, {value:'avif',label:'AVIF'}
]
const qualityPresets = [
  {value:'balanced',label:'Vyvážená'}, {value:'high',label:'Vysoká'}, {value:'custom',label:'Vlastní'}
]
const exampleImages = [
  {name:'hero-banner.png',result:'hero-banner.webp',size:'2,4 MB',newSize:'412 kB'},
  {name:'product-photo.jpg',result:'product-photo.webp',size:'1,8 MB',newSize:'286 kB'},
  {name:'thumbnail.png',result:'thumbnail.webp',size:'850 kB',newSize:'128 kB'}
]
const demoFiles = exampleImages.map((img,index)=>new File(['ukázkový obsah'],img.name,{
  type:img.name.endsWith('.png')?'image/png':'image/jpeg',lastModified:index
}))

/** Catalog-only composition. Shared controls are real components; no actual file operations. */
export function ImageConverterLayout({theme,onThemeChange,fullScreen=false,onClose}:Props){
  const [stage,setStage]=useState<Stage>('empty')
  const [format,setFormat]=useState('webp')
  const [quality,setQuality]=useState('balanced')
  const [compare,setCompare]=useState(false)
  const hasFiles=stage!=='empty'
  const converted=stage==='converted'

  return <div className={'icl-shell'+(fullScreen?' icl-shell--fullscreen':'')} data-theme={theme}>
    {fullScreen && <div className="icl-header">
      <HeaderPreview mode={theme} onModeChange={onThemeChange} standalone/>
      <AxoButton variant="ghost" size="compact" icon="close" onClick={onClose}>Zavřít náhled</AxoButton>
    </div>}
    <main className="icl-page">
      <div className="icl-intro">
        <div><span className="icl-eyebrow">AXOLOTL / IMAGE CONVERTER</span>
          <h2>Image Converter<span>.</span></h2>
          <p>Převod a optimalizace jednoho i více obrázků.</p></div>
        <span className="icl-demo-label">DESIGN PREVIEW · BEZ KONVERZE</span>
      </div>

      <div className="icl-stage-switch" role="group" aria-label="Ukázkové fáze návrhu">
        {([['empty','01 / Nahrávání'],['ready','02 / Připravené'],['converted','03 / Převedené']] as const).map(([value,label])=>
          <button type="button" key={value} className={stage===value?'is-current':''}
            aria-pressed={stage===value} onClick={()=>setStage(value)}>{label}</button>)}
      </div>

      <div className="icl-primary-grid">
        <section className="icl-panel icl-upload">
          <div className="icl-panel-heading"><div><span>01 / VSTUP</span><h3>Nahrání obrázků</h3></div></div>
          <FileDropzone context="images" size="default" previewOnly
            label="Ukázka File Upload komponenty" files={hasFiles?demoFiles:[]}
            onChange={()=>{}} accept=".png,.jpg,.jpeg,.webp,.avif,.bmp,.gif"/>
        </section>
        <section className="icl-panel icl-settings">
          <div className="icl-panel-heading"><div><span>02 / NASTAVENÍ</span><h3>Výstupní parametry</h3></div></div>
          <FormSelect label="Výstupní formát" options={imageFormats} value={format} onChange={setFormat}/>
          <FormRadioGroup label="Kvalita převodu" name="icl-quality" options={qualityPresets}
            value={quality} onChange={setQuality}/>
          <div className="icl-unfinished" aria-label="Quality Slider čeká na schválení v katalogu">
            <div><AxoIcon name="settings" size={20}/><strong>Quality Slider</strong></div>
            <p>Komponentu nejprve navrhneme a schválíme v Inputs &amp; Forms. Tady ji pak použijeme bez lokální imitace.</p>
          </div>
          <div className="icl-cta">
            <AxoButton variant="primary" icon="refresh" disabled={!hasFiles||converted}
              onClick={()=>setStage('converted')}>Převést obrázky</AxoButton>
            <span>{hasFiles?'Ukázkový stav · 3 obrázky':'Ukázka: nejprve přidejte obrázky'}</span>
          </div>
        </section>
      </div>

      <section className="icl-panel icl-results">
        <div className="icl-panel-heading"><div><span>03 / SOUBORY</span><h3>Seznam obrázků</h3></div></div>
        {!hasFiles ? <div className="icl-empty-list">
          <AxoIcon name="image" size={28}/><strong>Prostor pro seznam obrázků</strong>
          <span>Výsledný File Item navrhneme jako samostatnou komponentu.</span>
        </div> :
        <div className="icl-demo-files">
          {exampleImages.map(item=><div className="icl-demo-file" key={item.name}>
            <span className="icl-demo-thumb"><AxoIcon name="image" size={19}/></span>
            <div><strong>{converted?item.result:item.name}</strong><small>{converted?item.size+' → '+item.newSize:item.size}</small></div>
            <AxoButton variant="ghost" icon="pencil" iconOnly size="compact" aria-label={'Přejmenování '+item.name} disabled/>
            {converted && <AxoButton variant="outline" size="compact" icon="image"
              onClick={()=>setCompare(true)}>Porovnat</AxoButton>}
            <AxoButton variant="ghost" size="compact" icon="download" iconOnly disabled aria-label="Stažení · návrh"/>
            <AxoButton variant="ghost" size="compact" icon="trash" iconOnly disabled aria-label="Smazání · návrh"/>
          </div>)}
        </div>}
        {converted && <div className="icl-demo-bottom">
          <AxoButton variant="secondary" icon="download" disabled>Stáhnout vše jako ZIP</AxoButton>
          <span>Pouze vizuální stav, bez stažení souborů</span>
        </div>}
      </section>
      {compare && <div className="icl-compare-overlay">
        <div className="icl-compare-panel" role="dialog" aria-modal="true" aria-label="Image Compare · návrhové místo">
          <div className="icl-compare-head"><strong>Image Compare</strong>
            <AxoButton variant="ghost" icon="close" iconOnly size="compact"
              aria-label="Zavřít náhled" onClick={()=>setCompare(false)}/></div>
          <div className="icl-unfinished"><div><AxoIcon name="image" size={22}/><strong>Komponenta čeká na návrh</strong></div>
            <p>Interaktivní porovnání před a po sem vložíme až po schválení v katalogu.</p></div>
        </div>
      </div>}
    </main>
  </div>
}
