import { throttle } from 'lodash-es';
import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { clampedNormalize, getDistanceBetweenPoints, normalize } from '~/utils/canvas';

// ─────────────────────────────────────────────────────────────────────────────
// Demo 1: SvgCursorTracker
// ─────────────────────────────────────────────────────────────────────────────

const TRACKER_VIEWBOX_SIZE = 100;

export function SvgCursorTracker() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const getThrottledBoundingBox = useMemo(
    () =>
      throttle(() => {
        if (!svgRef.current) return null;
        return svgRef.current.getBoundingClientRect();
      }, 500),
    [],
  );

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const bb = getThrottledBoundingBox();
      if (!bb) return;
      const relativeX = event.clientX - bb.left;
      const relativeY = event.clientY - bb.top;

      // Hide circle when cursor leaves the SVG.
      if (relativeX < 0 || relativeY < 0 || relativeX > bb.width || relativeY > bb.height) {
        setPosition(null);
        return;
      }

      // Pixel space → viewBox space.
      const x = normalize(relativeX, 0, bb.width, 0, TRACKER_VIEWBOX_SIZE);
      const y = normalize(relativeY, 0, bb.height, 0, TRACKER_VIEWBOX_SIZE);
      setPosition({ x, y });
    }
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [getThrottledBoundingBox]);

  return (
    <div className="relative flex h-80 items-center justify-center bg-slate-50">
      <p className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-slate-500">
        {position ? `viewBox: (${position.x.toFixed(1)}, ${position.y.toFixed(1)})` : 'Move cursor across the SVG'}
      </p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${TRACKER_VIEWBOX_SIZE} ${TRACKER_VIEWBOX_SIZE}`}
        className="h-64 w-64 rounded-lg bg-white ring-1 ring-slate-200"
      >
        {/* viewBox grid for reference */}
        <line x1="50" y1="0" x2="50" y2="100" stroke="#e2e8f0" strokeWidth="0.3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.3" />
        <rect x="0.5" y="0.5" width="99" height="99" fill="none" stroke="#cbd5e1" strokeWidth="0.3" />
        {position && <circle cx={position.x} cy={position.y} r="5" fill="#ef4444" />}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Demo 2: SvgGrowingCircles
// ─────────────────────────────────────────────────────────────────────────────

const GRID_VIEWBOX_SIZE = 300;
const GRID_POSITIONS = [37.5, 112.5, 187.5, 262.5];
const GRID_POINTS = GRID_POSITIONS.flatMap((cx) => GRID_POSITIONS.map((cy) => ({ cx, cy })));

const MIN_RADIUS = 4;
const MAX_RADIUS = 18;
const GROW_MIN_DISTANCE = 0;
const GROW_MAX_DISTANCE = 100;

export function SvgGrowingCircles() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const getThrottledBoundingBox = useMemo(
    () =>
      throttle(() => {
        if (!svgRef.current) return null;
        return svgRef.current.getBoundingClientRect();
      }, 500),
    [],
  );

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const bb = getThrottledBoundingBox();
      if (!bb) return;
      const relativeX = event.clientX - bb.left;
      const relativeY = event.clientY - bb.top;
      if (relativeX < 0 || relativeY < 0 || relativeX > bb.width || relativeY > bb.height) {
        setCursor(null);
        return;
      }
      setCursor({
        x: normalize(relativeX, 0, bb.width, 0, GRID_VIEWBOX_SIZE),
        y: normalize(relativeY, 0, bb.height, 0, GRID_VIEWBOX_SIZE),
      });
    }
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [getThrottledBoundingBox]);

  return (
    <div className="relative flex h-96 items-center justify-center bg-slate-50">
      <p className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-slate-500">
        {cursor ? 'Hover the grid — closer = bigger' : 'Move cursor over the grid'}
      </p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${GRID_VIEWBOX_SIZE} ${GRID_VIEWBOX_SIZE}`}
        className="h-72 w-72 rounded-lg bg-white ring-1 ring-slate-200"
      >
        {GRID_POINTS.map(({ cx, cy }) => {
          const distance = cursor ? getDistanceBetweenPoints(cursor, { x: cx, y: cy }) : Infinity;
          const r = clampedNormalize(distance, GROW_MIN_DISTANCE, GROW_MAX_DISTANCE, MAX_RADIUS, MIN_RADIUS);
          return <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#6366f1" />;
        })}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Demo 3: SvgClickToDraw
// ─────────────────────────────────────────────────────────────────────────────

const DRAW_VIEWBOX_WIDTH = 400;
const DRAW_VIEWBOX_HEIGHT = 300;

type Point = { x: number; y: number };

export function SvgClickToDraw() {
  const padRef = useRef<HTMLButtonElement>(null);
  const [points, setPoints] = useState<Point[]>([]);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!padRef.current) return;
    const bb = padRef.current.getBoundingClientRect();
    const relativeX = event.clientX - bb.left;
    const relativeY = event.clientY - bb.top;
    // Pixel space → viewBox space. offsetX/Y is also pixel-space, would need same conversion.
    const x = normalize(relativeX, 0, bb.width, 0, DRAW_VIEWBOX_WIDTH);
    const y = normalize(relativeY, 0, bb.height, 0, DRAW_VIEWBOX_HEIGHT);
    setPoints((prev) => [...prev, { x, y }]);
  }

  return (
    <div className="relative flex h-96 flex-col items-center justify-center gap-3 bg-slate-50">
      <p className="text-xs text-slate-500">
        {points.length === 0
          ? 'Click anywhere on the pad to drop a point'
          : `${points.length} point${points.length === 1 ? '' : 's'} — click to add more`}
      </p>
      <button
        ref={padRef}
        type="button"
        onClick={handleClick}
        aria-label="Drawing pad — click to drop a connected point"
        className="block h-64 w-[28rem] cursor-crosshair rounded-lg bg-white p-0 ring-1 ring-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
      >
        <svg viewBox={`0 0 ${DRAW_VIEWBOX_WIDTH} ${DRAW_VIEWBOX_HEIGHT}`} className="pointer-events-none h-full w-full">
          {/* Polyline first so it renders BEHIND the dots. */}
          {points.length >= 2 && (
            <polyline
              points={points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="5" fill="#0ea5e9" />
          ))}
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setPoints([])}
        disabled={points.length === 0}
        className="rounded-md bg-slate-200 px-3 py-1 text-xs text-slate-700 transition-colors hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reset
      </button>
    </div>
  );
}
