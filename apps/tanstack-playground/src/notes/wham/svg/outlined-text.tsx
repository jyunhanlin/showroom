import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const FILL_COLOR = 'oklch(0.2 0.04 250)';

export function OutlinedText() {
  const [strokeWidth, setStrokeWidth] = useState(8);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 600 200" className="block w-full max-w-[600px] rounded-md bg-slate-900">
        <text x="40" y="20" fill={STROKE_COLOR} fontSize="14">
          default — stroke centered on glyph path
        </text>
        <text
          x="150"
          y="100"
          fill={FILL_COLOR}
          stroke={STROKE_COLOR}
          strokeWidth={strokeWidth}
          fontSize="64"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Hello
        </text>

        <text x="320" y="20" fill={STROKE_COLOR} fontSize="14">
          paint-order: stroke fill — outline pushed outside
        </text>
        <text
          x="450"
          y="100"
          fill={FILL_COLOR}
          stroke={STROKE_COLOR}
          strokeWidth={strokeWidth}
          fontSize="64"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
          paintOrder="stroke fill"
          strokeLinejoin="round"
        >
          Hello
        </text>

        <line
          x1="300"
          y1="40"
          x2="300"
          y2="180"
          stroke={STROKE_COLOR}
          strokeWidth="1"
          strokeDasharray="4,4"
          opacity="0.4"
        />
      </svg>
      <label className="flex items-center gap-3 font-mono text-sm">
        <span>strokeWidth: {strokeWidth}</span>
        <input
          type="range"
          min={1}
          max={20}
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
        />
      </label>
    </div>
  );
}
