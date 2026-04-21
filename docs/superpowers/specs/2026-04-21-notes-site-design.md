# Notes Site Design — `tanstack-playground`

**Date:** 2026-04-21
**App:** `apps/tanstack-playground`
**Status:** Approved via brainstorming; pending implementation plan

## Purpose

Build an MDX-based notes site inside `tanstack-playground` to review course material (starting with Josh W Comeau's _WHAM_ → Canvas Animation module) and host runnable React demos alongside the notes. Expected to grow to multiple courses and topics over time.

## Goals

- Personal review tool with the option to share publicly later
- Each note is a concise summary that references the original course lesson
- Live, embedded React demos next to the prose
- Zero friction to add new notes (drop an MDX file, it appears)
- 3-layer content hierarchy: **course → topic → lesson**

## Non-goals (explicit)

- Full course content reproduction (copyright)
- Automated tests (unit / E2E) in M2
- Cross-browser / mobile / a11y verification
- SEO / SSG / OG previews
- Tag aggregation pages, search, dark mode
- `useCanvas` hook abstraction (deferred until a second demo demands it)
- Responsive canvas (deferred — API extension point preserved)

## Decisions recap

| Topic                    | Choice                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Audience                 | Personal + possible public sharing later                                                                              |
| Authoring                | AI drafts prose, user reviews                                                                                         |
| Note structure           | TL;DR / Demo / Why / optional Gotchas / Related                                                                       |
| Language                 | Chinese prose with English for key technical terms                                                                    |
| Scope at launch (M2)     | rocketship note + all TOC pages + GitHub Actions deploy                                                               |
| Styling                  | Tailwind v4 + `@tailwindcss/typography`                                                                               |
| Discovery                | Vite `import.meta.glob` + Zod-validated frontmatter                                                                   |
| MDX route loading        | Dynamic route (`$course.$topic.$slug.tsx`) + glob lookup                                                              |
| Demo mounting            | Direct `import` in MDX (not MDX provider)                                                                             |
| Syntax highlighting      | `@shikijs/rehype` at build time (`github-light`)                                                                      |
| Copyright stance (demos) | Relaxed — demo may mirror course structure in React style; rework if publishing                                       |
| Rocketship asset         | Emoji 🚀 placeholder                                                                                                  |
| Air resistance model     | Course's approximation `v *= 1 - AIR_RESISTANCE * deltaTime`; notes call out `Math.exp` as the correct-version Gotcha |
| Dark mode                | Deferred                                                                                                              |
| Responsive canvas        | Deferred                                                                                                              |

## Architecture

### Directory structure

```
apps/tanstack-playground/
├── vite.config.ts                          # + MDX plugin, Tailwind v4, shiki
├── src/
│   ├── router.tsx                          # (existing)
│   ├── routes/
│   │   ├── __root.tsx                      # minimal logo-only nav + notFoundComponent + MDXProvider
│   │   ├── index.tsx                       # /                               all notes
│   │   ├── $course.tsx                     # /$course                        course TOC
│   │   ├── $course.$topic.tsx              # /$course/$topic                 topic TOC
│   │   └── $course.$topic.$slug.tsx        # /$course/$topic/$slug           single note
│   │
│   ├── notes/                              # content (not routes)
│   │   ├── _registry.ts                    # glob scan + Zod validation + helpers
│   │   ├── _schema.ts                      # NoteFrontmatterSchema
│   │   ├── _courses.ts                     # course display metadata
│   │   ├── _topics.ts                      # topic display metadata
│   │   └── wham/
│   │       └── canvas-animation/
│   │           └── rocketship.mdx
│   │
│   ├── demos/                              # runnable React components
│   │   ├── _shared/
│   │   │   └── canvas-utils.ts             # setupCanvas, polar↔cartesian, etc.
│   │   └── wham/
│   │       └── canvas-animation/
│   │           └── rocketship.tsx
│   │
│   ├── components/
│   │   ├── note-layout.tsx
│   │   ├── source-link.tsx
│   │   ├── demo-frame.tsx
│   │   ├── note-card.tsx
│   │   ├── breadcrumb.tsx
│   │   └── tag-pill.tsx
│   │
│   └── styles/
│       └── app.css                         # Tailwind entry + prose tweaks + keyframes
│
└── .github/workflows/deploy-tanstack-playground.yml  # repo root
```

### Deleted

- `src/routes/about.tsx`

### Modified

- `src/routes/index.tsx` — from TanStack Playground intro → "all notes" listing
- `src/routes/__root.tsx` — nav simplified to logo-only; add `notFoundComponent`; wrap children in `MDXProvider`
- `apps/tanstack-playground/vite.config.ts` — add MDX plugin, Tailwind Vite plugin, rehype-shiki
- `apps/tanstack-playground/package.json` — add deps

### URL structure

| URL                     | Page                        |
| ----------------------- | --------------------------- |
| `/`                     | All notes (across courses)  |
| `/$course`              | Course TOC listing topics   |
| `/$course/$topic`       | Topic TOC listing lessons   |
| `/$course/$topic/$slug` | Single note + embedded demo |

Static routes win over dynamic, so future static pages like `/tags` or `/search` can coexist — at the cost of disallowing those strings as course slugs.

### Dependency direction (strict)

```
routes/ → components, notes/_registry, demos
notes/  → demos (via MDX `import` only)
demos/  → demos/_shared
components/  ← routes
```

## Content model

### Frontmatter schema (`src/notes/_schema.ts`)

```ts
export const NoteFrontmatterSchema = z.object({
  title: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  lessonNumber: z.string().optional(), // e.g. '04-canvas/04-rocketship'
  tags: z.array(z.string()).default([]),
  summary: z.string().optional(),
  order: z.number().optional(),
});
```

`course`, `topic`, `slug` are **derived from file path**, not frontmatter. Keeps them in sync by construction.

### Courses metadata (`src/notes/_courses.ts`)

```ts
export const courses = {
  wham: {
    name: 'Whimsical Animations',
    author: 'Josh W Comeau',
    baseUrl: 'https://courses.joshwcomeau.com/wham',
  },
} as const;
```

### Topics metadata (`src/notes/_topics.ts`)

```ts
export const topics: Record<string, { name: string; description?: string }> = {
  'canvas-animation': {
    name: 'Canvas Animation',
    description: 'rAF loop, deltaTime, velocity-based animation',
  },
};
```

### Registry (`src/notes/_registry.ts`)

- `import.meta.glob('./**/*.mdx', { eager: true, import: 'frontmatter' })` → all frontmatter parsed at build time
- `import.meta.glob('./**/*.mdx')` → lazy body loaders (one chunk per note)
- Enforce 3-level path (throw on violation)
- Validate frontmatter with Zod (throw on violation, error includes file path)
- Export: `notes[]`, `findNote`, `notesByCourse`, `notesByTopic`
- Sort: `frontmatter.order ?? parseInt(lessonNumber)`, fallback alphabetical by slug

### Error handling policy

| Situation                               | Behavior                                  |
| --------------------------------------- | ----------------------------------------- |
| Non-3-level MDX path                    | Throw at registry init (build fails)      |
| Missing / wrong-typed frontmatter field | Zod throws (build fails) with file path   |
| `course` missing from `_courses.ts`     | Display layer falls back (no crash)       |
| `topic` missing from `_topics.ts`       | Display layer falls back (no crash)       |
| Route slug not found                    | `notFound()` → root's `notFoundComponent` |

Build-time strictness for data integrity; display-layer leniency for metadata.

## Components

| Component     | Responsibility                                                                                |
| ------------- | --------------------------------------------------------------------------------------------- |
| `NoteLayout`  | Page shell: breadcrumb, header (title/summary/source/tags), prose container, prev/next footer |
| `SourceLink`  | External link to original course lesson (opens new tab)                                       |
| `DemoFrame`   | Wraps demo components with `not-prose`, border, optional caption                              |
| `NoteCard`    | TOC listing card with title, summary, up to 3 tags                                            |
| `Breadcrumb`  | `All notes › Course › Topic › Lesson`                                                         |
| `TagPill`     | Non-interactive pill (M2 doesn't link)                                                        |
| `PrevNextNav` | Previous / next within the same topic only                                                    |

MDX provider registers `DemoFrame` and `TagPill` globally so MDX files don't need to `import` them. Demo components (`<Rocketship />`) are still explicitly imported to preserve code-splitting.

## Canvas demo infrastructure

### `demos/_shared/canvas-utils.ts`

Minimum surface for M2:

```ts
setupCanvas(canvas: HTMLCanvasElement): {
  ctx: CanvasRenderingContext2D;
  dimensions: { width: number; height: number };
};
convertDegreesToRadians(deg: number): number;
convertPolarToCartesian(angleDeg: number, distance: number): { x: number; y: number };
clampedNormalize(value: number, min: number, max: number): number;
```

`setupCanvas` handles DPR; no resize observer in M2 (fixed-size canvas only).

### Rocketship demo (`src/demos/wham/canvas-animation/rocketship.tsx`)

- Mutable state (particle array, `lastTimestamp`) stays inside the `useEffect` closure — no re-renders per frame
- `requestAnimationFrame` ID tracked; cleanup cancels it (Strict Mode safe)
- `deltaTime = Math.min(now - lastTimestamp, 250) / 1000` to survive tab-throttling
- Particles filtered to age < 5s each frame (avoids unbounded growth)
- Container: `<div>` with 🚀 emoji (oscillating via CSS keyframes) + absolutely-positioned `<canvas>`
- Fixed 200 × 300 layout

### Keyframes

```css
@keyframes rocket-oscillate {
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(10px);
  }
}
```

## Styling & syntax highlighting

### Tailwind v4

- `pnpm add -D tailwindcss @tailwindcss/vite @tailwindcss/typography`
- Vite plugin: `tailwindcss()`
- Entry `src/styles/app.css`:
  ```css
  @import 'tailwindcss';
  @plugin '@tailwindcss/typography';
  ```
- Prose tweaks applied via `@layer components` (code inline reset, pre radius)
- Imported once in `__root.tsx`

### Shiki

- `pnpm add -D @shikijs/rehype shiki`
- MDX plugin `rehypePlugins: [[rehypeShiki, { theme: 'github-light' }]]`
- Produces inline-styled `<span>`s at build time (zero runtime JS/CSS)

### DemoFrame isolation

Uses `not-prose` class so typography styles don't leak into demo UI.

## Deployment

### `vite.config.ts` (already done)

- `base = process.env.BASE_PATH ?? '/'`
- Build script `cp index.html 404.html` for SPA deep-link fallback

### GitHub Actions workflow

`.github/workflows/deploy-tanstack-playground.yml` at repo root:

- Triggers:
  - `push` to `main` when `apps/tanstack-playground/**` or this workflow changes
  - `workflow_dispatch` (manual)
- Uses pnpm with workspace install
- Sets `BASE_PATH` from a workflow-level env variable so the base path can be tuned without touching code
- Builds via `pnpm -C apps/tanstack-playground build`
- Uploads `.output/public` with `actions/upload-pages-artifact`
- Deploys with `actions/deploy-pages`
- Pages source must be set to "GitHub Actions" manually once

### Base-path note

Because the repo hosts multiple playgrounds, deployment URL/base-path selection happens when GH Pages is configured. The workflow reads `BASE_PATH` from `env`, which is the only place to tune it.

## Note template

```mdx
---
title: Rocketship, Revisited
sourceUrl: https://courses.joshwcomeau.com/wham/04-canvas/04-rocketship
lessonNumber: '04-canvas/04-rocketship'
summary: DOM particle 動畫遷移到 Canvas,學會 velocity + deltaTime 思維。
tags: [canvas, deltaTime, velocity, rAF, air-resistance]
---

import Rocketship from '~/demos/wham/canvas-animation/rocketship';

## TL;DR

- ...

<DemoFrame title="Rocketship with Canvas particles">
  <Rocketship />
</DemoFrame>

## Why it works

...

## Gotchas

- `v *= 1 - k * dt` 的近似在低 frame rate 會崩,正解是 `v *= Math.exp(-k * dt)`
- `deltaTime` 要 clamp,不然切 tab 回來會暴量 particles

## Related

- (M2 內沒有其他筆記,留空)
```

## Dependencies to add

| Package                   | Purpose                            |
| ------------------------- | ---------------------------------- |
| `@mdx-js/rollup`          | Compile MDX via Vite               |
| `@mdx-js/react`           | `MDXProvider` support              |
| `remark-frontmatter`      | Parse `---` frontmatter block      |
| `remark-mdx-frontmatter`  | Expose frontmatter as named export |
| `@shikijs/rehype`         | Build-time syntax highlighting     |
| `shiki`                   | Grammar + themes                   |
| `tailwindcss`             | Styling                            |
| `@tailwindcss/vite`       | Tailwind v4 Vite integration       |
| `@tailwindcss/typography` | `prose` utilities                  |
| `zod`                     | Frontmatter validation             |

## Verification checklist (M2 done = all pass)

**Build / tooling**

- [ ] `pnpm install` succeeds
- [ ] `pnpm -C apps/tanstack-playground dev` — no warnings/errors
- [ ] `pnpm -C apps/tanstack-playground build` succeeds
- [ ] `pnpm -C apps/tanstack-playground preview` serves the SPA

**Routing**

- [ ] `/` shows all notes (rocketship only)
- [ ] `/wham` lists `canvas-animation` topic
- [ ] `/wham/canvas-animation` lists rocketship
- [ ] `/wham/canvas-animation/rocketship` renders the note + demo
- [ ] Unknown routes render `notFoundComponent`

**Content / layout**

- [ ] Note page shows: breadcrumb, title, summary, source link (opens new tab), tags, TL;DR, demo, Why, Gotchas, Related
- [ ] Prose styling for h1-h3, p, ul, inline `code`, `pre` is visually reasonable
- [ ] Code fences have syntax highlighting

**Demo correctness**

- [ ] Particles emit from below 🚀, cone-shaped, fade out, slight curl from air resistance
- [ ] No rAF leak (Performance tab stable, single loop)
- [ ] Tab background → foreground doesn't burst particles
- [ ] Strict Mode mount — only one rAF loop

**Console**

- [ ] No warnings/errors on load

**Deployment**

- [ ] `.github/workflows/deploy-tanstack-playground.yml` exists
- [ ] Workflow triggers only on `apps/tanstack-playground/**` changes and manual dispatch
- [ ] Workflow passes on the M2 PR (deploy step may require manual GH Pages source config first — acceptable)

## Open questions (for implementation)

- Exact GH Pages URL / base path is decided at Pages-configuration time; the workflow exposes it as a single env variable so tuning doesn't need code changes.
- `<TanStackRouterDevtools />` in `__root.tsx` is preserved as-is — it does not conflict with `MDXProvider`.
