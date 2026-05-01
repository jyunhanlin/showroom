import { useState } from 'react';

const STROKE_COLOR = 'oklch(0.9 0.3 164)';
const RED = 'oklch(0.6 0.22 25)';

export function AspectRatioToggle() {
  const [width, setWidth] = useState(300);
  const [preserve, setPreserve] = useState(true);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <div className="rounded-md bg-slate-900 p-3" style={{ width: 460 }}>
        <svg
          viewBox="0 0 300 200"
          width={width}
          height={200}
          preserveAspectRatio={preserve ? 'xMidYMid meet' : 'none'}
          style={{ display: 'block', backgroundColor: 'white' }}
        >
          <rect x="0" y="0" width="300" height="200" fill="white" />
          <circle cx="150" cy="100" r="60" fill={RED} />
        </svg>
      </div>
      <div className="grid grid-cols-1 gap-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-32">width: {width}px</span>
          <input type="range" min={120} max={460} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={preserve} onChange={(e) => setPreserve(e.target.checked)} />
          <span>preserveAspectRatio (uncheck = "none")</span>
        </label>
      </div>
    </div>
  );
}

const SWOOP_PATH =
  'M175 0.055C78 -1.94 0 51.05 0 51.05V150H780V119C780 119 723 32 585 38C447 44 429 84 348 70C267 56 272 2 175 0.055Z';

export function SwoopStretch() {
  const [width, setWidth] = useState(600);
  const [minWidth, setMinWidth] = useState(450);

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <div
        className="overflow-hidden rounded-md bg-slate-900"
        style={{ width: 600, display: 'flex', justifyContent: 'center' }}
      >
        <svg
          viewBox="0 0 780 150"
          preserveAspectRatio="none"
          height={120}
          style={{ width: `${width}px`, minWidth: `${minWidth}px`, display: 'block' }}
        >
          <path d={SWOOP_PATH} fill={STROKE_COLOR} />
        </svg>
      </div>
      <div className="grid grid-cols-1 gap-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-36">CSS width: {width}px</span>
          <input type="range" min={150} max={600} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-36">min-width: {minWidth}px</span>
          <input
            type="range"
            min={0}
            max={600}
            value={minWidth}
            onChange={(e) => setMinWidth(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
