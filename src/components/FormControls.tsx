import { forwardRef, useEffect, useId, useRef, useState, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react'
import './form-controls.css'

export type FormAccent = 'brand' | 'info' | 'success' | 'warning' | 'danger'

export type FieldState = 'default' | 'error' | 'success'
export type FormSize = 'compact' | 'default' | 'comfortable'
export type SelectOption = { value: string; label: string; disabled?: boolean }

type CommonFieldProps = { label: string; hint?: string; error?: string; success?: string; fieldSize?: FormSize; fieldState?: FieldState }
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & CommonFieldProps
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & CommonFieldProps

function Feedback({ id, hint, error, success }: { id:string; hint?:string; error?:string; success?:string }) {
  const message = error ?? success ?? hint
  return message ? <span id={id} className={'fc-feedback'+(error?' is-error':success?' is-success':'')} role={error?'alert':undefined}>{(error||success)&&<span className="fc-feedback-mark" aria-hidden="true">{error?'!':'✓'}</span>}{message}</span> : null
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
  return <div className={'fc-field fc-'+fieldSize+' fc-'+state+(filled?' is-filled':'')+' '+className}>
    <label htmlFor={inputId}>{label}{required&&<span className="fc-required" aria-hidden="true"> *</span>}</label>
    <input ref={ref} id={inputId} required={required} aria-invalid={state==='error'} aria-describedby={hint||error||success?messageId:undefined} {...rest} onInput={event=>{setUncontrolledFilled(event.currentTarget.value.trim().length>0);rest.onInput?.(event)}}/>
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
  return <div className={'fc-field fc-'+fieldSize+' fc-'+state+(filled?' is-filled':'')+' '+className}>
    <label htmlFor={inputId}>{label}{required&&<span className="fc-required" aria-hidden="true"> *</span>}</label>
    <textarea ref={ref} id={inputId} required={required} aria-invalid={state==='error'} aria-describedby={hint||error||success?messageId:undefined} {...rest} onInput={event=>{setUncontrolledFilled(event.currentTarget.value.trim().length>0);rest.onInput?.(event)}}/>
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
  const items=useRef<(HTMLButtonElement|null)[]>([])
  const [open,setOpen]=useState(false)
  const [active,setActive]=useState(0)
  const state=error?'error':success?'success':fieldState
  const selected=options.find(o=>o.value===value)
  const firstEnabled=()=>options.findIndex(o=>!o.disabled)
  const nextEnabled=(from:number,dir:number)=>{
    if(!options.length)return -1
    let index=from
    for(let n=0;n<options.length;n++){index=(index+dir+options.length)%options.length;if(!options[index].disabled)return index}
    return from
  }
  useEffect(()=>{
    if(!open)return
    const close=(event:PointerEvent)=>{if(wrapper.current&&!wrapper.current.contains(event.target as Node))setOpen(false)}
    document.addEventListener('pointerdown',close)
    return()=>document.removeEventListener('pointerdown',close)
  },[open])
  useEffect(()=>{
    if(open&&active>=0)items.current[active]?.focus()
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
  }
  const onOptionKey=(event:React.KeyboardEvent<HTMLButtonElement>,index:number)=>{
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();setActive(nextEnabled(index,event.key==='ArrowDown'?1:-1))}
    else if(event.key==='Home'){event.preventDefault();setActive(firstEnabled())}
    else if(event.key==='End'){event.preventDefault();setActive(nextEnabled(firstEnabled(),-1))}
    else if(event.key==='Escape'){event.preventDefault();setOpen(false);trigger.current?.focus()}
    else if(event.key==='Tab'){trigger.current?.focus();setOpen(false)}
  }
  return <div className={'fc-field fc-select-field fc-'+fieldSize+' fc-'+state+(selected?' is-filled':'')}>
    <span className="fc-label" id={labelId}>{label}</span>
    <div className="fc-select-wrapper" ref={wrapper} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setOpen(false)}}>
      <button ref={trigger} id={triggerId} type="button" className="fc-select-trigger"
        disabled={disabled||firstEnabled()<0} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId}
        aria-labelledby={labelId+' '+triggerId} aria-describedby={hint||error||success?messageId:undefined}
        aria-invalid={state==='error'} onClick={()=>open?setOpen(false):reveal(options.findIndex(o=>o.value===value))}
        onKeyDown={onTriggerKey}>
        <span className={selected?'':'fc-select-placeholder'}>{selected?.label??placeholder}</span>
        <svg className={'fc-select-chevron'+(open?' is-open':'')} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m5 7 5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open&&<div className="fc-select-menu" id={listId} role="listbox" aria-labelledby={labelId}>
        {options.map((option,i)=><button key={option.value} ref={el=>{items.current[i]=el}} type="button" role="option"
          aria-selected={value===option.value} disabled={option.disabled} tabIndex={i===active?0:-1}
          className={'fc-select-option'+(value===option.value?' is-selected':'')}
          onKeyDown={event=>onOptionKey(event,i)} onMouseEnter={()=>{if(!option.disabled)setActive(i)}}
          onClick={()=>choose(option)}><span>{option.label}</span>{value===option.value&&<span aria-hidden="true">✓</span>}</button>)}
      </div>}
    </div>
    <Feedback id={messageId} hint={hint} error={error} success={success}/>
  </div>
}

