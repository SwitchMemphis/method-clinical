---
tags: [meta, optimization]
updated: 2026-10-06
---

# Optimization history — dantora

What the optimization pipeline changed in this project, why, and what must not
be undone. Maintained by the optimization pipeline
(`getlayers-pipeline/optimization-pipeline`); the full, measured record is that
workspace's `obsidian/Projects/dantora.md` (run files under its
`runs/dantora/`). Per-change detail for the latest rounds is in [[changelog]]
(2026-10-03 D-028, 2026-10-06 D-033 entries); this file is the condensed
"what and why" for the next agent. Last updated 2026-10-06.

The project: a clinic landing — a **layout-level** preloader with a preload
context (gates, `RevealOnReady`), a three.js "DNA ink" scene in the hero
(it gates the curtain) and in contact, text-engine reveals.

## Current state

| what | value | date |
|---|---|---|
| status | **optimized** (pass 1 + D-026 + D-028 rounds; pass 2 = owner review) | 2026-10-03 |
| live URL | https://getlayers-dantora-sdjkflsdjhfk.vercel.app | — |
| people, desktop (P / A11y / BP / SEO) | 99 / 100 / 100 / 100 | 2026-10-04 (D-029 production sweep) |
| people, mobile | 96 / 100 / 100 / 100 | 2026-10-04 |
| robot form, desktop + mobile | 100 / 100 / 100 / 100 | 2026-10-04 |
| scroll PC / mobile | ideal (0.42 %, max 33.8 ms) / ideal (0.23 %, max 34.1 ms) | 2026-10-06 (D-031 sweep) |

Pass 2 (D-033 menu + slider) was checked locally only: an interleaved A/B
`origin/main` vs `optimize/pass-2` (mobile 92,90 / 91,86 vs 86,90 / 90,90) is
within noise — no regression from the menu. No hosted record after it.

## Invariants — do not undo

