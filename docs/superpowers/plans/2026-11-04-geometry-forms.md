# Neo Iris Geometry and Forms Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task. Steps use checkbox syntax for tracking.

**Goal:** Centralize the existing geometry scale and refine the existing forms catalog without changing approved button visuals.
**Architecture:** Export CSS custom properties from the existing TypeScript radius object into the app's existing theme context. Consume those properties in canonical components and existing catalog examples. Keep native form semantics and the existing custom select; use a single inset focus stroke rather than border plus outer outline.
**Tech Stack:** React 19, TypeScript, CSS, Vite, Playwright.
**Spec:** ../specs/2026-11-04-neo-iris-geometry-forms.md

## Global Constraints

- Radius scale: xs 8px, sm 12px, md 18px, lg 24px, xl 32px, xxl 40px, pill 9999px, round 50%.
- Standard fields: 52px height, 24px radius, 18–20px horizontal padding. Form container: 32px.
- Error #FF0A54; success #9EF01A. Keep Colors v2 and Typography unchanged.
- Preserve text buttons 32/40/48px, circle sizes, Blue × Purple reversal and glyph/border animations.
- No server submission, !important, duplicate corrective CSS layers or new unrelated components.
- Both themes, mobile/laptop/desktop; forms remain a proposal awaiting visual approval.

## Review Focus

- Focused invalid and successful fields still have one focus indicator and meaningful feedback.
- Select skips disabled options; Escape/Tab and outside click close it predictably.
- Complete Form is independent of specimens; invalid submission focuses the first invalid control.
- Long labels and open dropdowns fit a narrow mobile viewport.
- Geometry token adoption preserves button dimensions and animation construction.

## Task 1: Shared geometry

Files: spacing.ts, App.tsx, existing scoped CSS files, SpacingStudio.tsx, beam fixture, geometry tests.
- [x] Capture current forms and buttons in both themes.
- [x] Add failing checks for 24px fields / 32px form container / 52px height and single focus.
- [x] Export `radiusCssVariables` from `spacing.ts`, inherited through the existing app context and test fixture.
- [x] Replace literal radii with semantic tokens in existing foundations and components; keep button pill/circle values identical.
- [x] Update Spacing & Grid with all eight tokens and explicit field/button rules.

## Task 2: Canonical forms and complete form

Files: FormControls.tsx, form-controls.css, FormsStudio.tsx, forms-studio.css, form tests.
- [x] Refactor shared field styling and state colors; one 2px inset focus indicator, no extra outline.
- [x] Align check/radio/switch outlines, touch areas, disabled and reduced-motion states.
- [x] Preserve select semantics; test disabled items, Home/End, Escape, Tab and long labels.
- [x] Refine complete form layout, local validation and feedback associations; focus first invalid input/selection/consent.
- [x] Make a corrected but not yet resubmitted form show a neutral status, not a stale error or success.
- [x] Mark the design explicitly as a proposal for visual approval.

## Task 3: Verification and delivery

Files: Playwright tests, docs/inputs-forms.md, docs/spacing-grid.md, verification screenshots.
- [x] Test focus, geometry, choice states, form validation without network writes, select keyboard navigation and viewport overflow in both themes.
- [x] Run existing button/gradient suites and compare actual catalog button screenshots before/after.
- [x] Capture and inspect desktop/mobile Light/Dark screenshots and focus/open/error states.
- [x] Run full `npm test`, `npm run typecheck`, `npm run build`, and Pages build.
- [x] Review code and prepare the tested commit.
- Delivery: push without rewriting remote history, confirm Pages deployment and report changed files/results in the task handoff.
