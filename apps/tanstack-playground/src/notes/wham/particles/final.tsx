import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const POP_CIRCLE_DURATION = 150;
const PARTICLE_DELAY = 150;
const FADE_DURATION_BASE = 1000;
const FADE_RANGE = 500;
const POP_DURATION_BASE = 500;
const POP_RANGE = 200;
const FADE_DELAY_RANGE = 300;
const NUM_OF_PARTICLES = 10;
const HUE_ROTATION = 720;
const CLEANUP_BUFFER = 400;

const HEART_SPRING =
  'linear(0, 0.05 2%, 0.4 6%, 1 10%, 1.18 13%, 1.21 15%, 1.18 17%, 1.0 22%, 0.94 25%, 0.97 30%, 1.02 38%, 1.0 50%, 1)';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  baseColor: string;
  fadeDuration: number;
  popDuration: number;
  fadeDelay: number;
  twinkleDuration: number;
  twinkleAmount: number;
};

let particleId = 0;

export function FinalLikeButton() {
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
      const batch: Particle[] = range(NUM_OF_PARTICLES).map((index) => {
        const angle = (360 / NUM_OF_PARTICLES) * index + random(-30, 30, true);
        const distance = random(40, 80, true);
        const { x, y } = convertPolarToCartesian(angle, distance);
        return {
          id: particleId++,
          x,
          y,
          size: random(8, 16, true),
          baseColor: `hsl(${random(0, 359)}deg 90% 75%)`,
          fadeDuration: random(FADE_DURATION_BASE - FADE_RANGE, FADE_DURATION_BASE + FADE_RANGE, true),
          popDuration: random(POP_DURATION_BASE - POP_RANGE, POP_DURATION_BASE + POP_RANGE, true),
          fadeDelay: random(0, FADE_DELAY_RANGE, true),
          twinkleDuration: random(120, 280, true),
          twinkleAmount: random(0.4, 0.8, true),
        };
      });
      const newIds = batch.map((p) => p.id);
      const maxLifetime = Math.max(...batch.map((p) => p.fadeDuration + p.fadeDelay));
      setParticles((prev) => [...prev, ...batch]);

      const cleanupId = window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newIds.includes(p.id)));
      }, maxLifetime + CLEANUP_BUFFER);
      timeoutsRef.current.push(cleanupId);
    }, PARTICLE_DELAY);
    timeoutsRef.current.push(spawnAt);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-final-fadeOut { to { opacity: 0 } }
        @keyframes wham-final-twinkle { from { opacity: var(--twinkle-amount) } to { opacity: 1 } }
        @keyframes wham-final-disperse { to { transform: translate(var(--x), var(--y)) } }
        @keyframes wham-final-hueRotate { to { filter: hue-rotate(var(--hue-rotation)) } }
        @keyframes wham-final-fromShrunken { from { transform: scale(0) } }
        @keyframes wham-final-circleColorShift { from { background: hsl(350 100% 60%) } }
        @keyframes wham-final-fadeFromOpaque { from { opacity: 1 } }

        .wham-final-button { position: relative }
        .wham-final-pop-circle {
          position: absolute;
          inset: 0;
          background: hsl(270 100% 80%);
          border-radius: 50%;
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .wham-final-button[data-liked="true"][data-phase] .wham-final-pop-circle {
            animation:
              wham-final-fromShrunken ${POP_CIRCLE_DURATION}ms,
              wham-final-circleColorShift ${POP_CIRCLE_DURATION}ms,
              wham-final-fadeFromOpaque 300ms ${POP_CIRCLE_DURATION}ms backwards;
          }
          .wham-final-button[data-liked="true"][data-phase] .wham-final-heart-shell {
            animation: wham-final-fromShrunken 1500ms ${POP_CIRCLE_DURATION}ms backwards ${HEART_SPRING};
          }
        }
        .wham-final-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 50%;
          pointer-events: none;
          width: var(--size);
          height: var(--size);
          animation: wham-final-fadeOut var(--fade-duration) forwards;
        }
        @media (prefers-reduced-motion: no-preference) {
          .wham-final-particle {
            animation:
              wham-final-hueRotate var(--fade-duration) linear forwards,
              wham-final-twinkle var(--twinkle-duration) infinite alternate ease-in-out,
              wham-final-fadeOut var(--fade-duration) var(--fade-delay) forwards,
              wham-final-disperse var(--pop-duration) cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
          }
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={liked}
        data-liked={liked ? 'true' : 'false'}
        data-phase={phase}
        className="wham-final-button flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600"
      >
        <span className="wham-final-pop-circle" />
        <span className="wham-final-heart-shell flex items-center justify-center">
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
            className="wham-final-particle"
            style={
              {
                backgroundColor: particle.baseColor,
                '--x': `${particle.x.toFixed(2)}px`,
                '--y': `${particle.y.toFixed(2)}px`,
                '--size': `${particle.size.toFixed(1)}px`,
                '--fade-duration': `${particle.fadeDuration.toFixed(0)}ms`,
                '--pop-duration': `${particle.popDuration.toFixed(0)}ms`,
                '--fade-delay': `${particle.fadeDelay.toFixed(0)}ms`,
                '--twinkle-duration': `${particle.twinkleDuration.toFixed(0)}ms`,
                '--twinkle-amount': particle.twinkleAmount.toFixed(2),
                '--hue-rotation': `${HUE_ROTATION}deg`,
              } as React.CSSProperties
            }
          />
        ))}
        <span className="sr-only">Like this post</span>
      </button>
      <p className="text-xs text-gray-500">
        全套合體 — 三段 pop-circle + spring 愛心 + 10 顆 jittered 粒子,各自隨機 size / fade / twinkle / hue-rotate。
      </p>
    </div>
  );
}
