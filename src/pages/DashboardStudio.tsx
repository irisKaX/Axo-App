import { useState } from 'react'
import { HeaderPreview } from './NavigationStudio'
import { WidgetFoundation, type WidgetSize } from '../widgets/WidgetFoundation'
import { type ThemeName } from '../design-system/foundations/colors'
import './dashboard-studio.css'

type Props = {theme:ThemeName;onThemeChange:(theme:ThemeName)=>void;onBack:()=>void}
type WidgetSpec = {id:string;size:WidgetSize;toolCode:string;title:string;tagline:string;description:string}
const dashboardWidgets:WidgetSpec[] = [
  {id:'workspace',size:'large',toolCode:'WORKSPACE',title:'Workspace.',tagline:'Pracovní prostor.',description:'Spravujte poznámky, projekty a úkoly na jednom místě.'},
  {id:'qr',size:'small',toolCode:'QR',title:'QR generátor.',tagline:'QR kódy snadno.',description:'Vytvářejte QR kódy pro webové adresy.'},
  {id:'search',size:'small',toolCode:'FIND PHRASE',title:'Find Phrase.',tagline:'Hledání na webu.',description:'Vyhledejte zvolenou frázi v obsahu webové stránky.'},
  {id:'media',size:'small',toolCode:'MEDIA',title:'Media Tools.',tagline:'Práce s obrázky.',description:'Stahujte a převádějte obrázky z webových stránek.'},
  {id:'capture',size:'small',toolCode:'SCREENSHOT',title:'Screenshot.',tagline:'Snímek stránky.',description:'Pořiďte snímek vybrané webové stránky.'},
  {id:'notebook',size:'large',toolCode:'NOTEBOOK',title:'Notebook.',tagline:'Poznámky a úkoly.',description:'Zapisujte poznámky, úkoly a důležité termíny.'},
]
export default function DashboardStudio({theme,onThemeChange,onBack}:Props){
  const [notice, setNotice] = useState('')
  return <div className="db-page">
    <div className="db-header-slot">
      <HeaderPreview mode={theme} onModeChange={onThemeChange} standalone/>
    </div>
    <main className="db-grid" aria-label="Dashboard · skutečné rozložení widgetů">
      {dashboardWidgets.map(widget=><div className={'db-widget-cell db-widget-cell--'+widget.size} key={widget.id}>
        <WidgetFoundation dashboard size={widget.size} toolCode={widget.toolCode}
          title={widget.title} tagline={widget.tagline} description={widget.description}
          launchLabel={'Otevřít nástroj: '+widget.title} onOpenTool={()=>setNotice('Nástroj '+widget.title+' zatím není připojený.')}/>
      </div>)}
    </main>
    <div className="db-footer"><span className="db-launch-notice" role="status" aria-live="polite">{notice}</span><button className="db-back" type="button" onClick={onBack} aria-label="Zpět do design katalogu"><span aria-hidden="true">←</span> Zpět do katalogu</button></div>
  </div>
}
