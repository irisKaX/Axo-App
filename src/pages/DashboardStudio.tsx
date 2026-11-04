import { HeaderPreview } from './NavigationStudio'
import { type ThemeName } from '../design-system/foundations/colors'
import './dashboard-studio.css'

type Props = {theme:ThemeName;onThemeChange:(theme:ThemeName)=>void;onBack:()=>void}
const widgets = [
  {id:'widget1',label:'Widget 1'},
  {id:'widget2',label:'Widget 2'},
  {id:'widget3',label:'Widget 3'},
  {id:'widget4',label:'Widget 4'},
  {id:'widget5',label:'Widget 5'},
  {id:'widget6',label:'Widget 6'}
]
export default function DashboardStudio({theme,onThemeChange,onBack}:Props){
  return <div className="db-page">
    <div className="db-header-slot">
      <HeaderPreview mode={theme} onModeChange={onThemeChange} standalone/>
    </div>
    <main className="db-grid" aria-label="Dashboard · náhled rozložení widgetů">
      <section className="db-widget db-office" aria-label="Axolotl Office">
        <span className="db-widget-symbol" aria-hidden="true">▤</span>
        <div className="db-widget-foot"><h1>Axolotl Office</h1><p>Hlavní pracovní prostor · ukázka rozložení</p></div>
      </section>
      {widgets.map(item=><section className={'db-widget db-'+item.id} key={item.id}>
        <span className="db-widget-symbol" aria-hidden="true">▤</span>
        <div className="db-widget-foot"><h2>{item.label}</h2></div>
      </section>)}
    </main>
    <button className="db-back" type="button" onClick={onBack} aria-label="Zpět do design katalogu"><span aria-hidden="true">←</span> Zpět do katalogu</button>
  </div>
}
