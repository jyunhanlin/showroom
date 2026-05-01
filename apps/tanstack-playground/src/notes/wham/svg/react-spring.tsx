import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { random } from 'lodash-es';
import { useEffect, useState } from 'react';

const COLOR = 'oklch(0.7 0.2 30)';

/**
 * Demos use `motion/react` instead of `@react-spring/web`. The two libraries
 * solve overlapping problems and motion is already a dep — adding react-spring
 * caused a rolldown CJS-factory split (see view-transitions.tsx comment) that
 * broke production preview. The companion .mdx still walks through both APIs.
 */

export function PathSpringDemo() {
  const [hover, setHover] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="flex h-20 w-32 items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800"
      >
        <svg viewBox="0 0 32 32" width={80} height={80}>
          <motion.path
            initial={false}
            animate={{ d: hover ? 'M 4,16 Q 16,28 28,16' : 'M 4,16 Q 16,16 28,16' }}
            transition={{ type: 'spring', stiffness: 250, damping: hover ? 28 : 6 }}
            fill="none"
            stroke={COLOR}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <p className="text-xs text-gray-500">motion 版:hover 時 damping 28 穩定到位,離開時 damping 6 多彈兩下。</p>
    </div>
  );
}

export function NumberRollSpring() {
  const [target, setTarget] = useState(50);
  const motionValue = useMotionValue(target);
  const spring = useSpring(motionValue, { stiffness: 150, damping: 30 });
  const rounded = useTransform(spring, (v) => Math.round(v).toString());
  const [display, setDisplay] = useState(target.toString());

  useEffect(() => {
    motionValue.set(target);
  }, [target, motionValue]);

  useEffect(() => {
    return rounded.on('change', setDisplay);
  }, [rounded]);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setTarget(random(0, 100))}
        className="flex h-20 w-32 items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800"
      >
        <span style={{ color: COLOR, fontFamily: 'monospace', fontSize: '2rem' }}>{display}</span>
      </button>
      <p className="text-xs text-gray-500">
        數字 spring 到隨機目標 — motion 的 `useTransform(spring, round)` 取每幀整數值。
      </p>
    </div>
  );
}

export function ClampToggleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-32 w-32 items-center justify-center rounded-md bg-slate-900">
        <motion.div
          style={{ width: 80, height: 80, backgroundColor: COLOR, borderRadius: 12 }}
          animate={{ scale: open ? 1 : 0 }}
          transition={
            open ? { type: 'spring', stiffness: 250, damping: 10 } : { type: 'spring', stiffness: 300, damping: 30 }
          }
        />
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-sm text-white hover:bg-slate-700"
      >
        {open ? 'hide' : 'show'}
      </button>
      <p className="text-xs text-gray-500">motion 沒有 `clamp` 直接旗標 — 但「dismiss 時切高 damping」效果近似。</p>
    </div>
  );
}

export function TrailDemo() {
  const [up, setUp] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-24 items-end gap-2 rounded-md bg-slate-900 p-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: COLOR }}
            animate={{ y: up ? -36 : 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: up ? 10 : 30, delay: i * 0.05 }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setUp((v) => !v)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-sm text-white hover:bg-slate-700"
      >
        toggle
      </button>
      <p className="text-xs text-gray-500">
        motion 用 `delay: i * 0.05` 做 stagger;真實 react-spring 的 useTrail 是 spring 物理串聯,interrupt 更平滑。
      </p>
    </div>
  );
}
