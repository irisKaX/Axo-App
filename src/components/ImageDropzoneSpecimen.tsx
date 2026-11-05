import { AxoIcon } from './AxoIcon'
import './image-dropzone-specimen.css'

export type ImageDropzoneState = 'empty' | 'drag' | 'ready' | 'error' | 'disabled'
export type ImageDropzoneSize = 'default' | 'large'

type Props = { state: ImageDropzoneState; size: ImageDropzoneSize }

/** Design-only image upload surface. Does not open a file picker or process images. */
export function ImageDropzoneSpecimen({state,size}: Props) {
  const isDrag = state === 'drag'
  const isReady = state === 'ready'
  const isError = state === 'error'
  return (
    <div className={'ids-card ids-card--'+size} data-state={state} aria-label={'Image Dropzone design preview: '+state}>
      <div className="ids-topline">
        <span className="ids-kicker">MEDIA / IMAGE UPLOAD</span>
        <span className="ids-multiple">1 nebo více obrázků</span>
      </div>
      <div className="ids-target">
        <div className="ids-icon" aria-hidden="true">
          <AxoIcon name={isError ? 'alert-circle' : isReady ? 'check' : 'image'} size={size==='large'?32:26}/>
        </div>
        <div className="ids-copy">
          <strong>{isDrag?'Pusť obrázky sem':isReady?'Obrázky jsou připravené':isError?'Nepodporovaný soubor':state==='disabled'?'Nahrávání není dostupné':'Přetáhni obrázky sem'}</strong>
          <span>{isError?'Zkus PNG, JPG, WebP nebo AVIF.':isReady?'Můžeš přidat další obrázky.': 'Nebo je vyber ze svého zařízení.'}</span>
        </div>
        <span className="ids-choose" aria-hidden="true"><AxoIcon name="plus" size={16}/> Vybrat obrázky</span>
        <span className="ids-hint">PNG · JPG · WEBP · AVIF <span>·</span> Více souborů najednou</span>
      </div>
      {isReady && <div className="ids-ready-list" aria-label="Ilustrační seznam vybraných obrázků">
        <div className="ids-file"><span className="ids-thumb ids-thumb--one"><AxoIcon name="image" size={17}/></span><span><strong>hero-banner.png</strong><small>2,4 MB</small></span><AxoIcon name="check" size={16}/></div>
        <div className="ids-file"><span className="ids-thumb ids-thumb--two"><AxoIcon name="image" size={17}/></span><span><strong>product-photo.jpg</strong><small>1,8 MB</small></span><AxoIcon name="check" size={16}/></div>
      </div>}
      {isError && <div className="ids-error-note"><AxoIcon name="alert-circle" size={16}/> Soubor „archiv.zip“ není obrázek.</div>}
    </div>
  )
}
