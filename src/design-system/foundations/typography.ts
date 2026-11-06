/**
 * Axo-App typography foundations.
 * All product typography derives from these named roles.
 * Poppins is the primary UI family; monospace is only for code and technical IDs.
 */
export const fontFamilies = {
  ui: "'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  code: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const

/**
 * Shared vertical rhythm for widget and full tool-page heading stacks.
 * Eyebrow → paired heading: 8px; between heading lines: 0px;
 * paired heading → description: 8px. Each line uses 1.24 leading.
 * Keep font size independent from these spacing rules.
 */
export const toolHeadingStack = {
  gap: 8,
  pairedLineGap: 0,
  lineHeight: 1.24,
} as const

export const fontWeights = [
  {name: 'Regular', value: 400},
  {name: 'Medium', value: 500},
  {name: 'SemiBold', value: 600},
  {name: 'Bold', value: 700},
] as const

export const typography = {
  display: { size: 48, lineHeight: 1.12, weight: 700, tracking: -0.035 },
  h1: { size: 36, lineHeight: 1.2, weight: 600, tracking: -0.025 },
  h2: { size: 28, lineHeight: 1.28, weight: 600, tracking: -0.02 },
  h3: { size: 22, lineHeight: 1.35, weight: 600, tracking: -0.015 },
  h4: { size: 18, lineHeight: 1.4, weight: 600, tracking: -0.01 },
  bodyLg: { size: 16, lineHeight: 1.65, weight: 400, tracking: 0 },
  body: { size: 14, lineHeight: 1.65, weight: 400, tracking: 0 },
  bodySm: { size: 13, lineHeight: 1.6, weight: 400, tracking: 0 },
  label: { size: 13, lineHeight: 1.45, weight: 500, tracking: 0 },
  button: { size: 13, lineHeight: 1.45, weight: 600, tracking: 0 },
  caption: { size: 12, lineHeight: 1.5, weight: 400, tracking: 0.005 },
  overline: { size: 12, lineHeight: 1.4, weight: 600, tracking: 0.075 },
} as const

export type TypographyRole = keyof typeof typography

export const typographySamples: Record<TypographyRole, string> = {
  display: 'Tvoř. Objevuj. Zjednodušuj.',
  h1: 'Vítej v Axolotlu',
  h2: 'Všechny nástroje na jednom místě',
  h3: 'Pracovní prostředí',
  h4: 'Find Phrase',
  bodyLg: 'Prostor, ve kterém se nápady mění v hotovou práci.',
  body: 'Analyzuj metadata, vytvářej QR kódy a organizuj projekty bez zbytečného přepínání.',
  bodySm: 'Poslední změny byly uloženy do pracovního prostoru.',
  label: 'URL adresa stránky',
  button: 'Analyzovat stránku',
  caption: 'Aktualizováno dnes v 15:42',
  overline: 'AXOLOTL · WORKSPACE',
}
