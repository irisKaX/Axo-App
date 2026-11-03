# Axolotl · Brand Expression

Status: **approved visual selections only**.

## Approved assets
- **Deep Electric**, Figma Frame 27: `#08089A → #3B09C7 → #642FDF` (stops at 0%, 50%, 100%).
- **Bright Blue** brand surface: `#168EDA`.
- **White 2D Axolotl head**: original asset `public/brand/axolotl-head-white-figma.png` from Figma layer `37:1136`.

## Source of truth
- `src/design-system/foundations/brand-expression.ts`: the approved gradient, surface and asset.
- `src/design-system/foundations/colors.ts`: shared brand color primitives.
- `src/pages/BrandExpression.tsx`: visual catalog with approved examples only.
- `src/pages/brand-expression.css`: scoped canonical styles, without appended overrides or `!important`.

## Usage
1. Use Deep Electric with the white 2D head for selected hero, cover and brand contexts.
2. Use Bright Blue as a strong brand surface, not as a replacement for all functional controls.
3. Keep everyday workspace surfaces neutral.
4. Avoid overlaying small operational text on a gradient without a contrast check.
5. Preserve the actual white brand mark. Do not recolor or redraw it without approval.
6. O2 Blue `#0050FF` is a distinct corporate color.

CSS uses an approximate angle for the Figma gradient. Its HEX stops and their order are exact.

Unapproved alternatives from Frames 24–26 and speculative standalone violet/dark mark treatments are excluded from Brand Expression.
