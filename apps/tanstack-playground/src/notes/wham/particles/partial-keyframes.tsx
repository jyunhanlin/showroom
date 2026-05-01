import { useState } from 'react';

const BALL_OPACITIES = [1, 0.6, 0.3];
const COLOR = 'oklch(0.85 0.15 90)';

export function PartialVsFullKeyframe() {
  const [variant, setVariant] = useState<'full' | 'partial'>('partial');
  const [runId, setRunId] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-pk-fadeFull { from { opacity: 1 } to { opacity: 0 } }
        @keyframes wham-pk-fadePartial { to { opacity: 0 } }
      `}</style>
      <div className="flex w-full max-w-md justify-around rounded-md bg-slate-900 p-4">
        {BALL_OPACITIES.map((restingOpacity) => (
          <div key={restingOpacity} className="flex flex-col items-center gap-1">
            <div
              key={`${runId}-${variant}-${restingOpacity}`}
              className="h-12 w-12 rounded-full"
              style={{
                backgroundColor: COLOR,
                opacity: restingOpacity,
                animation: `${variant === 'full' ? 'wham-pk-fadeFull' : 'wham-pk-fadePartial'} 1500ms forwards`,
              }}
            />
            <span className="font-mono text-xs text-gray-400">opacity: {restingOpacity}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 font-mono text-sm">
        <label className="flex items-center gap-2">
          <input type="radio" checked={variant === 'full'} onChange={() => setVariant('full')} />
          full (`from`/`to`)
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" checked={variant === 'partial'} onChange={() => setVariant('partial')} />
          partial (`to` only)
        </label>
        <button
          type="button"
          onClick={() => setRunId((id) => id + 1)}
          className="rounded bg-slate-800 px-3 py-1 text-white hover:bg-slate-700"
        >
          replay
        </button>
      </div>
      <p className="text-xs text-gray-500">full 會先把 0.6 / 0.3 拉到 1 再淡出;partial 從原本的不透明度開始淡出。</p>
    </div>
  );
}

export function StackedKeyframes() {
  const [twinkleDuration, setTwinkleDuration] = useState(400);
  const [runId, setRunId] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-pk-twinkle { from { opacity: 0.25 } to { opacity: 0.75 } }
        @keyframes wham-pk-fadeFromTransparent { from { opacity: 0 } }
      `}</style>
      <div className="flex h-32 w-full max-w-md items-center justify-center rounded-md bg-slate-900">
        <div
          key={`${runId}-${twinkleDuration}`}
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: COLOR,
            animation: `wham-pk-twinkle ${twinkleDuration}ms alternate infinite, wham-pk-fadeFromTransparent 2000ms`,
          }}
        />
      </div>
      <div className="flex items-center gap-3 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-32">twinkle: {twinkleDuration}ms</span>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={twinkleDuration}
            onChange={(e) => setTwinkleDuration(Number(e.target.value))}
          />
        </label>
        <button
          type="button"
          onClick={() => setRunId((id) => id + 1)}
          className="rounded bg-slate-800 px-3 py-1 text-white hover:bg-slate-700"
        >
          replay
        </button>
      </div>
      <p className="text-xs text-gray-500">
        兩條 keyframe 同時跑,opacity 變動相乘 — fade-in 期間 twinkle 的高低點都被線性壓縮。
      </p>
    </div>
  );
}
