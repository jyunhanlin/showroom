import { motion } from 'motion/react';
import { useState } from 'react';

const PLAY_PATH = 'M 6,4 L 20,12 L 6,20 Z';
const PAUSE_PATH = 'M 6,4 L 10,4 L 10,20 L 6,20 Z M 14,4 L 18,4 L 18,20 L 14,20 Z';

const ICON_COLOR = 'oklch(0.78 0.18 200)';

export function PlayPauseMorph() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setPlaying((v) => !v)}
        aria-pressed={playing}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 hover:bg-slate-800"
      >
        <svg viewBox="0 0 24 24" width={32} height={32}>
          <motion.path
            initial={false}
            animate={{ d: playing ? PAUSE_PATH : PLAY_PATH }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            fill={ICON_COLOR}
          />
        </svg>
      </button>
      <p className="text-xs text-gray-500">兩個 path 之間 spring 內插。Motion 會逐 segment 對齊 d 字串。</p>
    </div>
  );
}

const FLAT_LINE = 'M 4,16 Q 16,16 28,16';
const SMILE_LINE = 'M 4,16 Q 16,28 28,16';

export function SpringDamping() {
  const [hover, setHover] = useState(false);
  const [damping, setDamping] = useState(8);
  const [stiffness, setStiffness] = useState(220);

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
            animate={{ d: hover ? SMILE_LINE : FLAT_LINE }}
            transition={{ type: 'spring', stiffness, damping }}
            fill="none"
            stroke={ICON_COLOR}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="grid w-full max-w-md grid-cols-1 gap-2 font-mono text-sm sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <span className="w-32">stiffness: {stiffness}</span>
          <input
            type="range"
            min={50}
            max={500}
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-32">damping: {damping}</span>
          <input type="range" min={2} max={40} value={damping} onChange={(e) => setDamping(Number(e.target.value))} />
        </label>
      </div>
      <p className="text-xs text-gray-500">damping 小 = 彈跳多;stiffness 大 = 反應快。Hover 看曲線從直線 → 笑臉。</p>
    </div>
  );
}
