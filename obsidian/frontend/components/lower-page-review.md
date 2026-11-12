# Method Clinical lower-page handoff

## Architecture
Services, About and Contact stay thin server-rendered section components. Their interactive leaves are Feature108, DocumentGuide and ExpandingArrowButton in src/components/ui. Radix Tabs supplies roving focus, arrow-key navigation, tab/tabpanel relationships and active state. No new application provider is required. Existing reduced-motion management applies to the spring button.

The inherited horizontal Services runway and About's negative top margin were removed together. Lower sections now have intrinsic content height and ordinary scrolling. Hero/Sourcing motion and their shared scene were not touched.

## Assets
- public/assets/flow-logo.png: approved Method Clinical Flow lockup, reused exactly.
- public/assets/flow-field.webp: approved emerald halftone field, reused exactly for the catalog panel.
- Opening assets and scene configuration: unchanged.
- No downloaded Pinterest art or external reference brand appears in the implementation.

## Data and honest states
- Existing SERVICE_CARDS provide the four sample names.
- src/data/mocks/lower-page.ts contains new lower-page copy.
- src/data/mocks/document-guide.ts contains the four field explanations.
- Document art is HTML, not a flattened screenshot and not an actual certificate.
- The access form remains a disabled preview with a linked privacy page. No submission endpoint or simulated success was added.

## Setup
Use the existing Yarn lockfile and Next/TypeScript/Tailwind setup. New runtime dependency: @radix-ui/react-tabs 1.1.13. Run yarn install, yarn lint, and yarn build. Static output is out/ as declared in .openai/hosting.json. Existing API routes require a server-backed deployment and are not live in this static build.

## Provenance
See DESIGN-DECISIONS.md for exact 21st, Pinterest, GetLayers and YouTube resources. The original 21st expanding button used Motion; this adaptation uses the project's existing spring dependency instead. No modification to vendored animation code.

## Review scope
Chromium desktop 1363px and iframe viewports at 390px and 320px, with normal reading-size screenshots. This is responsive browser testing, not physical phone testing. Local QA-only iframe harness is outside the repo and deployment. Source protection is checked against the opening commit 1c7b17ed085bb2ec27422bf40dac8e37ada74a16.

## Final validation
- Next 16.2 production static build and TypeScript: pass.
- ESLint: zero errors; three existing unused eslint-disable warnings in icon/OG files.
- Git whitespace and protected opening source diff: pass.
- Desktop and 390px responsive sections inspected; 320px cramped tabs, button and graphic corrected and rechecked. Document scroll width equals client width at the smallest test.
- Catalog and document tab click/arrow-key states, focus indication, expanding-arrow state, access anchor and top-level privacy navigation checked.
- Form is visibly disabled and never submitted.
- OS reduced-motion preference, physical devices and Safari not tested.

## Provider Access restoration
Owner correction: the last page is locked. Contact was restored exactly from commit 1c7b17ed085bb2ec27422bf40dac8e37ada74a16, bringing back the approved full-height DNA and form layout and removing the new footer. Earlier compact-access descriptions are superseded. Catalog and document-guide work remains.
