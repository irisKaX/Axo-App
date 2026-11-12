// V2 port of the original catalog MultiSelect: filter remaining options and remove chips.
import { useEffect, useId, useRef, useState } from 'react'
import { AxoIcon } from '../../components/AxoIcon'
import type { SelectOption } from './FormControlsV2'

interface MultiSelectProps {
  label: string
  options: SelectOption[]
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  disabled?: boolean
}

export default function MultiSelectV2({ label, options, value, onChange, placeholder = 'Vyber položky', disabled = false }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const uid = useId()
  const wrapper = useRef<HTMLDivElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const available = options.filter(option => !option.disabled && !value.includes(option.value) && option.label.toLocaleLowerCase('cs').includes(query.toLocaleLowerCase('cs')))
  const expanded = open && !disabled
  const activeIndex = Math.min(active, available.length - 1)

  useEffect(() => {
    if (!expanded) return
    const close = (event: PointerEvent) => {
      if (wrapper.current && !wrapper.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [expanded])

  useEffect(() => {
    if (expanded && activeIndex >= 0) menu.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [expanded, activeIndex, query, value])

  const add = (id: string) => {
    if (!value.includes(id)) onChange([...value, id])
    setQuery('')
    setActive(0)
    search.current?.focus()
  }
  const remove = (id: string) => {
    onChange(value.filter(item => item !== id))
    search.current?.focus()
  }

  return <div className={'v2f-field' + (value.length ? ' is-filled' : '') + (disabled ? ' is-disabled' : '')} ref={wrapper}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false) }}>
    <label htmlFor={uid}>{label}</label>
    <div className="v2f-select-wrapper">
      <div className="v2f-multi-control" aria-disabled={disabled} onClick={() => { if (!disabled) { search.current?.focus(); setOpen(true) } }}>
        {value.map(id => {
          const option = options.find(item => item.value === id)
          return option ? <span className="v2f-multi-chip" key={id}><span>{option.label}</span>
            <button type="button" aria-label={'Odebrat ' + option.label} disabled={disabled}
              onClick={event => { event.stopPropagation(); remove(id) }}><AxoIcon name="close" size={13} /></button>
          </span> : null
        })}
        <input ref={search} id={uid} role="combobox" disabled={disabled} value={query} autoComplete="off"
          placeholder={value.length ? '' : placeholder} aria-expanded={expanded} aria-autocomplete="list"
          aria-controls={expanded ? uid + '-list' : undefined} aria-describedby={uid + '-hint'}
          aria-activedescendant={expanded && activeIndex >= 0 ? uid + '-option-' + available[activeIndex].value : undefined}
          onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setActive(0); setOpen(true) }}
          onKeyDown={event => {
            if (event.nativeEvent.isComposing) return
            if (event.key === 'Escape') { event.preventDefault(); setOpen(false) }
            else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              setOpen(true)
              setActive(expanded ? Math.max(0, Math.min(available.length - 1, activeIndex + (event.key === 'ArrowDown' ? 1 : -1))) : event.key === 'ArrowDown' ? 0 : Math.max(0, available.length - 1))
            } else if (event.key === 'Enter') {
              event.preventDefault()
              if (expanded && activeIndex >= 0) add(available[activeIndex].value)
              else setOpen(true)
            } else if (event.key === 'Backspace' && !query && value.length) {
              event.preventDefault()
              remove(value[value.length - 1])
            }
          }} />
        <button type="button" className="v2f-multi-toggle" tabIndex={-1} disabled={disabled}
          aria-label={expanded ? 'Zavřít nabídku' : 'Otevřít nabídku'} aria-expanded={expanded}
          onMouseDown={event => event.preventDefault()}
          onClick={event => { event.stopPropagation(); if (expanded) setOpen(false); else { search.current?.focus(); setOpen(true) } }}>
          <AxoIcon name="chevron-down" size={18} className={'v2f-select-chevron' + (expanded ? ' is-open' : '')} />
        </button>
      </div>
      {expanded && <div className="v2f-select-menu" ref={menu} id={uid + '-list'} role="listbox" aria-label={label} aria-multiselectable="true">
        {available.length ? available.map((option, index) => <button type="button" role="option" aria-selected={false}
          id={uid + '-option-' + option.value} key={option.value} tabIndex={-1}
          className={'v2f-multi-option' + (index === activeIndex ? ' is-active' : '')}
          onMouseEnter={() => setActive(index)} onMouseDown={event => event.preventDefault()} onClick={() => add(option.value)}>
          <span>{option.label}</span><AxoIcon name="plus" size={15} />
        </button>) : <span className="v2f-multi-empty" role="status">Žádné další položky</span>}
      </div>}
    </div>
    <span id={uid + '-hint'} className="v2f-feedback">Vyber více položek. Backspace odstraní poslední štítek.</span>
  </div>
}
