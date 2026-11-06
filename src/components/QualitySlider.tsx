import { useId, type CSSProperties } from 'react'
import './QualitySlider.css'

export type QualitySliderState = 'default' | 'hover' | 'focus' | 'disabled'
export interface QualitySliderProps {
  label?: string
  value: number
  onChange: (value: number) => void
  state?: QualitySliderState
  showValue?: boolean
}

/**
 * Design-system Quality Slider. This control changes only local preview values.
 * No image conversion, compression, or file logic is attached.
 */
export function QualitySlider({label='Kvalita',value,onChange,state='default',showValue=true}:QualitySliderProps) {
  const id = useId()
  const clamped = Math.max(0,Math.min(100,Number.isFinite(value)?value:0))
  return <div className={'qs-slider qs-slider--'+state} style={{'--qs-progress':clamped+'%'} as CSSProperties}>
    <div className="qs-heading">
      <label htmlFor={id}>{label}</label>
      {showValue && <output htmlFor={id}>{clamped} %</output>}
    </div>
    <input id={id} className="qs-range" type="range" min={0} max={100} step={1}
      value={clamped} onChange={e=>onChange(Number(e.currentTarget.value))}
      disabled={state==='disabled'} aria-valuetext={clamped+' procent'}/>
    <div className="qs-limits" aria-hidden="true"><span>0</span><span>100</span></div>
  </div>
}
