# Axo-App — Axolotl visual design catalog

**Current phase: visual design exploration only.** This repository is an interactive catalog for finding and refining the look of a **possible future** Axolotl multitool application. No application has been built, no product is deployed, and no backend is planned or implied by the existing catalog.

**Read [AGENTS.md](AGENTS.md) before making changes.** In this phase agents must prioritize quick visual iterations, clean editable source CSS (no override patches), and must not introduce or run automated tests, Playwright, or CI verification. Changes should remain narrowly scoped to what was requested.

## Tech used to render the design catalog
- React, TypeScript and Vite
- Demo UI and local preview state, not working application features
- GitHub Pages for showing designs, not publishing a product

## Run the catalog locally

```bash
npm install
npm run dev
```

## Structure
- `src/design-system`: visual foundations and components
- `src/widgets`: visual widget examples
- `src/layouts`: example compositions and page layouts
- `src/pages`: catalog and example screens, not implemented product pages
- `docs`: design decisions and approved visual direction

## Preview publication
The existing `.github/workflows/deploy.yml` builds and publishes the visual catalog to GitHub Pages when `main` changes. It also renders a separate converter design preview from its designated design branch. Keep this workflow working; it is not a test pipeline.

Catalog: https://iriskax.github.io/Axo-App/
Converter design preview: https://iriskax.github.io/Axo-App/preview/converter/

## Historical material
Some older documents, test files and draft PRs refer to implementation, production readiness, CI or extensive regression verification. They document past experiments, **not current requirements**. Do not activate or expand those systems without explicit user approval. The design catalog is the only scope.

Design Catalog V2 preview is published from the isolated `design/catalog-v2` branch to `/Axo-App/preview/v2/` by the existing GitHub Pages workflow. This preview is design-only and does not change the main catalog.
