import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';

function PlusShape({ nonScaling }: { nonScaling: boolean }) {
  const ve = nonScaling ? 'non-scaling-stroke' : 'none';
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
      <line x1="50" y1="10" x2="50" y2="90" stroke={STROKE_COLOR} strokeWidth="6" vectorEffect={ve} />
      <line x1="10" y1="50" x2="90" y2="50" stroke={STROKE_COLOR} strokeWidth="6" vectorEffect={ve} />
    </svg>
  );
}

export function NonScalingStrokeToggle() {
  const [width, setWidth] = useState(300);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-md bg-slate-900" style={{ width: `${width}px`, height: 200 }}>
            <PlusShape nonScaling={false} />
          </div>
          <span className="font-mono text-xs text-gray-600">vector-effect: none (default)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-md bg-slate-900" style={{ width: `${width}px`, height: 200 }}>
            <PlusShape nonScaling={true} />
          </div>
          <span className="font-mono text-xs text-gray-600">vector-effect: non-scaling-stroke</span>
        </div>
      </div>
      <label className="flex items-center gap-3 font-mono text-sm">
        <span className="w-32">width: {width}px</span>
        <input type="range" min={60} max={300} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
      </label>
    </div>
  );
}
