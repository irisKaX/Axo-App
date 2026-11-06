import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
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


/** Smooth canvas particle field inspired by the curved light trails in the Data Rain reference.
 * No animation property changes on hover, so pointer entry never resets particle progress. */
function ConverterRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !container || !ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 1, height = 1, frame = 0, running = true
    let mouseX = -9999, mouseY = -9999, intensity = 0
    const particles = Array.from({length:115},(_,i)=>({
      x:Math.random()*1000,y:Math.random()*700,
      speed:.28+Math.random()*1.25,
      phase:Math.random()*Math.PI*2,
      size:8+Math.random()*35,
      alpha:.08+Math.random()*.48,
      color:i%5===0?'blue':i%4===0?'violet':'pink'
    }))
    function resize(){
      const rect=container!.getBoundingClientRect()
      const prevWidth=width,prevHeight=height
      width=Math.max(1,rect.width);height=Math.max(1,rect.height)
      const dpr=Math.min(window.devicePixelRatio||1,2)
      canvas!.width=Math.round(width*dpr);canvas!.height=Math.round(height*dpr)
      canvas!.style.width=width+'px';canvas!.style.height=height+'px'
      ctx!.setTransform(dpr,0,0,dpr,0,0)
      if(prevWidth!==1&&prevHeight!==1)for(const p of particles){p.x*=width/prevWidth;p.y*=height/prevHeight}
      else for(const p of particles){p.x=Math.random()*width;p.y=Math.random()*height}
    }
    const observer=new ResizeObserver(resize)
    observer.observe(container)
    resize()
    const move=(event:MouseEvent)=>{const rect=container.getBoundingClientRect();mouseX=event.clientX-rect.left;mouseY=event.clientY-rect.top}
    const leave=()=>{mouseX=-9999;mouseY=-9999}
    container.addEventListener('mousemove',move)
    container.addEventListener('mouseleave',leave)
    function render(){
      if(!running)return
      ctx!.clearRect(0,0,width,height)
      intensity+=((mouseX>=0?1:0)-intensity)*.035
      const colors={pink:[255,77,159],violet:[124,75,254],blue:[15,159,220]}
      for(const p of particles){
        const dx=p.x-mouseX,dy=p.y-mouseY,dist=Math.hypot(dx,dy)
        const influence=Math.max(0,1-dist/260)*intensity
        const swirl=Math.sin(p.phase+p.x*.004)*.55
        const vx=p.speed*(.35+Math.sin(p.phase+p.y*.003)*.8)+influence*(-dy/(dist||1))*2
        const vy=p.speed*(.5+swirl)+influence*(dx/(dist||1))*2
        const [red,green,blue]=colors[p.color as keyof typeof colors]
        const a=p.alpha*(.7+influence*.6)
        const curve=p.size*(.5+Math.sin(p.phase)*.45)
        ctx!.beginPath()
        ctx!.moveTo(p.x-vx*p.size,p.y-vy*p.size)
        ctx!.quadraticCurveTo(p.x-vx*curve,p.y-vy*curve-curve*.16,p.x,p.y)
        ctx!.strokeStyle=`rgba(${red},${green},${blue},${a})`
        ctx!.lineWidth=p.color==='pink'?1.15:.8
        ctx!.stroke()
        if(p.alpha>.28){
          ctx!.beginPath();ctx!.moveTo(p.x-vx*4,p.y-vy*4);ctx!.lineTo(p.x,p.y)
          ctx!.strokeStyle=`rgba(245,242,255,${a*.9})`;ctx!.lineWidth=1.25;ctx!.stroke()
        }
        if(!reduced){p.x+=vx;p.y+=vy;p.phase+=.002}
        if(p.x>width+90||p.y>height+90||p.x< -100||p.y< -100){
          p.x=Math.random()*width*.6-80;p.y=Math.random()*height
        }
      }
      if(!reduced)frame=requestAnimationFrame(render)
    }
    render()
    return()=>{running=false;cancelAnimationFrame(frame);observer.disconnect();container.removeEventListener('mousemove',move);container.removeEventListener('mouseleave',leave)}
  },[])
  return <canvas className="icl-rain-canvas" ref={canvasRef} aria-hidden="true"/>
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
              ? <div className="icl-upload-stack"><div className="icl-upload-stage"><ConverterRain/><div className="icl-upload-icon" aria-hidden="true"><AxoIcon name="image" size={29}/></div><FileDropzone context="images" previewOnly size="default" files={[]} onChange={()=>{}} label="File Upload · Image Converter"/></div><ConverterFormats/></div>
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
