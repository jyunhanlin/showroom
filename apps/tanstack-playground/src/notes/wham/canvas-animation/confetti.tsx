import { random, sample, times } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { convertPolarToCartesian, setupCanvas } from '~/utils/canvas';

const EMOJIS = ['⭐', '✨', '❤️', '💛', '💙', '💚', '💜'];
const PARTICLES_PER_CLICK = 30;
const GRAVITY = 500;
const AIR_RESISTANCE = 1;

type Particle = {
  createdAt: number;
  x: number;
  y: number;
  xVelocity: number;
  yVelocity: number;
  rotation: number;
  angularVelocity: number;
  emoji: string;
};

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    let particles: Particle[] = [];
    let lastTimestamp = performance.now();
    let rafId = 0;

    ctx.font = '20px system-ui, "Segoe UI Emoji", "Apple Color Emoji"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    function generateParticle(x: number, y: number): Particle {
      const angle = random(270 - 20, 270 + 20, true);
      const velocity = random(150, 300, true);
      const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angle, velocity);
      return {
        createdAt: performance.now(),
        x,
        y,
        xVelocity,
        yVelocity,
        rotation: 0,
        angularVelocity: random(0, Math.PI * 4, true),
        emoji: sample(EMOJIS)!,
      };
    }

    function handleClick(event: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const newParticles = times(PARTICLES_PER_CLICK, () => generateParticle(x, y));
      particles.push(...newParticles);
    }

    function draw() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      particles.forEach((particle) => {
        particle.yVelocity += GRAVITY * deltaTime;
        particle.angularVelocity *= 1 - AIR_RESISTANCE * deltaTime;
        particle.x += particle.xVelocity * deltaTime;
        particle.y += particle.yVelocity * deltaTime;
        particle.rotation += particle.angularVelocity * deltaTime;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillText(particle.emoji, 0, 0);
        ctx.restore();
      });

      rafId = requestAnimationFrame(draw);
    }

    function cleanup() {
      const now = performance.now();
      particles = particles.filter((particle) => {
        const particleAge = now - particle.createdAt;
        return particleAge < 5000 && particle.y < canvasDimensions.height + 50;
      });
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

  return <canvas ref={canvasRef} className="mx-auto block h-[240px] w-[320px] cursor-pointer rounded-md bg-slate-50" />;
}
