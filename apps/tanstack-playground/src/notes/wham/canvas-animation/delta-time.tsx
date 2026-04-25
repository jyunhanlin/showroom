import { useEffect, useRef } from 'react';
import { setupCanvas } from '~/utils/canvas';

export default function DeltaTime() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const box = {
      x: 0,
      y: 10,
      size: 20,
      velocity: 120,
    };
    let lastTimestamp = performance.now();
    let rafId = 0;

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      box.x += box.velocity * deltaTime;

      if (box.x > canvasDimensions.width - box.size) {
        box.x = canvasDimensions.width - box.size;
        box.velocity *= -1;
      } else if (box.x < 0) {
        box.x = 0;
        box.velocity *= -1;
      }

      ctx.fillStyle = 'hsl(45deg 100% 50%)';
      ctx.fillRect(box.x, box.y, box.size, box.size);

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[40px] w-full rounded-md bg-slate-900" />;
}
