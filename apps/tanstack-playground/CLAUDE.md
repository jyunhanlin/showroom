# tanstack-playground

TanStack Start (SPA mode) notes site for Josh W Comeau's Whimsical Animations (WHAM) course.

## Commands

- `pnpm dev` — Vite dev server on :3000
- `pnpm build` — `vite build && tsc --noEmit` + copies `index.html` to `404.html`
- `pnpm lint` — oxlint
- Pre-commit hook (`lint-staged`) runs `oxlint --fix` + `oxfmt` on staged files; expect reformatted hunks after `git commit`

## Adding a note

- Drop `.mdx` at `src/notes/<course>/<topic>/<slug>.mdx`; `_registry.ts` picks it up via `import.meta.glob`
- Co-locate any React demo as `<slug>.tsx` in the same folder
- Frontmatter schema: `src/notes/_schema.ts`

**Ordering:** Two-tier sort in `_registry.ts`. Primary `chapterKey` = `parseInt(lessonNumber, 10)` (e.g. `01-particles/...` → `1`) — keeps notes from the same chapter clustered. Secondary `orderKey` = explicit `order` if set, else falls back to leading-int again. Tie-break by `slug.localeCompare`. Add `order: N` in frontmatter only to disambiguate **within** a chapter; it no longer overrides chapter ordering.

## Canvas demos

Helpers in `src/utils/canvas.ts`:

- `setupCanvas(canvas)` — returns `{ ctx, dimensions }`, handles DPR via `ctx.scale(dpr, dpr)`
- `convertPolarToCartesian(angleDeg, distance)`, `normalize`, `clampedNormalize`

rAF loop conventions (see `rocketship.tsx`, `confetti.tsx`):

- **Clamp `deltaTime` to ≤ 250ms.** Tab-switch resume spikes `performance.now()` delta by seconds; unclamped, `n * deltaTime` instantly explodes particle count on return
- Run cleanup on a separate `setInterval(fn, 1000)` timer, not inline per-frame
- `cancelAnimationFrame` + `clearInterval` in the `useEffect` cleanup (Strict Mode double-invokes)

## WHAM course content

Notes under `src/notes/wham/` port the paid WHAM course. Under its personal-non-commercial-use license:

- **Do not reproduce** course prose/exercise text, verbatim course code comments, or course-hosted image asset URLs
- Variable names, lodash usage, and code structure **should** mirror the course — they serve as cross-reference anchors
- Keep `sourceUrl` in frontmatter pointing at the lesson for attribution

## Dependencies

Use `lodash-es`, not `lodash`. Vite tree-shakes the ESM build; `lodash` (CJS) pulls the whole library into the bundle.
