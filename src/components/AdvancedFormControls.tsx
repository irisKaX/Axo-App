import { useEffect, useId, useRef, useState, type CSSProperties, type DragEvent } from 'react'
import { AxoIcon } from './AxoIcon'
import { AxoButton } from './Buttons'
import type { SelectOption } from './FormControls'
import { themes } from '../design-system/foundations/colors'
import { spacing } from '../design-system/foundations/spacing'
import { typography } from '../design-system/foundations/typography'
import './advanced-form-controls.css'

export interface MultiSelectProps {
  label:string
  options:SelectOption[]
  value:string[]
  onChange:(next:string[])=>void
  placeholder?:string
  disabled?:boolean
}
export function MultiSelect({label,options,value,onChange,placeholder='Vyber položky',disabled=false}:MultiSelectProps){
  const [open,setOpen]=useState(false)
  const [query,setQuery]=useState('')
  const [active,setActive]=useState(0)
  const uid=useId()
  const wrapper=useRef<HTMLDivElement>(null)
  const search=useRef<HTMLInputElement>(null)
  const available=options.filter(option=>!option.disabled&&!value.includes(option.value)&&option.label.toLocaleLowerCase('cs').includes(query.toLocaleLowerCase('cs')))
  useEffect(()=>{
    const onOutside=(event:PointerEvent)=>{if(wrapper.current&&!wrapper.current.contains(event.target as Node))setOpen(false)}
    document.addEventListener('pointerdown',onOutside)
    return ()=>document.removeEventListener('pointerdown',onOutside)
  },[])
  const add=(id:string)=>{if(!value.includes(id))onChange([...value,id]);setQuery('');setActive(0);search.current?.focus()}
  const remove=(id:string)=>onChange(value.filter(v=>v!==id))
  return <div className={'af-field'+(value.length?' is-filled':'')+(disabled?' is-disabled':'')} ref={wrapper}>
    <label className="af-label" htmlFor={uid}>{label}</label>
    <div className="af-multi-wrap">
      <div className="af-multi-control" onClick={()=>{if(!disabled){setOpen(true);search.current?.focus()}}}>
        {value.map(id=>{const option=options.find(o=>o.value===id);return option?<span className="af-chip" key={id}>{option.label}<button type="button" aria-label={'Odebrat '+option.label} disabled={disabled} onClick={event=>{event.stopPropagation();remove(id)}}><AxoIcon name="close" size={13}/></button></span>:null})}
        <input ref={search} id={uid} disabled={disabled} value={query} autoComplete="off"
          placeholder={value.length?'':placeholder} aria-label={label} aria-expanded={open} aria-controls={uid+'-list'}
          onFocus={()=>setOpen(true)} onChange={e=>{setQuery(e.target.value);setActive(0)}}
          onKeyDown={e=>{
            if(e.key==='Escape'){setOpen(false);search.current?.blur()}
            if(e.key==='ArrowDown'){e.preventDefault();setOpen(true);setActive(n=>Math.min(available.length-1,n+1))}
            if(e.key==='ArrowUp'){e.preventDefault();setActive(n=>Math.max(0,n-1))}
            if(e.key==='Enter'&&open&&available.length){e.preventDefault();add(available[Math.min(active,available.length-1)].value)}
            if(e.key==='Backspace'&&!query&&value.length)remove(value[value.length-1])
          }}/>
        <AxoIcon name="chevron-down" size={16} className="af-chevron"/>
      </div>
      {open&&!disabled&&<div className="af-multi-menu" id={uid+'-list'}>
        {available.length?available.map((option,index)=><button type="button" key={option.value} className={index===active?'is-active':''}
          onMouseEnter={()=>setActive(index)} onClick={()=>add(option.value)}>
          <span>{option.label}</span><AxoIcon name="plus" size={15}/>
        </button>):<span className="af-no-results">Žádné další položky</span>}
      </div>}
    </div>
    <span className="af-hint">Vyber více položek. Backspace odstraní poslední štítek.</span>
  </div>
}

