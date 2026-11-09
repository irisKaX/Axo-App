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
