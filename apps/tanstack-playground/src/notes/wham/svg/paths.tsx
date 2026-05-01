import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const DIMMED = 'oklch(0.9 0.3 164 / 0.35)';

type Step = { type: 'M' | 'L'; x: number; y: number; label: string };

const STEPS: Step[] = [
  { type: 'M', x: 6, y: 4, label: 'M 6,4' },
  { type: 'L', x: 12, y: 4, label: 'L 12,4' },
  { type: 'L', x: 12, y: 10, label: 'L 12,10' },
  { type: 'M', x: 4, y: 12, label: 'M 4,12' },
  { type: 'L', x: 12, y: 4, label: 'L 12,4' },
];

function buildD(stepCount: number): string {
  return STEPS.slice(0, stepCount)
    .map((s) => `${s.type} ${s.x},${s.y}`)
    .join(' ');
}

export function PathStepThrough() {
  const [step, setStep] = useState(STEPS.length);
  const visible = STEPS.slice(0, step);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 16 16" width={320} height={320} className="block rounded-md bg-slate-900">
        <path
          d={buildD(step)}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {visible.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="0.45" fill={s.type === 'M' ? DIMMED : STROKE_COLOR} />
            <text x={s.x + 0.6} y={s.y - 0.6} fill={STROKE_COLOR} fontSize="1" fontFamily="monospace">
              {s.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex flex-col items-center gap-2">
        <label className="flex items-center gap-3 font-mono text-sm">
          <span className="w-24">
            step: {step}/{STEPS.length}
          </span>
          <input
            type="range"
            min={0}
            max={STEPS.length}
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </label>
        <pre className="rounded bg-slate-100 p-2 font-mono text-xs">d=&quot;{buildD(step) || '(empty)'}&quot;</pre>
      </div>
    </div>
  );
}
