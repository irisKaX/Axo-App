# Axo-App · Current design-only scope

## Status
This repository currently exists to explore and choose the visual design of a future Axolotl multitool. **There is no application yet.** Catalog interactions are design demonstrations only, not complete tool implementations.

The authoritative working rules are in [../AGENTS.md](../AGENTS.md). Historical implementation milestones and test plans have no authority in the current phase.

## Current priorities
1. Establish a cohesive Clean Neo Iris visual language: foundations, components, states, spacing, gradients, typography and responsive layout.
2. Compare user-requested alternatives in a usable catalog with realistic desktop-sized previews and relevant mobile previews.
3. Keep the code simple to edit. Fix the owning CSS rule in place; do not stack override selectors, duplicates or `!important` patches.
4. Reuse the approved tokens and components. Preserve the approved appearance of unrelated sections.
5. Favor short, incremental visual revisions over major architecture, speculative implementation or lengthy verification.

## Not in scope
- Application functionality, production implementation, backend, data storage, authentication, deployment architecture or business logic.
- Automated browser testing, visual regression, screenshot sweeps, geometry/pixel validation, report uploads, quality gates or new CI.
- New frameworks and dependencies unless specifically approved.

## Publication
GitHub Pages hosts the **design catalog preview**. Keep its existing deployment pipeline, but do not confuse a successful build with design approval or application readiness.

## When development begins
Only move to an app implementation plan after explicit user approval. Do not assume that the app already exists or is waiting to be launched.
