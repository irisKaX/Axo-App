# Axolotl Design Catalog V2 — aktuální stav

Průběžný přehled schváleného katalogu a jeho zdrojů, aktualizovaný 12. 11. 2026 podle lokálního kódu a uživatelských rozhodnutí. Vzniká pouze interaktivní vizuální katalog, nikoli aplikace nebo skutečné nástroje.

## Dokumentace a prostředí

- `AGENTS.md`: stručná závazná pravidla práce.
- Tento dokument: aktuální schválené komponenty, zdroje a hranice použití.
- [roadmap.md](roadmap.md): další fáze, strategie screen-first.
- [PROJECT-STATUS-2026-11-12.md](PROJECT-STATUS-2026-11-12.md): zachovaný historický checkpoint. Jeho údaje o Git refs a tehdy chybějících souborech nejsou průběžným stavem synchronizace.
- [CODEX-NEXT-STEP.md](CODEX-NEXT-STEP.md): původní zadání inventury před konsolidací; samo neautorizuje další Git operace.

Pracovní větev: `design/catalog-v2`. Lokální náhled: `http://localhost:5173/`. Existující Pages náhled: `https://iriskax.github.io/Axo-App/preview/v2/`. Push do V2 sám nepublikuje novou verzi; stávající publikační workflow reaguje na `main` nebo ruční spuštění. `main` se při konsolidaci V2 nemění.

## Společný základ a barvy

Clean Neo Iris: Poppins, propracované Dark/Light varianty, modrofialové gradienty, zaoblená geometrie a neutrální běžný hover. Brandové efekty zůstávají specifickými schválenými případy.

- Vstup: `src/main.tsx` → `src/catalog-v2/CatalogApp.tsx`. Shell, navigace a Buttons: `src/catalog-v2/catalog.css`.
- Aktivní motiv vlastní `CatalogApp`; sekce jej přebírají přes props a příslušné CSS proměnné. Přepínače sdílejí stejný stav.
- Jediný autoritativní zdroj barev: `src/design-system/foundations/colors.ts`, strom `colorTokens`.
- Typografie: `src/design-system/foundations/typography.ts`. Spacing, radiusy a rozměry: `src/design-system/foundations/spacing.ts`.
- Rytmus 4 px; radiusy XS 8, SM 12, MD 18, LG 24, XL 32, 2XL 40, Pill 9999 px. Foundations grid: mobile 4 / tablet 8 / desktop 12 sloupců.

`colorTokens` obsahuje `primitives.brand/neutral/status`, `semantic[theme].surface/border/text/icon/field`, `interaction[theme]`, `status[theme]` a `effects`. Specifický Outline hover border je `interaction.outline.hoverBorder`.

| Role | Dark | Light |
| --- | --- | --- |
| Canvas | `#090B10` | `#F5F7FA` |
| Surface default | `#141820` | `#FFFFFF` |
| Surface subtle | `#1B212B` | `#F1F4F8` |
| Surface raised | `#212833` | `#EDF1F6` |
| Interaction hover | `#2B3442` | `#E5EBF2` |
| Interaction pressed | `#364253` | `#D8E2EC` |
| Interaction selected background | `#212833` | `#EDF1F6` |
| Border default | `#3D495B` | `#B9C5D3` |
| Text primary | `#F5F7FF` | `#17202E` |
| Text secondary | `#B4BECE` | `#586576` |
| Global focus ring | `#BDA0FF` | `#7C4BFE` |
| Field hover/focus background | `#090B10` | `#F1F4F8` |
| Field hover/focus border | `#7C4BFE` | `#6837DF` |

Shell, Buttons a neutrální plochy aktivního katalogu už používají centrální role. Historické `--v2-elevated`, `--v2-subtle`, `--v2-border` a `--v2-soft` byly po migraci použití odstraněny. Globální focus čte `interaction[theme].focus.ring`; specifické schválené focus efekty zůstávají samostatné. Formulářová pole používají `semantic[theme].field`, včetně filled a disabled; hover a focus mají shodné pozadí i border bez dalšího halo.

