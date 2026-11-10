import { useState, type ReactNode } from 'react'
import { AxoButton } from '../components/Buttons'
import { FormCheckbox, FormInput, FormTextarea } from '../components/FormControls'
import { ToolShell } from './ToolShell'
import { DataWorkspaceLayout, EditorWorkspaceLayout, FormResultLayout, WorkspaceLayout } from './archetypes'
import { ToolActionBar, ToolEmptyState, ToolLoadingState, ToolPanel, ToolStatus, ToolToolbar, type LayoutState } from './primitives'
import './layout-demonstrations.css'

export const layoutExamples = [
  { id: 'app-shell', label: 'App Shell', description: 'Sdílená navigace, téma a skutečný viewport.' },
  { id: 'tool-shell', label: 'Tool Shell', description: 'Volitelná hlavička, toolbar a akce kolem pracovní plochy.' },
  { id: 'workspace', label: 'Workspace Layout', description: 'Nastavení a pracovní obsah. Panely se posouvají samostatně.' },
  { id: 'form-result', label: 'Form → Result Layout', description: 'Vstup a výsledek v kompaktní nebo rozšířené kompozici.' },
  { id: 'data', label: 'Data Workspace Layout', description: 'Filtry, seznam, detail a hromadné akce.' },
  { id: 'editor', label: 'Editor Workspace Layout', description: 'Editor s volitelnou kontextovou navigací a inspektorem.' },
  { id: 'image-converter', label: 'Image Converter', description: 'První integrovaný nástroj. Výběr souborů funguje; konverze je ukázka.' },
  { id: 'dashboard', label: 'Dashboard Grid', description: 'Existující dashboard se skutečnými widgety a sdíleným AppShell.' },
] as const

const stateLabels: Record<LayoutState, string> = { empty: 'Prázdný stav', ready: 'Připraveno', processing: 'Zpracování · ukázka', success: 'Ukázkový výsledek', error: 'Ukázková chyba · zkuste obnovit ukázku', disabled: 'Ovládání vypnuto · ukázka' }
const sampleRows = Array.from({ length: 36 }, (_, i) => ({ id: i + 1, name: i === 0 ? 'Velmi dlouhý ilustrační název dokumentu pro ověření zalamování v pracovním panelu' : `Ilustrační dokument ${i + 1}`, value: `/ukazka/stranka-${i + 1}` }))

