/// <reference types="vite/client" />
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Playground' },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children?: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
          <Link to="/" activeProps={{ style: { fontWeight: 700 } }} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/about" activeProps={{ style: { fontWeight: 700 } }}>
            About
          </Link>
        </nav>
        <main style={{ padding: 16 }}>{children ?? <Outlet />}</main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
