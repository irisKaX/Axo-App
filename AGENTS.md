# Axo-App — mandatory working instructions for coding agents

## CURRENT PHASE: DESIGN CATALOG ONLY
Axo-App is currently a **visual, interactive design catalog and playground** for exploring what a possible future Axolotl application may look like. **There is no existing application, no production application, no backend, and no pending implementation to ship.** Do not describe mockups as product features or production functionality. Do not silently transition from design exploration to app development.

These instructions take priority over historical plans, documents, code comments, test fixtures, and previous automation practices whenever they suggest application implementation or elaborate verification. Keep existing user-approved visual choices unless the user requests changes.

## The task
- Prioritize visual fidelity, aesthetics, hierarchy, layout, spacing, typography, animations, and interactive design previews.
- Design examples may use local demo state and dummy content solely to illustrate behavior. Never build persistence, accounts, servers, APIs, databases, authentication, deployment infrastructure, or real tool workflows without an explicit new request.
- Prototype and compare the few alternatives the user requests. Prefer small, focused, reversible changes with a preview that can be inspected immediately.
- Keep the design catalog accessible at its existing GitHub Pages URL. Preserve the existing Pages publishing workflow, which is only a way to VIEW the catalog, not a production app release.
- Treat design branches and /preview/converter as isolated previews, not as product environments. Do not merge unrelated draft designs into main.

## STOP: no tests or CI expansion
- **Do not write, update, run, or request automated tests** (Playwright, Vitest, Jest, visual regression, pixel sampling, geometry sampling, snapshots, accessibility test suites or browser automation), unless the user explicitly requests a named test.
- Do not add or reactivate test workflows, check gates, test reports, screenshot matrices, QA artifacts, coverage tools, or test dependencies.
- Do not run `npm test`, `npx playwright ...`, or install browser test dependencies.
- No routine lint/typecheck/build/test loops or broad audits. For an explicit publication, use only the build needed by the existing GitHub Pages deployment. For a local change, use the minimum necessary development/build check only when actually needed to present it.
- Visual inspection by the user is the acceptance criterion for design work. State clearly what changed and where it can be previewed; do not claim automated verification.
- If something is clearly broken, fix the affected code directly; do not build test machinery around it.

## CSS and code quality: editable source of truth
- **No CSS overrides as a repair strategy**: do not append repeated selectors, emergency styles, `!important`, duplicate declarations, cascade layering, inline style patches, or temporary "fix" files to mask the original rule.
- Find the original definition and edit it in place. Consolidate or remove conflicting obsolete rules when touching that part. One clear source of truth per property/component/state/breakpoint/theme.
- Prefer existing design tokens and shared components. Keep styles alongside their owned component/section. Avoid giant global stylesheet patches and needless abstractions or refactors.
- Use readable, small components and straightforward state. Do not add packages, frameworks, generators, utilities, configs, directories, or documentation for hypothetical future needs.
- Update BOTH light and dark visual variants, relevant preview scales, and responsive rules *when the changed component uses them*, without adding automated tests.
- Don't silently alter approved components or unrelated catalog sections.
- Do not introduce new CSS override files, duplicate classes with subtle differences, or new `!important` rules. Existing legacy overrides can be cleaned up incrementally when editing their component, not via unrelated mass rewrites.

## Fast execution and minimal scope
1. Read this file and only the files relevant to the request.
2. Identify the existing component + authoritative styles.
3. Change the smallest amount of code needed; remove superseded local rules.
4. Provide an immediately viewable catalog result. Do not hold up delivery for extra polishing, refactors, reports, tests, or a second task not requested.
5. Explain briefly what changed, what was deliberately left alone, and give the preview URL when available.

No multi-hour autonomous work on one visual change. No unnecessary architecture proposals, large plans, review gates, PR bureaucracy, generated screenshots, or speculative production requirements.

## Existing visual direction
Follow approved catalog choices and relevant design documentation: Clean Neo Iris; Poppins; dark-first but energetic light theme; rounded shapes; blue–purple gradients; the approved button/component states. Do not interpret historical milestones as permission to build an application.

## Changes to the phase
Only an explicit instruction from the user can move this project from **design exploration** to implementation, or authorize testing/CI infrastructure.
