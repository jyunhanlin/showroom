import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const CONTROL_COLOR = 'oklch(0.7 0.2 30)';
const CONTROL_LINE_COLOR = 'oklch(0.7 0.2 30 / 0.4)';

export function QuadraticBezier() {
  const [cpX, setCpX] = useState(8);
  const [cpY, setCpY] = useState(0);
  const start = { x: 2, y: 14 };
  const end = { x: 14, y: 14 };
  const d = `M ${start.x},${start.y} Q ${cpX},${cpY} ${end.x},${end.y}`;

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 16 16" width={300} height={300} className="block rounded-md bg-slate-900">
        <line x1={start.x} y1={start.y} x2={cpX} y2={cpY} stroke={CONTROL_LINE_COLOR} strokeWidth="0.15" />
        <line x1={cpX} y1={cpY} x2={end.x} y2={end.y} stroke={CONTROL_LINE_COLOR} strokeWidth="0.15" />
        <path d={d} fill="none" stroke={STROKE_COLOR} strokeWidth="0.4" strokeLinecap="round" />
        <circle cx={start.x} cy={start.y} r="0.4" fill={STROKE_COLOR} />
        <circle cx={end.x} cy={end.y} r="0.4" fill={STROKE_COLOR} />
        <circle cx={cpX} cy={cpY} r="0.4" fill={CONTROL_COLOR} />
      </svg>
      <pre className="rounded bg-slate-100 p-2 font-mono text-xs">{d}</pre>
      <div className="grid grid-cols-2 gap-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-14">cp.x: {cpX}</span>
          <input type="range" min={-4} max={20} value={cpX} onChange={(e) => setCpX(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-14">cp.y: {cpY}</span>
          <input type="range" min={-4} max={20} value={cpY} onChange={(e) => setCpY(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}

export function CubicBezier() {
  const [cp1X, setCp1X] = useState(2);
  const [cp1Y, setCp1Y] = useState(0);
  const [cp2X, setCp2X] = useState(14);
  const [cp2Y, setCp2Y] = useState(0);
  const start = { x: 2, y: 14 };
  const end = { x: 14, y: 14 };
  const d = `M ${start.x},${start.y} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${end.x},${end.y}`;

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 16 16" width={300} height={300} className="block rounded-md bg-slate-900">
        <line x1={start.x} y1={start.y} x2={cp1X} y2={cp1Y} stroke={CONTROL_LINE_COLOR} strokeWidth="0.15" />
        <line x1={end.x} y1={end.y} x2={cp2X} y2={cp2Y} stroke={CONTROL_LINE_COLOR} strokeWidth="0.15" />
        <path d={d} fill="none" stroke={STROKE_COLOR} strokeWidth="0.4" strokeLinecap="round" />
        <circle cx={start.x} cy={start.y} r="0.4" fill={STROKE_COLOR} />
        <circle cx={end.x} cy={end.y} r="0.4" fill={STROKE_COLOR} />
        <circle cx={cp1X} cy={cp1Y} r="0.4" fill={CONTROL_COLOR} />
        <circle cx={cp2X} cy={cp2Y} r="0.4" fill={CONTROL_COLOR} />
      </svg>
      <pre className="rounded bg-slate-100 p-2 font-mono text-xs">{d}</pre>
      <div className="grid grid-cols-2 gap-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-16">cp1.x: {cp1X}</span>
          <input type="range" min={-4} max={20} value={cp1X} onChange={(e) => setCp1X(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16">cp1.y: {cp1Y}</span>
          <input type="range" min={-4} max={20} value={cp1Y} onChange={(e) => setCp1Y(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16">cp2.x: {cp2X}</span>
          <input type="range" min={-4} max={20} value={cp2X} onChange={(e) => setCp2X(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16">cp2.y: {cp2Y}</span>
          <input type="range" min={-4} max={20} value={cp2Y} onChange={(e) => setCp2Y(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
