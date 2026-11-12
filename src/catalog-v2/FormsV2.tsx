import { useState, type CSSProperties, type ReactNode } from 'react'
import { colorTokens, type ThemeName } from '../design-system/foundations/colors'
import { radius } from '../design-system/foundations/spacing'
import { FormInput, FormTextarea, FormSelect, FormCheckbox, FormRadioGroup, FormSwitch, type FormAccent } from './forms/FormControlsV2'
import SearchSpotlightV2 from './forms/SearchSpotlightV2'
import MultiSelectV2 from './forms/MultiSelectV2'
import DatePickerV2 from './forms/DatePickerV2'
import QualitySliderV2 from './forms/QualitySliderV2'
import FileUploadAtmosphereV2 from './forms/FileUploadAtmosphereV2'
import DarkLightSwitchV2 from './forms/DarkLightSwitchV2'

const regions = [
  { value: 'praha', label: 'Praha' },
  { value: 'brno', label: 'Brno' },
  { value: 'ostrava', label: 'Ostrava' },
  { value: 'other', label: 'Jiné město', disabled: true },
]
const tagOptions = [
  { value: 'seo', label: 'SEO' },
  { value: 'oneplay', label: 'Oneplay' },
  { value: 'media', label: 'Média' },
  { value: 'metadata', label: 'Metadata' },
  { value: 'kontrola', label: 'Kontrola URL' },
  { value: 'archiv', label: 'Archiv', disabled: true },
]
const viewModes = [
  { value: 'comfortable', label: 'Comfortable', description: 'Vzdušnější pracovní rozložení' },
  { value: 'compact', label: 'Compact', description: 'Více informací na obrazovce' },
  { value: 'focus', label: 'Focus', description: 'Méně rozptýlení a více prostoru pro obsah' },
  { value: 'automatic', label: 'Automaticky', description: 'Nedostupná volba', disabled: true },
]
const accents: { value: FormAccent; label: string }[] = [
  { value: 'brand', label: 'Iris Purple' },
  { value: 'info', label: 'Info Blue' },
  { value: 'success', label: 'Success Lime' },
  { value: 'warning', label: 'Warning Yellow' },
  { value: 'danger', label: 'Danger Pink' },
]

function AccentPicker({ value, onChange }: { value: FormAccent; onChange: (value: FormAccent) => void }) {
  return <fieldset className="v2f-accent-picker"><legend>Barevná varianta</legend><div>
    {accents.map(accent => <button key={accent.value} type="button" className={'v2f-accent-option v2f-accent-' + accent.value}
      aria-pressed={value === accent.value} onClick={() => onChange(accent.value)}><span aria-hidden="true" />{accent.label}</button>)}
  </div></fieldset>
}

function Section({ number, title, description, children }: { number: string; title: string; description: string; children: ReactNode }) {
  return <section className="v2-panel"><div className="v2f-section-heading"><span className="v2-kicker">{number}</span><h2>{title}</h2><p>{description}</p></div>{children}</section>
}

function isValidHttpUrl(value: string) {
  try { const url = new URL(value.trim()); return ['http:', 'https:'].includes(url.protocol) && url.hostname.includes('.') }
  catch { return false }
}

