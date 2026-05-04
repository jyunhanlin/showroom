import { useEffect, useRef } from 'react';
import { convertDegreesToRadians, setupCanvas } from '~/utils/canvas';

const CENTER_SIZE = 50;
const SATELLITE_SIZE = 16;
const ORBIT_RADIUS = 70;
const PARENT_SPIN = 60; // deg/sec
const SATELLITE_SPIN = 120; // deg/sec self-rotation
const SATELLITE_COUNT = 4;

export default function Transforms() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions, disposeResize } = setupCanvas(canvas);
    let lastTimestamp = performance.now();
    let parentAngle = 0;
    let satelliteAngle = 0;
    let rafId = 0;

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;
      parentAngle += PARENT_SPIN * deltaTime;
      satelliteAngle += SATELLITE_SPIN * deltaTime;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(convertDegreesToRadians(parentAngle));

      ctx.fillStyle = 'hsl(45deg 100% 60%)';
      ctx.fillRect(-CENTER_SIZE / 2, -CENTER_SIZE / 2, CENTER_SIZE, CENTER_SIZE);

      for (let i = 0; i < SATELLITE_COUNT; i++) {
        ctx.save();
        ctx.rotate(convertDegreesToRadians(i * (360 / SATELLITE_COUNT)));
        ctx.translate(ORBIT_RADIUS, 0);
        ctx.rotate(convertDegreesToRadians(satelliteAngle));
        ctx.fillStyle = 'hsl(190deg 80% 60%)';
        ctx.fillRect(-SATELLITE_SIZE / 2, -SATELLITE_SIZE / 2, SATELLITE_SIZE, SATELLITE_SIZE);
        ctx.restore();
      }

      ctx.restore();

      ctx.fillStyle = 'hsl(0deg 0% 55%)';
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto block h-[220px] w-full rounded-md bg-slate-900" />;
}
