# Axo-App

Clean foundation for the **Axolotl 2.0** application, design system and widget framework.

## Tech stack
- React 19
- TypeScript
- Vite 7

## Run locally
```bash
npm install
npm run dev
```

## Check and build
```bash
npm run typecheck
npm run build
```

## Structure
- `src/design-system/foundations`: shared design rules and tokens
- `src/design-system/components`: reusable components
- `src/design-system/patterns`: composed interaction patterns
- `src/widgets`: widget implementations and states
- `src/layouts`: dashboard and workspace layouts
- `src/pages`: application screens
- `docs`: architecture and design decisions

See [architecture](docs/architecture.md).

> The current page is only a temporary technical landing page, **not** an approved application design. No old Axolotl UI has been imported.

## Automated deployment

The GitHub Actions workflow `.github/workflows/deploy.yml` builds and deploys each push to `main` to GitHub Pages. It can also be started manually from the Actions tab.

**One-time GitHub setting:** Open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

Published site (after first successful deployment): https://iriskax.github.io/Axo-App/

The Vite base path is set to `/Axo-App/` for Pages deployments by the `GITHUB_PAGES` environment variable. Local development still uses `/`.

## Browser regression tests

```bash
npm ci
npx playwright install chromium
npm test
```

The Border Beam tests capture 120 phases over its 3-second orbit in Light and
Dark, covering all three button sizes, short/long labels and icon-only buttons.
They compare pixels with the beam hidden, check that changed pixels stay in the
2px capsule ring (with one pixel diagonal of antialiasing tolerance), and check
1,000 points of each continuous SVG centerline against the capsule to 0.01px.
Real hover, keyboard focus, dynamic content/height, disabled and reduced motion
are also tested. Screenshots at eight phases per theme are in
`playwright-report/index.html` (`npx playwright show-report`). CI uploads this
report and requires tests to pass before deploying Pages.

For a system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable.
The measured SVG viewport tracks the button border box; its 2px stroke is inset
1px with equal radii derived from the shorter dimension. Oversized independent
SVG rx/ry values would produce an ellipse, not a capsule. Beam filters are
intentionally omitted so the light stays within the border rather than glowing
outside it. Other gradient and icon effects are unchanged.
