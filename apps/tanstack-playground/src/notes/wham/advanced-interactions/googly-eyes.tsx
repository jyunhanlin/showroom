import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { clamp, convertCartesianToPolar, convertPolarToCartesian } from '~/utils/canvas';
import { useRelativeMousePosition } from '~/utils/use-relative-mouse-position';

const SPRING_CONFIG = { stiffness: 200, damping: 20 } as const;
const MAX_DISTANCE = 150;
const PUPIL_RADIUS_LIMIT = 15;
const PUPIL_INTENSITY = 0.1;

type EyeProps = {
  /** Cursor offset relative to the *creature center* (not this eye). */
  cursorX: number | null;
  cursorY: number | null;
  /** When false, pupil snaps back to (0, 0) — set by parent for synchronized behavior. */
  isTracking: boolean;
  /** Position of this eye's center, in coordinates relative to the creature center. */
  offsetX: number;
  offsetY: number;
  size?: number;
};

function Eye({ cursorX, cursorY, isTracking, offsetX, offsetY, size = 80 }: EyeProps) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const springX = useSpring(targetX, SPRING_CONFIG);
  const springY = useSpring(targetY, SPRING_CONFIG);

  useEffect(() => {
    if (!isTracking || cursorX === null || cursorY === null) {
      targetX.set(0);
      targetY.set(0);
      return;
    }
    // Each eye computes pupil direction independently: from *this eye's* center to cursor.
    const relativeX = cursorX - offsetX;
    const relativeY = cursorY - offsetY;
    const [angle, distance] = convertCartesianToPolar(relativeX, relativeY);
    const modifiedDistance = clamp(distance * PUPIL_INTENSITY, -PUPIL_RADIUS_LIMIT, PUPIL_RADIUS_LIMIT);
    const { x, y } = convertPolarToCartesian(angle, modifiedDistance);
    targetX.set(x);
    targetY.set(y);
  }, [cursorX, cursorY, isTracking, offsetX, offsetY, targetX, targetY]);

  const pupilSize = Math.round(size * 0.36);

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-white ring-1 ring-slate-300"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="rounded-full bg-slate-900"
        style={{ width: pupilSize, height: pupilSize, x: springX, y: springY }}
      />
    </div>
  );
}

export function SingleGooglyEye() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition] = useRelativeMousePosition(containerRef);

  const hasMouse = mousePosition.x !== null && mousePosition.y !== null;
  const distance = hasMouse ? Math.sqrt(mousePosition.x! ** 2 + mousePosition.y! ** 2) : null;
  const isTracking = distance !== null && distance < MAX_DISTANCE;

  return (
    <div ref={containerRef} className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-50">
      <p className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-slate-500">
        {hasMouse
          ? isTracking
            ? `tracking — d: ${distance!.toFixed(0)}px`
            : `idle — too far (d: ${distance!.toFixed(0)}px > ${MAX_DISTANCE})`
          : 'Move cursor near the eye'}
      </p>
      <Eye
        cursorX={mousePosition.x}
        cursorY={mousePosition.y}
        isTracking={isTracking}
        offsetX={0}
        offsetY={0}
        size={120}
      />
    </div>
  );
}

const CREATURE_MAX_DISTANCE = 220;
const EYE_SIZE = 56;
const EYE_GAP = 12;

// 3x3 grid offsets, expressed relative to creature center.
const STEP = EYE_SIZE + EYE_GAP;
const GRID_OFFSETS: ReadonlyArray<{ x: number; y: number }> = [-1, 0, 1].flatMap((row) =>
  [-1, 0, 1].map((col) => ({ x: col * STEP, y: row * STEP })),
);

export function GooglyEyesCreature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition] = useRelativeMousePosition(containerRef);

  const hasMouse = mousePosition.x !== null && mousePosition.y !== null;
  // Synchronized on/off: distance from CREATURE center (not per-eye) decides tracking.
  const distance = hasMouse ? Math.sqrt(mousePosition.x! ** 2 + mousePosition.y! ** 2) : null;
  const isTracking = distance !== null && distance < CREATURE_MAX_DISTANCE;

  return (
    <div ref={containerRef} className="relative flex h-80 items-center justify-center overflow-hidden bg-slate-50">
      <p className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-slate-500">
        {hasMouse
          ? isTracking
            ? 'creature is watching you'
            : 'too far — creature lost interest'
          : 'Move cursor over the creature'}
      </p>
      <div className="grid" style={{ gridTemplateColumns: `repeat(3, ${EYE_SIZE}px)`, gap: EYE_GAP }}>
        {GRID_OFFSETS.map((offset, i) => (
          <Eye
            key={i}
            cursorX={mousePosition.x}
            cursorY={mousePosition.y}
            isTracking={isTracking}
            offsetX={offset.x}
            offsetY={offset.y}
            size={EYE_SIZE}
          />
        ))}
      </div>
    </div>
  );
}