export interface DatePickerFieldProps {
  label:string
  value:string
  onChange:(value:string)=>void
  min?:string
  max?:string
  disabled?:boolean
}
const dateKey=(year:number,month:number,day:number)=>[year,String(month+1).padStart(2,'0'),String(day).padStart(2,'0')].join('-')
export function DatePickerField({label,value,onChange,min,max,disabled=false}:DatePickerFieldProps){
  const uid=useId()
  const today=new Date()
  const initial=value&&/^\d{4}-\d{2}-\d{2}$/.test(value)?new Date(value+'T12:00:00'):today
  const [month,setMonth]=useState(()=>new Date(initial.getFullYear(),initial.getMonth(),1))
  const [open,setOpen]=useState(false)
  const root=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const outside=(e:PointerEvent)=>{if(root.current&&!root.current.contains(e.target as Node))setOpen(false)}
    const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)}
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape)
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)}
  },[])
  const year=month.getFullYear(),monthIndex=month.getMonth()
  const start=(new Date(year,monthIndex,1).getDay()+6)%7
  const days=new Date(year,monthIndex+1,0).getDate()
  const cells=Array.from({length:Math.ceil((start+days)/7)*7},(_,i)=>i-start+1)
  const display=value?new Date(value+'T12:00:00').toLocaleDateString('cs-CZ',{day:'numeric',month:'long',year:'numeric'}):''
  return <div className={'af-field'+(value?' is-filled':'')} ref={root}>
    <span className="af-label" id={uid}>{label}</span>
    <div className="af-date-wrap">
      <button type="button" className="af-date-trigger" disabled={disabled} aria-labelledby={uid} aria-expanded={open}
        onClick={()=>setOpen(v=>!v)}>
        <span className={value?'':'af-placeholder'}>{display||'Vyber datum'}</span><AxoIcon name="calendar" size={19}/>
      </button>
      {open&&!disabled&&<div className="af-calendar">
        <div className="af-calendar-head">
          <button type="button" aria-label="Předchozí měsíc" onClick={()=>setMonth(new Date(year,monthIndex-1,1))}>‹</button>
          <strong>{month.toLocaleDateString('cs-CZ',{month:'long',year:'numeric'})}</strong>
          <button type="button" aria-label="Následující měsíc" onClick={()=>setMonth(new Date(year,monthIndex+1,1))}>›</button>
        </div>
        <div className="af-calendar-grid">
          {['Po','Út','St','Čt','Pá','So','Ne'].map(day=><span className="af-calendar-weekday" key={day}>{day}</span>)}
          {cells.map((day,i)=>{
            const key=dateKey(year,monthIndex,day),valid=day>0&&day<=days
            return valid?<button type="button" key={i} className={key===value?'is-selected':''}
              aria-label={key} aria-pressed={key===value} disabled={(!!min&&key<min)||(!!max&&key>max)}
              onClick={()=>{onChange(key);setOpen(false)}}>{day}</button>:<span key={i}/>
          })}
        </div>
        <button className="af-today" type="button" onClick={()=>{setMonth(new Date(today.getFullYear(),today.getMonth(),1));const key=dateKey(today.getFullYear(),today.getMonth(),today.getDate());if((!min||key>=min)&&(!max||key<=max)){onChange(key);setOpen(false)}}}>Dnes</button>
      </div>}
    </div>
    <span className="af-hint">Výběr data v českém kalendáři.</span>
  </div>
}

export interface NumberInputProps{
  label:string;value:number|null;onChange:(value:number|null)=>void
  min?:number;max?:number;step?:number;unit?:string;disabled?:boolean
}
export function NumberInput({label,value,onChange,min=0,max=Infinity,step=1,unit,disabled=false}:NumberInputProps){
  const uid=useId()
  const [draft,setDraft]=useState<string|null>(null)
  const display=draft??(value===null?'':String(value))
  const normalize=(next:number)=>Math.min(max,Math.max(min,Math.round(next*100000)/100000))
  const commit=(text:string)=>{
    const number=Number(text.replace(',','.'))
    if(!text.trim())onChange(null)
    else if(Number.isFinite(number))onChange(normalize(number))
    setDraft(null)
  }
  const shift=(direction:number)=>{onChange(normalize((value??min)+direction*step));setDraft(null)}
  return <div className={'af-field'+(display?' is-filled':'')}>
    <label className="af-label" htmlFor={uid}>{label}</label>
    <div className="af-number-control">
      <input id={uid} inputMode="decimal" type="text" value={display} disabled={disabled}
        onChange={e=>{const text=e.target.value;if(/^[-+]?\d*(?:[.,]\d*)?$/.test(text))setDraft(text)}}
        onBlur={()=>{if(draft!==null)commit(draft)}}
        onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();if(e.key==='ArrowUp'){e.preventDefault();shift(1)}if(e.key==='ArrowDown'){e.preventDefault();shift(-1)}}}/>
      {unit&&<span className="af-unit">{unit}</span>}
      <div className="af-stepper">
        <button type="button" aria-label="Snížit hodnotu" disabled={disabled||value!==null&&value<=min} onClick={()=>shift(-1)}>−</button>
        <button type="button" aria-label="Zvýšit hodnotu" disabled={disabled||value!==null&&value>=max} onClick={()=>shift(1)}>+</button>
      </div>
    </div>
    <span className="af-hint">Rozsah {min}–{Number.isFinite(max)?max:'∞'}, krok {step}.</span>
  </div>
}

