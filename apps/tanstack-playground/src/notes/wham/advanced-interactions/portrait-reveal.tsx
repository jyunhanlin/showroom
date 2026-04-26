import { useEffect, useRef, useState } from 'react';
import { clampedNormalize } from '~/utils/canvas';
import { useRelativeMousePosition } from '~/utils/use-relative-mouse-position';

const BLUR_MIN_DISTANCE = 50;
const BLUR_MAX_DISTANCE = 200;
const MAX_BLUR = 20;

const TRANSLATE_MIN_DISTANCE = 20;
const TRANSLATE_MAX_DISTANCE = 150;
const MAX_TRANSLATE_Y = 16;

export function PortraitReveal() {
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const [mousePosition] = useRelativeMousePosition(wrapperRef);

  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    const handle = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener('change', handle);
    return () => query.removeEventListener('change', handle);
  }, []);

  const distance =
    mousePosition.x !== null && mousePosition.y !== null
      ? Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2)
      : Infinity;

  let blurRadius = clampedNormalize(distance, BLUR_MIN_DISTANCE, BLUR_MAX_DISTANCE, 0, MAX_BLUR);
  let translateY = clampedNormalize(distance, TRANSLATE_MIN_DISTANCE, TRANSLATE_MAX_DISTANCE, 0, MAX_TRANSLATE_Y);

  // Snap to fully revealed for reduced-motion users + keyboard focus.
  if (prefersReducedMotion || isFocused) {
    blurRadius = 0;
    translateY = 0;
  }

  const hasMouse = mousePosition.x !== null;
  const isRevealed = blurRadius < 1;
  const hintOpacity = clampedNormalize(blurRadius, 2, 12, 0, 1);

  return (
    <div className="relative flex h-72 items-center justify-center bg-gradient-to-b from-sky-50 to-indigo-50">
      <p
        className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-slate-500 transition-opacity duration-200"
        style={{ opacity: hasMouse ? hintOpacity : 1 }}
      >
        {hasMouse
          ? `blur: ${blurRadius.toFixed(1)}px · translateY: ${translateY.toFixed(1)}px`
          : 'Move cursor near to reveal'}
      </p>

      <button
        type="button"
        ref={wrapperRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Geometric portrait that resolves on hover or focus"
        className="flex h-44 w-44 items-center justify-center rounded-3xl bg-white/60 shadow-sm ring-1 ring-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <div
          className="will-change-[filter,transform]"
          style={{
            filter: `blur(${blurRadius}px)`,
            transform: `translateY(${translateY}px)`,
            transition: prefersReducedMotion ? 'filter 200ms, transform 200ms' : undefined,
          }}
          aria-hidden={!isRevealed}
        >
          <svg width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="Friendly face">
            {/* head */}
            <circle cx="64" cy="64" r="48" fill="#fde68a" stroke="#f59e0b" strokeWidth="3" />
            {/* cheeks */}
            <circle cx="40" cy="78" r="6" fill="#fca5a5" opacity="0.7" />
            <circle cx="88" cy="78" r="6" fill="#fca5a5" opacity="0.7" />
            {/* eyes */}
            <circle cx="48" cy="58" r="5" fill="#1f2937" />
            <circle cx="80" cy="58" r="5" fill="#1f2937" />
            {/* nose */}
            <polygon points="64,64 60,76 68,76" fill="#f59e0b" />
            {/* smile (arc) */}
            <path d="M 46 86 Q 64 100 82 86" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </button>
    </div>
  );
}
