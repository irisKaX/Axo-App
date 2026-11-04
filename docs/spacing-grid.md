# Axolotl · Foundations / Spacing & Grid

Status: initial system values ready for visual review. Buttons and widgets in the gallery are spatial examples, not approved final components.

## Source of truth
- `src/design-system/foundations/spacing.ts`: spacing, radius, control heights, layout and density tokens.
- `src/pages/SpacingStudio.tsx`: interactive gallery with radius specimens, pill/round buttons, spacing scale, widget density and grid controls.
- `src/pages/spacing-studio.css`: scoped styling without `!important` or override stacking.
- Existing Colors v2, Brand Expression and Poppins remain authoritative for color, imagery and type.

## Spacing
4px baseline scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
Guidance: 8px inside tightly related elements, 16–24px between peers, 24–32px card padding, 40–64px section separation.

## Shape
- `xs 8px` for micro elements.
- `sm 12px` for inputs and tooltips.
- `md 18px` for small cards.
- `lg 24px` default widget / card.
- `xl 32px` for panels and feature blocks.
- `xxl 40px` for large hero surfaces.
- `pill 9999px` for full-length text buttons and filter chips.
- `round 50%` for circular icon-only controls, with equal width and height.

## Control sizing
- Compact: 36px control height, 14px horizontal inset, 12px font.
- Default: 44px control height, 20px horizontal inset, 13px font.
- Comfortable: 52px control height, 24px horizontal inset, 14px font.
- Circle buttons: 36px / 44px / 52px in matching control sizes.
- Minimum recommended touch target: 44×44px, including invisible surrounding hit area if a smaller visual circle is used.

## Grid
- Mobile: less than 600px, 4-column model.
- Tablet: 600–1199px, 8-column model.
- Desktop: 1200px and above, 12-column model.
- Space between grid items: 12px compact, 16px default, 24px spacious.
- Maximum proposed content width 1440px. Sidebar reference 245px.
- Cards should not be fixed to a desktop-only layout. Their width is flexible, and content should reflow in fewer columns.

## Density
- Comfortable (default): 32px inner padding and 24px peer gap.
- Compact: 16px inner padding and 12px peer gap.

## Review
Check mobile responsive layouts, both catalog themes, keyboard focus, icon target size, and that rounded buttons do not truncate Czech labels.

Future Component Library should consume these geometry tokens, not duplicate values or copy showcase markup as production components.
