# Axolotl Design Catalog V2 — roadmapa

Aktuální směr k 12. 11. 2026. Stav komponent je v [catalog-v2.md](catalog-v2.md), závazná pravidla v `AGENTS.md`. Historická rozhodnutí zachovává [projektový checkpoint](PROJECT-STATUS-2026-11-12.md).

## A / Konsolidace schváleného katalogu

Zachovat úplnou lokální zálohu, bezpečně začlenit očekávané dokumentační commity a zahrnout všech 34 dosud lokálních zdrojových souborů do historie `design/catalog-v2`. Sjednotit průběžnou dokumentaci se skutečným kódem bez změny schváleného vzhledu a chování. Synchronizace vyžaduje výslovné zadání; tato fáze neopravňuje k merge do `main`, buildu nebo deploymentu.

## B / První Tool Screen: Image Converter

**Další návrhová fáze, zatím bez implementované obrazovky V2.** Začít samostatným zadáním a inventurou původního návrhu, zejména `src/pages/ImageConverterLayout.tsx` a jeho stylů. Starší preview a tok upload → nastavení → výstup jsou reference, nikoli automaticky schválená finální kompozice.

1. Ujasnit konkrétní demonstrační tok, obsah, stavy a vizuální hierarchii obrazovky.
2. Navrhnout jen potřebné kompozice s využitím schválených komponent a centrálních tokenů; varianty pouze podle dohody.
3. Nechat vizuálně schválit směr a poté vytvořit lokální interaktivní designový prototyp v povoleném rozsahu.
4. Doladit Dark/Light a responzivní rozložení podle společné vizuální kontroly.

Neimplementovat skutečnou konverzi, zpracování nebo nahrávání souborů na server, ukládání ani backend. Schválení této roadmapy není zadáním k automatickému zahájení screenu.

## C / Další Tool Screens podle workflow

Možní následovníci: Screenshot Tool, Metadata Checker, QR Generator, Find Phrase a Media Tools. Pořadí po Image Converteru není rozhodnuté; každý screen má vlastní zadání a schválení.

Strategie **screen-first**: navrhovat konkrétní kontext obrazovky, nikoli dopředu vyrábět seznam Library komponent. Tool Screen není komponenta Library a může mít vlastní rozložení. Používat existující schválené základy; chybějící sdílený prvek řešit až při konkrétní potřebě. Cards a Widgets zůstávají samostatné rodiny.

## D / Konsolidace opakujících se vzorů

Po několika screenech posoudit, které vzory se skutečně opakují. Teprve poté navrhnout malé sdílení nebo doplnění design systému, bez duplicitního stylování a po potřebném schválení zásahů do existujících komponent. Nevytvářet univerzální framework ani další tokenový systém.

Žádná fáze automaticky nepřevádí katalog do vývoje aplikace. Testy, CI, build, publikace a změny `main` vyžadují samostatné výslovné zadání.
