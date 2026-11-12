import { useEffect, useState } from 'react'
import { AxoIcon } from '../../components/AxoIcon'

const placeholder = 'Hledat v Axolotl...'
const phrases = [placeholder, 'Najít nástroj nebo poznámku...', 'Co dnes potřebujete najít?']

export default function SearchSpotlightV2() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [typing, setTyping] = useState({ index: 0, length: 0, deleting: false })
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const animateHint = !focused && value.length === 0 && !reducedMotion

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!animateHint) return
    const phrase = phrases[typing.index]
    const delay = !typing.deleting && typing.length === phrase.length ? 1800
      : typing.deleting && typing.length === 0 ? 550
      : typing.deleting ? 45 : 95
    const timer = window.setTimeout(() => {
      if (!typing.deleting && typing.length === phrase.length) {
        setTyping({ ...typing, deleting: true })
      } else if (typing.deleting && typing.length === 0) {
        setTyping({ index: (typing.index + 1) % phrases.length, length: 0, deleting: false })
      } else {
        setTyping({ ...typing, length: typing.length + (typing.deleting ? -1 : 1) })
      }
    }, delay)
    return () => window.clearTimeout(timer)
  }, [animateHint, typing])

  return <div className="v2f-spotlight-stage">
    <div className="v2f-spotlight">
      <AxoIcon name="search" size={20} className="v2f-spotlight-icon" />
      <input type="search" aria-label="Hledat v Axolotl" aria-describedby="v2f-spotlight-note"
        autoComplete="off" spellCheck={false} value={value}
        placeholder={animateHint ? phrases[typing.index].slice(0, typing.length) || ' ' : placeholder}
        onChange={event => setValue(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      <kbd className="v2f-spotlight-shortcut" aria-hidden="true">⌘ <span>K</span></kbd>
    </div>
    <p id="v2f-spotlight-note" className="v2f-spotlight-note">Klikni do pole a napiš vlastní text. Po opuštění prázdného pole se ukázkové psaní obnoví. ⌘ K je pouze vizuální označení.</p>
  </div>
}
