const STROKE_COLOR = 'oklch(0.9 0.3 164)';

export function HoverStrokeMorph() {
  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <button type="button" className="group rounded-md bg-slate-900 p-4 cursor-pointer">
        <svg viewBox="0 0 200 100" width={300} height={150} fill="none">
          <circle
            cx="100"
            cy="50"
            r="40"
            stroke={STROKE_COLOR}
            strokeWidth="6"
            strokeDasharray="20,14"
            strokeLinecap="butt"
            className="transition-all duration-700 group-hover:[stroke-width:12] group-hover:[stroke-dasharray:6,8] group-hover:[stroke-linecap:round]"
          />
        </svg>
      </button>
      <p className="text-sm text-gray-700">hover the box — CSS transition tween 多個 stroke property</p>
    </div>
  );
}

export function PathMorph() {
  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <button type="button" className="group rounded-md bg-slate-900 p-4 cursor-pointer">
        <svg viewBox="0 0 200 100" width={300} height={150} fill="none">
          <path
            stroke={STROKE_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            d="M 20,50 C 80,50 140,50 180,50"
            style={{ transition: 'd 300ms' }}
            className="group-hover:[d:path('M_20,50_C_80,0_140,100_180,50')]"
          />
        </svg>
      </button>
      <p className="text-sm text-gray-700">
        hover — d attribute 用 CSS <code className="font-mono">path()</code> 函式 morph。
        <strong className="ml-1">Safari 不支援</strong>，看到直線秒變曲線就是 Safari，看到平滑 tween 就是 Chrome /
        Firefox。
      </p>
    </div>
  );
}
