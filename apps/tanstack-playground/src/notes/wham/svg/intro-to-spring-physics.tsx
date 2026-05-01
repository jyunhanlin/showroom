import { animate } from 'motion';
import { useRef, useState } from 'react';

const BALL_COLOR = 'oklch(0.9 0.3 164)';

export function SpringPlayground() {
  const ballRef = useRef<HTMLDivElement>(null);
  const [stiffness, setStiffness] = useState(200);
  const [damping, setDamping] = useState(20);
  const [pos, setPos] = useState<'left' | 'right'>('left');

  const handleToggle = () => {
    const ball = ballRef.current;
    if (!ball) return;
    const next = pos === 'left' ? 'right' : 'left';
    setPos(next);
    const targetX = next === 'right' ? 240 : 0;
    animate(ball, { x: targetX }, { type: 'spring', stiffness, damping, mass: 1 });
  };

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <div className="rounded-md bg-slate-900 p-4" style={{ width: 320 }}>
        <div className="relative h-12 rounded bg-slate-800">
          <div
            ref={ballRef}
            className="absolute top-1.5 h-9 w-9 rounded-full"
            style={{ background: BALL_COLOR, left: 6 }}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleToggle}
        className="rounded bg-slate-200 px-3 py-1 font-mono text-sm hover:bg-slate-300"
      >
        toggle position
      </button>
      <div className="grid grid-cols-1 gap-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-28">stiffness: {stiffness}</span>
          <input
            type="range"
            min={20}
            max={1000}
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-28">damping: {damping}</span>
          <input type="range" min={0} max={50} value={damping} onChange={(e) => setDamping(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