Brandové hodnoty a gradient jsou zachované: Iris Purple `#7C4BFE`, O2 Blue `#0050FF`, Bright Blue `#0F9FDC`, Royal Blue `#3B09C7`, Electric Purple `#8101EC`; Blue × Purple má původní směr 130° a stopy 0 / 52 / 100 %. Status role, masky a animace Orbital Glow se nenahrazují neutrálními efekty.

Kompatibilní exporty `brandColors`, `neutral`, `semantic`, `themes` a referenční vzorníky zůstávají pro existující konzumenty; nejsou zadáním plošného odstranění. Referenční HEX ve vzorníku není chyba. Nové návrhy používají `colorTokens`. Widget Foundation záměrně zachovává schválený Dark border přes neutral primitive 750 a bílý nadpis přes primitive 0; nepřevádět je bez schválení na vizuálně jiné hodnoty.

## Schválené oblasti a zdroje

Následující komponenty tvoří schválený vizuální základ. Starší texty „náhled k vizuálnímu schválení“ v demonstračních hlavičkách nejsou autoritativním seznamem rozhodnutí. Přítomnost původní komponenty v repozitáři sama o sobě neznamená schválení pro V2.

### Foundations a Icons

Colors zahrnují brandové, neutrální, statusové a referenční vzorníky i gradienty. Typography obsahuje role a interaktivní ukázky. Spacing & Grid ukazuje škály, radiusy, kontextové rozložení a neutrální Responsive Grid. Icons mají schválené velikosti, tóny a animace včetně povolené ikony `folder-open`; v navigaci jsou pod Library.

Zdroje: `src/catalog-v2/FoundationPages.tsx`, `foundations.css`, `SpacingV2.tsx`, `spacing.css`; sdílené SVG: `src/components/AxoIcon.tsx`, `axo-icon.css`.

**Heading Stack:** `src/catalog-v2/HeadingStackV2.tsx`, společný styl `src/components/heading-stack.css`, `ContrastDot` z `src/components/TextTreatments.tsx`. Standard 22 px a Compact 18 px vycházejí z `typography` a `toolHeadingStack`. Katalog umožňuje měnit čtyři textová pole. Heading Stack nemá vlastní kartu a nezávisí na interních `.wf-*` stylech; Widget Foundation používá stejný neutrálně pojmenovaný typografický zdroj.

### Library → Buttons

Zdroje: `src/catalog-v2/CatalogApp.tsx`, `catalog.css`. Zachovaná prezentace ve čtyřech skupinách:

1. **Action hierarchy:** šest řádků Primary, Primary 2 / Orbital Glow, Secondary / Gradient Reveal, Outline, Ghost, Danger; jeden konzistentní příklad na řádek bez redundantního ikonového dvojčete.
2. **Sizes:** pouze Compact 32 px a Default 38 px, bez celé matice variant.
3. **Round buttons:** pouze Primary a Secondary; plus se při hoveru/focusu otáčí o 90°.
4. **Widget → Tool:** schválená akce otevření nástroje.

Primary zachovává gradient a jeho pomalé obrácení; Orbital Glow kontinuální obvodovou animaci; Secondary gradient reveal bez stínu. Outline má default border `#7C4BFE`, hover border `#6837DF` v obou motivech a neutrální hover plochu. Ghost a Round Secondary používají neutrální hover; Round Secondary nemá původní halo. Danger zachovává červený border a červenou hover výplň. Čistá kruhová/pilulková geometrie, rozměry, animace a specifické focus stavy zůstávají schválené. Další ikonové řádky nebo varianty přidávat jen na zadání.

### Library → Inputs & Forms

Zdroje: `src/catalog-v2/FormsV2.tsx`, sdílené definice v `src/catalog-v2/forms/FormControlsV2.tsx` a `forms.css`.

| Ukázka | Komponenta / vlastní zdroj ve složce `forms/` |
| --- | --- |
| 01 | Text / URL Input (`FormControlsV2.tsx`) |
| 02 | Textarea (`FormControlsV2.tsx`) |
| 03 | Custom Select (`FormControlsV2.tsx`, export `FormSelect`) |
| 04 | Checkbox (`FormControlsV2.tsx`) |
| 05 | Radio Group (`FormControlsV2.tsx`) |
| 06 | Toggle Switch (`FormControlsV2.tsx`) |
| 07 | `SearchSpotlightV2.tsx` |
| 08 | `MultiSelectV2.tsx` |
| 09 | `DatePickerV2.tsx` |
| 10 | `QualitySliderV2.tsx` |
| 11 | `FileUploadAtmosphereV2.tsx` |
| 12 | `DarkLightSwitchV2.tsx` |

