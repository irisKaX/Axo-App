import { useId, useRef, useState, type CSSProperties } from 'react'
import { FileDropzone } from '../components/AdvancedFormControls'
import { FormSelect, FormRadioGroup, FormSwitch } from '../components/FormControls'
import { AxoButton } from '../components/Buttons'
import { AxoIcon } from '../components/AxoIcon'
import { QualitySlider } from '../components/QualitySlider'
import { ContrastDot } from '../components/TextTreatments'
import { HeaderPreview } from './NavigationStudio'
import type { ThemeName } from '../design-system/foundations/colors'
import { toolHeadingStack } from '../design-system/foundations/typography'
import './image-converter-layout.css'

type Stage = 'empty' | 'ready' | 'converted'
type Props = { theme:ThemeName; onThemeChange:(theme:ThemeName)=>void; fullScreen?:boolean; onClose?:()=>void }
const formats = [{value:'webp',label:'WebP'},{value:'jpg',label:'JPG'},{value:'png',label:'PNG'},{value:'avif',label:'AVIF'}]
const qualities = [{value:'balanced',label:'Vyvážená'},{value:'high',label:'Vysoká'}]
const examples = [
  {name:'hero-banner.png',bytes:2516582,after:'412 kB'},
  {name:'product-photo.jpg',bytes:1887436,after:'286 kB'},
  {name:'thumbnail.png',bytes:870400,after:'128 kB'},
]
const exampleFiles = examples.map((file,i)=>new File(['design preview'],file.name,{type:i===1?'image/jpeg':'image/png',lastModified:i+1}))
const showSize = (bytes:number)=> bytes>=1048576 ? (bytes/1048576).toLocaleString('cs-CZ',{maximumFractionDigits:1})+' MB' : (bytes/1024).toLocaleString('cs-CZ',{maximumFractionDigits:0})+' kB'

