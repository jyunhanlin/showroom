const STROKE_COLOR = 'oklch(0.9 0.3 164)';

export function SelfDrawingScribble() {
  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3">
      <button type="button" className="group rounded-md bg-slate-900 p-4 cursor-pointer">
        <svg viewBox="0 0 160 130" width={320} height={260} fill="none">
          <path
            pathLength="100"
            d="M 5,25 C 5,25 19,135 62,123 C 81,117 79,69 85,68 C 91,67 100,100 117,109 C 159,132 154,6 154,6"
            stroke={STROKE_COLOR}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100,1000"
            strokeDashoffset="100"
            style={{ transition: 'stroke-dashoffset 1000ms' }}
            className="group-hover:[stroke-dashoffset:0px]"
          />
        </svg>
      </button>
      <p className="text-sm text-gray-700">
        hover — pathLength=100 把 dash 跟 offset 都用 100 表示，不需要 getTotalLength()
      </p>
    </div>
  );
}
