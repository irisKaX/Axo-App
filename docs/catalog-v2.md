# Axolotl Design Catalog V2 — approved-only migration

**Status: new isolated design exploration branch.** Nothing in this branch represents an implemented application. The currently published catalog on main is a reference only.

## Goal
Build a clean, compact, editable design catalog using **only explicitly approved** visual components. Do not copy the old catalog wholesale. Migrate small pieces one by one, inspecting the original source, extracting the approved visual behavior and writing a clean source of truth without CSS overrides.

## Current approach
- Keep the old catalog on `main` untouched during this migration.
- `design/catalog-v2` is the workspace for the new catalog. Nothing merges to `main` without explicit approval.
- Keep Clean Neo Iris, Poppins, dark/light variants, blue-to-purple gradients and rounded geometry.
- Each migrated component has one clear implementation and owned CSS. Never paste the old cascade or compatibility overrides.
- Do not add automated tests, Playwright, CI, screenshots/report matrices, speculative product logic, or new dependencies.
- Prefer real-size desktop preview and compact/mobile visual previews where useful.
- Each change should result in a visible improvement to the **new** catalog, not modifications to the existing catalog.
- An entry only becomes approved if the user specifically confirms it; do not treat all legacy components as approved.

## Catalog information architecture
1. **Foundations**: Colors / gradients, typography, spacing / grid, radii and effects
2. **Components**: Buttons, Inputs & Forms, Cards, Navigation, Icons, Dialogs / Feedback, Loaders
3. **Widgets & Layouts**: user-approved example compositions; demonstrations only
4. **Playground**: temporary experiments, never automatically promoted into the library

Do not build unapproved sections upfront. Empty sections may appear as navigation placeholders, but must not imply the underlying design is finished.

## First migration: Buttons (approved visual styles; clean catalog presentation)
Keep the **current approved look and behavior**, not a redesign. One showcase button per action variant, **without the redundant matching icon button**.

### 01 — Action hierarchy
Exactly six rows, one example per row:
1. Primary — approved blue-purple gradient, no automatic icon
2. Primary 2 / Orbital Glow — same base gradient with the approved continuous edge animation
3. Secondary — gradient reveal
4. Outline — purple accent outline
5. Ghost — low-emphasis text button
6. Danger — red outline, solid red on hover

Show a short purpose description and a single, consistent-width demonstration at the right. No adjacent icon duplicate.

### 02 — Sizes
Show only two examples, Compact and Default, to communicate sizing. This is not a full six-variant matrix. For the previously approved dimensions, Compact = 32px, Default = 38px.

### 03 — Round buttons
Only Primary and Secondary circular examples.

### 04 — Widget → Tool
One approved widget-to-tool action example. Do not invent a new design; inspect the original and migrate only the user-approved version.

### Exclusions
No additional "with icon" row, no duplicate button matrices, no unrelated arrow/download/copy variations in this first Buttons scope. Do not delete their old source from main; add other groups only when the user asks for them.

## Proposed migration order
1. Catalog V2 shell and navigation, reusing the established visual language without copying the entire old structure.
2. Buttons section described above, migrating one approved style at a time.
3. Approved foundations and remaining components, selected with the user.
4. Preview layouts/widgets once the building blocks are settled.

## Delivery protocol
On each task: make the narrow UI change, touch owning styles directly, point to the changed V2 branch/preview, and stop. Do not do unrelated cleanup or run tests.

## Central color tokens

The authoritative source remains `src/design-system/foundations/colors.ts`.
`colorTokens` is its public token tree. Initial preparation preserved all existing
rendered values; the first shell migration described below now applies the approved
neutral roles only to the catalog interface and its shared panel containers.

### Brief inventory before migration

- `colors.ts` already contained brand colors, purple and neutral swatches, status
  colors under the historical name `semantic`, flat `themes`, gradients and glow.
- `catalog.css` defines its own Dark/Light `--v2-*` colors. Its Dark Subtle is
  `#202733`, while the old foundation theme uses `#222832`; neither is the newly
  approved `#1B212B`. Elevated is `#191F29` / `#F1F4F9` and Border is
  `#303846` / `#CCD4E0`. These historical values are retained for component specimens
  until their separate migration.
- `CatalogApp.tsx` repeats the gradient and its brand stops in `cssTheme`.
  `FoundationPages.tsx` imports foundation colors but repeats icon/status tones.
  `foundations.css` and `spacing.css` also contain direct brand colors and alpha
  variants. Primary, Orbital Glow and Outline have their own existing state rules.

