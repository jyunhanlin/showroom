import { useState } from 'react';

const STAGES = [
  { hue: 200, label: 'pure 資訊' },
  { hue: 145, label: '加幾個動畫提示' },
  { hue: 60, label: '和 scroll 同步:故事感出來' },
  { hue: 25, label: '太多 scroll-jacking — 用戶失去掌控' },
];

export function ScrollytellingDial() {
  const [stage, setStage] = useState(1);
  const current = STAGES[stage]!;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex h-40 w-72 items-center justify-center rounded-md transition-colors duration-500"
        style={{ backgroundColor: `oklch(0.7 0.18 ${current.hue})` }}
      >
        <span className="font-mono text-sm text-slate-900">{current.label}</span>
      </div>
      <label className="flex w-full max-w-md items-center gap-3 font-mono text-sm">
        <span className="w-32">
          scrollytelling 量: {stage}/{STAGES.length - 1}
        </span>
        <input
          type="range"
          min={0}
          max={STAGES.length - 1}
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
        />
      </label>
      <p className="text-xs text-gray-500">scroll 是最常被低估的互動,但也是最容易被濫用的維度。</p>
    </div>
  );
}
