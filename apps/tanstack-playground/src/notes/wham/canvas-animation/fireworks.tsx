import { clamp, random, range, sample } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { clampedNormalize, convertPolarToCartesian, setupCanvas } from '~/utils/canvas';

const COLORWAYS: string[][] = [
  ['hsl(0deg 90% 60%)', 'hsl(20deg 95% 60%)', 'hsl(40deg 95% 65%)', 'hsl(50deg 100% 70%)'],
  ['hsl(195deg 95% 65%)', 'hsl(210deg 90% 65%)', 'hsl(230deg 80% 70%)', 'hsl(180deg 80% 80%)'],
  ['hsl(140deg 80% 55%)', 'hsl(160deg 80% 50%)', 'hsl(100deg 75% 55%)', 'hsl(80deg 80% 65%)'],
  ['hsl(320deg 90% 65%)', 'hsl(290deg 80% 70%)', 'hsl(260deg 75% 75%)', 'hsl(340deg 85% 70%)'],
  ['hsl(45deg 95% 60%)', 'hsl(50deg 100% 70%)', 'hsl(55deg 100% 80%)', 'hsl(40deg 95% 75%)'],
];

const BACKGROUND = 'rgb(2, 6, 23)';
const AIR_RESISTANCE = 5;
const GRAVITY = 50;
const ROCKET_COLOR = 'hsl(0deg 0% 65%)';
const SPAWN_INTERVAL_MS = 200;
const SPAWN_PROBABILITY = 0.2;
const CLEANUP_INTERVAL_MS = 5000;

type Particle = {
  x: number;
  y: number;
  xPrevious: number;
  yPrevious: number;
  xVelocity: number;
  yVelocity: number;
  radius: number;
  radiusInitial: number;
  radiusFinal: number;
  opacity: number;
  color: string;
  lifespan: number;
  twinkleSpeed?: number;
};

type Firework = {
  createdAt: number;
  explodedAt: number | null;
  x: number;
  y: number;
  xPrevious: number;
  yPrevious: number;
  xVelocity: number;
  yVelocity: number;
  radius: number;
  opacity: number;
  color: string;
  particles?: Particle[];
};

function checkPrefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function drawEntity(
  ctx: CanvasRenderingContext2D,
  entity: {
    xPrevious: number;
    yPrevious: number;
    x: number;
    y: number;
    opacity: number;
    radius: number;
    color: string;
  },
  radiusMultiple: number,
) {
  ctx.beginPath();
  ctx.moveTo(entity.xPrevious, entity.yPrevious);
  ctx.lineTo(entity.x, entity.y + 0.01);
  ctx.globalAlpha = entity.opacity;
  ctx.lineWidth = entity.radius * 2 * radiusMultiple;
  ctx.lineCap = 'round';
  ctx.strokeStyle = entity.color;
  ctx.stroke();
}

const BASIC_MAX_LIFESPAN = 2000;

