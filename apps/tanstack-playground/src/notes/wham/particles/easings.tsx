import { useState } from 'react';

const TIMINGS = ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'ease'] as const;
type Timing = (typeof TIMINGS)[number];

const COLOR = 'oklch(0.7 0.18 200)';
const TRACK_WIDTH = 440;
const BALL_SIZE = 24;
const DURATION = 1500;

export function EasingCompare() {
  const [timing, setTiming] = useState<Timing>('ease-in-out');
  const [runId, setRunId] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-easing-slide {
          from { transform: translateX(0) }
          to { transform: translateX(${TRACK_WIDTH - BALL_SIZE}px) }
        }
      `}</style>
      <div className="relative rounded-md bg-slate-900 p-3" style={{ width: TRACK_WIDTH + 24 }}>
        <div className="relative h-12" style={{ width: TRACK_WIDTH }}>
          <div
            key={`${runId}-${timing}`}
            className="absolute top-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: BALL_SIZE,
              height: BALL_SIZE,
              backgroundColor: COLOR,
              animation: `wham-easing-slide ${DURATION}ms ${timing} forwards`,
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 font-mono text-sm">
        {TIMINGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTiming(t);
              setRunId((id) => id + 1);
            }}
            className={`rounded px-3 py-1 ${
              t === timing ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
          >
            {t}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setRunId((id) => id + 1)}
          className="rounded bg-rose-500 px-3 py-1 text-white hover:bg-rose-600"
        >
          replay
        </button>
      </div>
      <p className="text-xs text-gray-500">起點/終點/總時間都一樣;只有「中間時間怎麼分配」變了。</p>
    </div>
  );
}

export function EasingCurveGraph() {
  const curves: { name: Timing; samples: number[] }[] = TIMINGS.map((name) => ({
    name,
    samples: sampleCurve(name),
  }));
  const W = 360;
  const H = 200;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="rounded-md bg-slate-900">
        <line x1="20" y1={H - 20} x2={W - 10} y2={H - 20} stroke="oklch(0.4 0 0)" strokeWidth="1" />
        <line x1="20" y1="10" x2="20" y2={H - 20} stroke="oklch(0.4 0 0)" strokeWidth="1" />
        <text x={W - 10} y={H - 5} fill="oklch(0.6 0 0)" fontSize="10" textAnchor="end">
          time →
        </text>
        <text x="6" y="12" fill="oklch(0.6 0 0)" fontSize="10">
          ↑ progress
        </text>
        {curves.map((c, i) => {
          const hue = 30 + i * 60;
          const stroke = `oklch(0.75 0.18 ${hue})`;
          const points = c.samples
            .map((p, j) => {
              const x = 20 + (j / (c.samples.length - 1)) * (W - 40);
              const y = H - 20 - p * (H - 40);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ');
          return (
            <g key={c.name}>
              <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" />
              <text x={W - 10} y={20 + i * 14} fill={stroke} fontSize="11" textAnchor="end">
                {c.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function sampleCurve(name: Timing): number[] {
  const N = 60;
  const samples: number[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    samples.push(approxCubicBezier(t, name));
  }
  return samples;
}

function approxCubicBezier(t: number, name: Timing): number {
  const cps: Record<Timing, [number, number, number, number]> = {
    linear: [0, 0, 1, 1],
    'ease-in': [0.42, 0, 1, 1],
    'ease-out': [0, 0, 0.58, 1],
    'ease-in-out': [0.42, 0, 0.58, 1],
    ease: [0.25, 0.1, 0.25, 1],
  };
  const [, p1y, , p2y] = cps[name];
  // Cubic Bezier y-axis approximation given t ∈ [0,1] (treating x≈t)
  const u = 1 - t;
  return 3 * u * u * t * p1y + 3 * u * t * t * p2y + t * t * t;
}
