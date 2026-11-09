# Verification · Axolotl Layout System v1.0

## Environment and method

Verified 2026-11-09 in Linux Chromium (`/usr/bin/chromium`) using the existing Playwright infrastructure. Dependencies installed with unchanged lockfile. The initial npm default-cache path was unavailable; setting `--cache /workspace/.npm` resolved setup without changing dependencies.

Primary command:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium \
  npx playwright test tests/layout-system.spec.ts --workers=3 --timeout=30000
npm run build
git diff --check
```

On a standard development machine or GitHub Actions, install Playwright Chromium and omit the executable-path environment override. The new `Verify Axolotl Layout System` workflow runs the focused suite, strict production build, and uploads screenshots/report independently of the historical full-catalog check. No deployment workflow was changed.

## Final results

- Focused layout suite: **88 passed**, 0 failures (1.3 minutes), after all fixes.
- `npm run build`: passed (strict TypeScript build and Vite production bundle).
- `git diff --check`: passed.
- Historical catalog suite: 5 passed, 41 failed in 7.7 minutes with bounded timeouts; causes below.
- 26 screenshots captured; representative desktop/mobile, empty/result, light/dark and overflow images visually inspected.

## Coverage and evidence

- All four archetypes plus integrated Image Converter: 1366×768, 1440×900, 1920×1080 and 390×844, both themes. These tests assert actual shell dimensions, accidental page overflow, primary/footer action reachability and independent desktop panel scrolling.
- Empty/populated scenarios, explicit processing/success/error/disabled content, omitted optional panels, compact/expanded form-result composition, constrained supporting-panel width.
- 45 selected files, long filenames, last-row scrolling/removal, empty upload, illustrative conversion results and disabled actions.
- Theme changes in either direction preserve selected files in the iframe. Resizing the literal-size iframe preserves file state. The fullscreen link opens the same route and fills its actual tab viewport.
- Keyboard skip link, select navigation, focus stroke, slider changes, theme toggle, navigation menu, mobile modal Escape/focus restoration. Separate test verifies a modal inside the mobile iframe remains isolated while the surrounding catalog is usable.
- Tablet 768×1024 and short laptop 1366×500. Stacked compact-form and editor non-overlap regression at 1366×768 and 1000×500.
- Existing Dashboard renders six actual widgets inside the same AppShell. Catalog has no copied navigation or static component screenshots.

Representative screenshot files live in [screenshots](screenshots/): each archetype and converter at 1366 and 390 in both themes, converter empty/success in both themes, long file list and mobile catalog. Screenshots were visually inspected for composition, readable controls, clear boundaries, safe filename truncation and horizontal overflow. They are review evidence, not pixel-baseline tests. Dynamic header time and platform font rendering may vary. The repository's existing Poppins font declaration is preserved; external font delivery remains an existing network dependency.

## Issues found and fixed

1. Initial structure tests failed before migration: the converter had no shared shells. File-selection/action test now verifies the integrated chain.
2. Mobile page overflow came from right-edge button tooltip pseudo-elements. Shared shell tooltip anchors now stay inside available width; they no longer add invisible horizontal page overflow.
3. Footer button text truncated at the canonical fixed width. Shared action bars let widths fit text while keeping approved 38px height and the original AxoButton implementation.
4. Initial iframe theme propagation could reset a light catalog to dark. A ready handshake plus user-change messages separates initialization from user intent; origin/window validation remains in both directions.
5. Independent review found compact FormResult and stacked Editor grid rows could shrink below their visible child content. Min-content rows and supporting-wrapper minimums prevent overlap while retaining parent scrolling. Tests failed before the fix and pass afterward.
6. Generic status `is-empty` collided with an existing icon catalog selector and inflated the empty converter footer. Shared status now uses scoped data-state styling. Regression failed at 122px footer height before the fix.
7. Default supporting panels grew to 566px at desktop width. Explicit compact/default/wide clamps keep them within documented bounds (default maximum 415px, matching preserved converter precision work).

8. Final light-mode screenshot inspection found FileDropzone pins dark Atmosphere tokens internally. An opt-in inheritTheme prop lets the converter inherit shell semantics without changing existing catalog specimens. A token-inheritance regression failed before the fix.

Independent read-only review reported no Critical issues, the stacked-region issue above, and an iframe-modal coverage gap. Both were addressed. Conversion/download implementation, existing illustrative navigation destinations and unrelated historical tests were explicitly outside this layout task.

## Historical test blockers

The existing 46-test catalog suite completed with **5 passed and 41 failed** using bounded 12-second per-test timeouts instead of waiting the default 120 seconds on obsolete selectors. These failures are not treated as passing or silently skipped:

- `forms-controls.spec.ts`, `theme-switch.spec.ts`, `neo-iris-geometry.spec.ts`, `gradient-reveal.spec.ts` and parts of other button tests click old `Components / Inputs & Forms` or `Components / Buttons` labels. Current navigation uses `Inputs & Forms` and `Buttons`.
- `border-beam.spec.ts` and `gradient-surface.spec.ts` expect `.axo-button--gradient` fixture buttons. The existing fixture renders the current primary variant; the expected class count is zero. Those button/fixture files are unchanged by this PR.
- `widget-launch-catalog.spec.ts` expects no launch buttons in real widgets; the existing approved widget implementation contains two in its catalog.

Representative stale navigation and widget-count failures were reproduced against the untouched original checkout at `55734f9`, which has the same UI as base main `079ba62` (only deployment workflow differs). Historical selector/visual-oracle repairs belong to a separate change; this PR does not change approved controls to satisfy outdated assertions. Focused layout tests verify the affected navigation, themes, forms and actual dashboard behavior directly.

## Deployment and capability limits

No deployment is claimed. The existing trusted-main Pages workflow publishes main plus the separate converter-design preview. Publishing this feature as another Pages subpath requires adding its branch to that trusted workflow; doing so would change main before this PR is reviewed. Production Pages and the converter design branch were left unchanged. Use `npm run dev` and Library → Layouts, or `?tool=image-converter`, for review.

No real conversion, image compression, download backend, metadata processing or persistence was added. Every tool demonstration states its illustrative scope. No merge into main was performed.
