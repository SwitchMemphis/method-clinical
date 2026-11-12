# Method Index testing section

Owner-selected Concept A, 2026-11-08. `src/views/home/sections/testing.tsx` is the server section; `testing-index.tsx` is its client leaf. Content is typed in `src/data/mocks/testing.ts` and passed from HomeView. Native disclosures own open state and work before hydration. Toggle events update the seven-plane SVG and selected-layer caption. One disclosure is open at a time via the shared native name attribute; all can close. Geometry is intrinsic SVG coordinates, with local semantic tokens for color and rendered height. No new animation loop or library. CTA reuses the current Button and goes to #about.

Section order: Hero, Sourcing, Testing, Catalog, Documents, Provider Access. No changes to protected existing sections. Selected concept reference is retained in DESIGN-DECISIONS.md. Verification results belong in PROJECT-STATUS.md.

Desktop screen-fit revision: at >=1024px, bounded viewport-height typography/spacing replaces width-scaled sizes only within Testing. Min-height follows the viewport while natural height preserves overflow recovery; phone/tablet flow stays unchanged. See PROJECT-STATUS.md for measured results.

Full-copy revision: all rows start closed; first plane remains the initial selected visual. Rows 1–6 show exact owner-provided summary and two detail groups. Row 7 shows its complete re-testing heading, paragraph and documentation CTA. No content-derived HTML. Native details keeps the one-open invariant, including keyboard operation. Natural section growth takes precedence over a fixed fold when expanded. Current section order includes Clinic Growth between Documents and Provider Access.
