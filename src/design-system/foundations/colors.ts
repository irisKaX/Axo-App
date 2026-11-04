/**
 * Axolotl Colors v2 · Figma-derived electric purple / blue on neutral dark.
 * Single source of truth for brand, palette, effects and theme semantics.
 *
 * Measured from Figma moodboard: node 31:1066 and neighboring color frames.
 * Neutral surfaces and accessibility adaptations are deliberate UI decisions,
 * not colors sampled from the artwork.
 */
export const brandColors = {
  irisPurple: '#7C4BFE',
  electricPurple: '#8101EC',
  royalViolet: '#4B13BF',
  gradientMid: '#642FDF',
  royalBlue: '#3B09C7',
  deepViolet: '#3906B3',
  deepBlue: '#08089A',
  blue: '#0F9FDC',
  brightBlue: '#168EDA',
  lightViolet: '#AF6CFB',
  purpleMagenta: '#A33DBF',
  o2Blue: '#0050FF',
  axolotlPink: '#FF73C8',
  hoodieLilac: '#B99BFF',
  electricViolet: '#A14CFF',
  deepIndigo: '#120B2D',
  aquaSpark: '#4DEFE3',
} as const

/** Approved single product-wide gradient: Blue × Purple (replaces Deep Electric). */
export const bluePurpleGradient = `linear-gradient(130deg, ${brandColors.blue} 0%, ${brandColors.royalBlue} 52%, ${brandColors.electricPurple} 100%)`

/** The exact swatches represented by named frames in the Figma moodboard. */
export const referencePalette = [
  { name: 'Iris Purple', hex: brandColors.irisPurple, role: 'Primary' },
  { name: 'Electric Purple', hex: brandColors.electricPurple, role: 'Gradient' },
  { name: 'Bright Cyan Blue', hex: brandColors.blue, role: 'Secondary' },
  { name: 'Bright Blue', hex: brandColors.brightBlue, role: 'Supporting blue' },
  { name: 'Royal Violet', hex: brandColors.royalViolet, role: 'Gradient' },
  { name: 'Royal Blue', hex: brandColors.royalBlue, role: 'Gradient' },
  { name: 'Deep Violet', hex: brandColors.deepViolet, role: 'Decorative' },
  { name: 'Deep Blue', hex: brandColors.deepBlue, role: 'Decorative' },
  { name: 'Purple Magenta', hex: brandColors.purpleMagenta, role: 'Decorative' },
  { name: 'Light Violet', hex: brandColors.lightViolet, role: 'Highlight' },
  { name: 'Near Black', hex: '#000200', role: 'Reference only' },
] as const

/** Kept for developer tooling, not for primary design decisions. */
export const purple = [
  ['50', '#F6F1FF'], ['100', '#EBE0FF'], ['200', '#D8C5FF'],
  ['300', '#BDA0FF'], ['400', brandColors.lightViolet], ['500', '#9668FF'],
  ['600', brandColors.irisPurple], ['700', '#6837DF'], ['800', brandColors.royalViolet],
  ['900', brandColors.deepViolet], ['950', '#230A69'],
] as const

/** True neutral surfaces; no violet undertone in the dark ramp. */
export const neutral = [
  ['50', '#FAFBFD'], ['100', '#F5F7FA'], ['200', '#E5E9F0'],
  ['300', '#C7CEDA'], ['400', '#A8B1C4'], ['500', '#808A9B'],
  ['600', '#606B7C'], ['700', '#3B4452'], ['800', '#222832'],
  ['900', '#141820'], ['950', '#090B10'],
] as const

export const colorRoles = [
  { id: 'primary', name: 'Iris Purple', token: 'brand.irisPurple', color: brandColors.irisPurple, usage: 'Primární akce a aktivní stav' },
  { id: 'secondary', name: 'Bright Cyan Blue', token: 'brand.blue', color: brandColors.blue, usage: 'Druhý brandový akcent a vizuální plochy' },
  { id: 'o2', name: 'O2 Blue', token: 'brand.o2Blue', color: brandColors.o2Blue, usage: 'Pouze identita a integrace O2' },
  { id: 'neutral', name: 'True Dark', token: 'surface.canvas', color: '#090B10', usage: 'Neutrální pracovní prostředí' },
] as const

