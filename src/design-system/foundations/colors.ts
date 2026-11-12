/**
 * Axolotl Colors v2 · Figma-derived electric purple / blue on neutral dark.
 * Authoritative colorTokens: primitives → semantic roles → interactions/effects.
 * Existing exports remain compatibility views until each preview is migrated.
 * No CSS is emitted here; defining tokens alone never recolors the catalog.
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
  sunshineYellow: '#FFF449',
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
  { name: 'Sunshine Yellow', hex: brandColors.sunshineYellow, role: 'Theme icon accent' },
  { name: 'Near Black', hex: '#000200', role: 'Reference only' },
] as const

/** Kept for developer tooling, not for primary design decisions. */
export const purple = [
  ['50', '#F6F1FF'], ['100', '#EBE0FF'], ['200', '#D8C5FF'],
  ['300', '#BDA0FF'], ['400', brandColors.lightViolet], ['500', '#9668FF'],
  ['600', brandColors.irisPurple], ['700', '#6837DF'], ['800', brandColors.royalViolet],
  ['900', brandColors.deepViolet], ['950', '#230A69'],
] as const

/**
 * APPROVED APPLICATION BACKGROUND RULE
 * In Dark Mode, theme.dark.canvas (#090B10) is the main background of
 * application screens, workspaces and the dashboard.
 * Use the semantic --canvas / themes[theme].canvas token, never a local HEX.
 * theme.dark.surface (#141820) is for widgets and raised content panels.
 * theme.dark.backdrop is decorative only, not the default page background.
 * Light Mode continues to use theme.light.canvas.
 */
/**
 * Neutral primitives. Intermediate keys extend the original ramp without changing
 * its existing steps. Includes historical shades still needed by legacy consumers.
 */
export const neutralPrimitives = {
  0: '#FFFFFF',
  50: '#FAFBFD',
  100: '#F5F7FA',
  125: '#F1F4F8',
  150: '#EDF1F6',
  160: '#EAF0F7',
  175: '#E5EBF2',
  200: '#E5E9F0',
  220: '#DDE3EC',
  225: '#D8E2EC',
  275: '#CCD4E0',
  300: '#C7CEDA',
  325: '#B9C5D3',
  400: '#A8B1C4',
  500: '#808A9B',
  600: '#606B7C',
  675: '#3D495B',
  700: '#3B4452',
  725: '#364253',
  750: '#303846',
  775: '#2B3442',
  800: '#222832',
  825: '#212833',
  875: '#1B212B',
  890: '#171B24',
  900: '#141820',
  950: '#090B10',
} as const

/** Compatibility swatches: preserve the original order, labels and values. */
export const neutral = [
  ['50', neutralPrimitives[50]], ['100', neutralPrimitives[100]], ['200', neutralPrimitives[200]],
  ['300', neutralPrimitives[300]], ['400', neutralPrimitives[400]], ['500', neutralPrimitives[500]],
  ['600', neutralPrimitives[600]], ['700', neutralPrimitives[700]], ['800', neutralPrimitives[800]],
  ['900', neutralPrimitives[900]], ['950', neutralPrimitives[950]],
] as const

export const colorRoles = [
  { id: 'primary', name: 'Iris Purple', token: 'brand.irisPurple', color: brandColors.irisPurple, usage: 'Primární akce a aktivní stav' },
  { id: 'secondary', name: 'Bright Cyan Blue', token: 'brand.blue', color: brandColors.blue, usage: 'Druhý brandový akcent a vizuální plochy' },
  { id: 'o2', name: 'O2 Blue', token: 'brand.o2Blue', color: brandColors.o2Blue, usage: 'Pouze identita a integrace O2' },
  { id: 'neutral', name: 'True Dark', token: 'theme.dark.canvas', color: neutralPrimitives[950], usage: 'Schválené hlavní pozadí aplikace v Dark Mode; plochy widgetů používají Surface' },
] as const

const statusPrimitives = {
  success: '#9EF01A',
  warning: '#F6DE26',
  error: '#FF0A54',
  info: '#4CC9F0',
} as const

