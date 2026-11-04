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

export const textTreatmentRoles = {
  accentDot: typography.display,
  accentWord: typography.h2,
  eyebrow: typography.overline,
  heading: typography.h2,
} as const
