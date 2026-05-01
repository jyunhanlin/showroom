import { animate } from 'motion';
import { useRef } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const STRAIGHT = 'M 20,50 C 80,50 140,50 180,50';
const SWOOP = 'M 20,50 C 80,0 140,100 180,50';

function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}

export function SwoopButton() {
  const pathRef = useRef<SVGPathElement>(null);

  const handleMouseEnter = () => {
    const path = pathRef.current;
    if (!path) return;
    const prefersReducedMotion = checkPrefersReducedMotion();
    animate(path, { d: SWOOP }, { duration: prefersReducedMotion ? 0 : 0.3 });
  };

  const handleMouseLeave = () => {
    const path = pathRef.current;
    if (!path) return;
    const prefersReducedMotion = checkPrefersReducedMotion();
    animate(path, { d: STRAIGHT }, { duration: prefersReducedMotion ? 0 : 0.3 });
  };

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="rounded-md bg-slate-900 p-4 cursor-pointer"
      >
        <svg viewBox="0 0 200 100" width={300} height={150} fill="none">
          <path ref={pathRef} d={STRAIGHT} stroke={STROKE_COLOR} strokeWidth="4" strokeLinecap="round" />
        </svg>
      </button>
      <p className="text-sm text-gray-700">hover (or focus) — Motion 在 JS 裡逐 frame 內插 d，Safari 也通。</p>
    </div>
  );
}
