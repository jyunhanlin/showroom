import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

const FADE_DURATION = 1000;
const DISPERSE_DURATION = 500;
const CLEANUP_BUFFER = 200;
const MAGNITUDE = 48;

type Particle = { id: number; x: number; y: number; topPct: number; leftPct: number };

let particleId = 0;

export function LikeButtonABTest() {
  const [mode, setMode] = useState<'transform' | 'topLeft'>('transform');
  const [count, setCount] = useState(20);
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

    const newParticles = range(count).map(() => ({
      id: particleId++,
      x: random(-MAGNITUDE, MAGNITUDE),
      y: random(-MAGNITUDE, MAGNITUDE),
      topPct: random(0, 100),
      leftPct: random(0, 100),
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
        @keyframes wham-tb-fadeOut { to { opacity: 0 } }
        @keyframes wham-tb-fromCenterTransform { from { transform: translate(0px, 0px) } }
        @keyframes wham-tb-fromCenterTopLeft { from { top: 50%; left: 50% } }
        .wham-tb-particle {
          position: absolute;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation: wham-tb-fadeOut ${FADE_DURATION}ms forwards;
        }
        .wham-tb-particle.transform {
          inset: 0;
          margin: auto;
          animation:
            wham-tb-fadeOut ${FADE_DURATION}ms forwards,
            wham-tb-fromCenterTransform ${DISPERSE_DURATION}ms forwards;
        }
        .wham-tb-particle.topLeft {
          transform: translate(-50%, -50%);
          animation:
            wham-tb-fadeOut ${FADE_DURATION}ms forwards,
            wham-tb-fromCenterTopLeft ${DISPERSE_DURATION}ms forwards;
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
            className={`wham-tb-particle ${mode}`}
            style={
              mode === 'transform'
                ? { transform: `translate(${particle.x}px, ${particle.y}px)` }
                : { top: `${particle.topPct}%`, left: `${particle.leftPct}%` }
            }
          />
        ))}
        <span className="sr-only">Like this post</span>
      </button>
      <div className="flex flex-col gap-2 font-mono text-sm">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1">
            <input type="radio" checked={mode === 'transform'} onChange={() => setMode('transform')} />
            transform
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" checked={mode === 'topLeft'} onChange={() => setMode('topLeft')} />
            top + left
          </label>
        </div>
        <label className="flex items-center gap-3">
          <span className="w-32">particles: {count}</span>
          <input type="range" min={5} max={300} value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </label>
      </div>
      <p className="text-xs text-gray-500">把粒子數拉高,在低階機器或縮小的瀏覽器視窗上比較滑順度。</p>
    </div>
  );
}

export function UnderlineSubpixel() {
  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-tb-underline-height-in {
          from { height: 0 } to { height: 2px }
        }
        @keyframes wham-tb-underline-scale-in {
          from { transform: scaleY(0) } to { transform: scaleY(1) }
        }
        .wham-tb-underline-row { display: flex; gap: 2rem; }
        .wham-tb-underline-link {
          position: relative; padding-bottom: 4px;
          color: white; font-size: 1.125rem;
          text-decoration: none;
        }
        .wham-tb-underline-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0;
          background: oklch(0.7 0.2 240);
          height: 0;
          transform-origin: bottom;
        }
        .wham-tb-underline-link.height:hover::after {
          animation: wham-tb-underline-height-in 1500ms forwards;
        }
        .wham-tb-underline-link.scale::after {
          height: 2px;
          transform: scaleY(0);
        }
        .wham-tb-underline-link.scale:hover::after {
          animation: wham-tb-underline-scale-in 1500ms forwards;
        }
      `}</style>
      <div className="flex w-full max-w-md flex-col items-center gap-2 rounded-md bg-slate-900 p-6">
        <p className="font-mono text-xs text-gray-400">hover 比較(刻意拉長到 1500ms)</p>
        <div className="wham-tb-underline-row">
          <span className="wham-tb-underline-link height">height</span>
          <span className="wham-tb-underline-link scale">scaleY</span>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Chromium 上 `transform: scaleY` 會做 sub-pixel 漸層;`height` 只能整像素切換,看起來比較跳。
      </p>
    </div>
  );
}