Barevné varianty Checkbox, Radio a Toggle zůstávají. Custom Select používá portál do `document.body`, přebírá motiv a typografii, drží šířku triggeru, obrací umístění podle prostoru a reaguje na scroll/resize. Zachovává klávesnici, disabled možnosti a ARIA; Escape zavírá nejprve nabídku, pak může zavřít Settings Popover, bez focus trapu.

Search Spotlight odděluje nepřetržitý obvodový proud od psaní ukázkového placeholderu; uživatelský text se nepřepisuje. Multi-select podporuje chips a odebrání hodnot. Date Picker má vlastní kalendář, měsíce, klávesnici, disabled a min/max. Quality Slider má rozsah 0–100 %, krok 1 %, výchozí hodnotu 80 %.

File Upload Atmosphere je jediná flexibilní komponenta: atmosférická vnější karta, desktopové dva sloupce text/drop zóna a skládání na menší šířce. Nemá varianty Default/Large ani pevnou výšku; hover mění jen dashed border. Výběr souborů, drag/drop, odebrání, ready a ukázkový error používají jen lokální stav, bez nahrávání. Dark/Light Switch je původní gradientový pill se žlutým měsícem/sluncem, propojený se stavem `CatalogApp`.

### Library → Loading & Progress

Zdroje: `src/catalog-v2/LoadingV2.tsx`, `loading.css`; slider používá existující styl z `forms/forms.css`.

Schválené ukázky: **01 Gradient Ring**, **02 Blade Spinner**, **03 Loading Dots**, **04 Circular Progress**, **05 Skeleton**, **06 Linear Progress**. Zachovávají původní geometrii a animační principy. Ring, Blade, Dots a Skeleton mají samostatné pause/resume/restart; restart znovu vytvoří animační prvek. Circular a Linear umožňují ručně měnit 0–100 % z výchozích 65 %. Linear zachovává přechod šířky 0,24 s, bez nekonečného načítání. Omezení pohybu respektují všechny ukázky.

### Library → Cards

Zdroje: `src/catalog-v2/CardsV2.tsx`, `cards.css`.

- **01 Base Card:** společný základ `surface.default`, border 1 px, radius 24 px, padding 24 px, přirozené rozměry bez hoveru a stínu. B / Soft Layer používá vnořený neutrální panel se dvěma řádky; C / Structured hlavičku, divider a dvě informační plochy.
- **02 Interactive Card / C Hybrid:** sdílí základní třídu Base Card. Neutrální hover, trvalý selected border Iris Purple a neutrální selected povrch, samostatně rozpoznatelný focus a disabled ukázka. Nativní button s `aria-pressed` přepíná výběr kliknutím, Enterem i Space.

Cards a Widgets jsou oddělené rodiny, bez společného kontejneru. **Tool Card není schválená.**

### Library → Navigation

Ukázky: `src/catalog-v2/NavigationV2.tsx`, `navigation.css`. Sdílené komponenty a jejich vlastní styly:

- **01 Dropdown Menu:** `src/components/DropdownMenu.tsx`, `dropdown-menu.css`. Icon/Text trigger, akce, divider, checked/disabled/danger. Portál, umístění pod/nad triggerem a omezení viewportem; klávesnice, kliknutí mimo, Escape a návrat focusu.
- **02 Settings Popover:** `src/components/SettingsPopover.tsx`, `settings-popover.css`. Libovolné children, hlavička, popis a X; neutrální raised plocha, radius/padding 24 px, portál a vnitřní scroll. Nemodální panel bez focus trapu rozpozná portálovou nabídku vlastního Selectu přes `aria-controls`. Ukázka používá schválený `FormSelect`, nikoli jeho kopii.
- **03 Tooltip:** `src/components/Tooltip.tsx`, `tooltip.css`. Top/Bottom/Left/Right s automatickým přizpůsobením viewportu, max-width 260 px, přirozené zalamování; krátká hover prodleva, okamžitý focus, Escape a `aria-describedby`. Jemný fade respektuje omezení pohybu.

