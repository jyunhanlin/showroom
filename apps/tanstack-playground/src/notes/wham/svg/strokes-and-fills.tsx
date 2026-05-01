import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';

export function CapsAndJoins() {
  return (
    <svg viewBox="0 0 600 280" className="mx-auto block w-full max-w-[600px] rounded-md bg-slate-900">
      <text x="300" y="22" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        stroke-linecap
      </text>

      <line x1="80" y1="70" x2="180" y2="70" stroke={STROKE_COLOR} strokeWidth="20" strokeLinecap="butt" />
      <text x="130" y="110" fill={STROKE_COLOR} fontSize="12" textAnchor="middle">
        butt (default)
      </text>

      <line x1="250" y1="70" x2="350" y2="70" stroke={STROKE_COLOR} strokeWidth="20" strokeLinecap="round" />
      <text x="300" y="110" fill={STROKE_COLOR} fontSize="12" textAnchor="middle">
        round
      </text>

      <line x1="420" y1="70" x2="520" y2="70" stroke={STROKE_COLOR} strokeWidth="20" strokeLinecap="square" />
      <text x="470" y="110" fill={STROKE_COLOR} fontSize="12" textAnchor="middle">
        square
      </text>

      <text x="300" y="155" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        stroke-linejoin
      </text>

      <polyline
        points="80,240 130,180 180,240"
        fill="none"
        stroke={STROKE_COLOR}
        strokeWidth="18"
        strokeLinejoin="miter"
      />
      <text x="130" y="265" fill={STROKE_COLOR} fontSize="12" textAnchor="middle">
        miter (default)
      </text>

      <polyline
        points="250,240 300,180 350,240"
        fill="none"
        stroke={STROKE_COLOR}
        strokeWidth="18"
        strokeLinejoin="round"
      />
      <text x="300" y="265" fill={STROKE_COLOR} fontSize="12" textAnchor="middle">
        round
      </text>

      <polyline
        points="420,240 470,180 520,240"
        fill="none"
        stroke={STROKE_COLOR}
        strokeWidth="18"
        strokeLinejoin="bevel"
      />
      <text x="470" y="265" fill={STROKE_COLOR} fontSize="12" textAnchor="middle">
        bevel
      </text>
    </svg>
  );
}

export function DashPlayground() {
  const [dashLength, setDashLength] = useState(20);
  const [gapLength, setGapLength] = useState(10);
  const [dashOffset, setDashOffset] = useState(0);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 400 200" className="block w-full max-w-[400px] rounded-md bg-slate-900">
        <polyline
          points="60,40 80,160 320,160 340,40"
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="6"
          strokeDasharray={`${dashLength},${gapLength}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="grid grid-cols-1 gap-2 font-mono text-sm sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <span className="w-28">dash: {dashLength}</span>
          <input
            type="range"
            min={0}
            max={60}
            value={dashLength}
            onChange={(e) => setDashLength(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-28">gap: {gapLength}</span>
          <input
            type="range"
            min={0}
            max={60}
            value={gapLength}
            onChange={(e) => setGapLength(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2 sm:col-span-2">
          <span className="w-28">offset: {dashOffset}</span>
          <input
            type="range"
            min={-100}
            max={100}
            value={dashOffset}
            onChange={(e) => setDashOffset(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
