import { animate } from 'motion';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { normalize } from '~/utils/canvas';

// Single-line on purpose: a CSS string cannot hold a raw newline, and the CSS
// variant interpolates these into `d: path('...')`. Josh's multi-line version
// needed a `\` at the end of every line for the same reason.
const EXTENDED_PATH = 'M 0 12 C 8 12 9.6 0 16 0 C 22.4 0 24 12 32 12 Z';
const SQUASHED_PATH = 'M 0 12 C 0 12 9.6 6 16 6 C 22.4 6 32 12 32 12 Z';

const SPRING_EASING =
  'linear(0, 0.008, 0.034 1.9%, 0.137 4.1%, 0.71 11.9%, 0.925 15.5%, 1.003, 1.064 19%, 1.108, 1.135 22.8%, 1.144, 1.148, 1.146, 1.14 27.9%, 1.118 30.5%, 1.047 36.9%, 1.017 40.2%, 0.993, 0.981 47.8%, 0.978 50.4%, 0.979 53.3%, 0.997 65.4%, 1.003 72.3%, 1)';
const SPRING_DURATION = '0.833s';

const EASING_SETTINGS = {
  type: 'spring',
  stiffness: 300,
  damping: 18,
} as const;

const BACKGROUND = 'hsl(210deg 15% 6%)';

function checkPrefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Josh's vanilla page never unmounts, so his `window.setTimeout` needs no cleanup.
// A React demo can unmount inside the 150ms window, so track the ids and clear them.
function useTimeouts() {
  const timeoutIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const timeoutIds = timeoutIdsRef.current;
    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIds.clear();
    };
  }, []);

  return useCallback((callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      timeoutIdsRef.current.delete(timeoutId);
      callback();
    }, delay);
    timeoutIdsRef.current.add(timeoutId);
  }, []);
}

function Stage({ tip, onTrigger }: { tip: ReactNode; onTrigger: () => void }) {
  return (
    <div className="flex flex-col justify-center gap-8 rounded-md px-6 py-12" style={{ background: BACKGROUND }}>
      <div className="mx-auto w-full max-w-sm">
        {tip}
        <div className="min-h-[100px] rounded-lg bg-white p-8" />
      </div>
      <button
        type="button"
        onClick={onTrigger}
        className="w-fit cursor-pointer self-center rounded bg-gray-200 px-8 py-2 text-gray-900 hover:bg-gray-300"
      >
        Trigger
      </button>
    </div>
  );
}

export function GoopyTipCss() {
  const tipRef = useRef<SVGSVGElement>(null);
  const scheduleTimeout = useTimeouts();

  function handleTrigger() {
    const tip = tipRef.current;
    if (!tip) return;

    tip.classList.add('goopy-css-squashed');

    scheduleTimeout(() => {
      tip.classList.remove('goopy-css-squashed');
    }, 150);
  }

  return (
    <>
      <style>{`
        .goopy-css-stage {
          --spring-easing: ${SPRING_EASING};
          --spring-duration: ${SPRING_DURATION};
        }
        .goopy-css-tip {
          display: block;
          margin-inline: auto;
          width: 32px;
          height: 12px;
          fill: white;
          overflow: visible;
        }
        .goopy-css-tip-path {
          d: path('${EXTENDED_PATH}');
        }

        @media (prefers-reduced-motion: no-preference) {
          .goopy-css-tip-path {
            transition: d var(--spring-easing) var(--spring-duration);
          }
          .goopy-css-tip.goopy-css-squashed .goopy-css-tip-path {
            d: path('${SQUASHED_PATH}');
          }
        }
      `}</style>
      <div className="goopy-css-stage">
        <Stage
          onTrigger={handleTrigger}
          tip={
            <svg ref={tipRef} className="goopy-css-tip" viewBox="0 0 32 12" aria-hidden="true">
              {/* The `d` attribute is a fallback for browsers without the CSS `d` property.
                  Where the property works, the stylesheet overrides this attribute. */}
              <path className="goopy-css-tip-path" d={EXTENDED_PATH} />
            </svg>
          }
        />
      </div>
    </>
  );
}

