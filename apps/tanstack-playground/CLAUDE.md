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

**Ordering gotcha:** `orderKey` in `_registry.ts` is `parseInt(lessonNumber, 10)` — only leading digits count. Lessons both prefixed `04-` (e.g. `04-rocketship`, `05-transforms`) collide on `4` and fall back to `slug.localeCompare`. When the leading integer collides with a sibling note, set an explicit `order: N` in frontmatter.

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
