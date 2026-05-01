import { useState } from 'react';

const SPRINGS = {
  smooth: {
    label: '--spring-smooth',
    duration: 800,
    fallback: 'cubic-bezier(0.16, 1, 0.3, 1)',
    linear:
      'linear(0, 0.012 1.2%, 0.092 3.5%, 0.348 7.6%, 0.674 11.6%, 0.92 15.6%, 1.04 19.4%, 1.07 22%, 1.06 25%, 1.0 35%, 0.987 42%, 0.998 60%, 1)',
  },
  bounce: {
    label: '--spring-bounce',
    duration: 1100,
    fallback: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    linear:
      'linear(0, 0.05 2%, 0.4 6%, 0.95 10%, 1.18 13%, 1.21 15%, 1.18 17%, 1.0 22%, 0.94 25%, 0.97 30%, 1.04 38%, 1.0 50%, 0.998 70%, 1)',
  },
  snappy: {
    label: '--spring-snappy',
    duration: 220,
    fallback: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    linear: 'linear(0, 0.18 12%, 0.62 32%, 0.95 60%, 1)',
  },
} as const;

type SpringKey = keyof typeof SPRINGS;

const COLOR = 'oklch(0.7 0.2 200)';
const TRACK_WIDTH = 360;
const BALL = 24;

export function SpringTokenPlayground() {
  const [active, setActive] = useState(false);
  const [runId, setRunId] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-svg-fav-slide {
          from { transform: translateX(0) }
          to { transform: translateX(${TRACK_WIDTH - BALL}px) }
        }
      `}</style>
      <div className="flex flex-col gap-3 rounded-md bg-slate-900 p-4">
        {(Object.keys(SPRINGS) as SpringKey[]).map((key) => {
          const spring = SPRINGS[key];
          return (
            <div key={key} className="flex flex-col gap-1">
              <p className="font-mono text-xs text-gray-300">
                {spring.label} · {spring.duration}ms
              </p>
              <div className="relative" style={{ width: TRACK_WIDTH, height: BALL }}>
                <div
                  key={`${runId}-${key}`}
                  className="absolute top-0 rounded-full"
                  style={{
                    width: BALL,
                    height: BALL,
                    backgroundColor: COLOR,
                    animation: active ? `wham-svg-fav-slide ${spring.duration}ms ${spring.linear} forwards` : 'none',
                    transform: 'translateX(0)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setActive(true);
            setRunId((id) => id + 1);
          }}
          className="rounded bg-rose-500 px-3 py-1 font-mono text-xs text-white hover:bg-rose-600"
        >
          play
        </button>
        <button
          type="button"
          onClick={() => setActive(false)}
          className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
        >
          reset
        </button>
      </div>
      <p className="text-xs text-gray-500">三條全域 spring token,各自綁好 duration — 點 play 同時觸發,比較質感差異。</p>
    </div>
  );
}
