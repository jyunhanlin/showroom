import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian, normalize } from '~/utils/canvas';

const COLOR = 'oklch(0.75 0.18 280)';

export function ScaleTranspose() {
  const [value, setValue] = useState(2);
  const [inMin, setInMin] = useState(0);
  const [inMax, setInMax] = useState(5);
  const [outMin, setOutMin] = useState(0);
  const [outMax, setOutMax] = useState(360);

  const result = normalize(value, inMin, inMax, outMin, outMax);
  const W = 360;
  const yIn = 50;
  const yOut = 130;

  function valueToX(v: number, min: number, max: number) {
    if (max === min) return 20;
    return 20 + ((v - min) / (max - min)) * (W - 40);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox={`0 0 ${W} 180`} width={W} height={180} className="rounded-md bg-slate-900">
        <line x1="20" y1={yIn} x2={W - 20} y2={yIn} stroke="oklch(0.5 0 0)" strokeWidth="1" />
        <line x1="20" y1={yOut} x2={W - 20} y2={yOut} stroke="oklch(0.5 0 0)" strokeWidth="1" />
        <text x="20" y={yIn - 10} fill="oklch(0.7 0 0)" fontSize="11">
          input: {inMin}
        </text>
        <text x={W - 20} y={yIn - 10} fill="oklch(0.7 0 0)" fontSize="11" textAnchor="end">
          {inMax}
        </text>
        <text x="20" y={yOut + 20} fill="oklch(0.7 0 0)" fontSize="11">
          output: {outMin}
        </text>
        <text x={W - 20} y={yOut + 20} fill="oklch(0.7 0 0)" fontSize="11" textAnchor="end">
          {outMax}
        </text>
        <line
          x1={valueToX(value, inMin, inMax)}
          y1={yIn}
          x2={valueToX(result, outMin, outMax)}
          y2={yOut}
          stroke={COLOR}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx={valueToX(value, inMin, inMax)} cy={yIn} r="6" fill={COLOR} />
        <circle cx={valueToX(result, outMin, outMax)} cy={yOut} r="6" fill={COLOR} />
        <text
          x={valueToX(value, inMin, inMax)}
          y={yIn - 12}
          fill="white"
          fontSize="11"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {value}
        </text>
        <text
          x={valueToX(result, outMin, outMax)}
          y={yOut + 22}
          fill="white"
          fontSize="11"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {result.toFixed(1)}
        </text>
      </svg>
      <div className="grid w-full max-w-md grid-cols-2 gap-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-16">value: {value}</span>
          <input
            type="range"
            min={inMin}
            max={inMax}
            step="0.1"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16">in min: {inMin}</span>
          <input type="range" min={-10} max={10} value={inMin} onChange={(e) => setInMin(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16">in max: {inMax}</span>
          <input type="range" min={1} max={20} value={inMax} onChange={(e) => setInMax(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16">out min: {outMin}</span>
          <input type="range" min={-360} max={360} value={outMin} onChange={(e) => setOutMin(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16">out max: {outMax}</span>
          <input type="range" min={-360} max={720} value={outMax} onChange={(e) => setOutMax(Number(e.target.value))} />
        </label>
      </div>
      <div className="rounded bg-slate-100 p-2 font-mono text-xs">
        normalize({value}, {inMin}, {inMax}, {outMin}, {outMax}) = {result.toFixed(2)}
      </div>
    </div>
  );
}

const FADE_DURATION = 1000;
const DISPERSE_DURATION = 500;
const CLEANUP_BUFFER = 200;
const NUM_OF_PARTICLES = 5;
const JITTER = 40;

type Particle = { id: number; x: number; y: number };

let particleId = 0;

export function LikeButtonNormalize() {
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
      let angle = normalize(index, 0, NUM_OF_PARTICLES, 0, 360);
      angle += random(-JITTER, JITTER, true);
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
        @keyframes wham-lerp-fadeOut { to { opacity: 0 } }
        @keyframes wham-lerp-disperse { to { transform: translate(var(--x), var(--y)) } }
        .wham-lerp-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation:
            wham-lerp-fadeOut ${FADE_DURATION}ms forwards,
            wham-lerp-disperse ${DISPERSE_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
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
            className="wham-lerp-particle"
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
      <p className="text-xs text-gray-500">
        `let angle = normalize(index, 0, {NUM_OF_PARTICLES}, 0, 360)` 比 `(360 / {NUM_OF_PARTICLES}) * index` 直觀。
      </p>
    </div>
  );
}
