# Image Converter · Precision pass 01

Status: **isolated design experiment**, not approved and not merged into `main`.

## Inputs reviewed
- `src/design-system/foundations/colors.ts`: semantic dark canvas `#090B10`, raised surface `#141820`, brand accent `#7C4BFE`, Blue × Purple gradient reserved for important actions.
- `docs/typography.md`: Poppins, semantic hierarchy and approved Accent Dot.
- `src/components/Buttons.tsx`, `FormControls.tsx`, `QualitySlider.tsx`, `AdvancedFormControls.tsx`: existing controls are the source of truth.
- Current converter in `Layouts → Image Converter` and user-provided screenshot at desktop viewport.

## Visual audit
1. **Empty state dominates the tool**: the drop target stretches to occupy spare height and uses a very deep dark fill. This reads as a hole, not a surface.
2. **Misplaced contrast**: the upload icon competes with the approved upload button. Action hierarchy is reversed.
3. **Settings feel like a list**: equal emphasis is given to all labels. Grouping between format, quality, and metadata is too weak.
4. **Slider has redundant numeric information**: the live percentage and the maximum endpoint `100` become competing labels. The active value is the only prominent number needed.
5. **Large viewport awkwardness**: need to preserve footer visibility and resist filling empty vertical space with decorative cards.
6. **Full screen and embedded preview** must share one system, adjusting density only.

## Direction chosen
**Precision / restrained neo-Iris**. Keep one workspace surface and the existing application header. Create hierarchy with spacing and contrast of *semantic surfaces*, not neon layers, multiple cards, or new components.

### Specific changes
- Dropzone is limited in height and placed within the image workspace rather than stretching to consume all remaining height.
- Dropzone background uses semantic surface mixture instead of near-black; use existing upload button unchanged.
- Icon becomes secondary, text and selection action remain primary.
- Subtle horizontal separation groups format settings and quality settings; metadata remains a secondary toggle.
- Hide only the converter instance's low/high numeric slider endpoints, retain current percent.
- Preserve all controls, drag/drop behavior, demo states, full-screen mode, and responsive breakpoints.

## Acceptance criteria before merge
- Inspect full-screen at 1440×900 and at ~1366×768. Footer must remain visible.
- Inspect embedded catalog preview, and narrower/mobile layout.
- Inspect empty, selected, converted; select, slider, toggle, upload, and drag-over interactions.
- Check dark and light theme, focus indicators, text readability, and reduced motion.
- Do not merge without a visual review comparing screenshot with the baseline.

## Out of scope
- New navigation, alternate button styles, decorative background animations, typography-system modifications, functional image processing.
