import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';

const PRESETS = [
  { name: 'cubic ease-out', timing: 'cubic-bezier(0, 0, 0.2, 1)' },
  { name: 'linear() crude (5 pts)', timing: 'linear(0, 0.5, 0.85, 0.97, 1)' },
  {
    name: 'linear() spring (overshoot)',
    timing:
      'linear(0, 0.04, 0.16 4%, 0.65, 1.04 17%, 1.16, 1.18, 1.13, 1.04, 0.99 32%, 0.96, 0.99, 1.01, 1.01 47%, 0.99, 1)',
  },
];

export function LinearComparison() {
  const [trigger, setTrigger] = useState(0);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <div className="flex flex-col gap-3 rounded-md bg-slate-900 p-4" style={{ width: 380 }}>
        {PRESETS.map((p) => (
          <div key={p.name} className="flex flex-col gap-1">
            <span className="font-mono text-xs text-gray-400">{p.name}</span>
            <div className="relative h-6 rounded bg-slate-800">
              <div
                key={`${p.name}-${trigger}`}
                className="absolute top-0 h-6 w-6 rounded-full"
                style={{
                  background: STROKE_COLOR,
                  animation: `wham-svg-linear-slide 1.4s ${p.timing} forwards`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setTrigger((t) => t + 1)}
        className="rounded bg-slate-200 px-3 py-1 font-mono text-sm hover:bg-slate-300"
      >
        replay
      </button>
      <style>{`
        @keyframes wham-svg-linear-slide {
          from { left: 0 }
          to { left: calc(100% - 1.5rem) }
        }
      `}</style>
    </div>
  );
}
