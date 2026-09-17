import { range } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import { clampedNormalize, normalize, setupCanvas } from '~/utils/canvas';

// px per grid cell; one circle is drawn at each cell center
const CELL_SIZE = 4;
const CIRCLE_RADIUS = 1.5;
const RING_GROW_DURATION = 1000;

// Josh's utils.js version: "reduced motion" unless the user explicitly has no preference.
function checkPrefersReducedMotion() {
  return !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}

export function AdvancedCanvasRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);
    // Josh uses the vendored noisejs `createNoiseGenerator(1).simplex3`.
    // `createNoise3D` is the same 3D simplex algorithm with the same [-1, 1] output,
    // but it seeds its permutation table from Math.random().
    const simplex3 = createNoise3D();

    let isHovering = false;
    let hoverChangeTimestamp: number | null = null;
    const startTime = performance.now();
    let rafId = 0;

    function draw() {
      if (checkPrefersReducedMotion()) {
        return;
      }

      const now = performance.now();
      const totalTime = (performance.now() - startTime) / 1000;

      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      const numOfCols = Math.floor(canvasDimensions.width / CELL_SIZE);
      const numOfRows = Math.floor(canvasDimensions.height / CELL_SIZE);

      range(numOfRows).forEach((rowIndex) => {
        range(numOfCols).forEach((colIndex) => {
          const centerX = colIndex * CELL_SIZE + CELL_SIZE / 2;
          const centerY = rowIndex * CELL_SIZE + CELL_SIZE / 2;

          ctx.beginPath();

          const simplexVal = simplex3(centerX / 10, centerY / 10, totalTime);
          const simplexLightness = normalize(simplexVal, -1, 1, 0, 100);
          // Vertical gradient: top row uses the noise value, bottom row is 0%.
          const baseLightness = normalize(rowIndex, 0, numOfRows - 1, simplexLightness, 0);

          let lightness: number;

          if (isHovering) {
            // pointerenter always sets the timestamp before isHovering becomes true.
            const timeSinceHoverStarted = now - hoverChangeTimestamp!;

            // Measured in grid units, not pixels. Not clamped on purpose: the ring keeps
            // growing after RING_GROW_DURATION, so it also reaches the top corners.
            const hypotheticalRingRadius = normalize(timeSinceHoverStarted, 0, RING_GROW_DURATION, 0, numOfRows);

            const spawnPoint = {
              x: Math.round(numOfCols / 2),
              y: numOfRows,
            };

            const deltaX = spawnPoint.x - colIndex;
            const deltaY = spawnPoint.y - rowIndex;
            const distanceToSpawnPoint = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            // > 0 ring still outside this cell, 0 ring on it, < 0 ring inside (already passed).
            const distanceToRing = distanceToSpawnPoint - hypotheticalRingRadius;

            // Fade in over the 10 grid units ahead of the ring; negative distances clamp to baseLightness.
            lightness = clampedNormalize(distanceToRing, 0, 10, baseLightness, 0);

            // Glow band: 2x lightness at |distanceToRing| = 0, plain lightness from 6 cells out.
            lightness = clampedNormalize(Math.abs(distanceToRing), 0, 6, Math.min(100, lightness * 2), lightness);
          } else {
            // Deviation: Josh's `now - null` evaluates to `now`, so if the first frame runs less
            // than 1000ms after page load, the grid shows and fades out once. -Infinity means
            // "no hover yet": the fade is already complete and every circle starts at 0%.
            const timeSinceHoverEnded = now - (hoverChangeTimestamp ?? -Infinity);

            lightness = clampedNormalize(timeSinceHoverEnded, 0, 1000, baseLightness, 0);
          }

          ctx.fillStyle = `hsl(0deg 0% ${lightness}%)`;
          ctx.arc(centerX, centerY, CIRCLE_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      rafId = requestAnimationFrame(draw);
    }

    draw();

    function handlePointerEnter() {
      isHovering = true;
      hoverChangeTimestamp = performance.now();
    }
    function handlePointerLeave() {
      isHovering = false;
      hoverChangeTimestamp = performance.now();
    }

    canvas.addEventListener('pointerenter', handlePointerEnter);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointerenter', handlePointerEnter);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      disposeResize();
    };
  }, []);

  return (
    <div className="flex justify-center rounded-md bg-black py-10">
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: 200, height: 300, outline: '1px solid hsl(210deg 15% 25%)' }}
      />
    </div>
  );
}
