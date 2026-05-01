import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const NUM_OF_PARTICLES = 8;
const CLEANUP_BUFFER = 200;

const FADE_DURATION_BASE = 1000;
const FADE_RANGE = 500;
const POP_DURATION_BASE = 500;
const POP_RANGE = 200;
const FADE_DELAY_RANGE = 300;

type VariantParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  fadeDuration: number;
  popDuration: number;
  fadeDelay: number;
  twinkleDuration: number;
  twinkleAmount: number;
};

let particleId = 0;

function spawnUniformBatch(): VariantParticle[] {
  return range(NUM_OF_PARTICLES).map((index) => {
    const angle = (360 / NUM_OF_PARTICLES) * index + random(-20, 20, true);
    const distance = random(40, 70, true);
    const { x, y } = convertPolarToCartesian(angle, distance);
    return {
      id: particleId++,
      x,
      y,
      size: 12,
      fadeDuration: FADE_DURATION_BASE,
      popDuration: POP_DURATION_BASE,
      fadeDelay: 0,
      twinkleDuration: 0,
      twinkleAmount: 1,
    };
  });
}

function spawnVariedBatch(): VariantParticle[] {
  return range(NUM_OF_PARTICLES).map((index) => {
    const angle = (360 / NUM_OF_PARTICLES) * index + random(-30, 30, true);
    const distance = random(40, 80, true);
    const { x, y } = convertPolarToCartesian(angle, distance);
    return {
      id: particleId++,
      x,
      y,
      size: random(8, 16, true),
      fadeDuration: random(FADE_DURATION_BASE - FADE_RANGE, FADE_DURATION_BASE + FADE_RANGE, true),
      popDuration: random(POP_DURATION_BASE - POP_RANGE, POP_DURATION_BASE + POP_RANGE, true),
      fadeDelay: random(0, FADE_DELAY_RANGE, true),
      twinkleDuration: random(120, 280, true),
      twinkleAmount: random(0.4, 0.8, true),
    };
  });
}

export function UniformVsVariedTweaks() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-around">
      <Variant title="Uniform — every particle identical" spawnFn={spawnUniformBatch} variant="uniform" />
      <Variant title="Varied — each particle different" spawnFn={spawnVariedBatch} variant="varied" />
    </div>
  );
}

function Variant({
  title,
  spawnFn,
  variant,
}: {
  title: string;
  spawnFn: () => VariantParticle[];
  variant: 'uniform' | 'varied';
}) {
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<VariantParticle[]>([]);
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

    const batch = spawnFn();
    const newIds = batch.map((p) => p.id);
    const maxLifetime = Math.max(...batch.map((p) => p.fadeDuration + p.fadeDelay));
    setParticles((prev) => [...prev, ...batch]);

    const timeoutId = window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newIds.includes(p.id)));
    }, maxLifetime + CLEANUP_BUFFER);
    timeoutsRef.current.push(timeoutId);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono text-xs text-gray-700">{title}</p>
      <style>{`
        @keyframes wham-tweak-fadeOut { to { opacity: 0 } }
        @keyframes wham-tweak-disperse { to { transform: translate(var(--x), var(--y)) } }
        @keyframes wham-tweak-twinkle {
          from { opacity: var(--twinkle-amount) } to { opacity: 1 }
        }
        .wham-tweak-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          width: var(--size);
          height: var(--size);
        }
        .wham-tweak-particle.uniform {
          animation:
            wham-tweak-fadeOut var(--fade-duration) forwards,
            wham-tweak-disperse var(--pop-duration) cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
        .wham-tweak-particle.varied {
          animation:
            wham-tweak-twinkle var(--twinkle-duration) infinite alternate ease-in-out,
            wham-tweak-fadeOut var(--fade-duration) var(--fade-delay) forwards,
            wham-tweak-disperse var(--pop-duration) cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
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
            className={`wham-tweak-particle ${variant}`}
            style={
              {
                '--x': `${particle.x.toFixed(2)}px`,
                '--y': `${particle.y.toFixed(2)}px`,
                '--size': `${particle.size.toFixed(1)}px`,
                '--fade-duration': `${particle.fadeDuration.toFixed(0)}ms`,
                '--pop-duration': `${particle.popDuration.toFixed(0)}ms`,
                '--fade-delay': `${particle.fadeDelay.toFixed(0)}ms`,
                '--twinkle-duration': `${particle.twinkleDuration.toFixed(0)}ms`,
                '--twinkle-amount': particle.twinkleAmount.toFixed(2),
              } as React.CSSProperties
            }
          />
        ))}
        <span className="sr-only">Like this post</span>
      </button>
    </div>
  );
}