export const semantic = {
  light: {
    success: { foreground: '#9EF01A', background: '#FFFFFF', border: '#9EF01A' },
    warning: { foreground: '#F6DE26', background: '#FFFFFF', border: '#F6DE26' },
    error: { foreground: '#FF0A54', background: '#FFFFFF', border: '#FF0A54' },
    info: { foreground: '#4CC9F0', background: '#FFFFFF', border: '#4CC9F0' },
  },
  dark: {
    success: { foreground: '#9EF01A', background: '#171B24', border: '#9EF01A' },
    warning: { foreground: '#F6DE26', background: '#171B24', border: '#F6DE26' },
    error: { foreground: '#FF0A54', background: '#171B24', border: '#FF0A54' },
    info: { foreground: '#4CC9F0', background: '#171B24', border: '#4CC9F0' },
  },
} as const

export const interactionStates = ['default', 'hover', 'active', 'focus', 'disabled'] as const
export type InteractionState = (typeof interactionStates)[number]

/**
 * Exact Figma background/text pairs, filtered for visual readability.
 * "standard" requires WCAG AA 4.5:1 for normal text.
 * "large" requires >= 3:1 and is restricted to >= 24px regular
 * or >= 18.66px bold text. These are not approved body-text pairs.
 */
export const readableColorCombinations = [
  { frame: 15, background: '#168EDA', foreground: '#000200', use: 'standard' },
  { frame: 17, background: '#8101EC', foreground: '#DDEAF2', use: 'standard' },
  { frame: 18, background: '#4B13BF', foreground: '#DDEAF2', use: 'standard' },
  { frame: 13, background: '#7C4BFE', foreground: '#0F0F0F', use: 'large' },
  { frame: 16, background: '#7C4BFE', foreground: '#DDEAF2', use: 'large' },
  { frame: 20, background: '#4B13BF', foreground: '#0F9FDC', use: 'large' },
] as const

export const themes = {
  light: {
    canvas: '#F5F7FA',
    surface: '#FFFFFF',
    subtle: '#EAF0F7',
    border: '#CCD4E0',
    controlBorder: '#6A7586',
    focusRing: brandColors.irisPurple,
    actionHover: '#6837DF',
    actionActive: '#5526BD',
    actionDisabled: '#DDE3EC',
    actionDisabledText: '#626E80',
    text: '#17202E',
    muted: '#586576',
    brand: brandColors.irisPurple,
    brandText: '#FFFFFF',
    brandSoft: '#EDE5FF',
    accent: '#087AAB',
    secondary: brandColors.blue,
    secondaryText: '#061824',
    corporate: brandColors.o2Blue,
    corporateText: '#FFFFFF',
    mascot: brandColors.axolotlPink,
    lilac: brandColors.hoodieLilac,
    gradient: bluePurpleGradient,
    backdrop: 'radial-gradient(ellipse at 85% 5%, #B5A5FF55 0%, transparent 46%), radial-gradient(ellipse at 8% 100%, #0F9FDC28 0%, transparent 48%), #F5F7FA',
    glow: '#7C4BFE32',
  },
  dark: {
    canvas: '#090B10',
    surface: '#141820',
    subtle: '#222832',
    border: '#303846',
    controlBorder: '#768293',
    focusRing: '#BDA0FF',
    actionHover: '#8B5FFF',
    actionActive: '#6837DF',
    actionDisabled: '#303846',
    actionDisabledText: '#CBD3E0',
    text: '#F5F7FF',
    muted: '#B4BECE',
    brand: brandColors.irisPurple,
    brandText: '#FFFFFF',
    brandSoft: '#222832',
    accent: '#58C7F6',
    secondary: brandColors.blue,
    secondaryText: '#061824',
    corporate: brandColors.o2Blue,
    corporateText: '#FFFFFF',
    mascot: brandColors.axolotlPink,
    lilac: brandColors.hoodieLilac,
    gradient: bluePurpleGradient,
    backdrop: 'radial-gradient(ellipse at 85% 10%, #0F9FDC22 0%, transparent 42%), radial-gradient(ellipse at 10% 100%, #7C4BFE20 0%, transparent 46%), #090B10',
    glow: '#7C4BFE45',
  },
} as const

export type ThemeName = keyof typeof themes

function luminance(hex: string) {
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

export function contrastRatio(a: string, b: string) {
  const x = luminance(a), y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
