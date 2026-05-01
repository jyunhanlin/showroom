import { useState } from 'react';

const COLOR = 'oklch(0.75 0.18 280)';
const ACCENT = 'oklch(0.7 0.2 30)';

export function CenterOriginQuirk() {
  const [angle, setAngle] = useState(35);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Demo title="transform-origin: center" subtitle="繞 viewBox 中心(錯)" angle={angle} originSpec="center" />
        <Demo
          title='transform-origin: "150px 100px"'
          subtitle="跟 text 的 (x, y) 對齊(對)"
          angle={angle}
          originSpec="150px 100px"
        />
      </div>
      <label className="flex items-center gap-3 font-mono text-sm">
        <span className="w-24">angle: {angle}°</span>
        <input type="range" min={-180} max={180} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
      </label>
    </div>
  );
}

function Demo({
  title,
  subtitle,
  angle,
  originSpec,
}: {
  title: string;
  subtitle: string;
  angle: number;
  originSpec: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="font-mono text-xs text-gray-700">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
      <svg viewBox="0 0 250 200" width={250} height={200} className="rounded-md bg-slate-900">
        <circle cx="150" cy="100" r="2" fill={ACCENT} />
        <text
          x="150"
          y="100"
          fill="white"
          fontSize="20"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: originSpec,
          }}
        >
          Hello
        </text>
      </svg>
    </div>
  );
}

export function GroupRotation() {
  const [angle, setAngle] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 250 250" width={250} height={250} className="rounded-md bg-slate-900">
        <circle cx="125" cy="125" r="2" fill={ACCENT} />
        <g
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: '125px 125px',
            transition: 'transform 200ms ease-out',
          }}
        >
          <polygon points="80,190 125,80 170,190" fill="none" stroke={COLOR} strokeWidth="3" />
          <rect x="55" y="160" width="140" height="50" rx="8" fill="none" stroke={COLOR} strokeWidth="3" />
          <polyline
            points="80,140 80,165 170,165 170,140"
            fill="none"
            stroke={COLOR}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </svg>
      <label className="flex items-center gap-3 font-mono text-sm">
        <span className="w-24">angle: {angle}°</span>
        <input type="range" min={-180} max={180} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
      </label>
      <p className="text-xs text-gray-500">三個 shape 包在 `&lt;g&gt;` 裡 → 一條 transform 同時繞共享 origin。</p>
    </div>
  );
}
