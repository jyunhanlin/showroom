import { useEffect, useRef } from 'react';
import { clampedNormalize, convertPolarToCartesian, setupCanvas } from '~/utils/canvas';

const COLORS = ['hsl(35deg 100% 50%)', 'hsl(40deg 100% 50%)', 'hsl(45deg 100% 60%)', 'hsl(50deg 100% 65%)'];
const PARTICLES_PER_SECOND = 600;
const AIR_RESISTANCE = 2;

type Particle = {
  createdAt: number;
  x: number;
  y: number;
  xVelocity: number;
  yVelocity: number;
  radius: number;
  color: string;
  lifespan: number;
  opacity: number;
};

export default function Rocketship() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions } = setupCanvas(canvas);
    let particles: Particle[] = [];
    let lastTimestamp = performance.now();
    let rafId = 0;
    let lastCleanup = performance.now();

    function generateParticle(): Particle {
      const angleDeg = 60 + Math.random() * 60;
      const velocity = 100 + Math.random() * 100;
      const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angleDeg, velocity);
      return {
        createdAt: performance.now(),
        x: dimensions.width / 2,
        y: 0,
        xVelocity,
        yVelocity,
        radius: 1 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        lifespan: 500 + Math.random() * 1000,
        opacity: 1,
      };
    }

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const n = Math.round(PARTICLES_PER_SECOND * deltaTime);
      for (let i = 0; i < n; i++) particles.push(generateParticle());

      for (const p of particles) {
        p.yVelocity *= 1 - AIR_RESISTANCE * deltaTime;
        p.x += p.xVelocity * deltaTime;
        p.y += p.yVelocity * deltaTime;

        const age = now - p.createdAt;
        p.opacity = clampedNormalize(age, p.lifespan, 0);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      if (now - lastCleanup > 1000) {
        particles = particles.filter((p) => now - p.createdAt < 5000);
        lastCleanup = now;
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative mx-auto h-[300px] w-[200px]">
      <div className="animate-rocket-oscillate absolute left-0 top-0 flex h-[120px] w-[200px] items-center justify-center text-6xl">
        🚀
      </div>
      <canvas ref={canvasRef} className="absolute left-0 top-[110px] h-[200px] w-[200px]" />
    </div>
  );
}
