import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const SPRING_COLOR = 'oklch(0.7 0.25 30)';

export function EaseVsSpring() {
  const [trigger, setTrigger] = useState(0);

  const reset = () => setTrigger((t) => t + 1);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <div className="flex flex-col gap-3 rounded-md bg-slate-900 p-4" style={{ width: 360 }}>
        <div className="flex items-center gap-3">
          <span className="w-16 font-mono text-xs text-gray-400">cubic-ease</span>
          <div className="relative h-6 flex-1 rounded bg-slate-800">
            <div
              key={`bezier-${trigger}`}
              className="absolute top-0 h-6 w-6 rounded-full"
              style={{
                background: STROKE_COLOR,
                animation: 'wham-svg-ease-cubic 1.4s cubic-bezier(0.42, 0, 0.58, 1) forwards',
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-16 font-mono text-xs text-gray-400">spring</span>
          <div className="relative h-6 flex-1 rounded bg-slate-800">
            <div
              key={`spring-${trigger}`}
              className="absolute top-0 h-6 w-6 rounded-full"
              style={{
                background: SPRING_COLOR,
                animation:
                  'wham-svg-ease-spring 1.4s linear(0, 0.04, 0.16 4%, 0.65, 1.04 17%, 1.16, 1.18, 1.13, 1.04, 0.99 32%, 0.96, 0.99, 1.01, 1.01 47%, 0.99, 1) forwards',
              }}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-slate-200 px-3 py-1 font-mono text-sm hover:bg-slate-300"
      >
        replay
      </button>
      <style>{`
        @keyframes wham-svg-ease-cubic { from { left: 0 } to { left: calc(100% - 1.5rem) } }
        @keyframes wham-svg-ease-spring { from { left: 0 } to { left: calc(100% - 1.5rem) } }
      `}</style>
    </div>
  );
}
