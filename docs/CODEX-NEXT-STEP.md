# Codex: inventura a sjednocení Axolotl Design Catalog V2
**Číst společně s `AGENTS.md`, `docs/catalog-v2.md` a `docs/PROJECT-STATUS-2026-11-12.md`.**

Pracujeme pouze na vizuálním Design Catalog V2, nikoli na skutečné aplikaci. Tento dokument je **průzkumné zadání**, nikoli příkaz k automatickému commitu nebo synchronizaci.

## 1. Ověř lokální skutečnost
- Zjisti aktivní větev, lokální HEAD, `git status --short --branch`, necommitnuté soubory a aktuální místní/vzdálené refs.
- Porovnej pracovní kopii s `origin/design/catalog-v2` a `origin/main`; bez automatického pull, merge, rebase, reset nebo přepnutí větve.
- Zkontroluj schválený Dashboard V2, Drag & Drop Editor, Widget Foundation pro Dark/Light, centrální colorTokens a pravidla pro komponenty.
- Vyhledej rozpory nebo zastaralé formulace mezi `AGENTS.md`, `docs/catalog-v2.md`, aktuálním kódem a dokumentačním checkpointem.
- Ověř, že nové dokumentační soubory na vzdálené větvi neimplikují synchronizovaný lokální kód.

## 2. Navrhni sjednocení dokumentace
- `AGENTS.md`: krátká závazná pravidla pro Codex.
- `docs/catalog-v2.md`: autoritativní průběžný stav schválených komponent a jejich zdrojových souborů.
- `docs/roadmap.md`: přehled příštích fází, screen-first, první Image Converter.
- `docs/PROJECT-STATUS-2026-11-12.md`: historicky datovaný checkpoint rozhodnutí a kontextu; nekopírovat celý bez rozmyslu do jiných souborů.
- Zachovej rozlišení **schváleno / rozpracováno / odloženo** a platná pravidla ze starších dokumentů. Neodvozuj stav aktuálního kódu pouze z GitHubu.
- Navrhni konkrétní nejmenší změny; bez plošného refactoringu.

## 3. Stop před zápisem
Nespouštěj testy, Playwright, CI, screenshot reporty, build, deployment ani další Vite server. Nepřepisuj schválené UI. Neprováděj automaticky commit, push, pull, merge, rebase, reset nebo checkout.

**Výstup:** stručný inventurní report se skutečnou lokální větví/HEAD, seznamem relevantních rozdílů a návrhem přesné konsolidace dokumentace a bezpečného Git postupu. Zastav se před jakýmkoliv zápisem do Git historie a dalšími úpravami a vyžádej si schválení.
