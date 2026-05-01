import { useState } from 'react';

export function FilterDropShadowDemo() {
  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(4);
  const [stdDev, setStdDev] = useState(4);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-md bg-slate-900 p-3">
        <svg viewBox="0 0 128 128" width={200} height={200}>
          <defs>
            <filter id="wham-ww-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx={dx} dy={dy} stdDeviation={stdDev} floodColor="black" floodOpacity="0.5" />
            </filter>
          </defs>
          <circle cx="64" cy="64" r="36" fill="oklch(0.78 0.15 90)" filter="url(#wham-ww-shadow)" />
        </svg>
      </div>
      <div className="grid w-full max-w-md grid-cols-1 gap-1 font-mono text-sm sm:grid-cols-3">
        <label className="flex items-center gap-2">
          <span className="w-12">dx: {dx}</span>
          <input type="range" min={-12} max={12} value={dx} onChange={(e) => setDx(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-12">dy: {dy}</span>
          <input type="range" min={-12} max={12} value={dy} onChange={(e) => setDy(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-12">blur: {stdDev}</span>
          <input type="range" min={0} max={12} value={stdDev} onChange={(e) => setStdDev(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}

export function LinearGradientDemo() {
  const [angle, setAngle] = useState(135);

  const radians = (angle * Math.PI) / 180;
  const x1 = 64 - Math.cos(radians) * 64;
  const y1 = 64 - Math.sin(radians) * 64;
  const x2 = 64 + Math.cos(radians) * 64;
  const y2 = 64 + Math.sin(radians) * 64;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-md bg-slate-900 p-3">
        <svg viewBox="0 0 128 128" width={200} height={200}>
          <defs>
            <linearGradient id="wham-ww-grad" x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="hsl(200 100% 90%)" />
              <stop offset="100%" stopColor="hsl(245 100% 50%)" />
            </linearGradient>
          </defs>
          <rect x="16" y="16" width="96" height="96" rx="6" fill="url(#wham-ww-grad)" />
        </svg>
      </div>
      <label className="flex items-center gap-3 font-mono text-sm">
        <span className="w-24">angle: {angle}°</span>
        <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
      </label>
    </div>
  );
}

export function PatternDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-md bg-slate-900 p-3">
        <svg viewBox="0 0 32 32" width={200} height={200}>
          <defs>
            <pattern id="wham-ww-grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 0,0 L 4,0 L 4,4" fill="none" stroke="oklch(0.85 0.18 60)" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="32" height="32" fill="url(#wham-ww-grid)" />
          <path d="M 0,32 L 0,0 L 32,0" fill="none" stroke="oklch(0.85 0.18 60)" strokeWidth="0.2" />
        </svg>
      </div>
      <p className="text-xs text-gray-500">4×4 unit 的 ⌐ 蓋 → 鋪滿 32×32 viewBox。</p>
    </div>
  );
}

export function TextPathDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-md bg-slate-900 p-3">
        <svg viewBox="0 0 500 140" width={400} height={120}>
          <defs>
            <path id="wham-ww-curve" d="M 30,120 Q 250,20 470,120" />
          </defs>
          <path
            d="M 30,120 Q 250,20 470,120"
            fill="none"
            stroke="oklch(0.4 0 0)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text x="50%" textAnchor="middle" fontSize="64" fill="oklch(0.85 0.18 60)" fontWeight="700">
            <textPath href="#wham-ww-curve">curved text</textPath>
          </text>
        </svg>
      </div>
      <p className="text-xs text-gray-500">虛線是 path 本身,文字沿著走。</p>
    </div>
  );
}
