import { useEffect, useRef } from 'react';
import { setupCanvas } from '~/utils/canvas';

const LOGO_EMOJI = '📀';
const LOGO_SIZE = 80;

export default function ResponsiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const logo = {
      x: 0,
      y: 0,
      size: LOGO_SIZE,
      xVelocity: 1,
      yVelocity: 1,
    };
    let rafId = 0;

    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
    });
    observer.observe(wrapper);

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

      ctx.font = `${LOGO_SIZE}px system-ui, "Segoe UI Emoji", "Apple Color Emoji"`;
      ctx.textBaseline = 'top';
      ctx.fillText(LOGO_EMOJI, logo.x, logo.y);

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="mx-auto block resize overflow-hidden rounded-md bg-slate-900"
      style={{ width: '100%', height: 240, minWidth: 160, minHeight: 120 }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