export function GoopyTipMotion() {
  const tipPathRef = useRef<SVGPathElement>(null);
  const scheduleTimeout = useTimeouts();

  function handleTrigger() {
    const tipPath = tipPathRef.current;
    if (!tipPath) return;
    // Acceptance criteria: the tip must not change at all for reduced motion.
    // Josh's Motion playground skips this check; the CSS variant gets it from the media query.
    if (checkPrefersReducedMotion()) return;

    animate(tipPath, { d: SQUASHED_PATH }, EASING_SETTINGS);

    scheduleTimeout(() => {
      animate(tipPath, { d: EXTENDED_PATH }, EASING_SETTINGS);
    }, 150);
  }

  return (
    <Stage
      onTrigger={handleTrigger}
      tip={
        <svg
          className="mx-auto block h-[12px] w-[32px] overflow-visible"
          style={{ fill: 'white' }}
          viewBox="0 0 32 12"
          aria-hidden="true"
        >
          {/* Start from the extended shape; Motion reads this attribute as the first keyframe. */}
          <path ref={tipPathRef} d={EXTENDED_PATH} />
        </svg>
      }
    />
  );
}

type Point = { x: number; y: number };
type TipPoints = { start: Point; c1a: Point; c1b: Point; mid: Point; c2a: Point; c2b: Point; end: Point };

const EXTENDED_POINTS: TipPoints = {
  start: { x: 0, y: 12 },
  c1a: { x: 8, y: 12 },
  c1b: { x: 9.6, y: 0 },
  mid: { x: 16, y: 0 },
  c2a: { x: 22.4, y: 0 },
  c2b: { x: 24, y: 12 },
  end: { x: 32, y: 12 },
};
const SQUASHED_POINTS: TipPoints = {
  start: { x: 0, y: 12 },
  c1a: { x: 0, y: 12 },
  c1b: { x: 9.6, y: 6 },
  mid: { x: 16, y: 6 },
  c2a: { x: 22.4, y: 6 },
  c2b: { x: 32, y: 12 },
  end: { x: 32, y: 12 },
};

function format(point: Point) {
  return `${+point.x.toFixed(2)} ${+point.y.toFixed(2)}`;
}

const FIRST_CURVE_COLOR = 'hsl(50deg 100% 60%)';
const SECOND_CURVE_COLOR = 'hsl(170deg 80% 55%)';

// Not Josh's code: the course page shows this slider without source. Rebuilt to show
// how every control point moves between the two paths.
export function GoopyTipSquashSlider() {
  const [squashAmount, setSquashAmount] = useState(0);

  const keys = Object.keys(EXTENDED_POINTS) as (keyof TipPoints)[];
  const points = Object.fromEntries(
    keys.map((key) => [
      key,
      {
        x: normalize(squashAmount, 0, 100, EXTENDED_POINTS[key].x, SQUASHED_POINTS[key].x),
        y: normalize(squashAmount, 0, 100, EXTENDED_POINTS[key].y, SQUASHED_POINTS[key].y),
      },
    ]),
  ) as TipPoints;
  const { start, c1a, c1b, mid, c2a, c2b, end } = points;

  const d = `M ${format(start)} C ${format(c1a)} ${format(c1b)} ${format(mid)} C ${format(c2a)} ${format(c2b)} ${format(end)} Z`;

  const handles: [Point, Point, string][] = [
    [start, c1a, FIRST_CURVE_COLOR],
    [mid, c1b, FIRST_CURVE_COLOR],
    [mid, c2a, SECOND_CURVE_COLOR],
    [end, c2b, SECOND_CURVE_COLOR],
  ];

  return (
    <div className="flex flex-col gap-4 rounded-md px-6 py-6" style={{ background: BACKGROUND }}>
      <svg viewBox="-4 -3 40 18" className="mx-auto block w-full max-w-md" aria-hidden="true">
        <rect
          x="0"
          y="0"
          width="32"
          height="12"
          fill="none"
          stroke="hsl(210deg 10% 40%)"
          strokeDasharray="4 4"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path d={d} fill="white" />
        {handles.map(([from, to, color], index) => (
          <line
            key={index}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={color}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {[c1a, c1b].map((point, index) => (
          <circle key={`first-${index}`} cx={point.x} cy={point.y} r="0.7" fill={FIRST_CURVE_COLOR} />
        ))}
        {[c2a, c2b].map((point, index) => (
          <circle key={`second-${index}`} cx={point.x} cy={point.y} r="0.7" fill={SECOND_CURVE_COLOR} />
        ))}
      </svg>
      <label className="flex flex-col items-center gap-2 text-sm text-gray-200">
        <span>Squash Amount {squashAmount}%</span>
        <input
          type="range"
          min={0}
          max={100}
          value={squashAmount}
          onChange={(event) => setSquashAmount(Number(event.target.value))}
          className="w-full max-w-xs"
        />
      </label>
      {/* A <div>, not <code>: app.css styles `.prose :not(pre) > code` unlayered, which beats
          Tailwind utilities even inside not-prose and paints a light gray background here. */}
      <div className="overflow-x-auto text-center font-mono text-xs text-gray-300">{d}</div>
    </div>
  );
}
