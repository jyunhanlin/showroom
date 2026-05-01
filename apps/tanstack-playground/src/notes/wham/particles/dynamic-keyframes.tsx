import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

const COLOR = 'oklch(0.75 0.18 280)';
const PENDULUM_AMOUNTS = [8, 16, 32, 64];

export function PendulumOscillation() {
  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-dk-oscillate {
          from { transform: translateX(calc(var(--amount) * -1)) }
          to   { transform: translateX(var(--amount)) }
        }
      `}</style>
      <div className="flex flex-col gap-3 rounded-md bg-slate-900 p-6">
        {PENDULUM_AMOUNTS.map((amount) => (
          <div key={amount} className="flex items-center gap-3">
            <span className="w-20 font-mono text-xs text-gray-400">--amount: {amount}px</span>
            <div className="relative" style={{ width: 200 }}>
              <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-slate-700" />
              <div
                className="relative h-6 w-6 rounded-full"
                style={
                  {
                    backgroundColor: COLOR,
                    margin: '0 auto',
                    '--amount': `${amount}px`,
                    animation: 'wham-dk-oscillate 1000ms ease-in-out infinite alternate',
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">同一條 keyframe,每顆球用不同 `--amount` 變數 → 不同幅度。</p>
    </div>
  );
}

const FADE_DURATION = 1000;
const DISPERSE_DURATION = 500;
const CLEANUP_BUFFER = 200;
const PARTICLES_PER_CLICK = 5;
const MAGNITUDE = 48;

type Particle = { id: number; x: number; y: number };

let particleId = 0;

export function LikeButtonDynamicVars() {
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

    const newParticles = range(PARTICLES_PER_CLICK).map(() => ({
      id: particleId++,
      x: random(-MAGNITUDE, MAGNITUDE),
      y: random(-MAGNITUDE, MAGNITUDE),
    }));
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
        @keyframes wham-dk-fadeOut { to { opacity: 0 } }
        @keyframes wham-dk-disperse { to { transform: translate(var(--x), var(--y)) } }
        .wham-dk-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation:
            wham-dk-fadeOut ${FADE_DURATION}ms forwards,
            wham-dk-disperse ${DISPERSE_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
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
            className="wham-dk-particle"
            style={
              {
                '--x': `${particle.x}px`,
                '--y': `${particle.y}px`,
              } as React.CSSProperties
            }
          />
        ))}
        <span className="sr-only">Like this post</span>
      </button>
      <p className="text-xs text-gray-500">
        終點寫進 keyframe 的 `to`,但用 `var(--x) / var(--y)` 讀 inline style — 完全對稱於 `fadeOut`。
      </p>
    </div>
  );
}
