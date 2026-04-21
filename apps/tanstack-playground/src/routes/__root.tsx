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
