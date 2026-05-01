import { motion, useMotionValue, useSpring } from 'motion/react';
import { range } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { clamp, convertCartesianToPolar, convertPolarToCartesian } from '~/utils/canvas';
import { useRelativeMousePosition } from '~/utils/use-relative-mouse-position';

const MAX_DISTANCE = 220;
const PUPIL_LIMIT = 9;

const STIFFNESSES = [200, 175, 222, 195, 235, 168, 210, 190, 245];
const DAMPING = 22;

const EYE_FILL = 'oklch(0.95 0.01 80)';
const PUPIL_FILL = 'oklch(0.2 0.02 280)';
const SKIN_FILL = 'oklch(0.7 0.16 130)';

type EyeProps = {
  stiffness: number;
  isWithinRange: boolean;
};

function Eye({ stiffness, isWithinRange }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping: DAMPING });
  const y = useSpring(rawY, { stiffness, damping: DAMPING });

  useEffect(() => {
    function onMove(event: PointerEvent) {
      if (!isWithinRange) {
        rawX.set(0);
        rawY.set(0);
        return;
      }
      const eye = eyeRef.current;
      if (!eye) return;
      const eyeBox = eye.getBoundingClientRect();
      const ex = eyeBox.left + eyeBox.width / 2;
      const ey = eyeBox.top + eyeBox.height / 2;
      const [angle, distance] = convertCartesianToPolar(event.clientX - ex, event.clientY - ey);
      const modified = clamp(distance * 0.16, -PUPIL_LIMIT, PUPIL_LIMIT);
      const next = convertPolarToCartesian(angle, modified);
      rawX.set(next.x);
      rawY.set(next.y);
    }
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [isWithinRange, rawX, rawY]);

  return (
    <div
      ref={eyeRef}
      className="flex items-center justify-center rounded-full"
      style={{ width: 28, height: 28, backgroundColor: EYE_FILL }}
    >
      <motion.div className="rounded-full" style={{ width: 12, height: 12, backgroundColor: PUPIL_FILL, x, y }} />
    </div>
  );
}

export function GooglyCreature() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mouse] = useRelativeMousePosition(wrapperRef, 250);
  const distance = mouse.x !== null && mouse.y !== null ? Math.sqrt(mouse.x ** 2 + mouse.y ** 2) : Infinity;
  const isWithinRange = distance <= MAX_DISTANCE;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={wrapperRef}
        className="grid h-56 w-56 grid-cols-3 grid-rows-3 place-items-center rounded-3xl p-4"
        style={{ backgroundColor: SKIN_FILL }}
      >
        {range(9).map((i) => (
          <Eye key={i} stiffness={STIFFNESSES[i]!} isWithinRange={isWithinRange} />
        ))}
      </div>
      <p className="text-xs text-gray-500">九眼怪 — 每隻 stiffness 略不同(135–245),配整體 in-range 同步觸發。</p>
    </div>
  );
}
