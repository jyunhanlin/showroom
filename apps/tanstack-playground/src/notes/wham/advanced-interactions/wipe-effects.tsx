import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { clampedNormalize } from '~/utils/canvas';
import { useRelativeMousePosition } from '~/utils/use-relative-mouse-position';

// --------------------------------------------------------------------------
// Demo 1 — WipeRevealCards
// --------------------------------------------------------------------------
// 4 city-themed cards. Skyline image area is clipped to a 0-height polygon
// at the bottom by default; on `<button>:hover` / `:focus-visible`, the
// polygon's top vertices interpolate to the top, revealing the skyline
// bottom-up. The wrapper is a `<button>` so keyboard users get the same
// affordance, and so the `:hover` lives on the parent (avoiding the
// "intangible pixels" trap and the doom flicker).

type SkylineCard = {
  id: string;
  label: string;
  // Sky gradient (top → bottom).
  sky: string;
  // Building silhouette color.
  building: string;
  // Lit window color (rendered as small accent rects).
  window: string;
};

const CARDS: SkylineCard[] = [
  {
    id: 'dawn',
    label: 'Dawn',
    sky: 'linear-gradient(to bottom, #fbcfe8 0%, #fda4af 45%, #fdba74 100%)',
    building: '#3f3a52',
    window: '#fde68a',
  },
  {
    id: 'noon',
    label: 'Noon',
    sky: 'linear-gradient(to bottom, #38bdf8 0%, #7dd3fc 60%, #e0f2fe 100%)',
    building: '#0f172a',
    window: '#fef3c7',
  },
  {
    id: 'dusk',
    label: 'Dusk',
    sky: 'linear-gradient(to bottom, #6d28d9 0%, #db2777 60%, #f97316 100%)',
    building: '#1e1b3a',
    window: '#fde68a',
  },
  {
    id: 'night',
    label: 'Night',
    sky: 'linear-gradient(to bottom, #020617 0%, #1e3a8a 70%, #312e81 100%)',
    building: '#0a0a0f',
    window: '#facc15',
  },
];

// Building block layout (x %, width %, height %, plus optional lit-window
// indices). Same layout reused across all 4 themes — the time-of-day
// difference is purely in the gradient palette + window glow color.
const BUILDINGS: ReadonlyArray<{ x: number; w: number; h: number; windows: number[] }> = [
  { x: 4, w: 14, h: 55, windows: [0, 2, 5] },
  { x: 20, w: 18, h: 78, windows: [1, 3, 4, 6] },
  { x: 40, w: 12, h: 45, windows: [0, 2] },
  { x: 54, w: 20, h: 88, windows: [0, 2, 4, 5, 7] },
  { x: 76, w: 10, h: 40, windows: [1, 3] },
  { x: 88, w: 10, h: 60, windows: [0, 2, 4] },
];

