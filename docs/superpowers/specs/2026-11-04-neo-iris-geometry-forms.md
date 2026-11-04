# AXO-APP: Neo Iris Geometry System + Inputs & Forms Redesign

**Repozitář:** `irisKaX/Axo-App`

## Cíl

Sjednoť pravidla zaoblení napříč celým design systémem Axolotlu a vizuálně přepracuj sekci **Components → Inputs & Forms**.

Současné formuláře fungují, ale vizuálně působí nedokončeně. Zaoblení je příliš malé, některé prvky nejsou konzistentní a při focusu mají inputy dva viditelné obrysy.

Cílový styl: **Neo Iris. Soft, rounded, premium, clean.**

Nejde o nový designový směr. Jde o zpřesnění a sjednocení stávajícího schváleného systému.

## 1. Centralizuj Border Radius

Proveď audit `src/design-system/foundations/spacing.ts`, souvisejících CSS souborů a používaných radiusů.

Zachovej jednu centrální škálu:

| Token | Radius | Použití |
|---|---|---|
| radius.xs | 8px | Drobné vnitřní prvky |
| radius.sm | 12px | Tooltip, malé ovládací prvky |
| radius.md | 18px | Menší elementy |
| radius.lg | 24px | Input, Select, Textarea, Cards, Widgets |
| radius.xl | 32px | Velké karty, panely, formulářové kontejnery |
| radius.xxl | 40px | Hero a výrazné plochy |
| radius.pill | 9999px | Textová tlačítka, chips |
| radius.round | 50% | Kulatá ikonová tlačítka, kruhové prvky |

Používej tyto tokeny konzistentně. Nevytvářej náhodné nové radiusy pro každou komponentu.

Kde už je určitá geometrie schválená a funguje, zachovej její chování.

## 2. Redesign Inputs & Forms

Přepracuj vzhled těchto komponent:

- Text Input a URL Input
- Textarea
- Custom Select
- Checkbox
- Radio Buttons
- Toggle Switch
- Complete Form

### Input / Select / Textarea

- Radius: 24px
- Výška standardního pole: přibližně 52px
- Horizontální padding: 18–20px
- Neutrální surface z Colors v2
- Jemný, čitelný výchozí border
- Hover: zvýraznění borderu
- Focus: jeden čistý a jednoznačně viditelný indikátor
- Error: #FF0A54
- Success: #9EF01A
- Disabled: správná čitelnost a neaktivní stav

**Nesmí vzniknout dvojitý focus border.**

Nepoužívej zároveň výrazný border a další široký outline. Preferuj jeden vizuálně sjednocený focus indikátor, který zároveň splňuje požadavky na přístupnost.

### Custom Select

- Stejná geometrie jako Input
- Stejná výška a padding
- Šipka má dostatečný prostor od pravého okraje
- Dropdown navazuje vizuálně na celé pole
- Zaoblené položky nabídky
- Zachovat klávesnicové ovládání
- Žádný neupravený nativní vzhled

### Checkbox / Radio / Toggle

- Sjednotit tloušťku obrysů a jejich stavy
- Zachovat funkční přístupné HTML inputy
- Zlepšit proporce a zarovnání
- Toggle musí mít dokonale zaoblenou dráhu i thumb
- Stavy checked, unchecked, hover, focus a disabled
- Jemné animace respektující `prefers-reduced-motion`

## 3. Kompletní formulář

Přepracuj **06 · Complete Form** tak, aby působil jako skutečná hotová produktová komponenta.

Požadavky:

- Vzdušný layout
- Radius kontejneru 32px
- Důsledné rozestupy mezi labely a poli
- Sjednocené pole URL a Select
- Vizuálně kvalitní Checkbox
- Čisté umístění CTA
- Jemný informační text
- Čitelné validační hlášky
- Funkční ověřování formuláře

Žádná data se nesmějí odesílat na server.

## 4. Sjednocení tlačítek

Zachovej schválené:

- Pilulkový tvar textových tlačítek: `radius.pill`
- Dokonale kulatá ikonová tlačítka: `radius.round`
- Výšky textových tlačítek: 32 / 40 / 48px
- Současný Blue × Purple Gradient Button
- Obrácení gradientu při hoveru
- Schválené animace ikon
- Traveling Light a Spinning Accent

**Neměň vizuální konstrukci ani animace tlačítek, pokud to není nezbytné pro sjednocení geometrických tokenů.**

Textová tlačítka a ikonová tlačítka zůstávají tvarově odlišná podle svého účelu.

## 5. Audit dalších komponent

Zkontroluj zejména:

- Navigation
- Cards a Surfaces
- Widget containery
- Status prvky
- Tooltipy a Popovers, pokud již existují
- Všechny stávající Foundations ukázky

Rozměry a zaoblení mají vycházet ze společných pravidel.

Nevytvářej dosud neexistující komponenty jen kvůli auditu.

## 6. CSS architektura

Dodrž:

- Jeden zdroj pravdy pro radius tokeny
- Žádné `!important`
- Žádné přidávání opravných CSS vrstev na konec souborů
- Žádné duplicity
- Žádné změny Colors v2 nebo Typography
- Zachovat Light/Dark režim
- Preferovat skutečný refaktor před kosmetickým přepisováním

## 7. Ověření

Použij Playwright a proveď vizuální kontrolu obou témat.

Otestuj:

1. Focus inputů bez dvojitého obrysu
2. Input, Select a Textarea se shodnou geometrií
3. Checkbox, Radio a Switch v různých stavech
4. Complete Form včetně validace
5. Tlačítka a jejich animace bez regresí
6. Responzivní vzhled na mobilu, laptopu a desktopu
7. Zaoblení karet a panelů podle tokenů

Pořiď screenshoty před a po, minimálně pro Light a Dark.

## 8. Aktualizuj katalog

Uprav Foundations → Spacing & Grid tak, aby zobrazoval aktuální sjednocená pravidla.

V Inputs & Forms předveď všechny opravené komponenty v reálných situacích.

Nové vizuální provedení formulářů označ jako **návrh k vizuálnímu schválení**, ne jako automaticky schválený design.

## Výsledek

Po dokončení:

- Spusť TypeScript, build a Playwright testy.
- Vizuálně zkontroluj screenshoty.
- Oprav případné chyby.
- Proveď commit a nasaď změny na GitHub Pages.
- Uveď seznam změněných souborů a výsledky testů.

**Hotovo je až tehdy, když formuláře vypadají jako jednotná, prémiová a dokončená součást Neo Iris.**