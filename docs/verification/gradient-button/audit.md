# Gradient Button construction audit

The initial audit inspected b92c1d0. Before integration, main had advanced to 58ea0f4, which extends the old inset surface by 1px. That version was also captured and inspected; the before images below show 58ea0f4. The layered construction and visible edge remained, so this change replaces that construction rather than retaining another inset adjustment.

1. Idle (before-light-idle.png / before-dark-idle.png): visible narrow colored rim shared by all three gradient variants. Computed background is `repeat ... padding-box border-box`: the gradient tile is sized to the padding box and repeats into the transparent 1px border. The inset radial surface has different dimensions and paints a second edge. All three variants share the defect.
2. Traveling Light hover (before-*-beam.png): the SVG centerline follows a capsule, but the button underneath has two clipped/rounded surfaces. The solid beam appears detached against that seam. Passing geometry tests did not establish a clean underlying fill.
3. Spinning Accent hover (before-*-spin.png): a conic gradient is restricted by a ring mask. This is an appropriate separate accent; the underlying multi-surface construction and saturated outer shadows are the problem. Icon-only gradient hover additionally inherits a permanent colored ring from the generic icon selector.

Construction after repair: one Deep Electric paint, `border-box no-repeat`, with the existing transparent border retained solely for unchanged layout dimensions. No inset surface, scaling layer or nested rounded gradient edge. Neutral depth shadows. A single measured SVG stroke for Traveling Light; a masked conic segment for Spinning Accent. Both disappear at rest and for reduced motion, including keyboard focus. Generic colored icon hover rings apply only to other variants. Icon glyph rules and color/typography/spacing tokens are unchanged.

The new visual oracle compares the complete idle fill, including all rounded edges, against an independent single Deep Electric paint. It failed before the fix (~28,300 differing pixels across 12 buttons per theme) and passed afterward. This catches rim defects in the base fill which the previous beam-hidden comparison intentionally subtracted away.

Accessibility: visible keyboard focus outline retained; icon labels/tooltips retained; disabled and reduced motion tested. This is component-level evidence, not a full accessibility compliance audit.

Limits: both specified 21st.dev reference URLs returned proxy HTTP 403. The screenshots in this folder were captured from the actual Buttons catalog in Chromium at DPR 2 in this audit run.

## Accepted visual evidence

1. Idle surface: visible rim removed; all three modes share the same clean fill.
   [Before, Light](before-light-idle.png) · [After, Light](after-light-idle.png)
2. Traveling Light: a short thin accent follows the existing capsule; the base has no inset seam.
   [After, Dark](after-dark-beam.png)
3. Spinning Accent: separate masked conic segment above the same clean fill; no permanent outline.
   [Before, Dark hover](before-dark-spin.png) · [After, Dark hover](after-dark-spin.png)

The same captured files were opened and visually reviewed. Focus remains an explicit accessible outline, not an unwanted resting border. The 1px transparent CSS border is retained for layout dimensions but is covered by the same gradient paint as the rest of the button. Typography, spacing and Colors v2 tokens are unchanged.
