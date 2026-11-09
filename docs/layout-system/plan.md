# Axolotl Layout System Implementation Plan

> Execute inline using superpowers:executing-plans. User authorized autonomous implementation.

Goal: integrated, verified layout foundation with a reviewable draft PR.
Architecture: shared AppShell and ToolShell; four composable archetypes; same page routes in literal-size iframe previews.
Tech: existing React 19, TypeScript strict, CSS, Playwright; no new dependencies.
Spec: supplied Axolotl Layout System v1.0 task; decisions in architecture.md.

## Global constraints

Preserve Poppins, both themes, semantic tokens, Iris Purple #7C4BFE, Blue × Purple gradient, existing 38px AxoButton and form controls. No scaling. No fake real results. No main merge. No unrelated changes.

## Review focus

Long filenames and many rows: no accidental page overflow, independently reachable rows and footer.
Missing optional panels: no empty tracks or separators.
Narrow/short viewports: no clipped CTA, mobile document flow.
Preview boundary: exact pixel dimensions, modal stays inside preview, same tree as direct route.
Keyboard and theme: focus stays visible, controls usable, theme sync doesn't discard selected files.

## Task 1: Shell and converter migration

Files: src/layouts/AppShell.tsx, theme.ts, ToolShell.tsx, primitives.tsx, archetypes.tsx, layout-system.css; src/pages/ImageConverterLayout.tsx, image-converter-layout.css; src/App.tsx; DashboardStudio and its CSS.
Interfaces: contracts in architecture.md. Converter exposes initialState for illustrative scenarios; query routes use the same page component.
- [x] Add failing Playwright test for direct converter shell, unclipped CTA and real file selection.
- [x] Run targeted test and record expected missing shell failure.
- [x] Implement shared shells, WorkspaceLayout and migrate converter/dashboard with preserved controls.
- [x] Run typecheck and targeted test, fix issues, commit.

## Task 2: Archetypes and catalog

Files: archetypes.tsx, LayoutDemonstrations.tsx, ViewportPreview.tsx, LayoutsStudio.tsx, layouts-studio.css, App.tsx.
Interfaces: use Task 1 shells/regions. Route registry supplies identical standalone and iframe pages; theme messages origin checked.
- [x] Add failing tests for four archetypes, optional regions, states and literal viewport iframe dimensions.
- [x] Verify failures; implement remaining archetypes and labeled live examples.
- [x] Replace duplicate schematic previews, preserve Dashboard catalog access and existing sections.
- [x] Verify all viewports, themes, preview/fullscreen, focus and overflow; commit.

## Task 3: Verification and review

Files: tests/layout-system.spec.ts, docs/layout-system/{usage,verification}.md, screenshots.
- [x] Expand to required viewport/theme/state matrix; verify long lists/names, keyboard, nav, CTA, theme sync.
- [x] Run full existing suite with bounded per-test timeout; diagnose unrelated failures and run focused regressions.
- [x] Capture and inspect representative screenshots, production build, strict typecheck.
- [x] Review whole diff, fix material issues, document evidence and limitations.
- [ ] Commit feature branch, push without force, create draft PR; check actual CI result. Do not merge.