export default function FormsV2({ theme, onThemeChange }: { theme: ThemeName; onThemeChange: (theme: ThemeName) => void }) {
  const [search, setSearch] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(['seo', 'oneplay'])
  const [dueDate, setDueDate] = useState('')
  const [quality, setQuality] = useState(80)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [uploadErrorPreview, setUploadErrorPreview] = useState(false)
  const [subscribe, setSubscribe] = useState(true)
  const [view, setView] = useState('comfortable')
  const [autosave, setAutosave] = useState(true)
  const [notifications, setNotifications] = useState(false)
  const [checkboxAccent, setCheckboxAccent] = useState<FormAccent>('brand')
  const [radioAccent, setRadioAccent] = useState<FormAccent>('brand')
  const [switchAccent, setSwitchAccent] = useState<FormAccent>('brand')
  const colors = colorTokens.semantic[theme]
  const field = colors.field
  const states = colorTokens.interaction[theme]
  const status = colorTokens.status[theme]
  const hasUrl = Boolean(url.trim())
  const validUrl = isValidHttpUrl(url)
  const variables = {
    colorScheme: theme,
    '--v2f-canvas': colors.surface.canvas,
    '--v2f-surface': colors.surface.default,
    '--v2f-subtle': colors.surface.subtle,
    '--v2f-raised': colors.surface.raised,
    '--v2f-border': colors.border.default,
    '--v2f-control-border': colors.border.control,
    '--v2f-field-base-background': field.background,
    '--v2f-field-base-border': field.border,
    '--v2f-field-hover-background': field.hover.background,
    '--v2f-field-hover-border': field.hover.border,
    '--v2f-field-focus-border': field.focus.border,
    '--v2f-field-focus-background': field.focus.background,
    '--v2f-field-filled-background': field.filled.background,
    '--v2f-field-disabled-background': field.disabled.background,
    '--v2f-text': colors.text.primary,
    '--v2f-muted': colors.text.secondary,
    '--v2f-focus': states.focus.ring,
    '--v2f-hover': states.hover.background,
    '--v2f-pressed': states.pressed.background,
    '--v2f-selected': states.selected.background,
    '--v2f-disabled': states.disabled.background,
    '--v2f-disabled-text': states.disabled.text,
    '--v2f-brand': colorTokens.primitives.brand.irisPurple,
    '--v2f-info': status.info.foreground,
    '--v2f-success': status.success.foreground,
    '--v2f-warning': status.warning.foreground,
    '--v2f-error': status.error.foreground,
    '--v2f-on-brand': colors.text.onBrand,
    '--v2f-ink': colorTokens.primitives.neutral[950],
    '--v2f-shadow': colorTokens.effects[theme].shadow,
    '--v2f-upload-backdrop': colorTokens.effects[theme].backdrop,
    '--v2f-upload-surface': theme === 'dark' ? colors.surface.canvas : colors.surface.default,
    '--v2f-radius-xs': radius.xs + 'px',
    '--v2f-radius-sm': radius.sm + 'px',
    '--v2f-radius-md': radius.md + 'px',
    '--v2f-radius-lg': radius.lg + 'px',
    '--v2f-radius-pill': radius.pill + 'px',
  } as CSSProperties

  return <div className="v2-page v2f-page" style={variables}>
    <div className="v2-page-title"><div><span className="v2-kicker">LIBRARY / BASIC FORM CONTROLS</span><h1>Inputs <span className="v2-period">& Forms.</span></h1><p>Šest základních prvků Clean Neo Iris. Původní proporce a interakce, barvy podle společných tokenů pro Dark a Light.</p></div><span className="v2-status">NÁHLED K VIZUÁLNÍMU SCHVÁLENÍ</span></div>

    <Section number="01 / TEXT & URL INPUTS" title="Textová pole a validace" description="Label nad polem, pilulkový obrys a jeden vnitřní focus. URL validace je pouze lokální ukázka.">
      <div className="v2f-field-grid">
        <FormInput label="Hledat v nástrojích" placeholder="Například Metadata" value={search} onChange={event => setSearch(event.target.value)} hint="Standardní textové pole · vyzkoušej hover, focus a vyplněný stav" />
        <FormInput label="URL adresa" type="url" required placeholder="https://www.o2.cz" value={url} onChange={event => setUrl(event.target.value)}
          error={hasUrl && !validUrl ? 'Zadej platnou URL včetně https://' : undefined} success={hasUrl && validUrl ? 'URL vypadá správně' : undefined} hint="Zadej URL a porovnej Error / Success." />
        <FormInput label="Disabled input" value="Toto pole je zamčené" readOnly disabled hint="Neaktivní stav" />
        <FormInput label="Success state" value="Ověřeno" readOnly success="Hodnota byla ověřena" />
      </div>
      <details className="v2f-sizes"><summary>Původní velikosti polí · 44 / 52 / 60 px</summary><div>
        <FormInput label="Compact · 44 px" fieldSize="compact" placeholder="Kompaktní pole" />
        <FormInput label="Default · 52 px" placeholder="Výchozí pole" />
        <FormInput label="Comfortable · 60 px" fieldSize="comfortable" placeholder="Vzdušné pole" />
      </div></details>
    </Section>

    <Section number="02 / TEXTAREA" title="Víceřádkový text" description="Původní zaoblení a možnost ručního zvětšení na výšku. Počet znaků se mění jen v této ukázce.">
      <div className="v2f-field-grid"><FormTextarea label="Poznámka k projektu" rows={4} placeholder="Zapiš nápad, úkol nebo poznámku…" value={description} onChange={event => setDescription(event.target.value)} hint={description.length + ' znaků · pouze lokální náhled'} />
        <FormTextarea label="Disabled textarea" rows={4} value="Ukázka neaktivního víceřádkového pole." disabled readOnly hint="Neaktivní stav" /></div>
    </Section>

    <Section number="03 / CUSTOM SELECT" title="Vlastní výběrová nabídka" description="Myš, šipky ↑ ↓, Home / End, Enter, Esc a Tab. Zakázané možnosti se při pohybu přeskakují.">
      <div className="v2f-field-grid"><div><FormSelect label="Město" options={regions} value={city} onChange={setCity} placeholder="Vyber město" hint="Výběr funguje myší i klávesnicí." />
        <p className="v2f-selection-summary" role="status">Vybráno: <strong>{regions.find(option => option.value === city)?.label ?? 'Zatím nic nevybráno'}</strong></p></div>
        <FormSelect label="Disabled select" options={regions} value="praha" onChange={() => {}} disabled hint="Nabídka je nedostupná" /></div>
    </Section>

    <Section number="04 / CHECKBOX" title="Nezávislé volby" description="Pět původních barevných variant, animovaný check a jemné zvětšení na hover. Kliknout lze na celý popisek.">
      <AccentPicker value={checkboxAccent} onChange={setCheckboxAccent} />
      <div className="v2f-choice-gallery"><FormCheckbox label="Odebírat novinky" description="Dostávat produktové aktualizace (ukázka)" checked={subscribe} onChange={setSubscribe} accent={checkboxAccent} />
        <div><FormCheckbox label="Nedostupná možnost" checked={false} onChange={() => {}} disabled accent={checkboxAccent} /><FormCheckbox label="Uzamčená preference" checked onChange={() => {}} disabled accent={checkboxAccent} /></div></div>
    </Section>

    <Section number="05 / RADIO GROUP" title="Právě jedna možnost" description="Původní kruhová geometrie a animovaná tečka. Barevnou variantu lze měnit nezávisle na Checkboxu i Toggle.">
      <AccentPicker value={radioAccent} onChange={setRadioAccent} />
      <FormRadioGroup label="Hustota zobrazení" name="v2-form-density" options={viewModes} value={view} onChange={setView} accent={radioAccent} />
    </Section>

    <Section number="06 / TOGGLE SWITCH" title="Nastavení zapnuto / vypnuto" description="Původní přepínač 52 × 30 px, posun thumbu a barevné varianty. Mění jen stav těchto ukázek.">
      <AccentPicker value={switchAccent} onChange={setSwitchAccent} />
      <div className="v2f-switch-gallery"><FormSwitch label="Automatické ukládání" description={autosave ? 'Zapnuto · pouze ilustrační stav' : 'Vypnuto · pouze ilustrační stav'} checked={autosave} onChange={setAutosave} accent={switchAccent} />
        <FormSwitch label="Notifikace" description={notifications ? 'Zapnuto' : 'Vypnuto'} checked={notifications} onChange={setNotifications} accent={switchAccent} />
        <FormSwitch label="Uzamčené nastavení" description="Aktuálně nelze změnit" checked onChange={() => {}} disabled accent={switchAccent} /></div>
    </Section>
    <Section number="07 / SEARCH SPOTLIGHT" title="Hledání s jemným pohybem" description="Zaoblené pole, pomalý Blue × Purple obvod a ukázkové psaní. První vizuální prototyp bez skutečného vyhledávání.">
      <SearchSpotlightV2 />
    </Section>
    <Section number="08 / MULTI-SELECT" title="Vícenásobný výběr" description="Vyber více kategorií, přidávej štítky a odeber je křížkem nebo Backspace. Psaní filtruje zbývající možnosti; výběr ovládají šipky a Enter, nabídku zavře Esc.">
      <div className="v2f-field-grid"><div>
        <MultiSelectV2 label="Kategorie projektu" options={tagOptions} value={selectedTags} onChange={setSelectedTags} />
        <p className="v2f-selection-summary" role="status">Vybráno: <strong>{selectedTags.length ? selectedTags.map(value => tagOptions.find(option => option.value === value)?.label).join(' · ') : 'Žádné kategorie'}</strong></p>
      </div><MultiSelectV2 label="Disabled multi-select" options={tagOptions} value={['seo', 'oneplay']} onChange={() => {}} disabled /></div>
    </Section>
    <Section number="09 / DATE PICKER" title="Datum a termíny" description="Vlastní český kalendář, přepínání měsíců a volba Dnes. Výběr ovládá myš, Tab a Enter nebo mezerník; nabídku zavře Esc.">
      <div className="v2f-field-grid"><div>
        <DatePickerV2 label="Termín dokončení" value={dueDate} onChange={setDueDate} />
        <p className="v2f-selection-summary" role="status">Vybrané datum: <strong>{dueDate ? new Date(dueDate + 'T12:00:00').toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Zatím není stanovené'}</strong></p>
      </div><DatePickerV2 label="Disabled date picker" value={dueDate} onChange={() => {}} disabled /></div>
    </Section>
    <Section number="10 / QUALITY SLIDER" title="Kvalita v procentech" description="Rozsah 0–100 % po jednom procentu. Vyzkoušej kliknutí do stopy, tažení nebo šipky na klávesnici; Home a End nastaví krajní hodnoty.">
      <QualitySliderV2 value={quality} onChange={setQuality} />
    </Section>
    <Section number="11 / FILE UPLOAD ATMOSPHERE" title="Soubory na jednom místě" description="Jedna flexibilní Atmosphere komponenta. Vyber soubory ze zařízení nebo je přetáhni do zóny; výběr zůstává pouze v tomto náhledu.">
      <div className="v2f-upload-demo-controls"><button type="button" className="v2-button v2-button--ghost" aria-pressed={uploadErrorPreview} onClick={() => setUploadErrorPreview(current => !current)}>
        <span className="v2-button__content">{uploadErrorPreview ? 'Skrýt ukázkovou chybu' : 'Ukázková chyba'}</span>
      </button><span>Chyba ponechá aktuální výběr souborů.</span></div>
      <FileUploadAtmosphereV2 files={uploadFiles} onChange={setUploadFiles}
        error={uploadErrorPreview ? 'Ukázková chyba: Soubor „Archiv.zip“ má nepodporovaný typ. Vyber jiný soubor.' : undefined}
        onError={() => setUploadErrorPreview(false)} />
    </Section>
    <Section number="12 / DARK / LIGHT SWITCH" title="Dark / Light Mode" description="Původní pill přepínač s animovaným sluncem a měsícem sdílí motiv celého katalogu s hlavním tlačítkem v horní liště. Ovládání kliknutím, Enterem nebo mezerníkem.">
      <DarkLightSwitchV2 theme={theme} onThemeChange={onThemeChange} />
    </Section>
    <p className="v2f-session-note">Pouze interaktivní designové ukázky. Opuštěním sekce se lokální stav zahodí.</p>
  </div>
}