/** Illustrations of layout slots, deliberately not implementations of future tools. */
export function LayoutDemonstration({ id, initialState, panels, compact }: { id: string; initialState: LayoutState; panels: boolean; compact: boolean }) {
  const [state, setState] = useState(initialState)
  const [text, setText] = useState(initialState === 'empty' ? '' : 'Poznámka pro ukázku rozložení. Tento text lze upravit lokálně.')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [activeRow, setActiveRow] = useState(1)
  const [activeNote, setActiveNote] = useState('Pracovní poznámka')
  const disabled = state === 'disabled' || state === 'processing'
  const label = layoutExamples.find(item => item.id === id)?.label ?? 'Tool Shell'
  const populated = state === 'ready' || state === 'success' || state === 'disabled'
  const feedback = (children: ReactNode) => state === 'processing' ? <ToolLoadingState/> : state === 'empty' ? <ToolEmptyState title="Zatím bez obsahu">Ilustrační data zobrazíte přepnutím stavu v katalogu.</ToolEmptyState> : state === 'error' ? <ToolEmptyState title="Ukázková chyba">Obsah se nepodařilo načíst. Obnovte ilustrační data.</ToolEmptyState> : children
  const status = <ToolStatus state={state}>{stateLabels[state]} · Ilustrační data</ToolStatus>
  const reset = <AxoButton variant="outline" onClick={() => { setState('ready'); setSearch(''); setSelected([]) }}>Obnovit ukázku</AxoButton>
  const heading = <><h1>{label}</h1><p>Ukázka rozložení · Ilustrační data · bez backendu</p></>
  const footer = <ToolActionBar>{status}{reset}</ToolActionBar>

  if (id === 'app-shell') return <div className="axo-demo-root" data-layout-demo={id}><ToolPanel label="Obsah aplikace"><h1>App Shell</h1><p>Skutečná sdílená navigace a pracovní plocha aplikace.</p>{status}{feedback(<p>Ilustrační obsah bez vynucené struktury nástroje.</p>)}</ToolPanel></div>

  let content: ReactNode
  let toolbar: ReactNode
  if (id === 'workspace') {
    content = <WorkspaceLayout settings={panels && <ToolPanel label="Nastavení ukázky"><h2>Nastavení</h2><FormInput label="Název ukázky" value={text} disabled={disabled} onChange={event => setText(event.target.value)}/><p>Podpůrný panel lze vynechat. Na mobilu následuje pracovní obsah.</p></ToolPanel>}>
      <ToolPanel label="Pracovní obsah"><h2>Pracovní obsah</h2>{feedback(<ul className="axo-demo-list">{sampleRows.map(row => <li key={row.id}><strong>{row.name}</strong><span>Ilustrační data · {row.value}</span></li>)}</ul>)}</ToolPanel>
    </WorkspaceLayout>
  } else if (id === 'form-result') {
    content = <FormResultLayout presentation={compact ? 'compact' : 'expanded'} input={<ToolPanel label="Vstup"><h2>Vstup</h2><FormTextarea label="Ukázkový text" value={text} disabled={disabled} onChange={event => setText(event.target.value)}/><AxoButton disabled={disabled || !text.trim()} onClick={() => setState('success')}>Ukázat výsledek</AxoButton></ToolPanel>} settings={panels && <ToolPanel label="Volitelná nastavení"><h2>Volitelná nastavení</h2><p>Tento slot může nástroj použít pro doplňující vstupy.</p></ToolPanel>} result={<ToolPanel label="Výstup"><h2>Výstup</h2>{feedback(<><p>Ilustrační výstup ze zadaného textu:</p><pre className="axo-demo-result">{text}</pre><AxoButton variant="outline" disabled={disabled} onClick={() => { setText(''); setState('empty') }}>Vymazat ukázku</AxoButton></>)}</ToolPanel>}/>
  } else if (id === 'data') {
    toolbar = <ToolToolbar><h2>Datová ukázka</h2><span>Lokální filtrování a výběr řádků</span></ToolToolbar>
    const rows = populated ? sampleRows.filter(row => `${row.name} ${row.value}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : []
    content = <DataWorkspaceLayout filters={<FormInput label="Hledat v ilustračních datech" type="search" value={search} disabled={disabled} onChange={event => setSearch(event.target.value)}/>} details={panels && <ToolPanel label="Detail řádku"><h2>Detail řádku</h2><p>{populated ? sampleRows[activeRow - 1].name : 'Vyberte ilustrační řádek.'}</p><p>Ilustrační data · žádná analýza URL neprobíhá.</p></ToolPanel>} bulkActions={selected.length > 0 && <ToolActionBar><span>{selected.length} vybraných řádků</span><AxoButton variant="outline" onClick={() => setSelected([])}>Zrušit výběr</AxoButton></ToolActionBar>}>
      <ToolPanel label="Datové řádky">{feedback(rows.length ? <div className="axo-demo-table-scroll" tabIndex={0} role="region" aria-label="Tabulka ilustračních dat"><table className="axo-demo-table"><thead><tr><th scope="col">Výběr</th><th scope="col">Dokument</th><th scope="col">Cesta</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td><FormCheckbox label={'Vybrat řádek ' + row.id} checked={selected.includes(row.id)} disabled={disabled} onChange={checked => setSelected(current => checked ? [...current, row.id] : current.filter(value => value !== row.id))}/></td><td><button type="button" disabled={disabled} className="axo-demo-row-link" aria-pressed={activeRow === row.id} onClick={() => setActiveRow(row.id)}>{row.name}</button></td><td>{row.value}</td></tr>)}</tbody></table></div> : <ToolEmptyState title="Žádné shody">Změňte hledaný text.</ToolEmptyState>)}</ToolPanel>
    </DataWorkspaceLayout>
  } else if (id === 'editor') {
    toolbar = <ToolToolbar><h2>{activeNote}</h2><span>Lokální text · po zavření se neukládá</span></ToolToolbar>
    content = <EditorWorkspaceLayout navigation={panels && <ToolPanel label="Kontextová navigace"><h2>Poznámky · ukázka</h2>{['Pracovní poznámka', 'Kontrolní seznam', 'Poznámky z porady'].map(note => <button type="button" key={note} className="axo-demo-note" disabled={disabled} aria-pressed={activeNote === note} onClick={() => { setActiveNote(note); setText(note + '\nIlustrační obsah upravitelný lokálně.'); setState('ready') }}>{note}</button>)}</ToolPanel>} inspector={panels && <ToolPanel label="Inspektor"><h2>Inspektor</h2><p>{text.length} znaků v lokálním textu</p><p>Volitelný panel s kontextem editoru.</p></ToolPanel>}>
      <ToolPanel label="Editor">{state === 'processing' || state === 'error' ? feedback(null) : <><FormTextarea label="Editor ukázky" value={text} placeholder="Prázdná poznámka…" disabled={disabled} onChange={event => { setText(event.target.value); setState('ready') }}/>{state === 'empty' && <ToolEmptyState title="Prázdná poznámka">Začněte psát do editoru.</ToolEmptyState>}</>}</ToolPanel>
    </EditorWorkspaceLayout>
  } else {
    toolbar = panels && <ToolToolbar><span>Volitelný toolbar</span>{reset}</ToolToolbar>
    content = <ToolPanel label="Pracovní plocha nástroje">{feedback(<><h2>Obsah nástroje</h2><p>Ilustrační data. ToolShell nevynucuje nastavení, editor ani jiné regiony.</p></>)}</ToolPanel>
  }
  return <div className="axo-demo-root" data-layout-demo={id}><ToolShell label={label} heading={heading} toolbar={toolbar} footer={footer}>{content}</ToolShell></div>
}
