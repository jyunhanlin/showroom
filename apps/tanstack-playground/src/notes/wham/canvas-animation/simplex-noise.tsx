import { range } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { createNoise2D, createNoise3D } from 'simplex-noise';
import { normalize, setupCanvas } from '~/utils/canvas';

const NUM_OF_POINTS = 100;

export function NoiseSwoop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const simplex2 = createNoise2D();
    const startTime = performance.now();
    let rafId = 0;

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      const totalTime = (performance.now() - startTime) / 1000;

      ctx.beginPath();
      range(NUM_OF_POINTS).forEach((i) => {
        const x = normalize(i, 0, NUM_OF_POINTS - 1, 0, canvasDimensions.width);
        const y = normalize(simplex2(x / 200, totalTime / 10), -1, 1, 0, canvasDimensions.height);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-[200px] w-full rounded-md bg-slate-900" />;
}

const NUM_OF_ROWS = 20;
const NUM_OF_COLS = 20;

export function NoiseGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const simplex3 = createNoise3D();
    const startTime = performance.now();
    let rafId = 0;

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      const totalTime = (performance.now() - startTime) / 1000;

      range(NUM_OF_ROWS).forEach((rowIndex) => {
        range(NUM_OF_COLS).forEach((colIndex) => {
          const cellSize = canvasDimensions.width / NUM_OF_COLS;
          const radius = cellSize / 2;
          const centerX = normalize(colIndex, 0, NUM_OF_COLS, 0, canvasDimensions.width) + radius;
          const centerY = normalize(rowIndex, 0, NUM_OF_ROWS, 0, canvasDimensions.height) + radius;
          const lightness = normalize(simplex3(centerX / 70, centerY / 70, totalTime / 3), -1, 1, 6, 100);

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(210deg 15% ${lightness}%)`;
          ctx.fill();
        });
      });

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[400px] w-[400px] rounded-md bg-slate-50" />;
}
