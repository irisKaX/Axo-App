# Repository audit · Axolotl Layout System v1.0

Audited 2026-11-09 before component implementation. Feature base: main `079ba62`.
Open PRs inspected: converter precision exploration #38 (`7d153ef`), traveling-light fix #27. Neither branch will be modified or merged. The working checkout was clean at `55734f9`; remote main adds only Pages workflow changes. Work is isolated on `feat/axolotl-layout-system-v1`.

## Concrete findings

| Responsibility | Evidence | Decision |
| --- | --- | --- |
| Entry / routing | `src/main.tsx`; `src/App.tsx` uses local section state, no router dependency | Keep catalog navigation; add bookmarkable tool and preview query routes without a dependency. |
| Theme tokens | `src/App.tsx` maps `themes` and `semantic` from `src/design-system/foundations/colors.ts` into CSS properties | Extract that mapping unchanged; share it between catalog and AppShell. |
| Navigation | `src/pages/NavigationStudio.tsx:HeaderPreview` already supports standalone use, ResizeObserver breakpoints 600/1050, modal mobile navigation, Escape and focus return | Reuse it; do not build another navigation. Its destinations are already illustrative, not real tool links. Preserve and label that limitation. |
| Duplicated shell | `DashboardStudio.tsx` and `ImageConverterLayout.tsx` each render their own header slot, main, viewport root; their CSS duplicates header resets and size rules | AppShell owns the shared environment; keep dashboard widget grid and actions. |
| Converter architecture | `ImageConverterLayout.tsx` mixes app header, page hero, settings, files, footer and catalog state selectors | Extract layout into ToolShell/WorkspaceLayout; retain actual controls and file-selection handlers. Move catalog controls outside the page. |
| Conflicting layout patches | `image-converter-layout.css` defines `.icl-shell--fullscreen`, `.icl-tool-body`, `.afu-target`, footer and mobile rules repeatedly; precision branch appends another 216 lines | Replace the layout cascade with scoped shared layout rules and one consolidated converter content sheet. |
| Artificial constraints | `.icl-page` max-width 1440; file list max-height 470; separate fullscreen-only sizing and viewport fixes | Full-size AppShell fills viewport; shared panels use min-height:0 and explicit scroll paths. Mobile uses document scrolling. |
| Catalog differs from app | `LayoutsStudio.tsx:LayoutPreview` reproduces navigation with spans and a synthetic dashboard grid; inline converter has different sizing and visible demo controls | Remove schematic copies. Catalog imports shared pages through same-origin iframe routes at literal CSS pixel dimensions. Use actual DashboardStudio for the existing grid catalog section. |
| Existing precision work | #38 removes redundant hero, adds compact upload workbench, hides slider endpoints and removes fullscreen width cap | Carry those source-level refinements forward, consolidate their CSS, document provenance; do not merge unrelated workflow experiments. |
| Geometry | `foundations/spacing.ts`: 4px rhythm, 12/16px layout gaps, radius variables, default 38px controls | Consume foundations; retain Buttons, FormControls, QualitySlider, icons and ThemeSwitch implementations. |
| Responsive behavior | Header 600/1050; dashboard 600/800/1050; converter 620/850 with viewport-only media rules | Preserve header behavior; tool container thresholds 620 and 1050 prevent narrow embedded panes from squeezing controls. Independent desktop panel scroll; natural mobile flow. |
| Conversion capability | Converter only switches to illustrative sizes; downloads report future implementation | Keep it explicitly a demo throughout the page. No backend or real conversion claims. |
| Typography / identity | `index.html` requests Poppins; `styles.css` supplies fallback; colors define Iris Purple and shared Blue × Purple | No identity or font changes. External font loading depends on browser network access. |
| Verification | `playwright.config.ts`, `tests/*.spec.ts`, `.github/workflows/validate.yml` | Add targeted geometry/behavior tests and screenshots. Existing tests contain stale navigation labels (`Components / …`); diagnose separately from feature tests. |
| Deployment | main deploy workflow publishes production and separate converter preview | Keep production deployment unchanged. A new layout preview needs trusted-main workflow configuration; don't republish production from this branch. |

## Shared primitives justified by use

ToolPanel (settings/input/result/details/editor), ToolToolbar (data/editor), ToolActionBar (converter/form/data), ToolEmptyState and ToolLoadingState (all demonstrations), ToolStatus (accessible state feedback). Split composition belongs in four small archetypes, rather than a generic mega-component. A separate ToolHeader/Section/Inspector/Workspace/SplitView adds no necessary responsibility in v1.

## Components to preserve

`Buttons.tsx`, `buttons.css`, `FormControls.tsx`, `form-controls.css`, `AdvancedFormControls.tsx`, `QualitySlider.tsx`, `NavigationButton.tsx`, `ThemeSwitch.tsx`, `AxoIcon.tsx`, foundation definitions, dashboard widgets and all other catalog studios. FileDropzone receives an opt-in inheritTheme property because its Atmosphere token pins otherwise keep the converter upload dark in light mode; omitted preserves existing specimens. HeaderPreview only accepts an optional current-page label; existing menus and interaction behavior remain intact.
