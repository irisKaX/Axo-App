import type { ReactNode, SVGProps } from 'react'
import './axo-icon.css'

/** One shared source for all interface icon geometry. */
export const iconGroups = {
  'Akce': ['plus','copy','download','arrow-right','check','trash','refresh','settings','close','search','external-link','more-horizontal'],
  'Navigace': ['menu','home','workspace','image','shield-check','globe','tabs','chevron-down','file-text','layout-grid','bell'],
  'Obsah a nástroje': ['qr-code','star','folder','calendar','pencil','filter','info','alert-circle','loader']
} as const
export type AxoIconName = typeof iconGroups[keyof typeof iconGroups][number]
export const iconNames = Object.values(iconGroups).flat() as AxoIconName[]

const artwork: Record<AxoIconName,ReactNode> = {
  plus:<path d="M12 5v14M5 12h14"/>,
  copy:<><rect className="axo-glyph-copy-front" x="8" y="8" width="12" height="12" rx="2"/><path className="axo-glyph-copy-back" d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
  download:<><path className="axo-glyph-download-arrow" d="M12 3v12m-4-4 4 4 4-4"/><path className="axo-glyph-download-tray" d="M4 17v3h16v-3"/></>,
  'arrow-right':<><path d="M4 12h16M14 6l6 6-6 6"/></>,
  check:<path d="m5 12 4 4L19 6"/>,
  trash:<><path d="M4 7h16M10 4h4m-8 3 1 13h10l1-13M10 10v7m4-7v7"/></>,
  refresh:<><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.4 9A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 12.6-2"/></>,
  settings:<><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></>,
  close:<path d="M5 5l14 14M19 5 5 19"/>,
  search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  'external-link':<><path d="M13 5h6v6M19 5l-9 9"/><path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></>,
  'more-horizontal':<><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  menu:<path d="M4 6h16M4 12h16M4 18h16"/>,
  home:<><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/></>,
  workspace:<><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  image:<><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8" cy="9" r="1"/><path d="m3 17 6-5 4 3 3-4 5 5"/></>,
  'shield-check':<><path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></>,
  globe:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18m0-18c5 5 5 13 0 18"/></>,
  tabs:<><rect x="6" y="6" width="15" height="15" rx="2"/><path d="M17 6V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2"/></>,
  'chevron-down':<path d="m6 9 6 6 6-6"/>,
  'file-text':<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  'layout-grid':<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  'qr-code':<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v3m-3 3h4m-7 0v1"/></>,
  star:<path d="m12 2 3.1 6.5 7.1 1-5.1 5 1.2 7-6.3-3.4-6.3 3.4 1.2-7-5.1-5 7.1-1z"/>,
  folder:<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3z"/>,
  calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/></>,
  pencil:<><path d="m15 5 4 4M4 20l4.5-1 11-11a2.8 2.8 0 0 0-4-4l-11 11z"/></>,
  filter:<><path d="M3 5h18M6 12h12m-9 7h6"/></>,
  info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/></>,
  'alert-circle':<><circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4v.1"/></>,
  loader:<path d="M12 3a9 9 0 1 0 9 9"/>
}
export const animatedIconNames: readonly AxoIconName[] = ['copy','download','arrow-right','plus','refresh','settings','check','close','trash','loader']
export const iconTones = ['inherit','muted','brand','success','warning','danger','info'] as const
export type AxoIconTone = typeof iconTones[number]

export interface AxoIconProps extends Omit<SVGProps<SVGSVGElement>,'name'> {
  name:AxoIconName
  size?:number
  strokeWidth?:number
  tone?:AxoIconTone
}
export function AxoIcon({name,size=18,strokeWidth=1.8,tone='inherit',className='',...rest}:AxoIconProps){
  return <svg {...rest} className={['axo-icon','axo-icon--'+tone,name==='loader'?'axo-button-spinner':'',className].filter(Boolean).join(' ')} data-icon={name}
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    aria-hidden={rest['aria-label']?undefined:true} role={rest['aria-label']?'img':undefined}>
    {artwork[name]}
  </svg>
}
