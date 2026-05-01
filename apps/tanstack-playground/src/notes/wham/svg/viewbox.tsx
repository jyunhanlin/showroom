import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';

export function ViewboxPanZoom() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [size, setSize] = useState(300);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox={`${x} ${y} ${size} ${size}`} width={300} height={300} className="block rounded-md bg-slate-900">
        <line x1="-1000" y1="0" x2="1000" y2="0" stroke={STROKE_COLOR} strokeWidth="0.5" opacity="0.25" />
        <line x1="0" y1="-1000" x2="0" y2="1000" stroke={STROKE_COLOR} strokeWidth="0.5" opacity="0.25" />
        <line x1="-1000" y1="200" x2="1000" y2="200" stroke={STROKE_COLOR} strokeWidth="0.5" opacity="0.25" />
        <line x1="200" y1="-1000" x2="200" y2="1000" stroke={STROKE_COLOR} strokeWidth="0.5" opacity="0.25" />
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
        <text x="100" y="100" fill={STROKE_COLOR} fontSize="14" textAnchor="middle" dominantBaseline="middle">
          200×200
        </text>
      </svg>
      <div className="grid grid-cols-1 gap-2 font-mono text-sm sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <span className="w-24">x: {x}</span>
          <input type="range" min={-200} max={400} value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-24">y: {y}</span>
          <input type="range" min={-200} max={400} value={y} onChange={(e) => setY(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 sm:col-span-2">
          <span className="w-24">size: {size}</span>
          <input type="range" min={100} max={600} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}

function HamburgerIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <line x1="5" y1="7" x2="19" y2="7" stroke={STROKE_COLOR} strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke={STROKE_COLOR} strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="17" x2="19" y2="17" stroke={STROKE_COLOR} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconScale() {
  const sizes = [24, 48, 96, 192];

  return (
    <div className="flex flex-wrap items-end justify-center gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <div
            className="flex items-center justify-center rounded-md bg-slate-900 p-3"
            style={{ width: size + 24, height: size + 24 }}
          >
            <HamburgerIcon size={size} />
          </div>
          <span className="font-mono text-xs text-gray-600">{size}px</span>
        </div>
      ))}
    </div>
  );
}
