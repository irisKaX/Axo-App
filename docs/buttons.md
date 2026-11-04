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
Primary, Secondary, Ghost, Outline, Danger. Variants express priority, not business logic.

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
