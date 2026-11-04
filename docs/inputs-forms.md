# Axo-App · Components / Inputs & Forms

Status: **design candidates for review**, not yet approved as production visual styles.

## Components

- `src/components/FormControls.tsx`: `FormInput`, `FormTextarea`, `FormSelect`, `FormCheckbox`, `FormRadioGroup`, `FormSwitch`.
- `src/components/form-controls.css`: canonical control appearance and states.
- `src/pages/FormsStudio.tsx`: interactive demo and local form validation.
- `src/pages/forms-studio.css`: responsive gallery styles only.

## Rules

- Use the existing Poppins, Colors v2 and Neo Iris radius values; do not use unstyled browser-native dropdown UI.
- Form fields have visible labels, disabled, focus and semantic error/success feedback.
- Text/URL and textarea use native accessible form fields with custom visual styling.
- Select is a custom button + listbox with hover, keyboard arrows, Home/End, Enter/Space, Escape, outside-click dismissal and disabled options. Popup chevron has sufficient padding. Keep the popup inside a dialog or scroll container in future integrations, and test mobile positioning.
- Checkbox and Radio use native input semantics with styled visible controls, preserving keyboard navigation and labels.
- Toggle Switch uses input type=checkbox with role=switch and a visual pill track. It communicates its state both visually and semantically.
- Small controls need practical minimum touch targets, including an enlarged hit target where necessary; final mobile size is subject to review.
- Reduced-motion is respected.

## Validation

Use Playwright to check Select keyboard interaction, native checkbox/radio/switch state changes, focus and error validation, light and dark themes. No control styles or tokens should be marked globally approved until user review.

## Complete Form integration fix

The Complete Form is now an independent editable demo, not a read-only summary of controls higher on the page. It includes its own URL field, styled city Select, mandatory consent checkbox and submit action in a semantic `<form>`. Validation errors appear next to the relevant controls and the status changes on submission. User edits invalidate an earlier success. The form uses no network action or persistent storage. Separate component specimens remain independent.

## Neo Iris geometry refinement

Status: **návrh k vizuálnímu schválení**. This refines the existing design language; it is not an approval of the new form visuals.

- `spacing.ts` remains the only radius scale. `radiusCssVariables` derives CSS properties from it, and App's existing theme context supplies them to all descendants. Standalone hosts should supply the same variables alongside Colors v2.
- Input, Select and Textarea use `--radius-lg` (24px), 20px horizontal padding and the same neutral field surface. Default Input/Select height is 52px; compact is 44px, comfortable is 60px. Textarea starts at 144px and remains resizable.
- Error is the unchanged semantic #FF0A54; success is #9EF01A. Feedback includes a decorative state symbol plus readable neutral text, rather than low-contrast green body text on white.
- Focus replaces the resting border with one 2px inset theme-focus stroke. It does not stack a second outer outline. Border/shadow focus changes are immediate, avoiding an intermediate double stroke. Forced system colors replace the shadow with one inset system outline.
- Checkbox/Radio marks are 24px with consistent 1.5px borders. Native inputs and labels retain semantics and keyboard control; labels provide at least 44px interaction targets. Disabled checked/unchecked states remain distinguishable.
- Switch has a 52×30px pill track and a centered 20px circular thumb. Choice/switch animation respects reduced motion.
- The dropdown uses radius.lg, rounded 44px option rows and the same field geometry. Home/End/arrows skip disabled options; Escape restores trigger focus; Tab/Shift+Tab close the menu and continue in document order. A list with no enabled options disables the trigger.
- Complete Form uses radius.xl (32px), independent local state, clear label/field spacing, responsive CTA placement and explicit privacy copy. Invalid submission focuses the first invalid control. Consent feedback is associated with its native input. Editing invalidates a prior success; a corrected form shows a neutral ready status until submitted again.
- No form data is sent to a server or persisted. Tests watch document/fetch/XHR writes and navigation during validation.

[Visual audit, before/after screenshots and changed-file list](verification/neo-iris-geometry/audit.md)


## Theme Switch · Dark / Light (candidate)

- Reusable controlled component: `src/components/ThemeSwitch.tsx` and `src/components/theme-switch.css`.
- Showcase: `Components → Inputs & Forms → Theme Switch`, alongside light and dark visual surfaces.
- Controlled `theme` and `onThemeChange` props; the single source of application theme state remains `src/App.tsx`. Changes via the existing header controls update the switch, and changes via the switch update the entire catalog.
- Semantic `input type="checkbox" role="switch"` and explicit accessible name; checked means Dark and unchecked means Light. Space, click and touch are supported by native control behavior.
- Distinct sun/moon indicators, fully round track and thumb, visible keyboard focus and disabled styling.
- Animation is a restrained thumb slide with changing icons and surfaces; `prefers-reduced-motion` disables transitions.
- The appearance is a visual **candidate**, not yet approved. The existing header control remains available.
