import { animate } from 'motion';
import { useRef, useState } from 'react';

const BALL_COLOR_LINEAR = 'oklch(0.9 0.3 164)';
const BALL_COLOR_MOTION = 'oklch(0.7 0.25 30)';

const SPRING_LINEAR =
  'linear(0, 0.04, 0.16 4%, 0.65, 1.04 17%, 1.16, 1.18, 1.13, 1.04, 0.99 32%, 0.96, 0.99, 1.01, 1.01 47%, 0.99, 1)';

export function InterruptComparison() {
  const [pos, setPos] = useState<'left' | 'right'>('left');
  const motionBallRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const next = pos === 'left' ? 'right' : 'left';
    setPos(next);
    const ball = motionBallRef.current;
    if (!ball) return;
    animate(ball, { x: next === 'right' ? 240 : 0 }, { type: 'spring', stiffness: 200, damping: 15, mass: 1 });
  };

  const cssBallStyle = {
    background: BALL_COLOR_LINEAR,
    transition: `transform 800ms ${SPRING_LINEAR}`,
    transform: pos === 'right' ? 'translateX(240px)' : 'translateX(0px)',
  } as const;

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <div className="flex flex-col gap-3 rounded-md bg-slate-900 p-4" style={{ width: 320 }}>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-gray-400">CSS linear() spring</span>
          <div className="relative h-10 rounded bg-slate-800">
            <div className="absolute top-1 h-8 w-8 rounded-full" style={cssBallStyle} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-gray-400">Motion spring</span>
          <div className="relative h-10 rounded bg-slate-800">
            <div
              ref={motionBallRef}
              className="absolute top-1 h-8 w-8 rounded-full"
              style={{ background: BALL_COLOR_MOTION, left: 6 }}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleToggle}
        className="rounded bg-slate-200 px-3 py-1 font-mono text-sm hover:bg-slate-300"
      >
        toggle (連續按看 interrupt 行為)
      </button>
      <p className="max-w-[400px] text-center text-sm text-gray-700">
        快速連按多下：CSS linear() 動畫被瀏覽器用 reverse shortening factor 壓縮，看起來「假快」； Motion
        沒這問題，spring 接續比較自然。
      </p>
    </div>
  );
}
