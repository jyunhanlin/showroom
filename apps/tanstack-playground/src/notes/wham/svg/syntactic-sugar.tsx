import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const ELBOW_COLOR = 'oklch(0.7 0.2 30)';

export function SmoothChained() {
  const [smooth, setSmooth] = useState(true);
  const d = smooth ? 'M 4,4 Q 4,10 8,8 T 12,12' : 'M 4,4 Q 4,10 8,8 Q 14,0 12,12';

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 16 16" width={300} height={300} className="block rounded-md bg-slate-900">
        <path d={d} fill="none" stroke={STROKE_COLOR} strokeWidth="0.4" strokeLinecap="round" />
        <circle cx="8" cy="8" r="0.4" fill={smooth ? STROKE_COLOR : ELBOW_COLOR} />
        <circle cx="4" cy="4" r="0.3" fill={STROKE_COLOR} />
        <circle cx="12" cy="12" r="0.3" fill={STROKE_COLOR} />
      </svg>
      <pre className="rounded bg-slate-100 p-2 font-mono text-xs">{d}</pre>
      <label className="flex items-center gap-2 font-mono text-sm">
        <input type="checkbox" checked={smooth} onChange={(e) => setSmooth(e.target.checked)} />
        <span>use T (smooth) instead of Q — uncheck to see the elbow</span>
      </label>
    </div>
  );
}
