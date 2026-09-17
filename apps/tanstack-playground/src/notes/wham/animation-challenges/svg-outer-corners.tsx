import { useState, type SVGProps } from 'react';

const BACKGROUND = 'hsl(210deg 15% 6%)';
const HIGHLIGHT_COLOR = 'hsl(350deg 100% 60%)';
const GUIDE_COLOR = 'hsl(210deg 10% 45%)';

// Josh's styles.css + the <style> block from his solution, flattened (no CSS nesting)
// and scoped with a `wham-oc-` prefix. `position: fixed` became `absolute` so the
// dialog stays inside the demo stage instead of the viewport.
const SOLUTION_CSS = `
  .wham-oc-stage {
    position: relative;
    height: 280px;
    overflow: hidden;
    border-radius: 8px;
    background: ${BACKGROUND};
    isolation: isolate;
  }

  .wham-oc-dialog {
    --radius: 16px;
    position: absolute;
    inset: 0;
    width: 70%;
    height: 10rem;
    padding: 0;
    margin: auto;
    border: none;
    background: white;
    border-radius: var(--radius) 0 var(--radius) var(--radius);
  }

  .wham-oc-dialog button {
    position: absolute;
    right: 0;
    top: 0;
    width: 48px;
    height: 48px;
    display: grid;
    place-content: center;
    background: white;
    border: none;
    transform: translateY(-100%);
    color: black;
    cursor: pointer;
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .wham-oc-x-icon {
    fill: none;
    stroke: black;
    stroke-width: 2px;
    stroke-linecap: round;
  }

  .wham-oc-outer-corner {
    width: var(--radius);
    height: var(--radius);
    fill: white;
    /* Pin to the button's bottom-left, then shift one own-width leftward */
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    /* The corner is a button descendant: let pointer events pass through it */
    pointer-events: none;
  }

  .wham-oc-visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

// Extension ideas 1 + 2. Josh gives no code for these; this is my own composition
// on top of his `OuterCorner` component.
const EXTENSION_CSS = `
  .wham-oc-ext-dialog {
    --radius: 16px;
    /* The corner pieces must sit on the straight part of the top edge. The dialog's
       own top-right rounding eats the last --radius px, and the right-hand corner
       piece is another --radius px wide, so the inset has to be at least 2x. */
    --inset: calc(var(--radius) * 2);
    position: absolute;
    inset: 0;
    width: 70%;
    height: 10rem;
    padding: 0;
    margin: auto;
    border: none;
    background: white;
    border-radius: var(--radius);
  }

  .wham-oc-ext-dialog button {
    position: absolute;
    right: var(--inset);
    top: 0;
    width: 48px;
    height: 48px;
    display: grid;
    place-content: center;
    background: white;
    border: none;
    color: black;
    cursor: pointer;
    border-radius: var(--radius) var(--radius) 0 0;
    /* Tuck the button behind the dialog. The stage sets isolation: isolate, so -1
       still paints above the stage background. */
    z-index: -1;
    transform: translateY(0%);
  }

  .wham-oc-ext-dialog button[data-is-open='true'] {
    transform: translateY(-100%);
  }

  @media (prefers-reduced-motion: no-preference) {
    .wham-oc-ext-dialog button {
      transition: transform 450ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
  }

  .wham-oc-ext-corner {
    position: absolute;
    bottom: 0;
    color: white;
    pointer-events: none;
  }
`;

// Josh's Bonus React component (TypeScript tab), unchanged.
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  orientation: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

function OuterCorner({ size = 8, orientation, ...delegated }: Props) {
  let rotation;
  if (orientation === 'bottom-right') {
    rotation = 0;
  } else if (orientation === 'bottom-left') {
    rotation = 90;
  } else if (orientation === 'top-left') {
    rotation = 180;
  } else if (orientation === 'top-right') {
    rotation = 270;
  } else {
    throw new Error('Unrecognized orientation: ' + orientation);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 8 8"
      preserveAspectRatio="none"
      width={size}
      height={size}
      {...delegated}
    >
      <path
        fill="currentColor"
        d={`
          M 8,0
          A 8,8 0 0 1 0,8
          L 8,8
          Z
        `}
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      />
    </svg>
  );
}

// Lucide's X glyph, same markup as the playground.
function XIcon() {
  return (
    <svg className="wham-oc-x-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function OuterCornersSolution() {
  // Both toggles are note additions for before/after comparison, not part of Josh's solution.
  const [showCorner, setShowCorner] = useState(true);
  const [highlight, setHighlight] = useState(false);

  return (
    <div>
      <style>{SOLUTION_CSS}</style>
      <div className="wham-oc-stage">
        <dialog open className="wham-oc-dialog">
          <div className="wham-oc-close-btn-wrapper">
            <button>
              <XIcon />
              <span className="wham-oc-visually-hidden">Close</span>

              {/* The added piece: an 8x8 corner drawn outside the circle */}
              {showCorner && (
                <svg
                  className="wham-oc-outer-corner"
                  aria-hidden="true"
                  viewBox="0 0 8 8"
                  style={highlight ? { fill: HIGHLIGHT_COLOR } : undefined}
                >
                  <path
                    d="
                      M 8,0
                      A 8,8 0 0 1 0,8
                      L 8,8
                      Z
                    "
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </dialog>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showCorner} onChange={(event) => setShowCorner(event.target.checked)} />
          Outer corner
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={highlight}
            disabled={!showCorner}
            onChange={(event) => setHighlight(event.target.checked)}
          />
          Highlight the corner piece
        </label>
      </div>
    </div>
  );
}

type ArcShape = {
  label: string;
  d: string;
  // Center of the circle the arc belongs to.
  circleCenter: { x: number; y: number };
};

// Replaces the two hint images: the filled wedge vs the shape Josh actually draws.
// Only sweep-flag differs.
const ARC_SHAPES: ArcShape[] = [
  {
    label: 'sweep-flag 0: filled wedge',
    d: 'M 8,0 A 8,8 0 0 0 0,8 L 8,8 Z',
    circleCenter: { x: 8, y: 8 },
  },
  {
    label: 'sweep-flag 1: outer corner',
    d: 'M 8,0 A 8,8 0 0 1 0,8 L 8,8 Z',
    circleCenter: { x: 0, y: 0 },
  },
];

const ANATOMY_POINTS = [
  { x: 8, y: 0, label: 'M', dx: 0.6, dy: -0.6 },
  { x: 0, y: 8, label: 'A', dx: -1.4, dy: 1.4 },
  { x: 8, y: 8, label: 'L', dx: 0.6, dy: 1.4 },
];

export function OuterCornerAnatomy() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {ARC_SHAPES.map((shape) => (
        <div key={shape.label} className="flex flex-col items-center gap-2">
          <svg
            viewBox="-3 -3 14 14"
            className="block w-full max-w-[220px] rounded-md"
            style={{ background: BACKGROUND }}
          >
            {/* 8x8 viewBox boundary */}
            <rect x={0} y={0} width={8} height={8} fill="none" stroke={GUIDE_COLOR} strokeWidth={0.08} />
            {/* The full circle the arc is cut from */}
            <circle
              cx={shape.circleCenter.x}
              cy={shape.circleCenter.y}
              r={8}
              fill="none"
              stroke={GUIDE_COLOR}
              strokeWidth={0.08}
              strokeDasharray="0.4 0.3"
            />
            <path d={shape.d} fill="white" />
            {ANATOMY_POINTS.map((point) => (
              <g key={point.label}>
                <circle cx={point.x} cy={point.y} r={0.35} fill={HIGHLIGHT_COLOR} />
                <text
                  x={point.x + point.dx}
                  y={point.y + point.dy}
                  fill={HIGHLIGHT_COLOR}
                  fontSize={1.1}
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {point.label}
                </text>
              </g>
            ))}
          </svg>
          <p className="font-mono text-xs text-gray-600">{shape.label}</p>
        </div>
      ))}
    </div>
  );
}

const ORIENTATIONS: Props['orientation'][] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

export function OuterCornerOrientations() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {ORIENTATIONS.map((orientation) => (
        <div key={orientation} className="flex flex-col items-center gap-2">
          <div className="rounded-md p-4" style={{ background: BACKGROUND }}>
            <OuterCorner
              orientation={orientation}
              size={64}
              className="block text-white"
              style={{ outline: `1px dashed ${GUIDE_COLOR}` }}
            />
          </div>
          <p className="font-mono text-xs text-gray-600">{orientation}</p>
        </div>
      ))}
    </div>
  );
}

export function OuterCornerExtensions() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <style>{SOLUTION_CSS + EXTENSION_CSS}</style>
      <div className="wham-oc-stage">
        <dialog open className="wham-oc-ext-dialog">
          <div className="wham-oc-close-btn-wrapper">
            <button data-is-open={isOpen} inert={!isOpen} onClick={() => setIsOpen(false)}>
              <XIcon />
              <span className="wham-oc-visually-hidden">Close</span>
              {/* size matches --radius (16px) */}
              <OuterCorner
                orientation="bottom-right"
                size={16}
                aria-hidden="true"
                className="wham-oc-ext-corner"
                style={{ left: 0, transform: 'translateX(-100%)' }}
              />
              <OuterCorner
                orientation="bottom-left"
                size={16}
                aria-hidden="true"
                className="wham-oc-ext-corner"
                style={{ right: 0, transform: 'translateX(100%)' }}
              />
            </button>
          </div>
        </dialog>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-700">
        <button
          type="button"
          className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
          disabled={isOpen}
          onClick={() => setIsOpen(true)}
        >
          Slide the button back in
        </button>
        <span>{isOpen ? 'Click the × to slide it away.' : 'Hidden behind the dialog.'}</span>
      </div>
    </div>
  );
}
