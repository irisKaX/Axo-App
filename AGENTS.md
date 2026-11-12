# Axo-App — mandatory working instructions for coding agents

## Current phase: design catalog only
Axo-App is a **visual, interactive design catalog and playground**, not an existing or production application. Do not turn design exploration into application development or describe mockups as implemented product functionality.

- Work on `design/catalog-v2`; keep `main` and unrelated design branches untouched unless explicitly authorized.
- Read this file and `docs/catalog-v2.md` before work. Use `docs/roadmap.md` for future direction; dated checkpoints record historical context, not necessarily current code or synchronization.
- Preserve user-approved visual choices and interactions. Changes to approved shared components require explicit authorization; authorization already given in the conversation remains valid.
- Use local React demo state and dummy content only. No persistence, accounts, servers, APIs, databases, authentication or real tool workflows without an explicit new request.

## Visual direction and source of truth
- Follow Clean Neo Iris, Poppins, rounded geometry, approved blue–purple gradients and neutral interaction surfaces in both Dark and Light Mode.
- Use `colorTokens` in `src/design-system/foundations/colors.ts`, existing typography/spacing tokens and approved shared components. Do not create parallel palettes or theme systems.
- Edit original CSS definitions directly. No repair overrides, repeated selectors, duplicate declarations, cascade layers, inline style patches, temporary fix files or `!important`.
- Keep one clear source of truth per component, property, state, breakpoint and theme. Remove superseded rules only within the requested scope.
- Do not silently redesign approved components or refactor unrelated sections. Check relevant theme and responsive rules when changing their owner.

## No tests or CI expansion
- **Do not write, update, run or request automated tests** unless the user explicitly requests a named test. This includes Playwright, Vitest, Jest, browser automation, snapshots, visual regression, pixel/geometry sampling and accessibility test suites.
- Do not add or reactivate test workflows, gates, screenshot/report matrices, coverage tools or test dependencies. Do not run `npm test` or `npx playwright`.
- No routine lint/typecheck/build/test loops. Visual inspection by the user is the acceptance criterion; do not claim automated verification.
- No build, deployment or additional Vite server without a task-specific need and authorization. Preserve the existing GitHub Pages publishing workflow as a catalog viewer; do not trigger it without an explicit publication request.
- Do not perform commit, push, pull, merge, rebase, reset or other synchronization without explicit authorization. Never merge draft designs into `main` on your own.

## Small, focused delivery
1. Read only relevant sources and identify the component and its authoritative styles.
2. Make the smallest focused, reversible change; preserve other local work.
3. Do not add packages, frameworks, generators, infrastructure or abstractions for hypothetical future needs.
4. Provide an immediately viewable catalog result, a short explanation, changed files and the preview URL when available. Stop at the requested boundary.

Prefer screen-first exploration after the approved foundations. Do not generate Library components from a speculative checklist or start the next screen automatically. No unnecessary reports, review gates, PR bureaucracy, screenshots or multi-hour polishing for one visual change.

Only an explicit user instruction can authorize application implementation or testing/CI infrastructure.
