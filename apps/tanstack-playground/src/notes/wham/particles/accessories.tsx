import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const POP_CIRCLE_DURATION = 150;
const PARTICLE_DELAY = 150;
const FADE_DURATION = 1000;
const POP_DURATION = 500;
const CLEANUP_BUFFER = 400;
const NUM_OF_PARTICLES = 8;

// Spring-like easing approximated as a multi-stop linear() function
const HEART_SPRING =
  'linear(0, 0.05 2%, 0.4 6%, 1 10%, 1.18 13%, 1.21 15%, 1.18 17%, 1.0 22%, 0.94 25%, 0.97 30%, 1.02 38%, 1.0 50%, 1)';

type Particle = { id: number; x: number; y: number; size: number };

let particleId = 0;

export function FullJuicedLikeButton() {
  const [liked, setLiked] = useState(false);
  const [phase, setPhase] = useState(0);
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
    setPhase((p) => p + 1);
    if (!next) return;

    const spawnAt = window.setTimeout(() => {
      const newParticles = range(NUM_OF_PARTICLES).map((index) => {
        const angle = (360 / NUM_OF_PARTICLES) * index + random(-25, 25, true);
        const distance = random(40, 70, true);
        const { x, y } = convertPolarToCartesian(angle, distance);
        return { id: particleId++, x, y, size: random(8, 14, true) };
      });
      const newIds = newParticles.map((p) => p.id);
      setParticles((prev) => [...prev, ...newParticles]);

      const cleanupId = window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newIds.includes(p.id)));
      }, FADE_DURATION + CLEANUP_BUFFER);
      timeoutsRef.current.push(cleanupId);
    }, PARTICLE_DELAY);
    timeoutsRef.current.push(spawnAt);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-acc-fromShrunken { from { transform: scale(0) } }
        @keyframes wham-acc-circleColorShift { from { background: hsl(350 100% 60%) } }
        @keyframes wham-acc-fadeFromOpaque { from { opacity: 1 } }
        @keyframes wham-acc-fadeOut { to { opacity: 0 } }
        @keyframes wham-acc-disperse { to { transform: translate(var(--x), var(--y)) } }

        .wham-acc-button { position: relative }
        .wham-acc-pop-circle {
          position: absolute;
          inset: 0;
          background: hsl(270 100% 80%);
          border-radius: 50%;
          opacity: 0;
        }
        .wham-acc-button[data-liked="true"][data-phase] .wham-acc-pop-circle {
          animation:
            wham-acc-fromShrunken ${POP_CIRCLE_DURATION}ms,
            wham-acc-circleColorShift ${POP_CIRCLE_DURATION}ms,
            wham-acc-fadeFromOpaque 300ms ${POP_CIRCLE_DURATION}ms backwards;
        }
        .wham-acc-button[data-liked="true"][data-phase] .wham-acc-heart-shell {
          animation: wham-acc-fromShrunken 1500ms ${POP_CIRCLE_DURATION}ms backwards ${HEART_SPRING};
        }
        .wham-acc-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          width: var(--size);
          height: var(--size);
          animation:
            wham-acc-fadeOut ${FADE_DURATION}ms forwards,
            wham-acc-disperse ${POP_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={liked}
        data-liked={liked ? 'true' : 'false'}
        data-phase={phase}
        className="wham-acc-button flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600"
      >
        <span className="wham-acc-pop-circle" />
        <span className="wham-acc-heart-shell flex items-center justify-center">
          <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden="true">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
              fill={liked ? 'white' : 'none'}
            />
          </svg>
        </span>
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="wham-acc-particle"
            style={
              {
                '--x': `${particle.x.toFixed(2)}px`,
                '--y': `${particle.y.toFixed(2)}px`,
                '--size': `${particle.size.toFixed(1)}px`,
              } as React.CSSProperties
            }
          />
        ))}
        <span className="sr-only">Like this post</span>
      </button>
      <p className="text-xs text-gray-500">
        三層動畫疊起來:`pop-circle` 先彈出 → `heart` 用 spring 回彈 → 粒子延遲 {PARTICLE_DELAY}ms 才 spawn。
      </p>
    </div>
  );
}
