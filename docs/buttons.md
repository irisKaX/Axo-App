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
- Compact: 32px high, 14px padding, 12px font.
- Default: 40px high, 20px padding, 13px font.
- Comfortable: 48px high, 24px padding, 14px font.
- Text buttons use `radius.pill` (9999px).
- Icon-only controls stay at 36/44/52px for clearer hit targets, use `radius.round` (50%), and always have equal width/height.
- Text-pill heights are intentionally slimmer than icon-only controls; their text, color, gradient and icon motion remain unchanged.
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

The gradient button uses only approved `bluePurple.css` from Brand Expression. Every button remains in place on hover; no vertical lift.

Interaction studies (inspired by user-supplied Uiverse references, adapted for Axolotl's palette and geometry):
- **Copy / two paper layers:** animate the upper and rear sheet separately within SVG. Avoid translating the entire glyph.
- **Download / arrow into tray:** move the arrow toward a stationary tray. The control remains stationary.
- **Arrow / travel and return:** arrow exits to the right and returns within the same visual footprint.
- **Plus / Refresh / Settings:** subtle rotations, purpose-driven rather than generic bouncing.
- **Icon-only:** subtle focus/hover ring with a label tooltip derived from the accessible name.
- **Gradient:** Blue × Purple has a small animated background-position shift. Shadows can change, button position does not.
- Gallery offers an in-page motion toggle; turning it off affects icon animations on the four study samples.
- All styles honor `prefers-reduced-motion: reduce`. Real focus-visible, disabled and loading states remain operational.

The four supplied Uiverse pages are design references, not copied component specifications. The Buttons patterns remain candidates until visually approved.


## Premium gradient redesign candidate

The earlier four Gradient Lab finishes (Luminous Rim, Electric Glow, Soft Glass and Light Sweep) were rejected. They are removed from the catalog and from the button component API.

The new **single design candidate** is a smooth, borderless Blue × Purple button with translucent lighting derived from existing Bright Blue and Light Violet brand colors. The approved Blue × Purple foundation is unchanged. Its base color field is visible at all times, and the light within the pill subtly intensifies on hover. The button itself does not move upward.

All previously approved icon interactions (Copy, Download, Arrow, Plus, Refresh etc.) remain intact. The standalone Gradient Button treatment is **not approved yet** and must be visually reviewed in the deployed catalog.

Design reference: https://uiverse.io/Yaya12085/plastic-quail-42. The exact CSS and live behavior of this third-party design were not accessible for inspection; the implementation is an original Axolotl direction informed by the user’s critique, not a claim of pixel fidelity.


## Animated gradient border candidates (not approved)

Two opt-in `AxoButton borderMotion` variants were added without changing the standard gradient:
- `borderMotion="beam"`: a short glowing SVG stroke follows the actual pill outline (normalized path length). The beam appears on hover/focus.
- `borderMotion="spin"`: a rotating conic-gradient color segment is masked to a 2px pill perimeter. It appears on hover/focus.
- `borderMotion="none"` (default) keeps the existing button unchanged.

Both are previews in `Components → Buttons → Gradient Button` and must be visually approved. They retain the approved icon motion, keep the control stationary, and turn off movement with `prefers-reduced-motion: reduce`.

Inspiration: [Appica Border Beam](https://21st.dev/@appica-dev/components/border-beam/length-thickness-speed) and [Meng To Spinning Border Button](https://21st.dev/@mengto/components/spinning-border-button). These animations are original Axolotl implementations rather than imported third-party code.
