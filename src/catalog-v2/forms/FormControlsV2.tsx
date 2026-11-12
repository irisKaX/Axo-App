// V2 port of the six approved basic controls; legacy controls and styles stay isolated.
import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { spacing } from '../../design-system/foundations/spacing'
import './forms.css'

export type FormAccent = 'brand' | 'info' | 'success' | 'warning' | 'danger'

export type FieldState = 'default' | 'error' | 'success'
export type FormSize = 'compact' | 'default' | 'comfortable'
export type SelectOption = { value: string; label: string; disabled?: boolean }

type CommonFieldProps = { label: string; hint?: string; error?: string; success?: string; fieldSize?: FormSize; fieldState?: FieldState }
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & CommonFieldProps
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & CommonFieldProps

function Feedback({ id, hint, error, success }: { id:string; hint?:string; error?:string; success?:string }) {
  const message = error ?? success ?? hint
  return message ? <span id={id} className={'v2f-feedback'+(error?' is-error':success?' is-success':'')} role={error?'alert':undefined}>{(error||success)&&<span className="v2f-feedback-mark" aria-hidden="true">{error?'!':'✓'}</span>}{message}</span> : null
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(function FormInput({
  label, hint, error, success, fieldSize='default', fieldState='default', id, required, className='', ...rest
}, ref) {
  const uid=useId()
  const inputId=id??uid
  const messageId=uid+'-message'
  const state=error?'error':success?'success':fieldState
  const [uncontrolledFilled,setUncontrolledFilled]=useState(()=>String(rest.defaultValue??rest.value??'').trim().length>0)
  const filled=rest.value===undefined?uncontrolledFilled:String(rest.value??'').trim().length>0
  return <div className={'v2f-field v2f-'+fieldSize+' v2f-'+state+(filled?' is-filled':'')+' '+className}>
    <label htmlFor={inputId}>{label}{required&&<span className="v2f-required" aria-hidden="true"> *</span>}</label>
    <input className="v2f-control" ref={ref} id={inputId} required={required} aria-invalid={state==='error'} aria-describedby={hint||error||success?messageId:undefined} {...rest} onInput={event=>{setUncontrolledFilled(event.currentTarget.value.trim().length>0);rest.onInput?.(event)}}/>
    <Feedback id={messageId} hint={hint} error={error} success={success}/>
  </div>
})

export const FormTextarea=forwardRef<HTMLTextAreaElement,TextareaProps>(function FormTextarea({
  label,hint,error,success,fieldSize='default',fieldState='default',id,required,className='',...rest
},ref){
  const uid=useId()
  const inputId=id??uid
  const messageId=uid+'-message'
  const state=error?'error':success?'success':fieldState
  const [uncontrolledFilled,setUncontrolledFilled]=useState(()=>String(rest.defaultValue??rest.value??'').trim().length>0)
  const filled=rest.value===undefined?uncontrolledFilled:String(rest.value??'').trim().length>0
  return <div className={'v2f-field v2f-'+fieldSize+' v2f-'+state+(filled?' is-filled':'')+' '+className}>
    <label htmlFor={inputId}>{label}{required&&<span className="v2f-required" aria-hidden="true"> *</span>}</label>
    <textarea className="v2f-control" ref={ref} id={inputId} required={required} aria-invalid={state==='error'} aria-describedby={hint||error||success?messageId:undefined} {...rest} onInput={event=>{setUncontrolledFilled(event.currentTarget.value.trim().length>0);rest.onInput?.(event)}}/>
    <Feedback id={messageId} hint={hint} error={error} success={success}/>
  </div>
})

export interface FormSelectProps extends CommonFieldProps {
  options: SelectOption[]
  value: string
  onChange: (value:string)=>void
  placeholder?:string
  disabled?:boolean
  id?:string
}
export function FormSelect({label,options,value,onChange,placeholder='Vyber možnost',disabled=false,fieldSize='default',fieldState='default',hint,error,success,id}:FormSelectProps){
  const uid=useId()
  const triggerId=id??uid
  const labelId=uid+'-label'
  const listId=uid+'-list'
  const messageId=uid+'-message'
  const wrapper=useRef<HTMLDivElement>(null)
  const trigger=useRef<HTMLButtonElement>(null)
  const menu=useRef<HTMLDivElement>(null)
  const items=useRef<(HTMLButtonElement|null)[]>([])
  const [open,setOpen]=useState(false)
  const [active,setActive]=useState(0)
  const state=error?'error':success?'success':fieldState
  const selected=options.find(o=>o.value===value)
  const containsTarget=(target:Node|null)=>Boolean(target&&(wrapper.current?.contains(target)||menu.current?.contains(target)))
  const firstEnabled=()=>options.findIndex(o=>!o.disabled)
  const nextEnabled=(from:number,dir:number)=>{
    if(!options.length)return -1
    let index=from
    for(let n=0;n<options.length;n++){index=(index+dir+options.length)%options.length;if(!options[index].disabled)return index}
    return from
  }
  useEffect(()=>{
    if(!open)return
    const close=(event:PointerEvent)=>{if(!containsTarget(event.target as Node))setOpen(false)}
    document.addEventListener('pointerdown',close)
    return()=>document.removeEventListener('pointerdown',close)
  },[open])
  // Portal content keeps the exact resolved theme and typography of its owner.
  useLayoutEffect(()=>{
    if(!open||!wrapper.current||!menu.current)return
    const inherited=getComputedStyle(wrapper.current)
    for(const role of ['border','raised','shadow','text','radius-lg','radius-sm','selected','hover','pressed','focus','disabled-text']){
      const name='--v2f-'+role
      menu.current.style.setProperty(name,inherited.getPropertyValue(name))
    }
    for(const property of ['font-family','font-size','font-weight','font-style','line-height','letter-spacing','direction','color-scheme']){
      menu.current.style.setProperty('--v2f-menu-'+property,inherited.getPropertyValue(property))
    }
  })
  useLayoutEffect(()=>{
    if(!open||!trigger.current||!menu.current)return
    const anchor=trigger.current
    const element=menu.current
    const viewport=window.visualViewport
    const gap=spacing[2]
    element.style.setProperty('--v2f-menu-position','fixed')
    element.style.setProperty('--v2f-menu-layer','1001')
    element.style.setProperty('--v2f-menu-right','auto')
    function place(){
      const rect=anchor.getBoundingClientRect()
      const minX=(viewport?.offsetLeft??0)+gap
      const minY=(viewport?.offsetTop??0)+gap
      const maxX=minX+(viewport?.width??document.documentElement.clientWidth)-gap*2
      const maxY=minY+(viewport?.height??window.innerHeight)-gap*2
      element.style.setProperty('--v2f-menu-width',Math.max(0,Math.min(rect.width,maxX-minX))+'px')
      const limit=parseFloat(getComputedStyle(element).getPropertyValue('--v2f-menu-limit'))
      const naturalHeight=Math.min(limit,element.scrollHeight+2)
      const below=Math.max(0,maxY-rect.bottom-gap)
      const above=Math.max(0,rect.top-gap-minY)
      const upwards=naturalHeight>below&&above>below
      element.style.setProperty('--v2f-menu-max-height',(upwards?above:below)+'px')
      const box=element.getBoundingClientRect()
      const x=Math.max(minX,Math.min(rect.left,maxX-box.width))
      const y=Math.max(minY,Math.min(upwards?rect.top-gap-box.height:rect.bottom+gap,maxY-box.height))
      element.style.setProperty('--v2f-menu-left',x+'px')
      element.style.setProperty('--v2f-menu-top',y+'px')
    }
    place()
    const observer=new ResizeObserver(place)
    observer.observe(anchor)
    observer.observe(element)
    window.addEventListener('resize',place)
    window.addEventListener('scroll',place,true)
    viewport?.addEventListener('resize',place)
    viewport?.addEventListener('scroll',place)
    return()=>{
      observer.disconnect()
      window.removeEventListener('resize',place)
      window.removeEventListener('scroll',place,true)
      viewport?.removeEventListener('resize',place)
      viewport?.removeEventListener('scroll',place)
    }
  },[open])
  useEffect(()=>{
    const item=items.current[active]
    const list=menu.current
    if(!open||!item||!list)return
    item.focus({preventScroll:true})
    // Scroll only the list, never the owning panel or document.
    if(item.offsetTop<list.scrollTop)list.scrollTop=item.offsetTop
    else if(item.offsetTop+item.offsetHeight>list.scrollTop+list.clientHeight)list.scrollTop=item.offsetTop+item.offsetHeight-list.clientHeight
  },[open,active])
  const reveal=(index:number)=>{
    const next=index>=0&&options[index]&&!options[index].disabled?index:firstEnabled()
    if(disabled||next<0)return
    setActive(next)
    setOpen(true)
  }
  const choose=(option:SelectOption)=>{
    if(option.disabled)return
    onChange(option.value)
    setOpen(false)
    requestAnimationFrame(()=>trigger.current?.focus())
  }
  const onTriggerKey=(event:React.KeyboardEvent<HTMLButtonElement>)=>{
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){
      event.preventDefault()
      const idx=options.findIndex(o=>o.value===value&&!o.disabled)
      reveal(idx>=0?idx:firstEnabled())
    }else if(event.key==='Enter'||event.key===' '){event.preventDefault();open?setOpen(false):reveal(options.findIndex(o=>o.value===value))}
    else if(event.key==='Escape'&&open){event.preventDefault();setOpen(false);trigger.current?.focus()}
  }
  const onOptionKey=(event:React.KeyboardEvent<HTMLButtonElement>,index:number)=>{
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();setActive(nextEnabled(index,event.key==='ArrowDown'?1:-1))}
    else if(event.key==='Home'){event.preventDefault();setActive(firstEnabled())}
    else if(event.key==='End'){event.preventDefault();setActive(nextEnabled(firstEnabled(),-1))}
    else if(event.key==='Escape'){event.preventDefault();setOpen(false);trigger.current?.focus()}
    else if(event.key==='Tab'){trigger.current?.focus();setOpen(false)}
  }
  return <div className={'v2f-field v2f-select-field v2f-'+fieldSize+' v2f-'+state+(selected?' is-filled':'')}>
    <span className="v2f-label" id={labelId}>{label}</span>
    <div className="v2f-select-wrapper" ref={wrapper} onBlur={event=>{if(!containsTarget(event.relatedTarget as Node|null))setOpen(false)}}>
      <button ref={trigger} id={triggerId} type="button" className="v2f-control v2f-select-trigger"
        disabled={disabled||firstEnabled()<0} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId}
        aria-labelledby={labelId+' '+triggerId} aria-describedby={hint||error||success?messageId:undefined}
        aria-invalid={state==='error'} onClick={()=>open?setOpen(false):reveal(options.findIndex(o=>o.value===value))}
        onKeyDown={onTriggerKey}>
        <span className={selected?'':'v2f-select-placeholder'}>{selected?.label??placeholder}</span>
        <svg className={'v2f-select-chevron'+(open?' is-open':'')} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m5 7 5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open&&createPortal(<div className="v2f-select-menu" ref={menu} id={listId} role="listbox" aria-labelledby={labelId}>
        {options.map((option,i)=><button key={option.value} ref={el=>{items.current[i]=el}} type="button" role="option"
          aria-selected={value===option.value} disabled={option.disabled} tabIndex={i===active?0:-1}
          className={'v2f-select-option'+(value===option.value?' is-selected':'')}
          onKeyDown={event=>onOptionKey(event,i)} onMouseEnter={()=>{if(!option.disabled)setActive(i)}}
          onClick={()=>choose(option)}><span>{option.label}</span>{value===option.value&&<span aria-hidden="true">✓</span>}</button>)}
      </div>,document.body)}
    </div>
    <Feedback id={messageId} hint={hint} error={error} success={success}/>
  </div>
}

