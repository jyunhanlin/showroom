import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const ENDPOINT_COLOR = 'oklch(0.7 0.2 30)';

const STEPS = [
  { d: '', label: '(empty)', endpoint: null as null | { x: number; y: number } },
  { d: 'M 2,10', label: 'M 2,10 — 抬筆移到左下', endpoint: { x: 2, y: 10 } },
  { d: 'M 2,10 L 14,10', label: 'L 14,10 — 畫帽子底邊', endpoint: { x: 14, y: 10 } },
  {
    d: 'M 2,10 L 14,10 A 4,4 0 0 0 6,10',
    label: 'A 4,4 0 0 0 6,10 — 從 (14,10) 拉橢圓弧回 (6,10)',
    endpoint: { x: 6, y: 10 },
  },
];

export function CapStepThrough() {
  const [step, setStep] = useState(STEPS.length - 1);
  const current = STEPS[step]!;

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 16 16" width={320} height={320} className="block rounded-md bg-slate-900">
        {current.d && (
          <path
            d={current.d}
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {current.endpoint && <circle cx={current.endpoint.x} cy={current.endpoint.y} r="0.45" fill={ENDPOINT_COLOR} />}
      </svg>
      <pre className="rounded bg-slate-100 p-2 font-mono text-xs">{current.d || '(empty)'}</pre>
      <div className="flex flex-col items-center gap-2">
        <label className="flex items-center gap-3 font-mono text-sm">
          <span className="w-32">
            step: {step}/{STEPS.length - 1}
          </span>
          <input
            type="range"
            min={0}
            max={STEPS.length - 1}
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </label>
        <p className="text-sm text-gray-700">{current.label}</p>
      </div>
    </div>
  );
}
