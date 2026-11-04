import { useState } from 'react'
import { FormInput, FormTextarea, FormSelect, FormCheckbox, FormRadioGroup, FormSwitch } from '../components/FormControls'
import { AxoButton } from '../components/Buttons'
import './forms-studio.css'

const regions=[
  {value:'praha',label:'Praha'},
  {value:'brno',label:'Brno'},
  {value:'ostrava',label:'Ostrava'},
  {value:'other',label:'Jiné město',disabled:true},
]
const viewModes=[
  {value:'comfortable',label:'Comfortable',description:'Vzdušnější pracovní rozložení'},
  {value:'compact',label:'Compact',description:'Více informací na obrazovce'},
  {value:'focus',label:'Focus',description:'Méně rozptýlení a více prostoru pro obsah'},
]

export default function FormsStudio() {
  const [search,setSearch]=useState('')
  const [url,setUrl]=useState('')
  const [city,setCity]=useState('')
  const [description,setDescription]=useState('')
  const [subscribe,setSubscribe]=useState(true)
  const [agreement,setAgreement]=useState(false)
  const [view,setView]=useState('comfortable')
  const [autosave,setAutosave]=useState(true)
  const [notifications,setNotifications]=useState(false)
  const [error,setError]=useState(false)
  const [status,setStatus]=useState('Všechny změny jsou pouze ukázkové. Nic se nikam neodesílá.')
  const validUrl = url.trim().length===0 || /^https?:\/\/.+\..+/.test(url.trim())
  const submit=()=>{
    setError(true)
    if(!url.trim()||!validUrl||!agreement){setStatus('Doplň platnou URL a potvrď souhlas.');return}
    setStatus('Ukázkový formulář byl úspěšně ověřen.')
  }

  return <div className="fs-page">
    <p className="eyebrow">LIBRARY / COMPONENTS / INPUTS & FORMS</p>
    <h1>Inputs <span className="heading-accent">& Forms.</span></h1>
    <p className="intro">Formulářové prvky v Neo Iris: měkké radiusy, jasná hierarchie a vlastní vzhled dropdownu. Všechny ukázky jsou interaktivní a připravené k vizuálnímu posouzení.</p>
    <div className="fs-status">DESIGN CANDIDATE · KEYBOARD ACCESSIBLE · LIGHT / DARK</div>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>01 / TEXT & URL INPUTS</span><h2>Textová pole a validace</h2><p>Stejné odsazení, label nad polem a viditelný focus. Validace nikdy nespoléhá pouze na barvu.</p></div>
      <div className="fs-field-grid">
        <FormInput label="Hledat v nástrojích" placeholder="Například Metadata" value={search} onChange={e=>setSearch(e.target.value)} hint="Standardní textové pole"/>
        <FormInput label="URL adresa" type="url" required placeholder="https://www.o2.cz" value={url} onChange={e=>{setUrl(e.target.value);setError(false)}} error={error&&(!url.trim()||!validUrl)?'Zadej platnou URL včetně https://':undefined} success={url.trim()&&validUrl?'URL vypadá správně':undefined}/>
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
          <FormCheckbox label="Odebírat novinky" description="Dostávat produktové aktualizace" checked={subscribe} onChange={setSubscribe}/>
          <FormCheckbox label="Souhlasím s podmínkami" description="Povinná položka ukázkového formuláře" checked={agreement} onChange={v=>{setAgreement(v);setError(false)}}/>
          {error&&!agreement&&<p className="fs-error-message" role="alert">Potvrď souhlas, aby formulář prošel.</p>}
          <FormCheckbox label="Nedostupná možnost" checked={false} onChange={()=>{}} disabled/>
        </div>
        <div className="fs-choice-box"><span className="fs-overline">RADIO GROUP</span>
          <FormRadioGroup label="Hustota zobrazení" name="axolotl-density" options={viewModes} value={view} onChange={setView}/>
        </div>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>05 / TOGGLE SWITCH</span><h2>Nastavení zapnuto / vypnuto</h2><p>Switch mění okamžitý stav. Kontrola pomocí klávesnice funguje přes nativní přístupný input, vzhled je kompletně vlastní.</p></div>
      <div className="fs-toggles">
        <FormSwitch label="Automatické ukládání" description={autosave?'Zapnuto · změny se ukládají průběžně':'Vypnuto · změny se neukládají'} checked={autosave} onChange={setAutosave}/>
        <FormSwitch label="Notifikace" description={notifications?'Zapnuto':'Vypnuto'} checked={notifications} onChange={setNotifications}/>
        <FormSwitch label="Uzamčené nastavení" description="Aktuálně nelze změnit" checked={true} onChange={()=>{}} disabled/>
      </div>
    </section>

    <section className="panel fs-panel">
      <div className="fs-section-head"><span>06 / COMPLETE FORM</span><h2>Formulář v kontextu</h2><p>Společný styl všech prvků a jasné chybové i úspěšné zprávy.</p></div>
      <div className="fs-form-preview">
        <div><span className="fs-overline">WORKSPACE · FORM PREVIEW</span><h3>Nová analýza<span>.</span></h3><p>Vyplň URL, vyber město a potvrď souhlas. Nic se neodesílá.</p></div>
        <div className="fs-preview-controls">
          <div className="fs-preview-readonly"><span>URL</span><strong>{url||'Zatím nevyplněno'}</strong></div>
          <div className="fs-preview-readonly"><span>MĚSTO</span><strong>{regions.find(o=>o.value===city)?.label??'Nevybráno'}</strong></div>
          <AxoButton onClick={submit} iconRight="arrow-right">Ověřit formulář</AxoButton>
          <div className="fs-form-status" role="status">{status}</div>
        </div>
      </div>
    </section>

    <details className="fs-technical"><summary>Technické specifikace <span>⌄</span></summary><div><p>Komponenty jsou v <code>src/components/FormControls.tsx</code>. Používají Colors v2, Poppins a radiusy odpovídající Neo Iris. Žádný nativní vizuální Select.</p><p>Dropdown používá listbox, klávesy Arrow Up/Down, Home, End, Enter, Escape, fokus a kliknutí mimo nabídku. Checkbox, Radio a Switch používají nativní vstupní prvky pro sémantiku a focus.</p><p>Vizuální návrhy čekají na tvoje schválení; nepřepisují zatím globální podobu ostatních formulářů.</p></div></details>
    <footer className="page-footer">Axolotl · Components / Inputs & Forms · Design candidate</footer>
  </div>
}
