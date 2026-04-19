# tanstack-playground

[TanStack Start](https://tanstack.com/start) running in **SPA mode** with file-based routing.

## Scripts

```bash
pnpm --filter tanstack-playground dev      # start dev server on :3000
pnpm --filter tanstack-playground build    # build static SPA shell
pnpm --filter tanstack-playground preview  # preview the production build
```

Or from the repo root:

```bash
pnpm tanstack:dev
pnpm tanstack:build
pnpm tanstack:preview
```

## SPA mode notes

SPA mode is enabled in `vite.config.ts`. The prerender step writes the shell
straight to `.output/public/index.html`, and the build script copies it to
`404.html` so GitHub Pages can serve it as the SPA fallback for unknown paths.

## GitHub Pages deploy

Configured via `.github/workflows/tanstack-playground.yaml`. The workflow sets
`BASE_PATH=/showroom/tanstack-playground/` so Vite rewrites asset URLs and the
TanStack Router `basepath` (read from `import.meta.env.BASE_URL` in
`src/router.tsx`) lines up with the published path.

Local production build with the same base path:

```bash
BASE_PATH=/showroom/tanstack-playground/ pnpm tanstack:build
```

## Migrating to full SSR later

Drop the `spa` option from `tanstackStart()` — file-based routes, loaders, and
server functions stay as-is.
