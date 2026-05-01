import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { clamp, convertCartesianToPolar, convertPolarToCartesian } from '~/utils/canvas';
import { useRelativeMousePosition } from '~/utils/use-relative-mouse-position';

const MAX_DISTANCE = 150;
const PUPIL_RADIUS_LIMIT = 18;
const SPRING_CONFIG = { stiffness: 200, damping: 20 };

const EYE_FILL = 'oklch(0.95 0.01 80)';
const PUPIL_FILL = 'oklch(0.2 0.02 280)';

export function SnappyEye() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse] = useRelativeMousePosition(ref, 250);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (mouse.x === null || mouse.y === null) return;
    const [angle, distance] = convertCartesianToPolar(mouse.x, mouse.y);
    if (distance <= MAX_DISTANCE) {
      const modified = clamp(distance * 0.1, -PUPIL_RADIUS_LIMIT, PUPIL_RADIUS_LIMIT);
      const next = convertPolarToCartesian(angle, modified);
      x.set(next.x);
      y.set(next.y);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [mouse.x, mouse.y, x, y]);

  return <Eye label="raw — snaps to center when cursor leaves" outerRef={ref} x={x} y={y} />;
}

export function SpringEye() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse] = useRelativeMousePosition(ref, 250);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (mouse.x === null || mouse.y === null) return;
    const [angle, distance] = convertCartesianToPolar(mouse.x, mouse.y);
    if (distance <= MAX_DISTANCE) {
      const modified = clamp(distance * 0.1, -PUPIL_RADIUS_LIMIT, PUPIL_RADIUS_LIMIT);
      const next = convertPolarToCartesian(angle, modified);
      rawX.set(next.x);
      rawY.set(next.y);
    } else {
      rawX.set(0);
      rawY.set(0);
    }
  }, [mouse.x, mouse.y, rawX, rawY]);

  return <Eye label="spring smoothed — gracefully drifts back when cursor leaves" outerRef={ref} x={x} y={y} />;
}

function Eye({
  label,
  outerRef,
  x,
  y,
}: {
  label: string;
  outerRef: React.RefObject<HTMLDivElement | null>;
  x: ReturnType<typeof useMotionValue> | ReturnType<typeof useSpring>;
  y: ReturnType<typeof useMotionValue> | ReturnType<typeof useSpring>;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono text-xs text-gray-700">{label}</p>
      <div
        ref={outerRef}
        className="flex h-32 w-32 items-center justify-center rounded-full"
        style={{ backgroundColor: EYE_FILL }}
      >
        <motion.div className="h-10 w-10 rounded-full" style={{ backgroundColor: PUPIL_FILL, x, y }} />
      </div>
    </div>
  );
}

export function EyeComparison() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <SnappyEye />
        <SpringEye />
      </div>
      <p className="text-xs text-gray-500">把滑鼠靠近其中一隻眼,接著滑出 150px 邊界 — 左邊瞬閃回中心,右邊優雅滑回。</p>
    </div>
  );
}
