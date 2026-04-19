# Showroom

Monorepo of small JavaScript framework playgrounds, each deployed independently to GitHub Pages.

| Playground                                             | Stack                                                  | Live                                                               |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------ |
| [`apps/nextjs-playground`](apps/nextjs-playground)     | Next.js (static export) — R3F / Framer Motion / shadcn | [open](https://jyunhanlin.github.io/showroom/nextjs-playground/)   |
| [`apps/tanstack-playground`](apps/tanstack-playground) | TanStack Start (SPA mode)                              | [open](https://jyunhanlin.github.io/showroom/tanstack-playground/) |
| [`apps/astro-playground`](apps/astro-playground)       | Astro (static)                                         | [open](https://jyunhanlin.github.io/showroom/astro-playground/)    |

## Prerequisites

- Node.js 22
- pnpm (enforced via the root `preinstall` hook)

## Scripts

From the repo root:

| Playground | Dev                 | Build                 | Run                     |
| ---------- | ------------------- | --------------------- | ----------------------- |
| Next.js    | `pnpm next:dev`     | `pnpm next:build`     | `pnpm next:start`       |
| TanStack   | `pnpm tanstack:dev` | `pnpm tanstack:build` | `pnpm tanstack:preview` |
| Astro      | `pnpm astro:dev`    | `pnpm astro:build`    | `pnpm astro:preview`    |

Repo-wide tooling: `pnpm lint` (oxlint), `pnpm format` (oxfmt).

## Deployment

Each app has its own workflow under `.github/workflows/` that triggers on
changes to that app's directory, builds with `BASE_PATH=/showroom/<app>/`,
and publishes to the matching subpath on `jyunhanlin.github.io/showroom/`.
