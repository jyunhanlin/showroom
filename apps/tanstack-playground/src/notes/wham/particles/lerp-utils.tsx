import { useState } from 'react';
import { clamp, clampedNormalize, normalize } from '~/utils/canvas';

const COLORS = {
  normalize: 'oklch(0.75 0.18 30)',
  clamp: 'oklch(0.75 0.18 90)',
  clampedNormalize: 'oklch(0.75 0.18 200)',
  exponential: 'oklch(0.75 0.18 280)',
};

const IN_MIN = 0;
const IN_MAX = 50;
const OUT_MIN = 0.01;
const OUT_MAX = 1;

function exponentialNormalize(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  exponent = 2,
): number {
  const t = (value - inMin) / (inMax - inMin);
  return outMin + (outMax - outMin) * Math.pow(t, exponent);
}

export function NormalizeVariants() {
  const [value, setValue] = useState(25);

  const W = 360;
  const H = 200;
  const PAD = 24;
  const inLow = -10;
  const inHigh = 70;

  function plot(fn: (v: number) => number, color: string) {
    const points: string[] = [];
    for (let x = inLow; x <= inHigh; x += 0.5) {
      const y = fn(x);
      const px = PAD + ((x - inLow) / (inHigh - inLow)) * (W - 2 * PAD);
      const py = H - PAD - ((y - 0) / (1.2 - 0)) * (H - 2 * PAD);
      points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2" />;
  }

  const cursorX = PAD + ((value - inLow) / (inHigh - inLow)) * (W - 2 * PAD);

  const results = {
    normalize: normalize(value, IN_MIN, IN_MAX, OUT_MIN, OUT_MAX),
    clamp: clamp(value, OUT_MIN, OUT_MAX),
    clampedNormalize: clampedNormalize(value, IN_MIN, IN_MAX, OUT_MIN, OUT_MAX),
    exponential: clamp(exponentialNormalize(value, IN_MIN, IN_MAX, OUT_MIN, OUT_MAX, 2), OUT_MIN, OUT_MAX),
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="rounded-md bg-slate-900">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="oklch(0.4 0 0)" strokeWidth="0.5" />
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="oklch(0.4 0 0)" strokeWidth="0.5" />
        <line
          x1={PAD + ((IN_MIN - inLow) / (inHigh - inLow)) * (W - 2 * PAD)}
          y1={PAD}
          x2={PAD + ((IN_MIN - inLow) / (inHigh - inLow)) * (W - 2 * PAD)}
          y2={H - PAD}
          stroke="oklch(0.45 0 0)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
        />
        <line
          x1={PAD + ((IN_MAX - inLow) / (inHigh - inLow)) * (W - 2 * PAD)}
          y1={PAD}
          x2={PAD + ((IN_MAX - inLow) / (inHigh - inLow)) * (W - 2 * PAD)}
          y2={H - PAD}
          stroke="oklch(0.45 0 0)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
        />
        <text x={PAD + 4} y={H - 8} fill="oklch(0.6 0 0)" fontSize="9">
          {inLow}
        </text>
        <text x={W - PAD - 4} y={H - 8} fill="oklch(0.6 0 0)" fontSize="9" textAnchor="end">
          {inHigh}
        </text>
        <text x="2" y={H - PAD + 3} fill="oklch(0.6 0 0)" fontSize="9">
          0
        </text>
        <text x="2" y={PAD + 3} fill="oklch(0.6 0 0)" fontSize="9">
          1.2
        </text>
        {plot((v) => normalize(v, IN_MIN, IN_MAX, OUT_MIN, OUT_MAX), COLORS.normalize)}
        {plot((v) => clamp(v, OUT_MIN, OUT_MAX), COLORS.clamp)}
        {plot((v) => clampedNormalize(v, IN_MIN, IN_MAX, OUT_MIN, OUT_MAX), COLORS.clampedNormalize)}
        {plot(
          (v) => clamp(exponentialNormalize(v, IN_MIN, IN_MAX, OUT_MIN, OUT_MAX, 2), OUT_MIN, OUT_MAX),
          COLORS.exponential,
        )}
        <line x1={cursorX} y1={PAD} x2={cursorX} y2={H - PAD} stroke="white" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
      <label className="flex w-full max-w-md items-center gap-3 font-mono text-sm">
        <span className="w-32">value: {value}</span>
        <input type="range" min={-10} max={70} value={value} onChange={(e) => setValue(Number(e.target.value))} />
      </label>
      <div className="grid w-full max-w-md grid-cols-1 gap-1 rounded bg-slate-100 p-2 font-mono text-xs sm:grid-cols-2">
        <div style={{ color: COLORS.normalize }}>normalize → {results.normalize.toFixed(3)}</div>
        <div style={{ color: COLORS.clamp }}>clamp → {results.clamp.toFixed(3)}</div>
        <div style={{ color: COLORS.clampedNormalize }}>clampedNormalize → {results.clampedNormalize.toFixed(3)}</div>
        <div style={{ color: COLORS.exponential }}>exponential(p=2) → {results.exponential.toFixed(3)}</div>
      </div>
      <p className="text-xs text-gray-500">
        虛線標出輸入區間 [0, 50]。`normalize` 出界會超過 1;`clampedNormalize` 永遠在 [0.01, 1]。
      </p>
    </div>
  );
}
