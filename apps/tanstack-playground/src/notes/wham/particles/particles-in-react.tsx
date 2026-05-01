import { random, range } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const FADE_DURATION = 1000;
const POP_DURATION = 500;
const POP_CIRCLE_DURATION = 150;
const PARTICLE_DELAY = 150;
const CLEANUP_BUFFER = 400;
const NUM_OF_PARTICLES = 8;

type Particle = { id: number; x: number; y: number; baseColor: string; size: number };

let particleId = 0;

function useParticleSpawner({
  active,
  numOfParticles,
  paletteHueRange,
}: {
  active: boolean;
  numOfParticles: number;
  paletteHueRange: [number, number];
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      // oxlint-disable-next-line react-hooks/exhaustive-deps
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const spawn = useCallback(() => {
    if (!active) return;
    const spawnAt = window.setTimeout(() => {
      const batch: Particle[] = range(numOfParticles).map((index) => {
        const angle = (360 / numOfParticles) * index + random(-30, 30, true);
        const distance = random(40, 80, true);
        const { x, y } = convertPolarToCartesian(angle, distance);
        const hue = random(paletteHueRange[0], paletteHueRange[1], true);
        return {
          id: particleId++,
          x,
          y,
          size: random(8, 14, true),
          baseColor: `hsl(${hue}deg 90% 75%)`,
        };
      });
      const newIds = batch.map((p) => p.id);
      setParticles((prev) => [...prev, ...batch]);

      const cleanupId = window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newIds.includes(p.id)));
      }, FADE_DURATION + CLEANUP_BUFFER);
      timeoutsRef.current.push(cleanupId);
    }, PARTICLE_DELAY);
    timeoutsRef.current.push(spawnAt);
  }, [active, numOfParticles, paletteHueRange]);

  return { particles, spawn };
}

type ReactionButtonProps = {
  glyph: string;
  bgColor: string;
  paletteHueRange: [number, number];
  numOfParticles?: number;
  ariaLabel: string;
};

function ReactionButton({
  glyph,
  bgColor,
  paletteHueRange,
  numOfParticles = NUM_OF_PARTICLES,
  ariaLabel,
}: ReactionButtonProps) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0);
  const { particles, spawn } = useParticleSpawner({
    active: !active,
    numOfParticles,
    paletteHueRange,
  });

  function handleClick() {
    setActive((prev) => !prev);
    setPhase((p) => p + 1);
    if (!active) spawn();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      data-active={active ? 'true' : 'false'}
      data-phase={phase}
      className="wham-react-btn relative flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white transition-colors"
      style={{ backgroundColor: bgColor }}
    >
      <span className="wham-react-glyph">{glyph}</span>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="wham-react-particle"
          style={
            {
              backgroundColor: particle.baseColor,
              '--x': `${particle.x.toFixed(2)}px`,
              '--y': `${particle.y.toFixed(2)}px`,
              '--size': `${particle.size.toFixed(1)}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </button>
  );
}

export function ReactionButtonRow() {
  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-react-fadeOut { to { opacity: 0 } }
        @keyframes wham-react-disperse { to { transform: translate(var(--x), var(--y)) } }
        @keyframes wham-react-fromShrunken { from { transform: scale(0) } }
        .wham-react-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          pointer-events: none;
          animation:
            wham-react-fadeOut ${FADE_DURATION}ms forwards,
            wham-react-disperse ${POP_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
        @media (prefers-reduced-motion: no-preference) {
          .wham-react-btn[data-active="true"][data-phase] .wham-react-glyph {
            animation: wham-react-fromShrunken 800ms ${POP_CIRCLE_DURATION}ms backwards
              cubic-bezier(0.1, 1.5, 0.5, 1);
          }
        }
      `}</style>
      <div className="flex gap-4">
        <ReactionButton glyph="❤" bgColor="oklch(0.65 0.22 25)" paletteHueRange={[340, 30]} ariaLabel="Like" />
        <ReactionButton glyph="★" bgColor="oklch(0.7 0.15 90)" paletteHueRange={[40, 80]} ariaLabel="Star" />
        <ReactionButton glyph="✓" bgColor="oklch(0.7 0.15 150)" paletteHueRange={[100, 160]} ariaLabel="Confirm" />
      </div>
      <p className="text-xs text-gray-500">
        同一個 hook、同一個 component,只換 prop(色票、glyph、調色範圍)就變三種反應。
      </p>
    </div>
  );
}
