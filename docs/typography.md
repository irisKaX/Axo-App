# Axo-App · Typography

Status: **Poppins selected; type scale is a candidate for visual review**.

## Source of truth

- `src/design-system/foundations/typography.ts`: font families, supported weights (400, 500, 600, 700), named typography roles and example text.
- `src/pages/TypographyStudio.tsx`: visual type scale, UI use cases and optional interactive playground.
- `src/pages/typography-studio.css`: scoped typography catalog styling, without appended patches, `!important` or duplicate override blocks.
- `index.html`: Poppins hosted via Google Fonts (only the four needed weights), with system fallback.
- `src/styles.css`: product-wide Poppins stack.

## Principles

1. Use *semantic typography roles* rather than arbitrary type sizes in each component.
2. Headings use 600–700; paragraph copy 400; controls and buttons 500–600.
3. Prefer 14px for standard dense UI copy and 12px minimum for supportive text in this initial design. Do not downsize operational instructions to fit a fixed widget without reconsidering layout.
4. The scale currently spans 12–48px. Responsive adjustments should preserve hierarchy, with container or viewport-specific sizing as necessary.
5. Use system monospace only for technical IDs, code and URLs requiring precise glyph distinction.
6. Test Czech diacritics, long labels, line wrapping, keyboard focus and 200% text zoom.
7. Design token values are candidates and can be adjusted after real widget testing.
8. Never embed or redistribute font files through ChatGPT outputs. The app references the hosted stylesheet.

## Roles

`display`, `h1`, `h2`, `h3`, `h4`, `bodyLg`, `body`, `bodySm`, `label`, `button`, `caption`, `overline`.

## Next review

Approve visually in Light / Dark; test on Small and Large widgets. Spacing, radius and components remain separate milestones.


## Approved Text Treatments

All three patterns below are **approved** and live in `Foundations → Typography → Text Treatments`.

- **Accent Dot:** base heading uses current theme text; the final punctuation dot uses `--brand` (Iris Purple `#7C4BFE`). Use `<AccentDot>`.
- **Accent Word:** highlight one meaningful word or short phrase with `--brand`, while the rest stays neutral. Use `<AccentWord before={...} accent={...} />`.
- **Eyebrow + Heading:** a visually uppercase overline directly above a heading, spaced by `space.2` (8px). The heading ends with the Accent Dot. Use `<EyebrowHeading eyebrow={...}>`.

### Single source of truth
- `src/design-system/foundations/text-treatments.ts`: approved variants and semantic roles.
- `src/components/TextTreatments.tsx`: reusable React components.
- `src/components/text-treatments.css`: treatment styling.
- `src/pages/TypographyStudio.tsx`: visual showcase.
- `src/design-system/foundations/colors.ts`: central Iris Purple token.
- `src/design-system/foundations/spacing.ts`: 8px eyebrow/heading gap.

The treatment components inherit the heading's size and weight from context. Use the underlying semantic headings where appropriate. The punctuation dot is decorative and hidden from assistive technology to avoid announcing isolated punctuation. The word accent is actual text and stays in the accessibility tree.

Do not add additional branded text variants without explicit approval.
