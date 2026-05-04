import { useEffect, useRef, useState } from 'react';
import { convertDegreesToRadians, setupCanvas } from '~/utils/canvas';

const ORBIT_RADIUS = 70;
const DOT_RADIUS = 8;
const SPIN = 60; // deg/sec

export default function CanvasInReact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(8);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions, disposeResize } = setupCanvas(canvas);
    let lastTimestamp = performance.now();
    let angle = 0;
    let rafId = 0;

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;
      angle += SPIN * deltaTime;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const n = countRef.current;

      ctx.fillStyle = 'hsl(45deg 100% 60%)';
      for (let i = 0; i < n; i++) {
        const theta = convertDegreesToRadians(angle + (i * 360) / n);
        const x = cx + Math.cos(theta) * ORBIT_RADIUS;
        const y = cy + Math.sin(theta) * ORBIT_RADIUS;
        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="mx-auto block h-[180px] w-full rounded-md bg-slate-900" />
      <label className="mt-3 flex items-center gap-3 text-sm text-slate-700">
        <span className="shrink-0 tabular-nums">Dots: {count}</span>
        <input
          type="range"
          min={1}
          max={30}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="grow"
        />
      </label>
    </div>
  );
}
