import type { ReactNode } from 'react'
import './layout-system.css'

export interface ToolShellProps {
  label: string
  children: ReactNode
  heading?: ReactNode
  toolbar?: ReactNode
  footer?: ReactNode
}

/** Optional chrome around a tool's composition; state belongs to the tool. */
export function ToolShell({ label, children, heading, toolbar, footer }: ToolShellProps) {
  return <section className="axo-tool-shell" aria-label={label}>
    {heading && <header className="axo-tool-heading">{heading}</header>}
    {toolbar && <div className="axo-tool-toolbar-slot">{toolbar}</div>}
    <div className="axo-tool-body">{children}</div>
    {footer && <footer className="axo-tool-footer">{footer}</footer>}
  </section>
}
