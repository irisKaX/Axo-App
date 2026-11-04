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
- `sm 12px` for tooltips and small controls.
- `md 18px` for smaller elements and dropdown option shapes.
- `lg 24px` for Input, Select, Textarea, cards and widgets.
- `xl 32px` for large cards, panels and complete-form containers.
- `xxl 40px` for large hero surfaces.
- `pill 9999px` for full-length text buttons and filter chips.
- `round 50%` for circular icon-only controls, with equal width and height.

## Control sizing
- Compact: 32px text-button height, 14px horizontal inset, 12px font.
- Default: 40px text-button height, 20px horizontal inset, 13px font.
- Comfortable: 48px text-button height, 24px horizontal inset, 14px font.
- Circle buttons: 36px / 44px / 52px in matching size variants, deliberately larger than the text pills.
- Minimum recommended touch target: 44×44px, including invisible surrounding hit area where controls are visually smaller. Small text-pill variants need an expanded hit target in touch contexts.

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

## Shared CSS geometry

The existing TypeScript `radius` object is the only source of truth.
`radiusCssVariables` derives `--radius-xs` through `--radius-round` from it;
the app's theme context and component test hosts inherit those exact values.
Scoped styles reference variables rather than defining another radius scale.
`inherit` is retained where an accent must follow its parent, such as Spinning Accent.

Existing navigation, status, cards, widget previews, tooltips and Foundations
examples consume this scale. Hero surfaces use xxl, panels xl, fields/cards lg,
small elements md/sm/xs, status/chips/text buttons pill and circle controls round.
The Spacing & Grid catalog shows all eight tokens and the field/button distinction.

Form fields use 24px corners, 52px standard height and 20px horizontal padding.
This does not alter approved button dimensions, Blue × Purple hover reversal or
Copy/Download/Arrow/Plus/Traveling Light/Spinning Accent animations.
