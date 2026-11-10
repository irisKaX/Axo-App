import type { ThemeName } from '../design-system/foundations/colors'
import { ImageConverterLayout } from '../pages/ImageConverterLayout'
import { AppShell } from './AppShell'
import { LayoutDemonstration, layoutExamples } from './LayoutDemonstrations'
import DashboardStudio from '../pages/DashboardStudio'
import type { LayoutState } from './primitives'

export interface ToolRoute { id: string; state: LayoutState; panels: boolean; compact: boolean }
export function readToolRoute(): ToolRoute | null {
  const query = new URLSearchParams(location.search)
  const id = query.get('tool') ?? query.get('preview')
  if (!id || !layoutExamples.some(item => item.id === id)) return null
  const state = query.get('state') ?? 'empty'
  return { id, state: (['empty', 'ready', 'processing', 'success', 'error', 'disabled'].includes(state) ? state : 'empty') as LayoutState, panels: query.get('panels') !== 'hidden', compact: query.get('presentation') === 'compact' }
}
export function ToolPage({ route, theme, onThemeChange }: { route: ToolRoute; theme: ThemeName; onThemeChange: (theme: ThemeName) => void }) {
  if(route.id==='dashboard')return <DashboardStudio theme={theme} onThemeChange={onThemeChange} onBack={()=>{location.href=location.pathname}}/>
  if(route.id!=='image-converter')return <AppShell theme={theme} onThemeChange={onThemeChange} pageLabel={layoutExamples.find(item=>item.id===route.id)?.label}>
    <LayoutDemonstration id={route.id} initialState={route.state} panels={route.panels} compact={route.compact}/>
  </AppShell>
  return <ImageConverterLayout theme={theme} onThemeChange={onThemeChange} initialState={route.state}/>
}
