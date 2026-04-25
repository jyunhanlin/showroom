import { range } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { clampedNormalize, normalize, setupCanvas } from '~/utils/canvas';

type MousePos = { x: number | null; y: number | null };

const BASIC_NUM_OF_ROWS = 8;
const BASIC_NUM_OF_COLS = 12;
const BASIC_LINE_LENGTH = 16;

export function MagneticShavingsBasic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const mousePosition: MousePos = { x: null, y: null };
    let rafId = 0;

    function handlePointerMove(event: PointerEvent) {
      const bb = canvas!.getBoundingClientRect();
      mousePosition.x = event.clientX - bb.left;
      mousePosition.y = event.clientY - bb.top;
    }

    window.addEventListener('pointermove', handlePointerMove);

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      const mouseX = mousePosition.x;
      const mouseY = mousePosition.y;
      if (mouseX !== null && mouseY !== null) {
        range(BASIC_NUM_OF_ROWS).forEach((rowIndex) => {
          range(BASIC_NUM_OF_COLS).forEach((colIndex) => {
            const centerX = normalize(
              colIndex,
              0,
              BASIC_NUM_OF_COLS - 1,
              BASIC_LINE_LENGTH,
              canvasDimensions.width - BASIC_LINE_LENGTH,
            );
            const centerY = normalize(
              rowIndex,
              0,
              BASIC_NUM_OF_ROWS - 1,
              BASIC_LINE_LENGTH,
              canvasDimensions.height - BASIC_LINE_LENGTH,
            );
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            const lineLength = clampedNormalize(distance, 0, 200, BASIC_LINE_LENGTH, 0);

            if (lineLength <= 0) return;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(-lineLength / 2, 0);
            ctx.lineTo(lineLength / 2 + 0.01, 0);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();

            ctx.restore();
          });
        });
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-[300px] w-full rounded-md bg-slate-900" />;
}

const RAINBOW_NUM_OF_ROWS = 17;
const RAINBOW_NUM_OF_COLS = 25;
const RAINBOW_LINE_LENGTH = 40;

export function MagneticShavingsRainbow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    const mousePosition: MousePos = { x: null, y: null };
    let rafId = 0;

    function handlePointerMove(event: PointerEvent) {
      const bb = canvas!.getBoundingClientRect();
      mousePosition.x = event.clientX - bb.left;
      mousePosition.y = event.clientY - bb.top;
    }

    window.addEventListener('pointermove', handlePointerMove);

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      const mouseX = mousePosition.x;
      const mouseY = mousePosition.y;
      if (mouseX !== null && mouseY !== null) {
        range(RAINBOW_NUM_OF_ROWS).forEach((rowIndex) => {
          range(RAINBOW_NUM_OF_COLS).forEach((colIndex) => {
            const centerX = normalize(
              colIndex,
              0,
              RAINBOW_NUM_OF_COLS - 1,
              RAINBOW_LINE_LENGTH,
              canvasDimensions.width - RAINBOW_LINE_LENGTH,
            );
            const centerY = normalize(
              rowIndex,
              0,
              RAINBOW_NUM_OF_ROWS - 1,
              RAINBOW_LINE_LENGTH,
              canvasDimensions.height - RAINBOW_LINE_LENGTH,
            );
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            const mouseAngle = Math.atan2(deltaY, deltaX);
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            const lineWidth = clampedNormalize(distance, 0, 300, 12, 0);
            if (lineWidth <= 0) return;

            const lineLength = clampedNormalize(distance, 0, 200, RAINBOW_LINE_LENGTH, 0.01);
            const hue = distance * 0.5;
            const sat = clampedNormalize(distance, 100, 300, 100, 0);
            const lit = clampedNormalize(distance, 0, 300, 50, 100);

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(mouseAngle);

            ctx.beginPath();
            ctx.moveTo(-lineLength / 2, 0);
            ctx.lineTo(lineLength / 2, 0);
            ctx.strokeStyle = `hsl(${hue}deg ${sat}% ${lit}%)`;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.stroke();

            ctx.restore();
          });
        });
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-[400px] w-full rounded-md bg-slate-900" />;
}
