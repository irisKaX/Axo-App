import { useState } from 'react'
import { FormInput, FormTextarea, FormSelect, FormCheckbox, FormRadioGroup, FormSwitch, type FormAccent } from '../components/FormControls'
import { SearchSpotlight } from '../components/SearchSpotlight'
import { QualitySlider, type QualitySliderState } from '../components/QualitySlider'
import { MultiSelect, DatePickerField, NumberInput, FileDropzone, type FileUploadSize } from '../components/AdvancedFormControls'
import { ThemeSwitch } from '../components/ThemeSwitch'
import { type ThemeName } from '../design-system/foundations/colors'
import './forms-studio.css'

const regions=[
  {value:'praha',label:'Praha'},
  {value:'brno',label:'Brno'},
  {value:'ostrava',label:'Ostrava'},
  {value:'other',label:'Jiné město',disabled:true},
]
const tagOptions=[
  {value:'seo',label:'SEO'},
  {value:'oneplay',label:'Oneplay'},
  {value:'media',label:'Média'},
  {value:'metadata',label:'Metadata'},
  {value:'kontrola',label:'Kontrola URL'},
  {value:'archiv',label:'Archiv',disabled:true},
]
const spotlightPhrases = ['Jaký asset hledáte?','Zadejte hledanou frázi…','Najděte obrázek nebo dokument…','Vyhledejte asset na webu…'] as const
const viewModes=[
  {value:'comfortable',label:'Comfortable',description:'Vzdušnější pracovní rozložení'},
  {value:'compact',label:'Compact',description:'Více informací na obrazovce'},
  {value:'focus',label:'Focus',description:'Méně rozptýlení a více prostoru pro obsah'},
  {value:'automatic',label:'Automaticky',description:'Nedostupná volba',disabled:true},
]

const formAccentOptions: {value:FormAccent;label:string}[]=[
  {value:'brand',label:'Iris Purple'},
  {value:'info',label:'Info Blue'},
  {value:'success',label:'Success Lime'},
  {value:'warning',label:'Warning Yellow'},
  {value:'danger',label:'Danger Pink'}
]
function AccentPicker({label,value,onChange}:{label:string;value:FormAccent;onChange:(value:FormAccent)=>void}){
  return <fieldset className="fs-accent-picker">
    <legend>{label}</legend>
    <div className="fs-accent-buttons">
      {formAccentOptions.map(option=><button type="button" key={option.value}
        className={'fs-accent-option'+(value===option.value?' is-active':'')}
        onClick={()=>onChange(option.value)} aria-pressed={value===option.value}>
        <span className={'fs-accent-dot is-'+option.value} aria-hidden="true"/>
        {option.label}
      </button>)}
    </div>
  </fieldset>
}

const uploadPreviews: { size: FileUploadSize; label: string }[] = [
  { size: 'default', label: 'Atmosphere / Default' },
  { size: 'large', label: 'Atmosphere / Large' },
]
const uploadStateOptions = [
  { value: 'empty', label: 'Empty' },
  { value: 'drag-over', label: 'Drag Over preview' },
  { value: 'uploaded', label: 'Uploaded / Ready' },
  { value: 'error', label: 'Error' },
]
type UploadPreview = { files: File[]; error?: string; dragOver?: boolean }

function isValidHttpUrl(value:string) {
  try { const url=new URL(value.trim()); return ['http:','https:'].includes(url.protocol)&&url.hostname.includes('.') }
  catch { return false }
}