function Skyline({ card }: { card: SkylineCard }) {
  return (
    <div className="absolute inset-0" style={{ background: card.sky }}>
      {/* Building silhouettes */}
      {BUILDINGS.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0"
          style={{
            left: `${b.x}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
            background: card.building,
          }}
        >
          {/* Tiny "windows" — purely decorative, position-based on hash */}
          {b.windows.map((w) => (
            <div
              key={w}
              className="absolute"
              style={{
                left: `${(w % 3) * 30 + 15}%`,
                top: `${Math.floor(w / 3) * 24 + 18}%`,
                width: '14%',
                height: '8%',
                background: card.window,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function WipeRevealCards() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 sm:grid-cols-4">
      {CARDS.map((card) => (
        // The `<button>` wrapper owns the `:hover` state. The clipped image
        // can be fully invisible on idle without breaking pointer detection,
        // because the button itself is the hit target.
        // The drop-shadow lives here on the parent — if it lived on the
        // clipped element, the shadow would be clipped along with it.
        <button
          key={card.id}
          type="button"
          className="group flex cursor-pointer flex-col items-stretch gap-2 rounded-md bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          style={{ filter: 'drop-shadow(0 6px 14px rgba(15, 23, 42, 0.18))' }}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-slate-200">
            {/* Idle: clip-path = 0-height polygon at bottom (skyline
                hidden). On parent button :hover / :focus-visible, the
                top two polygon vertices interpolate from 100% (bottom)
                to 0% (top), wiping the skyline upward. The CSS
                transition does point-by-point interpolation between
                the two 4-point polygons.

                Different curves on different properties — the wipe
                runs on a smoother ease-out (clip-path) while the lift
                runs on a symmetric ease-in-out (transform) — for a
                layered feel rather than a single synchronized move. */}
            <div className="absolute inset-0 [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)] group-hover:[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] group-focus-visible:[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] transition-[clip-path,transform] duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
              <Skyline card={card} />
            </div>
          </div>
          <span className="px-1 text-sm font-medium text-slate-700">{card.label}</span>
        </button>
      ))}
    </div>
  );
}

// --------------------------------------------------------------------------
// Demo 2 — TextWipe
// --------------------------------------------------------------------------
// On mount, animate clip-path from "right side hidden" to "fully visible",
// revealing the headline left → right. Reduced-motion: skip to revealed.

const TEXT_HIDDEN = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
const TEXT_REVEALED = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

export function TextWipe() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    const handle = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener('change', handle);
    return () => query.removeEventListener('change', handle);
  }, []);

  return (
    <div className="flex h-56 flex-col items-center justify-center gap-6 bg-slate-900 p-6">
      <motion.h2
        key={replayKey}
        initial={{ clipPath: prefersReducedMotion ? TEXT_REVEALED : TEXT_HIDDEN }}
        animate={{ clipPath: TEXT_REVEALED }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        className="m-0 font-serif text-4xl leading-tight font-bold tracking-tight text-amber-100 sm:text-5xl"
      >
        Whimsical wipes, on cue.
      </motion.h2>
      <button
        type="button"
        onClick={() => setReplayKey((n) => n + 1)}
        className="cursor-pointer rounded-md bg-amber-300 px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-amber-200"
      >
        Replay
      </button>
    </div>
  );
}

// --------------------------------------------------------------------------
// Demo 3 — LinearGraphReveal
// --------------------------------------------------------------------------
// Cursor X position drives a clip-path reveal of a line graph. Raw cursor
// values feel jittery; pipe them through a spring for a gliding feel.

const GRAPH_W = 480;
const GRAPH_H = 180;
const GRAPH_PAD_X = 16;

// Hand-rolled "metrics" series — looks like a real chart with peaks &
// valleys but seeded to a static array so the demo renders identically
// each refresh.
const SERIES: ReadonlyArray<number> = [
  0.32, 0.28, 0.34, 0.41, 0.38, 0.46, 0.55, 0.52, 0.6, 0.58, 0.65, 0.72, 0.68, 0.74, 0.81, 0.77, 0.84, 0.9, 0.86, 0.92,
];

function buildPath(): string {
  const innerW = GRAPH_W - GRAPH_PAD_X * 2;
  const step = innerW / (SERIES.length - 1);
  return SERIES.map((v, i) => {
    const x = GRAPH_PAD_X + i * step;
    const y = GRAPH_H - 20 - v * (GRAPH_H - 40);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
}

const LINE_PATH = buildPath();
const AREA_PATH = `${LINE_PATH} L ${GRAPH_W - GRAPH_PAD_X} ${GRAPH_H - 12} L ${GRAPH_PAD_X} ${GRAPH_H - 12} Z`;

export function LinearGraphReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, boundingBox] = useRelativeMousePosition(containerRef);

  // Compute target % from cursor X position. Idle (no cursor) → 0.
  const hasMouse = mousePosition.x !== null && boundingBox !== null;
  const targetPct =
    hasMouse && boundingBox !== null
      ? clampedNormalize(mousePosition.x! + boundingBox.width / 2, 0, boundingBox.width, 0, 100)
      : 0;

  // Spring-smooth the percentage. Raw cursor → jittery clip-path; spring
  // gives a heavier, gliding feel that matches Linear.app's marketing site.
  const motionPct = useMotionValue(0);
  const springPct = useSpring(motionPct, { stiffness: 140, damping: 22, mass: 0.8 });
  const clipPath = useTransform(springPct, (p) => `polygon(0% 0%, ${p}% 0%, ${p}% 100%, 0% 100%)`);

  useEffect(() => {
    motionPct.set(targetPct);
  }, [motionPct, targetPct]);

  return (
    <div ref={containerRef} className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-950 p-4">
      <p className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-slate-400">
        {hasMouse ? `reveal: ${targetPct.toFixed(0)}%` : 'Move cursor across to reveal data'}
      </p>
      <svg
        viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        className="max-w-[680px]"
        role="img"
        aria-label="Cursor-reveal line chart"
      >
        {/* Baseline grid — always visible so users know there's *something*
            here even before cursor enters. */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={GRAPH_PAD_X}
            x2={GRAPH_W - GRAPH_PAD_X}
            y1={GRAPH_H - 20 - t * (GRAPH_H - 40)}
            y2={GRAPH_H - 20 - t * (GRAPH_H - 40)}
            stroke="#1e293b"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}

        {/* Revealed graph (area + stroke) — wrapped in motion.g so we can
            animate clip-path on it. */}
        <motion.g style={{ clipPath }}>
          <path d={AREA_PATH} fill="url(#linear-graph-fill)" opacity={0.35} />
          <path
            d={LINE_PATH}
            fill="none"
            stroke="#a5f3fc"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        <defs>
          <linearGradient id="linear-graph-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
