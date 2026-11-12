import type { CSSProperties } from 'react'
import { ContrastDot } from '../components/TextTreatments'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { fontFamilies, toolHeadingStack, typography } from '../design-system/foundations/typography'
import '../components/heading-stack.css'

interface HeadingStackProps {
  eyebrow: string
  primary: string
  accent: string
  description: string
  theme: ThemeName
  size?: 'standard' | 'compact'
}

export default function HeadingStackV2({ eyebrow, primary, accent, description, theme, size = 'standard' }: HeadingStackProps) {
  // Match the large/small dashboard headings without importing the widget container.
  const heading = typography[size === 'compact' ? 'h4' : 'h3']
  const variables = {
    '--heading-stack-font': fontFamilies.ui,
    '--heading-stack-body-weight': typography.caption.weight,
    '--heading-stack-text': theme === 'dark' ? colorTokens.primitives.neutral[0] : colorTokens.semantic[theme].text.primary,
    '--heading-stack-muted': colorTokens.semantic[theme].text.secondary,
    '--heading-stack-accent': colorTokens.primitives.brand.irisPurple,
    '--heading-stack-gap': toolHeadingStack.gap + 'px',
    '--heading-stack-heading-size': heading.size + 'px',
    '--heading-stack-heading-leading': toolHeadingStack.lineHeight,
    '--heading-stack-heading-weight': heading.weight,
    '--heading-stack-heading-tracking': heading.tracking + 'em',
    '--heading-stack-body-size': typography.caption.size + 'px',
    '--heading-stack-body-leading': typography.label.lineHeight,
    '--heading-stack-description-leading': typography.label.lineHeight,
    // WidgetFoundation's dashboard mode uses a 10px overline in both sizes.
    '--heading-stack-eyebrow-size': '10px',
    '--heading-stack-eyebrow-leading': typography.overline.lineHeight,
    '--heading-stack-eyebrow-weight': typography.overline.weight,
    '--heading-stack-eyebrow-tracking': typography.overline.tracking + 'em',
  } as CSSProperties

  return <header className="heading-stack" style={variables}>
    <p className="heading-stack-eyebrow">{eyebrow.trim().toLocaleUpperCase('cs-CZ')}</p>
    <h3 className="heading-stack-title"><ContrastDot tone="neutral">{primary}</ContrastDot><span className="heading-stack-accent"><ContrastDot tone="accent">{accent}</ContrastDot></span></h3>
    <p className="heading-stack-description">{description}</p>
  </header>
}
