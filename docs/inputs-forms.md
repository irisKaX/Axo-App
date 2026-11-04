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