### Authoritative structure

- `colorTokens.primitives.brand`: unchanged approved brand palette.
- `colorTokens.primitives.neutral`: the original ramp plus intermediate steps for
  the approved new shades; old numbered steps keep their values.
- `colorTokens.primitives.status`: unchanged success, warning, error and info colors.
- `colorTokens.semantic[mode]`: `surface` (canvas/default/subtle/raised), `border`
  (default/control/focus/accent), `text` (primary/secondary/disabled/onBrand/onSecondary/accent),
  and `icon` (default/muted/disabled/accent). Icon roles alias the matching text colors.
- `colorTokens.interaction[mode]`: default, hover, pressed, focus, selected and disabled.
  Ordinary hover/pressed use neutral fills; `brand` preserves the existing purple
  action colors as exceptions. Existing `actionActive` maps to brand `pressed`.
- `colorTokens.status[mode]`: foreground/background/border pairs, unchanged.
- `colorTokens.effects[mode]`: the approved Blue × Purple gradient, decorative backdrop,
  glow and shadow color. `effects.orbitalGlow` holds the existing conic color layer;
  component animation and gradient reversal behavior remain untouched.

| Role | Dark | Light |
| --- | --- | --- |
| Canvas | `#090B10` | `#F5F7FA` |
| Surface | `#141820` | `#FFFFFF` |
| Subtle | `#1B212B` | `#F1F4F8` |
| Raised | `#212833` | `#EDF1F6` |
| Hover | `#2B3442` | `#E5EBF2` |
| Pressed | `#364253` | `#D8E2EC` |
| Border Default | `#3D495B` | `#B9C5D3` |

Other text, control border, focus, disabled, status and decorative colors retain
their previous values. Selected uses Raised with an existing brand indicator as
an initial role mapping, not a newly approved component appearance.

### Compatibility and later removal of duplicates

`brandColors`, `neutralPrimitives`, `neutral` and status `semantic` are views of the
same underlying values used by `colorTokens`, not separately maintained palettes.
The `neutral` swatch list keeps its exact original entries and order. Flat `themes`
is a compatibility adapter: unchanged roles reference `colorTokens`; only old
Subtle, Border and Brand Soft are retained in a private `legacyThemeValues` map.
This preserves every current consumer's values, including previews outside V2.

When a specific component migration is explicitly requested, import `colorTokens`
and map the needed semantic/state roles to CSS variables in that component's
existing theme owner. For example, `--v2-surface` will read
`colorTokens.semantic[mode].surface.default`, and ordinary hover will read
`colorTokens.interaction[mode].hover.background`. Edit the original declarations
and remove their superseded literals in the same change; do not append overrides
or create another palette file. Brand effects keep their separate role mapping.

Migrate the shell, individual component styles and foundation displays only in
approved scopes. Remove a compatibility export or retained value only when its
last import/reference has been migrated. Until then, existing CSS literals and
compatibility values intentionally stay in place. No CSS variables or visual
changes are applied by this token definition alone.

### First migration: catalog shell

`CatalogApp.tsx` maps `colorTokens` directly into the existing `cssTheme` object.
Canvas, Surface, primary/secondary/accent text, gradient, brand stops and shadow
retain their previous colors; their duplicate declarations were removed from CSS.
Shell-only CSS aliases reference semantic Subtle, Raised, Border Default and
interaction hover/pressed/selected. They contain no independent color values.

Sidebar, topbar, common panel/status borders and overview cards use these roles.
Overview cards use Raised; the theme toggle uses Subtle. Navigation distinguishes
selected, hover and pressed, keeping the existing selected indicator and keyboard focus.
Layout, responsive rules, typography, navigation actions and theme switching are unchanged.

Component-specific rules for Buttons, Icons, Typography, Colors and Spacing remain
untouched. Their old `--v2-elevated`, `--v2-subtle`, `--v2-border`, `--v2-soft` and
`--v2-error` values still have consumers and remain in their original theme rules.
In particular, historical Elevated/Soft and the Light danger color `#E8004D` have
no exact approved semantic replacement; they are deliberately deferred rather
than guessed. Common containers may use new neutral borders around unchanged specimens.
The shared global focus rule also remains unchanged: the Dark focus token differs
from its current purple, and this migration authorizes only neutral color changes.
