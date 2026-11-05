import { useEffect, useId, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { AxoIcon } from './AxoIcon'
import type { SelectOption } from './FormControls'
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

export interface FileDropzoneProps {
  label:string
  files:File[]
  onChange:(files:File[])=>void
  accept?:string
  multiple?:boolean
  maxBytes?:number
  disabled?:boolean
}
export function FileDropzone({label,files,onChange,accept,multiple=true,maxBytes=10*1024*1024,disabled=false}:FileDropzoneProps){
  const uid=useId()
  const input=useRef<HTMLInputElement>(null)
  const [dragging,setDragging]=useState(false)
  const [error,setError]=useState('')
  const extensionMatches=(file:File)=>{
    if(!accept)return true
    return accept.split(',').some(part=>{
      const token=part.trim().toLowerCase()
      return token.startsWith('.')?file.name.toLowerCase().endsWith(token):token.endsWith('/*')?file.type.startsWith(token.slice(0,-1)):file.type===token
    })
  }
  const add=(next:File[])=>{
    const invalid=next.find(file=>file.size>maxBytes||!extensionMatches(file))
    if(invalid){setError('Soubor '+invalid.name+' překračuje limit nebo má nepovolený typ.');return}
    setError('')
    onChange(multiple?[...files,...next.filter(file=>!files.some(existing=>existing.name===file.name&&existing.size===file.size))]:next.slice(0,1))
  }
  const onInput=(event:ChangeEvent<HTMLInputElement>)=>{add(Array.from(event.target.files??[]));event.target.value=''}
  const onDrop=(event:DragEvent<HTMLDivElement>)=>{event.preventDefault();setDragging(false);if(!disabled)add(Array.from(event.dataTransfer.files))}
  return <div className={'af-field'+(files.length?' is-filled':'')}>
    <label className="af-label" htmlFor={uid}>{label}</label>
    <div className={'af-dropzone'+(dragging?' is-dragging':'')+(disabled?' is-disabled':'')} role="group"
      onDragOver={e=>{e.preventDefault();if(!disabled)setDragging(true)}} onDragLeave={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setDragging(false)}} onDrop={onDrop}>
      <AxoIcon name="folder" size={25} tone="brand"/>
      <strong>Přetáhni soubor sem</strong><span>nebo vyber soubor ze zařízení</span>
      <button type="button" disabled={disabled} onClick={()=>input.current?.click()}>Vybrat soubor</button>
      <input ref={input} id={uid} type="file" accept={accept} multiple={multiple} disabled={disabled}
        className="af-visually-hidden" onChange={onInput}/>
    </div>
    <span className="af-hint">Maximálně {Math.round(maxBytes/1024/1024)} MB na soubor. {accept||'Běžné soubory'}.</span>
    {error&&<span className="af-error" role="alert">{error}</span>}
    {files.length>0&&<ul className="af-file-list">{files.map((file,i)=><li key={file.name+'-'+i}>
      <span><AxoIcon name="file-text" size={17}/><span title={file.name}>{file.name}</span><small>{(file.size/1024).toFixed(0)} KB</small></span>
      <button type="button" aria-label={'Odebrat '+file.name} onClick={()=>onChange(files.filter((_,index)=>index!==i))}><AxoIcon name="close" size={15}/></button>
    </li>)}</ul>}
  </div>
}
