---
tags: [frontend, design-system, stable]
updated: 2026-07-17
---

# Design System — Tailwind v4

Styling uses **Tailwind CSS v4**, configured entirely in CSS. There is **no
`tailwind.config.js`**. ADR: [[decisions-log]] ADR-0004.

## Where config lives

`src/app/globals.css` is the single config file. Extra CSS layers can be split
into `src/style/index.css` and imported.

## Token naming convention

> [!important] This convention is **strict and portable by design**
> It is intended to be identical in every project built from this starter, so an
> agent or developer moving between them can predict a token's name without
> reading the file. Deviating in one project defeats the point. ADR: [[decisions-log]] ADR-0015.

Tokens are organised in **three tiers**. Each tier may only reference the tier
below it, and **no tier may be skipped** — semantic tokens are what make a
re-theme or a rebrand a one-line change instead of a find-and-replace.

| Tier | Grammar | Lives in | Example | Usable in markup? |
|------|---------|----------|---------|-------------------|
| **1 — Primitive** | `--raw-<category>-<name>[-<shade>]` | `:root` | `--raw-color-neutral-950` | ❌ never |
| **2 — Semantic** | `--<role>[-<variant>][-<state>]` | `:root` | `--background`, `--action-primary-hover` | ❌ only via its Tier-2 binding |
| **3 — Component** | `--<tw-namespace>-<component>[-<property>]` | `@theme inline` | `--radius-button` | ✅ `rounded-button` |

Plus the **theme binding**, which is what actually creates the utilities:

```css
@theme inline {
  --color-background: var(--background);   /* --<tw-namespace>-<role>: var(--<role>) */
}
```

### The rules

1. **Only Tier 1 contains literals.** A hex, px, or ms value anywhere else is a bug.
2. **Tier 2 names describe purpose, never appearance.** `--action-primary`, not
   `--blue`. `--surface-raised`, not `--grey-light`. If renaming the colour would
   force renaming the token, the name is wrong.
3. **Tier 2 is the themeable layer.** Dark mode and any runtime theming override
   Tier 2 tokens — never Tier 1, never a `@theme` entry.
4. **Every `@theme inline` entry is exactly `--<namespace>-<role>: var(--<role>)`.**
   No literals, no `calc()`, no skipping to `var(--raw-*)`.
5. **kebab-case, singular, unabbreviated.** `--raw-color-neutral-950`, not
   `--raw-clr-neutrals-950`. State goes last: `--action-primary-hover`.
6. **Tier 3 is rare.** Per ADR-0012 a repeated pattern is a React component, not a
   token set. Reach for a component token only when the same value must be shared
   across components that cannot import each other.

### Why Tier 2 is separate from `@theme`

`@theme inline` **inlines** each `var()` into the generated utility. That is what
makes overriding the Tier 2 token in a `prefers-color-scheme` block cascade into
every `bg-background` on the page. Binding a literal — or a `var(--raw-*)` —
directly in `@theme` freezes the value at build time and silently breaks theming.
The indirection is load-bearing, not ceremony.

### Namespaces that generate utilities

A token only becomes a utility if its prefix is a Tailwind namespace. Verified
against `tailwindcss` v4.3.3:

| Namespace | Generated utilities |
|-----------|--------------------|
| `--color-*` | `bg-*`, `text-*`, `border-*`, … |
| `--spacing-*` | `p-*`, `m-*`, `gap-*`, … |
| `--radius-*` | `rounded-*` |
| `--leading-*` | `leading-*` |
| `--tracking-*` | `tracking-*` |
| `--text-*` | `text-*` (size) |
| `--font-*` | `font-*` |
| `--ease-*` | `ease-*` |
| `--shadow-*` / `--blur-*` / `--animate-*` | `shadow-*` / `blur-*` / `animate-*` |
| `--breakpoint-*` / `--container-*` | `sm:` … / `max-w-*` |