export type FileUploadSize = 'default' | 'large'

export interface FileDropzoneProps {
  label?: string
  files: File[]
  onChange: (files: File[]) => void
  size?: FileUploadSize
  accept?: string
  /** Maximum size of each file, in bytes. */
  maxSize?: number
  /** Original size-limit prop, retained for existing consumers. */
  maxBytes?: number
  multiple?: boolean
  disabled?: boolean
  /** Driven by the caller's real processing operation; no upload is simulated. */
  processing?: boolean
  error?: string
  onError?: (message: string | undefined) => void
  /** Allows the catalog to preview a drop target without a dragged file. */
  dragOver?: boolean
}

const atmosphereStyles: CSSProperties & Record<`--${string}`, string | number> = {
    '--afu-background': themes.dark.backdrop,
    '--afu-foreground': themes.dark.brandText,
    '--afu-muted': themes.dark.muted,
    '--afu-boundary': themes.dark.controlBorder,
    '--afu-active-boundary': themes.dark.brand,
    '--afu-boundary-width': '1px',
    '--surface': themes.dark.surface,
    '--text': themes.dark.text,
    '--subtle': themes.dark.subtle,
    '--brand-soft': themes.dark.brandSoft,
    '--brand-text': themes.dark.brandText,
    '--focus-ring': themes.dark.focusRing,
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const unit = bytes < 1024 * 1024 ? 'kB' : 'MB'
  const value = bytes / (unit === 'kB' ? 1024 : 1024 * 1024)
  return `${value.toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} ${unit}`
}

function acceptsFile(file: File, accept: string) {
  const rules = accept.toLowerCase().split(',').map(rule => rule.trim()).filter(Boolean)
  return !rules.length || rules.some(rule => {
    if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule)
    if (rule.endsWith('/*')) return file.type.toLowerCase().startsWith(rule.slice(0, -1))
    return file.type.toLowerCase() === rule
  })
}

function fileKey(file: File) {
  return JSON.stringify([file.name, file.size, file.type, file.lastModified])
}

