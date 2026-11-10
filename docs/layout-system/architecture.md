# Axolotl Layout System v1.0

## Intent and decisions

Create a reusable application foundation while preserving Clean Neo Iris and the existing converter design. No conversion backend or new tool implementation is included. The supplied task is the specification; it explicitly authorizes autonomous execution.

Composition: AppShell → ToolShell → archetype → tool content. AppShell applies existing theme tokens, reuses HeaderPreview, owns the one main landmark and fills the viewport without max-width. ToolShell owns a single surface with optional heading, toolbar and action footer. Archetypes own region arrangement; ToolPanel owns accessible region naming and scroll boundaries. Tool content owns all state and processing behavior.

Approaches considered: CSS-only extraction would retain duplicate shell behavior; a large configurable template would couple unrelated tools. Small named slot compositions provide the required four archetypes with clear optional regions, and are the chosen implementation approach.

## Contract

- AppShell: theme, onThemeChange, children, optional pageLabel/footer/className/mainClassName. One header and main. Dashboard reuses this environment.
- ToolShell: label, optional heading/toolbar/footer, children. No required settings or action region.
- WorkspaceLayout: optional settings, children, panelSize (compact/default/wide). Constrained supporting panel and flexible work region.
- FormResultLayout: input, result, optional settings, presentation (compact/expanded). Compact stacks intentionally; expanded splits until narrow.
- DataWorkspaceLayout: children (data), optional filters/details/bulkActions. Tables have their own horizontal scroll path.
- EditorWorkspaceLayout: children (editor), optional navigation/inspector. Editor flexes; context regions disappear only when explicitly omitted.
- ToolPanel: label, children, optional className. Named, focusable, independently scrollable region.
- ToolToolbar/ToolActionBar: wrapping horizontal slots.
- ToolEmptyState/ToolLoadingState/ToolStatus: semantic feedback without imposing tool-specific state transitions.

## Viewports and overflow

AppShell uses available width and 100dvh; no centered content cap. Desktop tool bodies use minmax(0,1fr), min-width:0 and min-height:0 with independently scrollable panels; footer remains outside scrolling body. At ≤620px tool width, regions stack and return to natural vertical flow with one document scroll. Three-region layouts stack at ≤1050px. Container queries control embedded layouts; real iframes also preserve media queries and modal boundaries.

Catalog ViewportPreview uses same-origin iframe URLs for the exact same ToolPage/AppShell tree as standalone routes. Width/height presets: 1366×768, 1440×900, 1920×1080, 390×844. No scaling, transforms or compact markup. Outer preview viewport scrolls in both axes. Fullscreen opens the same route in a new browser tab and fills its actual viewport. Theme synchronization uses origin-checked postMessage; no production UI catalog controls.

## State ownership

Layouts accept content slots, not a global state machine. Demonstrations explicitly label illustrative data and support empty, ready, processing, success, error and disabled scenarios. Converter retains real local file selection/removal and form controls; conversion/download remain clearly identified demonstrations. Production and preview are a single implementation.
