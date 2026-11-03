# Neo Iris · Colors

Status: **Candidate for design review**. This milestone covers color only. Typography, spacing and components remain separate decisions.

## Source of truth
- `src/design-system/foundations/colors.ts` owns primitive Purple/Neutral scales, semantic Light/Dark theme mappings, feedback states, and contrast calculation.
- `src/App.tsx` passes theme roles to CSS custom properties. UI components consume semantic properties, not isolated hex values.
- `src/styles.css` contains structural catalog styles, including component demonstrations. No end-of-file override layers or `!important`.
- `src/pages/visual-directions.css` holds three isolated experimental concepts. Their visual styling is deliberately separate from the accepted app color roles. Neo Iris is selected; the other two remain reference concepts.

## Theme principles
1. Same semantic meaning in both Light and Dark.
2. Dark is the preferred expressive reference. Light receives equally strong atmosphere, not pastel wash.
3. Reserve saturated colors for actions, emphasis, focus and feedback; use clean surfaces for text-heavy content.
4. Background gradients and glow are declared in the theme, not independently invented for each widget.
5. Contrast targets: 4.5:1 for normal text, 3:1 for meaningful non-text boundaries. Decorative borders need not pass 3:1.
6. Focus remains visible regardless of pointer hover; disabled state must not depend on color alone.

## CSS hygiene
- Edit existing canonical rules in place, never append "fix" or "override" blocks.
- Component-specific styling must use named semantic properties.
- Keep variant-specific experimental CSS grouped alongside its base definition.
- No `!important` and no ad-hoc duplicate selectors for the same purpose.
- A new design token requires a clear meaning and usage, not just a new color value.

## Next stage
Review Colors live in the catalog; if approved, proceed to Typography as a separate milestone.
