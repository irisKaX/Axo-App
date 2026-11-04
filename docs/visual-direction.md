# Visual Direction · Neo Iris

Status: **approved direction**. There is one product direction, no alternative concepts.

## Sources of truth
- `src/design-system/foundations/colors.ts`: Colors v2 and semantic Light/Dark themes.
- `src/design-system/foundations/brand-expression.ts`: approved Blue × Purple gradient, Bright Blue and original white 2D axolotl head.
- `src/pages/VisualDirections.tsx`: current UI demonstration only.
- `src/pages/visual-directions.css`: scoped layout styles; all functional colors come from semantic theme custom properties.

## Approved style
- Neutral dark app canvas `#090B10`, no muted purple surfaces.
- Iris Purple `#7C4BFE` for main actions.
- Bright Blue `#168EDA` on large brand surfaces.
- O2 Blue `#0050FF` in O2-specific contexts.
- Blue × Purple `#0F9FDC → #3B09C7 → #8101EC` as the main brand gradient.
- White 2D head from Figma as the approved brand mark.
- Poppins as the UI typeface.

## Cleanup
Aurora Glow and Playful Plasma are retired from the catalog, along with their CSS palettes and controls. The old Neo Iris preview was replaced rather than patched with additional overrides.

This is a directional preview, not a definitive component or widget library. Component dimensions and layouts will be specified separately.
