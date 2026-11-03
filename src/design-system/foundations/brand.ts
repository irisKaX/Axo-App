import { brandColors } from './colors'

export const mascotPalette = [
  { id: 'iris', name: 'Iris Purple', hex: brandColors.irisPurple, role: 'Core brand · hlavní ovládací prvky' },
  { id: 'o2', name: 'O2 Blue', hex: brandColors.o2Blue, role: 'Corporate · O2 kontext, nikoliv primární CTA' },
  { id: 'pink', name: 'Axolotl Pink', hex: brandColors.axolotlPink, role: 'Mascot · expresivní ilustrace' },
  { id: 'lilac', name: 'Hoodie Lilac', hex: brandColors.hoodieLilac, role: 'Brand highlights · světelné odlesky' },
  { id: 'violet', name: 'Electric Violet', hex: brandColors.electricViolet, role: 'Gradienty · záře' },
  { id: 'indigo', name: 'Deep Indigo', hex: brandColors.deepIndigo, role: 'Tmavé brandové pozadí' },
  { id: 'aqua', name: 'Aqua Spark', hex: brandColors.aquaSpark, role: 'Doplňkový akcent Neo Iris' },
] as const

export const mascotAsset = {
  preview: import.meta.env.BASE_URL + 'brand/axolotl-master-preview.webp',
  description: 'Růžový 3D axolotl s fialovýma očima, levandulovou mikinou a tmavými kalhotami na fialovém pozadí.',
  status: 'Master reference · optimized catalog preview',
} as const