const statusTokens = {
  light: {
    success: { foreground: statusPrimitives.success, background: neutralPrimitives[0], border: statusPrimitives.success },
    warning: { foreground: statusPrimitives.warning, background: neutralPrimitives[0], border: statusPrimitives.warning },
    error: { foreground: statusPrimitives.error, background: neutralPrimitives[0], border: statusPrimitives.error },
    info: { foreground: statusPrimitives.info, background: neutralPrimitives[0], border: statusPrimitives.info },
  },
  dark: {
    success: { foreground: statusPrimitives.success, background: neutralPrimitives[890], border: statusPrimitives.success },
    warning: { foreground: statusPrimitives.warning, background: neutralPrimitives[890], border: statusPrimitives.warning },
    error: { foreground: statusPrimitives.error, background: neutralPrimitives[890], border: statusPrimitives.error },
    info: { foreground: statusPrimitives.info, background: neutralPrimitives[890], border: statusPrimitives.info },
  },
} as const

/** Historical name for status colors only; same object as colorTokens.status. */
export const semantic = statusTokens

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

const textTokens = {
  light: {
    primary: '#17202E',
    secondary: '#586576',
    disabled: '#626E80',
    onBrand: neutralPrimitives[0],
    onSecondary: '#061824',
    accent: '#087AAB',
  },
  dark: {
    primary: '#F5F7FF',
    secondary: '#B4BECE',
    disabled: '#CBD3E0',
    onBrand: neutralPrimitives[0],
    onSecondary: '#061824',
    accent: '#58C7F6',
  },
} as const

const fieldTokens = {
  light: {
    background: neutralPrimitives[0],
    border: '#6A7586',
    hover: { background: neutralPrimitives[125], border: purple[7][1] },
    focus: { background: neutralPrimitives[125], border: purple[7][1] },
    filled: { background: neutralPrimitives[0] },
    disabled: { background: neutralPrimitives[125] },
  },
  dark: {
    background: neutralPrimitives[900],
    border: '#768293',
    hover: { background: neutralPrimitives[950], border: brandColors.irisPurple },
    focus: { background: neutralPrimitives[950], border: brandColors.irisPurple },
    filled: { background: neutralPrimitives[900] },
    disabled: { background: neutralPrimitives[875] },
  },
} as const

const semanticTokens = {
  light: {
    surface: { canvas: neutralPrimitives[100], default: neutralPrimitives[0], subtle: neutralPrimitives[125], raised: neutralPrimitives[150] },
    border: { default: neutralPrimitives[325], control: fieldTokens.light.border, focus: brandColors.irisPurple, accent: brandColors.irisPurple },
    field: fieldTokens.light,
    text: textTokens.light,
    icon: { default: textTokens.light.primary, muted: textTokens.light.secondary, disabled: textTokens.light.disabled, accent: textTokens.light.accent },
  },
  dark: {
    surface: { canvas: neutralPrimitives[950], default: neutralPrimitives[900], subtle: neutralPrimitives[875], raised: neutralPrimitives[825] },
    border: { default: neutralPrimitives[675], control: fieldTokens.dark.border, focus: purple[3][1], accent: brandColors.irisPurple },
    field: fieldTokens.dark,
    text: textTokens.dark,
    icon: { default: textTokens.dark.primary, muted: textTokens.dark.secondary, disabled: textTokens.dark.disabled, accent: textTokens.dark.accent },
  },
} as const

const interactionTokens = {
  // Outline uses the same approved darker hover border in both themes.
  outline: { hoverBorder: purple[7][1] },
  light: {
    default: { background: semanticTokens.light.surface.default, border: semanticTokens.light.border.default },
    hover: { background: neutralPrimitives[175], border: semanticTokens.light.border.default },
    pressed: { background: neutralPrimitives[225], border: semanticTokens.light.border.default },
    focus: { ring: semanticTokens.light.border.focus },
    selected: { background: semanticTokens.light.surface.raised, indicator: semanticTokens.light.border.accent },
    disabled: { background: neutralPrimitives[220], text: textTokens.light.disabled, icon: semanticTokens.light.icon.disabled },
    // Brand actions are exceptions to ordinary neutral hover/pressed surfaces.
    brand: { default: brandColors.irisPurple, hover: purple[7][1], pressed: '#5526BD' },
  },
  dark: {
    default: { background: semanticTokens.dark.surface.default, border: semanticTokens.dark.border.default },
    hover: { background: neutralPrimitives[775], border: semanticTokens.dark.border.default },
    pressed: { background: neutralPrimitives[725], border: semanticTokens.dark.border.default },
    focus: { ring: semanticTokens.dark.border.focus },
    selected: { background: semanticTokens.dark.surface.raised, indicator: semanticTokens.dark.border.accent },
    disabled: { background: neutralPrimitives[750], text: textTokens.dark.disabled, icon: semanticTokens.dark.icon.disabled },
    brand: { default: brandColors.irisPurple, hover: '#8B5FFF', pressed: purple[7][1] },
  },
} as const

