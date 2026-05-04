import { useEffect, useRef } from 'react';
import { setupCanvas } from '~/utils/canvas';

function drawScene(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'hsl(45deg 100% 60%)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(8, 8);
  ctx.lineTo(width - 8, height - 8);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(width - 28, height - 28, 16, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'hsl(0deg 0% 92%)';
  ctx.font = '12px ui-sans-serif, system-ui, sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText('Hello canvas', 10, 14);
}

export default function PixelRatio() {
  const naiveRef = useRef<HTMLCanvasElement>(null);
  const sharpRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const naive = naiveRef.current;
    const sharp = sharpRef.current;
    if (!naive || !sharp) return;

    const naiveCtx = naive.getContext('2d');
    if (!naiveCtx) return;

    const { ctx: sharpCtx, dimensions, disposeResize } = setupCanvas(sharp);

    function repaint() {
      const rect = naive!.getBoundingClientRect();
      naive!.width = Math.round(rect.width);
      naive!.height = Math.round(rect.height);
      drawScene(naiveCtx!, rect.width, rect.height);

      drawScene(sharpCtx, dimensions.width, dimensions.height);
    }
    repaint();

    window.addEventListener('resize', repaint);

    return () => {
      window.removeEventListener('resize', repaint);
      disposeResize();
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      <figure className="m-0">
        <figcaption className="mb-1 text-center text-xs text-slate-600">Naive (bitmap = CSS px)</figcaption>
        <canvas ref={naiveRef} className="block h-[120px] w-full rounded-md bg-slate-900" />
      </figure>
      <figure className="m-0">
        <figcaption className="mb-1 text-center text-xs text-slate-600">DPR-aware (bitmap = CSS × DPR)</figcaption>
        <canvas ref={sharpRef} className="block h-[120px] w-full rounded-md bg-slate-900" />
      </figure>
    </div>
  );
}
