import type { ReactNode } from 'react'
import { textTreatments } from '../design-system/foundations/text-treatments'
import './text-treatments.css'

/** Semantic, reusable treatments. Inherit typography and surface color from context. */
export function AccentDot({ children, as: Tag = 'span' }: { children: ReactNode; as?: 'span' | 'h1' | 'h2' | 'h3' }) {
  return <Tag className="tt-accent-dot">{children}<span className="tt-accent" aria-hidden="true">{textTreatments.accentDot.punctuation}</span></Tag>
}

export function AccentWord({ before, accent, as: Tag = 'span' }: { before: ReactNode; accent: ReactNode; as?: 'span' | 'h1' | 'h2' | 'h3' }) {
  return <Tag className="tt-accent-word">{before}<span className="tt-accent">{accent}</span></Tag>
}

export function EyebrowHeading({ eyebrow, children, as: Tag = 'h3' }: { eyebrow: string; children: ReactNode; as?: 'h1' | 'h2' | 'h3' }) {
  return <div className="tt-eyebrow-stack">
    <span className="tt-eyebrow">{eyebrow}</span>
    <AccentDot as={Tag}>{children}</AccentDot>
  </div>
}
