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


## Gradient & motion candidates

- **Gradient** uses only approved `deepElectric.css` from `src/design-system/foundations/brand-expression.ts` (Frame 27). Its stops are not changed or supplemented.
- Hover movement is restrained: 2px lift, a subtle themed shadow, and gradient background-position shift.
- Purposeful icon hover patterns: arrow-right 4px right, download 3px down, plus 90° rotation, copy a small diagonal shift, refresh 50° rotation, settings 35° rotation, check scale, close rotation, trash 2px up.
- All real hover effects are defined in the reusable `src/components/buttons.css`, not only the playground. The playground simulates the gradient state with the same property values.
- `iconMotion={false}` disables the icon micro-interaction for special contexts; the `prefers-reduced-motion: reduce` media query stops motion automatically.
- Focus remains visible without requiring hover, and disabled/loading do not animate on hover.
- All these are **candidates for visual review**, not approved design decisions yet.
