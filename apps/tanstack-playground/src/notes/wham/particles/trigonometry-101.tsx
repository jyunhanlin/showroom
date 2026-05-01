import { useState } from 'react';

const COLOR = 'oklch(0.75 0.18 280)';
const X_COLOR = 'oklch(0.75 0.18 30)';
const Y_COLOR = 'oklch(0.75 0.18 140)';
const SIZE = 320;
const RADIUS = 100;

export function UnitCircleExplorer() {
  const [angle, setAngle] = useState(45);
  const [distance, setDistance] = useState(RADIUS);

  const radians = (angle * Math.PI) / 180;
  const x = Math.cos(radians) * distance;
  const y = Math.sin(radians) * distance;

  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const ptX = cx + x;
  const ptY = cy + y;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} className="rounded-md bg-slate-900">
        <line x1="0" y1={cy} x2={SIZE} y2={cy} stroke="oklch(0.4 0 0)" strokeWidth="0.5" />
        <line x1={cx} y1="0" x2={cx} y2={SIZE} stroke="oklch(0.4 0 0)" strokeWidth="0.5" />
        <circle
          cx={cx}
          cy={cy}
          r={RADIUS}
          fill="none"
          stroke="oklch(0.45 0 0)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
        />
        <line x1={cx} y1={cy} x2={ptX} y2={cy} stroke={X_COLOR} strokeWidth="2" />
        <line x1={ptX} y1={cy} x2={ptX} y2={ptY} stroke={Y_COLOR} strokeWidth="2" />
        <line x1={cx} y1={cy} x2={ptX} y2={ptY} stroke={COLOR} strokeWidth="2" />
        <circle cx={cx} cy={cy} r="3" fill="white" />
        <circle cx={ptX} cy={ptY} r="5" fill={COLOR} />
        <text x={cx + x / 2} y={cy + 14} fill={X_COLOR} fontSize="11" textAnchor="middle">
          cos · {distance} = {x.toFixed(0)}
        </text>
        <text
          x={ptX + (x > 0 ? 6 : -6)}
          y={cy + y / 2}
          fill={Y_COLOR}
          fontSize="11"
          textAnchor={x > 0 ? 'start' : 'end'}
        >
          sin · {distance} = {y.toFixed(0)}
        </text>
        <text x={cx + 26} y={cy - 6} fill="oklch(0.7 0 0)" fontSize="11">
          θ = {angle}°
        </text>
      </svg>
      <div className="grid w-full max-w-sm grid-cols-1 gap-2 font-mono text-sm">
        <label className="flex items-center gap-3">
          <span className="w-28">angle: {angle}°</span>
          <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-3">
          <span className="w-28">distance: {distance}</span>
          <input
            type="range"
            min={20}
            max={140}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="rounded bg-slate-100 p-2 font-mono text-xs">
        x = cos({angle}°) × {distance} = {x.toFixed(2)} <br />
        y = sin({angle}°) × {distance} = {y.toFixed(2)}
      </div>
    </div>
  );
}
