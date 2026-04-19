# astro-playground

Static multi-page playground built with [Astro](https://astro.build).

## Scripts

```bash
pnpm --filter astro-playground dev      # start dev server on :4321
pnpm --filter astro-playground build    # build static site to dist/
pnpm --filter astro-playground preview  # preview the production build
```

Or from the repo root:

```bash
pnpm astro:dev
pnpm astro:build
pnpm astro:preview
```

## GitHub Pages deploy

Configured via `.github/workflows/astro-playground.yaml`. The workflow sets
`BASE_PATH=/showroom/astro-playground/`; the layout reads
`import.meta.env.BASE_URL` so navigation and the favicon resolve correctly
under that prefix.

Local production build with the same base path:

```bash
BASE_PATH=/showroom/astro-playground/ pnpm astro:build
```
