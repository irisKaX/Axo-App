export const mascotPalette = [
  { id: 'iris', name: 'Iris Purple', hex: '#7138E8', role: 'Core brand · hlavní ovládací prvky' },
  { id: 'pink', name: 'Axolotl Pink', hex: '#FF73C8', role: 'Mascot · expresivní ilustrace' },
  { id: 'lilac', name: 'Hoodie Lilac', hex: '#B99BFF', role: 'Brand highlights · světelné odlesky' },
  { id: 'violet', name: 'Electric Violet', hex: '#A14CFF', role: 'Gradienty · záře' },
  { id: 'indigo', name: 'Deep Indigo', hex: '#120B2D', role: 'Tmavé brandové pozadí' },
  { id: 'aqua', name: 'Aqua Spark', hex: '#4DEFE3', role: 'Doplňkový akcent Neo Iris' },
] as const

export const mascotAsset = {
  preview: import.meta.env.BASE_URL + 'brand/axolotl-master-preview.webp',
  description: 'Růžový 3D axolotl s fialovýma očima, levandulovou mikinou a tmavými kalhotami na fialovém pozadí.',
  status: 'Master reference · optimized catalog preview',
} as const
