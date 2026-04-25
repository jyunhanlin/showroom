import { random, sample, times } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { convertPolarToCartesian, setupCanvas } from '~/utils/canvas';

const HUES = [45, 90, 145, 210, 245, 310, 355];
const GRAVITY = 3000;

type Particle = {
  createdAt: number;
  x: number;
  y: number;
  xPrevious: number;
  yPrevious: number;
  xVelocity: number;
  yVelocity: number;
  radius: number;
  color: string;
  lifespan: number;
};

type PopperMode = 'circle' | 'round' | 'square';

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [connectDots, setConnectDots] = useState(true);
  const connectDotsRef = useRef(connectDots);
  connectDotsRef.current = connectDots;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    let mousePosition: { x: number; y: number } | null = null;
    let mousePositionPrevious: { x: number; y: number } | null = null;
    let rafId = 0;

    function handlePointerMove(event: PointerEvent) {
      const bb = canvas!.getBoundingClientRect();
      mousePositionPrevious = mousePosition;
      mousePosition = {
        x: event.clientX - bb.left,
        y: event.clientY - bb.top,
      };
    }

    window.addEventListener('pointermove', handlePointerMove);

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      if (mousePosition) {
        if (connectDotsRef.current && mousePositionPrevious) {
          ctx.beginPath();
          ctx.moveTo(mousePositionPrevious.x, mousePositionPrevious.y);
          ctx.lineTo(mousePosition.x, mousePosition.y + 0.01);
          ctx.lineWidth = 8;
          ctx.lineCap = 'round';
          ctx.strokeStyle = 'white';
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(mousePosition.x, mousePosition.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();
        }
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

  return (
    <div>
      <canvas ref={canvasRef} className="block h-[200px] w-full rounded-md bg-slate-900" />
      <label className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={connectDots}
          onChange={(event) => setConnectDots(event.target.checked)}
          className="h-4 w-4"
        />
        Connect dots
      </label>
    </div>
  );
}

export function ParticlePopper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<PopperMode>('round');
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    let particles: Particle[] = [];
    let lastTimestamp = performance.now();
    let rafId = 0;

    function generateParticle(): Particle {
      const angle = random(275, 290, true);
      const velocity = random(1000, 1400, true);
      const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angle, velocity);
      const x = random(0, 10, true);
      const y = canvasDimensions.height + 5;
      const hue = sample(HUES)!;
      return {
        createdAt: performance.now(),
        x,
        y,
        xPrevious: x,
        yPrevious: y,
        xVelocity,
        yVelocity,
        radius: 2,
        color: `hsl(${hue}deg 100% 70%)`,
        lifespan: random(500, 1500, true),
      };
    }

    function handleClick() {
      const newParticles = times(32, generateParticle);
      particles.push(...newParticles);
    }

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      particles.forEach((particle) => {
        particle.yVelocity += GRAVITY * deltaTime;
        particle.x += particle.xVelocity * deltaTime;
        particle.y += particle.yVelocity * deltaTime;

        ctx.beginPath();
        if (modeRef.current === 'circle') {
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        } else {
          ctx.moveTo(particle.xPrevious, particle.yPrevious);
          ctx.lineTo(particle.x, particle.y + 0.01);
          ctx.lineCap = modeRef.current;
          ctx.lineWidth = particle.radius * 2;
          ctx.strokeStyle = particle.color;
          ctx.stroke();
        }

        particle.xPrevious = particle.x;
        particle.yPrevious = particle.y;
      });

      rafId = requestAnimationFrame(draw);
    }

    function cleanup() {
      particles = particles.filter((particle) => particle.y < canvasDimensions.height + 100);
    }

    canvas.addEventListener('click', handleClick);
    const cleanupId = setInterval(cleanup, 1000);
    rafId = requestAnimationFrame(draw);

    return () => {
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafId);
      clearInterval(cleanupId);
      disposeResize();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="block h-[400px] w-full cursor-pointer rounded-md bg-slate-900" />
      <div className="mt-3 flex justify-center gap-2 text-sm">
        {(['circle', 'round', 'square'] as PopperMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-md border px-3 py-1 transition-colors ${
              mode === m
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {m}
          </button>
        ))}
        <span className="self-center pl-2 text-slate-500">— click canvas to emit</span>
      </div>
    </div>
  );
}
