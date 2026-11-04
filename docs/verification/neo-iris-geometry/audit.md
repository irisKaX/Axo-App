# Neo Iris geometry and forms audit

Initial audit base: df2b507. Before delivery, the refactor was rebased onto 892dc4a, preserving its new Visual Patterns route and shared Workspace Composition. Their existing CSS also consumes the shared geometry tokens; inner corners derive from the outer token minus the 1px container border. The published environment checkout was older, so the current main
was fetched and fast-forwarded before this work. No earlier gradient/button work
was repeated. Form visuals remain a **návrh k vizuálnímu schválení**.

## Findings and resulting behavior

1. **Focus — corrected.** The old 16px field painted a brand border plus a 3px
   outline with a 2px gap. New 24px fields replace the resting border with one
   2px inset indicator. In forced system colors an inset system outline replaces
   the shadow, preserving one visible indicator. Focus changes do not animate
   over the previous border.
   [Light before](before-light-focus.png) · [Light after](after-light-focus.png)
   [Dark before](before-dark-focus.png) · [Dark after](after-dark-focus.png)
2. **Complete Form — refined, awaiting visual approval.** Field heights, spacing,
   consent mark and CTA are coherent. The 32px container reflows to one column;
   errors remain readable and local validation focuses URL, city or consent in order.
   [Light before](before-light-complete.png) · [Light after](after-light-complete.png)
   [Dark before](before-dark-complete.png) · [Dark after](after-dark-complete.png)
3. **Select and choices — verified.** Native checkbox/radio/switch state and keyboard
   behavior remain intact. Select skips disabled options, supports Home/End and
   arrows, closes on Escape/outside click, and Tab continues after the trigger.
   A fresh reviewer also checked Shift+Tab, long option labels and outside clicks
   at 390px. Disabled labels remain readable; checked disabled preferences remain visible.
   [Open Select](after-light-1280-select.png)
4. **Responsive layout — verified at 390, 1280 and 1600px in both themes.** No
   horizontal document overflow; menu stays within viewport width. Mobile CTA
   uses available width without changing approved button height or shape.
   [Mobile Light](after-light-390-complete.png) · [Mobile Dark errors](after-dark-390-errors.png)
   [Desktop Dark](after-dark-1600-complete.png)
5. **Shared geometry — centralized.** The existing scale in spacing.ts derives
   CSS custom properties; all existing radius declarations use it or inherit.
   Shell navigation, statuses, existing cards/widget previews, tooltips and all
   Foundation examples use semantic sizes. No new unrelated components were added.
   [All eight tokens](after-radius-catalog.png)
6. **Buttons — preserved.** Only radius references and tooltip radius tokenization
   changed in buttons.css. Text heights 32/40/48, circles 36/44/52, the Blue × Purple
   gradient/reversal, glyph motion and both border animations remain in place.
   An independent pixel comparison of the actual gradient button interiors in the
   before/after Buttons catalog found **0 changed pixels in both themes**.

## Verification notes

The original geometry regression failed on the old 16px radius. The new suite
covers single focus in normal/error/success states, system contrast colors,
shared 24px geometry, local validation without navigation or fetch/XHR writes,
feedback associations, disabled choices, keyboard Select, reduced motion and
responsive widths. Actual saved screenshots above were opened and inspected.

The first whole-suite run found two false comparisons in the existing border
animation test: reported pixels were at tooltip corners outside the buttons.
A fixed sleep was replaced with waiting for actual completion of non-border
animations. Because SVG paint toggles can also re-rasterize tooltip corners,
the border-only matrix hides tooltip decoration; a separate real-catalog test
checks visible tooltip text, its 12px radius and unchanged button dimensions.
The geometric and pixel assertions/tolerances were not relaxed.
The hidden reference is saved as an additional diagnostic artifact.

Colors v2, typography tokens, button construction and button size tokens are
unchanged. This is component-level accessibility evidence, not a claim of full
WCAG compliance. An all-disabled select list is guarded in code but does not
currently have a separate automated fixture. Long-label and Shift+Tab checks
were also performed independently by the reviewer.

The deployment workflow runs the complete Playwright suite, typecheck and Pages
build before publishing; the HTML report with phase screenshots is uploaded as
an artifact. Publication status is reported separately in the task handoff.

## Verification result

Initial complete suite: 35/35 passed; TypeScript, local build and Pages build passed.
Final integrated suite: **38/38 passed** (including Visual Patterns and a real tooltip check).
TypeScript, local production build and `GITHUB_PAGES=true` production build passed.
`git diff --check` passed. Fresh code review found no blocking issues.

## Changed files
- `docs/inputs-forms.md`
- `docs/spacing-grid.md`
- `docs/superpowers/plans/2026-11-04-geometry-forms.md`
- `docs/superpowers/specs/2026-11-04-neo-iris-geometry-forms.md`
- `docs/verification/neo-iris-geometry/after-dark-1600-complete.png`
- `docs/verification/neo-iris-geometry/after-dark-390-errors.png`
- `docs/verification/neo-iris-geometry/after-dark-complete.png`
- `docs/verification/neo-iris-geometry/after-dark-focus.png`
- `docs/verification/neo-iris-geometry/after-light-1280-select.png`
- `docs/verification/neo-iris-geometry/after-light-390-complete.png`
- `docs/verification/neo-iris-geometry/after-light-complete.png`
- `docs/verification/neo-iris-geometry/after-light-focus.png`
- `docs/verification/neo-iris-geometry/after-radius-catalog.png`
- `docs/verification/neo-iris-geometry/audit.md`
- `docs/verification/neo-iris-geometry/before-dark-complete.png`
- `docs/verification/neo-iris-geometry/before-dark-focus.png`
- `docs/verification/neo-iris-geometry/before-light-complete.png`
- `docs/verification/neo-iris-geometry/before-light-focus.png`
- `src/App.tsx`
- `src/components/FormControls.tsx`
- `src/components/buttons.css`
- `src/components/form-controls.css`
- `src/components/workspace-composition.css`
- `src/design-system/foundations/spacing.ts`
- `src/pages/FormsStudio.tsx`
- `src/pages/SpacingStudio.tsx`
- `src/pages/brand-expression.css`
- `src/pages/buttons-studio.css`
- `src/pages/color-studio.css`
- `src/pages/forms-studio.css`
- `src/pages/spacing-studio.css`
- `src/pages/typography-studio.css`
- `src/pages/visual-directions.css`
- `src/pages/visual-patterns.css`
- `src/styles.css`
- `tests/border-beam.spec.ts`
- `tests/fixtures/beam.tsx`
- `tests/neo-iris-geometry.spec.ts`
