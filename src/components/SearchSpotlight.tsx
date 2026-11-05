import { useEffect, useState } from 'react'
import { AxoIcon } from './AxoIcon'
import './search-spotlight.css'

const defaultPhrases = [
  'Jaký asset hledáte?',
  'Zadejte hledanou frázi…',
  'Najděte obrázek nebo dokument…',
] as const

export interface SearchSpotlightProps {
  value: string
  onChange: (value:string) => void
  label?: string
  phrases?: readonly string[]
  disabled?: boolean
  id?: string
}

/** A real, accessible empty search field. Animated examples are only visual hints. */
export function SearchSpotlight({
  value,onChange,label='Hledat asset nebo frázi',
  phrases=defaultPhrases,disabled=false,id,
}:SearchSpotlightProps){
  const [focused,setFocused]=useState(false)
  const [phraseIndex,setPhraseIndex]=useState(0)
  const [length,setLength]=useState(0)
  const [deleting,setDeleting]=useState(false)
  const [reducedMotion,setReducedMotion]=useState(false)
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)')
    const update=()=>setReducedMotion(media.matches)
    update()
    media.addEventListener('change',update)
    return ()=>media.removeEventListener('change',update)
  },[])
  const current=phrases[phraseIndex%Math.max(1,phrases.length)]??''
  useEffect(()=>{
    if(focused||value||disabled||reducedMotion||!phrases.length)return
    const pause=!deleting&&length===current.length?1450:deleting&&length===0?420:0
    const timer=window.setTimeout(()=>{
      if(!deleting){
        if(length>=current.length)setDeleting(true)
        else setLength(n=>n+1)
      }else if(length===0){
        setPhraseIndex(n=>(n+1)%phrases.length)
        setDeleting(false)
      }else setLength(n=>n-1)
    },pause||(deleting?45:85))
    return ()=>window.clearTimeout(timer)
  },[current,deleting,disabled,focused,length,phrases,reducedMotion,value])
  const showHint=!focused&&!value&&!disabled
  return <div className={'sf-search'+(disabled?' is-disabled':'')}>
    <AxoIcon name="search" size={20} className="sf-search-icon"/>
    <input id={id} type="search" autoComplete="off" spellCheck={false}
      value={value} onChange={e=>onChange(e.target.value)}
      onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
      aria-label={label} disabled={disabled} placeholder=""
    />
    {showHint&&<span className="sf-search-hint" aria-hidden="true">
      {reducedMotion?current:current.slice(0,length)}
      {!reducedMotion&&<span className="sf-search-caret"/>}
    </span>}
  </div>
}
