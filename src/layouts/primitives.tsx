import type { ReactNode } from 'react'
import { AxoIcon } from '../components/AxoIcon'

export type LayoutState = 'empty' | 'ready' | 'processing' | 'success' | 'error' | 'disabled'
type SlotProps = { children: ReactNode; className?: string }

/** A named, keyboard-scrollable region; shared by settings, editors and results. */
export function ToolPanel({ label, children, className = '' }: SlotProps & { label: string }) {
  return <section className={'axo-tool-panel ' + className} aria-label={label} tabIndex={0}>{children}</section>
}

export function ToolToolbar({ children }: SlotProps) {
  return <div className="axo-tool-toolbar">{children}</div>
}

export function ToolActionBar({ children, className = '' }: SlotProps) {
  return <div className={'axo-tool-action-bar ' + className}>{children}</div>
}

export function ToolStatus({ state, children, className = '' }: SlotProps & { state: LayoutState }) {
  return <div className={'axo-tool-status ' + className} data-state={state} role={state === 'error' ? 'alert' : 'status'}>{children}</div>
}

export function ToolEmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="axo-tool-empty"><AxoIcon name="info" size={24}/><h2>{title}</h2>{children && <p>{children}</p>}</div>
}

export function ToolLoadingState({ label = 'Načítání ukázky…' }: { label?: string }) {
  return <div className="axo-tool-empty" role="status"><AxoIcon name="refresh" size={24}/><p>{label}</p></div>
}
