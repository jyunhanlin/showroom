import { throttle } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { clampedNormalize } from '~/utils/canvas';

const COLOR = 'oklch(0.7 0.2 200)';

export function CursorPerfDemo() {
  const [throttleMs, setThrottleMs] = useState(0);
  const [calls, setCalls] = useState(0);
  const socketRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  const measure = useMemo(() => {
    const inner = () => {
      setCalls((n) => n + 1);
      return socketRef.current?.getBoundingClientRect() ?? null;
    };
    return throttleMs > 0 ? throttle(inner, throttleMs) : inner;
  }, [throttleMs]);

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      const box = measure();
      const ball = ballRef.current;
      if (!box || !ball) return;
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scale = clampedNormalize(distance, 10, 120, 1, 0);
      ball.style.transform = `scale(${scale.toFixed(3)})`;
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [measure]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-48 w-72 items-center justify-center rounded-md bg-slate-900">
        <div
          ref={socketRef}
          className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-700"
        >
          <div ref={ballRef} className="h-20 w-20 rounded-full" style={{ backgroundColor: COLOR }} />
        </div>
      </div>
      <label className="flex w-full max-w-md items-center gap-3 font-mono text-sm">
        <span className="w-32">throttle: {throttleMs}ms</span>
        <input
          type="range"
          min={0}
          max={500}
          step={25}
          value={throttleMs}
          onChange={(e) => setThrottleMs(Number(e.target.value))}
        />
      </label>
      <p className="font-mono text-xs text-gray-500">
        getBoundingClientRect 已被呼叫: <span className="font-bold text-rose-600">{calls}</span> 次
      </p>
      <p className="text-xs text-gray-500">
        滑鼠在這個 demo 範圍內動 → ball 越靠近中心越大。把 throttle 拉高,計數器漲速會明顯變慢。
      </p>
    </div>
  );
}
