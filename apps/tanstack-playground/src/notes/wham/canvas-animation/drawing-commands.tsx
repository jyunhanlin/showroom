import { useEffect, useRef } from 'react';
import { setupCanvas } from '~/utils/canvas';

const STROKE = 'hsl(190deg 80% 60%)';
const FILL = 'hsl(45deg 100% 60%)';
const LABEL = 'hsl(0deg 0% 88%)';

function drawShowcase(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);

  const cells = 6;
  const cellWidth = width / cells;
  const cy = 50;

  // 1: fillRect
  ctx.fillStyle = FILL;
  ctx.fillRect(cellWidth * 0 + cellWidth / 2 - 20, cy - 20, 40, 40);

  // 2: strokeRect
  ctx.strokeStyle = STROKE;
  ctx.lineWidth = 2;
  ctx.strokeRect(cellWidth * 1 + cellWidth / 2 - 20, cy - 20, 40, 40);

  // 3: arc + fill (full circle)
  ctx.fillStyle = FILL;
  ctx.beginPath();
  ctx.arc(cellWidth * 2 + cellWidth / 2, cy, 22, 0, Math.PI * 2);
  ctx.fill();

  // 4: arc + stroke (pie slice)
  ctx.strokeStyle = STROKE;
  ctx.beginPath();
  const cx4 = cellWidth * 3 + cellWidth / 2;
  ctx.moveTo(cx4, cy);
  ctx.arc(cx4, cy, 24, 0, Math.PI * 1.4);
  ctx.closePath();
  ctx.stroke();

  // 5: bezier curve
  ctx.beginPath();
  const x5 = cellWidth * 4 + cellWidth / 2;
  ctx.moveTo(x5 - 26, cy + 18);
  ctx.bezierCurveTo(x5 - 16, cy - 28, x5 + 16, cy + 28, x5 + 26, cy - 18);
  ctx.stroke();

  // 6: text (fill + stroke)
  const x6 = cellWidth * 5 + cellWidth / 2;
  ctx.font = 'bold 28px ui-sans-serif, system-ui, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = FILL;
  ctx.fillText('Aa', x6, cy);
  ctx.strokeStyle = STROKE;
  ctx.lineWidth = 1;
  ctx.strokeText('Aa', x6, cy);

  // Labels
  ctx.fillStyle = LABEL;
  ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  const labels = ['fillRect', 'strokeRect', 'arc+fill', 'arc+stroke', 'bezierCurveTo', 'fillText'];
  labels.forEach((label, i) => {
    ctx.fillText(label, cellWidth * i + cellWidth / 2, height - 18);
  });
}

export default function DrawingCommands() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions, disposeResize } = setupCanvas(canvas);

    function repaint() {
      drawShowcase(ctx, dimensions.width, dimensions.height);
    }
    repaint();
    window.addEventListener('resize', repaint);

    return () => {
      window.removeEventListener('resize', repaint);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[120px] w-full rounded-md bg-slate-900" />;
}
