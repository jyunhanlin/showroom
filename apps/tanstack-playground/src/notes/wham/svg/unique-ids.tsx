import { useId } from 'react';

const MOON_COLOR = 'oklch(0.78 0.18 30)';

type MoonProps = { offsetX: number; offsetY: number };

function MoonCutoutBroken({ offsetX, offsetY }: MoonProps) {
  return (
    <svg viewBox="0 0 80 80" width={140} height={140}>
      <defs>
        <mask id="moon-mask">
          <rect x="0" y="0" width="80" height="80" fill="white" />
          <circle cx={40 + offsetX} cy={40 + offsetY} r="30" fill="black" />
        </mask>
      </defs>
      <circle cx="40" cy="40" r="30" fill={MOON_COLOR} mask="url(#moon-mask)" />
    </svg>
  );
}

function MoonCutoutFixed({ offsetX, offsetY }: MoonProps) {
  const id = useId();
  const maskId = `${id}-moon-mask`;
  return (
    <svg viewBox="0 0 80 80" width={140} height={140}>
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="80" height="80" fill="white" />
          <circle cx={40 + offsetX} cy={40 + offsetY} r="30" fill="black" />
        </mask>
      </defs>
      <circle cx="40" cy="40" r="30" fill={MOON_COLOR} mask={`url(#${maskId})`} />
    </svg>
  );
}

export function IdCollisionDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-xs text-gray-700">❌ 共用 hard-coded id="moon-mask" — 兩顆都跟著最後一顆</p>
        <div className="flex gap-3 rounded-md bg-slate-900 p-3">
          <MoonCutoutBroken offsetX={20} offsetY={-20} />
          <MoonCutoutBroken offsetX={-20} offsetY={-20} />
          <MoonCutoutBroken offsetX={0} offsetY={20} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-xs text-gray-700">✅ `useId()` 生成 unique id — 各自獨立</p>
        <div className="flex gap-3 rounded-md bg-slate-900 p-3">
          <MoonCutoutFixed offsetX={20} offsetY={-20} />
          <MoonCutoutFixed offsetX={-20} offsetY={-20} />
          <MoonCutoutFixed offsetX={0} offsetY={20} />
        </div>
      </div>
    </div>
  );
}
