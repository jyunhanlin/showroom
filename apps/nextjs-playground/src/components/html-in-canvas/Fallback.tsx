import type { ReactNode } from 'react';

import type { Support } from './support';

/** Unsupported browser: show the same DOM outside any canvas, with a note. */
export function Fallback({ support, children, reason }: { support: Support; children: ReactNode; reason?: string }) {
  if (support === 'unknown') {
    return <div className="h-[220px] w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-600" />;
  }
  return (
    <div className="space-y-2 rounded-lg border border-dashed border-amber-500 bg-amber-50 p-4 text-sm text-amber-950">
      <p>
        {reason ?? '這個瀏覽器不支援 HTML-in-Canvas（Chrome 157+）。'}
        下面是同一組 DOM，直接放在 canvas 外面：
      </p>
      {children}
    </div>
  );
}
