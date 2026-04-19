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

SPA mode is enabled in `vite.config.ts`:

```ts
tanstackStart({ spa: { enabled: true } });
```

The build produces a prerendered shell at `.output/public/_shell.html`. To
deploy, ship `.output/public/` and point all 404s to that shell (e.g. Netlify
`_redirects`: `/* /_shell.html 200`).

## Migrating to full SSR later

Drop the `spa` option from `tanstackStart()` — file-based routes, loaders, and
server functions stay as-is.
