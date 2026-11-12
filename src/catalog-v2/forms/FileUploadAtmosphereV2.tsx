// The approved Atmosphere composition, with local file selection only.
import { useId, useRef, useState, type CSSProperties, type DragEvent } from 'react'
import { AxoIcon } from '../../components/AxoIcon'
import { spacing } from '../../design-system/foundations/spacing'

interface FileUploadProps {
  files: File[]
  onChange: (files: File[]) => void
  accept?: string
  maxSize?: number
  error?: string
  onError?: (message: string | undefined) => void
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const unit = bytes < 1024 * 1024 ? 'kB' : 'MB'
  return `${(bytes / (unit === 'kB' ? 1024 : 1024 * 1024)).toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} ${unit}`
}

function acceptsFile(file: File, accept: string) {
  const rules = accept.toLowerCase().split(',').map(rule => rule.trim()).filter(Boolean)
  return !rules.length || rules.some(rule => {
    if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule)
    if (rule.endsWith('/*')) return file.type.toLowerCase().startsWith(rule.slice(0, -1))
    return file.type.toLowerCase() === rule
  })
}

const fileKey = (file: File) => JSON.stringify([file.name, file.size, file.type, file.lastModified])

export default function FileUploadAtmosphereV2({ files, onChange, accept = '.png,.jpg,.jpeg,.webp,.pdf,.csv,.txt,.md', maxSize = 10 * 1024 * 1024, error, onError }: FileUploadProps) {
  const uid = useId()
  const input = useRef<HTMLInputElement>(null)
  const action = useRef<HTMLButtonElement>(null)
  const dragDepth = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [validationError, setValidationError] = useState<string>()
  const message = validationError || error
  const state = dragging ? 'drag-over' : message ? 'error' : files.length ? 'ready' : 'empty'
  const describedBy = uid + '-hint' + (message ? ' ' + uid + '-error' : '')
  const acceptedTypes = accept.split(',').map(rule => rule.trim().replace(/^\./, '').toUpperCase()).filter(Boolean).join(', ')

  function addFiles(incoming: File[]) {
    if (!incoming.length) return
    let nextError: string | undefined
    for (const file of incoming) {
      if (!acceptsFile(file, accept)) nextError = `Soubor „${file.name}“ má nepodporovaný typ. Vyber jiný soubor.`
      else if (file.size > maxSize) nextError = `Soubor „${file.name}“ překračuje limit ${formatFileSize(maxSize)}. Vyber menší soubor.`
      if (nextError) break
    }
    setValidationError(nextError)
    onError?.(nextError)
    // Keep the existing selection when any file in the incoming batch is invalid.
    if (nextError) return
    const seen = new Set(files.map(fileKey))
    const added = incoming.filter(file => {
      const key = fileKey(file)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    onChange([...files, ...added])
  }

  const isFileDrag = (event: DragEvent<HTMLDivElement>) => Array.from(event.dataTransfer.types).includes('Files')

  return <div className="v2f-upload" style={{ '--v2f-upload-gap': spacing[6] + 'px' } as CSSProperties} data-state={state} role="group" aria-labelledby={uid + '-heading'} aria-describedby={describedBy}
    onDragEnter={event => {
      if (!isFileDrag(event)) return
      event.preventDefault()
      dragDepth.current += 1
      setDragging(true)
    }}
    onDragOver={event => { if (isFileDrag(event)) { event.preventDefault(); event.dataTransfer.dropEffect = 'copy' } }}
    onDragLeave={event => {
      if (!isFileDrag(event)) return
      dragDepth.current = Math.max(0, dragDepth.current - 1)
      if (!dragDepth.current) setDragging(false)
    }}
    onDrop={event => {
      event.preventDefault()
      dragDepth.current = 0
      setDragging(false)
      addFiles(Array.from(event.dataTransfer.files))
    }}>
    <div className="v2f-upload-copy">
      <p className="v2f-upload-eyebrow">AXOLOTL / WORKSPACE</p>
      <h3 className="v2f-upload-headline" id={uid + '-heading'}>Upload files.<span>Work smarter.</span></h3>
      <p className="v2f-upload-support">Všechny potřebné soubory na jednom místě.</p>
    </div>
    <div className="v2f-upload-content">
      <input ref={input} type="file" hidden accept={accept} multiple aria-label="Vybrat soubory" aria-describedby={describedBy}
        aria-invalid={Boolean(message)} onChange={event => { addFiles(Array.from(event.currentTarget.files ?? [])); event.currentTarget.value = '' }} />
      <button type="button" ref={action} className="v2f-upload-target" aria-label={files.length ? 'Přidat soubory' : 'Vybrat soubory'} aria-describedby={describedBy} aria-invalid={Boolean(message)} onClick={() => input.current?.click()}>
        <svg className="v2f-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V3m-4 4 4-4 4 4M4 17v3h16v-3" /></svg>
        <span className="v2f-upload-target-copy"><strong>{dragging ? 'Pusť soubory sem' : files.length ? 'Přidej další soubory' : 'Přetáhni soubory sem'}</strong>
          <span id={uid + '-hint'}>{acceptedTypes || 'Všechny typy souborů'} · max. {formatFileSize(maxSize)} / soubor</span>
        </span>
        <span className="v2-button v2-button--secondary" aria-hidden="true"><span className="v2-button__content"><AxoIcon name="plus" size={16} />{files.length ? 'Přidat soubory' : 'Vybrat soubory'}</span></span>
      </button>
      {files.length > 0 && <ul className="v2f-upload-files" aria-label="Vybrané soubory">
        {files.map((file, index) => <li className="v2f-upload-file" key={fileKey(file)}>
          <AxoIcon name="file-text" size={20} />
          <div className="v2f-upload-file-info"><strong>{file.name}</strong><span>{formatFileSize(file.size)}</span></div>
          <button type="button" className="v2f-upload-remove" aria-label={'Odebrat ' + file.name} onClick={() => {
            onChange(files.filter((_, fileIndex) => fileIndex !== index))
            action.current?.focus()
          }}><AxoIcon name="close" size={18} /></button>
        </li>)}
      </ul>}
      {message && <p className="v2f-upload-error" role="alert" id={uid + '-error'}><AxoIcon name="alert-circle" size={18} /><span>{message}</span></p>}
      <div className="v2f-upload-status" role="status" aria-atomic="true">
        {files.length > 0 && !message && <><AxoIcon name="check" size={20} /><span>Soubory jsou připravené / {files.length}</span></>}
      </div>
    </div>
  </div>
}
