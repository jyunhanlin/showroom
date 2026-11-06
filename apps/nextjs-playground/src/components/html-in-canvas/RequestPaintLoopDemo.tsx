'use client';

import { useEffect, useRef, useState } from 'react';

import { Fallback } from './Fallback';
import type { Support } from './support';
import { useCanvasGrid } from './use-canvas-grid';

const SPEED = 120; // CSS px per second
const MAX_DT = 0.25; // clamp tab-switch resume spikes, same rule as the tanstack canvas demos

/**
 * Section (c): requestPaint() drives an animation loop. The button slides across the canvas
 * and stays clickable because each drawElementImage call re-syncs its geometry.
 */
export function RequestPaintLoopDemo({ support }: { support: Support }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(true);
  const [paintsPerSecond, setPaintsPerSecond] = useState(0);
  const runningRef = useRef(running);
  const grid = useCanvasGrid(canvasRef, support === 'yes');

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (support !== 'yes' || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = { x: 20, dir: 1, last: performance.now(), paints: 0 };

    const onPaint = () => {
      const button = buttonRef.current;
      if (!button) return;
      const { scaleX, scaleY, cssWidth, cssHeight } = grid.current;
      const now = performance.now();
      const dt = Math.min((now - state.last) / 1000, MAX_DT);
      state.last = now;

      if (runningRef.current) {
        state.x += state.dir * SPEED * dt;
        const maxX = cssWidth - button.offsetWidth - 20;
        if (state.x > maxX) {
          state.x = maxX;
          state.dir = -1;
        } else if (state.x < 20) {
          state.x = 20;
          state.dir = 1;
        }
      }

      ctx.reset();
      const y = (cssHeight - button.offsetHeight) / 2;
      ctx.drawElementImage(button, state.x * scaleX, y * scaleY);
      state.paints += 1;

      // Keep the loop alive only while running. A DOM change (the click count) still
      // triggers one paint on its own when paused.
      if (runningRef.current) canvas.requestPaint();
    };

    const meter = window.setInterval(() => {
      setPaintsPerSecond(state.paints);
      state.paints = 0;
    }, 1000);

    canvas.addEventListener('paint', onPaint);
    canvas.requestPaint();
    return () => {
      canvas.removeEventListener('paint', onPaint);
      window.clearInterval(meter);
    };
  }, [support, grid]);

  const button = (
    <button
      ref={buttonRef}
      type="button"
      id="loop-button"
      drawable=""
      onClick={() => setCount((c) => c + 1)}
      className="box-border w-fit cursor-pointer rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 active:bg-emerald-700"
    >
      移動中也能點：{count}
    </button>
  );

  return (
    <div className="space-y-3">
      {support === 'yes' ? (
        <canvas ref={canvasRef} content="drawable" className="block h-[120px] w-full rounded-lg bg-slate-100">
          {button}
        </canvas>
      ) : (
        <Fallback support={support}>{button}</Fallback>
      )}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => {
            setRunning((r) => !r);
            canvasRef.current?.requestPaint();
          }}
          className="cursor-pointer rounded-md border border-slate-400 px-3 py-1 hover:bg-slate-200 dark:hover:bg-slate-600"
        >
          {running ? '暫停 requestPaint 迴圈' : '恢復 requestPaint 迴圈'}
        </button>
        <span>
          count = <strong data-testid="loop-count">{count}</strong>
        </span>
        <span>
          paint/s = <strong data-testid="loop-pps">{paintsPerSecond}</strong>
        </span>
      </div>
    </div>
  );
}
