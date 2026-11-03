# Axo-App · Brand Identity

## Mascot master
The primary brand character is the user's supplied pink 3D axolotl (purple eyes, pink gills, lilac hoodie, deep-purple trousers) on a dark violet backdrop.

Catalog asset: `public/brand/axolotl-master-preview.webp` (optimized **160 × 213** WebP preview from the supplied image). This is a catalog placeholder for the original high-resolution master, not a replacement. Do not upscale for production print or hero imagery; preserve and upload the original high-resolution asset when packaging final brand assets.

## Brand accent candidates
`src/design-system/foundations/brand.ts` defines six candidate accent colors. These are harmonized design proposals, not measured colors extracted from pixels. The approved functional colors remain in `colors.ts`. Avoid duplicate primary action colors.

## Brand usage
- Welcome/onboarding: hero-sized mascot, contained with sufficient safe area.
- Empty states/help: restrained placement and clear message.
- Navigation, favicon, buttons: create a separate simplified 2D head; do not shrink a complex 3D render.
- Do not scatter mascot imagery across every widget, invent expression variations, distort or recolor the master.

## Code organization
- `BrandIdentity.tsx`: content and interactive theme preview.
- `brand-identity.css`: standalone scoped page styling. No appended overrides or `!important`.
- `brand.ts`: identity reference and candidate accent colors.
- `colors.ts`: one source of truth for production color roles. Unchanged by this brand identity milestone.

## Review
Check dark/light visual presentation, safe spacing, legibility, and image quality before considering this brand identity final. A higher-resolution master should replace the preview before broad production use.
