import { random, range } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian } from '~/utils/canvas';

const FADE_DURATION = 1000;
const POP_DURATION = 500;
const CLEANUP_BUFFER = 200;
const NUM_OF_PARTICLES = 8;
const HUE_ROTATION_DEG = 720;

type Particle = { id: number; x: number; y: number; baseColor: string };

let particleId = 0;

export function RgbVsHslPalette() {
  const [seed, setSeed] = useState(0);

  const rgbColors = range(20).map(() => `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`);
  const hslColors = range(20).map(() => `hsl(${random(0, 359)}deg 100% 80%)`);

  return (
    <div className="flex flex-col items-center gap-3" key={seed}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Swatches title="rgb random — chaotic, dark/neon mix" colors={rgbColors} />
        <Swatches title="hsl(_, 100%, 80%) — cohesive pastel" colors={hslColors} />
      </div>
      <button
        type="button"
        onClick={() => setSeed((s) => s + 1)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
      >
        re-roll
      </button>
    </div>
  );
}

function Swatches({ title, colors }: { title: string; colors: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-xs text-gray-700">{title}</p>
      <div className="grid grid-cols-5 gap-1 rounded-md bg-slate-900 p-2">
        {colors.map((color, i) => (
          <div key={i} className="h-8 w-8 rounded" style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  );
}

export function DeadZoneDemo() {
  const [hover, setHover] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-mono text-xs text-gray-700">hover 看 RGB 中點 — 紅 → 灰 → 青</p>
      <button
        type="button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="rounded-md px-6 py-3 font-medium text-slate-900 transition-colors duration-[1500ms]"
        style={{ backgroundColor: hover ? 'hsl(180deg 100% 65%)' : 'hsl(0deg 100% 65%)' }}
      >
        Hover 我
      </button>
      <p className="text-xs text-gray-500">中段灰掉是因為瀏覽器在 RGB 空間做插值,不是 HSL。</p>
    </div>
  );
}

export function HueRotateLikeButton() {
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
      const angle = (360 / NUM_OF_PARTICLES) * index + random(-25, 25, true);
      const distance = random(40, 70, true);
      const { x, y } = convertPolarToCartesian(angle, distance);
      return {
        id: particleId++,
        x,
        y,
        baseColor: `hsl(${random(0, 359)}deg 90% 75%)`,
      };
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
        @keyframes wham-color-fadeOut { to { opacity: 0 } }
        @keyframes wham-color-disperse { to { transform: translate(var(--x), var(--y)) } }
        @keyframes wham-color-hueRotate { to { filter: hue-rotate(var(--hue-rotation)) } }
        .wham-color-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 12px; height: 12px;
          border-radius: 50%;
          pointer-events: none;
          animation:
            wham-color-hueRotate ${FADE_DURATION}ms linear forwards,
            wham-color-fadeOut ${FADE_DURATION}ms forwards,
            wham-color-disperse ${POP_DURATION}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
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
            className="wham-color-particle"
            style={
              {
                backgroundColor: particle.baseColor,
                '--x': `${particle.x.toFixed(2)}px`,
                '--y': `${particle.y.toFixed(2)}px`,
                '--hue-rotation': `${HUE_ROTATION_DEG}deg`,
              } as React.CSSProperties
            }
          />
        ))}
        <span className="sr-only">Like this post</span>
      </button>
      <p className="text-xs text-gray-500">
        每顆粒子起始 hue 隨機 + 整段動畫 `filter: hue-rotate(0 → {HUE_ROTATION_DEG}deg)`,顏色循環不會經過灰色。
      </p>
    </div>
  );
}
