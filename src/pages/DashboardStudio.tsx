import { useState } from 'react'
import { HeaderPreview } from './NavigationStudio'
import { WidgetFoundation, type WidgetSize } from '../widgets/WidgetFoundation'
import { type ThemeName } from '../design-system/foundations/colors'
import './dashboard-studio.css'

type Props = {theme:ThemeName;onThemeChange:(theme:ThemeName)=>void;onBack:()=>void}
type WidgetSpec = {id:string;size:WidgetSize;title:string;accent:string;description:string}
const dashboardWidgets:WidgetSpec[] = [
  {id:'workspace',size:'large',title:'My workspace.',accent:'Stay organized.',description:'Prostor pro budoucí obsah widgetu.'},
  {id:'qr',size:'small',title:'QR tools.',accent:'Create faster.',description:'Prostor pro budoucí obsah widgetu.'},
  {id:'search',size:'small',title:'Find Phrase.',accent:'Search smarter.',description:'Prostor pro budoucí obsah widgetu.'},
  {id:'media',size:'small',title:'Media tools.',accent:'Work better.',description:'Prostor pro budoucí obsah widgetu.'},
  {id:'capture',size:'small',title:'Screenshot.',accent:'Capture more.',description:'Prostor pro budoucí obsah widgetu.'},
  {id:'notebook',size:'large',title:'Notebook.',accent:'Think clearly.',description:'Prostor pro budoucí obsah widgetu.'},
]

export default function DashboardStudio({theme,onThemeChange,onBack}:Props){
  const [notice, setNotice] = useState('')
  return <div className="db-page">
    <div className="db-header-slot">
      <HeaderPreview mode={theme} onModeChange={onThemeChange} standalone/>
    </div>
    <main className="db-grid" aria-label="Dashboard · skutečné rozložení widgetů">
      {dashboardWidgets.map(widget=><div className={'db-widget-cell db-widget-cell--'+widget.size} key={widget.id}>
        <WidgetFoundation dashboard size={widget.size} eyebrow="AXOLOTL / WIDGET"
          title={widget.title} accentTitle={widget.accent} description={widget.description}
          launchLabel={'Otevřít nástroj: '+widget.title} onOpenTool={()=>setNotice('Nástroj '+widget.title+' zatím není připojený.')}/>
      </div>)}
    </main>
    <div className="db-footer"><span className="db-launch-notice" role="status" aria-live="polite">{notice}</span><button className="db-back" type="button" onClick={onBack} aria-label="Zpět do design katalogu"><span aria-hidden="true">←</span> Zpět do katalogu</button></div>
  </div>
}
