import { random, times } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const COLOR = 'oklch(0.75 0.18 280)';
const FIELD_SIZE = 240;
const DOT_COUNT = 200;

export function CartesianVsPolarField() {
  const [seed, setSeed] = useState(0);

  const cartesian = useMemo(() => {
    void seed;
    return times(DOT_COUNT, () => ({
      x: random(-FIELD_SIZE / 2, FIELD_SIZE / 2),
      y: random(-FIELD_SIZE / 2, FIELD_SIZE / 2),
    }));
  }, [seed]);
  const polar = useMemo(() => {
    void seed;
    return times(DOT_COUNT, () => {
      const angle = random(0, 360, true);
      const distance = random(32, FIELD_SIZE / 2, true);
      return convertPolarToCartesian(angle, distance);
    });
  }, [seed]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col gap-4 sm:flex-row">
        <FieldSvg title="random(-r, r) for x, y — square" dots={cartesian} />
        <FieldSvg title="random angle + distance(min, max) — donut" dots={polar} />
      </div>
      <button
        type="button"
        onClick={() => setSeed((s) => s + 1)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
      >
        re-roll
      </button>
    </div>
  );
}

function FieldSvg({ title, dots }: { title: string; dots: { x: number; y: number }[] }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="font-mono text-xs text-gray-700">{title}</p>
      <svg
        viewBox={`${-FIELD_SIZE / 2} ${-FIELD_SIZE / 2} ${FIELD_SIZE} ${FIELD_SIZE}`}
        width={FIELD_SIZE}
        height={FIELD_SIZE}
        className="rounded-md bg-slate-900"
      >
        <line x1={-FIELD_SIZE / 2} y1="0" x2={FIELD_SIZE / 2} y2="0" stroke="oklch(0.4 0 0)" strokeWidth="0.5" />
        <line x1="0" y1={-FIELD_SIZE / 2} x2="0" y2={FIELD_SIZE / 2} stroke="oklch(0.4 0 0)" strokeWidth="0.5" />
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r="2" fill={COLOR} />
        ))}
      </svg>
    </div>
  );
}

const FADE_DURATION = 1000;
const DISPERSE_DURATION = 500;
const CLEANUP_BUFFER = 200;
const PARTICLES_PER_CLICK = 6;
const MIN_DISTANCE = 32;
const MAX_DISTANCE = 64;

type Particle = { id: number; x: number; y: number };

let particleId = 0;

export function LikeButtonPolar() {
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      // oxlint-disable-next-line react-hooks/exhaustive-deps
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function handleClick() {
    const next = !liked;
    setLiked(next);
    if (!next) return;

    const newParticles = times(PARTICLES_PER_CLICK, () => {
      const angle = random(0, 360, true);
      const distance = random(MIN_DISTANCE, MAX_DISTANCE, true);
      const { x, y } = convertPolarToCartesian(angle, distance);
      return { id: particleId++, x, y };
    });
    const newIds = newParticles.map((p) => p.id);
    setParticles((prev) => [...prev, ...newParticles]);

    const timeoutId = window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newIds.includes(p.id)));
    }, FADE_DURATION + CLEANUP_BUFFER);
    timeoutsRef.current.push(timeoutId);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-polar-fadeOut { to { opacity: 0 } }
        @keyframes wham-polar-disperse { to { transform: translate(var(--x), var(--y)) } }
        .wham-polar-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation:
            wham-polar-fadeOut ${FADE_DURATION}ms forwards,
            wham-polar-disperse ${DISPERSE_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={liked}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600"
      >
        <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden="true">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
            fill={liked ? 'white' : 'none'}
          />
        </svg>
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="wham-polar-particle"
            style={
              {
                '--x': `${particle.x.toFixed(2)}px`,
                '--y': `${particle.y.toFixed(2)}px`,
              } as React.CSSProperties
            }
          />
        ))}
        <span className="sr-only">Like this post</span>
      </button>
      <p className="text-xs text-gray-500">
        每顆粒子 angle 隨機 0–360°、distance 隨機 {MIN_DISTANCE}–{MAX_DISTANCE}px → 甜甜圈分佈
      </p>
    </div>
  );
}
