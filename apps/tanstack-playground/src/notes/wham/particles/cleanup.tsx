import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

const FADE_DURATION = 1000;
const CLEANUP_BUFFER = 200;
const PARTICLES_PER_CLICK = 5;

type Particle = { id: number; top: number; left: number };

let particleId = 0;

export function LikeButtonWithCleanup() {
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
      top: random(0, 100),
      left: random(0, 100),
    }));
    const newIds = newParticles.map((particle) => particle.id);
    setParticles((prev) => [...prev, ...newParticles]);

    const timeoutId = window.setTimeout(() => {
      setParticles((prev) => prev.filter((particle) => !newIds.includes(particle.id)));
    }, FADE_DURATION + CLEANUP_BUFFER);
    timeoutsRef.current.push(timeoutId);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-particles-cleanup-fadeOut { from { opacity: 1 } to { opacity: 0 } }
        .wham-particles-cleanup-particle {
          position: absolute;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          animation: wham-particles-cleanup-fadeOut ${FADE_DURATION}ms forwards;
          pointer-events: none;
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
            className="wham-particles-cleanup-particle"
            style={{ top: `${particle.top}%`, left: `${particle.left}%` }}
          />
        ))}
        <span className="sr-only">Like this post</span>
      </button>
      <p className="font-mono text-xs text-gray-500">
        live particles in state: <span className="font-bold text-rose-600">{particles.length}</span>
      </p>
    </div>
  );
}
