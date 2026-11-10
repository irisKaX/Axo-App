# Layout APIs and usage

Import from `src/layouts` (barrel exports) or the individual files. No extra dependency is required. Existing `themeStyle` maps original theme and radius foundations; layout gaps and panel padding come from `spacing.ts`. Consumers supply `theme` and `onThemeChange` to AppShell. Layouts never process or persist tool data.

## Basic workspace

```tsx
import {
  AppShell, ToolShell, WorkspaceLayout, ToolPanel,
  ToolActionBar, ToolStatus,
} from '../layouts'

<AppShell theme={theme} onThemeChange={setTheme} pageLabel="My tool">
  <ToolShell label="My tool" footer={
    <ToolActionBar>
      <ToolStatus state="ready">Ready</ToolStatus>
      <AxoButton onClick={processFiles}>Process</AxoButton>
    </ToolActionBar>
  }>
    <WorkspaceLayout panelSize="default" settings={
      <ToolPanel label="Settings">{/* existing form controls */}</ToolPanel>
    }>
      <ToolPanel label="Workspace">{/* actual tool content */}</ToolPanel>
    </WorkspaceLayout>
  </ToolShell>
</AppShell>
```

AppShell renders the one main landmark. Do not put another main inside tool content. `pageLabel` changes the existing header's compact-page label; menus, keyboard behavior and ThemeSwitch remain the existing implementation. `footer`, `className` and `mainClassName` let DashboardStudio keep its grid and back action without another environment implementation.

ToolShell requires `label` and `children`; `heading`, `toolbar`, `footer` are optional ReactNode slots. It does not manufacture missing regions. The footer stays outside the scrollable body on desktop, and follows content naturally on mobile.

## Archetypes

| Component | Required slots | Optional props and slots | Use |
| --- | --- | --- | --- |
| WorkspaceLayout | children | settings; panelSize=`compact` / `default` / `wide` | Settings plus work region. Compact: clamp(240px, 24%, 320px); default: clamp(260px, 30%, 415px); wide: clamp(300px, 38%, 520px). Supporting panel is omitted entirely when absent. |
| FormResultLayout | input, result | settings; presentation=`compact` / `expanded` (default) | A form and output. Compact stacks with its own scroll path; expanded splits, then stacks at narrow width. |
| DataWorkspaceLayout | children | filters, details, bulkActions | Table/list with optional detail and wrapping bulk actions. Pass ToolToolbar into ToolShell.toolbar for a page toolbar. |
| EditorWorkspaceLayout | children | navigation, inspector | Editor with up to two contextual panels. Omitted panels leave no empty grid tracks. At ≤1050px tool width, editor comes first and supporting regions stack in a scrollable body. |

Wrap independent regions in ToolPanel with a meaningful, unique `label`. ToolPanel accepts `children` and optional `className`. It supplies a keyboard-focusable named section and desktop scroll path. Do not put a fixed height or page max-width into tool content. Use min-width:0 for shrinkable custom widgets, safe wrapping for text, and a named focusable overflow wrapper for genuinely wide tables. See the Data demonstration for the latter.

## Primitives and state

- ToolToolbar and ToolActionBar accept children and wrap naturally. ToolActionBar accepts className. Footer action widths fit their text while retaining approved 38px default button height.
- ToolEmptyState accepts title and optional descriptive children; ToolLoadingState accepts an optional label. These contain no animation, timers or simulated processing.
- ToolStatus accepts state, children and optional className. `error` announces an alert; other states use status. Supported type: `empty | ready | processing | success | error | disabled`.
- A tool owns state, validation, disabled behavior and asynchronous work. Layout state feedback does not substitute for a tool's actual state machine.

## Responsive and overflow contract

At desktop widths AppShell is exactly 100% × 100dvh, without a centered maximum width. Shared header and action footer remain outside panel scrolling. Container queries use available tool width, not the catalog's page width. ≤620px tool width stacks supporting panels after the primary workspace (form input stays before result). At mobile browser widths AppShell uses natural document height and vertical scrolling. The three-region editor switches at 1050px. Table horizontal overflow stays inside its explicit table wrapper. Tooltips near right edges anchor inside their own shell.

A panel's tab stop lets keyboard users scroll content without reaching the end of every row first. Existing control focus indicators and the shell skip link remain visible. No new decorative animation is introduced; approved controls retain their reduced-motion behavior.

## Catalog and standalone routes

Library → Layouts → Axolotl Layout System offers App Shell, Tool Shell, the four archetypes, Image Converter and the existing Dashboard Grid. `ViewportPreview` provides one same-origin iframe and scroll wrapper for every selection:

- 1366 × 768, 1440 × 900, 1920 × 1080, 390 × 844.
- Literal iframe width/height and no transform scaling. The surrounding catalog scrolls in both axes.
- “Otevřít v celé obrazovce” opens the same route in a new tab, using that tab's actual browser viewport, without catalog controls.
- Theme messages check origin and window identity in both directions. Theme and viewport changes preserve selected files and local text. Changing the example, state or panel configuration reloads the illustration deliberately.

Production converter: `?tool=image-converter`.
Preview alias: `?preview=image-converter`.
Other example ids: `app-shell`, `tool-shell`, `workspace`, `form-result`, `data`, `editor`, `dashboard`.
Optional query parameters: `theme=light|dark`, `state=empty|ready|processing|success|error|disabled`, `panels=hidden`, `presentation=compact` (form-result). Unknown routes fall back to the catalog; unknown states fall back to empty. AppShell and ToolShell do not treat the URL as their own API.

## Existing capability boundaries

The converter opts into `FileDropzone.inheritTheme`, which resolves parent semantic tokens; omitted preserves the existing Atmosphere specimens. Image Converter still has real browser-local file selection, deduplication, removal, format/quality/metadata controls and illustrative conversion states. Conversion, downloads and metadata preservation are not implemented; this is stated visibly on every converter page. Success sizes are illustrative. Navigation's tool destinations are the repository's existing demo menu actions; this task does not implement future tools. Layout illustrations use only explicitly labeled data and real local interactions (filtering, selection and text editing); no fake backend results.
