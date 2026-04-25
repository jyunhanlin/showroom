import { useEffect, useRef } from 'react';
import { setupCanvas } from '~/utils/canvas';

const LOGO_EMOJI = '📀';
const LOGO_SIZE = 80;

export default function ResponsiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const logo = {
      x: 0,
      y: 0,
      size: LOGO_SIZE,
      xVelocity: 1,
      yVelocity: 1,
    };
    let rafId = 0;

    ctx.font = `${LOGO_SIZE}px system-ui, "Segoe UI Emoji", "Apple Color Emoji"`;
    ctx.textBaseline = 'top';

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      logo.x += logo.xVelocity;
      logo.y += logo.yVelocity;

      const isLogoBeyondLeftBoundary = logo.x < 0;
      const isLogoBeyondRightBoundary = logo.x > canvasDimensions.width - logo.size;
      const isLogoBeyondTopBoundary = logo.y < 0;
      const isLogoBeyondBottomBoundary = logo.y > canvasDimensions.height - logo.size;

      if (isLogoBeyondLeftBoundary || isLogoBeyondRightBoundary) {
        logo.xVelocity *= -1;
        logo.x = isLogoBeyondLeftBoundary ? 0 : canvasDimensions.width - logo.size;
      }
      if (isLogoBeyondTopBoundary || isLogoBeyondBottomBoundary) {
        logo.yVelocity *= -1;
        logo.y = isLogoBeyondTopBoundary ? 0 : canvasDimensions.height - logo.size;
      }

      ctx.fillText(LOGO_EMOJI, logo.x, logo.y);

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-[240px] w-full rounded-md bg-slate-900" />;
}
