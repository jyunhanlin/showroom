import { range } from 'lodash-es';
import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';

export function ShapeGallery() {
  return (
    <svg viewBox="0 0 700 180" className="mx-auto block w-full max-w-[700px] rounded-md bg-slate-900">
      <line x1="20" y1="30" x2="80" y2="110" stroke={STROKE_COLOR} strokeWidth="5" />
      <text x="50" y="160" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        line
      </text>

      <rect x="110" y="30" width="80" height="80" rx="10" fill="none" stroke={STROKE_COLOR} strokeWidth="5" />
      <text x="150" y="160" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        rect
      </text>

      <circle cx="250" cy="70" r="40" fill="none" stroke={STROKE_COLOR} strokeWidth="5" />
      <text x="250" y="160" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        circle
      </text>

      <ellipse cx="350" cy="70" rx="45" ry="30" fill="none" stroke={STROKE_COLOR} strokeWidth="5" />
      <text x="350" y="160" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        ellipse
      </text>

      <polyline points="410,30 430,90 450,40 470,100 490,30" fill="none" stroke={STROKE_COLOR} strokeWidth="5" />
      <text x="450" y="160" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        polyline
      </text>

      <polygon points="550,30 583,50 583,90 550,110 517,90 517,50" fill="none" stroke={STROKE_COLOR} strokeWidth="5" />
      <text x="550" y="160" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        polygon
      </text>

      <text x="650" y="70" fill={STROKE_COLOR} fontSize="32" textAnchor="middle" dominantBaseline="middle">
        Aa
      </text>
      <text x="650" y="160" fill={STROKE_COLOR} fontSize="14" textAnchor="middle">
        text
      </text>
    </svg>
  );
}

const RADIUS = 100;
const SVG_SIZE = 280;

export function RegularPolygon() {
  const [numOfSides, setNumOfSides] = useState(8);
  const cx = SVG_SIZE / 2;
  const cy = SVG_SIZE / 2;

  const points = range(numOfSides)
    .map((index) => {
      const rotationOffset = numOfSides % 2 === 0 ? Math.PI / numOfSides : 0;
      const angle = (index * 2 * Math.PI) / numOfSides - Math.PI / 2 + rotationOffset;
      const x = cx + RADIUS * Math.cos(angle);
      const y = cy + RADIUS * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="block w-[280px] rounded-md bg-slate-900">
        <polygon points={points} fill="none" stroke={STROKE_COLOR} strokeWidth="5" />
      </svg>
      <label className="flex items-center gap-3 font-mono text-sm">
        <span>numOfSides: {numOfSides}</span>
        <input
          type="range"
          min={3}
          max={12}
          value={numOfSides}
          onChange={(e) => setNumOfSides(Number(e.target.value))}
        />
      </label>
    </div>
  );
}