type CheckProps={label:ReactNode;description?:string;checked:boolean;onChange:(checked:boolean)=>void;disabled?:boolean;id?:string;error?:string;required?:boolean;accent?:FormAccent}
export function FormCheckbox({label,description,checked,onChange,disabled,id,error,required,accent='brand'}:CheckProps){
  const uid=useId();const fieldId=id??uid;const messageId=uid+'-error'
  return <label className={'v2f-choice v2f-checkbox v2f-accent-'+accent+(disabled?' is-disabled':'')} htmlFor={fieldId}>
    <input id={fieldId} type="checkbox" required={required} aria-invalid={Boolean(error)} aria-describedby={error?messageId:undefined} checked={checked} onChange={e=>onChange(e.target.checked)} disabled={disabled}/>
    <span className="v2f-checkbox-mark" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m4.5 10 4 4 7-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
    <span className="v2f-choice-copy"><strong>{label}</strong>{description&&<small>{description}</small>}<Feedback id={messageId} error={error}/></span>
  </label>
}
export interface RadioOption extends SelectOption { description?:string }
export function FormRadioGroup({label,options,value,onChange,name,disabled=false,accent='brand'}:{
  label:string;options:RadioOption[];value:string;onChange:(value:string)=>void;name:string;disabled?:boolean;accent?:FormAccent
}){
  return <fieldset className={'v2f-radio-fieldset v2f-accent-'+accent} disabled={disabled}><legend>{label}</legend><div className="v2f-radio-list">
    {options.map(o=><label key={o.value} className={'v2f-choice v2f-radio'+(disabled||o.disabled?' is-disabled':'')}>
      <input type="radio" name={name} value={o.value} checked={value===o.value} disabled={o.disabled||disabled} onChange={()=>onChange(o.value)}/>
      <span className="v2f-radio-mark" aria-hidden="true"/>
      <span className="v2f-choice-copy"><strong>{o.label}</strong>{o.description&&<small>{o.description}</small>}</span>
    </label>)}
  </div></fieldset>
}
export function FormSwitch({label,description,checked,onChange,disabled=false,id,accent='brand'}:CheckProps){
  const uid=useId()
  return <label className={'v2f-switch-row v2f-accent-'+accent+(disabled?' is-disabled':'')} htmlFor={id??uid}>
    <span className="v2f-choice-copy"><strong>{label}</strong>{description&&<small>{description}</small>}</span>
    <span className="v2f-switch-control"><input id={id??uid} type="checkbox" role="switch" checked={checked} onChange={e=>onChange(e.target.checked)} disabled={disabled}/><span className="v2f-switch-track" aria-hidden="true"><span className="v2f-switch-thumb"/></span></span>
  </label>
}
