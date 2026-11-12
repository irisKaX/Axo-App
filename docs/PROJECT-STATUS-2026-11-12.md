# Axolotl Design Catalog V2: projektový stav a pravidla
**Stav k 12. 11. 2026 | Dokumentační checkpoint, nikoli potvrzení synchronizace kódu**

## 1. Co vytváříme
Axolotl je budoucí interní webový multitool pro webovou editaci, SEO, média a osobní workspace. **Nyní stavíme výhradně interaktivní vizuální Design Catalog V2.** Prototypy smí používat demonstrační lokální stav; nestavíme skutečnou aplikaci, backend, API, databáze, autentizaci ani skutečné operace nad soubory a weby. Úspěch návrhu potvrzuje vizuální schválení uživatelkou.

Repozitář: `irisKaX/Axo-App`. Pracovní větev: `design/catalog-v2`. Lokální cesta: `/Users/iris/Documents/Axo-App`. Lokální náhled: `http://localhost:5173/`. Preview: `https://iriskax.github.io/Axo-App/preview/v2/`. **Bez výslovného požadavku nezasahovat do `main`.**

## 2. Stav synchronizace a důvěryhodnost podkladů
Při kontrole GitHubu 12. 11. 2026 byly `main` a `design/catalog-v2` rozdělené (V2 18 commitů napřed a 6 pozadu). Vzdálená větev neobsahovala všechny poslední lokální úpravy. Například vzdálený `src/widgets/WidgetFoundation.tsx` stále používal `themes.dark` a `src/catalog-v2/dashboard.css` nebyl ve vzdálené větvi dostupný. Poslední lokální stav proto **nelze vyvozovat ze vzdálené větve**.

Tento dokument zaznamenává uživatelsky odsouhlasená rozhodnutí a známý stav; lokální Codex musí před synchronizací ověřit aktuální kód, aktivní větev, HEAD, `git status --short --branch`, diffy a vzdálené refs. Nepoužívat automaticky pull, merge, rebase, reset ani checkout s rizikem přepsání lokální práce.

## 3. Design systém: Clean Neo Iris
Styl: Poppins, dark-first, stejně propracovaný Light Mode, zaoblená geometrie, modrofialové gradienty, energické akcenty a neutrální hover. Bez nežádoucích levandulových výplní, agresivního glow a nadbytečných dekorací.

**Jediný autoritativní zdroj barev:** `src/design-system/foundations/colors.ts`, strom `colorTokens` (semantic, interaction, status, effects). Nevytvářet nové palety a nepoužívat lokální HEX při existujícím tokenu.

Brand: Iris Purple `#7C4BFE`, O2 Blue `#0050FF`, Bright Blue `#0F9FDC`, Royal Blue `#3B09C7`, Electric Purple `#8101EC`. Hlavní gradient `linear-gradient(130deg, #0F9FDC 0%, #3B09C7 52%, #8101EC 100%)`.
Status: success `#9EF01A`, warning `#F6DE26`, error `#FF0A54`, info `#4CC9F0`.

| Sémantický token | Dark | Light |
|---|---|---|
| canvas | #090B10 | #F5F7FA |
| surface.default | #141820 | #FFFFFF |
| surface.subtle | #1B212B | #F1F4F8 |
| surface.raised | #212833 | #EDF1F6 |
| border.default | #3D495B | #B9C5D3 |
| text.primary | #F5F7FF | #17202E |
| text.secondary | #B4BECE | #586576 |

4px spacing rytmus; radiusy XS 8, SM 12, MD 18, LG 24, XL 32, 2XL 40, Pill 9999 px. Responzivní grid Foundations: mobile 4 / tablet 8 / desktop 12 sloupců.

## 4. Schválené oblasti Catalog V2
**Foundations:** Colors, Typography včetně Heading Stack, Spacing & Grid.
**Library / Buttons:** Primary, Primary 2 / Orbital Glow, Secondary / Gradient Reveal, Outline, Ghost, Danger, Round Primary, Round Secondary, Widget → Tool. Výšky Compact 32 px a Default 38 px.
**Icons:** schválená knihovna V2.
**Inputs & Forms:** Text/URL Input, Textarea, Custom Select, Checkbox, Radio Group, Toggle Switch, Search Spotlight, Multi-select, Date Picker, Quality Slider, File Upload Atmosphere a Dark/Light Switch. Number Input záměrně vynechán.
**Loading & Progress:** Gradient Ring, Blade Spinner, Loading Dots, Circular Progress, Skeleton, Linear Progress.
**Navigation:** Dropdown Menu, Settings Popover, Tooltip.
**Cards:** Base Card (Soft Layer/Structured), Interactive Card (Hybrid). **Tool Card a další Cards nejsou schválené; zatím je nevytvářet.**

Heading Stack je sdílená typografická komponenta se společnými styly v `src/components/heading-stack.css`; nekopírovat ji do nových widgetů či screenů.

