import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { clamp, convertCartesianToPolar, convertPolarToCartesian, getDistanceBetweenPoints } from '~/utils/canvas';

const MAX_DISTANCE = 200;
const PUPIL_LIMIT = 10;
const SPRING_CONFIG = { stiffness: 200, damping: 20 };

const EYE_FILL = 'oklch(0.95 0.01 80)';
const PUPIL_FILL = 'oklch(0.2 0.02 280)';
const SKIN_FILL = 'oklch(0.7 0.18 30)';

const EYE_POSITIONS = [
  { x: -42, y: -16 },
  { x: 0, y: -22 },
  { x: 42, y: -16 },
  { x: -52, y: 18 },
  { x: 52, y: 18 },
];

function MultiEyeCreature({ synchronized }: { synchronized: boolean }) {
  const creatureRef = useRef<HTMLDivElement>(null);
  const eyeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rawXs = EYE_POSITIONS.map(() => useMotionValue(0));
  const rawYs = EYE_POSITIONS.map(() => useMotionValue(0));
  const xs = rawXs.map((m) => useSpring(m, SPRING_CONFIG));
  const ys = rawYs.map((m) => useSpring(m, SPRING_CONFIG));

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      const creature = creatureRef.current;
      if (!creature) return;
      const cBox = creature.getBoundingClientRect();
      const cCenter = { x: cBox.left + cBox.width / 2, y: cBox.top + cBox.height / 2 };

      const distToCreature = getDistanceBetweenPoints({ x: event.clientX, y: event.clientY }, cCenter);

      EYE_POSITIONS.forEach((_, i) => {
        const eye = eyeRefs.current[i];
        if (!eye) return;
        const eyeBox = eye.getBoundingClientRect();
        const ex = eyeBox.left + eyeBox.width / 2;
        const ey = eyeBox.top + eyeBox.height / 2;
        const relX = event.clientX - ex;
        const relY = event.clientY - ey;
        const [angle, distance] = convertCartesianToPolar(relX, relY);

        const inRange = synchronized ? distToCreature <= MAX_DISTANCE : distance <= MAX_DISTANCE;
        if (inRange) {
          const modified = clamp(distance * 0.18, -PUPIL_LIMIT, PUPIL_LIMIT);
          const next = convertPolarToCartesian(angle, modified);
          rawXs[i]!.set(next.x);
          rawYs[i]!.set(next.y);
        } else {
          rawXs[i]!.set(0);
          rawYs[i]!.set(0);
        }
      });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [rawXs, rawYs, synchronized]);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono text-xs text-gray-700">
        {synchronized ? 'synchronized — 五眼一起追/一起放手' : 'independent — 每眼各自看自己的距離'}
      </p>
      <div ref={creatureRef} className="relative h-44 w-44 rounded-full" style={{ backgroundColor: SKIN_FILL }}>
        {EYE_POSITIONS.map((pos, i) => (
          <div
            key={i}
            ref={(node) => {
              eyeRefs.current[i] = node;
            }}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: 28,
              height: 28,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
              backgroundColor: EYE_FILL,
            }}
          >
            <motion.div
              className="rounded-full"
              style={{ width: 12, height: 12, backgroundColor: PUPIL_FILL, x: xs[i], y: ys[i] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MultiEyeComparison() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <MultiEyeCreature synchronized={false} />
        <MultiEyeCreature synchronized />
      </div>
      <p className="text-xs text-gray-500">
        靠近左邊那隻會看到不同眼一個一個 snap 到位;右邊是「整隻怪物統一感知」,五眼同時追同時放手。
      </p>
    </div>
  );
}
