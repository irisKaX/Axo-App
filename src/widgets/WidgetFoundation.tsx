import { useId, type CSSProperties, type ReactNode } from 'react'
import { WidgetLaunchButton } from '../components/WidgetLaunchButton'
import { ContrastDot } from '../components/TextTreatments'
import { themes } from '../design-system/foundations/colors'
import { density, spacing } from '../design-system/foundations/spacing'
import { typography } from '../design-system/foundations/typography'
import './widget-foundation.css'

export type WidgetSize = 'small' | 'large'

export interface WidgetFoundationProps {
  size?: WidgetSize
  /** Short uppercase tool identifier after the fixed AXOLOTL / prefix. */
  toolCode: string
  /** Full name of the tool, shown in white. */
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
  const styles = {
    '--wf-background': themes.dark.surface,
    '--wf-surface': themes.dark.canvas,
    '--wf-border': themes.dark.border,
    '--wf-text': themes.dark.brandText,
    '--wf-muted': themes.dark.muted,
    '--wf-accent': themes.dark.brand,
    '--wf-padding': `${dashboard ? (size === 'large' ? spacing[5] : spacing[4]) : specification.density.padding}px`,
    '--wf-gap': `${dashboard ? spacing[3] : specification.density.gap}px`,
    '--wf-copy-gap': `${spacing[2]}px`,
    '--wf-content-height': `${dashboard ? 0 : specification.contentHeight}px`,
    '--wf-heading-size': `${heading.size}px`,
    '--wf-heading-leading': heading.lineHeight,
    '--wf-heading-weight': heading.weight,
    '--wf-heading-tracking': `${heading.tracking}em`,
    '--wf-body-size': `${dashboard ? typography.caption.size : typography.bodySm.size}px`,
    '--wf-body-leading': typography.bodySm.lineHeight,
    '--wf-eyebrow-size': `${dashboard ? 10 : typography.overline.size}px`,
    '--wf-eyebrow-leading': typography.overline.lineHeight,
    '--wf-eyebrow-weight': typography.overline.weight,
    '--wf-eyebrow-tracking': `${typography.overline.tracking}em`,
  } as CSSProperties

  return (
    <article className={'widget-foundation'+(dashboard?' wf-dashboard':'')} data-size={size} style={styles} aria-labelledby={headingId}>
      <header className="wf-copy">
        <div className="wf-copy-top">
          <p className="wf-eyebrow">AXOLOTL / {normalizedCode}</p>
          <WidgetLaunchButton label={launchLabel ?? `Otevřít nástroj: ${title}`} onClick={() => onOpenTool?.()} disabled={!onOpenTool}/>
        </div>
        <h3 className="wf-heading" id={headingId}>
          <ContrastDot tone="neutral">{title}</ContrastDot><span className="wf-heading-accent"><ContrastDot tone="accent">{normalizedTagline}</ContrastDot></span>
        </h3>
        <p className="wf-description">{description}</p>
      </header>
      <div className="wf-content">{children}</div>
    </article>
  )
}
