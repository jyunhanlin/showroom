const RAINBOW_STRIPES = [
  { stroke: 'oklch(0.9 0.3 164)', dash: '100,100', repeatLength: 200, duration: '12s' },
  { stroke: 'oklch(0.85 0.2 130)', dash: '80,100', repeatLength: 180, duration: '4s' },
  { stroke: 'oklch(0.7 0.25 350)', dash: '30,30', repeatLength: 60, duration: '7s' },
  { stroke: 'oklch(0.55 0.2 280)', dash: '20,60 40,20', repeatLength: 140, duration: '8.7s' },
  { stroke: 'oklch(0.65 0.18 220)', dash: '20,120', repeatLength: 140, duration: '10s' },
];

export function RainbowArc() {
  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <svg viewBox="0 0 200 120" width={400} height={240} className="block rounded-md bg-slate-900">
        <defs>
          <path id="rainbow-template" d="M 20,100 A 40,40 0 0 1 180,100 Z" />
        </defs>
        {RAINBOW_STRIPES.map((s, i) => (
          <use
            key={i}
            href="#rainbow-template"
            fill="none"
            stroke={s.stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={s.dash}
            style={{
              animation: `rainbow-${i} ${s.duration} linear infinite`,
            }}
          />
        ))}
        <style>
          {RAINBOW_STRIPES.map(
            (s, i) => `@keyframes rainbow-${i} { to { stroke-dashoffset: -${s.repeatLength}px } }`,
          ).join('\n')}
        </style>
      </svg>
      <p className="text-sm text-gray-700">
        5 條 stripe 共用同一個 <code className="font-mono">&lt;path id="rainbow-template"&gt;</code>， 各自設不同 stroke
        + dasharray + 動畫速度。
      </p>
    </div>
  );
}