export function FireworksBasic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    let fireworks: Firework[] = [];
    let lastTimestamp = performance.now();
    let rafId = 0;

    function generateFirework(): Firework {
      const angle = random(270 - 40, 270 + 40);
      const velocity = random(900, 1600);
      const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angle, velocity);
      const startX = canvasDimensions.width / 2;
      const startY = canvasDimensions.height;
      return {
        createdAt: performance.now(),
        explodedAt: null,
        x: startX,
        y: startY,
        xPrevious: startX,
        yPrevious: startY,
        xVelocity,
        yVelocity,
        radius: 1.25,
        opacity: 1,
        color: ROCKET_COLOR,
      };
    }

    function explodeFirework(firework: Firework) {
      firework.explodedAt = performance.now();
      const colorway = sample(COLORWAYS)!;
      const numOfParticles = random(14, 28);
      firework.particles = range(numOfParticles).map(() => {
        const angle = random(0, 360);
        const velocity = random(250, 500);
        const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angle, velocity);
        const radius = random(1, 2, true);
        return {
          x: firework.x,
          y: firework.y,
          xPrevious: firework.x,
          yPrevious: firework.y,
          xVelocity,
          yVelocity,
          radius,
          radiusInitial: radius,
          radiusFinal: radius,
          opacity: 1,
          color: sample(colorway)!,
          lifespan: random(BASIC_MAX_LIFESPAN / 2, BASIC_MAX_LIFESPAN),
        };
      });
    }

    function draw() {
      rafId = requestAnimationFrame(draw);

      ctx.fillStyle = BACKGROUND;
      ctx.globalAlpha = 0.1;
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      ctx.globalAlpha = 1;

      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      const drag = Math.exp(-AIR_RESISTANCE * deltaTime);

      fireworks.forEach((firework) => {
        if (firework.explodedAt === null) {
          firework.xVelocity *= drag;
          firework.yVelocity = firework.yVelocity * drag + GRAVITY * deltaTime;
          firework.x += firework.xVelocity * deltaTime;
          firework.y += firework.yVelocity * deltaTime;
          drawEntity(ctx, firework, 1);
          firework.xPrevious = firework.x;
          firework.yPrevious = firework.y;

          const fireworkAge = now - firework.createdAt;
          if (fireworkAge >= 250 && Math.random() <= deltaTime * 2) {
            explodeFirework(firework);
          }
        } else {
          firework.particles!.forEach((particle) => {
            const particleAge = now - firework.explodedAt!;
            particle.opacity = clampedNormalize(particleAge, 250, particle.lifespan, 1, 0);
            particle.xVelocity *= drag;
            particle.yVelocity = particle.yVelocity * drag + GRAVITY * deltaTime;
            particle.x += particle.xVelocity * deltaTime;
            particle.y += particle.yVelocity * deltaTime;
            drawEntity(ctx, particle, 1);
            particle.xPrevious = particle.x;
            particle.yPrevious = particle.y;
          });
        }
      });
    }

    function spawn() {
      if (Math.random() < SPAWN_PROBABILITY) {
        fireworks.push(generateFirework());
      }
    }

    function cleanup() {
      const now = performance.now();
      fireworks = fireworks.filter((firework) => {
        if (firework.explodedAt === null) return true;
        return now - firework.explodedAt < BASIC_MAX_LIFESPAN;
      });
    }

    if (checkPrefersReducedMotion()) {
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      return () => disposeResize();
    }

    rafId = requestAnimationFrame(draw);
    const spawnId = setInterval(spawn, SPAWN_INTERVAL_MS);
    const cleanupId = setInterval(cleanup, CLEANUP_INTERVAL_MS);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(spawnId);
      clearInterval(cleanupId);
      disposeResize();
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-[500px] w-full rounded-md bg-slate-950" />;
}

const FANCY_MAX_LIFESPAN = 4000;
const STROBE_PROBABILITY = 0.5;
const BLUR_RADIUS_MULTIPLE = 10;

