import { brandColors, bluePurpleGradient, neutral, semantic, themes, type ThemeName } from './colors'

/** The complete token inventory shown in Foundations / Colors.
 * Values are read from the same source as actual components, not maintained as
 * separate manually copied HEX swatches.
 */
export const brandUsage: Record<keyof typeof brandColors, string> = {
  irisPurple: 'Primární UI akcent, odkazy a zvýraznění textu',
  electricPurple: 'Koncový bod Blue × Purple gradientu; brand',
  royalViolet: 'Brand doplňková fialová',
  gradientMid: 'Fialový gradient Theme Switch (světlý režim)',
  royalBlue: 'Střed Blue × Purple gradientu',
  deepViolet: 'Dekorativní fialová',
  deepBlue: 'Dekorativní modrá',
  blue: 'Sekundární brand, začátek Blue × Purple gradientu',
  brightBlue: 'Doplňková modrá, efekty',
  lightViolet: 'Světlý akcent',
  purpleMagenta: 'Dekorativní akcent',
  o2Blue: 'Identita O2, nikoli univerzální barva všech akcí',
  axolotlPink: 'Maskot Axolotl',
  hoodieLilac: 'Maskot a ilustrace',
  electricViolet: 'Maskot, logo navigace',
  deepIndigo: 'Dekorativní tmavý odstín',
  aquaSpark: 'Doplňkový akcent',
  sunshineYellow: 'Slunce a měsíc v Theme Switch',
}

export const foundationRoles: Record<Exclude<keyof typeof themes.dark, 'gradient' | 'backdrop'>, string> = {
  canvas: 'Hlavní pozadí celé aplikace, v Dark Mode schváleno #090B10',
  surface: 'Widgety, karty, URL display a rozbalený stav navigace',
  subtle: 'Sekundární výplně a jemné oddělení ploch',
  border: 'Neutrální hranice karet a ploch',
  controlBorder: 'Výchozí rámeček formulářových prvků',
  focusRing: 'Viditelný keyboard focus; odlišný od expanded menu',
  actionHover: 'Hover primárních akcí',
  actionActive: 'Stisknutá akce, nikoli current page',
  actionDisabled: 'Neaktivní kontrolní prvek',
  actionDisabledText: 'Text neaktivního prvku',
  text: 'Primární text na odpovídajícím tématu',
  muted: 'Sekundární text, popisky',
  brand: 'Hlavní fialový akcent',
  brandText: 'Text na brandových barevných plochách',
  brandSoft: 'Jemná sekundární akcentová plocha',
  accent: 'Doplňkový barevný akcent',
  secondary: 'Sekundární brand modrá',
  secondaryText: 'Text na sekundární modré',
  corporate: 'O2 identita',
  corporateText: 'Text na firemní O2 barvě',
  mascot: 'Identita maskota',
  lilac: 'Ilustrace, maskot',
  glow: 'Dekorativní svit, nikoli hlavní pozadí',
}

export const neutralUsage: Record<string,string> = {
  '950': 'Canvas, hlavní tmavé pozadí',
  '900': 'Surface, karty a widgety',
  '800': 'Subtle a jemné výplně',
  '700': 'Neutrální pomocný odstín',
  '600': 'Neutrální pomocný odstín',
  '500': 'Neutrální pomocný odstín',
  '400': 'Neutrální pomocný odstín',
  '300': 'Neutrální pomocný odstín',
  '200': 'Neutrální pomocný odstín',
  '100': 'Světlé plochy',
  '50': 'Světlé plochy',
}

export function getGradientInventory(mode: ThemeName) {
  return [
    {
      id: 'brand',
      name: 'Blue × Purple',
      token: 'themes[mode].gradient / --brand-gradient',
      value: bluePurpleGradient,
      usage: 'Schválený výrazný brand gradient; Primary button, výrazové plochy. Ne na pozadí všech widgetů.',
      details: '130° · #0F9FDC 0 % · #3B09C7 52 % · #8101EC 100 %',
    },
    {
      id: 'backdrop',
      name: 'Atmospheric Backdrop',
      token: 'themes[mode].backdrop / --backdrop',
      value: themes[mode].backdrop,
      usage: 'Dekorativní hero a prezentační plochy. Není výchozím pozadím Dashboardu.',
      details: 'Dvě radiální vrstvy nad Canvas; liší se podle režimu.',
    },
    {
      id: 'navigation',
      name: 'Navigation / Theme Switch',
      token: mode === 'dark' ? '--axo-switch-dark-background' : '--axo-switch-light-background',
      value: mode === 'dark' ? 'var(--axo-switch-dark-background)' : 'var(--axo-switch-light-background)',
      usage: 'Všechna navigační tlačítka a pozadí přepínače tématu. URL má pouze fialový border.',
      details: mode === 'dark'
        ? '125° · #231055 → #4205AA 55 % → #6707D8'
        : '115° · #9668FF → #7C4BFE 55 % → #642FDF',
    },
    {
      id: 'orbital',
      name: 'Primary 2 / Orbital Glow',
      token: 'buttons.css · .axo-button--primary-2::before',
      value: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #168EDA80 278deg, #4CC9F0B3 304deg, #D2B4FF 320deg, transparent 340deg)',
      usage: 'Animovaný tenký světelný obrys Primary 2 a aktuální stránky NavigationButton. Není plošnou výplní.',
      details: 'Conic · 2.8 s, linear, infinite · border mask 1.5 px · respektuje reduced motion',
    },
  ] as const
}

export const statusUsage = {
  success: 'Úspěch, potvrzený výsledek',
  warning: 'Upozornění, potřeba pozornosti',
  error: 'Chyba, neúspěch, destruktivní stav',
  info: 'Informace, neutrální sdělení',
} as const

export const statusNames = Object.keys(semantic.dark) as (keyof typeof semantic.dark)[]
export const neutralInventory = neutral
