# Axolotl · Components / Buttons

Status: **visual design candidate** for review. No button design is marked as approved by this entry.

## Single source of truth
- `src/components/Buttons.tsx`: reusable `AxoButton` and `ButtonIcon` with typed variants and sizes.
- `src/components/buttons.css`: implementation styles for states.
- `src/design-system/foundations/spacing.ts`: shared control heights, horizontal paddings, pill/round radius.
- `src/design-system/foundations/colors.ts`: semantic Light and Dark colors.
- `src/pages/ButtonsStudio.tsx`: fully interactive component gallery.
- `src/pages/buttons-studio.css`: gallery-only layout and simulated-state styles.

## Candidate variants
Primary, Gradient, Secondary, Ghost, Outline, Danger. Variants express priority, not business logic.

## Sizes and geometry
- Compact: 36px high, 14px padding, 12px font.
- Default: 44px high, 20px padding, 13px font.
- Comfortable: 52px high, 24px padding, 14px font.
- Text buttons use `radius.pill` (9999px).
- Icon-only controls use `radius.round` (50%), with equal width/height.
- For compact icon-only controls intended for touch, plan a minimum 44x44px interactive hit area; the demo documents this but should not be used as a production touch layout until implemented.

## States
Default, hover, active, focus-visible, disabled and loading. The gallery provides state controls for visual inspection, while real component CSS responds to pointer and keyboard interactions.

## Behavior
- Standalone icon buttons require an accessible label.
- Loading locks the action and exposes `aria-busy`.
- Copy uses the Clipboard API. Download uses a browser Blob and local object URL to download a sample text file. Add/Remove update only a local preview counter.
- CSS respects reduced motion preference.

## Review criteria
Inspect light and dark modes, contrast, pill shape, compact circular controls, hover/focus, danger prominence, icon consistency, keyboard interactions, Czech long labels and mobile wrapping. Do not mark as approved until the user accepts the resulting gallery.

No new gradients or brand variants are introduced here.

## Playground controls

The variant and size selectors in the Buttons gallery are pill-style button groups with native `button` semantics and `aria-pressed`, not native visual `select` dropdowns. The full custom Select pattern (including arrow positioning, popup options, and keyboard behavior) belongs in **Components → Inputs & Forms**. No user-facing form control should expose unstyled browser-default appearance. Do not use these pill selector groups as a replacement for true Select fields elsewhere.


## Gradient & refined interaction candidates

The gradient button uses only approved `deepElectric.css` from Brand Expression. Every button remains in place on hover; no vertical lift.

Interaction studies (inspired by user-supplied Uiverse references, adapted for Axolotl's palette and geometry):
- **Copy / two paper layers:** animate the upper and rear sheet separately within SVG. Avoid translating the entire glyph.
- **Download / arrow into tray:** move the arrow toward a stationary tray. The control remains stationary.
- **Arrow / travel and return:** arrow exits to the right and returns within the same visual footprint.
- **Plus / Refresh / Settings:** subtle rotations, purpose-driven rather than generic bouncing.
- **Icon-only:** subtle focus/hover ring with a label tooltip derived from the accessible name.
- **Gradient:** Deep Electric has a small animated background-position shift. Shadows can change, button position does not.
- Gallery offers an in-page motion toggle; turning it off affects icon animations on the four study samples.
- All styles honor `prefers-reduced-motion: reduce`. Real focus-visible, disabled and loading states remain operational.

The four supplied Uiverse pages are design references, not copied component specifications. The Buttons patterns remain candidates until visually approved.


## Premium gradient design studies (visual candidates)

Four *unapproved* finish options are available in `Components → Buttons → Gradient Lab`:
1. **Luminous Rim**: restrained layered gradient with a luminous border.
2. **Electric Glow**: stronger purple aura, with the same approved Deep Electric color stops.
3. **Soft Glass**: inner glass-like layer with brighter reflection.
4. **Light Sweep**: directional shine across the pill on hover.

The active preview is selected locally in the catalog, not persisted as the global design-system approval. All variants use the exact `deepElectric` gradient token, and the icon hover animations approved earlier remain unchanged. No full-button upward hover motion. Motion honors reduced-motion preferences.

User inspiration links:
- https://uiverse.io/Yaya12085/plastic-quail-42
- https://uiverse.io/ParasSalunke/selfish-dolphin-96
- https://uiverse.io/vinodjangid07/wonderful-squid-57
- https://uiverse.io/adamgiebl/pink-chicken-70

The studies are original Axolotl treatments, not copies of those external buttons.
