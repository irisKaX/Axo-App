/**
 * Axo-App · Neo Iris color foundations.
 *
 * This module is the single source of truth for approved candidate colors.
 * UI styles consume semantic custom properties supplied by App.tsx.
 * Alternate Visual Directions remain isolated experiments.
 */
export const purple = [
  ['50', '#F7F7FF'], ['100', '#EDECFF'], ['200', '#DBD7FF'],
  ['300', '#C3BAFF'], ['400', '#A694FF'], ['500', '#8C66FE'],
  ['600', '#7138E8'], ['700', '#6732D5'], ['800', '#5024A9'],
  ['900', '#391B7A'], ['950', '#210F4C'],
] as const

export const neutral = [
  ['50', '#FBFAFF'], ['100', '#F5F2FF'], ['200', '#E9E3F3'],
  ['300', '#C9B7EB'], ['400', '#A99BC8'], ['500', '#8771B2'],
  ['600', '#605572'], ['700', '#50446E'], ['800', '#29243E'],
  ['900', '#1B1731'], ['950', '#0E0C1A'],
] as const

export const semantic = {
  light: {
    success: { foreground: '#087F5B', background: '#FFFFFF', border: '#087F5B' },
    warning: { foreground: '#925100', background: '#FFFFFF', border: '#925100' },
    error: { foreground: '#B42338', background: '#FFFFFF', border: '#B42338' },
    info: { foreground: '#2356AC', background: '#FFFFFF', border: '#2356AC' },
  },
  dark: {
    success: { foreground: '#50E2B3', background: '#1B1731', border: '#50E2B3' },
    warning: { foreground: '#FFCA70', background: '#1B1731', border: '#FFCA70' },
    error: { foreground: '#FF94A5', background: '#1B1731', border: '#FF94A5' },
    info: { foreground: '#93C0FF', background: '#1B1731', border: '#93C0FF' },
  },
} as const

export const interactionStates = ['default', 'hover', 'active', 'focus', 'disabled'] as const
export type InteractionState = (typeof interactionStates)[number]

export const themes = {
  light: {
    canvas: '#F5F2FF',
    surface: '#FFFFFF',
    subtle: '#EDE7FF',
    border: '#C9B7EB',
    controlBorder: '#8771B2',
    focusRing: '#7138E8',
    actionHover: '#6732D5',
    actionActive: '#5024A9',
    actionDisabled: '#E9E3F3',
    actionDisabledText: '#605572',
    text: '#211937',
    muted: '#605572',
    brand: '#7138E8',
    brandText: '#FFFFFF',
    brandSoft: '#EDE7FF',
    accent: '#007C88',
    gradient: 'linear-gradient(110deg, #7138E8, #813BDF)',
    backdrop: 'radial-gradient(ellipse at 95% 0%, #AA77FF72, transparent 46%), radial-gradient(ellipse at 0% 100%, #13DDE342, transparent 46%), #F5F2FF',
    glow: '#7138E840',
  },
  dark: {
    canvas: '#0E0C1A',
    surface: '#1B1731',
    subtle: '#29243E',
    border: '#50446E',
    controlBorder: '#A99BC8',
    focusRing: '#C3BAFF',
    actionHover: '#C3BAFF',
    actionActive: '#DBD7FF',
    actionDisabled: '#50446E',
    actionDisabledText: '#D0C8E0',
    text: '#FBF9FF',
    muted: '#C2B6DC',
    brand: '#A694FF',
    brandText: '#151022',
    brandSoft: '#352451',
    accent: '#50EEE4',
    gradient: 'linear-gradient(110deg, #7138E8, #9155FF)',
    backdrop: 'radial-gradient(ellipse at 100% 0%, #48258977, transparent 50%), #0E0C1A',
    glow: '#9155FF55',
  },
} as const

export type ThemeName = keyof typeof themes

function luminance(hex: string) {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

export function contrastRatio(a: string, b: string) {
  const x = luminance(a), y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
