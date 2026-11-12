// V2 port of QualitySlider: native range interactions with custom track and thumb.
import { useId, type CSSProperties } from 'react'

interface QualitySliderProps {
  label?: string
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export default function QualitySliderV2({ label = 'Kvalita', value, onChange, disabled = false }: QualitySliderProps) {
  const id = useId()
  const clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? Math.round(value) : 0))

  return <div className="v2f-quality-slider" style={{ '--v2f-quality-progress': clamped + '%' } as CSSProperties}>
    <div className="v2f-quality-heading">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{clamped} %</output>
    </div>
    <input id={id} className="v2f-quality-range" type="range" min={0} max={100} step={1}
      value={clamped} onChange={event => onChange(Number(event.currentTarget.value))}
      disabled={disabled} aria-valuetext={clamped + ' procent'} />
    <div className="v2f-quality-limits" aria-hidden="true"><span>Nižší kvalita</span><span>Vyšší kvalita</span></div>
  </div>
}
