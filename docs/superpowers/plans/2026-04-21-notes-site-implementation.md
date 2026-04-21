# Notes Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an MDX-based course-notes site inside `apps/tanstack-playground` with 3-layer hierarchy (course → topic → lesson), one complete lesson (rocketship), TOC pages, and a GitHub Actions deploy workflow targeting GitHub Pages.

**Architecture:** MDX content lives in `src/notes/<course>/<topic>/*.mdx` with co-located demo `.tsx` components. A Zod-validated registry built from `import.meta.glob` drives TOC pages and a dynamic route. Tailwind v4 + `@tailwindcss/typography` handle prose; `@shikijs/rehype` handles syntax highlighting at build time. Deploy via GitHub Actions to Pages with SPA 404 fallback (already configured in the existing build script).

**Tech Stack:** TanStack Start (existing), React 19, Vite 8, MDX via `@mdx-js/rollup`, Tailwind v4, shiki, Zod.

**Spec:** `docs/superpowers/specs/2026-04-21-notes-site-design.md`

**No automated tests in M2.** The spec explicitly scopes out unit/E2E tests. Verification is via build success, dev-server runtime checks, and the manual checklist at the end. Each task commits on green (TypeScript compiles, no runtime errors in the routes touched so far).

**Path convention:** All paths below are absolute from the repo root `/Users/jhlin/playground/showroom/` unless noted. `pnpm` commands run from the repo root; `pnpm -C apps/tanstack-playground <cmd>` scopes to the playground package.

---

## Pre-flight

### Task 0: Create feature branch

**Files:** (none modified — git state only)

- [ ] **Step 1: Confirm clean working tree**

Run: `git status`
Expected: `nothing to commit, working tree clean` on branch `main`.

- [ ] **Step 2: Create and switch to feature branch**

Run: `git checkout -b feat/notes-site`
Expected: `Switched to a new branch 'feat/notes-site'`.

---

## Phase 1: Environment

### Task 1: Install dependencies + MDX type declarations

**Files:**

- Modify: `apps/tanstack-playground/package.json` (via pnpm add)
- Create: `apps/tanstack-playground/mdx.d.ts`

- [ ] **Step 1: Install runtime + plugin deps**

Run:

```
pnpm -C apps/tanstack-playground add @mdx-js/rollup @mdx-js/react remark-frontmatter remark-mdx-frontmatter zod
```

Expected: all four dependencies added; no peer warnings that block install.

- [ ] **Step 2: Install dev-only deps (Tailwind + shiki)**

Run:

```
pnpm -C apps/tanstack-playground add -D tailwindcss @tailwindcss/vite @tailwindcss/typography @shikijs/rehype shiki
```

Expected: dev deps added successfully.

- [ ] **Step 3: Create MDX type declaration**

Create `apps/tanstack-playground/mdx.d.ts`:

```ts
declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { NoteFrontmatter } from '~/notes/_schema';

  export const frontmatter: NoteFrontmatter;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
```

- [ ] **Step 4: Verify `mdx.d.ts` is picked up by tsconfig**

Run: `cat apps/tanstack-playground/tsconfig.json`
Confirm `"include"` already matches `**/*.d.ts` — if so, nothing else needed.

- [ ] **Step 5: Commit**

```
git add apps/tanstack-playground/package.json apps/tanstack-playground/mdx.d.ts pnpm-lock.yaml
git commit -m "feat(tanstack-playground): add MDX, Tailwind v4, shiki, zod deps"
```

---

### Task 2: Configure Vite plugin (MDX + Tailwind + Shiki)

**Files:**

- Modify: `apps/tanstack-playground/vite.config.ts`

- [ ] **Step 1: Replace `vite.config.ts`**

Overwrite `apps/tanstack-playground/vite.config.ts` with:

```ts
import mdx from '@mdx-js/rollup';
import rehypeShiki from '@shikijs/rehype';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';

const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      srcDirectory: 'src',
      spa: {
        enabled: true,
        prerender: {
          outputPath: '/index.html',
        },
      },
    }),
    mdx({
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }]],
      rehypePlugins: [[rehypeShiki, { theme: 'github-light' }]],
    }),
    viteReact(),
    tailwindcss(),
    nitro(),
  ],
});
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/vite.config.ts
git commit -m "feat(tanstack-playground): wire MDX, Tailwind, shiki vite plugins"
```

---

### Task 3: Tailwind CSS entry + keyframes

**Files:**

- Create: `apps/tanstack-playground/src/styles/app.css`

- [ ] **Step 1: Create styles file**

Create `apps/tanstack-playground/src/styles/app.css`:

```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@layer components {
  .prose pre {
    @apply my-4 rounded-lg text-sm;
  }
  .prose :not(pre) > code {
    @apply rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm;
  }
  .prose :not(pre) > code::before,
  .prose :not(pre) > code::after {
    content: none;
  }
}

@keyframes rocket-oscillate {
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(10px);
  }
}

.animate-rocket-oscillate {
  animation: rocket-oscillate 1.5s ease-in-out infinite alternate;
}
```

- [ ] **Step 2: Commit**