const effectTokens = {
  light: {
    gradient: bluePurpleGradient,
    backdrop: `radial-gradient(ellipse at 85% 5%, #B5A5FF55 0%, transparent 46%), radial-gradient(ellipse at 8% 100%, ${brandColors.blue}28 0%, transparent 48%), ${semanticTokens.light.surface.canvas}`,
    glow: `${brandColors.irisPurple}32`,
    shadow: '#24304415',
  },
  dark: {
    gradient: bluePurpleGradient,
    backdrop: `radial-gradient(ellipse at 85% 10%, ${brandColors.blue}22 0%, transparent 42%), radial-gradient(ellipse at 10% 100%, ${brandColors.irisPurple}20 0%, transparent 46%), ${semanticTokens.dark.surface.canvas}`,
    glow: `${brandColors.irisPurple}45`,
    shadow: '#00000038',
  },
  // Color layer only. The existing orbital animation and gradient reversal stay in their components.
  orbitalGlow: `conic-gradient(from 0deg, transparent 0deg, transparent 240deg, ${brandColors.brightBlue}80 278deg, ${statusPrimitives.info}B3 304deg, #D2B4FF 320deg, transparent 340deg)`,
} as const

/**
 * The single public token tree for future, explicitly requested migrations.
 * Semantic roles reference primitives; icon roles reference the matching text role.
 * Retained values without a new approved replacement keep their previous color.
 */
export const colorTokens = {
  primitives: { brand: brandColors, neutral: neutralPrimitives, status: statusPrimitives },
  semantic: semanticTokens,
  interaction: interactionTokens,
  status: statusTokens,
  effects: effectTokens,
} as const

export type ThemeName = keyof typeof colorTokens.semantic

/**
 * Compatibility values only: these three roles differ from the approved new roles.
 * Do not use them for new designs or alias them to new colors before migration.
 * Remove each entry only after all of its existing consumers have been migrated.
 */
const legacyThemeValues = {
  light: { subtle: neutralPrimitives[160], border: neutralPrimitives[275], brandSoft: '#EDE5FF' },
  dark: { subtle: neutralPrimitives[800], border: neutralPrimitives[750], brandSoft: neutralPrimitives[800] },
} as const

/** Historical flat API. Same keys and rendered values; not a second token system. */
function legacyTheme(mode: ThemeName) {
  const roles = colorTokens.semantic[mode]
  const states = colorTokens.interaction[mode]
  const effects = colorTokens.effects[mode]
  return {
    canvas: roles.surface.canvas,
    surface: roles.surface.default,
    subtle: legacyThemeValues[mode].subtle,
    border: legacyThemeValues[mode].border,
    controlBorder: roles.border.control,
    focusRing: states.focus.ring,
    actionHover: states.brand.hover,
    actionActive: states.brand.pressed,
    actionDisabled: states.disabled.background,
    actionDisabledText: roles.text.disabled,
    text: roles.text.primary,
    muted: roles.text.secondary,
    brand: brandColors.irisPurple,
    brandText: roles.text.onBrand,
    brandSoft: legacyThemeValues[mode].brandSoft,
    accent: roles.text.accent,
    secondary: brandColors.blue,
    secondaryText: roles.text.onSecondary,
    corporate: brandColors.o2Blue,
    corporateText: roles.text.onBrand,
    mascot: brandColors.axolotlPink,
    lilac: brandColors.hoodieLilac,
    gradient: effects.gradient,
    backdrop: effects.backdrop,
    glow: effects.glow,
  } as const
}

export const themes = { light: legacyTheme('light'), dark: legacyTheme('dark') } as const

function luminance(hex: string) {
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

export function contrastRatio(a: string, b: string) {
  const x = luminance(a), y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
