/// <reference lib="webworker" />
import { range } from 'lodash-es';
import { createNoise3D } from 'simplex-noise';
import { normalize } from '~/utils/canvas';

const NUM_OF_ROWS = 20;
const NUM_OF_COLS = 20;

let offscreenCanvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let canvasWidth = 0;
let canvasHeight = 0;
let isRunning = false;
const simplex3 = createNoise3D();
const startTime = performance.now();

function draw() {
  self.requestAnimationFrame(draw);
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const totalTime = (performance.now() - startTime) / 1000;

  range(NUM_OF_ROWS).forEach((rowIndex) => {
    range(NUM_OF_COLS).forEach((colIndex) => {
      const cellSize = canvasWidth / NUM_OF_COLS;
      const radius = cellSize / 2;
      const centerX = normalize(colIndex, 0, NUM_OF_COLS, 0, canvasWidth) + radius;
      const centerY = normalize(rowIndex, 0, NUM_OF_ROWS, 0, canvasHeight) + radius;
      const lightness = normalize(simplex3(centerX / 70, centerY / 70, totalTime / 3), -1, 1, 6, 100);

      ctx!.beginPath();
      ctx!.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx!.fillStyle = `hsl(210deg 15% ${lightness}%)`;
      ctx!.fill();
    });
  });
}

self.addEventListener('message', (event: MessageEvent) => {
  const { data } = event;

  if (data.type === 'init') {
    offscreenCanvas = data.offscreenCanvas as OffscreenCanvas;
    ctx = offscreenCanvas.getContext('2d');
    return;
  }

  if (data.type === 'resize') {
    if (!offscreenCanvas || !ctx) return;
    const { width, height, dpr } = data as { width: number; height: number; dpr: number };
    offscreenCanvas.width = Math.round(width * dpr);
    offscreenCanvas.height = Math.round(height * dpr);
    ctx.scale(dpr, dpr);
    canvasWidth = width;
    canvasHeight = height;

    if (!isRunning) {
      self.requestAnimationFrame(draw);
      isRunning = true;
    }
  }
});
