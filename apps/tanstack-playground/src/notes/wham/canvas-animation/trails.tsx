import { useEffect, useRef } from 'react';
import { clampedNormalize, setupCanvas } from '~/utils/canvas';

const BOX_SIZE = 20;
const BOX_COLOR = 'hsl(45deg 100% 50%)';
const X_VELOCITY = 110;
const Y_VELOCITY = 75;
const TRAIL_FADE_SPEED = 6;
const STORED_POSITIONS = 40;

export function TrailsFillRect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions } = setupCanvas(canvas);
    const box = {
      x: 0,
      y: 0,
      size: BOX_SIZE,
      xVelocity: X_VELOCITY,
      yVelocity: Y_VELOCITY,
    };
    let lastTimestamp = performance.now();
    let rafId = 0;

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      const opacity = TRAIL_FADE_SPEED * deltaTime;
      ctx.fillStyle = `hsl(0deg 0% 0% / ${opacity})`;
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      box.x += box.xVelocity * deltaTime;
      box.y += box.yVelocity * deltaTime;

      if (box.x > canvasDimensions.width - box.size) {
        box.x = canvasDimensions.width - box.size;
        box.xVelocity *= -1;
      } else if (box.x < 0) {
        box.x = 0;
        box.xVelocity *= -1;
      }
      if (box.y > canvasDimensions.height - box.size) {
        box.y = canvasDimensions.height - box.size;
        box.yVelocity *= -1;
      } else if (box.y < 0) {
        box.y = 0;
        box.yVelocity *= -1;
      }

      ctx.fillStyle = BOX_COLOR;
      ctx.fillRect(box.x, box.y, box.size, box.size);

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[240px] w-[320px] rounded-md bg-slate-900" />;
}

export function TrailsStack() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions } = setupCanvas(canvas);
    const box = {
      size: BOX_SIZE,
      xVelocity: X_VELOCITY,
      yVelocity: Y_VELOCITY,
    };
    const boxPositions: { x: number; y: number }[] = [{ x: 0, y: 0 }];
    let lastTimestamp = performance.now();
    let rafId = 0;

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      const previousBoxPosition = boxPositions[boxPositions.length - 1]!;
      const newBoxPosition = {
        x: previousBoxPosition.x + box.xVelocity * deltaTime,
        y: previousBoxPosition.y + box.yVelocity * deltaTime,
      };

      if (newBoxPosition.x > canvasDimensions.width - box.size) {
        newBoxPosition.x = canvasDimensions.width - box.size;
        box.xVelocity *= -1;
      } else if (newBoxPosition.x < 0) {
        newBoxPosition.x = 0;
        box.xVelocity *= -1;
      }
      if (newBoxPosition.y > canvasDimensions.height - box.size) {
        newBoxPosition.y = canvasDimensions.height - box.size;
        box.yVelocity *= -1;
      } else if (newBoxPosition.y < 0) {
        newBoxPosition.y = 0;
        box.yVelocity *= -1;
      }

      boxPositions.push(newBoxPosition);
      if (boxPositions.length > STORED_POSITIONS) {
        boxPositions.shift();
      }

      boxPositions.forEach(({ x, y }, index) => {
        const boxLightness = clampedNormalize(index, 0, STORED_POSITIONS - 1, 0, 60);
        ctx.fillStyle = `hsl(45deg 100% ${boxLightness}%)`;
        ctx.fillRect(x, y, box.size, box.size);
      });

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[240px] w-[320px] rounded-md bg-slate-900" />;
}