## 5. Dashboard V2: schválené řešení
Pevný desktop grid 4 sloupce × 2 řady, gap 16 px, tablet 2 sloupce, mobil 1. Šest pevných slotů:
1. Large Axolotl Office (nepřemístitelný, nenahraditelný, zatím placeholder).
2. Small QR generátor.
3. Small Find Phrase.
4. Small Media Tools.
5. Small Screenshot.
6. Large Notebook.

Sloty zachovávají geometrii; uživatel mění jen obsah Tool Widgetů. Přesun mezi Small ↔ Small a Small ↔ Large přizpůsobí obsah cílovému slotu.

**Drag & Drop Editor schválen.** Výchozí režim je čistý. Tlačítko „Upravit dashboard“ aktivuje editaci s akcemi Zrušit, Reset, Uložit, Nahradit nástroj. Drag pouze šestitečkovým handlen, swap obsahu, nikoli přeskládání gridu. Office není platný cíl; drop mimo widget nebo do původního slotu nic nemění. Kompaktní ghost preview obsahuje eyebrow, název a 9px zelenou/červenou stavovou tečku bez glow a pulzování. Alternativa ovládání klikem, dotykem nebo klávesnicí. Příkaz „Nahradit nástroj“ je pouze v editační liště: nepoužitý nástroj se přiřadí, obsazený se prohodí. `savedAssignments` a `draftAssignments` jsou oddělené stavy Reactu; žádná persistence. Reset mění jen draft; uloží se až akcí Uložit.

**Widget Foundation Small/Large a Dark/Light Mode vizuálně schválené.** Podle posledního lokálního reportu Codexu předává Dashboard `theme` do `WidgetFoundation`, která používá `colorTokens`; drag handle také sleduje motiv. Lokálně byly změněny `src/widgets/WidgetFoundation.tsx` a `src/catalog-v2/DashboardV2.tsx`. Schválený Dark, CSS, geometrie, Heading Stack, WidgetLaunchButton a logika editoru zůstaly zachované. **Zkontrolovat lokální zdroj před synchronizací; tato změna nemusí být na GitHubu.**

## 6. Nová strategie: Screen-first
Po schválení základů **nenavrhovat Library dopředu podle seznamu**. Navrhovat samostatné **Tool Screens** podle konkrétního uživatelského toku, s využitím již schválených komponent. Jednotlivé obrazovky mají právo na odlišné rozložení. Tool Screen není komponenta Library. Teprve skutečně opakovaný pattern je kandidát na novou sdílenou komponentu a vyžaduje schválení.

**První Tool Screen: Image Converter.** Dříve zkoumané řešení upload → nastavení → výstup slouží jako reference, nikoli automaticky schválená finální obrazovka. Dále podle dohody Screenshot Tool, Metadata Checker, QR Generator, Find Phrase, Media Tools; pořadí po konvertoru ještě není rozhodnuté.

## 7. Závazná pravidla pro Codex
- Před úkolem číst `AGENTS.md`, `docs/catalog-v2.md` a relevantní aktuální dokumentaci.
- Pouze Design Catalog V2. Neimplementovat skutečnou aplikaci.
- Zachovat schválené prvky a interakce; před změnou sdílené schválené komponenty vyžádat souhlas.
- Malé, přesné úpravy v původním CSS. Žádné override vrstvy, duplicitní selektory, `!important`, nové tokenové palety nebo zbytečné abstrakce.
- Používat existující Theme systém, tokeny a schválené komponenty; upravit oba motivy tam, kde se komponenta používá.
- Žádné automatické testy, Playwright, screenshot reporty, rozšiřování CI, rutinní buildy, deployment ani další Vite server.
- Bez výslovného schválení neprovádět commit, push, merge, pull, rebase nebo reset. `main` neměnit.
- Nepřidávat nesouvisející úpravy; po úkolu stručně vyjmenovat změněné soubory, co se změnilo a co zůstalo beze změn.
- Nezačínat automaticky další screen ani komponentu.

## 8. Roadmapa
**A. Konsolidace a bezpečná synchronizace:** lokálně ověřit Git status, aktuální implementace a dokumentaci; připravit přesný postup zachování lokálních změn. Bez automatických Git zásahů.  
**B. Image Converter Tool Screen:** nejprve inventura původního návrhu, obsah a UX hierarchie; návrh variant dle potřeby; vizuální schválení; teprve poté lokální implementace designového prototypu.  
**C. Další Tool Screens:** postupně podle workflow; sdílené komponenty extrahovat jen podle reálné potřeby.  
**D. Konsolidace design systému:** po několika screenech zhodnotit opakující se vzory; žádná automatická implementace reálné aplikace.

## 9. Bezprostřední další krok
Postupovat podle `docs/CODEX-NEXT-STEP.md`: **lokální inventura, porovnání dokumentů, report a návrh bezpečné synchronizace**. Nezačínat změny kódu ani Git historie bez dalšího schválení.
