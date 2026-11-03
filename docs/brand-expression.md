# Axolotl · Brand Expression

Status: visual candidate for review. Brand Identity and Colors v2 remain separate and intact.

## Source of truth
- `src/design-system/foundations/brand-expression.ts`: gradient choices, Figma frame references and brand image registry.
- `src/design-system/foundations/colors.ts`: exact brand colors, including the Figma mid-stop `#642FDF`.
- `public/brand/axolotl-head-white-figma.png`: actual white 2D Axolotl head, exported from Figma image layer `37:1136` (in Frame 24).
- `src/pages/BrandExpression.tsx`: visual gallery and interactive states.
- `src/pages/brand-expression.css`: page-scoped layout and rendering. No appended CSS overrides, no `!important`.

## Gradient recipes from Figma
Original Figma gradient stop positions and colors are preserved as-is. CSS direction is a visual approximation of the Figma transform.

| Frame | Start | Middle | End |
| --- | --- | --- | --- |
| 24 · Electric Blue | #4B13BF | #642FDF | #168EDA |
| 25 · Luminous Lilac | #4B13BF | #642FDF | #AF6CFB |
| 26 · Plasma Violet | #4B13BF | #642FDF | #A33DBF |
| 27 · Deep Electric | #08089A | #3B09C7 | #642FDF |

## Usage rules
1. A large Bright Blue brand surface may use `#168EDA` with a dark, readable foreground.
2. The white 2D head is a brand mark and is not a substitute for the full 3D mascot or the future small-size icon standard.
3. Use brand gradients for the hero, selected featured content, onboarding and branded covers. Avoid filling every widget with them.
4. Working surfaces remain neutral, using semantic token values from `themes` in Colors v2.
5. Do not use decorative brand gradient backgrounds behind small, essential operational text without checking actual contrast across every gradient stop.
6. Preserve the exact original mark file. Recoloring, modifying or generating additional versions requires a separate design decision.
7. O2 Blue `#0050FF` remains the corporate brand color for O2 context; it is distinct from Bright Blue.

## Review checklist
- Confirm Figma head looks identical in browser to the original
- Check the four gradients against Figma reference
- Check responsive page on mobile and desktop
- Confirm Light / Dark catalog containers don't dilute the vibrant brand surfaces
- Confirm TypeScript and production build
