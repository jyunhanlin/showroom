import { random, sample, times } from 'lodash-es';
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

    const { ctx, dimensions: canvasDimensions } = setupCanvas(canvas);
    let particles: Particle[] = [];
    let lastTimestamp = performance.now();
    let rafId = 0;

    function generateParticle(): Particle {
      const angle = random(60, 120, true);
      const velocity = random(100, 200, true);
      const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angle, velocity);
      return {
        createdAt: performance.now(),
        x: canvasDimensions.width / 2,
        y: 0,
        xVelocity,
        yVelocity,
        radius: random(1, 3, true),
        color: sample(COLORS)!,
        lifespan: random(500, 1500, true),
        opacity: 1,
      };
    }

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      const numOfNewParticles = Math.min(Math.round(PARTICLES_PER_SECOND * deltaTime), PARTICLES_PER_SECOND / 10);
      const newParticles = times(numOfNewParticles, generateParticle);
      particles.push(...newParticles);

      particles.forEach((particle) => {
        const particleAge = now - particle.createdAt;
        particle.opacity = clampedNormalize(particleAge, 0, particle.lifespan, 1, 0);

        particle.xVelocity *= 1 - AIR_RESISTANCE * 0.25 * deltaTime;
        particle.yVelocity *= 1 - AIR_RESISTANCE * deltaTime;

        particle.x += particle.xVelocity * deltaTime;
        particle.y += particle.yVelocity * deltaTime;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    function cleanup() {
      const now = performance.now();
      particles = particles.filter((particle) => {
        const particleAge = now - particle.createdAt;
        return particleAge < 5000;
      });
    }

    const cleanupId = setInterval(cleanup, 1000);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(cleanupId);
    };
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