```
git add apps/tanstack-playground/src/styles/app.css
git commit -m "feat(tanstack-playground): add tailwind entry + prose tweaks + rocket keyframes"
```

---

### Task 4: Sanity build check

**Files:** none.

- [ ] **Step 1: Install from lockfile (workspace-level)**

Run: `pnpm install`
Expected: success; lockfile unchanged (we already installed in Task 1).

- [ ] **Step 2: Run dev server**

Run: `pnpm -C apps/tanstack-playground dev`
Expected: starts on port 3000, no errors. The existing `/` and `/about` pages still render.

- [ ] **Step 3: Kill dev server, run build**

Ctrl-C the dev server. Run: `pnpm -C apps/tanstack-playground build`
Expected: build succeeds; `.output/public/index.html` and `.output/public/404.html` exist.

- [ ] **Step 4: (Nothing to commit — verification only)**

---

## Phase 2: Data layer

### Task 5: Zod frontmatter schema

**Files:**

- Create: `apps/tanstack-playground/src/notes/_schema.ts`

- [ ] **Step 1: Create schema file**

Create `apps/tanstack-playground/src/notes/_schema.ts`:

```ts
import { z } from 'zod';

export const NoteFrontmatterSchema = z.object({
  title: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  lessonNumber: z.string().optional(),
  tags: z.array(z.string()).default([]),
  summary: z.string().optional(),
  order: z.number().optional(),
});

export type NoteFrontmatter = z.infer<typeof NoteFrontmatterSchema>;
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/notes/_schema.ts
git commit -m "feat(notes): add Zod frontmatter schema"
```

---

### Task 6: Courses + topics metadata

**Files:**

- Create: `apps/tanstack-playground/src/notes/_courses.ts`
- Create: `apps/tanstack-playground/src/notes/_topics.ts`

- [ ] **Step 1: Create courses metadata**

Create `apps/tanstack-playground/src/notes/_courses.ts`:

```ts
export const courses = {
  wham: {
    name: 'Whimsical Animations',
    author: 'Josh W Comeau',
    baseUrl: 'https://courses.joshwcomeau.com/wham',
  },
} as const;

export type CourseId = keyof typeof courses;

export function courseName(id: string): string {
  return (courses as Record<string, { name: string }>)[id]?.name ?? id;
}
```

- [ ] **Step 2: Create topics metadata**

Create `apps/tanstack-playground/src/notes/_topics.ts`:

```ts
export type TopicMeta = { name: string; description?: string };

export const topics: Record<string, TopicMeta> = {
  'canvas-animation': {
    name: 'Canvas Animation',
    description: 'rAF loop, deltaTime, velocity-based animation',
  },
};

export function topicName(id: string): string {
  return topics[id]?.name ?? id;
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```
git add apps/tanstack-playground/src/notes/_courses.ts apps/tanstack-playground/src/notes/_topics.ts
git commit -m "feat(notes): add courses + topics display metadata"
```

---

### Task 7: Registry

**Files:**

- Create: `apps/tanstack-playground/src/notes/_registry.ts`

- [ ] **Step 1: Create registry file**

Create `apps/tanstack-playground/src/notes/_registry.ts`:

```ts
import type { ComponentType } from 'react';
import { NoteFrontmatterSchema, type NoteFrontmatter } from './_schema';

type MdxModule = { default: ComponentType };

type FrontmatterGlobEntry = { frontmatter: unknown };

const frontmatterModules = import.meta.glob<FrontmatterGlobEntry>('./**/*.mdx', {
  eager: true,
});

const lazyLoaders = import.meta.glob<MdxModule>('./**/*.mdx');

export type NoteEntry = {
  course: string;
  topic: string;
  slug: string;
  path: string;
  frontmatter: NoteFrontmatter;
  load: () => Promise<MdxModule>;
};

