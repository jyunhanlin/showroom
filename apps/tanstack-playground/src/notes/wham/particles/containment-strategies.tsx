import { useState } from 'react';

type Strategy = {
  id: 'naive' | 'center' | 'contained';
  label: string;
  description: string;
};

const STRATEGIES: Strategy[] = [
  { id: 'naive', label: '1. top/left only', description: 'anchored by top-left corner — overflows right & bottom' },
  {
    id: 'center',
    label: '2. translate(-50%, -50%)',
    description: 'anchored by center — symmetric, half-overflow on edges',
  },
  {
    id: 'contained',
    label: '3. translate(calc(-left), calc(-top))',
    description: 'dynamic offset — perfectly contained, never overflows',
  },
];

function transformFor(strategy: Strategy['id'], top: number, left: number): string {
  if (strategy === 'naive') return 'none';
  if (strategy === 'center') return 'translate(-50%, -50%)';
  return `translate(${-left}%, ${-top}%)`;
}

export function ContainmentPlayground() {
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(50);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STRATEGIES.map((strategy) => (
          <div key={strategy.id} className="flex flex-col items-center gap-2">
            <p className="font-mono text-xs text-gray-700">{strategy.label}</p>
            <div className="relative h-32 w-32 rounded-md border border-slate-700 bg-slate-900">
              <span
                className="absolute select-none text-2xl"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: transformFor(strategy.id, top, left),
                }}
              >
                ⭐
              </span>
            </div>
            <p className="text-center text-xs text-gray-500">{strategy.description}</p>
          </div>
        ))}
      </div>
      <div className="grid w-full max-w-sm grid-cols-1 gap-2 font-mono text-sm">
        <label className="flex items-center gap-3">
          <span className="w-20">top: {top}%</span>
          <input type="range" min={0} max={100} value={top} onChange={(e) => setTop(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-3">
          <span className="w-20">left: {left}%</span>
          <input type="range" min={0} max={100} value={left} onChange={(e) => setLeft(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