type CheckProps={label:ReactNode;description?:string;checked:boolean;onChange:(checked:boolean)=>void;disabled?:boolean;id?:string;error?:string;required?:boolean;accent?:FormAccent}
export function FormCheckbox({label,description,checked,onChange,disabled,id,error,required,accent='brand'}:CheckProps){
  const uid=useId();const fieldId=id??uid;const messageId=uid+'-error'
  return <label className={'fc-choice fc-checkbox fc-accent-'+accent+(disabled?' is-disabled':'')} htmlFor={fieldId}>
    <input id={fieldId} type="checkbox" required={required} aria-invalid={Boolean(error)} aria-describedby={error?messageId:undefined} checked={checked} onChange={e=>onChange(e.target.checked)} disabled={disabled}/>
    <span className="fc-checkbox-mark" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m4.5 10 4 4 7-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
    <span className="fc-choice-copy"><strong>{label}</strong>{description&&<small>{description}</small>}<Feedback id={messageId} error={error}/></span>
  </label>
}
export interface RadioOption extends SelectOption { description?:string }
export function FormRadioGroup({label,options,value,onChange,name,disabled=false,accent='brand'}:{
  label:string;options:RadioOption[];value:string;onChange:(value:string)=>void;name:string;disabled?:boolean;accent?:FormAccent
}){
  return <fieldset className={'fc-radio-fieldset fc-accent-'+accent} disabled={disabled}><legend>{label}</legend><div className="fc-radio-list">
    {options.map(o=><label key={o.value} className={'fc-choice fc-radio'+(disabled||o.disabled?' is-disabled':'')}>
      <input type="radio" name={name} value={o.value} checked={value===o.value} disabled={o.disabled||disabled} onChange={()=>onChange(o.value)}/>
      <span className="fc-radio-mark" aria-hidden="true"/>
      <span className="fc-choice-copy"><strong>{o.label}</strong>{o.description&&<small>{o.description}</small>}</span>
    </label>)}
  </div></fieldset>
}
export function FormSwitch({label,description,checked,onChange,disabled=false,id,accent='brand'}:CheckProps){
  const uid=useId()
  return <label className={'fc-switch-row fc-accent-'+accent+(disabled?' is-disabled':'')} htmlFor={id??uid}>
    <span className="fc-choice-copy"><strong>{label}</strong>{description&&<small>{description}</small>}</span>
    <span className="fc-switch-control"><input id={id??uid} type="checkbox" role="switch" checked={checked} onChange={e=>onChange(e.target.checked)} disabled={disabled}/><span className="fc-switch-track" aria-hidden="true"><span className="fc-switch-thumb"/></span></span>
  </label>
}
