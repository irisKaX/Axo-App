/**
 * Axolotl spatial foundations.
 * 4px base rhythm, optical spacing for text and rounded Neo Iris geometry.
 * Values are implementation decisions for the design-system catalog.
 */
export const spacing = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24,
  8: 32, 10: 40, 12: 48, 16: 64, 20: 80, 24: 96,
} as const

export const radius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  xxl: 40,
  pill: 9999,
  round: '50%',
} as const

export const controls = {
  compact: { height: 36, horizontalPadding: 14, fontSize: 12 },
  default: { height: 44, horizontalPadding: 20, fontSize: 13 },
  comfortable: { height: 52, horizontalPadding: 24, fontSize: 14 },
  iconCompact: 36,
  iconDefault: 44,
  iconComfortable: 52,
  minTouchTarget: 44,
} as const

export const layout = {
  contentMax: 1440,
  sidebar: 245,
  desktopColumns: 12,
  tabletColumns: 8,
  mobileColumns: 4,
  gaps: { compact: 12, default: 16, spacious: 24 },
  breakpoints: { mobile: 600, desktop: 1200 },
} as const

export const density = {
  compact: { gap: spacing[3], padding: spacing[4] },
  comfortable: { gap: spacing[6], padding: spacing[8] },
} as const
