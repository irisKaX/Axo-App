import { useId, type CSSProperties, type ReactNode } from 'react'
import { WidgetLaunchButton } from '../components/WidgetLaunchButton'
import { ContrastDot } from '../components/TextTreatments'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { density, spacing } from '../design-system/foundations/spacing'
import { typography, toolHeadingStack } from '../design-system/foundations/typography'
import '../components/heading-stack.css'
import './widget-foundation.css'

export type WidgetSize = 'small' | 'large'

export interface WidgetFoundationProps {
  size?: WidgetSize
  /** Active catalog theme; legacy gallery consumers retain the original dark default. */
  theme?: ThemeName
  /** Short uppercase tool identifier after the fixed AXOLOTL / prefix. */
  toolCode: string
  /** Full name of the tool, using the active theme's heading color. */
  title: string
  /** Short purple description, maximum three words. */
  tagline: string
  /** One concise sentence describing the tool's purpose. */
  description: string
  children?: ReactNode
  /** Called when the user requests the full tool; parent owns routing. */
  onOpenTool?: () => void
  launchLabel?: string
  /** Fit the full dashboard grid cell instead of using catalog content minimums. */
  dashboard?: boolean
}

const sizes = {
  // Content baselines follow the existing dashboard's small and large surfaces.
  small: { density: density.compact, heading: typography.h2, contentHeight: 180 },
  large: { density: density.comfortable, heading: typography.h1, contentHeight: 320 },
} as const

export function WidgetFoundation({
  size = 'small',
  theme = 'dark',
  toolCode,
  title,
  tagline,
  description,
  children,
  onOpenTool,
  launchLabel,
  dashboard = false,
}: WidgetFoundationProps) {
  const headingId = useId()
  const normalizedCode = toolCode.trim().toLocaleUpperCase('cs-CZ')
  const normalizedTagline = tagline.trim()
  // Treat the role limits as component contracts; malformed copy is caught in development.
  if (import.meta.env.DEV && (!normalizedCode || normalizedTagline.split(/\s+/).filter(Boolean).length > 3)) {
    console.warn('WidgetFoundation: toolCode is required and tagline should contain at most 3 words.')
  }
  const specification = sizes[size]
  const heading = dashboard ? typography[size === 'large' ? 'h3' : 'h4'] : specification.heading
  const colors = colorTokens.semantic[theme]
  const styles = {
    '--wf-background': colors.surface.default,
    '--wf-surface': colors.surface.canvas,
    // Preserve the exact approved Dark border and white heading.
    '--wf-border': theme === 'dark' ? colorTokens.primitives.neutral[750] : colors.border.default,
    '--heading-stack-text': theme === 'dark' ? colorTokens.primitives.neutral[0] : colors.text.primary,
    '--heading-stack-muted': colors.text.secondary,
    '--heading-stack-accent': colorTokens.primitives.brand.irisPurple,
    '--wf-padding': `${dashboard ? (size === 'large' ? spacing[5] : spacing[4]) : specification.density.padding}px`,
    '--wf-gap': `${dashboard ? spacing[3] : specification.density.gap}px`,
    '--heading-stack-gap': `${toolHeadingStack.gap}px`,
    '--wf-content-height': `${dashboard ? 0 : specification.contentHeight}px`,
    '--heading-stack-heading-size': `${heading.size}px`,
    '--heading-stack-heading-leading': toolHeadingStack.lineHeight,
    '--heading-stack-heading-weight': heading.weight,
    '--heading-stack-heading-tracking': `${heading.tracking}em`,
    '--heading-stack-body-size': `${dashboard ? typography.caption.size : typography.bodySm.size}px`,
    '--heading-stack-body-leading': typography.bodySm.lineHeight,
    '--heading-stack-description-leading': dashboard ? typography.label.lineHeight : typography.bodySm.lineHeight,
    '--heading-stack-eyebrow-size': `${dashboard ? 10 : typography.overline.size}px`,
    '--heading-stack-eyebrow-leading': typography.overline.lineHeight,
    '--heading-stack-eyebrow-weight': typography.overline.weight,
    '--heading-stack-eyebrow-tracking': `${typography.overline.tracking}em`,
  } as CSSProperties

  return (
    <article className={'widget-foundation'+(dashboard?' wf-dashboard':'')} data-size={size} style={styles} aria-labelledby={headingId}>
      <header className="heading-stack">
        <div className="wf-copy-top">
          <p className="heading-stack-eyebrow">AXOLOTL / {normalizedCode}</p>
          <WidgetLaunchButton label={launchLabel ?? `Otevřít nástroj: ${title}`} onClick={() => onOpenTool?.()} disabled={!onOpenTool}/>
        </div>
        <h3 className="heading-stack-title" id={headingId}>
          <ContrastDot tone="neutral">{title}</ContrastDot><span className="heading-stack-accent"><ContrastDot tone="accent">{normalizedTagline}</ContrastDot></span>
        </h3>
        <p className="heading-stack-description">{description}</p>
      </header>
      <div className="wf-content">{children}</div>
    </article>
  )
}
