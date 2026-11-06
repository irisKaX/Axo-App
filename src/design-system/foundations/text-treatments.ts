import { brandColors } from './colors'
import { spacing } from './spacing'
import { typography } from './typography'

/**
 * Approved Axolotl text treatments.
 * Color comes from Colors v2, roles from Typography, spacing from Foundations.
 * Do not introduce additional treatments without visual approval.
 */
export const textTreatments = {
  accentDot: {
    id: 'accentDot',
    name: 'Accent Dot',
    role: 'display',
    accentColor: brandColors.irisPurple,
    punctuation: '.',
    example: 'Axolotl',
  },
  accentWord: {
    id: 'accentWord',
    name: 'Accent Word',
    role: 'h2',
    accentColor: brandColors.irisPurple,
    example: { start: 'Make work ', accent: 'better.' },
  },
  eyebrowHeading: {
    id: 'eyebrowHeading',
    name: 'Eyebrow + Heading',
    eyebrowRole: 'overline',
    headingRole: 'h2',
    gap: spacing[2],
    accentColor: brandColors.irisPurple,
    eyebrow: 'DESIGN FOUNDATION',
    heading: 'Built for creators',
    punctuation: '.',
    textTransform: 'uppercase',
  },
} as const

/**
 * Mandatory pair used by widget and tool-page headings:
 * neutral heading + Iris Purple dot; Iris Purple heading + neutral dot.
 * The component ContrastDot normalizes a supplied trailing period.
 */
export const toolHeadingPunctuation = {
  neutralText: 'theme.text',
  accentText: 'brand.irisPurple',
  neutralLineDot: 'brand.irisPurple',
  accentLineDot: 'theme.text',
  punctuation: '.',
  example: { title: 'Konvertor webP.', tagline: 'Převod obrázků.' },
} as const

export const textTreatmentRoles = {
  accentDot: typography.display,
  accentWord: typography.h2,
  eyebrow: typography.overline,
  heading: typography.h2,
} as const
