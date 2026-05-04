import { useEffect, useRef } from 'react';
import { setupCanvas } from '~/utils/canvas';

const CELL = 64;
const SHEET_COLS = 2;
const SHEET_ROWS = 2;
const SHEET_W = CELL * SHEET_COLS;
const SHEET_H = CELL * SHEET_ROWS;

type SpriteShape = 'circle' | 'square' | 'triangle' | 'diamond';
type SpriteCell = { color: string; shape: SpriteShape };

const SPRITE_CELLS: SpriteCell[] = [
  { color: 'hsl(45deg 100% 60%)', shape: 'circle' },
  { color: 'hsl(190deg 80% 60%)', shape: 'square' },
  { color: 'hsl(330deg 80% 65%)', shape: 'triangle' },
  { color: 'hsl(140deg 60% 55%)', shape: 'diamond' },
];

function drawSpriteShape(ctx: CanvasRenderingContext2D, cell: SpriteCell, x: number, y: number) {
  ctx.fillStyle = cell.color;
  switch (cell.shape) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(x + CELL / 2, y + CELL / 2, CELL / 2 - 8, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'square':
      ctx.fillRect(x + 10, y + 10, CELL - 20, CELL - 20);
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(x + CELL / 2, y + 10);
      ctx.lineTo(x + CELL - 10, y + CELL - 10);
      ctx.lineTo(x + 10, y + CELL - 10);
      ctx.closePath();
      ctx.fill();
      break;
    case 'diamond':
      ctx.beginPath();
      ctx.moveTo(x + CELL / 2, y + 10);
      ctx.lineTo(x + CELL - 10, y + CELL / 2);
      ctx.lineTo(x + CELL / 2, y + CELL - 10);
      ctx.lineTo(x + 10, y + CELL / 2);
      ctx.closePath();
      ctx.fill();
      break;
  }
}

function makeSheet(): HTMLCanvasElement {
  const sheet = document.createElement('canvas');
  sheet.width = SHEET_W;
  sheet.height = SHEET_H;
  const ctx = sheet.getContext('2d');
  if (!ctx) return sheet;

  SPRITE_CELLS.forEach((cell, i) => {
    const col = i % SHEET_COLS;
    const row = Math.floor(i / SHEET_COLS);
    drawSpriteShape(ctx, cell, col * CELL, row * CELL);
  });

  return sheet;
}

export default function DrawingImages() {
  const sheetRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sheetCanvas = sheetRef.current;
    const target = targetRef.current;
    if (!sheetCanvas || !target) return;

    const sheet = makeSheet();

    const { ctx: sheetDisplayCtx, dimensions: sheetDims, disposeResize: disposeSheet } = setupCanvas(sheetCanvas);
    const { ctx: targetCtx, dimensions: targetDims, disposeResize: disposeTarget } = setupCanvas(target);

    function repaint() {
      // Left canvas: show the source sheet centered, with grid lines on cell boundaries
      sheetDisplayCtx.clearRect(0, 0, sheetDims.width, sheetDims.height);
      const sheetX = (sheetDims.width - SHEET_W) / 2;
      const sheetY = (sheetDims.height - SHEET_H) / 2;
      sheetDisplayCtx.drawImage(sheet, sheetX, sheetY);

      sheetDisplayCtx.strokeStyle = 'hsl(0deg 0% 60%)';
      sheetDisplayCtx.lineWidth = 1;
      for (let i = 1; i < SHEET_COLS; i++) {
        sheetDisplayCtx.beginPath();
        sheetDisplayCtx.moveTo(sheetX + i * CELL + 0.5, sheetY);
        sheetDisplayCtx.lineTo(sheetX + i * CELL + 0.5, sheetY + SHEET_H);
        sheetDisplayCtx.stroke();
      }
      for (let i = 1; i < SHEET_ROWS; i++) {
        sheetDisplayCtx.beginPath();
        sheetDisplayCtx.moveTo(sheetX, sheetY + i * CELL + 0.5);
        sheetDisplayCtx.lineTo(sheetX + SHEET_W, sheetY + i * CELL + 0.5);
        sheetDisplayCtx.stroke();
      }

      // Right canvas: each cell sliced individually, scaled to different sizes
      targetCtx.clearRect(0, 0, targetDims.width, targetDims.height);
      const slices = [
        { sx: 0, sy: 0, dw: 80 },
        { sx: CELL, sy: 0, dw: 40 },
        { sx: 0, sy: CELL, dw: 30 },
        { sx: CELL, sy: CELL, dw: 56 },
      ];
      const gap = 12;
      const totalWidth = slices.reduce((sum, s) => sum + s.dw, 0) + gap * (slices.length - 1);
      let x = (targetDims.width - totalWidth) / 2;
      const cy = targetDims.height / 2;
      slices.forEach((s) => {
        targetCtx.drawImage(sheet, s.sx, s.sy, CELL, CELL, x, cy - s.dw / 2, s.dw, s.dw);
        x += s.dw + gap;
      });
    }
    repaint();
    window.addEventListener('resize', repaint);

    return () => {
      window.removeEventListener('resize', repaint);
      disposeSheet();
      disposeTarget();
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      <figure className="m-0">
        <figcaption className="mb-1 text-center text-xs text-slate-600">
          Source sheet (2×2 cells, 64 px each)
        </figcaption>
        <canvas ref={sheetRef} className="block h-[160px] w-full rounded-md bg-slate-900" />
      </figure>
      <figure className="m-0">
        <figcaption className="mb-1 text-center text-xs text-slate-600">drawImage 9-arg slicing + scaling</figcaption>
        <canvas ref={targetRef} className="block h-[160px] w-full rounded-md bg-slate-900" />
      </figure>
    </div>
  );
}
