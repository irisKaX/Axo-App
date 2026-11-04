import { brandColors, bluePurpleGradient } from './colors'

/** Approved Blue × Purple gradient, shared with both UI themes and all components. */
export const bluePurple = {
  id: 'blue-purple',
  name: 'Blue × Purple',
  stops: [brandColors.blue, brandColors.royalBlue, brandColors.electricPurple],
  positions: [0, 52, 100],
  css: bluePurpleGradient,
} as const

export const approvedBrandSurfaces = {
  brightBlue: brandColors.brightBlue,
  darkCanvas: '#090B10',
} as const

export const brandExpressionAssets = {
  whiteHead: import.meta.env.BASE_URL + 'brand/axolotl-head-white-figma.png',
  source: 'Figma · Axolotl mood · white head image layer 37:1136',
} as const
