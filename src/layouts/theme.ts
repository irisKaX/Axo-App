import type { CSSProperties } from 'react'
import { radiusCssVariables, spacing, layout } from '../design-system/foundations/spacing'
import { semantic, themes, type ThemeName } from '../design-system/foundations/colors'

/** Existing catalog theme mapping, shared without redefining tokens. */
export function themeStyle(theme: ThemeName): CSSProperties {
  const t = themes[theme]
  return {
    ...radiusCssVariables,
    '--axo-gap': layout.gaps.default+'px', '--axo-compact-gap': layout.gaps.compact+'px', '--axo-panel-padding': spacing[5]+'px',
    '--canvas': t.canvas, '--surface': t.surface, '--subtle': t.subtle, '--border': t.border,
    '--text': t.text, '--muted': t.muted, '--brand': t.brand, '--brand-text': t.brandText,
    '--brand-soft': t.brandSoft, '--control-border': t.controlBorder, '--focus-ring': t.focusRing,
    '--action-hover': t.actionHover, '--action-active': t.actionActive, '--action-disabled': t.actionDisabled,
    '--action-disabled-text': t.actionDisabledText, '--accent': t.accent, '--brand-gradient': t.gradient,
    '--backdrop': t.backdrop, '--glow': t.glow, '--corporate': t.corporate,
    '--corporate-text': t.corporateText, '--mascot': t.mascot, '--lilac': t.lilac,
    '--secondary': t.secondary, '--secondary-text': t.secondaryText,
    '--success': semantic[theme].success.foreground, '--warning': semantic[theme].warning.foreground,
    '--info': semantic[theme].info.foreground, '--error': semantic[theme].error.foreground,
  } as CSSProperties
}
