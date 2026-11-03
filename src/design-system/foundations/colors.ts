export const purple = [
  ['50', '#F7F7FF'], ['100', '#EDECFF'], ['200', '#DBD7FF'],
  ['300', '#C3BAFF'], ['400', '#A694FF'], ['500', '#8C66FE'],
  ['600', '#7138E8'], ['700', '#6732D5'], ['800', '#5024A9'],
  ['900', '#391B7A'], ['950', '#210F4C'],
] as const

export const neutral = [
  ['50', '#F8F9FC'], ['100', '#F0F1F6'], ['200', '#DFE1EA'],
  ['300', '#C6C9D6'], ['400', '#9FA3B5'], ['500', '#7F8295'],
  ['600', '#6B6D7D'], ['700', '#444655'], ['800', '#292B38'],
  ['900', '#1D1E2A'], ['950', '#11111A'],
] as const

export const semantic = {
  light: {
    success: { foreground: '#087F5B', background: '#FFFFFF', border: '#087F5B' },
    warning: { foreground: '#9A5800', background: '#FFFFFF', border: '#9A5800' },
    error: { foreground: '#B42338', background: '#FFFFFF', border: '#B42338' },
    info: { foreground: '#2356AC', background: '#FFFFFF', border: '#2356AC' },
  },
  dark: {
    success: { foreground: '#33C999', background: '#1D1E2A', border: '#33C999' },
    warning: { foreground: '#FFCA70', background: '#1D1E2A', border: '#FFCA70' },
    error: { foreground: '#FF8697', background: '#1D1E2A', border: '#FF8697' },
    info: { foreground: '#8DB7FF', background: '#1D1E2A', border: '#8DB7FF' },
  },
} as const

export const interactionStates = ['default', 'hover', 'active', 'focus', 'disabled'] as const
export type InteractionState = (typeof interactionStates)[number]

export const themes = {
  light: {
    canvas: '#F8F9FC',
    surface: '#FFFFFF',
    subtle: '#F0F1F6',
    border: '#DFE1EA',
    controlBorder: '#6B6D7D',
    focusRing: '#7138E8',
    actionHover: '#6732D5',
    actionActive: '#5024A9',
    actionDisabled: '#DFE1EA',
    actionDisabledText: '#6B6D7D',
    text: '#222331',
    muted: '#6B6D7D',
    brand: '#7138E8',
    brandText: '#FFFFFF',
    brandSoft: '#EDECFF',
  },
  dark: {
    canvas: '#11111A',
    surface: '#1D1E2A',
    subtle: '#292B38',
    border: '#444655',
    controlBorder: '#858AA2',
    focusRing: '#C3BAFF',
    actionHover: '#C3BAFF',
    actionActive: '#DBD7FF',
    actionDisabled: '#444655',
    actionDisabledText: '#C6C9D6',
    text: '#F6F6FA',
    muted: '#B5B6C5',
    brand: '#A694FF',
    brandText: '#11111A',
    brandSoft: '#352451',
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
