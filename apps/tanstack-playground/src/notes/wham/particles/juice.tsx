import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const FADE_DURATION = 700;
const DISPERSE_DURATION = 400;
const CLEANUP_BUFFER = 200;
const NUM_OF_PARTICLES = 6;

type Particle = { id: number; x: number; y: number };

let particleId = 0;

export function PlainVsJuicedButton() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-around">
      <PlainButton />
      <JuicedButton />
    </div>
  );
}

function PlainButton() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono text-xs text-gray-700">MVP — 點擊只改文字</p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-white hover:bg-emerald-600"
      >
        加入購物車
      </button>
      <p className="font-mono text-xs text-gray-500">已加入: {count}</p>
    </div>
  );
}

function JuicedButton() {
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      // oxlint-disable-next-line react-hooks/exhaustive-deps
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function handleClick() {
    setCount((c) => c + 1);
    setPressed(true);
    window.setTimeout(() => setPressed(false), 250);

    const newParticles = range(NUM_OF_PARTICLES).map((index) => {
      const angle = (360 / NUM_OF_PARTICLES) * index + random(-20, 20, true);
      const distance = random(40, 70, true);
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
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono text-xs text-gray-700">Juiced — squash + 火花 + 計數彈跳</p>
      <style>{`
        @keyframes wham-juice-fadeOut { to { opacity: 0 } }
        @keyframes wham-juice-disperse { to { transform: translate(var(--x), var(--y)) } }
        @keyframes wham-juice-bump {
          0% { transform: scale(1) }
          40% { transform: scale(1.4) }
          100% { transform: scale(1) }
        }
        .wham-juice-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 10px; height: 10px;
          border-radius: 50%;
          pointer-events: none;
          animation:
            wham-juice-fadeOut ${FADE_DURATION}ms forwards,
            wham-juice-disperse ${DISPERSE_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        className="relative rounded-md bg-emerald-500 px-4 py-2 font-medium text-white transition-transform hover:bg-emerald-600"
        style={{ transform: pressed ? 'scale(0.92)' : 'scale(1)' }}
      >
        加入購物車
        {particles.map((particle, i) => (
          <span
            key={particle.id}
            className="wham-juice-particle"
            style={
              {
                backgroundColor: ['oklch(0.85 0.18 130)', 'oklch(0.85 0.15 90)', 'oklch(0.8 0.18 60)'][i % 3],
                '--x': `${particle.x.toFixed(2)}px`,
                '--y': `${particle.y.toFixed(2)}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </button>
      <p
        key={count}
        className="font-mono text-xs text-emerald-700"
        style={{ animation: count > 0 ? 'wham-juice-bump 350ms ease-out' : undefined }}
      >
        已加入: {count}
      </p>
    </div>
  );
}
