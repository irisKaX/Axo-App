import { brandColors } from './colors'

/**
 * Approved Brand Expression only.
 * Figma Frame 27 · Deep Electric.
 * Stops are exact. The 110deg CSS angle approximates the Figma transform.
 */
export const deepElectric = {
  id: 'deep-electric',
  name: 'Deep Electric',
  figmaFrame: 27,
  stops: [brandColors.deepBlue, brandColors.royalBlue, brandColors.gradientMid],
  css: `linear-gradient(110deg, ${brandColors.deepBlue} 0%, ${brandColors.royalBlue} 50%, ${brandColors.gradientMid} 100%)`,
} as const

export const approvedBrandSurfaces = {
  brightBlue: brandColors.brightBlue,
  darkCanvas: '#090B10',
} as const

export const brandExpressionAssets = {
  whiteHead: import.meta.env.BASE_URL + 'brand/axolotl-head-white-figma.png',
  source: 'Figma · Axolotl mood · white head image layer 37:1136',
} as const
