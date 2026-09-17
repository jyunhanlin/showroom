/// <reference types="vite/client" />
import { MDXProvider } from '@mdx-js/react';
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';
import { DemoFrame } from '~/components/demo-frame';
import { TagPill } from '~/components/tag-pill';
import '~/styles/app.css';

const NOTE_PATH = /^\/([^/#?]+)\/([^/#?]+)\/([^/#?]+)$/;

// Markdown links like [x](/wham/svg/paths) render as a plain <a>. The router uses hash
// history, so a plain href leaves the app (and the deploy base path) instead of opening
// the note. Route note paths through <Link>, which builds the `#/...` href; any other
// root-relative path gets the hash prefix by hand.
function MdxLink({ href, title, children }: { href?: string; title?: string; children?: ReactNode }) {
  const match = href?.match(NOTE_PATH);
  if (match) {
    const [, course = '', topic = '', slug = ''] = match;
    return (
      <Link to="/$course/$topic/$slug" params={{ course, topic, slug }} title={title}>
        {children}
      </Link>
    );
  }
  const resolved = href?.startsWith('/') ? `#${href}` : href;
  return (
    <a href={resolved} title={title}>
      {children}
    </a>
  );
}

const mdxComponents = { DemoFrame, TagPill, a: MdxLink };

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
