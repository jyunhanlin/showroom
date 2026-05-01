import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const ENDPOINT_COLOR = 'oklch(0.7 0.2 30)';

export function ArcExplorer() {
  const [rx, setRx] = useState(5);
  const [ry, setRy] = useState(5);
  const [rotation, setRotation] = useState(0);
  const [largeArc, setLargeArc] = useState(0);
  const [sweep, setSweep] = useState(0);
  const start = { x: 4, y: 4 };
  const end = { x: 12, y: 12 };
  const d = `M ${start.x},${start.y} A ${rx},${ry} ${rotation} ${largeArc} ${sweep} ${end.x},${end.y}`;

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 16 16" width={320} height={320} className="block rounded-md bg-slate-900">
        <path d={d} fill="none" stroke={STROKE_COLOR} strokeWidth="0.4" strokeLinecap="round" />
        <circle cx={start.x} cy={start.y} r="0.4" fill={ENDPOINT_COLOR} />
        <circle cx={end.x} cy={end.y} r="0.4" fill={ENDPOINT_COLOR} />
      </svg>
      <pre className="rounded bg-slate-100 p-2 font-mono text-xs">{d}</pre>
      <div className="grid grid-cols-2 gap-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-20">rx: {rx}</span>
          <input type="range" min={1} max={20} value={rx} onChange={(e) => setRx(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-20">ry: {ry}</span>
          <input type="range" min={1} max={20} value={ry} onChange={(e) => setRy(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <span className="w-24">rotation: {rotation}°</span>
          <input
            type="range"
            min={0}
            max={180}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={largeArc === 1} onChange={(e) => setLargeArc(e.target.checked ? 1 : 0)} />
          <span>large-arc-flag ({largeArc})</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={sweep === 1} onChange={(e) => setSweep(e.target.checked ? 1 : 0)} />
          <span>sweep-flag ({sweep})</span>
        </label>
      </div>
    </div>
  );
}