- **Heading entrance starts at `blur(14px)`, not 20 px** (owner confirmed, D-039) —
  `src/lib/motion/text-presets.ts` (the heading preset's `wordOut`). At 20 px
  the blur halo made the word "understanding" a 62,389 px² LCP candidate,
  larger than the whole at-rest headline (50,508 px²), so Chrome re-took the
  LCP at the curtain lift (~3.7 s). ≤ 16 px keeps LCP at first paint:
  mobile 81 → 89/94, LCP 4.42 → ~2.7 s. Applied by the coordinator under
  D-026's visual-weight latitude; **owner to see — one line to revert.**
- **The hero copy rests visible under the opaque curtain**
  (`src/components/common/preloader/reveal-on-ready.tsx`): served without
  `opacity-0`, hidden after its reported paint (or when `loaded` fires), then
  revealed as before. Alone it moved nothing; with the 14 px blur it makes LCP
  ~0.2 s at rest. Invisible — the curtain covers it.
- **Hero engines + springs render plain behind the curtain**
  (`useRevealPending`, replacing `RevealOnReady`'s mount of them; the curtain
  remounts them on reveal): mobile 54 → 61, TBT → 603 ms. Under Lighthouse's
  tracing each react-spring `start()` costs ~3 ms.
- **Text engines outside the hero are `lazy`**, and do not swap while the
  curtain is up; look-ahead swaps only after the first interaction (on-screen
  swaps before it). 47 → 54 → 72 cumulatively with the items below.
- **The DNA scene is built in steps** (`src/lib/scene/dna-ink/scene.ts`:
  clouds, sizing, targets, `compileAsync` against the read buffer, a warm
  draw; preset bounding spheres; sizing out of the constructor task):
  65 → 70, TBT 637 → 449 ms.
- **`src/lib/brand.ts`** — the preloader imports brand constants from here,
  not from `site.ts → env.ts → zod` (69 KB gz off the first load): 72 → 78,
  LCP 4.81 → 4.42 s.
- **Google Sans Flex without the GRAD/ROND/wdth axes** (pinned at the
  mockup's defaults; `src/app/layout.tsx` explains): 267 → 51 KB, 61 → 66,
  LCP 5.9 → 5.0 s.
- **`prefetch={false}` on new-tab / same-page links** (7 RSC requests in the
  load window): LCP 4.42 → 4.17 s. About banner image: no `priority`, real
  `sizes`. Services track / about banner restart their spring only on a new
  target.
- **Consent banner server-rendered** (`src/components/common/Cookie/`,
  `consent-flag.ts`). It sits under the curtain, so it was not the LCP here;
  LCP 4.40 → 4.16 s.
- **Robot form (D-016):** `src/proxy.ts` → `/robot-view`; the robot `HomeView`
  wraps the page in `RobotPreload` (the context's "done" value, so
  `RevealOnReady` is visible in the served HTML and gates are no-ops), hides
  the layout's curtain with a `[data-preloader]` style rule, renders no DNA
  scene. **Every section** uses plain-element wrappers
  (`src/components/common/robot-spring.tsx` renders the element at its `to`
  state, `robot-text.tsx` plain text): robot TBT 1,176 → 12 ms, mobile
  69 → 93. `robot-text.tsx` casts the tag through
  `ComponentType<Record<string, unknown>>` (the r3f JSX augmentation typed
  children as `never` with `ElementType`).
- **Text roles `foreground-subtle` / `foreground-muted` = black 0.6** (5.7:1;
  `src/app/globals.css`; borders keep their alphas). Team card role labels
  white 0.85 on the green (4.8:1). A11y 96 → 100.
- **`/privacy-policy` exists**; the contact form's privacy link points to it
  (it pointed to a 404 `/privacy`). BP 96 → 100.
- **AI crawlers are bots** (`src/utils/bot-ua.ts`); **no `src/app/loading.tsx`**
  (an empty one hid the page from no-JS crawlers).
- **Origin (D-019):** `src/lib/site.ts` / `src/env.ts` fall back to
  `VERCEL_PROJECT_PRODUCTION_URL` (reached the project only on 2026-10-06,
  `2dd0525`; until then live canonical + og:image were localhost).
- **Team rail is `touch-manipulation`** (`src/views/home/sections/team-slider.tsx`)
  — its pointer handlers skip touch on purpose, so `pan-y` left the
  horizontal swipe to no one (owner's bug, D-033).
- **Mobile menu** (`src/components/common/header/mobile-menu.tsx`,
  `site-header.tsx`): full-screen brand-green clip-path overlay, links keep
  opacity 1 (contrast every frame), Lenis stopped, Escape, focus trap, `main`
  inert; header `z-[60]` so the menu covers the consent banner.

## Owner decisions that bind this project

- **D-016** (2026-09-29) — robots get a static page.
- **D-017** (2026-09-29) — A11y/BP/SEO 100: real contrast defects fixed with
  a darker text role, never a design-wide recolour.
- **D-026** (2026-10-01) — mobile ≥ 80 / desktop ≥ 90; visual weight may be
  traded if it stays beautiful (basis for the 14 px blur).
- **D-028 / D-029** (2026-10-02 / 10-03) — mobile ≥ 90, desktop ≥ 90,
  A11y/BP/SEO 100 everywhere incl. people runs.
- **D-027** (2026-10-01) — pass branches merge to `main` when a pass closes.
- **D-031** (2026-10-05) — scroll ideal, 0 frames > 50 ms on the real host.
- **D-033** (2026-10-06) — owner: "proper immersive mobile menu full screen,
  fix our team slider — I can't slide it on mobile".
- **D-034** (2026-10-06) — merge pass-2 into `main`; owner checks live.

## History by pass

**Baseline** (2026-09-29, hosted, live = `e6d42dd`): PC 82 / 100 / 96 / 100,
mobile **52** / 96 / 96 / 100 (LCP 5.1 s, TBT 1,667 ms — the DNA scene built
under the curtain); scroll ideal / ideal.

**Pass 1** (2026-09-29, `b0e1fcd`; `a87e8d3` typing follow-up 09-30):
contrast roles (A11y 96 → 100), robot form with plain wrappers in every
section (robot mobile 52 → 96–100, TBT 10 ms), `/privacy-policy` + contact
link (BP → 100), `math.ts` typed. People perf unchanged (PC 82, mobile 52).

**D-026 round / pass 2 locally** (2026-10-01, `aa5b60e`): items A–J above —
local mobile 47 → 81, desktop 80 → 98. Hosted after: people PC 98, mobile 86,
robot 100/100, scroll ideal/ideal. Merged (D-027).

**Fleet fixes:** `c5de326` AI crawlers (10-02); `bbdb7a1` empty `loading.tsx`
deleted (10-03).

**D-028 round** (2026-10-03, `23d2075`, merged): banner SSR, headline at rest
under the curtain, start blur 20 → 14 px. Hosted (5 runs): people PC **99** /
mobile **96** (was 86), A11y/BP/SEO 100, robot 100/99, scroll ideal both.

**Pass 2 — owner review D-033 / D-034** (2026-10-06): `e13a3fe` team rail
swipe (emulated touch: rail 0 → 245 px; vertical swipe still scrolls the
page) + full-screen mobile menu; `2dd0525` D-019 origin backfill.

## Tried and reverted / didn't help

- Early `import()` of the scene chunk — no change, reverted.
- Per-cloud warm draws — no change, reverted.
- Headline at rest under the curtain **without** the blur change — LCP still
  moved to the entrance (kept anyway; see invariants).
- Services-track / `deferMount` / pre-linked copy pass (item J) — noise-level
  (+1); kept, but don't expect a gain from that direction.

## Open items / leads

- **Owner to see:** the heading start blur 20 → 14 px (revert = one line in
  `text-presets.ts`, at a cost of ~5 mobile points).
- Without the scene at all mobile was 81 in the D-026 round — the remaining
  people LCP was the curtain waiting for the DNA scene (design); the D-028
  fix sidestepped it via the at-rest headline.
- One 209 ms GPU frame (1/5 runs) at `#team` on desktop in the D-028 hosted
  after; axe-sweep desktop showed 12 transient nodes (mid-entrance).
- The mobile menu was verified with emulated touch only, not on real iOS
  Safari.
- Local scroll on mobile read "janky" on a GPU-loaded machine (main and
  branch alike) while hosted was ideal — trust hosted records here.

## How to measure

From `getlayers-pipeline/optimization-pipeline/`:

```sh
L=https://getlayers-dantora-sdjkflsdjhfk.vercel.app
node tools/measure.mjs dantora --url $L            # production: Lighthouse + scroll, PC + mobile, 3 runs
node tools/measure.mjs dantora --url $L --as-bot   # the robot form
node tools/deploy.mjs dantora && node tools/measure.mjs dantora --hosted   # a branch on a real host
node tools/profile.mjs dantora --as-bot            # CPU profile (spring/engine hydration cost)
node tools/axe-sweep.mjs $L --device both          # A11y through the entrances
node tools/fps-probe.mjs $L                        # DNA scene frame rate
node tools/context-loss-probe.mjs --url $L --out <dir>   # iOS WebGL context loss (not yet checked here)
```

A/B mobile changes **interleaved** with a `main` build — in the D-033 A/B the
same build read 86–92 on mobile run to run.
