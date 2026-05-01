import { useRef } from 'react';

const ITEMS = ['intro', 'background', 'method', 'results', 'conclusion'];

export function AnchorSmoothScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  function jumpTo(id: string) {
    const root = containerRef.current;
    if (!root) return;
    const target = root.querySelector(`[data-section="${id}"]`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {ITEMS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => jumpTo(id)}
            className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
          >
            jump to {id}
          </button>
        ))}
      </div>
      <div
        ref={containerRef}
        className="h-72 w-full max-w-md overflow-y-auto rounded-md bg-slate-100 p-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {ITEMS.map((id) => (
          <section key={id} data-section={id} className="mb-2 rounded-md bg-white p-6">
            <h3 className="font-bold uppercase">{id}</h3>
            <p className="mt-2 text-sm text-gray-600">這裡是 {id} section,使用 anchor 點擊跳轉。</p>
            <div className="h-32" />
          </section>
        ))}
      </div>
      <p className="text-xs text-gray-500">
        anchor jump 用 native `behavior: 'smooth'` 是合理應用 — 只是「點擊跳轉」這單一動作有過渡。整頁 scroll 仍正常。
      </p>
    </div>
  );
}
