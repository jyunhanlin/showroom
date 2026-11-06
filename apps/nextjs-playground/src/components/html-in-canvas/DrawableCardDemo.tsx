'use client';

import { useEffect, useRef, useState } from 'react';

import { CARD_WIDTH, DemoCard } from './DemoCard';
import { Fallback } from './Fallback';
import type { Support } from './support';
import { useCanvasGrid } from './use-canvas-grid';

const PAD = 24;
const BUTTON_GAP = 32;
const BUTTON_TILT = -8; // degrees; 2D geometry sync follows the context transform

type LogEntry = { id: number; text: string };

/**
 * Sections (a), (b), (d): one card drawn into a 2D canvas, its nested button drawn as a
 * separate drawable at another spot, the paint event logged, and the grid kept at device pixels.
 */
export function DrawableCardDemo({ support }: { support: Support }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  const [accent, setAccent] = useState(false);
  const [paints, setPaints] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [gridInfo, setGridInfo] = useState('');
  const grid = useCanvasGrid(canvasRef, support === 'yes');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (support !== 'yes' || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let seq = 0;

    const onPaint = (event: CanvasPaintEvent) => {
      const card = cardRef.current;
      const button = buttonRef.current;
      if (!card || !button) return;
      const { scaleX, scaleY, cssWidth, cssHeight } = grid.current;

      ctx.reset();
      drawBackdrop(ctx, canvas.width, canvas.height, scaleX);

      // (a) the card subtree. Arguments are canvas grid pixels, so CSS px × scale.
      ctx.drawElementImage(card, PAD * scaleX, PAD * scaleY);

      // (b) the nested button is excluded from the card's subtree: draw it on its own,
      // somewhere else and tilted. The 2D context syncs its geometry from the transform.
      ctx.save();
      ctx.translate((PAD + CARD_WIDTH + BUTTON_GAP) * scaleX, (PAD + 12) * scaleY);
      ctx.rotate((BUTTON_TILT * Math.PI) / 180);
      ctx.drawElementImage(button, 0, 0);
      ctx.restore();

      const ids = event.changedElements.map((el) => `#${el.id || el.tagName.toLowerCase()}`);
      const text =
        ids.length > 0 ? `changedElements: ${ids.join(', ')}` : 'changedElements: (空，resize 或 requestPaint)';
      seq += 1;
      const entry = { id: seq, text };
      setLog((prev) => [...prev.slice(-5), entry]);
      setPaints((n) => n + 1);
      setGridInfo(
        `canvas ${canvas.width}×${canvas.height} grid px / ${Math.round(cssWidth)}×${Math.round(cssHeight)} CSS px, scale ${scaleX.toFixed(2)}`,
      );
    };

    // lib.dom's HTMLCanvasElement overloads only know HTMLElementEventMap; cast the listener.
    const listener = onPaint as EventListener;
    canvas.addEventListener('paint', listener);
    canvas.requestPaint();
    return () => canvas.removeEventListener('paint', listener);
  }, [support, grid]);

  const card = (
    <DemoCard
      idPrefix="d2"
      cardRef={cardRef}
      buttonRef={buttonRef}
      count={count}
      onClick={() => setCount((c) => c + 1)}
      accent={accent}
      nestedDrawable
      label="2D canvas"
    />
  );

  return (
    <div className="space-y-3">
      {support === 'yes' ? (
        <canvas ref={canvasRef} content="drawable" className="block h-[220px] w-full rounded-lg bg-slate-100">
          {card}
        </canvas>
      ) : (
        <Fallback support={support}>{card}</Fallback>
      )}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => setAccent((a) => !a)}
          className="cursor-pointer rounded-md border border-slate-400 px-3 py-1 hover:bg-slate-200 dark:hover:bg-slate-600"
        >
          切換 card 顏色（改 DOM 的 class）
        </button>
        <span>
          count = <strong data-testid="d2-count">{count}</strong>
        </span>
        <span>
          paint 事件 = <strong data-testid="d2-paints">{paints}</strong>
        </span>
      </div>
      <pre
        className="h-32 overflow-auto rounded-md bg-slate-900 p-3 text-xs leading-relaxed text-slate-100"
        data-testid="d2-log"
      >
        {gridInfo && `${gridInfo}\n`}
        {log.map((e) => `[paint #${e.id}] ${e.text}\n`)}
      </pre>
    </div>
  );
}

function drawBackdrop(ctx: CanvasRenderingContext2D, width: number, height: number, scale: number) {
  ctx.strokeStyle = 'rgba(100,116,139,0.25)';
  ctx.lineWidth = 1;
  const step = 20 * scale;
  ctx.beginPath();
  for (let x = 0; x < width; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
  ctx.fillStyle = 'rgba(100,116,139,0.7)';
  ctx.font = `${12 * scale}px sans-serif`;
  ctx.fillText('<canvas content="drawable">', 8 * scale, height - 10 * scale);
}
