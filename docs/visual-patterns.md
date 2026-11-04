# Axo-App · Visual Patterns

**Purpose:** make repeatable UI language visible and traceable instead of letting it exist only inside isolated example-page CSS.

## Promotion from Typography

The visual composition in `Typography → Real Interface` has been extracted into the reusable `WorkspaceComposition` React component and `workspace-composition.css`. It is rendered in both Typography and `Library → Visual Patterns` from exactly the same source.

- `src/components/WorkspaceComposition.tsx`: composition and its illustrative content.
- `src/components/workspace-composition.css`: canonical shared visual styles, preserving the original Typography presentation.
- `src/pages/VisualPatterns.tsx`: catalog with full composition, anatomy and individual pattern specimens.
- `src/pages/visual-patterns.css`: catalog layout only.

## Responsibility and approval

- **Colors:** `themes.dark.backdrop` and `themes.light.backdrop` are source tokens for Atmospheric Surface. Blue × Purple remains the only approved main brand gradient.
- **Typography:** Poppins and the three approved Accent Dot, Accent Word and Eyebrow + Heading treatments are reused, never redefined.
- **WorkspaceComposition:** a compositional reference, not a mandatory application layout.
- **Tool Surface / Metric Card:** useful *candidate patterns*, not newly approved production components. Final card details and state handling must be reviewed when Components → Cards & Surfaces is built.
- **Forms / Buttons:** examples in the shared Typography composition are illustrative reference markup, not new versions of canonical FormControls or AxoButton. Production interfaces must import real components.

## Rule

If a style is to be reused across catalog pages or application surfaces, promote it to a named foundation token or a reusable component. Do not independently copy the same presentation into multiple unrelated CSS files. Do not approve new component patterns merely because they appear inside an attractive example.

The original Typography visual must continue to look identical in Light and Dark; only the implementation ownership changed.