export function FireworksFancy() {
  const sharpCanvasRef = useRef<HTMLCanvasElement>(null);
  const blurredCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sharpCanvas = sharpCanvasRef.current;
    const blurredCanvas = blurredCanvasRef.current;
    if (!sharpCanvas || !blurredCanvas) return;

    const { ctx: sharpCtx, dimensions: canvasDimensions, disposeResize: disposeSharpResize } = setupCanvas(sharpCanvas);
    const { ctx: blurredCtx, disposeResize: disposeBlurredResize } = setupCanvas(blurredCanvas);

    let fireworks: Firework[] = [];
    const startTime = performance.now();
    let lastTimestamp = startTime;
    let rafId = 0;

    function generateFirework(): Firework {
      const angle = random(270 - 40, 270 + 40);
      const velocity = random(900, 1600);
      const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angle, velocity);
      const startX = canvasDimensions.width / 2;
      const startY = canvasDimensions.height;
      return {
        createdAt: performance.now(),
        explodedAt: null,
        x: startX,
        y: startY,
        xPrevious: startX,
        yPrevious: startY,
        xVelocity,
        yVelocity,
        radius: 1.25,
        opacity: 1,
        color: ROCKET_COLOR,
      };
    }

    function explodeFirework(firework: Firework) {
      firework.explodedAt = performance.now();
      const variant: 'strobe' | 'default' = Math.random() < STROBE_PROBABILITY ? 'strobe' : 'default';

      if (variant === 'strobe') {
        const numOfParticles = random(20, 40);
        firework.particles = range(numOfParticles).map(() => {
          const angle = random(0, 360);
          const velocity = random(0, 300);
          const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angle, velocity);
          const hue = random(30, 45);
          const lit = random(85, 100);
          const radiusInitial = random(1.5, 3, true);
          return {
            x: firework.x,
            y: firework.y,
            xPrevious: firework.x,
            yPrevious: firework.y,
            xVelocity,
            yVelocity,
            radius: radiusInitial,
            radiusInitial,
            radiusFinal: 0,
            opacity: 1,
            color: `hsl(${hue}deg 100% ${lit}%)`,
            lifespan: random(FANCY_MAX_LIFESPAN / 2, FANCY_MAX_LIFESPAN),
            twinkleSpeed: random(5, 40, true),
          };
        });
      } else {
        const colorway = sample(COLORWAYS)!;
        const numOfParticles = random(14, 28);
        firework.particles = range(numOfParticles).map(() => {
          const angle = random(0, 360);
          const velocity = random(250, 500);
          const { x: xVelocity, y: yVelocity } = convertPolarToCartesian(angle, velocity);
          const radius = random(1, 2, true);
          return {
            x: firework.x,
            y: firework.y,
            xPrevious: firework.x,
            yPrevious: firework.y,
            xVelocity,
            yVelocity,
            radius,
            radiusInitial: radius,
            radiusFinal: radius,
            opacity: 1,
            color: sample(colorway)!,
            lifespan: random(FANCY_MAX_LIFESPAN / 4, FANCY_MAX_LIFESPAN / 2),
          };
        });
      }
    }

    function draw() {
      rafId = requestAnimationFrame(draw);

      sharpCtx.fillStyle = BACKGROUND;
      sharpCtx.globalAlpha = 0.1;
      sharpCtx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      sharpCtx.globalAlpha = 1;
      blurredCtx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      const totalTime = (now - startTime) / 1000;
      lastTimestamp = now;

      const drag = Math.exp(-AIR_RESISTANCE * deltaTime);

      fireworks.forEach((firework) => {
        if (firework.explodedAt === null) {
          firework.xVelocity *= drag;
          firework.yVelocity = firework.yVelocity * drag + GRAVITY * deltaTime;
          firework.x += firework.xVelocity * deltaTime;
          firework.y += firework.yVelocity * deltaTime;
          drawEntity(sharpCtx, firework, 1);
          drawEntity(blurredCtx, firework, BLUR_RADIUS_MULTIPLE);
          firework.xPrevious = firework.x;
          firework.yPrevious = firework.y;

          const fireworkAge = now - firework.createdAt;
          if (fireworkAge >= 250 && Math.random() <= deltaTime * 2) {
            explodeFirework(firework);
          }
        } else {
          firework.particles!.forEach((particle) => {
            const particleAge = now - firework.explodedAt!;

            const baseOpacity =
              typeof particle.twinkleSpeed === 'number' ? clamp(Math.sin(totalTime * particle.twinkleSpeed), 0, 1) : 1;
            particle.opacity = clampedNormalize(particleAge, 250, particle.lifespan, baseOpacity, 0);

            particle.radius = clampedNormalize(
              particleAge,
              250,
              particle.lifespan,
              particle.radiusInitial,
              particle.radiusFinal,
            );

            particle.xVelocity *= drag;
            particle.yVelocity = particle.yVelocity * drag + GRAVITY * deltaTime;
            particle.x += particle.xVelocity * deltaTime;
            particle.y += particle.yVelocity * deltaTime;

            drawEntity(sharpCtx, particle, 1);
            drawEntity(blurredCtx, particle, BLUR_RADIUS_MULTIPLE);

            particle.xPrevious = particle.x;
            particle.yPrevious = particle.y;
          });
        }
      });
    }

    function spawn() {
      if (Math.random() < SPAWN_PROBABILITY) {
        fireworks.push(generateFirework());
      }
    }

    function cleanup() {
      const now = performance.now();
      fireworks = fireworks.filter((firework) => {
        if (firework.explodedAt === null) return true;
        return now - firework.explodedAt < FANCY_MAX_LIFESPAN;
      });
    }

    function disposeResize() {
      disposeSharpResize();
      disposeBlurredResize();
    }

    if (checkPrefersReducedMotion()) {
      sharpCtx.fillStyle = BACKGROUND;
      sharpCtx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      return () => disposeResize();
    }

    rafId = requestAnimationFrame(draw);
    const spawnId = setInterval(spawn, SPAWN_INTERVAL_MS);
    const cleanupId = setInterval(cleanup, CLEANUP_INTERVAL_MS);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(spawnId);
      clearInterval(cleanupId);
      disposeResize();
    };
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-md bg-slate-950">
      <canvas ref={sharpCanvasRef} className="absolute inset-0 block h-full w-full" />
      <canvas
        ref={blurredCanvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full"
        style={{ filter: 'blur(60px)' }}
      />
    </div>
  );
}
