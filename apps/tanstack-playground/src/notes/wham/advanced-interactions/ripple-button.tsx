import { useId, useState } from 'react';

const RIPPLE_SIZE = 100;
const RIPPLE_BEZIER = 'cubic-bezier(0.42, 0, 0.58, 1)';
const GROW_DURATION = 600;
const FADE_DURATION = 800;

type Ripple = {
  id: number;
  x: number;
  y: number;
};

let nextRippleId = 0;

export function RippleButton() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const scopeId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const growName = `ripple-grow-${scopeId}`;
  const fadeName = `ripple-fade-${scopeId}`;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const button = event.currentTarget;
    const bb = button.getBoundingClientRect();
    const relativeX = event.clientX - bb.left;
    const relativeY = event.clientY - bb.top;

    const id = nextRippleId++;
    setRipples((prev) => [...prev, { id, x: relativeX, y: relativeY }]);
  }

  function handleAnimationEnd(event: React.AnimationEvent<HTMLSpanElement>, id: number) {
    // Two keyframes (grow + fade) fire animationend twice on the same element.
    // Only remove on fade-end so we don't kill the ripple mid-grow.
    if (event.animationName !== fadeName) return;
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-slate-50 p-8">
      <style>{`
        @keyframes ${growName} {
          from { transform: translate(-50%, -50%) scale(0); }
          to   { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes ${fadeName} {
          from { opacity: 0.45; }
          to   { opacity: 0; }
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        className="relative h-[60px] w-[200px] cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 font-semibold text-white shadow-md ring-1 ring-indigo-700/40 transition-transform select-none hover:brightness-110 active:scale-[0.98]"
      >
        <span className="pointer-events-none relative">Click me</span>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            onAnimationEnd={(event) => handleAnimationEnd(event, ripple.id)}
            className="pointer-events-none absolute block rounded-full bg-white"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: RIPPLE_SIZE,
              height: RIPPLE_SIZE,
              transform: 'translate(-50%, -50%) scale(0)',
              animation: `${growName} ${GROW_DURATION}ms ${RIPPLE_BEZIER} forwards, ${fadeName} ${FADE_DURATION}ms ${RIPPLE_BEZIER} forwards`,
            }}
          />
        ))}
      </button>
      <p className="text-xs text-slate-500">Click anywhere on the button to ripple — multiple at once is fine.</p>
    </div>
  );
}
