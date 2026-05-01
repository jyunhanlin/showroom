import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const FADE_DURATION = 1000;
const DISPERSE_DURATION = 500;
const CLEANUP_BUFFER = 200;
const NUM_OF_PARTICLES = 5;
const MAGNITUDE_MIN = 32;
const MAGNITUDE_MAX = 64;

type Particle = { id: number; x: number; y: number };

let particleId = 0;

export function ReducedMotionLikeButton() {
  const [reduced, setReduced] = useState(false);
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

    const newParticles = range(NUM_OF_PARTICLES).map((index) => {
      const angle = (360 / NUM_OF_PARTICLES) * index + random(-40, 40, true);
      const distance = random(MAGNITUDE_MIN, MAGNITUDE_MAX, true);
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
    <div className="flex flex-col items-center gap-3" data-reduced={reduced ? 'true' : 'false'}>
      <style>{`
        @keyframes wham-a11y-fadeOut { to { opacity: 0 } }
        @keyframes wham-a11y-disperse { to { transform: translate(var(--x), var(--y)) } }
        .wham-a11y-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation: wham-a11y-fadeOut ${FADE_DURATION}ms forwards;
        }
        [data-reduced="false"] .wham-a11y-particle {
          animation:
            wham-a11y-fadeOut ${FADE_DURATION}ms forwards,
            wham-a11y-disperse ${DISPERSE_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
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
            className="wham-a11y-particle"
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
      <label className="flex items-center gap-2 font-mono text-sm">
        <input type="checkbox" checked={reduced} onChange={(e) => setReduced(e.target.checked)} />
        模擬 prefers-reduced-motion: reduce
      </label>
      <p className="text-xs text-gray-500">勾選後粒子只 fade,不再向外飛 — 仍有反饋,但沒有可能誘發暈眩的位移。</p>
    </div>
  );
}

export function CasinoLightIllusion() {
  const [running, setRunning] = useState(true);

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-a11y-blink {
          0%, 100% { opacity: 0.2 }
          50% { opacity: 1 }
        }
      `}</style>
      <div className="flex gap-2 rounded-md bg-slate-900 p-4">
        {range(8).map((i) => (
          <div
            key={i}
            className="h-6 w-6 rounded-full"
            style={{
              backgroundColor: 'oklch(0.85 0.18 60)',
              opacity: running ? undefined : 0.6,
              animation: running ? `wham-a11y-blink 1200ms ease-in-out ${i * 150}ms infinite` : 'none',
            }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRunning((v) => !v)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
      >
        {running ? 'pause' : 'play'}
      </button>
      <p className="text-xs text-gray-500">
        八顆球都站在原地,只是依序閃爍。但大腦會把它讀成「光在跑」 — 對動暈症使用者一樣有風險。
      </p>
    </div>
  );
}