export function FileDropzone({
  label,
  files,
  onChange,
  size = 'default',
  accept = '.pdf,.txt,.md,.png,.jpg,.jpeg,.webp',
  maxSize,
  maxBytes,
  multiple = true,
  disabled = false,
  processing = false,
  error,
  onError,
  dragOver = false,
}: FileDropzoneProps) {
  const uid = useId()
  const fileLimit = maxSize ?? maxBytes ?? 10 * 1024 * 1024
  const inputRef = useRef<HTMLInputElement>(null)
  const actionRef = useRef<HTMLButtonElement>(null)
  const dragDepth = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [validationError, setValidationError] = useState<string>()
  const blocked = disabled || processing
  const activeDrop = !blocked && (dragging || dragOver)
  const message = validationError || error
  const state = processing ? 'processing' : activeDrop ? 'drag-over' : message ? 'error' : files.length ? 'ready' : 'empty'
  const heading = typography[size === 'large' ? 'h1' : 'h2']
  const headingId = `${uid}-heading`
  const hintId = `${uid}-hint`
  const errorId = `${uid}-error`
  const describedBy = message ? `${hintId} ${errorId}` : hintId
  const acceptedTypes = accept.split(',').map(rule => rule.trim().replace(/^\./, '').toUpperCase()).filter(Boolean).join(', ')
  const styles = {
    ...atmosphereStyles,
    '--afu-accent': themes.dark.brand,
    '--afu-padding': `${size === 'large' ? spacing[8] : spacing[6]}px`,
    '--afu-gap': `${size === 'large' ? spacing[6] : spacing[4]}px`,
    '--afu-heading-size': `${heading.size}px`,
    '--afu-heading-leading': heading.lineHeight,
    '--afu-heading-weight': heading.weight,
    '--afu-heading-tracking': `${heading.tracking}em`,
    '--afu-body-size': `${typography.bodySm.size}px`,
    '--afu-body-leading': typography.bodySm.lineHeight,
    '--afu-eyebrow-size': `${typography.overline.size}px`,
    '--afu-eyebrow-tracking': `${typography.overline.tracking}em`,
  } as CSSProperties

  function addFiles(incoming: File[]) {
    if (blocked || !incoming.length) return
    let nextError: string | undefined
    if (!multiple && incoming.length > 1) nextError = 'Vyber pouze jeden soubor.'
    for (const file of incoming) {
      if (nextError) break
      if (!acceptsFile(file, accept)) nextError = `Soubor „${file.name}“ má nepodporovaný typ. Vyber jiný soubor.`
      else if (file.size > fileLimit) nextError = `Soubor „${file.name}“ překračuje limit ${formatFileSize(fileLimit)}. Vyber menší soubor.`
    }
    setValidationError(nextError)
    onError?.(nextError)
    // Reject an invalid batch atomically, keeping all previously selected files.
    if (nextError) return
    const existing = multiple ? files : []
    const seen = new Set(existing.map(fileKey))
    const added = incoming.filter(file => {
      const key = fileKey(file)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    onChange([...existing, ...added])
  }

  function isFileDrag(event: DragEvent<HTMLDivElement>) {
    return Array.from(event.dataTransfer.types).includes('Files')
  }

  return (
    <div className={`afu-dropzone afu-dropzone--${size}`}
      style={styles} data-state={state} role="group" aria-label={label} aria-labelledby={label ? undefined : headingId}
      aria-describedby={describedBy} aria-busy={processing || undefined}
      onDragEnter={event => {
        if (!isFileDrag(event)) return
        event.preventDefault()
        if (blocked) return
        dragDepth.current += 1
        setDragging(true)
      }}
      onDragOver={event => {
        if (!isFileDrag(event)) return
        event.preventDefault()
        event.dataTransfer.dropEffect = blocked ? 'none' : 'copy'
      }}
      onDragLeave={event => {
        if (!isFileDrag(event)) return
        dragDepth.current = Math.max(0, dragDepth.current - 1)
        if (!dragDepth.current) setDragging(false)
      }}
      onDrop={event => {
        event.preventDefault()
        dragDepth.current = 0
        setDragging(false)
        addFiles(Array.from(event.dataTransfer.files))
      }}
    >
      <div className="afu-copy">
        <p className="afu-eyebrow">AXOLOTL / WORKSPACE</p>
        <h3 className="afu-headline" id={headingId}>
          Upload files.<span className="afu-headline-accent">Work smarter.</span>
        </h3>
        <p className="afu-support">Všechny potřebné soubory na jednom místě.</p>
      </div>

      <input ref={inputRef} type="file" hidden accept={accept} multiple={multiple}
        disabled={blocked} aria-label={label ?? 'Vybrat soubory'} aria-describedby={describedBy}
        aria-invalid={Boolean(message)} onChange={event => {
          addFiles(Array.from(event.currentTarget.files ?? []))
          // Selecting the same file again must also allow retrying a rejected file.
          event.currentTarget.value = ''
        }} />

      <div className="afu-target">
        <AxoIcon name="folder" size={size === 'large' ? spacing[8] : spacing[6]} />
        <div className="afu-target-copy">
          <strong>{activeDrop ? 'Pusť soubory sem' : files.length ? 'Přidej další soubory' : 'Přetáhni soubory sem'}</strong>
          <span id={hintId}>{acceptedTypes || 'Všechny typy souborů'} · max. {formatFileSize(fileLimit)} / soubor</span>
        </div>
        <AxoButton ref={actionRef} variant="secondary" icon="plus" disabled={disabled} loading={processing}
          aria-describedby={describedBy} onClick={() => inputRef.current?.click()}>
          {processing ? 'Zpracovávám…' : files.length ? 'Přidat soubory' : 'Vybrat soubory'}
        </AxoButton>
      </div>

      {files.length > 0 && (
        <ul className="afu-files" aria-label="Vybrané soubory">
          {files.map((file, index) => (
            <li className="afu-file" key={`${fileKey(file)}-${index}`}>
              <AxoIcon name="file-text" size={spacing[5]} />
              <div className="afu-file-info"><strong title={file.name}>{file.name}</strong><span>{formatFileSize(file.size)}</span></div>
              <AxoButton variant="ghost" size="compact" icon="close" iconOnly
                aria-label={`Odebrat ${file.name}`} disabled={blocked} onClick={() => {
                  onChange(files.filter((_, fileIndex) => fileIndex !== index))
                  requestAnimationFrame(() => actionRef.current?.focus())
                }} />
            </li>
          ))}
        </ul>
      )}

      {message && <p className="afu-error" role="alert" id={errorId}><AxoIcon name="alert-circle" tone="danger" size={spacing[4]} /><span>{message}</span></p>}
      <div className={'afu-status'+(!processing && files.length > 0 && !message ? ' is-ready' : '')} role="status" aria-atomic="true">
        {processing ? <><AxoIcon name="loader" size={spacing[4]} /><span>Zpracovávám soubory…</span></> :
          files.length > 0 && !message ? <><AxoIcon name="check" size={spacing[4]} /><span>Soubory jsou připravené / {files.length}</span></> : null}
      </div>
    </div>
  )
}
