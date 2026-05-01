import { random, range, times } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const COLOR = 'oklch(0.75 0.18 280)';
const FIELD_SIZE = 240;
const NUM_OF_PARTICLES = 5;

export function ClumpingComparison() {
  const [seed, setSeed] = useState(0);

  const trueRandom = useMemo(() => {
    void seed;
    return times(NUM_OF_PARTICLES, () => {
      const angle = random(0, 360, true);
      const distance = random(40, 80, true);
      return convertPolarToCartesian(angle, distance);
    });
  }, [seed]);

  const evenWedges = useMemo(() => {
    return range(NUM_OF_PARTICLES).map((index) => {
      const angle = (360 / NUM_OF_PARTICLES) * index;
      const distance = 60;
      return convertPolarToCartesian(angle, distance);
    });
  }, []);

  const jittered = useMemo(() => {
    void seed;
    const JITTER = 40;
    return range(NUM_OF_PARTICLES).map((index) => {
      const angle = (360 / NUM_OF_PARTICLES) * index + random(-JITTER, JITTER, true);
      const distance = random(40, 80, true);
      return convertPolarToCartesian(angle, distance);
    });
  }, [seed]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <FieldSvg title="random(0, 360)" subtitle="可能整片擠在一邊" dots={trueRandom} />
        <FieldSvg title="360/N * i" subtitle="完美對稱 → 雪花" dots={evenWedges} />
        <FieldSvg title="360/N * i + JITTER" subtitle="看起來隨機但有保底" dots={jittered} />
      </div>
      <button
        type="button"
        onClick={() => setSeed((s) => s + 1)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
      >
        re-roll
      </button>
      <p className="text-xs text-gray-500">re-roll 多次,看左邊偶爾會擠成一團、右邊永遠分散。</p>
    </div>
  );
}

function FieldSvg({ title, subtitle, dots }: { title: string; subtitle: string; dots: { x: number; y: number }[] }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="font-mono text-xs text-gray-700">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
      <svg
        viewBox={`${-FIELD_SIZE / 2} ${-FIELD_SIZE / 2} ${FIELD_SIZE} ${FIELD_SIZE}`}
        width={FIELD_SIZE}
        height={FIELD_SIZE}
        className="rounded-md bg-slate-900"
      >
        <line x1={-FIELD_SIZE / 2} y1="0" x2={FIELD_SIZE / 2} y2="0" stroke="oklch(0.4 0 0)" strokeWidth="0.5" />
        <line x1="0" y1={-FIELD_SIZE / 2} x2="0" y2={FIELD_SIZE / 2} stroke="oklch(0.4 0 0)" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="3" fill="white" />
        {dots.map((dot, i) => (
          <g key={i}>
            <line x1="0" y1="0" x2={dot.x} y2={dot.y} stroke="oklch(0.5 0.1 280 / 0.3)" strokeWidth="1" />
            <circle cx={dot.x} cy={dot.y} r="6" fill={COLOR} />
          </g>
        ))}
      </svg>
    </div>
  );
}

const FADE_DURATION = 1000;
const DISPERSE_DURATION = 500;
const CLEANUP_BUFFER = 200;

type Particle = { id: number; x: number; y: number };

let particleId = 0;

export function LikeButtonJittered() {
  const [chaos, setChaos] = useState(40);
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
      const angle = (360 / NUM_OF_PARTICLES) * index + random(-chaos, chaos, true);
      const distance = random(32, 64, true);
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
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-dist-fadeOut { to { opacity: 0 } }
        @keyframes wham-dist-disperse { to { transform: translate(var(--x), var(--y)) } }
        .wham-dist-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation:
            wham-dist-fadeOut ${FADE_DURATION}ms forwards,
            wham-dist-disperse ${DISPERSE_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
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
            className="wham-dist-particle"
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
      <label className="flex items-center gap-3 font-mono text-sm">
        <span className="w-32">chaos: ±{chaos}°</span>
        <input type="range" min={0} max={90} value={chaos} onChange={(e) => setChaos(Number(e.target.value))} />
      </label>
      <p className="text-xs text-gray-500">chaos = 0 → 雪花;chaos = 90 → 完全亂數(會 clump)。40 是 sweet spot。</p>
    </div>
  );
}
