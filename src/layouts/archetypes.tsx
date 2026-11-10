import type { ReactNode } from 'react'

type PanelSize = 'compact' | 'default' | 'wide'
export function WorkspaceLayout({ settings, children, panelSize = 'default' }: { settings?: ReactNode; children: ReactNode; panelSize?: PanelSize }) {
  return <div className={'axo-workspace-layout axo-split axo-panel-size--' + panelSize} data-settings={Boolean(settings)}>
    {settings && <div className="axo-layout-support">{settings}</div>}
    <div className="axo-layout-primary">{children}</div>
  </div>
}

export function FormResultLayout({ input, result, settings, presentation = 'expanded' }: { input: ReactNode; result: ReactNode; settings?: ReactNode; presentation?: 'compact' | 'expanded' }) {
  return <div className={'axo-form-result-layout axo-split is-' + presentation}>
    <div className="axo-layout-support">{input}{settings}</div>
    <div className="axo-layout-primary">{result}</div>
  </div>
}

export function DataWorkspaceLayout({ children, filters, details, bulkActions }: { children: ReactNode; filters?: ReactNode; details?: ReactNode; bulkActions?: ReactNode }) {
  return <div className="axo-data-workspace-layout">
    {filters && <div className="axo-layout-filters">{filters}</div>}
    <div className="axo-data-split" data-details={Boolean(details)}>
      <div className="axo-layout-primary">{children}</div>
      {details && <div className="axo-layout-support">{details}</div>}
    </div>
    {bulkActions && <div className="axo-layout-bulk">{bulkActions}</div>}
  </div>
}

export function EditorWorkspaceLayout({ children, navigation, inspector }: { children: ReactNode; navigation?: ReactNode; inspector?: ReactNode }) {
  return <div className="axo-editor-workspace-layout" data-navigation={Boolean(navigation)} data-inspector={Boolean(inspector)}>
    {navigation && <div className="axo-editor-navigation">{navigation}</div>}
    <div className="axo-layout-primary">{children}</div>
    {inspector && <div className="axo-editor-inspector">{inspector}</div>}
  </div>
}
