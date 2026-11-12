// V2 port of the original DatePickerField: Czech calendar, month navigation and min/max.
import { useEffect, useId, useRef, useState } from 'react'
import { AxoIcon } from '../../components/AxoIcon'

interface DatePickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  min?: string
  max?: string
  disabled?: boolean
}

const dateKey = (year: number, month: number, day: number) => [year, String(month + 1).padStart(2, '0'), String(day).padStart(2, '0')].join('-')
const dateLabel = (date: Date) => date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })

export default function DatePickerV2({ label, value, onChange, min, max, disabled = false }: DatePickerProps) {
  const uid = useId()
  const today = new Date()
  const initial = value ? new Date(value + 'T12:00:00') : today
  const [month, setMonth] = useState(() => new Date(initial.getFullYear(), initial.getMonth(), 1))
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const calendar = useRef<HTMLDivElement>(null)
  const expanded = open && !disabled
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const start = (new Date(year, monthIndex, 1).getDay() + 6) % 7
  const days = new Date(year, monthIndex + 1, 0).getDate()
  const cells = Array.from({ length: Math.ceil((start + days) / 7) * 7 }, (_, index) => index - start + 1)
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate())
  const withinRange = (key: string) => (!min || key >= min) && (!max || key <= max)
  const display = value ? dateLabel(new Date(value + 'T12:00:00')) : ''

  useEffect(() => {
    if (!expanded) return
    const outside = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false)
    }
    const first = calendar.current?.querySelector<HTMLButtonElement>('.is-selected:not(:disabled)')
      ?? calendar.current?.querySelector<HTMLButtonElement>('.is-today:not(:disabled)')
      ?? calendar.current?.querySelector<HTMLButtonElement>('.v2f-calendar-day:not(:disabled)')
      ?? calendar.current?.querySelector<HTMLButtonElement>('button')
    first?.focus()
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [expanded])

  const close = () => { setOpen(false); trigger.current?.focus() }
  const choose = (key: string) => {
    if (!withinRange(key)) return
    onChange(key)
    close()
  }

  return <div className={'v2f-field' + (value ? ' is-filled' : '')} ref={root}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false) }}
    onKeyDown={event => { if (event.key === 'Escape' && expanded) { event.preventDefault(); event.stopPropagation(); close() } }}>
    <span className="v2f-label" id={uid + '-label'}>{label}</span>
    <div className="v2f-select-wrapper">
      <button type="button" ref={trigger} id={uid + '-trigger'} className="v2f-control v2f-select-trigger"
        disabled={disabled} aria-haspopup="dialog" aria-expanded={expanded} aria-controls={expanded ? uid + '-calendar' : undefined}
        aria-labelledby={uid + '-label ' + uid + '-value'} aria-describedby={uid + '-hint'}
        onClick={() => setOpen(current => !current)}>
        <span id={uid + '-value'} className={value ? '' : 'v2f-select-placeholder'}>{display || 'Vyber datum'}</span>
        <AxoIcon name="calendar" size={19} className="v2f-date-icon" />
      </button>
      {expanded && <div className="v2f-calendar" ref={calendar} id={uid + '-calendar'} role="dialog" aria-labelledby={uid + '-label ' + uid + '-month'}>
        <div className="v2f-calendar-head">
          <button type="button" aria-label="Předchozí měsíc" onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}>‹</button>
          <strong id={uid + '-month'} aria-live="polite">{month.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' })}</strong>
          <button type="button" aria-label="Následující měsíc" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}>›</button>
        </div>
        <div className="v2f-calendar-grid" role="group" aria-labelledby={uid + '-month'}>
          {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map(day => <span className="v2f-calendar-weekday" key={day}>{day}</span>)}
          {cells.map((day, index) => {
            if (day < 1 || day > days) return <span key={index} aria-hidden="true" />
            const key = dateKey(year, monthIndex, day)
            return <button type="button" key={index} className={'v2f-calendar-day' + (key === todayKey ? ' is-today' : '') + (key === value ? ' is-selected' : '')}
              aria-label={dateLabel(new Date(year, monthIndex, day, 12))} aria-pressed={key === value}
              aria-current={key === todayKey ? 'date' : undefined} disabled={!withinRange(key)} onClick={() => choose(key)}>{day}</button>
          })}
        </div>
        <button type="button" className="v2f-calendar-today" onClick={() => { setMonth(new Date(today.getFullYear(), today.getMonth(), 1)); choose(todayKey) }}>Dnes</button>
      </div>}
    </div>
    <span className="v2f-feedback" id={uid + '-hint'}>{disabled ? 'Neaktivní stav' : 'Výběr data v českém kalendáři.'}{(min || max) && <> Rozsah: {min || 'bez minima'} – {max || 'bez maxima'}.</>}</span>
  </div>
}