> [!warning] There is **no `--duration-*` namespace** in Tailwind v4
> `--duration-fast` in `@theme` generates nothing and is not even emitted — a
> `duration-fast` class silently does nothing. Durations therefore stay **Tier 2
> only** and are consumed as `duration-[var(--duration-fast)]`. (Guides that list
> `--duration-*` alongside `--ease-*` are wrong for v4; `--ease-*` *is* real.)

If a value's prefix is not in that table, it is not a utility — either pick the
right namespace or use it via `var()` in an arbitrary value.

> [!important] The token rule
> **Never** hardcode hex values, pixel spacing, or named colours in `className` or
> inline styles. If a value doesn't exist as a token, **add it to `globals.css`
> first** — as a Tier 1 primitive plus the Tier 2 semantic token that names its
> purpose — with a comment noting where it came from (e.g. a Figma frame).

## CSS layers

Every custom style goes inside a layer — never outside one:

```css
@layer base {        /* element resets & defaults: h1, p, a … */ }
@layer components {  /* pseudo-elements & 3rd-party overrides only — see below */ }
@layer utilities {   /* single-purpose helpers: .scrollbar-none … */ }
```

## Where a style goes (ADR-0012)

`globals.css` is **not** a place to park component styles — it holds tokens and
base resets and stays a few hundred lines forever. Follow this order; the first
match wins:

| Situation | Goes where |
|-----------|-----------|
| One-off styling | Tailwind utilities in `className` — nothing in CSS |
| Repeated pattern with markup / structure / props | a **React component** in `components/ui/` |
| Repeated *pure-utility* combo, no structure | a Tailwind v4 `@utility` |
| Pseudo-elements, 3rd-party DOM overrides, complex selectors | `@layer components` — the genuine exceptions |
| A new colour / spacing / radius value | a **token** in `:root` + `@theme` |

> [!important] The default answer to "this looks repeated" is a **React
> component**, not a CSS class. An eyebrow label with a `::before` dot is an
> `<Eyebrow>` component — not a `.label-eyebrow` global class. `@layer
> components` is for what utilities and components genuinely *cannot* express.

There are **no CSS Modules** in this project — utilities + components cover
every case (motion is spring-based, so there are no keyframes to co-locate).

## Current theme state

This project carries the **Dantora** theme, lifted from the Figma frame
"Concept 4" (node `1518:1970`). That file defines no Figma variables, so every
value below was read off the layer fills and is recorded here as its origin.

| Tier 1 | Value | Where it came from |
|--------|-------|--------------------|
| `--raw-color-brand-500` | `#246f65` | logo mark, primary button, eyebrow text |
| `--raw-color-brand-900` | `#054038` | primary button border |
| `--raw-color-lime-200` | `#f8ffb4` | secondary button fill |
| `--raw-color-lime-400` | `#e5ed9b` | secondary button border |
| `--raw-color-mint-50` | `#eff4f2` | page background — **also the WebGL scene's `bgColor`** |
| `--raw-color-white-alpha-80` | `rgba(255,255,255,.8)` | frosted header / logo card |
| `--raw-radius-xs / sm / pill` | `4 / 8 / 46px` | logo square, glass card, pill buttons |
| `--raw-blur-glass` | `10px` | `backdrop-filter` on the frosted panels |

Tier 2 names them by role: `--accent`, `--action-primary[-border|-foreground]`,
`--action-secondary[-…]`, `--surface-glass`, `--corner-mark/panel/action`,
`--glass-blur`. Corner tokens are `--corner-*`, **not** `--radius-*`, because
Tailwind owns that namespace and a same-named Tier 2 token would collide with
its own `@theme` binding.

> [!important] The theme is light-only, on purpose
> The `prefers-color-scheme: dark` override was **removed**. The page sits on a
> mint surface behind a MULTIPLY-blended WebGL backdrop ([[dna-ink-scene]]) that
> only reads on a light surface — flipping `--background` to near-black would
> erase the scene, not re-theme it. ADR-0019.

### What the starter shipped (for reference)

The upstream starter ships a **minimal** theme on purpose — the convention is
the deliverable, not a palette. It defined:

- **Tier 1:** a small neutral ramp (`--raw-color-white`, `--raw-color-neutral-100/900/950`),
  two durations (`--raw-duration-fast/normal`), and the dev-tooling chrome
  (`--raw-color-white-alpha-*`, `--raw-size-panel-*`).
- **Tier 2:** `--background`, `--foreground`, `--duration-fast`, `--duration-normal`,
  with a dark-mode override via `@media (prefers-color-scheme: dark)`, plus the
  `--debug-*` roles behind the [[dna-ink-scene]] settings panel.
- **Bindings:** `--color-background`, `--color-foreground`, `--font-sans`,
  plus `--leading-display` (1.1 — the clip floor for [[text-engine]]) and
  `--ease-entrance`.

> [!note] `--debug-*` is intentionally not themed
> The settings panel floats over an arbitrary WebGL scene, so it stays dark in
> both colour schemes. It is the one Tier 2 group with no
> `prefers-color-scheme` override — legibility over consistency, on a surface
> that never ships to users.

There is deliberately **no brand palette**. Add one per project as
`--raw-color-brand-*` primitives plus the semantic roles that name their purpose.
The `@layer base/components/utilities` blocks are empty — fill them per project.

## Motion: springs first, CSS for trivial state

Hard rule #1 stands — **all real motion is spring-based** ([[animation-system]]).
There is one narrow exception, added because wiring a spring for a colour fade on
hover costs a client component and a hook for no benefit. ADR: [[decisions-log]] ADR-0014.

**CSS transitions are allowed only for simple, discrete state changes:**

| Allowed (CSS) | Not allowed (use a spring) |
|---------------|---------------------------|
| `hover:` / `focus-visible:` / `active:` colour, `opacity`, `border-color`, underline | anything scroll-driven |
| Small decorative nudges (an arrow shifting a few px on hover) | enter/reveal animations → `<Inview>` |
| | text animation → [[text-engine]] |
| | layout/size changes, orchestrated or staggered sequences |
| | anything that must be interruptible or physical |

Conditions — all three, or it is a spring:

1. **Token-backed timing.** Duration and easing come from tokens — never raw
   values: `transition-colors duration-[var(--duration-fast)] ease-entrance`.
2. **`transition-*` only.** `@keyframes` remain **banned** outright — an
   animation long enough to need keyframes is long enough to deserve a spring.
3. **Utilities only.** The transition lives in `className`, not in a CSS file.

```tsx
<a className="text-foreground/70 transition-colors duration-[var(--duration-fast)]
              ease-entrance hover:text-foreground">
  Contact
</a>
```

If you are reaching past this list, you want `<Hover>` — see
[[components/animation-springs]].

## Typography

Font: **Google Sans Flex** (`next/font/google`), bound to
`--font-google-sans-flex` → `--font-sans`. Loaded in `src/app/layout.tsx`, which
also puts `font-sans` on `<body>` so the whole tree inherits it.

It is a **variable** font (weight 100–1000 in one file), so the design's Light
and Medium cost no extra requests. The extra axes the Figma file pins —
`GRAD 0`, `ROND 0`, `wdth 100` — are requested explicitly via `axes`; without
that list `next/font` ships the weight axis alone.

> [!note] Expected build warning
> *"Failed to find font override values for font `Google Sans Flex` — skipping
> generating a fallback font."* The font is new enough that Next has no
> metric-compatible fallback for it. Harmless: the font still self-hosts and
> loads. It only means no size-adjusted local fallback during the swap.

## Styling rules

- Use utilities in JSX `className`; keep class strings short and readable.
- Extract a repeated pattern to a **React component** — not a `@layer
  components` class. See *Where a style goes* above (ADR-0012).
- Mobile-first responsive: `sm:` / `md:` / `lg:` / `xl:` prefixes.
- Dark mode: `dark:` prefix or token overrides in a `prefers-color-scheme` block.
- No inline `style` except for dynamic values (e.g. spring-animated values).
- Motion is spring-based; CSS `transition-*` only for the narrow hover/focus case
  above — never `@keyframes`.

## Related

[[component-conventions]] · [[animation-system]] · [[new-page]]