`src/components/WidgetLaunchButton.tsx` používá přímo sdílený Tooltip s textem `label`. Původní lokální CSS tooltip v `widget-launch-button.css` byl odstraněn; vzhled, hover/focus a akce tlačítka zůstávají zachované.

## Exploration → Dashboard Layout a Widget Foundation

Zdroje: `src/catalog-v2/DashboardV2.tsx`, `dashboard.css`; `src/widgets/WidgetFoundation.tsx`, `widget-foundation.css`. Dashboard je samostatný celoplošný náhled.

Desktopový grid má 4 sloupce × 2 řady, gap 16 px; tablet dva sloupce, mobil jeden. Sloty ani jejich velikosti se nepřeskládávají:

| Slot | Velikost | Výchozí obsah |
| --- | --- | --- |
| 01 | Large | Axolotl Office — pevný vizuální placeholder |
| 02 | Small | QR generátor |
| 03 | Small | Find Phrase |
| 04 | Small | Media Tools |
| 05 | Small | Screenshot |
| 06 | Large | Notebook |

Tool Widgety používají původní Widget Foundation, společný Heading Stack a prázdnou pracovní plochu. Dashboard předává aktivní `theme`; Foundation bere odpovídající `colorTokens` při zachování přesného Dark vzhledu. Starší konzumenti bez theme nadále používají Dark. Office je samostatný placeholder, nikoli implementovaný workspace.

**Schválený editor:**

- „Upravit dashboard“ aktivuje `draftAssignments`; Zrušit vrací `savedAssignments`, Reset obnovuje výchozí draft, Uložit potvrzuje draft pouze v paměti Reactu. Odchod s neuloženou změnou nabízí pokračování nebo zahození.
- Drag začíná pouze šestitečkovým handlen. Prohazuje obsah dvou Tool slotů včetně Small ↔ Large, nikoli geometrii. Office, původní slot a prostor mimo widgety nejsou platným cílem. Kompaktní portálový ghost má eyebrow, název a zelenou/červenou tečku bez glow; existuje alternativa klikem, dotykem a klávesnicí.
- „Nahradit nástroj“ je jediná akce v editační liště. Nejprve se vybere cílový Tool Widget, pak se otevře existující Settings Popover s výběrovým panelem. Nepoužitý nástroj nahradí obsah, obsazený se atomicky prohodí, aktuální nic nemění. Panel se po volbě zavře a editace pokračuje. Escape výběr zruší; výběrový režim nezahajuje drag.
- Dostupné nástroje: QR generátor, Find Phrase, Media Tools, Screenshot, Notebook, PDF Tools, Metadata Check a Konvertor obrázků. Mění pouze demonstrační obsah Heading Stacku, nemají skutečné funkce.

Původní pětice Custom Selectů v nastavení Dashboardu byla nahrazena schváleným Drag & Drop Editorem a centrálním výběrem cíle/nástroje. Custom Select se nadále používá ve Forms a ukázce Settings Popover; jeho portálová oprava zůstává sdílená.

## Rozpracováno a odloženo

- „Další komponenty“, „Widgets & Layouts“ a „Playground“ jsou navigační placeholdery, nikoli hotové rodiny nebo schválený obsah.
- Axolotl Office zůstává placeholder. Tool Screens V2 zatím nejsou vytvořené; starší návrhy nejsou automaticky schválené finální obrazovky.
- Number Input byl výslovně přeskočen. Tool Card, další Cards, pokročilé Forms a Complete Form nejsou tímto stavem autorizované.
- Historická studia a preview soubory zůstávají referencí; nepřenášet je plošně a neměnit je při práci na V2.

Další práce se řídí [roadmapou](roadmap.md): nejprve Image Converter Tool Screen, další Library komponenty až podle konkrétní potřeby a schválení. Žádný backend, persistence, automatické testy, build ani deployment nejsou součástí této konsolidace.
