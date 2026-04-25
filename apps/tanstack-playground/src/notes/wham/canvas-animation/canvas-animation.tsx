import { useEffect, useRef } from 'react';
import { setupCanvas } from '~/utils/canvas';

const INITIAL_VELOCITY = 10;

export default function CanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const box = {
      x: 0,
      y: 10,
      size: 20,
      velocity: INITIAL_VELOCITY,
    };
    let rafId = 0;

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      ctx.fillStyle = 'hsl(45deg 100% 50%)';
      ctx.fillRect(box.x, box.y, box.size, box.size);

      if (box.x > canvasDimensions.width - box.size) {
        box.velocity = INITIAL_VELOCITY * -1;
      } else if (box.x < 0) {
        box.velocity = INITIAL_VELOCITY;
      }

      box.velocity *= 0.95;
      box.x = box.x + box.velocity;

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[40px] w-[200px] rounded-md bg-slate-900" />;
}