/** Catalog prototype. The controls and upload are real UI; conversion and downloads are intentionally not implemented. */
export function ImageConverterLayout({theme,onThemeChange,fullScreen=false,onClose}:Props){
  const radioName=useId()
  const addInputRef=useRef<HTMLInputElement>(null)
  const [stage,setStage]=useState<Stage>('empty')
  const [files,setFiles]=useState<File[]>([])
  const [format,setFormat]=useState('webp')
  const [quality,setQuality]=useState('balanced')
  const [qualityValue,setQualityValue]=useState(80)
  const [metadata,setMetadata]=useState(false)
  const [notice,setNotice]=useState('')
  const hasFiles=stage!=='empty' && files.length>0
  const converted=stage==='converted'
  const formatLabel=formats.find(item=>item.value===format)?.label??'WebP'

  const previewStage=(next:Stage)=>{
    setStage(next)
    setFiles(next==='empty'?[]:exampleFiles)
    setNotice('')
  }
  const fileChanged=(next:File[])=>{
    setFiles(next)
    setStage(next.length?'ready':'empty')
    setNotice('')
  }
  const chooseQuality=(next:string)=>{
    setQuality(next)
    if(next==='balanced')setQualityValue(80)
    else if(next==='high')setQualityValue(95)
  }
  const appendFiles=(incoming:File[])=>{
    if(!incoming.length)return
    setFiles(current=>{
      const seen=new Set(current.map(file=>[file.name,file.size,file.lastModified].join(':')))
      return [...current,...incoming.filter(file=>{
        const key=[file.name,file.size,file.lastModified].join(':')
        if(seen.has(key))return false
        seen.add(key)
        return true
      })]
    })
    setStage('ready')
    setNotice('')
  }
  const onSlide=(value:number)=>{
    setQualityValue(value)
    setQuality('')
  }
  const runPreview=()=>{
    if(!hasFiles)return
    if(converted){setNotice('Stažení je součástí budoucí implementace konvertoru.');return}
    setStage('converted')
    setNotice('')
  }
  return <div className={'icl-shell'+(fullScreen?' icl-shell--fullscreen':'')}>
    <div className="icl-app-header"><HeaderPreview mode={theme} onModeChange={onThemeChange} standalone/></div>
    <main className="icl-page">
      <header className="icl-page-head">
        <div className="icl-heading-copy" style={{
          '--tool-heading-gap': toolHeadingStack.gap+'px',
          '--tool-heading-leading': toolHeadingStack.lineHeight,
        } as CSSProperties}>
          <span className="icl-overline">NÁSTROJE / MÉDIA / 01</span>
          <h1><ContrastDot tone="neutral">Konvertor webP.</ContrastDot></h1>
          <p>Převádějte a optimalizujte obrázky. Jednoduše i hromadně.</p>
        </div>
        <span className="icl-page-context"><AxoIcon name="image" size={15}/> IMAGE PROCESSING WORKSPACE</span>
      </header>
      <section className="icl-tool" aria-label="Image Converter – pracovní plocha">
        <div className="icl-tool-body">
          <aside className="icl-settings" aria-label="Parametry převodu">
            <div className="icl-section-head">
              <h2>Parametry převodu</h2>
              <p>Společná nastavení pro všechny obrázky.</p>
            </div>
            <div className="icl-settings-fields">
              <FormSelect label="Výstupní formát" options={formats} value={format} onChange={setFormat}/>
              <FormRadioGroup label="Kvalita převodu" options={qualities} value={quality} onChange={chooseQuality} name={'icl-quality-'+radioName}/>
              <QualitySlider label="Kvalita obrázku" value={qualityValue} onChange={onSlide}/>
              <div className="icl-metadata-setting">
                <FormSwitch label="Zachovat metadata" description="Pokud to formát podporuje" checked={metadata} onChange={setMetadata}/>
              </div>
            </div>
            <div className="icl-settings-note"><AxoIcon name="info" size={16}/><span>Zvolené parametry se použijí na všechny vybrané soubory.</span></div>
          </aside>
          <section className="icl-workarea" aria-label="Obrázky ke konverzi">
            <div className="icl-area-head">
              <h2>{converted?'Výsledky převodu':'Vaše obrázky'}</h2>
              <span>{files.length} {files.length===1?'soubor':files.length>=2&&files.length<=4?'soubory':'souborů'}</span>
            </div>
            {!hasFiles
              ? <div className="icl-empty-surface"><FileDropzone context="images" size="default" files={[]} onChange={fileChanged} label="Nahrát obrázky" accept=".png,.jpg,.jpeg,.webp,.avif,.bmp,.gif" /></div>
              : <div className="icl-file-content">
                <div className="icl-file-table-head"><span>SOUBOR</span><span>VELIKOST</span><span>STAV</span><span/></div>
                <div className="icl-file-list">{files.map((file,index)=><div className="icl-file-row" key={file.name+'-'+file.lastModified+'-'+index}>
                  <div className="icl-file-name"><div className="icl-file-thumb"><AxoIcon name="image" size={20}/></div><div className="icl-file-copy">
                    <strong title={file.name}>{converted?file.name.replace(/\.[^.]+$/,'.'+format):file.name}</strong>
                    <small>{converted?'Výstup: '+formatLabel:'Připraveno ke konverzi'}</small>
                  </div></div>
                  <span className="icl-file-size">{converted?(examples[index]?.after??'Ukázka'):showSize(file.size)}</span>
                  <span className={'icl-file-state'+(converted?' is-done':'')}><AxoIcon name={converted?'check':'info'} size={13}/>{converted?'Hotovo':'Připraveno'}</span>
                  <AxoButton icon="close" iconOnly size="compact" variant="ghost" aria-label={'Odebrat '+file.name} onClick={()=>fileChanged(files.filter((_,i)=>i!==index))}/>
                </div>)}</div>
                <div className="icl-list-bottom"><span>{converted?'Ukázkové výsledky převodu':files.length+' obrázků připraveno'}</span>
                  <AxoButton variant="outline" size="compact" icon="plus" onClick={()=>addInputRef.current?.click()}>Přidat další</AxoButton>
                </div>
                {converted&&<p className="icl-result-note"><AxoIcon name="check" size={15}/> Ukázka dokončena. Výsledné velikosti jsou ilustrační.</p>}
              </div>}
          </section>
        </div>
        <footer className="icl-tool-footer">
          <div className="icl-footer-status" role="status">
            <span className={'icl-status-icon'+(hasFiles?' is-ready':'')}><AxoIcon name={converted?'check':hasFiles?'image':'info'} size={17}/></span>
            <div><strong>{converted?'Konverze dokončena':hasFiles?'Připraveno ke konverzi':'Čeká na obrázky'}</strong>
              <small>{notice|| (converted?'Výsledky jsou pouze návrhovou ukázkou':hasFiles?files.length+' obrázků · '+formatLabel:'Přidejte soubory a nastavte převod')}</small>
            </div>
          </div>
          <AxoButton variant={converted?'secondary':'primary'} icon={converted?'download':'refresh'} disabled={!hasFiles} onClick={runPreview}>{converted?'Stáhnout vše':'Převést do '+formatLabel}</AxoButton>
        </footer>
      </section>
    </main>
    <input ref={addInputRef} type="file" hidden multiple accept=".png,.jpg,.jpeg,.webp,.avif,.bmp,.gif" aria-label="Přidat další obrázky" onChange={event=>{
      appendFiles(Array.from(event.currentTarget.files??[]))
      event.currentTarget.value=''
    }}/>
    {fullScreen ? <div className="icl-preview-toolbar" aria-label="Ovládání katalogového náhledu">
      <button type="button" className="icl-preview-exit" onClick={onClose} title="Zpět do katalogu" aria-label="Zpět do katalogu"><AxoIcon name="close" size={17}/></button>
      <div className="icl-preview-phase" role="group" aria-label="Ukázkové stavy">
        {([['empty','01'],['ready','02'],['converted','03']] as const).map(([value,label])=><button key={value} type="button" title={value==='empty'?'Nahrání':value==='ready'?'Soubory':'Výsledky'} aria-pressed={stage===value} className={stage===value?'is-active':''} onClick={()=>previewStage(value)}>{label}</button>)}
      </div>
    </div> : <div className="icl-inline-controls" role="group" aria-label="Ukázkové stavy katalogu">
      {([['empty','Nahrání'],['ready','Soubory'],['converted','Výsledky']] as const).map(([value,label])=><button key={value} type="button" aria-pressed={stage===value} onClick={()=>previewStage(value)}>{label}</button>)}
    </div>}
  </div>
}
