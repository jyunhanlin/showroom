import { range } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import { normalize, setupCanvas } from '~/utils/canvas';

const NUM_OF_ROWS = 20;
const NUM_OF_COLS = 20;
const BLOCK_DURATION_MS = 500;

function MainThreadCanvas() {
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

  return <canvas ref={canvasRef} className="block aspect-square w-full rounded-md bg-slate-50" />;
}

function WorkerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let worker: Worker | null = null;
    let sendDimensions: (() => void) | null = null;

    Promise.resolve().then(() => {
      if (cancelled) return;

      let offscreenCanvas: OffscreenCanvas;
      try {
        offscreenCanvas = canvas.transferControlToOffscreen();
      } catch {
        return;
      }

      worker = new Worker(new URL('./offscreen-canvas.worker.ts', import.meta.url), { type: 'module' });
      // oxlint-disable-next-line require-post-message-target-origin -- Worker.postMessage doesn't take targetOrigin
      worker.postMessage({ type: 'init', offscreenCanvas }, [offscreenCanvas]);

      sendDimensions = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        // oxlint-disable-next-line require-post-message-target-origin -- Worker.postMessage doesn't take targetOrigin
        worker!.postMessage({ type: 'resize', width: rect.width, height: rect.height, dpr });
      };
      sendDimensions();
      window.addEventListener('resize', sendDimensions);
    });

    return () => {
      cancelled = true;
      if (sendDimensions) window.removeEventListener('resize', sendDimensions);
      if (worker) worker.terminate();
    };
  }, []);

  return <canvas ref={canvasRef} className="block aspect-square w-full rounded-md bg-slate-50" />;
}

export function OffscreenCanvasComparison() {
  function blockMainThread() {
    const start = performance.now();
    while (performance.now() - start < BLOCK_DURATION_MS) {
      // intentional busy-wait — freezes main thread
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <figure className="m-0 flex flex-col gap-2">
          <WorkerCanvas />
          <figcaption className="text-center text-sm text-slate-300">Worker (offscreen)</figcaption>
        </figure>
        <figure className="m-0 flex flex-col gap-2">
          <MainThreadCanvas />
          <figcaption className="text-center text-sm text-slate-300">Main thread</figcaption>
        </figure>
      </div>
      <button
        type="button"
        onClick={blockMainThread}
        className="self-center rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
      >
        Block main thread for {BLOCK_DURATION_MS}ms
      </button>
    </div>
  );
}
