import { useEffect, useRef } from 'react';
import { normalize, setupCanvas } from '~/utils/canvas';

const balls = [
  { color: 'hsl(335deg 100% 30%)' },
  { color: 'hsl(355deg 100% 40%)' },
  { color: 'hsl(15deg 90% 45%)' },
  { color: 'hsl(35deg 80% 50%)' },
  { color: 'hsl(55deg 70% 50%)' },
];

const BALL_RADIUS = 25;

export function SineOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const startTime = performance.now();
    let rafId = 0;

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      const now = performance.now();
      const totalTime = (now - startTime) / 1000;

      balls.forEach(({ color }, index) => {
        const offset = index * 0.3;
        const x = normalize(
          Math.sin(totalTime * 2 + offset),
          -1,
          1,
          canvasDimensions.width * 0.2,
          canvasDimensions.width * 0.8,
        );
        const y = normalize(
          Math.cos(totalTime * 2 + offset),
          -1,
          1,
          canvasDimensions.width * 0.4,
          canvasDimensions.width * 0.6,
        );

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[300px] w-[400px] rounded-md bg-slate-50" />;
}

export function SineWorm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const startTime = performance.now();
    let rafId = 0;

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      const now = performance.now();
      const totalTime = (now - startTime) / 1000;

      balls.forEach(({ color }, index) => {
        const xSpeedMultiple = 1.5;
        const ySpeedMultiple = xSpeedMultiple * 5;
        const xOffset = index * 0.2;
        const yOffset = xOffset * 4;

        const x = normalize(
          Math.sin(totalTime * xSpeedMultiple + xOffset),
          -1,
          1,
          canvasDimensions.width * 0.2,
          canvasDimensions.width * 0.8,
        );
        const y = normalize(
          Math.cos(totalTime * ySpeedMultiple + yOffset),
          -1,
          1,
          canvasDimensions.width * 0.35,
          canvasDimensions.width * 0.65,
        );

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[300px] w-[400px] rounded-md bg-slate-50" />;
}
