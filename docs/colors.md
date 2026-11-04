# Axolotl Colors v2

Status: **visual candidate, awaiting review**. Poppins Typography remains approved and unchanged.

## Reference and provenance

The user-selected Deen Studios visual reference was analyzed alongside exact color fills in Figma file `Yl6xYTF54MDovV7OYLuHR9`, page `Axolotl mood`. These include:
- Primary Purple: `#7C4BFE`
- Bright Cyan Blue: `#0F9FDC`
- Supporting Blue: `#168EDA`
- Electric Purple: `#8101EC`
- Royal Violet: `#4B13BF`
- Deep Violet: `#3906B3`
- Royal Blue: `#3B09C7`
- Deep Blue: `#08089A`
- Purple Magenta: `#A33DBF`
- Light Violet: `#AF6CFB`
- Near-black reference: `#000200`

These are source colors. Neutral surfaces, type colors, feedback colors and state colors are **designed adaptations**, not extracted from the Figma screenshot.

## Readable background/text combinations from Figma

Only the six source-exact pairs at or above 3:1 are included in the primary catalog.

| Figma frame | Background | Text | Contrast | Approved use |
|---|---|---|---:|---|
| 15 | #168EDA | #000200 | 5.86:1 | Normal + large text |
| 17 | #8101EC | #DDEAF2 | 5.44:1 | Normal + large text |
| 18 | #4B13BF | #DDEAF2 | 7.99:1 | Normal + large text |
| 13 | #7C4BFE | #0F0F0F | 3.92:1 | Large text only |
| 16 | #7C4BFE | #DDEAF2 | 3.99:1 | Large text only |
| 20 | #4B13BF | #0F9FDC | 3.27:1 | Large text only |

Large text for WCAG AA means at least 24px regular or approximately 18.66px bold. The catalog preview uses a bold headline size of at least 19px. Never reuse the marginal pairs for body copy, widget labels, or small buttons.

Frames 14, 19, 21, 22 and 23 are excluded because they fall under 3:1. These figures are based on exact solid fills and text colors from the Figma frames, not sampled screenshot pixels.

## Production structure

`src/design-system/foundations/colors.ts` is the single source of truth for:
- `brandColors`: source brand colors, O2 corporate color and mascot colors
- `referencePalette`: literal source swatches for provenance
- `themes.light` and `themes.dark`: semantic UI tokens
- `semantic`: independent status colors
- `purple` and `neutral`: supporting ramps, secondary documentation only
- `contrastRatio`: WCAG 2.x contrast calculation

`src/App.tsx` passes theme-specific custom properties to the UI.
`src/pages/ColorStudio.tsx` and `src/pages/color-studio.css` are the visual decision interface, not another separate palette.

## Approved conceptual roles

1. **Iris Purple** `#7C4BFE`: primary Axolotl identity and actions.
2. **Bright Cyan Blue** `#0F9FDC`: co-primary *visual* brand accent, not automatically a secondary button color.
3. **O2 Blue** `#0050FF`: exact corporate identity used only for O2 context.
4. **True Dark** `#090B10`: neutral app canvas without purple tint.
5. **Supporting violet/blue**: gradients, illustrations and large brand compositions, not every workspace card.
6. **Mascot**: pink and lilac remain in a separate, existing identity layer pending later mascot restyling.

## Guidance

- Keep ordinary widgets, sidebars, tables and form surfaces on neutral backgrounds.
- Reserve large saturated blue-to-purple gradients for hero/brand expressions, feature highlights and deliberate decorative areas.
- Never confuse O2 Blue with informational status or cyan with generic success status.
- Keep dark text on bright cyan where white would not meet normal-text contrast.
- Use WCAG AA targets: 4.5:1 normal text, 3:1 essential boundaries and icons. Decorative borders may be subtler.
- Light Mode has its own semantic neutrals but shares the brand palette.
- Do not append CSS overrides or `!important`; update canonical rules and tokens in place.
- Color v2 should be reviewed visually before treating it as locked, especially with actual future widgets.

## Not changed

Typography, spacing, approved mascot artwork and the independent Aurora Glow/Playful Plasma exploratory concepts.

## Approved semantic status colors (2026-11-04)

| State | Color |
| --- | --- |
| Error | `#FF0A54` |
| Warning | `#F6DE26` |
| Success | `#9EF01A` |
| Info | `#4CC9F0` |

These are shared status accent/border colors across light and dark themes, defined in `semantic` in `src/design-system/foundations/colors.ts`. For filled status messages, select independently contrast-compliant text colors. Warning and Success must not be used as small foreground text on white backgrounds. Verify text and icon contrast against the actual component surface before implementation.