export default function FormsStudio({theme,onThemeChange}:{theme:ThemeName;onThemeChange:(value:ThemeName)=>void}) {
  const [search,setSearch]=useState('')
  const [url,setUrl]=useState('')
  const [city,setCity]=useState('')
  const [description,setDescription]=useState('')
  const [subscribe,setSubscribe]=useState(true)
  const [view,setView]=useState('comfortable')
  const [autosave,setAutosave]=useState(true)
  const [notifications,setNotifications]=useState(false)
  const [checkboxAccent,setCheckboxAccent]=useState<FormAccent>('brand')
  const [radioAccent,setRadioAccent]=useState<FormAccent>('brand')
  const [switchAccent,setSwitchAccent]=useState<FormAccent>('brand')
  const [spotlightValue,setSpotlightValue]=useState('')
  const [selectedTags,setSelectedTags]=useState<string[]>(['seo','oneplay'])
  const [dueDate,setDueDate]=useState('')
  const [budget,setBudget]=useState<number|null>(199)
  const [qualitySliderValue,setQualitySliderValue] = useState(80)
  const [qualitySliderPreview,setQualitySliderPreview] = useState<QualitySliderState>('default')
  const [uploadState, setUploadState] = useState('empty')
  const [imageDropState,setImageDropState] = useState<'empty'|'drag'|'ready'|'error'|'disabled'>('empty')
  const [imageDropSize,setImageDropSize] = useState<FileUploadSize>('default')
  const [uploadRevision, setUploadRevision] = useState(0)
  const [uploads, setUploads] = useState<UploadPreview[]>(() => uploadPreviews.map(() => ({ files: [] })))
  function previewUploads(state: string) {
    setUploadState(state)
    setUploadRevision(revision => revision + 1)
    setUploads(uploadPreviews.map(() => ({
      files: state === 'uploaded' || state === 'error' ? [
        new File(['Poznámky k projektu Axolotl.'], 'Poznámky.txt', { type: 'text/plain', lastModified: 0 }),
        new File(['# Workspace\nPodklady pro nový projekt.'], 'Workspace.md', { type: 'text/markdown', lastModified: 0 }),
      ] : [],
      dragOver: state === 'drag-over',
      error: state === 'error' ? 'Soubor „Archiv.zip“ má nepodporovaný typ. Vyber jiný soubor.' : undefined,
    })))
  }
  const validUrl=!url.trim() || isValidHttpUrl(url)
  return <div className="fs-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / INPUTS & FORMS</p>
    <h1>Inputs <span className="heading-accent">& Forms.</span></h1>
    <p className="intro">Formulářové prvky v Neo Iris: pilulkové inputy, vlastní dropdowny a sémantické barevné varianty. Na konci najdeš speciální animované vyhledávací pole.</p>
    <div className="fs-status">SCHVÁLENÉ FORM COMPONENTS</div>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>01 / TEXT & URL INPUTS</span><h2>Textová pole a validace</h2><p>Stejné odsazení, label nad polem a viditelný focus. Validace nikdy nespoléhá pouze na barvu.</p></div>
      <div className="fs-field-grid">
        <FormInput label="Hledat v nástrojích" placeholder="Například Metadata" value={search} onChange={e=>setSearch(e.target.value)} hint="Standardní textové pole"/>
        <FormInput label="URL adresa" type="url" required placeholder="https://www.o2.cz" value={url} onChange={e=>setUrl(e.target.value)} error={url.trim()&&!validUrl?'Zadej platnou URL včetně https://':undefined} success={url.trim()&&validUrl?'URL vypadá správně':undefined}/>
        <FormInput label="Disabled input" value="Toto pole je zamčené" readOnly disabled hint="Neaktivní stav"/>
        <FormInput label="Success state" value="Ověřeno" readOnly success="Hodnota byla ověřena"/>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>02 / CUSTOM SELECT</span><h2>Výběrová nabídka bez native vzhledu</h2><p>Vlastní pilulkově zaoblený dropdown se šipkou odsazenou od okraje, aktivním stavem a výběrem přes klávesnici.</p></div>
      <div className="fs-select-layout">
        <FormSelect label="Město" options={regions} value={city} onChange={setCity} placeholder="Vyber město" hint="↑ ↓ pro pohyb, Enter pro výběr, Esc pro zavření"/>
        <div className="fs-select-summary"><span>VYBRANÁ HODNOTA</span><strong>{regions.find(o=>o.value===city)?.label??'Zatím nic nevybráno'}</strong><p>Rozbal nabídku a vyzkoušej výběr myší i klávesnicí. Zakázaná možnost je nedostupná.</p></div>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>03 / TEXTAREA</span><h2>Víceřádkový text</h2><p>Stejná pravidla pro border, text a focus. Pole lze ručně zvětšit na výšku.</p></div>
      <FormTextarea label="Poznámka k projektu" rows={4} placeholder="Zapiš nápad, úkol nebo poznámku…" value={description} onChange={e=>setDescription(e.target.value)} hint={description.length+' znaků · změny se ukládají jen v této ukázce'}/>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>04 / CHECKBOX & RADIO</span><h2>Výběr jedné nebo více možností</h2><p>Checkbox dovoluje nezávislé volby. Radio ze skupiny povoluje právě jednu.</p></div>
      <div className="fs-choice-layout">
        <div className="fs-choice-box"><span className="fs-overline">CHECKBOX</span>
          <AccentPicker label="Barevná varianta" value={checkboxAccent} onChange={setCheckboxAccent}/>
          <FormCheckbox label="Odebírat novinky" description="Dostávat produktové aktualizace" checked={subscribe} onChange={setSubscribe} accent={checkboxAccent}/>
          <FormCheckbox label="Nedostupná možnost" checked={false} onChange={()=>{}} disabled/>
          <FormCheckbox label="Uzamčená preference" checked={true} onChange={()=>{}} disabled/>
        </div>
        <div className="fs-choice-box"><span className="fs-overline">RADIO GROUP</span>
          <AccentPicker label="Barevná varianta" value={radioAccent} onChange={setRadioAccent}/>
          <FormRadioGroup label="Hustota zobrazení" name="axolotl-density" options={viewModes} value={view} onChange={setView} accent={radioAccent}/>
        </div>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>05 / TOGGLE SWITCH</span><h2>Nastavení zapnuto / vypnuto</h2><p>Switch mění okamžitý stav. Kontrola pomocí klávesnice funguje přes nativní přístupný input, vzhled je kompletně vlastní.</p></div>
      <AccentPicker label="Barevná varianta přepínačů" value={switchAccent} onChange={setSwitchAccent}/>
      <div className="fs-toggles">
        <FormSwitch label="Automatické ukládání" description={autosave?'Zapnuto · změny se ukládají průběžně':'Vypnuto · změny se neukládají'} checked={autosave} onChange={setAutosave} accent={switchAccent}/>
        <FormSwitch label="Notifikace" description={notifications?'Zapnuto':'Vypnuto'} checked={notifications} onChange={setNotifications} accent={switchAccent}/>
        <FormSwitch label="Uzamčené nastavení" description="Aktuálně nelze změnit" checked={true} onChange={()=>{}} disabled/>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>06 / THEME SWITCH</span><h2>Dark / Light Mode</h2><p>Specializovaný toggle s animovaným sluncem a měsícem. Přepíná téma celého Axo-App, takže je synchronizovaný s horní lištou.</p></div>
      <div className="fs-theme-layout">
        <div className="fs-theme-interactive">
          <span className="fs-overline">LIVE THEME CONTROL</span>
          <ThemeSwitch theme={theme} onThemeChange={onThemeChange} label="Tmavý režim"/>
          <div className="fs-theme-current" role="status">Aktivní režim: <strong>{theme==='dark'?'Dark':'Light'}</strong></div>
          <p>Přepínač funguje myší, dotykem i klávesnicí. Změnu uvidíš na celém katalogu.</p>
        </div>
      </div>
      <div className="fs-guide-note">Toto je návrh vzhledu přepínače k vizuálnímu schválení. Pro přístupnost používá nativní checkbox se sémantikou <code>switch</code>, viditelný focus a podporu omezeného pohybu.</div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>07 / SPECIAL SEARCH INPUT</span><h2>Search Spotlight</h2><p>Prémiové vyhledávání assetů a frází. Gradientový obvod se pomalu pohybuje nepřetržitě, na hover zesílí a při focusu jemně pulzuje. Ukázkové texty se píší a mažou pouze tehdy, když je pole prázdné a není aktivní.</p></div>
      <div className="fs-spotlight-stage">
        <span className="fs-overline">LIVE SEARCH / ANIMATED BORDER</span>
        <SearchSpotlight value={spotlightValue} onChange={setSpotlightValue}
          phrases={spotlightPhrases}/>
        <p>Po kliknutí se animovaný text skryje a do skutečného inputu můžeš psát. Text se nikdy automaticky nevkládá do hodnoty hledání.</p>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>08 / MULTI-SELECT</span><h2>Vícenásobný výběr</h2><p>Vyber více kategorií, přidávej štítky, odeber je křížkem nebo klávesou Backspace. Vyhledávání filtruje zbývající možnosti.</p></div>
      <div className="fs-advanced-grid">
        <MultiSelect label="Kategorie projektu" options={tagOptions} value={selectedTags} onChange={setSelectedTags}/>
        <div className="fs-advanced-note"><strong>Aktuálně vybráno</strong><p>{selectedTags.length?selectedTags.map(value=>tagOptions.find(option=>option.value===value)?.label).join(' · '):'Žádné kategorie'}</p></div>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>09 / DATE PICKER</span><h2>Datum a termíny</h2><p>Vlastní kalendář s českými názvy měsíců, výběrem dne a navigací mezi měsíci. Pro události, termíny úkolů a expirace.</p></div>
      <div className="fs-advanced-grid">
        <DatePickerField label="Termín dokončení" value={dueDate} onChange={setDueDate}/>
        <div className="fs-advanced-note"><strong>Vybrané datum</strong><p>{dueDate?new Date(dueDate+'T12:00:00').toLocaleDateString('cs-CZ',{day:'numeric',month:'long',year:'numeric'}):'Zatím není stanovené'}</p></div>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>10 / NUMBER INPUT</span><h2>Číselné hodnoty</h2><p>Číselné pole s minimem, maximem, krokem a označením jednotky. Hodnotu lze psát nebo měnit tlačítky plus a minus.</p></div>
      <div className="fs-advanced-grid">
        <NumberInput label="Cena služby" value={budget} onChange={setBudget} min={0} max={10000} step={10} unit="Kč"/>
        <div className="fs-advanced-note"><strong>Aktuální částka</strong><p>{budget===null?'Není zadána':new Intl.NumberFormat('cs-CZ',{style:'currency',currency:'CZK',maximumFractionDigits:2}).format(budget)}</p></div>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>11 / FILE UPLOAD</span><h2>File Upload</h2><p>Schválený vizuální směr Atmosphere ve velikostech Default a Large. Vyber soubory ze zařízení nebo je přetáhni do náhledu.</p></div>
      <div className="fs-upload-toolbar">
        <FormSelect label="Nastavit ukázkový stav" options={uploadStateOptions} value={uploadState} onChange={previewUploads} />
        <p>Stav se nastaví v obou náhledech. Uploaded a Error používají ukázkové soubory; každý náhled lze dál samostatně ovládat.</p>
      </div>
      <div className="fs-upload-grid">
        {uploadPreviews.map((preview, index) => (
          <article className="fs-upload-specimen" key={preview.label}>
            <p className="fs-upload-label"><span>0{index + 1}</span><strong>{preview.label}</strong></p>
            <FileDropzone key={uploadRevision} size={preview.size}
              label={`${preview.label} · Přílohy projektu`} accept=".png,.jpg,.jpeg,.webp,.pdf,.csv,.txt,.md" maxBytes={10 * 1024 * 1024}
              files={uploads[index].files} error={uploads[index].error} dragOver={uploads[index].dragOver}
              onChange={files => setUploads(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, files, dragOver: false } : item))}
              onError={error => setUploads(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, error, dragOver: false } : item))} />
          </article>
        ))}
      </div>
      <div className="fs-image-variant">
        <div className="fs-section-head"><span>CONTEXT / IMAGE CONVERTER</span><h3>Image Upload · varianta stejné komponenty</h3>
          <p>Jedna společná FileDropzone. Stejná schválená Atmosphere kompozice, pouze texty a vizuální stav pro konvertor obrázků. Žádné skutečné nahrávání.</p>
        </div>
        <div className="fs-image-drop-controls">
          <fieldset><legend>Ukázkový stav</legend><div className="fs-image-drop-options">
            {([['empty','Default'],['drag','Drag Active'],['ready','Ready'],['error','Error'],['disabled','Disabled']] as const)
              .map(([value,label])=><button type="button" key={value} className={imageDropState===value?'is-selected':''}
                aria-pressed={imageDropState===value} onClick={()=>setImageDropState(value)}>{label}</button>)}
          </div></fieldset>
          <fieldset><legend>Velikost</legend><div className="fs-image-drop-options">
            {([['default','Default'],['large','Large']] as const).map(([value,label])=>
              <button type="button" key={value} className={imageDropSize===value?'is-selected':''}
                aria-pressed={imageDropSize===value} onClick={()=>setImageDropSize(value)}>{label}</button>)}
          </div></fieldset>
        </div>
        <div className="fs-image-drop-stage">
          <FileDropzone context="images" previewOnly size={imageDropSize} label="Image Converter · vizuální náhled"
            accept=".png,.jpg,.jpeg,.webp,.avif,.bmp,.gif"
            files={imageDropState==='ready' ? [
              new File(['obrazek'],'hero-banner.png',{type:'image/png',lastModified:0}),
              new File(['obrazek'],'product-photo.jpg',{type:'image/jpeg',lastModified:0})
            ] : []}
            error={imageDropState==='error' ? 'Soubor „archiv.zip“ není obrázek.' : undefined}
            dragOver={imageDropState==='drag'} disabled={imageDropState==='disabled'} onChange={()=>{}}/>
        </div>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>12 / QUALITY SLIDER</span><h2>Quality Slider · 0–100</h2>
        <p>Nová komponenta pro nastavení kvality konverze. Vlastní Neo Iris vzhled, žádný nativní vizuál. Hodnota se mění jen v katalogové ukázce, bez zpracování obrázků.</p>
      </div>
      <div className="fs-slider-layout">
        <div className="fs-slider-live">
          <span className="fs-overline">LIVE PREVIEW</span>
          <QualitySlider label="Kvalita převodu" value={qualitySliderValue} onChange={setQualitySliderValue}/>
          <div className="fs-slider-shortcuts" aria-label="Ukázkové předvolby kvality">
            {([40,80,95] as const).map(value=><button type="button" key={value}
              className={qualitySliderValue===value?'is-active':''} aria-pressed={qualitySliderValue===value}
              onClick={()=>setQualitySliderValue(value)}>{value===40?'Úsporná':value===80?'Vyvážená':'Vysoká'} · {value} %</button>)}
          </div>
          <p>Vyzkoušej přetažení jezdce, kliknutí do lišty nebo šipky na klávesnici.</p>
        </div>
        <div className="fs-slider-examples">
          <span className="fs-overline">VISUAL STATES</span>
          <div className="fs-slider-state-choices">
            {(['default','hover','focus','disabled'] as const).map(state=><button type="button" key={state}
              aria-pressed={qualitySliderPreview===state} className={qualitySliderPreview===state?'is-selected':''}
              onClick={()=>setQualitySliderPreview(state)}>{state==='default'?'Default':state==='hover'?'Hover':state==='focus'?'Focus':'Disabled'}</button>)}
          </div>
          <QualitySlider label="Náhled stavu" value={80} onChange={()=>{}} state={qualitySliderPreview}/>
          <p>Stav je pouze ilustrační. Komponenta zatím není propojená s nástrojem.</p>
        </div>
      </div>
    </section>

    <footer className="page-footer">Axolotl · Components / Inputs & Forms · Návrh k vizuálnímu schválení</footer>
  </div>
}
