import { brandColors } from './colors'

/**
 * Figma moodboard frames 24–27: original stops preserved.
 * CSS angle approximates Figma's gradient transform.
 * This is the only token registry for Brand Expression gradients.
 */
export const brandGradients = [
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    figmaFrame: 24,
    usage: 'Hero, welcome, featured brand blocks',
    stops: [brandColors.royalViolet, brandColors.gradientMid, brandColors.brightBlue],
    css: `linear-gradient(110deg, ${brandColors.royalViolet} 0%, ${brandColors.gradientMid} 50%, ${brandColors.brightBlue} 100%)`,
  },
  {
    id: 'luminous-lilac',
    name: 'Luminous Lilac',
    figmaFrame: 25,
    usage: 'Friendly hero, onboarding, storytelling',
    stops: [brandColors.royalViolet, brandColors.gradientMid, brandColors.lightViolet],
    css: `linear-gradient(110deg, ${brandColors.royalViolet} 0%, ${brandColors.gradientMid} 50%, ${brandColors.lightViolet} 100%)`,
  },
  {
    id: 'plasma-violet',
    name: 'Plasma Violet',
    figmaFrame: 26,
    usage: 'Expressive illustrations and accent cards',
    stops: [brandColors.royalViolet, brandColors.gradientMid, brandColors.purpleMagenta],
    css: `linear-gradient(110deg, ${brandColors.royalViolet} 0%, ${brandColors.gradientMid} 50%, ${brandColors.purpleMagenta} 100%)`,
  },
  {
    id: 'deep-electric',
    name: 'Deep Electric',
    figmaFrame: 27,
    usage: 'Dark brand cover and premium sections',
    stops: [brandColors.deepBlue, brandColors.royalBlue, brandColors.gradientMid],
    css: `linear-gradient(110deg, ${brandColors.deepBlue} 0%, ${brandColors.royalBlue} 50%, ${brandColors.gradientMid} 100%)`,
  },
] as const

export const brandExpressionAssets = {
  whiteHead: import.meta.env.BASE_URL + 'brand/axolotl-head-white-figma.png',
  source: 'Figma · Axolotl mood · head image in Frame 24',
} as const

export const brandExpressionRules = {
  workingSurface: 'Keep core workspace, input and widget surfaces neutral.',
  accent: 'Use Bright Blue for intentional brand surfaces and featured content.',
  mark: 'Place the white Axolotl head on vivid gradients with clear space.',
  frequency: 'Limit expressive backgrounds to meaningful, selected locations.',
} as const
