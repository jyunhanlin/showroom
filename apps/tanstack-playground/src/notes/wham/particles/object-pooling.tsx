import { random, sample } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const COLORS = ['oklch(0.85 0.15 60)', 'oklch(0.8 0.18 40)', 'oklch(0.75 0.18 30)', 'oklch(0.85 0.15 90)'];
const FADE_DURATION = 500;
const FADE_DELAY = 500;
const SPAWN_INTERVAL = 50;

function attachStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('wham-pool-styles')) return;
  const style = document.createElement('style');
  style.id = 'wham-pool-styles';
  style.textContent = `
    @keyframes wham-pool-fadeOut { to { opacity: 0 } }
    @keyframes wham-pool-rise {
      to { transform: translate(var(--x), var(--y)) }
    }
    .wham-pool-particle {
      position: absolute;
      bottom: 12px; left: 50%;
      width: 8px; height: 8px;
      border-radius: 50%;
      pointer-events: none;
      animation:
        wham-pool-fadeOut ${FADE_DURATION}ms ${FADE_DELAY}ms forwards,
        wham-pool-rise ${FADE_DURATION + FADE_DELAY}ms ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}

export function PoolingComparison() {
  const [running, setRunning] = useState(true);
  const plainRef = useRef<HTMLDivElement>(null);
  const pooledRef = useRef<HTMLDivElement>(null);
  const [plainCreated, setPlainCreated] = useState(0);
  const [pooledCreated, setPooledCreated] = useState(0);
  const [poolSize, setPoolSize] = useState(0);

  useEffect(() => {
    attachStyles();
  }, []);

  useEffect(() => {
    if (!running) return;
    const plainHost = plainRef.current;
    const pooledHost = pooledRef.current;
    if (!plainHost || !pooledHost) return;

    const objectPool: HTMLSpanElement[] = [];
    let plainTotal = 0;
    let pooledTotal = 0;

    function spawnPlain() {
      const particle = document.createElement('span');
      decorate(particle);
      plainHost!.appendChild(particle);
      plainTotal++;
      setPlainCreated(plainTotal);
      window.setTimeout(() => particle.remove(), FADE_DURATION + FADE_DELAY + 200);
    }

    function spawnPooled() {
      let particle: HTMLSpanElement;
      if (objectPool.length > 0) {
        particle = objectPool.pop()!;
      } else {
        particle = document.createElement('span');
        pooledTotal++;
        setPooledCreated(pooledTotal);
      }
      decorate(particle);
      pooledHost!.appendChild(particle);
      window.setTimeout(
        () => {
          particle.remove();
          objectPool.push(particle);
          setPoolSize(objectPool.length);
        },
        FADE_DURATION + FADE_DELAY + 200,
      );
    }

    function decorate(particle: HTMLSpanElement) {
      particle.className = 'wham-pool-particle';
      particle.style.backgroundColor = sample(COLORS)!;
      const angle = random(90 - 30, 90 + 30, true);
      const distance = random(45, 80, true);
      const { x, y } = convertPolarToCartesian(angle, distance);
      // CSS y-axis is flipped, so negate for visual "up"
      particle.style.setProperty('--x', `${x.toFixed(2)}px`);
      particle.style.setProperty('--y', `${-y.toFixed(2)}px`);
    }

    const id = window.setInterval(() => {
      spawnPlain();
      spawnPooled();
    }, SPAWN_INTERVAL);

    return () => {
      window.clearInterval(id);
    };
  }, [running]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Column title="Plain (new node each spawn)" hostRef={plainRef} stat={`total created: ${plainCreated}`} />
        <Column
          title="Pooled (reuse from objectPool)"
          hostRef={pooledRef}
          stat={`created: ${pooledCreated} · pool: ${poolSize}`}
        />
      </div>
      <button
        type="button"
        onClick={() => setRunning((v) => !v)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
      >
        {running ? 'pause' : 'resume'}
      </button>
      <p className="text-xs text-gray-500">
        左邊每次 spawn 都建新節點(GC 之後再回收);右邊重用 — pool 大小很快收斂到 ~20。
      </p>
    </div>
  );
}

function Column({
  title,
  hostRef,
  stat,
}: {
  title: string;
  hostRef: React.RefObject<HTMLDivElement | null>;
  stat: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="font-mono text-xs text-gray-700">{title}</p>
      <div ref={hostRef} className="relative h-48 w-48 overflow-hidden rounded-md bg-slate-900" />
      <p className="font-mono text-xs text-gray-500">{stat}</p>
    </div>
  );
}
