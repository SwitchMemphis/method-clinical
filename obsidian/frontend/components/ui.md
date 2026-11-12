---
tags: [frontend, component, catalog, stable]
updated: 2026-08-10
---

# Catalog — UI primitives

Design-system primitives in `src/components/ui/`. Server Components unless noted below. Interactive 21st-derived leaves use local state and Radix primitives without new application providers.

## `button.tsx` — `<Button>`

The design's only button shape: a pill. Figma nodes `1546:199` (primary),
`1546:201` (secondary), `1572:533` (primary + arrow disc).

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `children` | `ReactNode` | — | Label |
| `variant` | `"primary" \| "secondary"` | `"primary"` | brand green / lime |
| `href` | `string` | — | present → renders `<Link>`, absent → `<button>` |
| `withArrow` | `boolean` | `false` | trailing lime disc with `ArrowUpRightIcon` |
| `type` | `"button" \| "submit"` | `"button"` | ignored when `href` is set |

> [!important] The element follows the behaviour
> `href` renders a real anchor, otherwise a real `<button>` — never a `div` with
> a click handler ([[html-semantics]]). The arrow variant drops its right
> padding (`pr-0.5`) because the disc sits flush with the pill edge, exactly as
> in the mockup.

Colour comes from `--action-primary*` / `--action-secondary*`; the hover state
is a token-backed CSS `transition-colors`, which is the narrow exception hard
rule #1 allows (ADR-0014).

## `shimmer-button.tsx` — `<ShimmerButton>`

A mint pill with a spring-driven highlight that follows mouse and pen movement.
Pass `href` for a Next.js link or omit it for a native button. The two homepage
hero actions use the default variant and size. The highlight uses the action
border token by default and can be customized with `shimmerColor`. Keyboard
focus uses the action outline. Touch and reduced-motion visitors see the static
pill. The companion demo is available for development imports.

## `arrow-fill-button.tsx` — `<ArrowFillButton>`

The homepage catalog and clinic registration actions and the menu sign-in
action use this pill as a link. It also supports native buttons.
Its trailing arrow disc expands across a stationary label on hover, keyboard
focus, or press. The component uses existing action colors and disables
transitions when the visitor requests reduced motion.

## `icons/` — `<DnaIcon>`, `<ArrowUpRightIcon>`

Icons extracted from the Figma frame and hand-converted to components rather
than dropped in `public/` as `.svg` files.

> [!note] Why components, not assets
> The exported SVGs bake in `#F8FFB4`. An `<img>` can't be re-coloured, and a
> baked hex is a hard rule #4 violation the moment the palette moves. Both
> icons paint with `fill="currentColor"`, so the colour comes from a token on
> the parent (`text-action-secondary`, `text-accent`, …) and one icon serves
> every context.

Both take `{ className }` only — size with `size-*`, colour with `text-*`.
The original exports are kept in `public/assets/icons/` for reference.

## Adding a primitive

Named export, typed `interface …Props`, no `any`, under ~150 lines. Anything
that needs a provider or browser state belongs in [[components/common]]
instead, and anything specific to one page belongs next to that page — see
[[folder-structure]].

## Related

[[component-conventions]] · [[design-system]] · [[html-semantics]] ·
[[components/home-sections]]

## Method Clinical lower-page components (2026-11-07)

- `feature-108.tsx`: client compound selector and shared copy/media panel, adapted from 21st Feature 108. Accepts readonly ServiceCard items; Radix tabs owns selection.
- `document-guide.tsx`: client vertical field selector and matching COA illustration. Four supplied field concepts, no real lab values.
- `expanding-arrow-button.tsx`: client native link, children/href/className, expanding mint field and dotted chevrons using react-spring. Mouse and keyboard focus supported; decorative graphics are aria-hidden.

See [[lower-page-review]] for sources, data, assets and QA.