function parsePath(globKey: string): { course: string; topic: string; slug: string } {
  // globKey looks like './wham/canvas-animation/rocketship.mdx'
  const stripped = globKey.replace(/^\.\//, '').replace(/\.mdx$/, '');
  const parts = stripped.split('/');
  if (parts.length !== 3) {
    throw new Error(`Note must be at course/topic/slug depth (got ${parts.length} parts): ${globKey}`);
  }
  const [course, topic, slug] = parts as [string, string, string];
  return { course, topic, slug };
}

function buildEntries(): NoteEntry[] {
  const entries: NoteEntry[] = [];
  for (const [globKey, mod] of Object.entries(frontmatterModules)) {
    const { course, topic, slug } = parsePath(globKey);
    const loader = lazyLoaders[globKey];
    if (!loader) {
      throw new Error(`Lazy loader missing for ${globKey}`);
    }
    const parsed = NoteFrontmatterSchema.safeParse(mod.frontmatter);
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in ${globKey}: ${parsed.error.message}`);
    }
    entries.push({
      course,
      topic,
      slug,
      path: globKey,
      frontmatter: parsed.data,
      load: loader,
    });
  }
  return entries.sort(compareEntries);
}

function orderKey(entry: NoteEntry): number {
  const { order, lessonNumber } = entry.frontmatter;
  if (typeof order === 'number') return order;
  if (lessonNumber) {
    const leading = parseInt(lessonNumber, 10);
    if (!Number.isNaN(leading)) return leading;
  }
  return Number.MAX_SAFE_INTEGER;
}

function compareEntries(a: NoteEntry, b: NoteEntry): number {
  const diff = orderKey(a) - orderKey(b);
  if (diff !== 0) return diff;
  return a.slug.localeCompare(b.slug);
}

export const notes: NoteEntry[] = buildEntries();

export function findNote(course: string, topic: string, slug: string): NoteEntry | undefined {
  return notes.find((n) => n.course === course && n.topic === topic && n.slug === slug);
}

export function notesByCourse(course: string): NoteEntry[] {
  return notes.filter((n) => n.course === course);
}

export function notesByTopic(course: string, topic: string): NoteEntry[] {
  return notes.filter((n) => n.course === course && n.topic === topic);
}

export function coursesInUse(): string[] {
  return Array.from(new Set(notes.map((n) => n.course)));
}

export function topicsInCourse(course: string): string[] {
  return Array.from(new Set(notes.filter((n) => n.course === course).map((n) => n.topic)));
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors. Registry initializes to an empty array (no MDX files exist yet) without throwing.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/notes/_registry.ts
git commit -m "feat(notes): add glob-based registry with Zod validation"
```

---

### Task 8: Canvas utils

**Files:**

- Create: `apps/tanstack-playground/src/utils/canvas.ts`

- [ ] **Step 1: Create utils file**

Create `apps/tanstack-playground/src/utils/canvas.ts`:

```ts
export type CanvasDimensions = { width: number; height: number };

export function setupCanvas(canvas: HTMLCanvasElement): {
  ctx: CanvasRenderingContext2D;
  dimensions: CanvasDimensions;
} {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to acquire 2D rendering context');
  }
  ctx.scale(dpr, dpr);
  return { ctx, dimensions: { width, height } };
}

export function convertDegreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function convertPolarToCartesian(angleDegrees: number, distance: number): { x: number; y: number } {
  const radians = convertDegreesToRadians(angleDegrees);
  return {
    x: Math.cos(radians) * distance,
    y: Math.sin(radians) * distance,
  };
}

export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

export function clampedNormalize(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, normalize(value, min, max)));
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/utils/canvas.ts
git commit -m "feat(utils): add canvas helpers (setupCanvas, polar↔cartesian, normalize)"
```

---

## Phase 3: Components

### Task 9: TagPill + SourceLink

**Files:**

- Create: `apps/tanstack-playground/src/components/tag-pill.tsx`
- Create: `apps/tanstack-playground/src/components/source-link.tsx`

- [ ] **Step 1: Create TagPill**

Create `apps/tanstack-playground/src/components/tag-pill.tsx`:

```tsx
import type { ReactNode } from 'react';

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Create SourceLink**

Create `apps/tanstack-playground/src/components/source-link.tsx`:

```tsx
export function SourceLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600"
    >
      <span aria-hidden="true">📖</span>
      <span>原始課程</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```
git add apps/tanstack-playground/src/components/tag-pill.tsx apps/tanstack-playground/src/components/source-link.tsx
git commit -m "feat(components): add TagPill and SourceLink"
```

---

### Task 10: DemoFrame

**Files:**

- Create: `apps/tanstack-playground/src/components/demo-frame.tsx`

- [ ] **Step 1: Create DemoFrame**

Create `apps/tanstack-playground/src/components/demo-frame.tsx`:

```tsx
import type { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function DemoFrame({ title, children, className }: Props) {
  return (
    <figure className={`not-prose my-6 overflow-hidden rounded-lg border border-gray-200 ${className ?? ''}`.trim()}>
      {title && (
        <figcaption className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">{title}</figcaption>
      )}
      <div className="bg-white p-4">{children}</div>
    </figure>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/components/demo-frame.tsx
git commit -m "feat(components): add DemoFrame wrapper with not-prose isolation"
```

---

### Task 11: NoteCard

**Files:**

- Create: `apps/tanstack-playground/src/components/note-card.tsx`

- [ ] **Step 1: Create NoteCard**

Create `apps/tanstack-playground/src/components/note-card.tsx`:

```tsx
import { Link } from '@tanstack/react-router';
import type { NoteEntry } from '~/notes/_registry';
import { TagPill } from './tag-pill';

export function NoteCard({ note }: { note: NoteEntry }) {
  const { course, topic, slug, frontmatter } = note;
  return (
    <Link
      to="/$course/$topic/$slug"
      params={{ course, topic, slug }}
      className="block rounded-lg border border-gray-200 p-4 transition hover:border-blue-500 hover:shadow-sm"
    >
      <h3 className="font-semibold text-gray-900">{frontmatter.title}</h3>
      {frontmatter.summary && <p className="mt-1 text-sm text-gray-600">{frontmatter.summary}</p>}
      {frontmatter.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      )}
    </Link>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors. Note: the `Link`'s `to` path will show a `typeof`-route error until the target route file exists (Task 19). If that error fires here, suppress by noting we'll validate after the route is created — continue.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/components/note-card.tsx
git commit -m "feat(components): add NoteCard for TOC listings"
```

---

### Task 12: Breadcrumb

**Files:**

- Create: `apps/tanstack-playground/src/components/breadcrumb.tsx`

- [ ] **Step 1: Create Breadcrumb**

Create `apps/tanstack-playground/src/components/breadcrumb.tsx`:

```tsx
import { Link } from '@tanstack/react-router';
import { courseName } from '~/notes/_courses';
import { topicName } from '~/notes/_topics';

type Props = {
  course?: string;
  topic?: string;
  title?: string;
};

export function Breadcrumb({ course, topic, title }: Props) {
  return (
    <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
      <Link to="/" className="hover:text-blue-600">
        All notes
      </Link>
      {course && (
        <>
          <Separator />
          <Link to="/$course" params={{ course }} className="hover:text-blue-600">
            {courseName(course)}
          </Link>
        </>
      )}
      {course && topic && (
        <>
          <Separator />
          <Link to="/$course/$topic" params={{ course, topic }} className="hover:text-blue-600">
            {topicName(topic)}
          </Link>
        </>
      )}
      {title && (
        <>
          <Separator />
          <span className="text-gray-700">{title}</span>
        </>
      )}
    </nav>
  );
}

function Separator() {
  return <span className="mx-2 text-gray-300">›</span>;
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors (route-typing warning from Task 11 is acceptable until routes exist).

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/components/breadcrumb.tsx
git commit -m "feat(components): add Breadcrumb navigation"
```

---

### Task 13: PrevNextNav

**Files:**

- Create: `apps/tanstack-playground/src/components/prev-next-nav.tsx`

- [ ] **Step 1: Create PrevNextNav**

Create `apps/tanstack-playground/src/components/prev-next-nav.tsx`:

```tsx
import { Link } from '@tanstack/react-router';
import { notesByTopic, type NoteEntry } from '~/notes/_registry';

type Props = {
  course: string;
  topic: string;
  slug: string;
};

export function PrevNextNav({ course, topic, slug }: Props) {
  const siblings = notesByTopic(course, topic);
  const index = siblings.findIndex((n) => n.slug === slug);
  const prev = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;

  if (!prev && !next) return null;

  return (
    <nav aria-label="pagination" className="mt-10 flex justify-between gap-4 border-t border-gray-200 pt-6">
      <Side note={prev} direction="prev" />
      <Side note={next} direction="next" />
    </nav>
  );
}

function Side({ note, direction }: { note: NoteEntry | undefined; direction: 'prev' | 'next' }) {
  if (!note) return <span />;
  const label = direction === 'prev' ? '← 上一篇' : '下一篇 →';
  const alignment = direction === 'prev' ? 'text-left' : 'text-right';
  return (
    <Link
      to="/$course/$topic/$slug"
      params={{ course: note.course, topic: note.topic, slug: note.slug }}
      className={`block max-w-[48%] rounded-md border border-gray-200 p-3 hover:border-blue-400 ${alignment}`}
    >
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-0.5 font-medium text-gray-900">{note.frontmatter.title}</div>
    </Link>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/components/prev-next-nav.tsx
git commit -m "feat(components): add PrevNextNav within-topic navigation"
```

---

### Task 14: NoteLayout

**Files:**

- Create: `apps/tanstack-playground/src/components/note-layout.tsx`

- [ ] **Step 1: Create NoteLayout**

Create `apps/tanstack-playground/src/components/note-layout.tsx`:

```tsx
import type { ReactNode } from 'react';
import type { NoteEntry } from '~/notes/_registry';
import { Breadcrumb } from './breadcrumb';
import { PrevNextNav } from './prev-next-nav';
import { SourceLink } from './source-link';
import { TagPill } from './tag-pill';

export function NoteLayout({ note, children }: { note: NoteEntry; children: ReactNode }) {
  const { course, topic, slug, frontmatter } = note;
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumb course={course} topic={topic} title={frontmatter.title} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{frontmatter.title}</h1>
        {frontmatter.summary && <p className="mt-3 text-lg text-gray-600">{frontmatter.summary}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {frontmatter.sourceUrl && <SourceLink href={frontmatter.sourceUrl} />}
          {frontmatter.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      </header>
      <div className="prose prose-lg max-w-none">{children}</div>
      <footer>
        <PrevNextNav course={course} topic={topic} slug={slug} />
      </footer>
    </article>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors (route-typing warnings from earlier components are acceptable until routes are created in Phase 4).

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/components/note-layout.tsx
git commit -m "feat(components): add NoteLayout shell composing breadcrumb/header/prose/nav"
```

---

## Phase 4: Root + routes

### Task 15: Update `__root.tsx` and delete `about.tsx`

**Files:**

- Modify: `apps/tanstack-playground/src/routes/__root.tsx`
- Delete: `apps/tanstack-playground/src/routes/about.tsx`

- [ ] **Step 1: Overwrite `__root.tsx`**

Overwrite `apps/tanstack-playground/src/routes/__root.tsx` with:

```tsx
/// <reference types="vite/client" />
import { MDXProvider } from '@mdx-js/react';
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';
import { DemoFrame } from '~/components/demo-frame';
import { TagPill } from '~/components/tag-pill';
import '~/styles/app.css';

const mdxComponents = { DemoFrame, TagPill };

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Notes' },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children?: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-3">
            <Link to="/" className="text-sm font-semibold tracking-tight text-gray-900">
              Notes
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">
          <MDXProvider components={mdxComponents}>{children ?? <Outlet />}</MDXProvider>
        </main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">找不到這則筆記</h1>
      <p className="mt-2 text-gray-600">檢查 URL,或回到首頁繼續。</p>
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
        回到首頁
      </Link>
    </section>
  );
}
```

- [ ] **Step 2: Delete `about.tsx`**

Run: `git rm apps/tanstack-playground/src/routes/about.tsx`
Expected: file staged for deletion.

- [ ] **Step 3: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors. The generated `routeTree.gen.ts` will regenerate on the next dev run.

- [ ] **Step 4: Commit**

```
git add apps/tanstack-playground/src/routes/__root.tsx
git commit -m "feat(routes): redo root shell — nav, MDXProvider, notFound; drop about"
```

---

### Task 16: Rewrite `index.tsx` — all notes

**Files:**

- Modify: `apps/tanstack-playground/src/routes/index.tsx`

- [ ] **Step 1: Overwrite `index.tsx`**

Overwrite `apps/tanstack-playground/src/routes/index.tsx` with:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { NoteCard } from '~/components/note-card';
import { notes } from '~/notes/_registry';

export const Route = createFileRoute('/')({
  component: AllNotes,
});

function AllNotes() {
  if (notes.length === 0) {
    return (
      <section>
        <h1 className="text-2xl font-semibold">All notes</h1>
        <p className="mt-4 text-gray-600">
          還沒有筆記。把 `.mdx` 放到 `src/notes/&lt;course&gt;/&lt;topic&gt;/` 就會出現在這裡。
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold">All notes</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.path} note={note} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/routes/index.tsx
git commit -m "feat(routes): / lists all notes"
```

---

### Task 17: `$course.tsx` — course TOC

**Files:**

- Create: `apps/tanstack-playground/src/routes/$course.tsx`

- [ ] **Step 1: Create route**

Create `apps/tanstack-playground/src/routes/$course.tsx`:

```tsx
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { courses, courseName } from '~/notes/_courses';
import { topicsInCourse, notesByTopic } from '~/notes/_registry';
import { topicName, topics } from '~/notes/_topics';

export const Route = createFileRoute('/$course')({
  loader: ({ params }) => {
    if (!(params.course in courses)) {
      if (topicsInCourse(params.course).length === 0) throw notFound();
    }
    return { course: params.course };
  },
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData();
  const topicIds = topicsInCourse(course);

  return (
    <section>
      <h1 className="text-2xl font-semibold">{courseName(course)}</h1>
      {topicIds.length === 0 ? (
        <p className="mt-4 text-gray-600">這個課程還沒有筆記。</p>
      ) : (
        <div className="mt-6 space-y-3">
          {topicIds.map((topic) => {
            const count = notesByTopic(course, topic).length;
            return (
              <Link
                key={topic}
                to="/$course/$topic"
                params={{ course, topic }}
                className="block rounded-lg border border-gray-200 p-4 hover:border-blue-500"
              >
                <div className="font-semibold text-gray-900">{topicName(topic)}</div>
                {topics[topic]?.description && (
                  <div className="mt-1 text-sm text-gray-600">{topics[topic]?.description}</div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  {count} lesson{count === 1 ? '' : 's'}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/routes/\$course.tsx
git commit -m "feat(routes): /\$course — course TOC listing topics"
```

---

### Task 18: `$course.$topic.tsx` — topic TOC

**Files:**

- Create: `apps/tanstack-playground/src/routes/$course.$topic.tsx`

- [ ] **Step 1: Create route**

Create `apps/tanstack-playground/src/routes/$course.$topic.tsx`:

```tsx
import { createFileRoute, notFound } from '@tanstack/react-router';
import { Breadcrumb } from '~/components/breadcrumb';
import { NoteCard } from '~/components/note-card';
import { notesByTopic } from '~/notes/_registry';
import { topicName, topics } from '~/notes/_topics';

export const Route = createFileRoute('/$course/$topic')({
  loader: ({ params }) => {
    const items = notesByTopic(params.course, params.topic);
    if (items.length === 0) throw notFound();
    return { ...params, items };
  },
  component: TopicPage,
});

function TopicPage() {
  const { course, topic, items } = Route.useLoaderData();
  return (
    <section>
      <Breadcrumb course={course} topic={topic} />
      <h1 className="text-2xl font-semibold">{topicName(topic)}</h1>
      {topics[topic]?.description && <p className="mt-2 text-gray-600">{topics[topic]?.description}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((note) => (
          <NoteCard key={note.path} note={note} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/routes/\$course.\$topic.tsx
git commit -m "feat(routes): /\$course/\$topic — topic TOC listing lessons"
```

---

### Task 19: `$course.$topic.$slug.tsx` — single note

**Files:**

- Create: `apps/tanstack-playground/src/routes/$course.$topic.$slug.tsx`

- [ ] **Step 1: Create route**

Create `apps/tanstack-playground/src/routes/$course.$topic.$slug.tsx`:

```tsx
import { createFileRoute, notFound } from '@tanstack/react-router';
import { NoteLayout } from '~/components/note-layout';
import { findNote } from '~/notes/_registry';

export const Route = createFileRoute('/$course/$topic/$slug')({
  loader: async ({ params }) => {
    const note = findNote(params.course, params.topic, params.slug);
    if (!note) throw notFound();
    const mod = await note.load();
    return { note, Content: mod.default };
  },
  component: NotePage,
});

function NotePage() {
  const { note, Content } = Route.useLoaderData();
  return (
    <NoteLayout note={note}>
      <Content />
    </NoteLayout>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/routes/\$course.\$topic.\$slug.tsx
git commit -m "feat(routes): /\$course/\$topic/\$slug — single note page"
```

---

### Task 20: Mid-plan dev sanity check

**Files:** none.

- [ ] **Step 1: Run dev server**

Run: `pnpm -C apps/tanstack-playground dev`
Expected: starts; `/` loads showing the "還沒有筆記" empty state; console clean.

- [ ] **Step 2: Verify `routeTree.gen.ts` regenerated**

Confirm `src/routeTree.gen.ts` now includes `$course`, `$course.$topic`, and `$course.$topic.$slug` entries.

- [ ] **Step 3: Kill dev server**

- [ ] **Step 4: (Nothing to commit — verification only)**

---

## Phase 5: Content

### Task 21: Rocketship demo component

**Files:**

- Create: `apps/tanstack-playground/src/notes/wham/canvas-animation/rocketship.tsx`

- [ ] **Step 1: Create demo**

Create `apps/tanstack-playground/src/notes/wham/canvas-animation/rocketship.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import { clampedNormalize, convertPolarToCartesian, setupCanvas } from '~/utils/canvas';

const COLORS = ['hsl(35deg 100% 50%)', 'hsl(40deg 100% 50%)', 'hsl(45deg 100% 60%)', 'hsl(50deg 100% 65%)'];
const PARTICLES_PER_SECOND = 600;
const AIR_RESISTANCE = 2;

type Particle = {
  createdAt: number;
  x: number;
  y: number;
  xVelocity: number;
  yVelocity: number;
  radius: number;
  color: string;
  lifespan: number;
  opacity: number;
};

export default function Rocketship() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions } = setupCanvas(canvas);
    let particles: Particle[] = [];
    let lastTimestamp = performance.now();
    let rafId = 0;
    let lastCleanup = performance.now();

    function generateParticle(): Particle {
      const angleDeg = 60 + Math.random() * 60; // cone aimed downward
      const velocity = 100 + Math.random() * 100;
      const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angleDeg, velocity);
      return {
        createdAt: performance.now(),
        x: dimensions.width / 2,
        y: 0,
        xVelocity,
        yVelocity,
        radius: 1 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        lifespan: 500 + Math.random() * 1000,
        opacity: 1,
      };
    }

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const n = Math.round(PARTICLES_PER_SECOND * deltaTime);
      for (let i = 0; i < n; i++) particles.push(generateParticle());

      for (const p of particles) {
        // Course's frame-rate-dependent approximation (see Gotchas in the note)
        p.yVelocity *= 1 - AIR_RESISTANCE * deltaTime;
        p.x += p.xVelocity * deltaTime;
        p.y += p.yVelocity * deltaTime;

        const age = now - p.createdAt;
        p.opacity = clampedNormalize(age, p.lifespan, 0);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      if (now - lastCleanup > 1000) {
        particles = particles.filter((p) => now - p.createdAt < 5000);
        lastCleanup = now;
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative mx-auto h-[300px] w-[200px]">
      <div className="animate-rocket-oscillate absolute left-0 top-0 flex h-[120px] w-[200px] items-center justify-center text-6xl">
        🚀
      </div>
      <canvas ref={canvasRef} className="absolute left-0 top-[110px] h-[200px] w-[200px]" />
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add apps/tanstack-playground/src/notes/wham/canvas-animation/rocketship.tsx
git commit -m "feat(notes): add rocketship canvas demo"
```

---

### Task 22: Rocketship MDX note

**Files:**

- Create: `apps/tanstack-playground/src/notes/wham/canvas-animation/rocketship.mdx`

- [ ] **Step 1: Create MDX**

Create `apps/tanstack-playground/src/notes/wham/canvas-animation/rocketship.mdx`:

```mdx
---
title: Rocketship, Revisited
sourceUrl: https://courses.joshwcomeau.com/wham/04-canvas/04-rocketship
lessonNumber: '04-canvas/04-rocketship'
summary: 把 DOM particle 動畫搬到 Canvas,從「起點→終點」換成「velocity + deltaTime」思維。
tags: [canvas, deltaTime, velocity, rAF, air-resistance]
---

import Rocketship from './rocketship';

## TL;DR

- DOM particles(每顆都是 `<div>`)在量大時吃不消;Canvas 可以丟上千顆,效能 10× ↑。
- Canvas 動畫的心智模型從 CSS 的「start → end」變成「velocity + deltaTime」。
- 角度 + 力量 → xVelocity / yVelocity,這裡的 `convertPolarToCartesian` 同一支工具兩種思維都可用,只是語義不同。

<DemoFrame title="Rocketship with Canvas particles">
  <Rocketship />
</DemoFrame>

## Why it works

每一幀做三件事:

1. **生粒子** — 需要每秒產生 600 顆,所以每幀產生 `600 × deltaTime` 顆。不用 `setInterval`,跟 rAF 對齊。
2. **更新粒子** — `x += xVelocity * deltaTime`;`yVelocity` 乘上 drag 達到空氣阻力。
3. **畫粒子** — `ctx.arc` + `fillStyle`;透明度用 `clampedNormalize(age, lifespan, 0)` 做線性淡出。

粒子 5 秒後從陣列移除,避免記憶體無限增長。這邊不用每幀都 filter(O(n)),每秒清一次就夠。

`deltaTime` 來自 `performance.now() - lastTimestamp`,但必須 **clamp 到 250ms 上限** — 切到別的 tab 回來時 `deltaTime` 會暴衝到幾十秒,直接算下去粒子會瞬間噴發 10,000 顆讓瀏覽器凍結。

## Gotchas

- **Air resistance 的近似版本會隨 frame rate 崩壞。** 上面 demo 用的是課程示範版 `v *= 1 - AIR_RESISTANCE * deltaTime`,60Hz 看起來很 OK,但低 fps 時 `1 - k*dt` 可能接近 0 甚至變負;正解是 `v *= Math.exp(-AIR_RESISTANCE * deltaTime)`(課程的 info box 給的答案)。
- **`deltaTime` 一定要 clamp。** 沒 clamp 的話 tab 從背景切回來會爆粒子。
- **Strict Mode double-invoke。** `useEffect` 裡 `requestAnimationFrame` 一定要在 cleanup 呼叫 `cancelAnimationFrame`,不然會有兩條 rAF loop 並行。

## Related

- _(M2 內沒有其他筆記,留空)_
```

- [ ] **Step 2: Type-check (registry should load new frontmatter)**

Run: `pnpm -C apps/tanstack-playground exec tsc --noEmit`
Expected: no errors. Registry picks up the new MDX via glob.

- [ ] **Step 3: Dev server smoke test**

Run: `pnpm -C apps/tanstack-playground dev`
Navigate to:

- `/` → should show 1 NoteCard for rocketship
- `/wham` → should show `canvas-animation` topic card (1 lesson)
- `/wham/canvas-animation` → should show rocketship NoteCard
- `/wham/canvas-animation/rocketship` → should render the note with rendered prose, visible demo (🚀 + particles), source link, tags
- `/nonexistent` → should render the "找不到這則筆記" notFound UI

Also open DevTools console: expect **zero** warnings/errors.

Kill dev server.

- [ ] **Step 4: Commit**

```
git add apps/tanstack-playground/src/notes/wham/canvas-animation/rocketship.mdx
git commit -m "feat(notes): add rocketship.mdx — first WHAM Canvas Animation note"
```

---

## Phase 6: Deployment

### Task 23: GitHub Actions workflow

**Files:**

- Create: `.github/workflows/deploy-tanstack-playground.yml` (repo root)

- [ ] **Step 1: Inspect repo for pnpm version + Node version hints**

Run: `cat package.json`
Note the `packageManager` field (or check existing workflows for the pnpm version they use).

Run: `ls .github/workflows/ 2>/dev/null || true`
If other deploy workflows exist, mirror their style (pnpm version, Node version, cache key).

- [ ] **Step 2: Create workflow**

Create `.github/workflows/deploy-tanstack-playground.yml`:

```yaml
name: Deploy tanstack-playground to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'apps/tanstack-playground/**'
      - '.github/workflows/deploy-tanstack-playground.yml'
      - 'pnpm-lock.yaml'
      - 'pnpm-workspace.yaml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages-tanstack-playground
  cancel-in-progress: true

env:
  BASE_PATH: /showroom/

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm -C apps/tanstack-playground build
        env:
          BASE_PATH: ${{ env.BASE_PATH }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: apps/tanstack-playground/.output/public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Note: the `BASE_PATH` value `/showroom/` assumes the repo is named `showroom` and deploys to `https://<user>.github.io/showroom/`. Adjust once Pages is configured.

- [ ] **Step 3: Validate YAML**

Run: `pnpm dlx yaml-lint .github/workflows/deploy-tanstack-playground.yml 2>/dev/null || python3 -c "import yaml, sys; yaml.safe_load(open('.github/workflows/deploy-tanstack-playground.yml'))"`
Expected: no parse errors.

- [ ] **Step 4: Commit**

```
git add .github/workflows/deploy-tanstack-playground.yml
git commit -m "ci: deploy tanstack-playground to GitHub Pages on push"
```

---

### Task 24: Final verification pass

**Files:** none.

- [ ] **Step 1: Clean install**

Run:

```
rm -rf apps/tanstack-playground/node_modules apps/tanstack-playground/.output
pnpm install
```

Expected: succeeds.

- [ ] **Step 2: Production build**

Run: `pnpm -C apps/tanstack-playground build`
Expected: build succeeds; confirm `apps/tanstack-playground/.output/public/index.html` and `404.html` exist and are identical.

Run: `diff apps/tanstack-playground/.output/public/index.html apps/tanstack-playground/.output/public/404.html`
Expected: no output (files identical — SPA fallback intact).

- [ ] **Step 3: Preview built site**

Run: `pnpm -C apps/tanstack-playground preview`
In a browser, walk through:

- `/` — rocketship card visible
- `/wham` — Canvas Animation card, "1 lesson"
- `/wham/canvas-animation` — rocketship card
- `/wham/canvas-animation/rocketship` — breadcrumb, title, summary, 📖 source link (confirm `target="_blank"` opens new tab to `courses.joshwcomeau.com/...`), tags, TL;DR prose, visible 🚀 animation with streaming particles, Gotchas rendered as list, code fences highlighted
- `/wham/canvas-animation/rocketship` refresh (direct URL load): page renders without white screen (SPA 404 fallback works)
- `/does-not-exist` — notFound UI with "回到首頁" link

- [ ] **Step 4: Console check**

DevTools Console should be **empty** on rocketship note page. No React warnings. No 404s on assets.

- [ ] **Step 5: Strict Mode / rAF leak check**

On the rocketship page, open DevTools → Performance, record 3 seconds. Confirm a single steady rAF loop (not two parallel loops). If two loops appear, cleanup in `rocketship.tsx` is incorrect — fix before proceeding.

- [ ] **Step 6: Kill preview**

- [ ] **Step 7: No extra commit needed unless bugs surfaced**

If any verification step fails, create a fix commit scoped to the fix. Otherwise proceed to push.

---

### Task 25: Push branch + open PR

**Files:** none.

- [ ] **Step 1: Review log**

Run: `git log main..HEAD --oneline`
Expected: ~25 commits telling a clean story from deps install through final verification.

- [ ] **Step 2: Push branch**

Run: `git push -u origin feat/notes-site`
Expected: branch created on origin.

- [ ] **Step 3: Open PR**

Use the `commit-push-pr` skill, or:

```
gh pr create --title "feat: notes site in tanstack-playground (M2)" --body "$(cat <<'EOF'
## Summary
- Adds an MDX notes site inside `apps/tanstack-playground` (course → topic → lesson hierarchy)
- First lesson: **Rocketship, Revisited** (Josh W Comeau WHAM, Canvas Animation)
- TOC pages at `/`, `/$course`, `/$course/$topic`
- GitHub Actions deploys to GitHub Pages on push to main

## Scope decisions (see spec for full context)
- Tests: **not** in M2 (per spec)
- Responsive canvas, dark mode, tags/search: deferred
- Rocketship uses course's approximation for air resistance; Gotchas call out the `Math.exp` correction
- `BASE_PATH` defaults to `/showroom/` — adjust once GH Pages source is configured

## Test plan
- [ ] Fresh `pnpm install` + `pnpm -C apps/tanstack-playground build` succeed
- [ ] `pnpm -C apps/tanstack-playground preview` serves a working SPA
- [ ] All four URL layers render (/, /wham, /wham/canvas-animation, /wham/canvas-animation/rocketship)
- [ ] Unknown routes render the notFound UI
- [ ] rocketship demo: particles visible, fade out, no rAF leak in Strict Mode
- [ ] Source link opens the original lesson in a new tab
- [ ] Direct URL refresh works (SPA 404 fallback intact)
- [ ] GH Actions workflow validated by a subsequent PR or manual dispatch once Pages is configured
EOF
)"
```

- [ ] **Step 4: Share PR URL with user**

---

## Self-review notes

- **Spec coverage:** Every decision in the spec's "Decisions recap" table is realized (tasks referenced parenthetically): MDX tooling (T1–T2), Tailwind+typography (T1, T3), shiki (T2), glob+Zod discovery (T5, T7), 3-layer hierarchy (T7, T17–T19, T22), frontmatter schema (T5), courses/topics metadata (T6), canvas utils (T8), all seven components (T9–T14), root overhaul + delete about (T15), all four routes (T16–T19), rocketship demo + MDX (T21–T22), GH Actions (T23), manual verification (T24). Non-goals (tests, responsive, dark mode, search) are explicitly left unbuilt.
- **Placeholder scan:** No "TBD" / "implement later" in any task. Every code step has a full code block. `BASE_PATH` is parameterized via env, which is a deliberate config choice, not a TBD.
- **Type consistency:** `NoteEntry` (not `NoteMeta` — earlier spec draft) used consistently across registry and all consuming components. `NoteFrontmatter` matches schema. All route params (`course`, `topic`, `slug`) use the same names throughout.
- **Known fragile bit:** TanStack Router's generated `routeTree.gen.ts` must pick up the new dynamic routes; Task 20 verifies regeneration. If the file isn't regenerated, `pnpm -C apps/tanstack-playground dev` once to trigger it, or consult the router's docs.
