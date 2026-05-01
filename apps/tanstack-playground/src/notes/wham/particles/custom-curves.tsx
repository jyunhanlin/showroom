import { useState } from 'react';

const COLOR = 'oklch(0.7 0.18 200)';
const HANDLE_COLOR = 'oklch(0.85 0.15 30)';

type Point = { x: number; y: number };

type Preset = { name: string; cps: [Point, Point] };

const PRESETS: Preset[] = [
  {
    name: 'linear',
    cps: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ],
  },
  {
    name: 'ease-in',
    cps: [
      { x: 0.42, y: 0 },
      { x: 1, y: 1 },
    ],
  },
  {
    name: 'ease-out',
    cps: [
      { x: 0, y: 0 },
      { x: 0.58, y: 1 },
    ],
  },
  {
    name: 'ease-in-out',
    cps: [
      { x: 0.42, y: 0 },
      { x: 0.58, y: 1 },
    ],
  },
  {
    name: 'ease',
    cps: [
      { x: 0.25, y: 0.1 },
      { x: 0.25, y: 1 },
    ],
  },
];

const SIZE = 240;

export function BezierEditor() {
  const [p1, setP1] = useState<Point>({ x: 0.42, y: 0 });
  const [p2, setP2] = useState<Point>({ x: 0.58, y: 1 });
  const [duration, setDuration] = useState(800);
  const [runId, setRunId] = useState(0);

  const cubicBezierString = `cubic-bezier(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`;

  function pointToSvg(p: Point) {
    return { x: p.x * SIZE, y: SIZE - p.y * SIZE };
  }

  function handleDrag(setter: (p: Point) => void) {
    return (e: React.PointerEvent<SVGCircleElement>) => {
      const svg = e.currentTarget.ownerSVGElement;
      if (!svg) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      function move(ev: PointerEvent) {
        const rect = svg!.getBoundingClientRect();
        const x = (ev.clientX - rect.left) / rect.width;
        const y = 1 - (ev.clientY - rect.top) / rect.height;
        setter({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      }
      function up() {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      }
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    };
  }

  const svgP1 = pointToSvg(p1);
  const svgP2 = pointToSvg(p2);
  const start = pointToSvg({ x: 0, y: 0 });
  const end = pointToSvg({ x: 1, y: 1 });

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-cc-slide {
          from { transform: translateX(0) }
          to { transform: translateX(${SIZE}px) }
        }
      `}</style>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <svg
          viewBox={`-20 -20 ${SIZE + 40} ${SIZE + 40}`}
          width={SIZE + 40}
          height={SIZE + 40}
          className="rounded-md bg-slate-900 touch-none"
        >
          <line x1="0" y1="0" x2={SIZE} y2="0" stroke="oklch(0.4 0 0)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="0" y1={SIZE} x2={SIZE} y2={SIZE} stroke="oklch(0.4 0 0)" strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2={SIZE} stroke="oklch(0.4 0 0)" strokeWidth="1" />
          <line x1={SIZE} y1="0" x2={SIZE} y2={SIZE} stroke="oklch(0.4 0 0)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1={start.x} y1={start.y} x2={svgP1.x} y2={svgP1.y} stroke="oklch(0.5 0.1 30 / 0.5)" strokeWidth="1" />
          <line x1={end.x} y1={end.y} x2={svgP2.x} y2={svgP2.y} stroke="oklch(0.5 0.1 30 / 0.5)" strokeWidth="1" />
          <path
            d={`M ${start.x},${start.y} C ${svgP1.x},${svgP1.y} ${svgP2.x},${svgP2.y} ${end.x},${end.y}`}
            fill="none"
            stroke={COLOR}
            strokeWidth="2"
          />
          <circle cx={start.x} cy={start.y} r="4" fill={COLOR} />
          <circle cx={end.x} cy={end.y} r="4" fill={COLOR} />
          <circle
            cx={svgP1.x}
            cy={svgP1.y}
            r="8"
            fill={HANDLE_COLOR}
            style={{ cursor: 'grab' }}
            onPointerDown={handleDrag(setP1)}
          />
          <circle
            cx={svgP2.x}
            cy={svgP2.y}
            r="8"
            fill={HANDLE_COLOR}
            style={{ cursor: 'grab' }}
            onPointerDown={handleDrag(setP2)}
          />
        </svg>
        <div className="flex w-64 flex-col gap-3">
          <div className="rounded bg-slate-100 p-2 font-mono text-xs">{cubicBezierString}</div>
          <div className="flex flex-wrap gap-1">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  setP1(preset.cps[0]);
                  setP2(preset.cps[1]);
                }}
                className="rounded bg-slate-200 px-2 py-1 font-mono text-xs hover:bg-slate-300"
              >
                {preset.name}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 font-mono text-sm">
            <span className="w-24">duration: {duration}ms</span>
            <input
              type="range"
              min={200}
              max={2000}
              step={50}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </label>
          <div className="rounded-md bg-slate-900 p-3" style={{ width: SIZE + 24 }}>
            <div className="relative" style={{ height: 32, width: SIZE }}>
              <div
                key={runId}
                className="absolute top-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: COLOR,
                  animation: `wham-cc-slide ${duration}ms ${cubicBezierString} forwards`,
                }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRunId((id) => id + 1)}
            className="rounded bg-rose-500 px-3 py-1 font-mono text-xs text-white hover:bg-rose-600"
          >
            replay
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500">拖兩個控制點 / 套 preset / 調 duration → 看球的節奏怎麼變。</p>
    </div>
  );
}
